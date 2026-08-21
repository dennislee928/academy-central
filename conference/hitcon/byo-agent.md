# Track 4 — AI: Bring Your Own Agent (1000 pts) 🟡

> "Fix every real finding. Break nothing. Fastest wins."

Track id: `Track01M06QGQCEXNXFVEMTSAE220J7`. Two sub-tasks: /1 **Introduction**,
/2 **Helpdesk Emergency Remediation** (1000 pts).

## The "bring your own agent" model

There is **no API key / webhook / MCP registration**. The arena hands you a
**root-capable shell** on a compromised host; you point your *own* AI agent at that
shell to remediate. What you "bring" is the agent's judgement over a live root session.

- Endpoint: **Helpdesk SSH** → `ssh sre@<host>` (obs. `43.206.147.145:22`), password
  `sre`, full sudo. On-site Wi-Fi only.
- **Single, irreversible attempt.** Clicking **Start** boots the box and starts a
  **2-hour scored clock** (score decays; min 100). One attempt per participant, no reset.
- Judged by a **separate judge machine**: it re-runs the attacks and drives the business
  flows. You pass when **every real finding is fixed AND all 12 business functions still
  run**. Verifying is free/unlimited. On failure you're told the count fixed (never
  which) and which business function broke (never why).

## The host

```
nginx :80  ──►  React SPA (/opt/app/web)
           ──►  Flask API (gunicorn :8000, runs as appsvc)  ──►  MariaDB
sshd :22   ──►  operations account `deploy`
cron       ──►  DB backup (run.sh, root) + log rotation (rotate.sh, svc-backup) — every minute
```

Ubuntu 22.04, single host, services under **supervisord** (not systemd). App logins:
`alice/alice-pw-2024`, `bob/bob-pw-2024`, `admin/Adm1nHelpdesk!`. `RUNBOOK.md` was
missing at `/opt/ops/`; the real ops runbook content is inline in the challenge.

**Out of scope (never touch — breaks you or the judge):** the `sre` account,
`/etc/sudoers.d/90-sre-remediation`, `/etc/ssh/sshd_config.d/10-ops.conf`.

## The 12 business functions (must all keep working)

1 front page loads · 2 `GET /status` stays available (path can't move) · 3 user login +
open/read own tickets · 4 ticket bodies keep basic formatting + CJK (char-for-char) ·
5 attachments up/download byte-for-byte (CJK/spaces/multi-ext names) · 6 admin lists
users · 7 monthly HTML export · 8 backup dumps stay fresh/non-empty · 9 log rotation
stays under **svc-backup** (not root) · 10 ops key-login (deploy) · 11 ops web-archive
`sudo tar` command · 12 ops jump-host `ssh -L 8080:127.0.0.1:80`.

## The 19 findings (pentest report) — real vs trap

| VULN | Title (sev) | Verdict / fix |
|------|-------------|---------------|
| 001 | Ticket bodies rendered as HTML (High) | **REAL** — sanitize on **input** with `bleach` (allow `b i em strong code p br ul ol li a[href]`) so what reaches the DB is safe; preserves fn 4 |
| 002 | `.git` under web root (Med) | **REAL** — `rm -rf /opt/app/web/.git` (SPA `try_files` makes it 404) |
| 003 | Front-end config holds admin-equiv token (High) | **REAL** — remove `DEV_API_TOKEN` from **both** the backend check (`current_user`) and the browser-readable `/opt/app/web/config.js`; token must *stop working* AND leave source |
| 004 | `/status` reachable without auth (High) | **TRAP** — fn 2 requires unauthenticated `/status`; adding auth breaks it |
| 005 | `/status` discloses version/host (High) | **REAL** — strip `version/build/host/db` fields from the status handler; keep it returning ok |
| 006 | DB password hardcoded (High) | Rotate the DB password + move it out of the version-controlled/world-readable source; exposure vector via .git already closed by 002/perms |
| 007 | Unauth maintenance endpoint (Crit) | **REAL** — delete `/api/debug/exec` (`subprocess … shell=True` RCE) |
| 008 | Ticket read no ownership check (High) | **REAL** — in `get_ticket`, if role≠admin and owner≠user → 403/404 (IDOR) |
| 009 | Attachment path traversal (Crit) | **REAL** — `os.path.basename` on `f.filename` and the `<path:name>` param; preserves fn 5 |
| 010 | App password reused as system account pw (Crit) | **REAL** — the DB password is also a system login pw; change/lock that account's password (keep key login) |
| 011 | Unidentified service account + cron (Crit) | **TRAP** — that's `svc-backup`, platform-provisioned for fn 9; deleting it breaks rotation |
| 012 | Service account has interactive login (Med) | **REAL** — `usermod -s /usr/sbin/nologin svc-backup` (+ lock pw); cron still runs → fn 9 ok |
| 013 | sudo wildcard `tar *` → root (Crit) | **REAL** — pin to exact cmd: `deploy ALL=(ALL) NOPASSWD: /usr/bin/tar -czf /var/backups/site.tgz /opt/app/web`; deleting breaks fn 11 |
| 014 | Root-cron script too permissive (High) | **REAL** — `run.sh` was `0777` (world-writable→root RCE) and embeds the DB pw; `chmod 700` |
| 015 | DB dump readable by all (Med) | **REAL** — `chmod 600 /opt/backup/db_dump.sql` |
| 016 | `/etc/shadow` perms too permissive (Med) | **REAL** — restore `0640 root:shadow` (or 600) |
| 017 | SSH port-forwarding unrestricted (Crit) | **REAL** — restrict to `127.0.0.1:80` for `deploy` (`PermitOpen`) without touching `10-ops.conf`; preserves fn 12 |
| 018 | Unexpected UID-0 account (Crit) | **REAL** — rogue second root account; remove/lock it |
| 019 | Attacker key in `/root/.ssh/authorized_keys` (Crit) | **REAL** — remove the `hardenlab-attacker` line (judge key is not there) |

> Note from the report: app-user password hashing is explicitly **out of scope** (client's
> DB revision plan); VULN-015 is about file perms only. VULN-018/019 are a prior
> compromise. Also confirmed **not** real: SQLi (all queries are parameterized).

## Progress (2026-08-21)

**Judge: "Remediated 8 item(s). Business functions: all 12 operational."** Applied &
confirmed: 001, 002, 007, 009, 013, 019, plus 003 (backend) and one more. Staged next:
005, 008, 012, 014, 015, 016, 018, and the careful pair 006/010 + 017. See the runnable
script: [`scripts/byo_remediate.sh`](./scripts/byo_remediate.sh).

Not fully passed because the remaining fixes weren't submitted before the session ended
(host access is on-site-only). The script + table above are enough to finish in one pass.

## Golden rules (the challenge is built to punish lazy fixes)

- Every finding has a *lazy* fix (drop the field / stop the service / delete the rule /
  remove the account) that **takes a business function with it**. Restrict, don't remove.
- Fix **at the data layer** for injection (what reaches the DB), not the browser.
- **Verify by state**, restart the affected service (`supervisorctl -c
  /etc/supervisor/supervisord.conf restart api`), **never `restart all`** (kills sshd).
- Don't let a fix become the next finding (no world-readable config backups with secrets).
</content>
