# Track 1 — Open Source Intelligence (300 pts) ✅ SOLVED 3/3

> "Threat intelligence indicates several employee accounts were likely exposed in a
> recent dark web leak database."

Slug: `osint-ithome-2026-copy`. 3 tasks. #1 is pure OSINT (HIBP); #2 is a Mailpit
webmail lab; #3 is urlscan.io infra analysis that depends on the domain from #2.

---

## 1. Data breach investigation — ✅ SOLVED (T1589.001)

**Task:** Check 5 employee emails against haveibeenpwned.com, flag the one with a
breach record, and name the earliest incident.

Emails given: `pwn@`, `shock@`, `dear@`, `noise@`, `ootd@` `example.com`.

**Method:** Search each at https://haveibeenpwned.com/.

| Email | Result |
|-------|--------|
| **dear@example.com** | **1 breach — Edmodo (May 2017)** |
| (others) | 0 breaches |

**Answers:** breached email → `dear@example.com`; breach event → `Edmodo`.

> Edmodo (education platform), May 2017: ~77M records leaked (usernames, emails,
> bcrypt hashes).

---

## 2. Phishing email forensics — ✅ SOLVED (T1566.002)

**Task:** Log in to the corporate **webmail** (Mailpit lab) and find the spear-phishing
email; report its real sender address and the malicious URL.

**Lab:** Mailpit instance (`https://<hash>.lab.trapa.zone/`). Enumerate senders via the
Mailpit API rather than clicking each mail — see
[`scripts/mailpit_find_phish.js`](./scripts/mailpit_find_phish.js).

The phishing mail stands out by a **homoglyph** in the sender domain:

| Field | Value |
|-------|-------|
| Display name | Example Corp HR |
| From / Return-Path | `hr@exampIe.com` ← capital **I** (U+0049), not lowercase **l** |
| Subject | `[Important] Confirm your annual salary adjustment today` |
| Malicious URL | `http://dynamics.ddnsking.com/hr/salary` |

`ddnsking.com` = a No-IP dynamic-DNS provider — throwaway phishing infra.

**Answers:** sender → `hr@exampIe.com` (capital I); URL →
`http://dynamics.ddnsking.com/hr/salary`. Malicious **domain** → `dynamics.ddnsking.com`.

---

## 3. Malicious infrastructure analysis — ✅ SOLVED (T1596.005)

**Task:** Using **urlscan.io**, review the scan history for `dynamics.ddnsking.com`
and identify, **from the site's FIRST recorded scan**: (1) web server **name**,
(2) web server **version**.

**Method:** [`scripts/urlscan_first_scan.sh`](./scripts/urlscan_first_scan.sh) —
searches `domain:dynamics.ddnsking.com`, sorts by `task.time` ascending, and reads the
`Server` header of the earliest scan.

- The very first scan (2020-02-13) errored ("could not scan this website").
- The **first scan that captured the site** (2020-03-13) reported
  `Server: Apache/2.4.29 (Ubuntu)`.

**Answers:** Web Server Name → `Apache`; Web Server Version → `2.4.29`.

> ⚠️ Anonymous urlscan search is limited to 100/hour per IP (HTTP 429 at busy venues).
> Wait for reset or set `URLSCAN_API_KEY`.

**→ Submitting `Apache` / `2.4.29` completed the track ("Track Complete!", 3/3).**
</content>
