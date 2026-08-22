#!/usr/bin/env bash
# Track 1 / Task 3 — Malicious infrastructure analysis
#
# Find the FIRST (earliest) urlscan.io scan for the phishing domain and print the
# web-server name + version recorded in that scan's HTTP response headers.
#
# NOTE: anonymous urlscan search is limited to 100/hour per IP. If you hit HTTP 429,
# wait for the reset or export URLSCAN_API_KEY and this script will send it.
#
# Usage: ./urlscan_first_scan.sh [domain]
set -euo pipefail

DOMAIN="${1:-dynamics.ddnsking.com}"
AUTH=()
[ -n "${URLSCAN_API_KEY:-}" ] && AUTH=(-H "Api-Key: ${URLSCAN_API_KEY}")

echo "[*] Searching urlscan for domain:${DOMAIN}"
SEARCH=$(curl -s "${AUTH[@]}" \
  "https://urlscan.io/api/v1/search/?q=domain:${DOMAIN}&size=100")

# Earliest result UUID (sort by task.time ascending)
UUID=$(echo "$SEARCH" | jq -r '.results | sort_by(.task.time) | .[0]._id')
FIRST_TIME=$(echo "$SEARCH" | jq -r '.results | sort_by(.task.time) | .[0].task.time')
echo "[*] Earliest scan: $UUID  @ $FIRST_TIME"

echo "[*] Fetching result detail..."
RESULT=$(curl -s "${AUTH[@]}" "https://urlscan.io/api/v1/result/${UUID}/")

# The "Server" HTTP response header of the primary request = web server name+version
echo "[*] page.server        : $(echo "$RESULT" | jq -r '.page.server')"
echo "[*] first Server header :"
echo "$RESULT" | jq -r '
  .data.requests[]?.response?.response?.headers?
  | to_entries[]? | select(.key|ascii_downcase=="server") | .value' | head -n1
