# Research: Stateless/Stateful Agents via Distributed Markdown (Hermes Agent)

Follow-up research requested after Session 01 ([web3-red-team-agent](../sessions/01-web3-red-team-agent.md)),
on the **"stateless and stateful"** agent design using **distributed markdown** that the speaker
based their red-team agent on but ran out of time to explain.

---

## What Hermes Agent is

**Hermes Agent** is an **open-source autonomous AI agent** built by **Nous Research** (the lab
behind the Hermes / Nomos / Psyche model families), released ~February 2026 under the **MIT
license**. It is deliberately *not* an IDE copilot or a single-provider chatbot wrapper — it's a
**persistent agent you install on a machine** (VPS, server, or laptop), connect to your model
stack, and reach from CLI or messaging apps while it keeps working on the same environment over
time.

Repo / entry points:
- Nous Research org: https://github.com/NousResearch
- Topic hub: https://github.com/topics/hermes-agent
- Skills standard it uses: https://agentskills.io

## The core idea: solving statelessness

The whole pitch is a reaction to one flaw the speaker also cared about:

> Most AI agents are **stateless** — when a conversation ends, everything the agent learned
> (how it solved the problem, your preferences, what worked) vanishes. Next time it starts from
> scratch.

Hermes runs a **five-stage learning loop**: execute a task → evaluate the outcome → **extract
reusable reasoning patterns as named "skills"** → refine those skills through continued use →
retrieve relevant skills for new tasks. The result is an agent that measurably improves on
repeated task types the longer it runs.

## How "state" is actually stored — the distributed-markdown part

This is the piece that maps directly onto what the Session 01 speaker described:

- **Skills are portable markdown files.** When Hermes solves a hard problem, it writes a
  **reusable skill document** (a markdown file) so it never forgets how. Skills are
  **searchable, shareable, and compatible with the `agentskills.io` open standard** — i.e. the
  agent's accumulated competence is **distributed as markdown files**, not locked in a database.
- **Three-layer memory architecture** plus **FTS5 full-text search with LLM summarization** for
  cross-session recall. The skill library and user-model database live **locally in the agent's
  data directory** — all data stays on your machine (no telemetry).
- **Context files shape every conversation** to a project's needs.

This is exactly the Session 01 design:

| Session 01 speaker's description | Hermes Agent equivalent |
|---|---|
| A **`seed` folder** in the cloned project | The project's context/skill files checked into the repo |
| A **`system.md` / constitution.md** | The context file(s) that shape every conversation |
| Custom **skills** that carry inheritable value | Hermes **skill markdown files** (agentskills.io standard) |
| A **`.sandbox` / session-data folder** moved into the project | Hermes's local **data directory** (skill library + memory) |
| **Stateful to the project, stateless to the machine** | Skills/memory travel *with the project*; the host runs any sandbox backend |

## "Stateful to project, stateless to machine" — what it means

The speaker's phrasing decodes cleanly against Hermes's architecture:

- **Stateful with respect to the project:** the agent's accumulated knowledge — its constitution,
  its learned skills — lives **inside the project repo** as markdown. Clone the repo elsewhere and
  the agent's competence comes with it. The state is *distributed* because it rides along in
  version-controlled files rather than sitting in one central store.
- **Stateless with respect to the host machine:** the machine running the agent holds no
  privileged state of its own. Hermes supports **multiple sandbox backends** — **local, Docker,
  SSH, Singularity, Modal** — and with **Modal**, each task runs in a **fresh, isolated container
  destroyed after completion — no persistent state between runs.** The host is disposable; the
  project carries the memory.

So "distributed markdown" = the agent's brain is a set of markdown skill/constitution files that
live with the project and can be shared, versioned, and inherited — while the compute host is
interchangeable and stateless.

## Why the red-team agent used it

For the Session 01 use case this matters because:
- A red-team agent that lives **inside each target-analysis project** accumulates
  vulnerability-class skills as markdown, and those skills are **inheritable** across sessions and
  shareable with the community (the speaker's open-source goal).
- The **sandbox backends** (Docker/Modal) line up with the speaker's Foundry-fork sandbox and the
  "cheap-deterministic vs. expensive-intelligent" split — deterministic scanning on the host,
  intelligent PoC work in isolated, disposable containers.
- **Container hardening / namespace isolation** means a compromised tool call can't reach the
  agent's skill storage or host filesystem — important when the agent is literally generating
  exploit code.

## Caveats for citing

- The Session 01 speaker's implementation details ("engineering details") were **not** given in
  the talk, so the mapping above is **inferred** from Hermes Agent's public architecture, not
  confirmed by the speaker. Treat it as "here's what the base framework provides and how the
  described design uses it," not "here's exactly what they built."
- Several secondary write-ups (dev.to, vendor blogs) report a very large GitHub star count and
  specific backend lists; the authoritative source is the Nous Research repo itself — verify
  specifics there before quoting numbers.

**Primary sources:**
- Nous Research: https://github.com/NousResearch
- hermes-agent topic: https://github.com/topics/hermes-agent
- agentskills.io (skill file standard): https://agentskills.io
