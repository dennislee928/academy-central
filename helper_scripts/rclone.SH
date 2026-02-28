brew install rclone
#2) 建一個 remote（只做一次）
rclone config

#互動設定建議值（重點欄位）：

#n new remote

#name：r2

#storage：s3

#provider：選 Cloudflare

#access_key_id / secret_access_key：填你的

#region：auto

endpoint：
https://ACCOUNT_ID.r2.cloudflarestorage.com

#3) 上傳（帶進度）
rclone copy "FILE_PATH" "r2:BIGFILE_PATH" -P
#4) 檢查
rclone ls "r2:BIGFILE_PATH"