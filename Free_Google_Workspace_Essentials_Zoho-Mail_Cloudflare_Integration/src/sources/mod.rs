//! 外部資料來源：Google Admin Directory API、Zoho Mail 組織帳號 API。

mod google;
mod zoho;

pub use google::google_users;
pub use zoho::zoho_mailbox_emails;

/// 使用者（email + 顯示名稱），與 Google Directory API 對應。
#[derive(Debug, PartialEq, Eq, Hash, Clone, serde::Serialize, serde::Deserialize)]
pub struct User {
    pub email: String,
    pub name: String,
}
