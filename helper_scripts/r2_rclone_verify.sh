#!/usr/bin/env bash
set -euo pipefail

REMOTE_NAME="${REMOTE_NAME:-r2}"
BUCKET="${BUCKET:-personal-log-datas}"
PREFIX="${PREFIX:-europe_gopro_2026/}"   # must end with /
[[ "$PREFIX" == */ ]] || PREFIX="${PREFIX}/"

DEST="${REMOTE_NAME}:${BUCKET}/${PREFIX}"

echo "[INFO] Listing:"
rclone ls "$DEST" | head -n 50

echo
echo "[INFO] (Optional) Show object metadata-like info (size/modtime):"
rclone lsl "$DEST" | head -n 50

echo
echo "[NOTE] R2(S3) 不一定支援 rclone 的 server-side hash（MD5/sha1）一致可用。"
echo "      若你要完整完整性校驗，建議："
echo "      1) 本地先算 sha256 記錄"
echo "      2) 下載回來再比對（或用 aws metadata 存 sha256）。"