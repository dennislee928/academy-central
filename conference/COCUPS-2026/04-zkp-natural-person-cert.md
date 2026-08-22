# 零知識證明與自然人憑證身份驗證

**Source recording:** 新錄音 28
**Speaker:** **Ya-wen Jeng** (林士? — self-intro garbled; schedule lists Ya-wen Jeng) — developer, 2021–2026/06, ZK identity work
**COSCUP session:** 「零知識證明與自然人憑證身份驗證」, Room TR511, Day 1
**Topic tags:** Zero-knowledge proofs, 自然人憑證 (Citizen Digital Certificate), PTT bot-prevention, OpenAC, Spartan, Hyrax, Sparse Merkle Tree revocation, circuit splitting, nullifiers

---

## One-line summary

A privacy-preserving identity system that lets a user prove they are a Taiwanese citizen (via
the government **Citizen Digital Certificate / 自然人憑證**) to register on **PTT** — proving
personhood and non-revocation **without** the platform storing any personal data — built on the
**OpenAC** ZK anonymous-credential protocol.

## The problem: personhood without PII

- **PTT** (批踢踢) is a 1995 NTU-born BBS, still ~30,000 daily users, run **non-profit** — it explicitly does *not* monetize user data like large social platforms do.
- History of registration methods:
  - Originally **school-email** registration → abused by mass fake-account registration and coordinated manipulation (網軍/astroturfing).
  - Then **AOTP** (reverse OTP): instead of the telco sending you a code, the platform displays a code and the user texts it to the telco, which confirms the user sent it. Still in use today.
- Both methods force a **trust dependency**: trust the school, or trust the telco, to vouch for identity. And storing user identity data is **expensive** and a **breach/liability risk** for a non-profit — leaked data could enable crime/fraud, and cooperating with investigations can conflict with users' rights.
- **The goal:** let a user prove *"I am a Taiwanese person"* — nothing more. No name, no ID number, no stored PII. This is a textbook ZK use case: no reliance on telco, no stored user data.

## Why the Citizen Digital Certificate (自然人憑證), not passport

The speaker chose **自然人憑證** over the passport for several reasons:

| Factor | 自然人憑證 (chosen) | Passport |
|---|---|---|
| Signature | Electronic signature available | — |
| Revocation status | **Queryable** (government CRL) | Chip data doesn't reflect revocation; 10-yr validity |
| Cross-platform | Better | Requires NFC + chip → phone-only scanning |
| UX | Mobile version has biometric binding (FaceID/fingerprint) | Worse |

(Digital credential wallets are still draft-stage, hence unclear.)

## The ZK stack: OpenAC (zkID / Spartan + Hyrax)

- Built on **zkID / OpenAC** — the anonymous-credential protocol published by the **zkID team at PSE (Privacy & Scaling Explorations), Ethereum Foundation**. (See [research note](../research/zkp-taiwan-certificates.md).)
- **Proof system: Spartan + Hyrax.** Advantages: **no trusted setup** (transparent), composes with common signature schemes, and **excellent cross-platform performance** — proofs generate on laptop, iOS, Android, and web.
- A second primitive provides **customized FFI / bindings** (referencing Noir), auto-generating platform bindings so developers don't hand-write per-language provers (no separate Swift-version prover for iOS).

## Circuit design

### Two signatures to verify

The 自然人憑證 contains data enabling two checks:

1. **Government signature** — the government signs a certificate for the user at issuance, proving the certificate is genuinely government-issued. (Detail: 2nd-gen certs are RSA-2048; 3rd-gen are RSA-4096. The signed message is the user's **X.509 certificate**.)
2. **User signature** — the platform gives an arbitrary `message` (challenge); the user performs the signing operation, proving they **possess/control** the certificate.

Both matter, so both are verified, producing one proof. Because a Circom circuit can split inputs
into public/private, the design **publishes the government public key** (available on the Ministry
of the Interior website) and the platform-provided `message` as **public inputs**, so the verifier
knows the user fed the correct expected values rather than arbitrary RSA signatures.

### Linking the two signatures

To ensure both signatures come from the same certificate: the user's `userCert` **contains** the
RSA public key, so an extra ZK constraint proves the user's RSA public key derives from the
**government-signed certificate**.

## Proving non-revocation anonymously (Sparse Merkle Tree)

The hard part: prove the certificate **isn't revoked** without revealing which certificate it is.

- Every 自然人憑證 has an expiry; the **Ministry of the Interior publishes a revocation list (CRL)**, queryable online, **updated every 12 hours**. The CRL is indexed by **serial number** (憑證序號).
- **Problem:** revealing your serial number to prove non-revocation leaks identifying information.
- **Solution: a Sparse Merkle Tree (SMT).**
  - A binary tree where index *i* corresponds to serial number *i*; a revoked serial sets its node to a value, unrevoked/default nodes are 0. Nodes are hashed pairwise up to a **root** that summarizes the whole tree. Change any node and the root changes completely.
  - In-circuit, you can prove a node's value **without revealing the index** — so the serial number is a **private input** and only the tree **root** is public. Anyone building the same SMT gets the same root.
  - To prove you're **not** revoked: prove your serial's node value is **0**. This SMT check is folded into the same circuit as the RSA-signature verification.

So there are **three components**: two verify RSA signatures, one verifies non-revocation — all
producing a single proof. Because the user certificate contains the public key + serial, extra
constraints tie the RSA public key and serial to the certificate.

## The memory problem → circuit splitting

- The combined circuit is **too big**: peak memory exceeded ~2 GB. Early phones with 4 GB RAM (or 2 GB) would crash the app (the speaker saw iOS OOM crashes).
- **Solution: split one circuit into two smaller circuits.** Peak drops from ~2 GB to ~1 GB each, at the cost of **two proofs**.
- **New problem:** prove both halves come from the **same** certificate (not one real + one forged).

### PK Commitment (linking the split proofs)

- A **PK Commitment**: `hash(userPK, r)` where `r` is a random nonce.
- The hash **doesn't reveal the user's public key** (userPK is protected).
- Because `r` is random per-generation, the commitment differs each time, so **two proofs can't be linked** to the same person by an outside observer — but the verifier can check both halves produced the **same PK commitment value**, proving they're one certificate.
- **Performance:** ~5 s on iOS, ~6 s on Android, ~20 s on web (runs in a WASM environment); storage ~1 GB. Acceptable versus the prior situation.

## Nullifiers: preventing double registration

Goal: prove a user has verified **once**, reject a **second** verification, without revealing identity.

- **Original design:** use the certificate's unique **Subject DN (SDN)** — name, nationality, serial number — hashing subject + something into a nullifier, so a second registration is rejected.
- **Problem:** the **SDN is not private** — anyone who has integrated 自然人憑證 can obtain it. E.g., applying to a service reveals your SDN to that agency, who could then reverse-derive your nullifier and learn which platforms you use.
- **Fixed design:** derive the nullifier only from data **only the user can produce** — the **private key**. Via a private-key signature (over the **AAPID**), only the user can generate that signature → nullifier. The design must **not** additionally check the public subject fields, or it re-breaks anonymity.
  - **Tradeoff:** the private key never leaves the chip / mobile 自然人憑證 device. The physical cert has one private key; the mobile cert generates a new signing key — so **the same person can produce different nullifiers** across devices.

### Method comparison

| | Hash-of-SDN | Signature-based nullifier (chosen) |
|---|---|---|
| Same-person guarantee | Yes, strong | Weaker (per-device keys) |
| Anonymity | Nullifier can be reverse-derived | Only the user can compute it |

Since mobile 自然人憑證 allows **at most 2 devices** to register, a single user can have **at
most 3 distinct signatures/nullifiers** (physical + 2 mobile). The team prefers the
signature-based method and hopes for a better future approach.

## Challenge (proof freshness)

To stop a proof generated a month ago from being reused, the circuit takes a **`challenge`** as
a **public input**; the user performs a multiplication over the challenge (a ZK-flavored
signature) to bind the proof to a ~5-minute window. Tamper with the challenge and the proof
becomes invalid. Implemented in both the iOS and CA-side circuits.

## Auditing with AI

- Normally you'd pay a large firm for a circuit audit. This project used **AI audit tooling** first ("auditor").
- Two lessons: (1) results must be **filtered against your own use case** — the OpenAC-derived design was flagged **critical** because of an intentional property, so context matters; (2) auditing **isn't one-and-done** — a 2nd/3rd pass surfaced issues the first missed. More passes = safer, given it's an AI tool.

## Open-source repositories

All under the **`privacy-scaling-explorations`** (PSE) organization:

| Repo | Purpose |
|---|---|
| **ZID / zkID** | Implements all circuits + prover | https://github.com/privacy-scaling-explorations/zkID |
| **zkID-verify (Go)** | Verification logic in **Go** for PTT's backend | (PSE org) |
| **revocation (SMT builder)** | Builds the SMT for the 自然人憑證 CRL, refreshed hourly | (PSE org) |
| **mopro** | Cross-platform mobile ZK proving (iOS/Android/web SDK) | https://github.com/zkmopro/mopro |

- Cross-platform provers exist for Swift + others; per-SDK examples for iOS, Android, WASM.
- **Live PTT issue** confirming this work: [zkmopro/mopro#667 — "check with zkID team about nullifier implementation"](https://github.com/zkmopro/mopro/issues/667) — directly discusses the double-registration / nullifier problem for 自然人憑證 on PTT.
- Demo apps exist for iOS, Android, and web, running against PTT's **staging backend** (register with a test email).

### Future directions

Cross-platform SDK expansion (React Native, macOS, Windows), and eventual support for other
credentials (passport, etc.). It's delivered as an **SDK** — developers integrate what they need.

### Q&A

- **Is downloading a mobile app just a transitional design?** The speaker recommends the app for smoother UX, but agrees a pure-download/browser version would be ideal.
- **Tested on Windows browser?** Yes — noted that Noir on Windows browsers can OOM/crash easily.

## Referenced projects & concepts

| Item | What it is | Link |
|---|---|---|
| **OpenAC** | zkID's transparent, lightweight anonymous-credential protocol | https://pse.dev/mastermap/zkid |
| **zkID (PSE)** | Ethereum Foundation ZK-identity team & circuits | https://github.com/privacy-scaling-explorations/zkID |
| **mopro** | Client-side mobile ZK proving toolkit | https://github.com/zkmopro |
| **Spartan** | Transparent zkSNARK, no trusted setup | https://github.com/microsoft/Spartan |
| **Hyrax** | Polynomial commitment scheme (transparent) | (paper: Wahby et al.) |
| **自然人憑證 (MOICA)** | Taiwan Citizen Digital Certificate | https://moica.nat.gov.tw/ |
| **PTT** | The BBS the system registers users for | https://www.ptt.cc/ |

## Note on transcript quality

Mixed Mandarin/English, ASR-transcribed. Key resolutions: "DKID/ZKID" = **zkID**, "OpenAC论文" =
**OpenAC paper**, "Sparton/Sparta" = **Spartan**, "HX/Hox" = **Hyrax**, "SPAR McLE Tree" =
**Sparse Merkle Tree**, "PK Comm" = **PK Commitment**, "NF/nullifier" = **nullifier**,
"AAPID/APID" = the certificate's AAPID field, "SDN" = **Subject DN**. Speaker name and some
details are uncertain — verify against the session video (QR on the speaker's slide).
