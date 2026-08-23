#!/usr/bin/env bash
set -Eeuo pipefail

cd "$(dirname "$0")"

PROJECT_ID="${PROJECT_ID:-$(gcloud config get-value project 2>/dev/null || true)}"
if [[ -z "$PROJECT_ID" || "$PROJECT_ID" == "(unset)" || "$PROJECT_ID" == "qwiklabs-resources" ]]; then
  PROJECT_ID="$(gcloud projects list --filter='projectId:qwiklabs-gcp-*' --format='value(projectId)' 2>/dev/null | head -n 1 || true)"
fi
[[ -n "$PROJECT_ID" ]] || { echo "Set PROJECT_ID first." >&2; exit 1; }
export PROJECT_ID
export REGION="${REGION:-us-central1}"
export ZONE="${ZONE:-us-central1-a}"

echo "Project: $PROJECT_ID"
echo "Region:  $REGION"
echo "Zone:    $ZONE"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required. In Cloud Shell it is usually installed."
  exit 1
fi

npm install
npx playwright install chromium
npm run run
