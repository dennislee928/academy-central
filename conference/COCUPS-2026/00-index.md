# COSCUP x UbuCon Asia 2026 — Session Notes (Day 1, 2026-08-08)

Structured notes derived from eight on-site audio recordings, cross-referenced against the
official [pretalx schedule](https://pretalx.coscup.org/coscup-2026/schedule/).

**Venue:** NTUST (National Taiwan University of Science and Technology), Taipei
**Day covered:** 2026-08-08 (Day 1 of 2)

> Schedule times below are **Taipei (UTC+8)**. The pretalx table renders in UTC; add 8 hours.

---

## Session map

| # | File | Session (pretalx) | Speaker | Room |
|---|---|---|---|---|
| 01 | [web3-red-team-agent](sessions/01-web3-red-team-agent.md) | 當 AI 學會當白帽駭客 | fffuuuming / "on" | TR412-1 |
| 02 | [ai-agent-trust-stack](sessions/02-ai-agent-trust-stack.md) | AI Agent 的信任堆疊 | Williams Lai | TR511 |
| 03 | [linux-kernel-tracing](sessions/03-linux-kernel-tracing.md) | Linux Kernel Tracing | Hoyeon Lee | TR213 |
| 04 | [zkp-natural-person-cert](sessions/04-zkp-natural-person-cert.md) | 零知識證明與自然人憑證身份驗證 | Ya-wen Jeng | TR511 |
| 05 | [kvm-virtualization](sessions/05-kvm-virtualization.md) | How a VM Draws… | Yung-Tse Cheng | TR213 |
| 06 | [oss-language-barriers](sessions/06-oss-language-barriers.md) | My broken English… | Naruhiko Ogasawara | TR410 |
| 07 | [usb-otg-security](sessions/07-usb-otg-security.md) | USB MITM: Build… | Aristo Chen | TR213 |

## Follow-up research

| File | Topic |
|---|---|
| [zkp-taiwan-certificates](research/zkp-taiwan-certificates.md) | Taiwan government PKI credentials + ZK anonymous credentials |
| [hermes-stateless-stateful](research/hermes-stateless-stateful.md) | Stateless/stateful agent design via distributed markdown |

---

## Recording → session index

| Recording | Session file | Duration |
|---|---|---|
| 新錄音 24 (Part A) | 01 | ~76 min (combined A+B) |
| 新錄音 24 (Part B) | 02 | — |
| 新錄音 25, 26 | 03 | — |
| 新錄音 28 | 04 | ~40 min |
| 新錄音 29 | 05 | — |
| 新錄音 31, 32 | 06 | ~2 min (32 only) |
| 新錄音 33 | 07 | — |

## Cross-cutting threads

Three sessions converge on **trust in autonomous agents** — 01 (agents that attack),
02 (agents that pay and get rated), and 04 (proving humanness without identity). Read as a
set, they trace the same question from three directions: how do you establish that an actor
on a network is what it claims to be, when the actor may be software?

Sessions 03, 05, and 07 form a **systems-observability** cluster: tracing execution inside a
kernel, inside a hypervisor, and across a hardware bus. All three rely on the same underlying
move — insert an observation point at a boundary the target cannot see.
