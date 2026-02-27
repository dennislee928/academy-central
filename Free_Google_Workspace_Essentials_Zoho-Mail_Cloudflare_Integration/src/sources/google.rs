//! Google Admin SDK Directory API：以 Service Account + Domain-Wide Delegation 取得組織使用者清單。

use crate::config::{Config, EnvSecrets};
use crate::sources::User;
use color_eyre::eyre::eyre;
use jsonwebtoken::{encode, Algorithm, EncodingKey, Header};
use serde::Deserialize;
use std::time::{SystemTime, UNIX_EPOCH};

const GOOGLE_OAUTH_TOKEN_URL: &str = "https://oauth2.googleapis.com/token";
const GOOGLE_DIRECTORY_USERS_URL: &str = "https://admin.googleapis.com/admin/directory/v1/users";
const SCOPE_READONLY: &str = "https://www.googleapis.com/auth/admin.directory.user.readonly";

#[derive(Debug, serde::Serialize)]
struct GoogleJwtClaims {
    iss: String,
    scope: String,
    aud: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    sub: Option<String>,
    iat: u64,
    exp: u64,
}

#[derive(Debug, Deserialize)]
struct ServiceAccountKey {
    client_email: String,
    private_key: String,
}

#[derive(Debug, Deserialize)]
struct TokenResponse {
    access_token: String,
}

#[derive(Debug, Deserialize)]
struct DirectoryUser {
    primary_email: Option<String>,
    name: Option<DirectoryUserName>,
}

#[derive(Debug, Deserialize)]
struct DirectoryUserName {
    full_name: Option<String>,
}

#[derive(Debug, Deserialize)]
struct UsersListResponse {
    users: Option<Vec<DirectoryUser>>,
    next_page_token: Option<String>,
}

/// 從環境或檔案載入 Service Account JSON。
fn load_service_account_json(secrets: &EnvSecrets) -> color_eyre::Result<ServiceAccountKey> {
    let json_str = if let Some(ref s) = secrets.google_service_account_json {
        s.clone()
    } else if let Some(ref path) = secrets.google_credentials_path {
        std::fs::read_to_string(path).map_err(|e| eyre!("讀取 GOOGLE_APPLICATION_CREDENTIALS 失敗: {}", e))?
    } else {
        return Err(eyre!(
            "請設定 GOOGLE_APPLICATION_CREDENTIALS 或 GOOGLE_SERVICE_ACCOUNT_JSON"
        ));
    };
    let key: ServiceAccountKey =
        serde_json::from_str(&json_str).map_err(|e| eyre!("解析 Service Account JSON 失敗: {}", e))?;
    Ok(key)
}

/// 取得 Google OAuth2 存取權杖（Service Account JWT 換 token）。
async fn get_google_access_token(
    client: &reqwest::Client,
    secrets: &EnvSecrets,
) -> color_eyre::Result<String> {
    let key = load_service_account_json(secrets)?;
    let now = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs();
    let claims = GoogleJwtClaims {
        iss: key.client_email.clone(),
        scope: SCOPE_READONLY.to_string(),
        aud: "https://oauth2.googleapis.com/token".to_string(),
        sub: secrets.google_admin_delegate_user.clone(),
        iat: now,
        exp: now + 3600,
    };
    let header = Header::new(Algorithm::RS256);
    let encoding_key = EncodingKey::from_rsa_pem(key.private_key.as_bytes())
        .map_err(|e| eyre!("無效的 private_key: {}", e))?;
    let jwt = encode(&header, &claims, &encoding_key).map_err(|e| eyre!("JWT 簽名失敗: {}", e))?;

    let form = [
        ("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer"),
        ("assertion", &jwt),
    ];
    let resp = client
        .post(GOOGLE_OAUTH_TOKEN_URL)
        .form(&form)
        .send()
        .await
        .map_err(|e| eyre!("Google OAuth token 請求失敗: {}", e))?;

    if !resp.status().is_success() {
        let status = resp.status();
        let body = resp.text().await.unwrap_or_default();
        return Err(eyre!("Google OAuth 回傳錯誤 {}: {}", status, body));
    }

    let token: TokenResponse = resp.json().await.map_err(|e| eyre!("解析 token 回應失敗: {}", e))?;
    Ok(token.access_token)
}

/// 呼叫 Directory API users.list，分頁取得所有使用者。
pub async fn google_users(cfg: &Config, secrets: &EnvSecrets) -> color_eyre::Result<Vec<User>> {
    let client = reqwest::Client::new();
    let access_token = get_google_access_token(&client, secrets).await?;
    let domain = &cfg.general.domain;

    let mut all = Vec::new();
    let mut page_token: Option<String> = None;

    loop {
        let mut url = format!("{}?domain={}&maxResults=500", GOOGLE_DIRECTORY_USERS_URL, domain);
        if let Some(ref tok) = page_token {
            url.push_str("&pageToken=");
            url.push_str(tok);
        }

        let resp = client
            .get(&url)
            .bearer_auth(&access_token)
            .send()
            .await
            .map_err(|e| eyre!("Directory API 請求失敗: {}", e))?;

        if !resp.status().is_success() {
            let status = resp.status();
            let body = resp.text().await.unwrap_or_default();
            return Err(eyre!("Directory API 回傳錯誤 {}: {}", status, body));
        }

        let list: UsersListResponse = resp.json().await.map_err(|e| eyre!("解析 users 回應失敗: {}", e))?;

        for u in list.users.unwrap_or_default() {
            let email = u.primary_email.ok_or_else(|| eyre!("API 回傳使用者無 primary_email"))?;
            let name = u
                .name
                .and_then(|n| n.full_name)
                .unwrap_or_else(|| email.clone());
            all.push(User { email, name });
        }

        page_token = list.next_page_token;
        if page_token.is_none() {
            break;
        }
    }

    Ok(all)
}
