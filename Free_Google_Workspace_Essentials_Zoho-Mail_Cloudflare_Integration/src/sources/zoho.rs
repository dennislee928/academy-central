//! Zoho Mail 組織 API：取得已建立之郵箱帳號清單（等同已用授權）。

use crate::config::{Config, EnvSecrets};
use color_eyre::eyre::eyre;
use serde::Deserialize;
use std::collections::HashSet;

const ZOHO_ACCOUNTS_TOKEN_URL: &str = "https://accounts.zoho.com/oauth/v2/token";
const ZOHO_MAIL_ORG_ACCOUNTS_URL: &str = "https://mail.zoho.com/api/organization";

#[derive(Debug, Deserialize)]
struct ZohoTokenResponse {
    access_token: String,
}

#[derive(Debug, Deserialize)]
struct ZohoAccountsResponse {
    #[serde(rename = "accounts")]
    accounts: Option<Vec<ZohoAccount>>,
    #[serde(rename = "pageContext")]
    page_context: Option<ZohoPageContext>,
}

#[derive(Debug, Deserialize)]
struct ZohoAccount {
    #[serde(rename = "primaryEmailAddress")]
    primary_email_address: Option<String>,
}

#[derive(Debug, Deserialize)]
struct ZohoPageContext {
    #[serde(rename = "hasMoreRecords")]
    has_more_records: Option<bool>,
}

/// 以 Refresh Token 取得 Zoho Access Token。
async fn get_zoho_access_token(
    client: &reqwest::Client,
    secrets: &EnvSecrets,
) -> color_eyre::Result<String> {
    let client_id = secrets
        .zoho_client_id
        .as_ref()
        .ok_or_else(|| eyre!("請設定 ZOHO_CLIENT_ID"))?;
    let client_secret = secrets
        .zoho_client_secret
        .as_ref()
        .ok_or_else(|| eyre!("請設定 ZOHO_CLIENT_SECRET"))?;
    let refresh_token = secrets
        .zoho_refresh_token
        .as_ref()
        .ok_or_else(|| eyre!("請設定 ZOHO_REFRESH_TOKEN"))?;

    let params = [
        ("grant_type", "refresh_token"),
        ("client_id", client_id.as_str()),
        ("client_secret", client_secret.as_str()),
        ("refresh_token", refresh_token.as_str()),
    ];

    let resp = client
        .post(ZOHO_ACCOUNTS_TOKEN_URL)
        .form(&params)
        .send()
        .await
        .map_err(|e| eyre!("Zoho OAuth token 請求失敗: {}", e))?;

    if !resp.status().is_success() {
        let status = resp.status();
        let body = resp.text().await.unwrap_or_default();
        return Err(eyre!("Zoho OAuth 回傳錯誤 {}: {}", status, body));
    }

    let token: ZohoTokenResponse =
        resp.json().await.map_err(|e| eyre!("解析 Zoho token 回應失敗: {}", e))?;
    Ok(token.access_token)
}

/// 取得組織內所有郵箱帳號的 email（分頁）。
pub async fn zoho_mailbox_emails(
    _cfg: &Config,
    secrets: &EnvSecrets,
) -> color_eyre::Result<HashSet<String>> {
    let zoid = secrets
        .zoho_org_id
        .as_ref()
        .ok_or_else(|| eyre!("請設定 ZOHO_ORG_ID"))?;

    let client = reqwest::Client::new();
    let access_token = get_zoho_access_token(&client, secrets).await?;

    let url = format!("{}/{}/accounts", ZOHO_MAIL_ORG_ACCOUNTS_URL, zoid);
    let mut all = HashSet::new();
    let mut start = 0i32;
    const LIMIT: i32 = 100;

    loop {
        let resp = client
            .get(&url)
            .query(&[("start", start), ("limit", LIMIT)])
            .bearer_auth(&access_token)
            .send()
            .await
            .map_err(|e| eyre!("Zoho 組織帳號 API 請求失敗: {}", e))?;

        if !resp.status().is_success() {
            let status = resp.status();
            let body = resp.text().await.unwrap_or_default();
            return Err(eyre!("Zoho 組織帳號 API 回傳錯誤 {}: {}", status, body));
        }

        let data: ZohoAccountsResponse =
            resp.json().await.map_err(|e| eyre!("解析 Zoho accounts 回應失敗: {}", e))?;

        for acc in data.accounts.unwrap_or_default() {
            if let Some(email) = acc.primary_email_address {
                all.insert(email);
            }
        }

        let has_more = data
            .page_context
            .and_then(|p| p.has_more_records)
            .unwrap_or(false);
        if !has_more {
            break;
        }
        start += LIMIT;
    }

    Ok(all)
}
