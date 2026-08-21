# HITCON 2026 Mini Cyber Range — Writeup

Platform: **TRAPA CYBER ZONE** — https://hitcon2026.trapa.zone/z/2026_hcr_mini_range
Player account: `HIT26030@trapa.training`
Date worked: 2026-08-21

> **Scenario:** A domestic security-solutions company (govt + financial clients) is
> targeted by a foreign APT. The SOC logged: leaked employee creds, convincing
> phishing, a compromised AI coding assistant (supply-chain), and the company's own
> AI systems being probed. You join the IR team: trace the alerts, reconstruct the
> full attack chain, and execute IR. Features a live AI offense/defense arena where
> you may bring your own agents.

## Tracks (5)

| # | Track | Tasks | Pts | Status |
|---|-------|-------|-----|--------|
| 1 | Open Source Intelligence   | 3 | 300  | ✅ **3/3 solved** |
| 2 | Windows Post Exploitation  | 2 (5 sub-tasks) | 600 | 🟡 SILKTHREAD 4/5 answers; task 5 unresolved (host unreachable) |
| 3 | AI - Prompt Jailbreaking   | 6 | 500  | ✅ **6/6 solved** (5 flags) |
| 4 | AI - Bring Your Own Agent  | 2 | 1000 | 🟡 8/19 findings remediated, 12/12 business fns up (no full pass) |
| 5 | AI - The Token Sink        | 1 | 800  | 🟠 Binary fully reversed; lab auto-terminated before solve |

**Result:** 2 tracks fully solved (OSINT, Jailbreaking); Windows 4/5; BYO partial; Token Sink blocked at the platform (lab terminated, "cannot be started again").

## Per-track writeups

- [`osint-track.md`](./osint-track.md) — Track 1, Open Source Intelligence ✅
- [`ai-prompt-jailbreaking.md`](./ai-prompt-jailbreaking.md) — Track 3, AI Breach Arena ✅
- [`windows-post-exploitation.md`](./windows-post-exploitation.md) — Track 2, Operation SILKTHREAD
- [`byo-agent.md`](./byo-agent.md) — Track 4, Helpdesk Emergency Remediation (19-finding hardening)
- [`token-sink.md`](./token-sink.md) — Track 5, Trap Zone (reversed protocol + solver)
- [`architecture.md`](./architecture.md) — platform architecture, tRPC API, lab access model
- [`scripts/`](./scripts) — helper scripts (Mailpit, HIBP, urlscan, RPC harness, BYO remediation, Token Sink solver)

## Environment notes (critical)

- **Two hosts.** The platform/API is `hitcon2026.trapa.zone` (reachable from anywhere).
  The live labs are on `lab.trapa.zone` and are **IP-allowlisted to HITCON on-site
  Wi-Fi only** — off-site you get a JS `alert("Client ip not in allowlist")` which also
  freezes browser automation (close the tab). Flag *submission* is NOT IP-gated.
- **Lab lifecycle.** LAB challenges spin up a cloud VM (3–5 min startup) via the
  challenge page → **Endpoints → Connect** (mints a one-time OTP in the endpoint URL).
  Endpoints seen: Windows RDP (IronRDP), Linux SSH/`web`, noVNC, Mailpit webmail.
  Some labs **auto-terminate on a timer and cannot be restarted** (Token Sink did).
- **One-shot labs.** The BYO "Helpdesk Emergency Remediation" lab is a **single
  irreversible attempt** on a 2-hour scored clock (score decays; min 100). Do not
  Start it until on-site and ready.
- **Answer model.** Sub-challenges are either an **intro** (Continue → Submit) or a
  **question form**. Correct answers flip to green / show "Mission Complete". The
  underlying API is tRPC — see [`architecture.md`](./architecture.md).

## Quick reference — IDs

| Thing | Value |
|-------|-------|
| Zone slug / id | `2026_hcr_mini_range` / `Zone01M06PGE61DKN85F1ST368VYRG` |
| Track 1 OSINT slug | `osint-ithome-2026-copy` |
| Track 2 WinPE slug / id | `post-exploitation-ithome-2026-copy` / `Track01M06PGRWJW858VB5WK8GCZT6N` |
| — SILKTHREAD mission id | `Mission01M0744VV36MCJRT0AEPVSS4NG` |
| — "Malicious Service Name" task id | `Task01M0744VVENF6DR2YC1TZ3QVQE` |
| Track 3 AI slug | `ai-ithome-2026-copy` |
| Track 4 BYO track id | `Track01M06QGQCEXNXFVEMTSAE220J7` |
| Track 5 Token Sink track id | `Track01M09VA9B6GHDGK6PC8K1HT2M0` |

> **Secrets:** the API needs a `Bearer` JWT (copy from DevTools → Network →
> `authorization` header). Scripts read it from `$TRAPA_JWT`. **Never commit the token.**
</content>
