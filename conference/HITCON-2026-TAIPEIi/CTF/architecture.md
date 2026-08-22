# Platform Architecture — TRAPA CYBER ZONE

Observed architecture of the HITCON 2026 Mini Cyber Range (black-box, from the client
bundle + network traffic). Nothing here is privileged; it documents how to interact.

## Hosts & topology

```
                    ┌─────────────────────────────────────────────┐
  Player browser ──►│ hitcon2026.trapa.zone   (reachable anywhere) │
   (Brave + JWT)    │  • React SPA (Vite bundle /assets/index-*.js)│
                    │  • tRPC API at /rpc/*  (auth: Bearer JWT)     │
                    │  • file store /api/files/<User..>/<File..>    │
                    └──────────────┬──────────────────────────────┘
                                   │ Endpoints → Connect (mints OTP)
                                   ▼
                    ┌─────────────────────────────────────────────┐
                    │ lab.trapa.zone   (IP-ALLOWLISTED, on-site)   │
                    │  • /rdp  Windows RDP (IronRDP, canvas client)│
                    │  • /ssh  Linux terminal (TRAP Shell)         │
                    │  • /vnc  noVNC desktop (trap-client)         │
                    │  • /web  AI Breach Arena chat                │
                    │  • Mailpit webmail (per-lab hash host)       │
                    └─────────────────────────────────────────────┘
```

- **`hitcon2026.trapa.zone`** — SPA + API. Title "TRAPA CYBER ZONE™". Single JS bundle;
  router has `/z/:zoneSlug`, `/zones`, per-track `/z/<zone>/t/<trackSlug>/<n>`.
- **`lab.trapa.zone`** — all live labs. **IP-allowlisted to HITCON on-site Wi-Fi.**
  Off-list → JS `alert("Client ip not in allowlist")` (this native dialog also **blocks
  browser-automation** — close the tab to recover). Direct navigation without the OTP →
  `Authentication failed: No OTP provided in URL`.

## Auth

- **JWT bearer**, HS256. Payload: `{sub: User01…, iat, nbf, exp, epoch}` (~30-day exp).
  Sent as `authorization: Bearer <jwt>` on every `/rpc/*` call. Grab from DevTools →
  Network. **Treat as a secret — never commit.** Scripts read `$TRAPA_JWT`.

## tRPC API (`POST /rpc/<router>.<proc>`)

All inputs are wrapped in a tRPC **`{"json": { … }}`** envelope. Content-type
`application/json`. Endpoints used:

| Procedure | Input | Returns |
|-----------|-------|---------|
| `auth.status` | — | session status |
| `zone.listZones` | — | zones |
| `track.getZoneTrackMissionsBySlug` | `{zoneSlug, trackSlug}` | missions + task tree |
| `track.missionViewerLoad` | `{zoneId, trackId, missionId}` | tasks[] w/ `submission.completed` |
| `track.missionViewerSubmit` | `{zoneId, trackId, submissions:[{taskId, payload:{type:"fill", value:[…]}}]}` | `{}` (fire-and-forget) |

**Correctness detection:** `missionViewerSubmit` returns `{}` regardless. Poll
`missionViewerLoad` and read the task's `submission.completed` (`true` = correct). This is
exactly what [`scripts/rpc_harness.sh`](./scripts/rpc_harness.sh) automates.

Payload types seen: `fill` (text answers), plus intro "Continue" tasks. The submit UI
shows a "Confirm Submission" modal, but the RPC accepts direct POSTs (no CSRF token; JWT
is the only gate).

## Lab access flow

1. Track sub-task /1 is usually an **Environment Overview** with a **LAB** panel.
2. Click **Endpoints (N/N)** → pick an endpoint (RDP/SSH/VNC/web) → **Connect**.
3. Connect mints a one-time **OTP** in the opened URL and drops you into the proxied lab.
4. VMs take 3–5 min to boot; some **auto-terminate on a timer and cannot restart**
   (Token Sink). The BYO helpdesk lab is a **one-shot scored attempt**.

## Content themes (from the bundle)

Heavy MITRE ATLAS, OWASP GenAI, vLLM/Ollama, MCP-server-security and prompt-injection
references → the range is an **AI-security / red-team** range wrapped in an APT IR story.

## Automation gotchas (what breaks)

- **IronRDP** (`/rdp`) is a canvas/WebGL client that the browser-automation extension
  can't inject into reliably — it crashes ("Error loading tab") on automated connect.
  Drive it interactively (human) instead.
- Native `alert()` dialogs from `lab.trapa.zone` freeze the automation MCP — avoid or
  close the tab.
- `claude-in-chrome` (extension) connects to the user's real logged-in Brave; the
  `chrome-devtools` MCP needs a Chromium binary (`--executablePath` to Brave) and a
  session restart. Both are viable bridges; extension is simpler for a logged-in session.
</content>
