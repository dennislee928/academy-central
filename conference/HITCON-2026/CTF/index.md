# HITCON 2026 Mini Cyber Range — Directory Index / 目錄總覽

This directory holds the complete writeup for the **HITCON 2026 Mini Cyber Range**, run on
the **TRAPA CYBER ZONE** platform (`https://hitcon2026.trapa.zone/z/2026_hcr_mini_range`)
and played on **2026-08-21** with the player account `HIT26030@trapa.training`.

The range is an **AI-security / red-team range wrapped in an APT incident-response story**.
情境設定：一家同時服務政府與金融客戶的本土資安方案公司遭到境外 APT 鎖定。SOC 記錄到四類警訊
—— 外洩的員工憑證、極具說服力的釣魚郵件、被供應鏈污染的 AI coding assistant，以及公司自家 AI
系統被探測。你以 IR 團隊成員的身分加入：追查警報、重建完整攻擊鏈、並執行事件應變。範圍中另有
一個即時的 AI 攻防競技場，允許你帶自己的 agent 進場。

**Overall result:** 5 tracks attempted — 2 fully solved, 3 partial or blocked.

| # | Track | Tasks | Pts | Status |
|---|-------|-------|-----|--------|
| 1 | Open Source Intelligence | 3 | 300 | ✅ **3/3 solved** |
| 2 | Windows Post Exploitation | 2 (5 sub-tasks) | 600 | 🟡 SILKTHREAD 4/5; task 5 unresolved (host unreachable) |
| 3 | AI — Prompt Jailbreaking | 6 | 500 | ✅ **6/6 solved** |
| 4 | AI — Bring Your Own Agent | 2 | 1000 | 🟡 8/19 findings remediated, 12/12 business functions up |
| 5 | AI — The Token Sink | 1 | 800 | 🟠 binary fully reversed; lab auto-terminated before solve |

Two of the three incomplete tracks were blocked by **environment access**, not by the
puzzles — see [Platform & environment](#platform--environment--平台與環境).

---

## How to read this directory / 如何閱讀本目錄

| File | What it is | Who should read it | Order |
|------|-----------|--------------------|-------|
| [`README.md`](./README.md) | Top-level writeup: scenario, 5-track results table, environment notes, ID quick-reference | Everyone — start here | 1 |
| [`index.md`](./index.md) | This page: full directory explanation, diagrams, script reference | Anyone arriving cold | 1 |
| [`architecture.md`](./architecture.md) | Black-box platform architecture: hosts, JWT auth, tRPC API surface, lab access flow, automation gotchas | Anyone automating against the platform | 2 |
| [`osint-track.md`](./osint-track.md) | Track 1 writeup — HIBP, Mailpit phishing forensics, urlscan.io infra analysis | OSINT / DFIR readers | 3 |
| [`windows-post-exploitation.md`](./windows-post-exploitation.md) | Track 2 writeup — Operation SILKTHREAD, supply-chain → service persistence | Windows DFIR readers | 4 |
| [`ai-prompt-jailbreaking.md`](./ai-prompt-jailbreaking.md) | Track 3 writeup — AI Breach Arena attack + defend sides, plus a reusable jailbreak playbook | LLM red-teamers | 5 |
| [`byo-agent.md`](./byo-agent.md) | Track 4 writeup — 19-finding hardening exercise, real-vs-trap verdicts, 12 business functions | Blue-team / hardening readers | 6 |
| [`token-sink.md`](./token-sink.md) | Track 5 writeup — full reverse engineering of an obfuscated anti-agent binary | RE readers | 7 |
| [`scripts/README.md`](./scripts/README.md) | Script index + common usage + env-var contract | Before running anything | 8 |
| [`scripts/`](./scripts) | The 7 helper artefacts themselves | Practitioners reproducing the work | 8 |

Suggested path for a reader who wasn't there: `README.md` → this page → `architecture.md`
→ the track writeup you care about → the matching script.

---

## Platform & environment / 平台與環境

The range runs on **two hosts**, and the split is the single most important operational
fact in this directory.

| Host | What lives there | Reachability |
|------|------------------|--------------|
| `hitcon2026.trapa.zone` | React SPA (Vite bundle), tRPC API at `/rpc/*` (Bearer JWT, HS256, ~30-day exp), file store at `/api/files/…` | ✅ Reachable from anywhere |
| `lab.trapa.zone` | All live labs: `/rdp` (Windows, IronRDP), `/ssh` (TRAP Shell), `/vnc` (noVNC), `/web` (AI Breach Arena), Mailpit webmail on a per-lab hash host | 🚫 **IP-allowlisted to HITCON on-site Wi-Fi only** |

Off the allowlist, `lab.trapa.zone` answers with a native JS
`alert("Client ip not in allowlist")` — which also **freezes browser automation** (close
the tab to recover). Navigating directly without an OTP gives
`Authentication failed: No OTP provided in URL`.

**Practical consequence — which tracks were blocked off-site:**

- **Flag/answer submission is NOT IP-gated.** It goes to `hitcon2026.trapa.zone`, so
  answers already known could still be submitted from anywhere.
- **Track 2 (Windows)** needs live RDP into the snapshot VM to read the persistence
  service name off the host. When the network dropped off the allowlist, task 5 became
  unobtainable — the fallback dictionary attack against the tRPC API found nothing.
- **Track 4 (BYO Agent)** needs an SSH session on the helpdesk host. Remaining fixes were
  staged but could not be applied once access ended.
- **Track 5 (Token Sink)** needs a shell on the trap-client. The lab **auto-terminated on
  its own timer (14:36) and "cannot be started again"**, so the solver never ran.
- **Tracks 1 and 3** were completed while on the allowlisted network (Track 1's HIBP and
  urlscan.io steps are ordinary internet research and are reproducible anywhere; only its
  Mailpit step was lab-bound).

### Lab lifecycle

LAB challenges spin up a cloud VM (3–5 min startup) from the challenge page via
**Endpoints → Connect**, which mints a **one-time OTP** into the opened URL. Some labs
auto-terminate on a timer and cannot be restarted. The BYO helpdesk lab is a **single,
irreversible attempt** on a 2-hour scored clock (score decays, floor 100) — do not press
Start until you are on-site and ready.

### Platform topology

```mermaid
graph TD
    B["Player browser (Brave + Bearer JWT)"]
    P["hitcon2026.trapa.zone<br/>reachable anywhere"]
    SPA["React SPA (Vite bundle)"]
    API["tRPC API /rpc/*<br/>auth: Bearer JWT (HS256)"]
    FS["File store /api/files/..."]
    L["lab.trapa.zone<br/>IP-allowlisted to HITCON on-site Wi-Fi"]
    RDP["/rdp Windows RDP (IronRDP canvas)"]
    SSH["/ssh Linux terminal (TRAP Shell)"]
    VNC["/vnc noVNC desktop (trap-client)"]
    WEB["/web AI Breach Arena chat"]
    MP["Mailpit webmail (per-lab hash host)"]

    B --> P
    P --> SPA
    P --> API
    P --> FS
    P -->|"Endpoints then Connect: mints one-time OTP"| L
    L --> RDP
    L --> SSH
    L --> VNC
    L --> WEB
    L --> MP
```

### The tRPC answer model

Sub-challenges are either an **intro** (Continue → Submit) or a **question form**.
`track.missionViewerSubmit` is fire-and-forget — it returns `{}` whether or not the answer
was right. Correctness is detected by polling `track.missionViewerLoad` and reading the
task's `submission.completed`. That poll-after-submit loop is exactly what
[`scripts/rpc_harness.sh`](./scripts/rpc_harness.sh) automates. The JWT is the only gate:
there is no CSRF token, so direct POSTs work.

> **Secrets:** the Bearer JWT is copied from DevTools → Network → `authorization`. Scripts
> read it from `$TRAPA_JWT`. **Never commit the token.**

---

## The attack chain the scenario asks you to reconstruct

Each track lights up one stage of a single narrative — from credential exposure through
supply-chain compromise to persistence, with the company's own AI systems probed in
parallel.

```mermaid
graph TD
    T1["Track 1 OSINT: employee creds in a dark-web leak (T1589.001)"]
    PH["Spear-phishing mail from a homoglyph sender domain (T1566.002)"]
    INF["Throwaway dynamic-DNS phishing infrastructure (T1596.005)"]
    AI["AI coding assistant tainted by prompt injection / poisoned context"]
    REPO["Developer pulls the AI-recommended malicious repo (T1195.002)"]
    DROP["Malicious binary dropped on the Windows host"]
    C2["Ingress tool transfer from the C and C file server (T1105)"]
    PERS["Windows service persistence survives cleanup and reboot (T1543.003)"]
    PROBE["Track 3: the company's own AI systems probed and jailbroken"]
    IR["Track 4: remediate the compromised host without breaking the business"]

    T1 --> PH
    PH --> INF
    INF --> AI
    AI --> REPO
    REPO --> DROP
    DROP --> C2
    C2 --> PERS
    AI --> PROBE
    PERS --> IR
```

---

## Track 1 — Open Source Intelligence (300 pts) ✅ 3/3

**Writeup:** [`osint-track.md`](./osint-track.md) · slug `osint-ithome-2026-copy`

**Objective:** confirm which employee credentials leaked, find the resulting spear-phishing
mail, and profile the attacker's hosting infrastructure.

| Task | ATT&CK | Technique exercised | Outcome |
|------|--------|---------------------|---------|
| 1. Data breach investigation | T1589.001 | Check five employee addresses against haveibeenpwned.com; identify the one with a breach record and name the earliest incident | ✅ one address matched a single 2017 education-platform breach |
| 2. Phishing email forensics | T1566.002 | Enumerate every sender in a Mailpit corporate webmail lab via its API instead of clicking through; spot the **homoglyph** sender domain (a capital `I` standing in for lowercase `l`) and extract the payload URL | ✅ sender + malicious URL identified |
| 3. Malicious infrastructure analysis | T1596.005 | Pull the urlscan.io scan history for the phishing domain, sort by scan time, and read the `Server` response header from the earliest scan that actually captured the site | ✅ web-server name and version submitted; **"Track Complete!" 3/3** |

**Worth noting:** the phishing domain sits on a No-IP dynamic-DNS provider — classic
throwaway infrastructure. And the *literally* first urlscan record errored ("could not
scan this website"); the answer comes from the first scan that successfully captured the
site, about a month later. Anonymous urlscan search is capped at 100 queries/hour per IP,
which is easy to exhaust at a busy venue.

---

## Track 2 — Windows Post Exploitation (600 pts) 🟡 4/5

**Writeup:** [`windows-post-exploitation.md`](./windows-post-exploitation.md) · slug
`post-exploitation-ithome-2026-copy`

**Objective:** the dev team adopted an AI coding assistant; the assistant was tainted by
prompt injection into recommending a malicious resource, an engineer followed it, and the
machine went abnormal. Mission **Operation SILKTHREAD** is five sequential questions
answered from a preserved post-incident Windows snapshot (investigate, don't remediate),
reached over **Windows RDP (IronRDP)**.

ATT&CK: **T1195.002** (compromise software supply chain), **T1105** (ingress tool
transfer), **T1543.003** (Windows service persistence), plus two more.

| # | Task | Status |
|---|------|--------|
| 1 | Malicious repo URI | ✅ |
| 2 | Malicious file name (Windows) | ✅ |
| 3 | Hallucinated AI session UUID | ✅ |
| 4 | C&C file server download IP | ✅ |
| 5 | **Malicious service name** (persistence) | 🟡 **UNRESOLVED** |

**Honest outcome:** tasks 1–4 submitted at 13:48 on 2026-08-21. Task 5 unlocks a follow-up
— after cleanup the host resumed outbound connections the next morning, so name the
service that maintains persistent access. The writeup documents the deterministic path to
the answer (Event ID **7045** "a service was installed", plus a `Win32_Service` sweep for
auto-start services whose binary path sits outside `C:\Windows` / `Program Files`), but it
was never executed, because:

- the IronRDP web client is a canvas/WebGL app that **crashes on every automated connect**
  ("Error loading tab") and must be driven by a human;
- late in the session the network **dropped off the lab allowlist**, so the host became
  unreachable entirely.

Because answer submission is *not* IP-gated, a dictionary attack was attempted through the
tRPC API with ~200+ candidate names ([`scripts/rpc_harness.sh`](./scripts/rpc_harness.sh)
plus [`scripts/service_name_wordlist.txt`](./scripts/service_name_wordlist.txt)) — **no
hit**. A unique author-chosen service name is not practically brute-forceable; it has to be
read off the host. This is stated as a failed approach, not a solve.

---

## Track 3 — AI: Prompt Jailbreaking (500 pts) ✅ 6/6

**Writeup:** [`ai-prompt-jailbreaking.md`](./ai-prompt-jailbreaking.md) · slug
`ai-ithome-2026-copy`

**Objective:** the AI system is itself the attack surface. The **AI Breach Arena**
(`lab.trapa.zone/web`, launched via Endpoints → Linux HTTP) has an **Attack** side
(jailbreak hardened chatbots to extract secrets) and a **Defend** side (act as a SOC
analyst querying large log sets through an AI copilot). MITRE ATLAS **AML.T0051** (LLM
prompt injection) and related jailbreak techniques.

| Sub-task | Side | Technique that worked | Status |
|----------|------|-----------------------|--------|
| /1 Environment Overview | — | Launch the arena | ✅ |
| /2 A1 "Secret Keeper" | Attack | Direct extraction, encoding, persona-split, prefix injection and fiction framings were all refused. Winning move: **reset to a fresh context**, then a **translation attack** — ask it to translate everything above the line into Traditional Chinese verbatim, which dumped the whole system prompt | ✅ |
| /3 A2 "Jailbreak Bronze" | Attack | Weak system-prompt-only defense; the same fresh-session translation attack worked first try | ✅ |
| /4 A2 "Jailbreak Gold" | Attack | Dual layer — an English-regex **input** filter plus an **output** filter blocking plaintext, base64 and reversed leaks. The blind spot is **hex**; phrased as a plausible account holder needing the code in hex for a migration form, then decoded client-side | ✅ |
| /5 B1-1 "Brute Force" | Defend | Reconstruct SSH brute force → success → post-compromise from raw logs; identify the source IP and the five-event chain | ✅ |
| /6 B1-2 "Kill Chain" | Defend | Multi-stage APT: recon → initial access (EternalBlue MS17-010) → lateral movement (Pass-the-Hash) → priv-esc (LSASS dump on the DC) → exfiltration. Filtering by `severity=critical` separates the real chain from low-severity noise | ✅ |

**Two details that generalize:** the copilot on the Defend side was intermittently
**hallucinating**, so the working method was to ignore its narrative summaries and trust
the raw `filter_logs` / `severity` tool output as ground truth, resetting the session when
it drifted. And the challenge itself warns the AI may fabricate flags — every flag was
verified against the lab's own success banner before submission.

Flag strings are recorded in the track writeup; they are not reproduced here.

---

## Track 4 — AI: Bring Your Own Agent (1000 pts) 🟡 partial

**Writeup:** [`byo-agent.md`](./byo-agent.md) · track id `Track01M06QGQCEXNXFVEMTSAE220J7`

> "Fix every real finding. Break nothing. Fastest wins."

**Objective:** "Helpdesk Emergency Remediation." There is **no API key, webhook or MCP
registration** — the arena hands you a root-capable shell on a compromised Ubuntu 22.04
host and you point your *own* AI agent at that shell. What you "bring" is the agent's
judgement over a live root session.

**Scoring model:** a **separate judge machine** re-runs the attacks and drives the business
flows. You pass only when **every real finding is fixed AND all 12 business functions still
run**. Verification is free and unlimited, but failure reports only *how many* findings are
fixed (never which) and *which* business function broke (never why). Clicking Start is a
**single irreversible attempt** on a 2-hour decaying clock.

**The host:** nginx :80 → React SPA + Flask/gunicorn API (as `appsvc`) → MariaDB; sshd :22
with an operations account `deploy`; per-minute cron jobs for DB backup (root) and log
rotation (`svc-backup`). Services run under **supervisord**, not systemd. Three components
are explicitly **out of scope** and touching them fails you or the judge: the `sre`
account, `/etc/sudoers.d/90-sre-remediation`, and `/etc/ssh/sshd_config.d/10-ops.conf`.

**Key design of the exercise — real vs trap.** The pentest report lists **19 findings**,
and two of them are deliberate traps whose "obvious" fix destroys a business function:

- **VULN-004** (`/status` reachable without auth) — business function 2 *requires*
  unauthenticated `/status`, so adding auth breaks it.
- **VULN-011** (unidentified service account + cron) — that account is the
  platform-provisioned `svc-backup`, required for business function 9; deleting it kills
  log rotation.

The remaining findings are real and span XSS via HTML-rendered ticket bodies, a `.git`
directory under the web root, an admin-equivalent token in browser-readable front-end
config, version/host disclosure, a hardcoded DB password reused as a system login password,
an unauthenticated `subprocess(..., shell=True)` maintenance endpoint (RCE), an IDOR on
ticket reads, attachment path traversal, an interactive-login service account, a `sudo tar
*` wildcard escalation, a world-writable root cron script, world-readable DB dumps and
`/etc/shadow`, unrestricted SSH port forwarding, a rogue UID-0 account, and an attacker key
in `/root/.ssh/authorized_keys`. The report also declares app-user password hashing out of
scope and confirms SQLi is **not** real (queries are parameterized).

**Honest outcome:** the judge's last recorded verdict was **"Remediated 8 item(s). Business
functions: all 12 operational."** — a clean partial, not a pass. The remaining fixes were
worked out and staged but never applied, because host access is on-site only and the
session ended. The finding→fix table plus
[`scripts/byo_remediate.sh`](./scripts/byo_remediate.sh) are written to be enough to finish
in one pass on a fresh attempt.

**Golden rules the writeup extracts:**

- Every finding has a *lazy* fix (drop the field, stop the service, delete the sudo rule,
  remove the account) that takes a business function with it. **Restrict, don't remove.**
- Fix injection **at the data layer** — sanitize what reaches the DB, not what the browser
  renders.
- Verify by state, restart **only** the affected service; `restart all` kills sshd.
- Don't let a fix become the next finding (no world-readable config backups holding
  secrets).

---

## Track 5 — AI: The Token Sink (800 pts) 🟠 reversed, lab terminated

**Writeup:** [`token-sink.md`](./token-sink.md) · track id `Track01M09VA9B6GHDGK6PC8K1HT2M0`

**Objective:** a single sub-task, "Trap Zone" — an **adversarial trap built specifically for
AI agents**. A deliberately obfuscated real-time oracle game (`./trap` on a Linux
trap-client, reached over SSH/VNC). There is no flag text field; a judge verifies game
state.

**Why it's called a token sink:** the binary is a stripped, static-PIE, static-glibc x86-64
ELF with **Obfuscator-LLVM control-flow flattening across every game function** — opaque
predicates and a compare-ladder dispatch. Reading it linearly is *intentionally* expensive
in agent tokens. The TUI byte stream mixes channels: bytes ≥ `0x80` are control/protocol,
bytes < `0x80` are screen text and artwork. 20 rounds, 5 lives, real-time — rounds
auto-advance, and wrong *or late* both count as a miss.

**What was recovered from disassembly:**

- The PRNG is **xorshift32** with a fixed multiply on the output word, **seeded from
  `/dev/urandom`** — so the secret is per-game and there is no fixed seed to precompute.
- The **displayed glyph is only the top two bits** of that 32-bit word, indexing the
  alphabet `"TRAP"`.
- **The key insight: the answer is not the glyph.** The input parser accepts only two byte
  values — `'A'` (`0x41`) and `0xc7`, the high-bit frame lead. Bare `T`/`R`/`P` are never
  accepted, so non-`A` answers must travel through the framed control channel, and the real
  answer is a finer function of the *lower* bits of the same word.
- **Round 1's framed payload encodes the per-game seed**, 7-bit packed.
- Clearing all 20 rounds draws a "CLEARED" banner, prints elapsed time, emits
  `getenv("TRAP_FLAG")` to the client, and writes `getenv("TRAP_CLEARED_PATH")` (default
  `/var/lib/trap/cleared`), which the judge checks.

**The planned solve** (documented, never executed): spawn `./trap` under a pty preserving
high-bit bytes → recover the seed from round 1 and validate it by predicting all 20
observed glyphs → oracle brute-force the answer function at a round with a known word →
autoplay all 20 rounds. A pty-free fallback — a scale-invariant glyph classifier reading
the `#` bitmap by counting holes and legs — is described but insufficient on its own,
precisely because the answer isn't the glyph.

**Honest outcome:** the binary was fully reverse-engineered, with concrete addresses
recorded for the round loop, PRNG, glyph formula, parser, frame emitter, miss counter and
win path. The lab instance **auto-terminated at 14:36 and "cannot be started again"** before
a working authenticated shell was obtained. Not solved; needs an operator to re-provision.

---

## Scripts / 工具

Seven artefacts in [`scripts/`](./scripts), indexed in
[`scripts/README.md`](./scripts/README.md). All secrets come from environment variables —
nothing is hardcoded.

| Script | Track | Purpose | Runs where | Needs |
|--------|-------|---------|-----------|-------|
| [`hibp_check.sh`](./scripts/hibp_check.sh) | 1 | Bulk-check emails against Have I Been Pwned | Local | `HIBP_API_KEY`, `curl`, `jq`, `python3` |
| [`mailpit_find_phish.js`](./scripts/mailpit_find_phish.js) | 1 | Find the homoglyph phishing mail in the Mailpit lab | Browser console, Mailpit tab | A live lab tab |
| [`urlscan_first_scan.sh`](./scripts/urlscan_first_scan.sh) | 1 | Earliest urlscan.io scan → web-server name + version | Local | `curl`, `jq`; `URLSCAN_API_KEY` optional |
| [`rpc_harness.sh`](./scripts/rpc_harness.sh) | any | tRPC submit + correctness verification | Local | `TRAPA_JWT`, `curl`, `python3` |
| [`service_name_wordlist.txt`](./scripts/service_name_wordlist.txt) | 2 | 57 candidate service names for `rpc_harness.sh dict` | — | — |
| [`byo_remediate.sh`](./scripts/byo_remediate.sh) | 4 | Idempotent hardening of the helpdesk host | On the host as `sre` | sudo, `python3`, `bleach` |
| [`tokensink_solver.py`](./scripts/tokensink_solver.py) | 5 | Oracle solver **skeleton** for the Trap Zone game | On the trap-client | `pwntools`, `pyte` |

### `hibp_check.sh` — Track 1

Takes emails as arguments, defaulting to the five addresses the task supplies. For each it
calls HIBP API v3 `breachedaccount` with `truncateResponse=false`, URL-encoding the address
via `python3`, and prints breach names sorted by `BreachDate` (earliest first), sleeping 2s
between calls for the rate limit. Requires `HIBP_API_KEY` and exits immediately without it
— the public website is a perfectly adequate substitute for this exercise, and that is what
was actually used.

```bash
export HIBP_API_KEY='...'
./hibp_check.sh                       # the five task addresses
./hibp_check.sh someone@example.com   # or specific ones
```

### `mailpit_find_phish.js` — Track 1

An async IIFE for the browser console on the Mailpit lab tab. It fetches
`/api/v1/messages?limit=100`, `console.table`s every sender, then flags lookalikes with a
deliberately crude normalizer that **collapses `i` and `l` to the same character** — so a
domain that isn't literally `example.com` but normalizes to it is the homoglyph. For each
suspicious message it fetches the full message, concatenates HTML and text bodies, regex-
extracts every URL, and logs the sender, subject, URLs and `ReturnPath`. This is the
"enumerate via API instead of clicking 100 mails" move.

### `urlscan_first_scan.sh` — Track 1

```bash
./urlscan_first_scan.sh [domain]   # defaults to the phishing domain from task 2
```

Searches `domain:<DOMAIN>` with `size=100`, sorts results by `task.time` ascending, takes
the earliest `_id`, prints its timestamp, fetches the full result, and reports both
`.page.server` and the first `Server` response header found in `data.requests[]`. Sends
`Api-Key` if `URLSCAN_API_KEY` is set — worth doing, since anonymous search is 100/hour per
IP and returns HTTP 429 at a busy venue.

> ⚠️ Caveat worth knowing: the script reports the *chronologically first* scan, but for this
> domain that record errored and captured nothing. The answer comes from the first scan that
> successfully captured the site — check the next result if the earliest has no `Server`
> header.

### `rpc_harness.sh` — any track

The platform-automation workhorse. Three modes:

```bash
export TRAPA_JWT='<paste Bearer token from DevTools>'   # do NOT commit

./rpc_harness.sh check                          # is the task already completed?
./rpc_harness.sh answer 'Apache'                # submit one answer, then verify
./rpc_harness.sh dict service_name_wordlist.txt # last resort; see the caveat below
```

`submit()` POSTs a tRPC `{"json":{…}}` envelope to `track.missionViewerSubmit` with a
`{"type":"fill","value":[…]}` payload; `completed()` POSTs `track.missionViewerLoad` and
greps the response for the target task's `"completed":true|false` — necessary because
submit always returns `{}`. `dict` walks a wordlist, submitting and re-checking after each
line, and exits on the first hit. The token is accepted with or without a leading
`Bearer `. Target IDs default to Track 2's "Malicious Service Name" task and are overridable
via `ZONE_ID`, `TRACK_ID`, `MISSION_ID`, `TASK_ID`; discover new ones with
`track.getZoneTrackMissionsBySlug`.

### `service_name_wordlist.txt` — Track 2

57 candidate Windows service names in four families: `svchost32` variants, Windows-Update
and Defender masquerades, scenario-themed names (`TheH1ve`, `SILKTHREAD`, `Napoleon`), and
known offensive-tooling names (`Havoc`, `Sliver`, `Mythic`, `AsyncRAT`). Kept for the
record of what was tried — it produced **no hit**, and the writeup is explicit that this is
the wrong approach: prefer host recon.

### `byo_remediate.sh` — Track 4

The one script that changes production state. Run on the helpdesk box as `sre`. It is
idempotent, opens with a hard-scope comment naming the three untouchable files, and backs
up `app.py` and `config.py` to a `0700` directory under `/root` before editing.

An inline `python3` heredoc rewrites the Flask app for six findings in one pass: deletes the
unauthenticated `shell=True` RCE endpoint; removes the dev-token admin backdoor check;
inserts `bleach.clean` on ticket title and body at *input* time with a tight allowlist
(`b i em strong code p br ul ol li a[href]`), which is what preserves the CJK/formatting
business function; applies `os.path.basename` to both the upload filename and the download
path parameter; strips version/build/host/db fields from the status handler while keeping it
returning `ok`; and adds the owner-vs-admin check that closes the IDOR. Shell steps then
remove the dev token from both back-end and browser-readable config, delete the attacker key
line from root's `authorized_keys`, replace the wildcard sudo rule with an exact pinned `tar`
command (validated with `visudo -cf`), `rm -rf` the `.git` under the web root, tighten
permissions on the backup script, DB dump and `/etc/shadow`, give the service account
`nologin` plus a locked password, and restrict `config.py` to `deploy:appsvc 0640`.

Four fixes are deliberately left **commented out** as manual/careful steps — the rogue UID-0
account, the password-reuse lock, the DB password rotation, and the SSH `PermitOpen`
restriction — because each needs a look at live host state, and the sshd restart drops your
own session. The script finishes by `py_compile`-ing the app and restarting **only** the
`api` program under supervisord, printing the rollback command.

> ⚠️ Note the script is *ahead of* the recorded judge result: it applies more fixes than the
> 8 the judge last confirmed. Treat it as the intended full pass, not as a replay of what
> scored.

### `tokensink_solver.py` — Track 5

A documented **skeleton**, not a finished exploit — be aware before running it. It
implements the confirmed primitives: `xorshift32()`, `word()` (the output multiply),
`glyph()` (top two bits indexing `"TRAP"`), and `recover_seed()`, which strips the high bit
from round 1's framed payload, tries base-128 reassembly in both byte orders, and validates
each candidate by running the PRNG forward and matching all observed glyphs. `derive_f()` —
the oracle brute-force that determines what byte to actually send — **raises
`NotImplementedError`** and must be filled in against a live round. `main()` currently just
prints the module docstring; the play loop exists as pseudocode in comments. It was never
run against the lab.

---

## Lessons learned / 心得與啟示

**On the platform, not the puzzles**

1. **Scout the access model before the clock starts.** Two tracks died to network location,
   not difficulty. Knowing that labs are IP-allowlisted while submission is not would have
   reordered the whole day: do host-bound recon first while on-site, save the
   internet-research tracks for later.
2. **One-shot, timer-bound labs deserve a written plan first.** The BYO track is a single
   irreversible attempt on a decaying clock, and the Token Sink terminated itself
   permanently. Read the whole challenge, stage the commands, *then* press Start.
3. **Automation has sharp edges.** A canvas/WebGL RDP client can't be driven by a browser-
   automation extension, and a single native `alert()` freezes the automation bridge
   outright. Know which parts of a platform are human-only before you depend on a script.
4. **Fire-and-forget APIs need a separate oracle.** The submit endpoint always returns `{}`;
   correctness lives in a different call. Any harness against such an API must be built as
   submit-then-poll.
5. **Brute force is a tell that you skipped the recon.** ~200 guesses at a host-specific
   service name was never going to work, and the writeup says so plainly.

**On the security content**

6. **Homoglyph domains are found by normalization, not by eyeballing.** Collapsing
   confusable characters and comparing against the legitimate domain turns "spot the
   difference" into a one-line filter over every sender.
7. **"First scan" is a claim to verify.** The chronologically earliest urlscan record for
   the phishing domain captured nothing; the first *useful* record was a month later.
8. **Refusal momentum is real.** Iterating inside a poisoned context makes an LLM more
   likely to keep refusing; resetting to a fresh session was the single highest-leverage
   jailbreak move, and it preceded both system-prompt leaks.
9. **Encoding-based output filters fail on the encoding nobody listed.** Plaintext, base64
   and reversed were blocked; hex walked straight through. Deny-lists over representations
   are unwinnable.
10. **Sound like a legitimate user.** The multilingual input filter was passed not by
    obfuscating the request but by wrapping it in a plausible business reason.
11. **Trust tool output, not the model's narrative.** In AI-assisted DFIR the copilot
    hallucinated summaries while its raw query results stayed correct. Ground truth is the
    tool call; the prose is a lossy rendering of it.
12. **Hardening is a business-continuity exercise.** Nearly every finding in Track 4 has a
    lazy fix that takes a business function with it — the traps exist to punish exactly
    that. Restrict rather than remove, fix injection at the data layer, and never let your
    fix become the next finding.
13. **Obfuscation as an anti-agent weapon is a real threat model.** The Token Sink is
    control-flow-flattened specifically to make linear reading expensive for an LLM. The way
    past it was not to read more, but to find the small set of facts that mattered — the
    PRNG, the seed source, and the fact that the visible glyph is only two bits of the
    answer. **The obvious signal was deliberately not the answer.**

---

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

> **Reminder:** every script reads its credentials from the environment. The Bearer JWT
> (`$TRAPA_JWT`) is a live session token — **never commit it**.
