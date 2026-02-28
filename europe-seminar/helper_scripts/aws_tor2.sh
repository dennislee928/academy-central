#!/usr/bin/env bash
set -euo pipefail

# --- Config (edit if needed) ---
ACCOUNT_ID="${ACCOUNT_ID:-8dfc8c4994bd0925c72ab9e2eff79b48}"
BUCKET="${BUCKET:-personal-log-datas}"
PREFIX="${PREFIX:-europe_gopro_2026/}"     # must end with /
ENDPOINT="https://${ACCOUNT_ID}.eu.r2.cloudflarestorage.com"

# --- Usage ---
usage() {
  cat <<'EOF'
Usage:
  ./r2_upload.sh <local_file_path> [object_name]

Required env (choose ONE way):
  Option A (env vars):
    export AWS_ACCESS_KEY_ID="..."
    export AWS_SECRET_ACCESS_KEY="..."
    export AWS_DEFAULT_REGION="auto"

  Option B (aws profile):
    export AWS_PROFILE="r2"
    export AWS_DEFAULT_REGION="auto"

Examples:
  ./r2_upload.sh ./europe_gopro.zip
  ./r2_upload.sh ./europe_gopro.zip europe_gopro.zip
  ACCOUNT_ID=... BUCKET=... PREFIX=... ./r2_upload.sh ./file.zip
EOF
}

if [[ "${1:-}" == "" || "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

LOCAL_FILE="$1"
OBJECT_NAME="${2:-$(basename "$LOCAL_FILE")}"
# normalize prefix
[[ "$PREFIX" == */ ]] || PREFIX="${PREFIX}/"
OBJECT_KEY="${PREFIX}${OBJECT_NAME}"

# --- Preflight checks ---
if [[ ! -f "$LOCAL_FILE" ]]; then
  echo "[ERROR] Local file not found: $LOCAL_FILE" >&2
  exit 1
fi

if ! command -v aws >/dev/null 2>&1; then
  echo "[ERROR] aws CLI not found. Install with: brew install awscli" >&2
  exit 1
fi

echo "[INFO] Endpoint : $ENDPOINT"
echo "[INFO] Bucket   : $BUCKET"
echo "[INFO] Key      : $OBJECT_KEY"
echo "[INFO] File     : $LOCAL_FILE"
echo

# Optional: prevent Mac sleep (comment out if not needed)
# caffeinate -dimsu & CAFFEINATE_PID=$!
# trap 'kill ${CAFFEINATE_PID:-0} 2>/dev/null || true' EXIT

echo "[INFO] Checking bucket exists (EU jurisdiction)..."
aws s3api head-bucket --bucket "$BUCKET" --endpoint-url "$ENDPOINT" >/dev/null
echo "[OK] Bucket reachable."
echo

# Optional: store local sha256 as object metadata (handy for later verification)
SHA256="$(shasum -a 256 "$LOCAL_FILE" | awk '{print $1}')"
echo "[INFO] Local SHA256: $SHA256"
echo

echo "[INFO] Uploading (multipart supported)..."
aws s3 cp "$LOCAL_FILE" "s3://${BUCKET}/${OBJECT_KEY}" \
  --endpoint-url "$ENDPOINT" \
  --metadata "sha256=${SHA256}"

echo
echo "[INFO] Verifying object exists..."
aws s3api head-object --bucket "$BUCKET" --key "$OBJECT_KEY" \
  --endpoint-url "$ENDPOINT" >/dev/null

echo "[OK] Upload complete:"
echo "     s3://${BUCKET}/${OBJECT_KEY}"