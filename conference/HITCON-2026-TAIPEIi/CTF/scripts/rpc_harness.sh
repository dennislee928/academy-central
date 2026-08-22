#!/usr/bin/env bash
# TRAPA CYBER ZONE — tRPC submit/verify harness.
#
# Submits "fill" answers to track.missionViewerSubmit and detects correctness by polling
# track.missionViewerLoad for the task's submission.completed == true.
#
# Auth: export TRAPA_JWT with the Bearer token (DevTools → Network → authorization).
#       export it WITHOUT the leading "Bearer " (we add it), or with — both handled.
#
# Modes:
#   Single answer:   ./rpc_harness.sh answer "<value>"
#   Dictionary:      ./rpc_harness.sh dict   <wordlist-file>
#   Just check:      ./rpc_harness.sh check
#
# Configure the IDs below (defaults = Track 2 "Malicious Service Name"). Get IDs via:
#   curl -s .../rpc/track/getZoneTrackMissionsBySlug -H "authorization: $AUTH" \
#     -H 'content-type: application/json' \
#     --data '{"json":{"zoneSlug":"2026_hcr_mini_range","trackSlug":"<track-slug>"}}'
set -euo pipefail

BASE="https://hitcon2026.trapa.zone"
ZONE_ID="${ZONE_ID:-Zone01M06PGE61DKN85F1ST368VYRG}"
TRACK_ID="${TRACK_ID:-Track01M06PGRWJW858VB5WK8GCZT6N}"
MISSION_ID="${MISSION_ID:-Mission01M0744VV36MCJRT0AEPVSS4NG}"
TASK_ID="${TASK_ID:-Task01M0744VVENF6DR2YC1TZ3QVQE}"

: "${TRAPA_JWT:?set TRAPA_JWT to your Bearer token}"
AUTH="$TRAPA_JWT"; [[ "$AUTH" == Bearer\ * ]] || AUTH="Bearer $AUTH"
CT='content-type: application/json'

submit() { # $1 = answer value
  curl -s -o /dev/null -X POST "$BASE/rpc/track/missionViewerSubmit" \
    -H "authorization: $AUTH" -H "$CT" \
    --data "{\"json\":{\"zoneId\":\"$ZONE_ID\",\"trackId\":\"$TRACK_ID\",\"submissions\":[{\"taskId\":\"$TASK_ID\",\"payload\":{\"type\":\"fill\",\"value\":[\"$1\"]}}]}}"
}

completed() { # prints true|false|x for the task
  curl -s -X POST "$BASE/rpc/track/missionViewerLoad" \
    -H "authorization: $AUTH" -H "$CT" \
    --data "{\"json\":{\"zoneId\":\"$ZONE_ID\",\"trackId\":\"$TRACK_ID\",\"missionId\":\"$MISSION_ID\"}}" \
  | python3 -c "import sys,re;t=sys.stdin.read();i=t.find('$TASK_ID');m=re.search(r'\"completed\":(true|false)',t[i:]);print(m.group(1) if m and i>=0 else 'x')"
}

case "${1:-}" in
  check)  echo "completed=$(completed)";;
  answer) submit "$2"; echo "submitted '$2' → completed=$(completed)";;
  dict)
    [ -f "${2:-}" ] || { echo "usage: $0 dict <wordlist>"; exit 1; }
    n=0
    while IFS= read -r w; do
      [ -z "$w" ] && continue
      n=$((n+1)); submit "$w"
      if [ "$(completed)" = "true" ]; then echo "HIT after $n tries: [$w]"; exit 0; fi
    done < "$2"
    echo "no hit ($n tried)"
    ;;
  *) echo "usage: $0 {check | answer <value> | dict <wordlist>}"; exit 1;;
esac
