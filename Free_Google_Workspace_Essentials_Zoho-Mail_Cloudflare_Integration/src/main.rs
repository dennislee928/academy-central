//! Sentinel-RS：身份同步與 DNS 健康檢查 CLI。
//! 階段 6：clap 子指令、--output json、exit code 供 CI 使用。

mod checkers;
mod cloudflare;
mod config;
mod sources;

use checkers::{CheckContext, Checker, DnsHealthChecker, IdentityGapChecker, Report};
use clap::{Parser, Subcommand};
use console::{style, Emoji};
use std::sync::Arc;

#[derive(Parser)]
#[command(name = "sentinel-rs", about = "DNS & Identity Gap Checker for Google/Zoho Integration")]
struct Cli {
    #[arg(long, default_value = "human", value_parser = ["human", "json"])]
    output: String,

    #[arg(long)]
    /// 設定檔路徑（預設 config.toml 或 SENTINEL_CONFIG）
    config: Option<std::path::PathBuf>,

    #[command(subcommand)]
    command: Option<Cmd>,
}

#[derive(Subcommand)]
enum Cmd {
    /// 執行檢查（預設：身份 + DNS）
    Check {
        #[arg(long)]
        /// 僅執行 DNS 檢查
        dns: bool,
        #[arg(long)]
        /// 僅執行身份比對檢查
        identity: bool,
    },
    /// Cloudflare DNS 相關操作
    Cloudflare {
        #[command(subcommand)]
        sub: CloudflareSub,
    },
}

#[derive(Subcommand)]
enum CloudflareSub {
    /// 列出 zone 的 MX、TXT 等紀錄
    List,
    /// 若 SPF 缺少 _spf.google.com 則建議或寫入修復
    FixSpf {
        #[arg(long, default_value = "true")]
        /// 僅列印建議，不呼叫 API 寫入
        dry_run: bool,
    },
}

fn print_reports_human(reports: &[Report], domain: &str) {
    for r in reports {
        match r {
            Report::Identity(id) => {
                println!("\n{} {} 啟動 Sentinel-RS 身份同步檢查...",
                         Emoji("🚀", ""), style(domain).cyan().bold());
                println!("--------------------------------------------------");
                if id.from_api {
                    println!("{}", style("正在比對身份同步狀態（API 即時資料）...").dim());
                } else {
                    println!("{}", style("正在比對身份同步狀態...").dim());
                }
                for (name, _) in &id.synced_users {
                    println!("{} {}: {}",
                             Emoji("✅", ""),
                             style(name).green(),
                             style("身分同步正常 (可收發信)").dim());
                }
                for (name, _) in &id.gap_users {
                    println!("{} {}: {}",
                             Emoji("⚠️", ""),
                             style(name).yellow().bold(),
                             style("授權缺口！僅能使用 Drive 協作，無法收信").red());
                }
                println!("\n{}", style("--- 掃描報告 ---").bold());
                println!("Google Admin 總人數: {}", id.google_total);
                println!("Zoho Mail 已用授權: {} / {}", id.zoho_used, id.zoho_limit);
                println!("Zoho 剩餘可用授權: {}", id.zoho_limit.saturating_sub(id.zoho_used));
                if id.gap_count > 0 {
                    println!("\n{} 發現 {} 位成員存在「收信授權缺口」。",
                             Emoji("🚨", ""), style(id.gap_count).on_red().white().bold());
                    println!("{}", style(format!("提示：請在 Zoho Admin 手動新增這些使用者（上限 {} 人）。", id.zoho_limit)).dim());
                }
                if id.zoho_used >= id.zoho_limit {
                    println!("\n{}", style("🛑 警告：Zoho 免費授權已達上限，無法再新增收信帳號！").red().bold());
                }
            }
            Report::Dns(dns) => {
                println!("\n{}", style("--- DNS 架構健康檢查 ---").bold());
                for item in [&dns.mx, &dns.spf, &dns.dkim] {
                    let icon = if item.ok { Emoji("✅", "") } else { Emoji("⚠️", "") };
                    let name_styled = if item.ok { style(&item.name).green() } else { style(&item.name).yellow() };
                    println!("{} {}: {}", icon, name_styled, item.message);
                }
            }
        }
    }
}

/// 彙總報告的 JSON 輸出結構（供 CI 解析）
#[derive(serde::Serialize)]
struct OutputJson {
    ok: bool,
    reports: Vec<Report>,
}

#[tokio::main]
async fn main() -> color_eyre::Result<()> {
    color_eyre::install()?;

    let cli = Cli::parse();

    if let Some(path) = &cli.config {
        std::env::set_var("SENTINEL_CONFIG", path);
    }
    let _ = dotenvy::dotenv();
    let secrets = config::load_env_secrets();
    let cfg = config::load_config()?;
    let ctx = CheckContext {
        config: cfg.clone(),
        secrets: secrets.clone(),
    };
    let domain = ctx.config.general.domain.clone();

    let mut reports = Vec::new();

    match &cli.command {
        None | Some(Cmd::Check { dns: false, identity: false }) => {
            let checkers: Vec<Arc<dyn checkers::Checker>> = vec![
                Arc::new(IdentityGapChecker),
                Arc::new(DnsHealthChecker),
            ];
            for checker in &checkers {
                if let Ok(r) = checker.check(&ctx).await {
                    reports.push(r);
                }
            }
        }
        Some(Cmd::Check { dns: true, identity: false }) => {
            if let Ok(r) = DnsHealthChecker.check(&ctx).await {
                reports.push(r);
            }
        }
        Some(Cmd::Check { dns: false, identity: true }) => {
            if let Ok(r) = IdentityGapChecker.check(&ctx).await {
                reports.push(r);
            }
        }
        Some(Cmd::Check { dns: true, identity: true }) => {
            let checkers: Vec<Arc<dyn checkers::Checker>> = vec![
                Arc::new(IdentityGapChecker),
                Arc::new(DnsHealthChecker),
            ];
            for checker in &checkers {
                if let Ok(r) = checker.check(&ctx).await {
                    reports.push(r);
                }
            }
        }
        Some(Cmd::Cloudflare { sub }) => {
            match sub {
                CloudflareSub::List => {
                    match cloudflare::list_dns_records(&secrets, None).await {
                        Ok(recs) => {
                            for r in recs {
                                println!("{}\t{}\t{}", r.record_type, r.name, r.content);
                            }
                        }
                        Err(e) => eprintln!("{}", e),
                    }
                }
                CloudflareSub::FixSpf { dry_run } => {
                    if let Err(e) = cloudflare::fix_spf(&secrets, &domain, *dry_run).await {
                        eprintln!("{}", e);
                    }
                }
            }
            std::process::exit(0);
        }
    }

    let all_ok = reports.iter().all(Report::ok);

    if cli.output == "json" {
        let out = OutputJson {
            ok: all_ok,
            reports: reports.clone(),
        };
        println!("{}", serde_json::to_string_pretty(&out).unwrap_or_default());
    } else {
        print_reports_human(&reports, &domain);
    }

    if !all_ok {
        std::process::exit(1);
    }
    Ok(())
}
