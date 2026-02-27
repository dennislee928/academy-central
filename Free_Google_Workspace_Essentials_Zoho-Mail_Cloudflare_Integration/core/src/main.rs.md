use std::collections::HashSet;
use console::{style, Emoji};

#[derive(Debug, PartialEq, Eq, Hash, Clone)]
struct User {
    email: String,
    name: String,
}

#[tokio::main]
async fn main() -> color_eyre::Result<()> {
    color_eyre::install()?;

    println!("\n{} {} 啟動 Sentinel-RS 身份同步檢查...", 
             Emoji("🚀", ""), style("dennisleehappy.org").cyan().bold());
    println!("--------------------------------------------------");

    // 1. 根據您的截圖 [10.38.11 AM] 模擬 Google Admin 的 9 人名單
    let google_users = vec![
        User { name: "Alexi Laiho".into(), email: "alexi.laiho@dennisleehappy.org".into() },
        User { name: "Marty Friedman".into(), email: "cto@dennisleehappy.org".into() },
        User { name: "Paul Gilbert".into(), email: "paul.gilbert@dennisleehappy.org".into() },
        User { name: "Lee Pei Chen".into(), email: "admin@dennisleehappy.org".into() },
        User { name: "John Petrucci".into(), email: "john.petrucci@dennisleehappy.org".into() },
        User { name: "Raj Shiva".into(), email: "shiva@dennisleehappy.org".into() },
        User { name: "Neo Trinity".into(), email: "trinity@dennisleehappy.org".into() },
        User { name: "Steve Vai".into(), email: "steve.vai@dennisleehappy.org".into() },
        User { name: "Taka Yoshi".into(), email: "takayoshi@dennisleehappy.org".into() },
    ];

    // 2. 根據您的截圖 [10.37.57 AM / 11.00.30 AM] 模擬目前 Zoho 已佔用的 Email
    let mut zoho_users_emails: HashSet<String> = HashSet::new();
    zoho_users_emails.insert("dennis.lee@dennisleehappy.org".to_string());
    zoho_users_emails.insert("mike@dennisleehappy.org".to_string());

    println!("{}", style("正在比對身份同步狀態...").dim());

    let mut gap_count = 0;

    // 3. 執行比對邏輯
    for g_user in &google_users {
        if zoho_users_emails.contains(&g_user.email) {
            println!("{} {}: {}", 
                     Emoji("✅", ""), 
                     style(&g_user.name).green(), 
                     style("身分同步正常 (可收發信)").dim());
        } else {
            gap_count += 1;
            println!("{} {}: {}", 
                     Emoji("⚠️", ""), 
                     style(&g_user.name).yellow().bold(), 
                     style("授權缺口！僅能使用 Drive 協作，無法收信").red());
        }
    }

    // 4. 統計與警示
    let total_zoho_limit = 5;
    let used_zoho = zoho_users_emails.len();

    println!("\n{}", style("--- 掃描報告 ---").bold());
    println!("Google Admin 總人數: {}", google_users.len());
    println!("Zoho Mail 已用授權: {} / {}", used_zoho, total_zoho_limit);
    println!("Zoho 剩餘可用授權: {}", total_zoho_limit - used_zoho);
    
    if gap_count > 0 {
        println!("\n{} 發現 {} 位成員存在「收信授權缺口」。", 
                 Emoji("🚨", ""), style(gap_count).on_red().white().bold());
        println!("{}", style("提示：請在 Zoho Admin 手動新增這些使用者（上限 5 人）。").dim());
    }

    if used_zoho >= total_zoho_limit {
        println!("\n{}", style("🛑 警告：Zoho 免費授權已達上限，無法再新增收信帳號！").red().bold());
    }

    Ok(())
}