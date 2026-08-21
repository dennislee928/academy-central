# scripts/

Helper scripts for the HITCON 2026 Mini Cyber Range writeup. Most need secrets via env
vars — **never hardcode/commit tokens**.

| Script | Track | Purpose | Env |
|--------|-------|---------|-----|
| `hibp_check.sh` | 1 | Check emails vs Have I Been Pwned | `HIBP_API_KEY` (or use the website) |
| `mailpit_find_phish.js` | 1 | Browser-console: list senders, flag homoglyph phish, extract URLs | run in the Mailpit lab tab |
| `urlscan_first_scan.sh` | 1 | Earliest urlscan scan → web-server name+version | `URLSCAN_API_KEY` (optional) |
| `rpc_harness.sh` | any | tRPC submit + verify (`submission.completed`); single / dictionary | `TRAPA_JWT` |
| `service_name_wordlist.txt` | 2 | Candidate service names for `rpc_harness.sh dict` (low odds — prefer host recon) | — |
| `byo_remediate.sh` | 4 | Idempotent hardening of the Helpdesk host (run on the box as `sre`) | run on host |
| `tokensink_solver.py` | 5 | Oracle solver skeleton (PRNG + seed recovery + framed answer) | run on trap-client; pwntools/pyte |

## Common usage

```bash
export TRAPA_JWT='<paste Bearer token from DevTools>'   # do NOT commit

# check a task's completion
./rpc_harness.sh check
# submit a single answer
./rpc_harness.sh answer 'Apache'
# dictionary (last resort; a unique service name is not practically brute-forceable)
./rpc_harness.sh dict service_name_wordlist.txt
```

Override the target task by exporting `ZONE_ID`, `TRACK_ID`, `MISSION_ID`, `TASK_ID`
(defaults target Track 2's "Malicious Service Name"). Discover IDs with
`track.getZoneTrackMissionsBySlug` (see `../architecture.md`).
</content>
