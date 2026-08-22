# AI Agent 的信任堆疊：從微支付、身份到可驗證計算

**Source recording:** 新錄音 24 (Part B)
**Speaker:** **Williams Lai** — researcher at an incubator, supporting blockchain startups; COSCUP contributor since ~2019, Web3 since 2017
**COSCUP session:** 「AI Agent 的信任堆疊」, Room TR511, Day 1
**Topic tags:** HTTP 402, x402, Coinbase, MCP payments (MPP/Mar Protocol), ERC-8004, agent identity, on-chain reputation, TEE, KMS, ZK-VM, EigenLayer AVS

---

## One-line summary

A three-layer model for how AI agents can build trust on-chain — **payment → identity/reputation
→ verifiable computation** — surveying the concrete specs and projects at each layer and how
mature each one is today.

## The trust ladder

Williams frames agent trust as a ladder: the higher you climb, the greater the technical
difficulty, but the more you can rely on the agent.

| Layer | Question it answers | Maturity (per speaker) |
|---|---|---|
| **1. Micro-payment** | Can the agent pay for what it uses? | Working today (x402, MPP) |
| **2. Identity & reputation** | Who is this agent, and is it any good? | Exists, but "honestly not done well" |
| **3. Verifiable computation** | Did the agent actually run what it claims? | Early; few real on-chain implementations |

---

## Layer 1 — Payments

### Why traditional payment doesn't fit agents

Credit-card rails assume **low frequency, higher amounts** (a bike, a hotel). Agent commerce is
the inverse: **very high frequency, tiny amounts** — e.g. paying $0.00x to fetch a weather
datum or buy an API call. Card fees (~$0.30/transaction) dwarf the payment. An x402 payment on
Base costs roughly **$0.001**, a **>300×** difference. Agents also have no identity for KYC, so
traditional onboarding friction is fatal.

### x402 (Coinbase's spec, "S402" in transcript)

- Built on **HTTP 402 Payment Required** — a status code reserved since **1997** but never given a standard payment flow. x402 fills in that flow.
- HTTP-native: no account, no login. The agent reads price/payment info straight from the HTTP response and pays with a stablecoin (typically **USDC**).
- **Recent doc change** (two days before the talk): Coinbase restructured the roles into **buyer** and **seller**, and made the **facilitator** ("pce data" in transcript) role **mandatory** rather than optional — and that facilitator can currently only be run by **Coinbase itself**.
  - Upside: sellers never touch the blockchain. A seller with an API or compute to sell just serves the resource; the facilitator handles on-chain verification and settlement.
  - Downside (raised in Q&A): this is a **single point of failure** and a **censorship** vector — Coinbase sits as a middleman that could, in principle, refuse to facilitate certain purchases. The speaker notes the docs don't claim censorship powers, but technically anyone *could* run the facilitator role; newer versions may restrict who.
- **Flow:** client requests resource → server returns `402 Payment Required` + challenge → client resigns with a signed payload → server forwards to facilitator → facilitator verifies on-chain that the buyer can pay → server delivers resource and the payment settles on-chain.
- A demo showed a `402` state, a signed payment, then `200 OK` on success. The settlement tx looks like a normal transfer but uses **`transferWithAuthorization`** (EIP-3009), authorizing a party to spend on the buyer's behalf.

### MPP / Mar Protocol (Stripe + "TLE")

- A competing payment protocol pushed by **Stripe** and a top-tier backer; positioned as a **"completion project" for HTTP 402** — standardizing it rigorously, with docs written to **IETF specification** style (mimicking `401`-style `WWW-Authenticate` negotiation).
- **More payment flexibility** than x402: supports many rails — ETH, L2s, **Bitcoin Lightning**, **Stellar**, and Web2 rails like **Visa/Stripe**. Anyone can write an MPP-compliant module.
- Payment **intents** come in forms: **one-shot** (pay once for one datum), **session** (pay-as-you-go, e.g. per-minute draw-down from an escrowed balance), and **recurring/subscription**.
- **Timeline & maturity:** x402 launched ~May last year; MPP launched ~March this year. x402 currently has the stronger ecosystem and performance simply from the head start and open early ecosystem-building. Long-term winner unclear.
- Related protocols the speaker flagged but didn't cover: **TAP** (agent authorization to sign/act for a human), **ACP** and **UCP** (how agents talk to existing seller interfaces). ACP is covered in detail by the next speaker.

---

## Layer 2 — Identity & reputation (ERC-8004)

The transcript says "ERC-18004"; the actual proposal is **ERC-8004** ("Trustless Agents"). Three modules:

1. **Identity Registry** — an agent owner calls `register`, minting an **ERC-721 NFT** that *is* the agent's on-chain identity. The owner attaches a URI describing the agent, can set the agent's wallet, and can authorize an operator. The NFT is **transferable** — opening the door to an eventual **agent marketplace**.
2. **Reputation Registry** — the owner deploys a reputation contract linked to the agent's NFT ID. Users who've interacted can `giveFeedback` (e.g. score 0–100 on owner-defined criteria); others can append rebuttals ("you never actually interacted with this agent"). Anyone can `read` the aggregate score.
   - **Known gap the speaker flagged:** ERC-8004 doesn't constrain *who* may leave feedback beyond forbidding the agent owner/approver. It cannot verify the reviewer actually used the agent — some deployments check for a prior payment interaction off-spec, but the contract itself doesn't enforce it.
3. **Validation Registry** — not yet live on mainnet. Owners request third parties to validate the agent's work. The speaker finds it "a bit silly": validation happens **off-chain** (validator visits a URI describing what/how to verify) and only the **result** (OK / not OK) is written on-chain — there's no on-chain verification, just an on-chain record of an off-chain verdict.

> Net: ERC-8004 gives an agent an ERC-721 identity plus reputation/validation ledgers that
> act like a résumé. Whether it's *trustworthy* isn't the point — the point is a durable,
> queryable record others can judge for themselves.

---

## Layer 3 — Verifiable computation

Goal: prove the agent ran the computation it claims. Most projects here do proofs **off-chain**
with no on-chain follow-through; the speaker highlights the rare ones that go on-chain.

### iEXEC-style TEE + KMS ("IONC computer" in transcript)

An L-tier project letting agents **compute off-chain, verify on-chain**:

- Developer deploys a **Docker image digest** on-chain.
- The image runs in a **TEE** (Trusted Execution Environment).
- A **KMS** (Key Management Service) role releases the wallet key / secret **only if** the running image's attestation matches the on-chain digest — so the agent can use protected assets only inside a trusted environment.
- The image bundles the program, its declared environment, and dependencies; a hash of the image is what's committed on-chain. The core guarantee: **you computed the thing you said you'd compute.**

### EigenLayer AVS restaking hook

- Reading the project's GitHub, the speaker found a **`ComputeAVSRegistry`**-style contract requiring the compute operators to be **EigenLayer AVS operators** — i.e. only restaked AVS operators can manage these compute contracts.
- Implication: operators who misbehave during verification could be **slashed** (lose staked ETH). The speaker couldn't yet find the operators' concrete duties in the code, and was disappointed the team updates slowly and rarely responds to community messages.

### ZK verifiable computation

- ZK can prove **more** than a TEE: not just *that* a specified program/model ran, but that **given inputs are correct** and the **output is correct** — verifying the result, not merely the execution.
- Main drawback: **proving cost** is still high, though falling.
- Limitation today: ZK-VM projects (the speaker names **Brevis**-style provers) mostly **don't interact with a blockchain** yet — proofs stay off-chain.

## Closing thesis

Give agents payment → they can do more commercial work. Give them on-chain identity → they're
discoverable. Give them reputation → people find them reliable. Let their work be verified →
people find them trustworthy. Each rung is harder, but each raises how much we can trust agents.

### Q&A highlights

- **Censorship / SPOF of the x402 facilitator** (covered above) — Coinbase-as-middleman is a real single point of failure; the spec doesn't address it.
- **Agent code ↔ private-key binding:** ERC-8004 does **not** guarantee that a given code segment is uniquely bound to one on-chain agent. Anyone could upload identical code and claim it; the spec doesn't prevent impersonation at that layer.
- **x402 fee** ~ $0.001 USD; the live demo tx cost roughly $0.008 — still cheap.
- **HTTP downgrade / request-smuggling risk:** if an intermediate hop uses HTTP/1.1, could x402 be smuggled or downgrade-attacked? The speaker hadn't seen the specs address transport-layer hardening.

## Referenced specs, projects & concepts

| Item | What it is | Link |
|---|---|---|
| **x402** | Coinbase's HTTP-402-native payment protocol | https://github.com/coinbase/x402 |
| **HTTP 402** | The reserved "Payment Required" status code | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402 |
| **EIP-3009** | `transferWithAuthorization` — gasless authorized transfers | https://eips.ethereum.org/EIPS/eip-3009 |
| **MPP / Mar Protocol** | Stripe-backed agent-payment protocol, IETF-style | (search "Mar Protocol agent payments" — spec still stabilizing) |
| **ERC-8004** | Trustless Agents: identity + reputation + validation registries | https://eips.ethereum.org/EIPS/eip-8004 |
| **ERC-721** | The NFT standard used for agent identity | https://eips.ethereum.org/EIPS/eip-721 |
| **EigenLayer / AVS** | Restaking; Actively Validated Services with slashing | https://www.eigenlayer.xyz/ |
| **iExec** | TEE-based confidential/verifiable off-chain compute | https://www.iex.ec/ |

> **Speaker note:** slides available via the session QR code. Williams invited contact on
> Passkey/L1/L2/infra topics.

## Note on transcript quality

Heavy ASR mangling of proper nouns: "S402" = **x402**, "Cinbase/Cinvase" = **Coinbase**,
"Mar Protocol / MPP" with "TLE"/"strip" = Stripe-backed Mar Protocol, "ERC18004" = **ERC-8004**,
"IONC computer" = a TEE+KMS compute project (likely **iExec**-class), "IP3009" = **EIP-3009**,
"ABS" = **AVS**. Verify each against the slides before citing.
