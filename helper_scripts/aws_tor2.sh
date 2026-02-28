# 1) 安裝（如果還沒裝）
brew install awscli
# 2) 設定憑證（只在本次 terminal 有效）



export AWS_ACCESS_KEY_ID="R2_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="R2_SECRET_ACCESS_KEY"
export AWS_DEFAULT_REGION="auto"
# 3) 上傳 23GB zip 到你指定的 prefix
aws s3 cp "europe_gopro.zip" \
  "s3://BIGFILE_PATH" \
  --endpoint-url "https://BUCKET_ID.r2.cloudflarestorage.com"
# 4) 驗證檔案已在桶內
aws s3 ls "s3://BIGFILE_PATH" \
  --endpoint-url "https://BUCKET_ID.r2.cloudflarestorage.com"