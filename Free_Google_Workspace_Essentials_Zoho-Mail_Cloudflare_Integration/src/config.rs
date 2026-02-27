//! 設定檔與環境變數載入。機密僅從 .env 讀取，不寫入 config.toml。

use serde::Deserialize;
use std::path::Path;

/// 非機密設定（來自 config.toml）
#[derive(Debug, Clone, Deserialize)]
pub struct Config {
    #[serde(default)]
    pub general: GeneralConfig,
    #[serde(default)]
    pub zoho: ZohoConfig,
}

#[derive(Debug, Clone, Deserialize)]
pub struct GeneralConfig {
    /// 網域，例：dennisleehappy.org
    #[serde(default = "default_domain")]
    pub domain: String,
}

impl Default for GeneralConfig {
    fn default() -> Self {
        Self { domain: default_domain() }
    }
}

#[derive(Debug, Clone, Deserialize)]
pub struct ZohoConfig {
    /// Zoho Mail 免費版信箱數上限
    #[serde(default = "default_max_mailboxes")]
    pub max_mailboxes: u32,
}

impl Default for ZohoConfig {
    fn default() -> Self {
        Self { max_mailboxes: default_max_mailboxes() }
    }
}

fn default_domain() -> String {
    "dennisleehappy.org".to_string()
}

fn default_max_mailboxes() -> u32 {
    5
}

/// 環境變數中的 secret（僅透過 dotenvy 讀取，不寫入設定檔）
#[derive(Debug, Clone)]
#[allow(dead_code)]
pub struct EnvSecrets {
    pub google_credentials_path: Option<String>,
    pub google_service_account_json: Option<String>,
    pub google_admin_delegate_user: Option<String>,
    pub zoho_client_id: Option<String>,
    pub zoho_client_secret: Option<String>,
    pub zoho_refresh_token: Option<String>,
    pub zoho_org_id: Option<String>,
    pub cloudflare_api_token: Option<String>,
    pub cloudflare_zone_id: Option<String>,
}

impl Default for EnvSecrets {
    fn default() -> Self {
        Self {
            google_credentials_path: std::env::var("GOOGLE_APPLICATION_CREDENTIALS").ok(),
            google_service_account_json: std::env::var("GOOGLE_SERVICE_ACCOUNT_JSON").ok(),
            google_admin_delegate_user: std::env::var("GOOGLE_ADMIN_DELEGATE_USER").ok(),
            zoho_client_id: std::env::var("ZOHO_CLIENT_ID").ok(),
            zoho_client_secret: std::env::var("ZOHO_CLIENT_SECRET").ok(),
            zoho_refresh_token: std::env::var("ZOHO_REFRESH_TOKEN").ok(),
            zoho_org_id: std::env::var("ZOHO_ORG_ID").ok(),
            cloudflare_api_token: std::env::var("CLOUDFLARE_API_TOKEN").ok(),
            cloudflare_zone_id: std::env::var("CLOUDFLARE_ZONE_ID").ok(),
        }
    }
}

/// 從環境變數載入 secrets（應在載入 config 前呼叫 dotenvy，使 env 已就緒）
pub fn load_env_secrets() -> EnvSecrets {
    EnvSecrets::default()
}

/// 載入 config.toml；路徑可由 SENTINEL_CONFIG 指定，否則預設 ./config.toml
pub fn load_config() -> color_eyre::Result<Config> {
    let path = std::env::var("SENTINEL_CONFIG")
        .unwrap_or_else(|_| "config.toml".to_string());
    let path = Path::new(&path);
    if path.exists() {
        let s = std::fs::read_to_string(path)
            .map_err(|e| color_eyre::eyre::eyre!("讀取設定檔 {} 失敗: {}", path.display(), e))?;
        toml::from_str(&s).map_err(|e| color_eyre::eyre::eyre!("解析 config.toml 失敗: {}", e))
    } else {
        Ok(Config::default())
    }
}

impl Default for Config {
    fn default() -> Self {
        Config {
            general: GeneralConfig::default(),
            zoho: ZohoConfig::default(),
        }
    }
}
