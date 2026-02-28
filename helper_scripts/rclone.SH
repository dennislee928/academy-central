
# pr installation
brew install rclone
export R2_ACCESS_KEY_ID="..."            # 不要貼到聊天室
export R2_SECRET_ACCESS_KEY="..."        # 不要貼到聊天室


#!/usr/bin/env bash
set -euo pipefail

REMOTE_NAME="${REMOTE_NAME:-r2}"
ACCOUNT_ID="${ACCOUNT_ID:-8dfc8c4994bd0925c72ab9e2eff79b48}"
ENDPOINT="https://${ACCOUNT_ID}.eu.r2.cloudflarestorage.com"

: "${R2_ACCESS_KEY_ID:?Set R2_ACCESS_KEY_ID env var}"
: "${R2_SECRET_ACCESS_KEY:?Set R2_SECRET_ACCESS_KEY env var}"

if ! command -v rclone >/dev/null 2>&1; then
  echo "[ERROR] rclone not found. Install with: brew install rclone" >&2
  exit 1
fi

echo "[INFO] Creating/Updating rclone remote: ${REMOTE_NAME}"
rclone config create "${REMOTE_NAME}" s3 \
  provider Cloudflare \
  env_auth false \
  access_key_id "${R2_ACCESS_KEY_ID}" \
  secret_access_key "${R2_SECRET_ACCESS_KEY}" \
  region auto \
  endpoint "${ENDPOINT}" \
  acl private \
  no_check_bucket true \
  --non-interactive

echo "[OK] Remote '${REMOTE_NAME}' configured."
echo "[INFO] Endpoint: ${ENDPOINT}"
echo
echo "Next:"
echo "  rclone lsd ${REMOTE_NAME}:"
## post execution
chmod +x rclone.sh
./rclone.sh