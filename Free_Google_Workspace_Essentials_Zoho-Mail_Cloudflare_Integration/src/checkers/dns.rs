//! DNS 狀態驗證：MX（Zoho）、SPF（Zoho + Google）、DKIM。

use serde::Serialize;
use trust_dns_resolver::config::ResolverConfig;
use trust_dns_resolver::TokioAsyncResolver;

/// 單一檢查項結果
#[derive(Debug, Clone, Serialize)]
pub struct DnsCheckItem {
    pub name: String,
    pub ok: bool,
    pub message: String,
}

/// DNS 健康檢查報告
#[derive(Debug, Clone, Serialize)]
pub struct DnsReport {
    pub domain: String,
    pub mx: DnsCheckItem,
    pub spf: DnsCheckItem,
    pub dkim: DnsCheckItem,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<String>,
}

impl DnsReport {
    pub fn all_ok(&self) -> bool {
        self.error.is_none() && self.mx.ok && self.spf.ok && self.dkim.ok
    }
}

const ZOHO_MX_HOSTS: &[&str] = &["mx.zoho.com.", "mx2.zoho.com.", "mx3.zoho.com."];

/// 執行 MX / SPF / DKIM 檢查，回傳彙總報告。
pub async fn run_dns_checks(domain: &str) -> color_eyre::Result<DnsReport> {
    let resolver = TokioAsyncResolver::tokio(ResolverConfig::default(), Default::default());

    let mx = check_mx(&resolver, domain).await;
    let spf = check_spf(&resolver, domain).await;
    let dkim = check_dkim(&resolver, domain).await;

    Ok(DnsReport {
        domain: domain.to_string(),
        mx,
        spf,
        dkim,
        error: None,
    })
}

async fn check_mx(
    resolver: &TokioAsyncResolver,
    domain: &str,
) -> DnsCheckItem {
    let name = "MX (Zoho)".to_string();
    match resolver.mx_lookup(domain).await {
        Ok(lookup) => {
            let exchanges: Vec<String> = lookup
                .iter()
                .map(|mx| mx.exchange().to_string())
                .collect();
            let missing: Vec<&str> = ZOHO_MX_HOSTS
                .iter()
                .filter(|h| !exchanges.iter().any(|e| e.eq_ignore_ascii_case(h)))
                .copied()
                .collect();
            if missing.is_empty() {
                DnsCheckItem {
                    name,
                    ok: true,
                    message: format!("MX 指向 Zoho: {}", exchanges.join(", ")),
                }
            } else {
                DnsCheckItem {
                    name,
                    ok: false,
                    message: format!("缺少預期 MX: {}；目前: {}", missing.join(", "), exchanges.join(", ")),
                }
            }
        }
        Err(e) => DnsCheckItem {
            name,
            ok: false,
            message: format!("MX 查詢失敗: {}", e),
        },
    }
}

async fn check_spf(
    resolver: &TokioAsyncResolver,
    domain: &str,
) -> DnsCheckItem {
    let name = "SPF (Zoho + Google)".to_string();
    match resolver.txt_lookup(domain).await {
        Ok(lookup) => {
            let txts: Vec<String> = lookup
                .iter()
                .flat_map(|r| {
                    r.txt_data().iter().map(|d| String::from_utf8_lossy(d.as_ref()).into_owned())
                })
                .collect();
            let spf_record: Option<&String> = txts.iter().find(|s| s.trim().starts_with("v=spf1"));
            match spf_record {
                None => DnsCheckItem {
                    name,
                    ok: false,
                    message: "未找到 v=spf1 TXT 紀錄".to_string(),
                },
                Some(spf) => {
                    let has_zoho = spf.contains("zoho.com");
                    let has_google = spf.contains("_spf.google.com");
                    if has_zoho && has_google {
                        DnsCheckItem {
                            name,
                            ok: true,
                            message: format!("SPF 含 Zoho 與 Google: {}", spf),
                        }
                    } else {
                        let missing: Vec<&str> = [
                            if has_zoho { None } else { Some("zoho.com") },
                            if has_google { None } else { Some("_spf.google.com") },
                        ]
                        .into_iter()
                        .flatten()
                        .collect();
                        DnsCheckItem {
                            name,
                            ok: false,
                            message: format!("SPF 缺少 {}；目前: {}", missing.join(", "), spf),
                        }
                    }
                }
            }
        }
        Err(e) => DnsCheckItem {
            name,
            ok: false,
            message: format!("TXT 查詢失敗: {}", e),
        },
    }
}

async fn check_dkim(
    resolver: &TokioAsyncResolver,
    domain: &str,
) -> DnsCheckItem {
    let name = "DKIM (zmail._domainkey)".to_string();
    let dkim_name = format!("zmail._domainkey.{}", domain);
    match resolver.txt_lookup(dkim_name.as_str()).await {
        Ok(lookup) => {
            let txts: Vec<String> = lookup
                .iter()
                .flat_map(|r| {
                    r.txt_data().iter().map(|d| String::from_utf8_lossy(d.as_ref()).into_owned())
                })
                .collect();
            let combined = txts.join(" ");
            if combined.contains("v=DKIM1") && (combined.contains("k=rsa") || combined.contains("p=")) {
                DnsCheckItem {
                    name,
                    ok: true,
                    message: "DKIM 紀錄存在且格式合理".to_string(),
                }
            } else if combined.is_empty() {
                DnsCheckItem {
                    name,
                    ok: false,
                    message: "DKIM 紀錄為空".to_string(),
                }
            } else {
                DnsCheckItem {
                    name,
                    ok: true,
                    message: format!("DKIM 存在: {}...", combined.chars().take(60).collect::<String>()),
                }
            }
        }
        Err(e) => DnsCheckItem {
            name,
            ok: false,
            message: format!("DKIM TXT 查詢失敗: {}", e),
        },
    }
}
