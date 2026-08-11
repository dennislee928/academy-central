# 當 AI 學會當白帽駭客 — 全自動 Web3 紅隊 Agent

**Source recording:** 新錄音 24 (Part A)
**Speaker:** "on" (handle **fffuuuming** per the schedule) — Web3 developer, self-described SRE-agent builder
**COSCUP session:** 「當 AI 學會當白帽駭客」, Room TR412-1, Day 1
**Topic tags:** Web3 security, red-teaming, autonomous agents, Foundry, reentrancy, on-chain fund rescue

---

## One-line summary

Building an autonomous "red team" agent that scans public blockchains for vulnerable smart
contracts, generates and locally tests proof-of-concept exploits in a sandbox, and flags
genuinely profitable targets for a human to review before any real on-chain action.

## How Web3 red-teaming differs from Web2

The speaker frames the whole talk around three properties of blockchains that make offensive
security here unlike traditional Web2 penetration testing:

- **The objective is narrower.** Web2 red teams chase many kinds of result — root, data, credentials, lateral movement. On-chain, the goal collapses to essentially one thing: **funds**. Roughly 90% of the effort targets assets sitting in contracts.
- **Everything is public.** There is no "getting a shell." Every node's state and every executed transaction is transparent and visible to all participants. The chain does not distinguish malicious code from benign — it simply executes what is deployed.
- **It is irreversible.** Unlike a Web2 production incident where you have SLAs, rollbacks, and backups, a committed block is a settled fact. There is no undo.

## The DAO incident as the canonical example

To illustrate irreversibility, the speaker walks through **The DAO hack**:

- A **reentrancy** vulnerability drained roughly **6 million ETH** — at the time about one third of all ETH on mainnet.
- Because the chain is irreversible, there was no centralized way to claw the funds back.
- The Ethereum Foundation's response was a **hard fork**. This split the chain: today's **ETH** follows the forked history (the drain was reversed), while **ETC (Ethereum Classic)** preserves the original chain where the exploit stands — the community that valued immutability over intervention.

> This history is the emotional core of the talk: it's the argument for why an automated
> *defensive* rescue capability matters — you cannot fix these after the fact.

## The red-team agent pipeline

The agent's workflow, presented as ordered stages:

1. **Classify / triage** — enumerate candidate contracts (the speaker references Etherscan-style block explorers as the data source). Signal-to-noise is low, so target selection matters.
2. **Parse dependencies** — skipped in the talk (ties into contract-development detail).
3. **Hypothesis** — assume a vulnerability class and a plausible exploitation path.
4. **PoC generation in a sandbox** — build a **local fork** of mainnet using **Foundry**, then generate and run the exploit against that fork. On-chain effects are permanent, so all testing happens against the local fork, never live.
5. **Profitability check** — verify the exploit is **profitable after gas**. If the recovered amount doesn't exceed gas cost, the target isn't worth pursuing. (On testnets like Sepolia this check is looser, since test ETH is free from faucets — though some people still buy test tokens for volume.)
6. **Disclosure & rescue** — a human reviews the final result before any real action. The agent is explicitly *not* fully autonomous at the trigger.

## Live demo

The speaker deliberately showed only a **safe subset** — given a public venue, demonstrating
a full successful exploit was deemed inappropriate.

- Selected a deliberately vulnerable sample contract (annotated as containing a **reentrance** bug).
- Hit "analyze" → the local contract was sent to the agent for analysis.
- The agent produced a **report** correctly identifying the vulnerability as reentrancy, then generated exploit code capable of draining it — run live against the fork, not a static/canned result.

## Agent architecture: cheap-deterministic vs. expensive-intelligent

A central design principle: **split work into two buckets** to control cost.

- **Cheap, deterministic, high-frequency** work → handle with a **static, hand-designed backend**, not an LLM. Example: scanning the chain for candidate contracts. The speaker deliberately avoids using an LLM here ("finding a needle in a haystack" is better done with a deterministic weighted heuristic).
- **Expensive, intelligent** work → the LLM agent. Example: generating hypotheses and PoCs.

The pipeline maps onto three layers:

- **Layer 1** — on-chain contract selection/scanning (deterministic; uses a listener such as **Alchemy**'s tooling to watch new blocks, ~1 block/sec, filtering candidates).
- **Layer 2** — the analysis + Foundry sandbox inner loop. If a PoC fails syntactically or the target isn't good, it loops back via **working memory** within the same session (outer loop).
- **Layer 3** — deploy/rescue, which calls in a human.

### Q&A highlights

- **Is the backend static or dynamic?** Static — the candidate-scoring logic is human-designed; it doesn't self-adjust factor weights.
- **Which base model for PoC generation?** This is the interesting constraint: commercial models (**Claude / OpenAI**) run **cyber-misuse detection** (referred to as "CBRN/cyber" guardrails). Generating an exploit PoC has a high chance of being blocked. The speaker notes OpenAI's newer model ("GPT-5"-class) and Claude 4.6/4.8-class models increasingly refuse or reverse-detect offensive requests. A local model avoids the guardrail but is "too dumt"; commercial models are more capable but constrained.
- **A community member's workaround:** frame the request as *post-incident investigation* of an already-exploited contract ("investigate how this was hacked") rather than *generate an exploit*. Getting a model to produce a PoC requires being very specific about the already-known vulnerability class and direction.

## The "Hermes agent" design — stateful vs. stateless

The most distinctive architectural idea, and one the user flagged for deeper research
(see [research/hermes-stateless-stateful.md](../research/hermes-stateless-stateful.md)):

The agent's image is based on **Hermes Agent**. The design goal: the agent **lives inside
each project** rather than only on the user's own machine/server.

- It is **stateful with respect to the project** but **stateless with respect to the host machine.**
- On a successfully cloned project you'd find a **seed folder** holding a **`system.md` / constitution.md** and any custom **skills**.
- These carry inheritable value across sessions — a new session doesn't start from scratch; the accumulated knowledge lives in the repo.
- There's also a `.sandbox` / session-data folder that gets moved into the project, so starting the agent *from the project* makes it project-stateful and machine-stateless.

> The speaker ran out of time before explaining the mechanics ("engineering details"), which
> is exactly the gap the follow-up research note fills.

## Open questions the speaker posed to the audience

- Vulnerability classes are many. To specialize the agent per class you'd add **skills** or heuristics — but is there a better approach than one-skill-per-bug-type? Should there instead be **separate agents per vulnerability type**?
- How to *measure* the agent's effectiveness across bug classes.

## Referenced tools, projects & concepts

| Item | What it is | Link |
|---|---|---|
| **Foundry** | Ethereum dev toolkit; used here for local mainnet forks + PoC testing | https://github.com/foundry-rs/foundry |
| **Hermes Agent** | Nous Research's stateful, self-improving open-source agent (the base image) | https://github.com/NousResearch (see research note) |
| **Alchemy** | Node infrastructure / listener for streaming new blocks | https://www.alchemy.com/ |
| **Etherscan** | Block explorer, used for contract discovery | https://etherscan.io/ |
| **The DAO / reentrancy** | The 2016 exploit and ETH/ETC hard fork | https://en.wikipedia.org/wiki/The_DAO |

> **Speaker contact:** shared a personal Threads/IG handle "on" for follow-up (from the
> post-talk chatter in the recording). Not reproducing personal social handles here; grab
> them from the session QR slide if needed.

## Note on transcript quality

This recording is code-switched Mandarin/English and ASR-transcribed, so English technical
terms are frequently mangled ("拍" for pentest, "F" for fork, "P"/"PO" for PoC, "cyber"/"CPP"
for the CBRN-cyber guardrail, "Miss Agent" for Hermes agent). The reconstruction above resolves
these from context; verify specifics against the slides before citing.
