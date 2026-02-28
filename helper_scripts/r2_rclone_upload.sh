#!/usr/bin/env bash
set -euo pipefail

REMOTE_NAME="${REMOTE_NAME:-r2}"
BUCKET="${BUCKET:-personal-log-datas}"
PREFIX="${PREFIX:-europe_gopro_2026/}"   # must end with /
# 你要上傳的檔案（第一個參數）
LOCAL_FILE="${1:-}"

if [[ -z "$LOCAL_FILE" || "$LOCAL_FILE" == "-h" || "$LOCAL_FILE" == "--help" ]]; then
  cat <<'EOF'
Usage:
  ./r2_rclone_upload.sh <local_file_path>

Env (optional):
  REMOTE_NAME=r2
  BUCKET=personal-log-datas
  PREFIX=europe_gopro_2026/

Examples:
  ./r2_rclone_upload.sh ./europe_gopro.zip
  BUCKET=personal-log-datas PREFIX=europe_gopro_2026/ ./r2_rclone_upload.sh /path/file.zip
EOF
  exit 0
fi

if [[ ! -f "$LOCAL_FILE" ]]; then
  echo "[ERROR] Local file not found: $LOCAL_FILE" >&2
  exit 1
fi

if ! command -v rclone >/dev/null 2>&1; then
  echo "[ERROR] rclone not found. Install with: brew install rclone" >&2
  exit 1
fi

[[ "$PREFIX" == */ ]] || PREFIX="${PREFIX}/"

DEST="${REMOTE_NAME}:${BUCKET}/${PREFIX}"

echo "[INFO] Uploading:"
echo "  File : $LOCAL_FILE"
echo "  Dest : $DEST"
echo

# 可依網路狀況調整：
# --transfers: 同時傳幾個檔（單檔通常沒差）
# --checkers : 同時校驗幾個
# --s3-chunk-size: multipart chunk size（越大通常越快但吃 RAM）
# --retries/--low-level-retries: 重試次數
# --retries-sleep: 每次重試間隔
rclone copy "$LOCAL_FILE" "$DEST" \
  -P \
  --transfers 1 \
  --checkers 8 \
  --s3-chunk-size 128M \
  --retries 10 \
  --low-level-retries 20 \
  --retries-sleep 10s \
  --stats 10s \
  --stats-one-line

echo
echo "[OK] Upload finished (rclone exited 0)."
echo "Verify with:"
echo "  rclone ls ${DEST}"