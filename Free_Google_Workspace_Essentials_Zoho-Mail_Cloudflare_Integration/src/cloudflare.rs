//! Cloudflare DNS 自動化：列出 zone 紀錄、SPF 修復建議或寫入（dry-run / 實際）。

use crate::config::EnvSecrets;
use color_eyre::eyre::eyre;
use serde::Deserialize;
use serde::Serialize;

const CF_API_BASE: &str = "https://api.cloudflare.com/client/v4";

#[derive(Debug, Deserialize)]
struct CfResponse<T> {
    success: bool,
    #[serde(default)]
    errors: Vec<CfError>,
    result: Option<T>,
}

#[derive(Debug, Deserialize)]
struct CfError {
    message: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DnsRecord {
    pub id: String,
    pub zone_id: String,
    pub name: String,
    #[serde(rename = "type")]
    pub record_type: String,
    pub content: String,
    pub ttl: Option<u32>,
}

/// 列出該 zone 的 DNS 紀錄（可選篩選 type）。
pub async fn list_dns_records(
    secrets: &EnvSecrets,
    type_filter: Option<&str>,
) -> color_eyre::Result<Vec<DnsRecord>> {
    let token = secrets
        .cloudflare_api_token
        .as_ref()
        .ok_or_else(|| eyre!("請設定 CLOUDFLARE_API_TOKEN"))?;
    let zone_id = secrets
        .cloudflare_zone_id
        .as_ref()
        .ok_or_else(|| eyre!("請設定 CLOUDFLARE_ZONE_ID"))?;

    let url = format!("{}/zones/{}/dns_records", CF_API_BASE, zone_id);
    let client = reqwest::Client::new();
    let mut req = client.get(&url).bearer_auth(token);
    if let Some(t) = type_filter {
        req = req.query(&[("type", t)]);
    }

    let resp = req.send().await.map_err(|e| eyre!("Cloudflare API 請求失敗: {}", e))?;
    let status = resp.status();
    let body: CfResponse<Vec<DnsRecord>> =
        resp.json().await.map_err(|e| eyre!("解析 Cloudflare 回應失敗: {}", e))?;

    if !body.success {
        let msg = body
            .errors
            .into_iter()
            .map(|e| e.message)
            .collect::<Vec<_>>()
            .join("; ");
        return Err(eyre!("Cloudflare API 錯誤 ({}): {}", status, msg));
    }

    Ok(body.result.unwrap_or_default())
}

/// 若 SPF 缺少 _spf.google.com，回傳建議的 SPF 字串；否則回傳 None。
pub fn spf_fix_suggestion(current_txt: &str) -> Option<String> {
    let trimmed = current_txt.trim();
    if !trimmed.starts_with("v=spf1") {
        return None;
    }
    if trimmed.contains("_spf.google.com") {
        return None;
    }
    let mut parts: Vec<&str> = trimmed.split_whitespace().collect();
    let mut has_include = false;
    for p in &mut parts {
        if p.starts_with("include:") {
            has_include = true;
            break;
        }
    }
    if !has_include {
        parts.insert(1, "include:zoho.com");
    }
    if !parts.iter().any(|p| p.contains("_spf.google.com")) {
        let insert_pos = parts.iter().position(|p| p == &"~all" || p == &"-all" || p == &"?all")
            .unwrap_or(parts.len());
        parts.insert(insert_pos, "include:_spf.google.com");
    }
    Some(parts.join(" "))
}

/// 更新指定 DNS 紀錄的 content（用於 SPF TXT）。dry_run 時只列印建議不呼叫 API。
pub async fn update_dns_record(
    secrets: &EnvSecrets,
    record_id: &str,
    zone_id: &str,
    name: &str,
    new_content: &str,
    dry_run: bool,
) -> color_eyre::Result<()> {
    if dry_run {
        println!("[dry-run] 將更新 TXT 紀錄 {} 為: {}", name, new_content);
        return Ok(());
    }

    let token = secrets
        .cloudflare_api_token
        .as_ref()
        .ok_or_else(|| eyre!("請設定 CLOUDFLARE_API_TOKEN"))?;

    let url = format!("{}/zones/{}/dns_records/{}", CF_API_BASE, zone_id, record_id);
    let client = reqwest::Client::new();
    let body = serde_json::json!({
        "type": "TXT",
        "name": name,
        "content": new_content,
        "ttl": 1
    });

    let resp = client
        .put(&url)
        .bearer_auth(token)
        .json(&body)
        .send()
        .await
        .map_err(|e| eyre!("Cloudflare API 更新請求失敗: {}", e))?;

    let status = resp.status();
    let res: CfResponse<DnsRecord> =
        resp.json().await.map_err(|e| eyre!("解析 Cloudflare 回應失敗: {}", e))?;

    if !res.success {
        let msg = res
            .errors
            .into_iter()
            .map(|e| e.message)
            .collect::<Vec<_>>()
            .join("; ");
        return Err(eyre!("Cloudflare API 錯誤 ({}): {}", status, msg));
    }

    Ok(())
}

/// 嘗試找到根域 SPF TXT 紀錄並建議或執行修復。
pub async fn fix_spf(secrets: &EnvSecrets, domain: &str, dry_run: bool) -> color_eyre::Result<()> {
    let records = list_dns_records(secrets, Some("TXT")).await?;
    let zone_id = secrets.cloudflare_zone_id.as_ref().ok_or_else(|| eyre!("CLOUDFLARE_ZONE_ID"))?;

    let root_name = if domain.ends_with('.') {
        domain.to_string()
    } else {
        format!("{}.", domain)
    };

    for rec in records {
        if rec.record_type != "TXT" {
            continue;
        }
        if rec.name != root_name && rec.name != domain {
            continue;
        }
        if !rec.content.contains("v=spf1") {
            continue;
        }
        if let Some(suggested) = spf_fix_suggestion(&rec.content) {
            if suggested != rec.content {
                update_dns_record(
                    secrets,
                    &rec.id,
                    zone_id,
                    &rec.name,
                    &suggested,
                    dry_run,
                )
                .await?;
                return Ok(());
            }
        }
    }

    println!("未找到需修復的 SPF 紀錄，或已包含 _spf.google.com。");
    Ok(())
}
