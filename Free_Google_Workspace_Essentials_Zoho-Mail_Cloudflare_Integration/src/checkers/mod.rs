//! 各類檢查器：DNS 健康、身份缺口等。統一透過 Checker trait 與 Report 彙總。

pub mod dns;
pub mod identity;

use crate::config::{Config, EnvSecrets};
use async_trait::async_trait;
use serde::Serialize;

pub use dns::{run_dns_checks, DnsReport};
pub use identity::{run_identity_check, IdentityReport};

/// 檢查執行時可用的上下文（設定與 secrets，之後可擴充 client、resolver 等）。
#[derive(Clone)]
pub struct CheckContext {
    pub config: Config,
    pub secrets: EnvSecrets,
}

/// 單一檢查的報告列舉；具備共用的「是否通過」。
#[derive(Debug, Clone, Serialize)]
#[serde(tag = "type", content = "data")]
pub enum Report {
    Identity(IdentityReport),
    Dns(DnsReport),
}

impl Report {
    pub fn ok(&self) -> bool {
        match self {
            Report::Identity(r) => r.ok(),
            Report::Dns(r) => r.all_ok(),
        }
    }
}

/// 可插拔檢查器：執行後回傳 Report。
#[async_trait]
pub trait Checker: Send + Sync {
    async fn check(&self, ctx: &CheckContext) -> color_eyre::Result<Report>;
}

/// 身份授權缺口檢查器
pub struct IdentityGapChecker;

#[async_trait]
impl Checker for IdentityGapChecker {
    async fn check(&self, ctx: &CheckContext) -> color_eyre::Result<Report> {
        let r = run_identity_check(&ctx.config, &ctx.secrets).await?;
        Ok(Report::Identity(r))
    }
}

/// DNS 架構健康檢查器
pub struct DnsHealthChecker;

#[async_trait]
impl Checker for DnsHealthChecker {
    async fn check(&self, ctx: &CheckContext) -> color_eyre::Result<Report> {
        let r = run_dns_checks(&ctx.config.general.domain).await?;
        Ok(Report::Dns(r))
    }
}
