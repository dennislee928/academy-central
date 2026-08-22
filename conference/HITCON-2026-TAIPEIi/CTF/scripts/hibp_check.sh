#!/usr/bin/env bash
# Track 1 / Task 1 — check emails against Have I Been Pwned.
#
# The web UI (https://haveibeenpwned.com/) is enough for this exercise. This script uses
# the public API v3 which requires an API key (export HIBP_API_KEY). Without a key,
# just use the website. Prints breach names per email (earliest first by AddedDate).
set -euo pipefail
EMAILS=("$@")
[ ${#EMAILS[@]} -eq 0 ] && EMAILS=(pwn@example.com shock@example.com dear@example.com noise@example.com ootd@example.com)
: "${HIBP_API_KEY:?export HIBP_API_KEY (or use the website https://haveibeenpwned.com/)}"

for e in "${EMAILS[@]}"; do
  echo "== $e =="
  curl -s -H "hibp-api-key: ${HIBP_API_KEY}" -H 'user-agent: hitcon-writeup' \
    "https://haveibeenpwned.com/api/v3/breachedaccount/$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$e")?truncateResponse=false" \
  | jq -r 'if type=="array" then (sort_by(.BreachDate) | .[] | "\(.Name)  (\(.BreachDate))") else "no breaches" end' 2>/dev/null || echo "no breaches / not found"
  sleep 2   # HIBP rate limit
done
# Known answer (2026-08-21): dear@example.com -> Edmodo (2017-05-11).
