//! 身份授權缺口檢查：Google Admin 與 Zoho Mail 比對。

use crate::config::{Config, EnvSecrets};
use crate::sources;
use serde::Serialize;
use std::collections::HashSet;

/// 身份比對報告
#[derive(Debug, Clone, Serialize)]
pub struct IdentityReport {
    pub google_total: usize,
    pub zoho_used: u32,
    pub zoho_limit: u32,
    pub gap_count: u32,
    #[serde(skip_serializing_if = "Vec::is_empty")]
    pub gap_emails: Vec<String>,
    /// (name, email) 有缺口的成員
    #[serde(skip_serializing_if = "Vec::is_empty")]
    pub gap_users: Vec<(String, String)>,
    /// (name, email) 已同步可收信的成員
    #[serde(skip_serializing_if = "Vec::is_empty")]
    pub synced_users: Vec<(String, String)>,
    pub from_api: bool,
}

impl IdentityReport {
    pub fn ok(&self) -> bool {
        self.gap_count == 0
    }
}

fn mock_google_users(domain: &str) -> Vec<sources::User> {
    vec![
        sources::User { name: "Alexi Laiho".into(), email: format!("alexi.laiho@{}", domain) },
        sources::User { name: "Marty Friedman".into(), email: format!("cto@{}", domain) },
        sources::User { name: "Paul Gilbert".into(), email: format!("paul.gilbert@{}", domain) },
        sources::User { name: "Lee Pei Chen".into(), email: format!("admin@{}", domain) },
        sources::User { name: "John Petrucci".into(), email: format!("john.petrucci@{}", domain) },
        sources::User { name: "Raj Shiva".into(), email: format!("shiva@{}", domain) },
        sources::User { name: "Neo Trinity".into(), email: format!("trinity@{}", domain) },
        sources::User { name: "Steve Vai".into(), email: format!("steve.vai@{}", domain) },
        sources::User { name: "Taka Yoshi".into(), email: format!("takayoshi@{}", domain) },
    ]
}

fn mock_zoho_emails() -> HashSet<String> {
    let mut s = HashSet::new();
    s.insert("dennis.lee@dennisleehappy.org".to_string());
    s.insert("mike@dennisleehappy.org".to_string());
    s
}

/// 執行身份缺口檢查，回傳 IdentityReport。
pub async fn run_identity_check(
    cfg: &Config,
    secrets: &EnvSecrets,
) -> color_eyre::Result<IdentityReport> {
    let domain = &cfg.general.domain;
    let zoho_limit = cfg.zoho.max_mailboxes;

    let has_google = secrets.google_credentials_path.is_some()
        || secrets.google_service_account_json.is_some();
    let has_zoho = secrets.zoho_client_id.is_some()
        && secrets.zoho_client_secret.is_some()
        && secrets.zoho_refresh_token.is_some()
        && secrets.zoho_org_id.is_some();

    let (google_users, zoho_emails, from_api) = if has_google && has_zoho {
        match sources::google_users(cfg, secrets).await {
            Ok(users) => match sources::zoho_mailbox_emails(cfg, secrets).await {
                Ok(emails) => (users, emails, true),
                Err(_) => (mock_google_users(domain), mock_zoho_emails(), false),
            },
            Err(_) => (mock_google_users(domain), mock_zoho_emails(), false),
        }
    } else {
        (mock_google_users(domain), mock_zoho_emails(), false)
    };

    let mut gap_count = 0u32;
    let mut gap_emails = Vec::new();
    let mut gap_users = Vec::new();
    let mut synced_users = Vec::new();
    for u in &google_users {
        if zoho_emails.contains(&u.email) {
            synced_users.push((u.name.clone(), u.email.clone()));
        } else {
            gap_count += 1;
            gap_emails.push(u.email.clone());
            gap_users.push((u.name.clone(), u.email.clone()));
        }
    }

    Ok(IdentityReport {
        google_total: google_users.len(),
        zoho_used: zoho_emails.len() as u32,
        zoho_limit,
        gap_count,
        gap_emails,
        gap_users,
        synced_users,
        from_api,
    })
}
