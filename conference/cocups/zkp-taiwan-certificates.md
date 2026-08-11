# Research: Taiwan Government PKI Credentials + ZK Anonymous Credentials

Follow-up research requested after Session 04 ([zkp-natural-person-cert](../sessions/04-zkp-natural-person-cert.md)),
on **"zero-trust / zero-knowledge certification"** in the Web3 talks and the **three
Taiwanese-government-issued certifications** involved.

---

## Part 1 — The three Taiwan government certificate types

Taiwan runs a national **GPKI (Government Public Key Infrastructure)** — a hierarchical PKI
whose sub-CAs issue several classes of X.509 certificate on IC cards. The talk centered on the
**Citizen Digital Certificate**, but it sits within a family. The "three certifications" the
user recalled most likely map to the three CAs whose credentials citizens/organizations
actually encounter:

| # | Certificate (中文) | English | Issuing CA / ministry | Who it identifies |
|---|---|---|---|---|
| 1 | **自然人憑證** | Citizen Digital Certificate | **MOICA** — Ministry of the Interior CA | A natural person (an individual citizen) |
| 2 | **工商憑證** | Business (Commerce & Industry) Certificate | **MOEACA** — Ministry of Economic Affairs CA | A company / branch / limited partnership / business |
| 3 | **組織及團體憑證 (XCA)** | Organization & Group Certificate | **XCA** — now under the Ministry of Digital Affairs (MODA) | Schools, foundations, associations, professional offices, other non-corporate organizations |

Key facts established by the research:

- All follow **X.509 v3** format: basic fields + extension fields + CA signature.
- Each IC card typically stores **two key pairs** — one for **signing**, one for **encryption/decryption**.
- Organization & Group certificates (XCA) have a **6-year** public-key/private-key validity.
- The best-known pair in daily use are MOICA's **自然人憑證** (individuals) and MOEACA's **工商憑證** (businesses); XCA covers everything organizational that isn't a registered company.
- Since 2023-01-01, some government systems (e.g. FDA e-filing) require a company's master account to log in **only** with 工商憑證 or 組織及團體憑證 IC cards — a concrete example of these three being the accepted "levels" of institutional identity.

### The mobile evolution: 行動自然人憑證 (Mobile Citizen Digital Certificate)

- MOI's **FIDO-based mobile** version binds to phone **biometrics** (fingerprint/face), removing the card-insertion + PIN step.
- Relevant to Session 04: the speaker chose 自然人憑證 partly because the mobile version supports biometric unlock and (unlike a passport) its **revocation status is queryable** via a published CRL, refreshed every 12 hours, indexed by serial number.

**Primary sources:**
- GPKI certificate catalogue: https://xca.nat.gov.tw/web2/howinfo01-1.html
- GPKI Certificate & CRL Profiles v1.6 (X.509 field definitions): https://moica.nat.gov.tw/download/GPKI_Cert_and_CRL_Profilesv1_6.pdf
- MOICA (自然人憑證): https://moica.nat.gov.tw/
- MOEACA (工商憑證): https://moeaca.nat.gov.tw/
- Mobile CDC (FIDO): https://fido.moi.gov.tw/pt/

---

## Part 2 — The ZK anonymous-credential stack (what the talk was actually built on)

The talk's "zero-knowledge certification" is **OpenAC**, and the Taiwanese PTT integration is a
real, documented project. This is the "zero-trust knowledge" mechanism the user asked to research.

### OpenAC — the protocol

- **OpenAC** = *"Open Design for Transparent and Lightweight Anonymous Credentials"* — a **two-phase** (prepare / show) anonymous-credential protocol from the **zkID team at PSE (Privacy & Scaling Explorations), Ethereum Foundation.**
- Design goals matching the talk: **transparent (no trusted setup)**, works with **existing identity stacks** (EUDI, national ID, KYC, SD-JWT/mDL) **without changing the issuer**, generates proofs **locally on the user's device**, and each proof is **cryptographically unlinkable**.
- Reported **show-proof time ≈ 0.129 s** — consistent with the talk's ~5–6 s figures once you add the RSA/X.509 government-certificate verification circuits on top.

### The cryptographic building blocks (matching the transcript)

| Transcript term | Actual primitive | Role |
|---|---|---|
| "Sparton / Sparta" | **Spartan** | Transparent zkSNARK IOP, no trusted setup |
| "HX / Hox" | **Hyrax** | Polynomial commitment scheme (Pedersen + IPA) |
| — | **ECDSA / RSA in-circuit** | Verify issuer + holder signatures in ZK |
| — | **SD-JWT** | Selective-disclosure credential format OpenAC wraps |
| "SPAR McLE Tree" | **Sparse Merkle Tree** | Privacy-preserving **non-revocation** proof |
| "PK Comm" | **Pedersen/PK commitment** | Links split circuits + the prepare→show phases |

OpenAC currently uses **Spartan + Hyrax-style Pedersen commitments over the Tom256 curve**;
its rerandomizable proofs give unlinkability cheaply, and there's active research into a
**post-quantum** variant (Ajtai commitments, CCS, ML-DSA device binding).

### The PTT integration (the talk's actual deliverable)

This is real and traceable in the open:

- **Repositories** live under the PSE org **`privacy-scaling-explorations`** and **`zkmopro`**:
  - `privacy-scaling-explorations/zkID` — the OpenAC circuits + prover.
  - `zkmopro/mopro` — cross-platform **mobile** ZK proving (iOS/Android/web), the "customized FFI/bindings" the talk referenced (Noir wrapper, `openac-rsa-x509-js`, etc.).
  - A **Go** verifier for PTT's backend, and a **revocation** repo building the SMT from the 自然人憑證 CRL.
- **The nullifier problem the talk described is documented in a live issue:**
  [`zkmopro/mopro#667` — "check with zkID team about nullifier implementation"](https://github.com/zkmopro/mopro/issues/667). It states the exact tension from the talk: OpenAC is built for **unlinkability**, so you can't tell whether two proofs came from the same person — yet PTT must ensure one **自然人憑證** isn't used by two different people, and must detect if the same certificate is submitted twice. This is precisely the "hash-of-SDN vs. signature-based nullifier" tradeoff in Session 04.

### Third-party / ecosystem implementations found

- **`@l8zk/sdk`** (npm) — an independent SDK built on OpenAC (Spartan/Hyrax/ECDSA/SD-JWT), MIT-licensed. Useful as a reading reference for the protocol's shape.
- **Solidarity's `passport-noir`** — implements OpenAC for **passport** credentials (the alternative the talk chose *not* to use), with a documented prepare/show architecture and Pedersen commitment on the Grumpkin curve. Good contrast material.
- **PSE zkID "master map"** (https://pse.dev/mastermap/zkid) — the roadmap: EUDI alignment, mDOC/mDL support, Merkle-tree revocation, ETSI TS 119 476-2 contribution, MODA/TWDIW collaboration. Note the explicit **MODA/TWDIW (Taiwan Digital Identity Wallet)** collaboration line — the Taiwan government link is on PSE's own roadmap.

**Primary sources:**
- OpenAC / zkID overview (PSE): https://pse.dev/mastermap/zkid
- zkID circuits: https://github.com/privacy-scaling-explorations/zkID
- mopro (mobile proving): https://github.com/zkmopro
- PTT nullifier issue: https://github.com/zkmopro/mopro/issues/667
- Spartan: https://github.com/microsoft/Spartan
- OpenAC post-quantum exploration (design detail): https://hackmd.io/frL5imWHRN-TExd3rl8sgA

---

## How this ties the two talks together

Both Session 02 (agent trust) and Session 04 (personhood proofs) are answering **"how do you
establish trust in an actor without a central authority storing who they are?"** — Session 02
does it for software agents via on-chain identity/reputation; Session 04 does it for humans via
ZK proofs over a government certificate. The shared primitive worldview is **verify a claim,
reveal nothing else** — "zero-knowledge" as the counterpart to "zero-trust."
