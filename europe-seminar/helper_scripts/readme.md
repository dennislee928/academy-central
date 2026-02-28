# Helper Scripts

## R2 / S3 上傳設定

- **Bucket prefix:** `europe_gopro_2026/`
- **Account ID:** `8dfc8c4994bd0925c72ab9e2eff79b48`
- R2 bucket 位於 **EU** → endpoint 須為：
  `https://<ACCOUNT_ID>.eu.r2.cloudflarestorage.com`

---

## 安裝 AWS CLI (macOS)

```bash
brew install awscli
```

---

## 憑證設定（擇一）

### Option A — 環境變數（建議快速使用）

```bash
export AWS_ACCESS_KEY_ID="R2_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="R2_SECRET_ACCESS_KEY"
export AWS_DEFAULT_REGION="auto"
```

### Option B — AWS profile

```bash
aws configure --profile r2
export AWS_PROFILE="r2"
export AWS_DEFAULT_REGION="auto"
```

**請勿將憑證提交至 git。**

---

## 使用方式

1. **賦予腳本執行權限：**

   ```bash
   chmod +x ./r2_upload.sh
   ```

2. **上傳檔案：**

   ```bash
   ./r2_upload.sh ./europe_gopro.zip
   ```

   會上傳至：

   `s3://personal-log-datas/europe_gopro_2026/europe_gopro.zip`

---

## 驗證

列出 prefix 下的物件：

```bash
aws s3 ls "s3://personal-log-datas/europe_gopro_2026/" \
  --endpoint-url "https://8dfc8c4994bd0925c72ab9e2eff79b48.eu.r2.cloudflarestorage.com"
```

檢查單一物件 metadata：

```bash
aws s3api head-object \
  --bucket personal-log-datas \
  --key europe_gopro_2026/europe_gopro.zip \
  --endpoint-url "https://8dfc8c4994bd0925c72ab9e2eff79b48.eu.r2.cloudflarestorage.com"
```

---

## 備註

- 腳本會計算本地 SHA256 並寫入物件 metadata（`sha256=...`）。
- 長時間上傳時可保持 Mac 不休眠：

  ```bash
  caffeinate -dimsu
  ```

### 常見錯誤

| 錯誤 | 可能原因 |
|------|----------|
| `NoSuchBucket` | 用錯 endpoint（EU bucket 須用 `.eu.r2.cloudflarestorage.com`） |
| `AccessDenied` | 憑證權限無法寫入該 bucket |
| `Unable to locate credentials` | 未設定環境變數或 profile |
