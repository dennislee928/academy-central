# CCSP LearnZApp Custom Test 2 — Weakness Analysis & Patch Plan

**Source:** `zapp_2.zip` extracted screenshots from `isc2.learnzapp.com / sc2.learnzapp.com` Custom Test  
**Extracted evidence:** 26 PNG files: 1 score summary + 25 review screenshots  
**Test type:** Custom Test, heavily concentrated on weak domains

---

## 1. Executive Summary

### Test Result

| Metric | Value |
|---|---:|
| Total Questions | 50 |
| Correct | 25 |
| Incorrect | 25 |
| Unanswered | 0 |
| Test Score | 50% |
| Average Time / Question | 34 seconds |
| Readiness Score | 45% → 42% |

### Domain-wise Performance from Result Screen

| Domain | Score | Correct / Total | Diagnosis |
|---|---:|---:|---|
| D1 — Cloud Concepts, Architecture and Design | 56% | 10 / 18 | Weak but recoverable |
| D2 — Cloud Data Security | 63% | 12 / 19 | Improved versus prior weak baseline, but still not stable |
| D6 — Legal, Risk and Compliance | 23% | 3 / 13 | Critical weakness |

Only D1, D2, and D6 appeared in the score summary. The test was therefore not a balanced CCSP mock. It was effectively a **targeted weak-domain stress test**.

---

## 2. Progress Assessment

### Short Answer

There is **partial progress**, but not broad stability yet.

### Compared with the Previous Custom Test

Previous Custom Test baseline:

| Domain | Previous Custom Test | Current Custom Test | Direction |
|---|---:|---:|---|
| D1 | 69% | 56% | Down |
| D2 | 54% | 63% | Up |
| D6 | 55% | 23% | Down sharply |
| Overall | 62% | 50% | Down |

### Interpretation

The score drop should not be interpreted as simple regression only. This test was much more concentrated in weak legal/compliance and conceptual edge cases.

However:

- **D2 shows visible improvement** from 54% to 63%.
- **D1 is not stable** under governance / architecture wording.
- **D6 is the dominant risk** and needs immediate repair.
- Average speed remains very fast at **34 seconds/question**, which likely contributes to keyword-driven errors.

### Current Readiness Interpretation

| Area | Status |
|---|---|
| D2 patching | In progress, improving |
| D1 architecture / governance concepts | Borderline |
| D6 legal / audit / privacy vocabulary | Critical weakness |
| Mixed custom test stability | Not ready yet |
| Full mock readiness | Should pause until D6 is patched |

---

## 3. Core Weakness Pattern

The main weakness is not pure technical ignorance. The dominant pattern is **taxonomy failure**:

1. Standard vs report
2. Legal principle vs regulatory right
3. Lifecycle phase vs control mechanism
4. Cloud model vs security control
5. Provider/vendor risk vs customer technical control
6. Data archival usability vs encryption-only thinking
7. Privacy law vocabulary and OECD principles

---

# 4. Wrong Question Analysis

The following list paraphrases the 25 incorrect review screenshots. It avoids copying full vendor text, but preserves the tested concept, selected mistake, correct concept, and patch rule.

---

## Q1. Internal Threat Countermeasures

| Item | Analysis |
|---|---|
| Domain | D1 |
| Wrong reasoning | Treated background checks as the exception |
| Correct concept | Hardened perimeter devices mainly reduce external attacks, not internal threats |
| Patch rule | **Internal threat controls = background checks, training, skills testing, monitoring. Perimeter hardening = external threat control.** |

---

## Q2. ISO 31000 vs HIPAA / ISO 27017 / NIST 800-92

| Item | Analysis |
|---|---|
| Domain | D6 |
| Wrong reasoning | Selected NIST 800-92 |
| Correct concept | ISO 31000 is the risk management framework focused on design, implementation, and management |
| Patch rule | **ISO 31000 = risk management. ISO 27017 = cloud security controls. NIST 800-92 = log management. HIPAA = healthcare privacy.** |

---

## Q3. OECD Use Limitation Principle

| Item | Analysis |
|---|---|
| Domain | D6 |
| Wrong reasoning | Chose meaningless distractor principle |
| Correct concept | Use limitation principle restricts PII use to disclosed / permitted purposes |
| Patch rule | **OECD use limitation = collected PII may only be used for the stated purpose / permitted use.** |

---

## Q4. Long-Term Data Archiving Security Concern

| Item | Analysis |
|---|---|
| Domain | D2 |
| Wrong reasoning | Treated cryptographic-key retention as not a concern |
| Correct concept | Key retention, data format, and media are all archiving concerns; underground depth is not the core data-security concern |
| Patch rule | **Archive security = key availability + readable format + usable media. Physical depth is not the key concern.** |

---

## Q5. Cloud Secure Data Life Cycle Is Not Truly a Cycle

| Item | Analysis |
|---|---|
| Domain | D2 |
| Wrong reasoning | Focused on whether phases happen in cloud |
| Correct concept | Create → Store → Use → Share → Archive → Destroy is not truly cyclical because destroyed data does not loop back |
| Patch rule | **CSU-SAD ends at Destroy; the same data does not return to Create.** |

---

## Q6. Data Labels

| Item | Analysis |
|---|---|
| Domain | D2 |
| Wrong reasoning | Treated confidentiality level as invalid label content |
| Correct concept | MFA is an authentication procedure, not a data label |
| Patch rule | **Data labels may include classification, distribution limits, access restrictions. MFA is an access-control process, not label metadata.** |

---

## Q7. Why Use NIST SP 800-Series

| Item | Analysis |
|---|---|
| Domain | D1 |
| Wrong reasoning | Selected international acceptance |
| Correct concept | NIST publications are publicly available and cost-effective; they are not necessarily internationally mandated or easy |
| Patch rule | **NIST SP 800 = strong U.S. public-sector guidance, public-domain access; not primarily international acceptance.** |

---

## Q8. OECD Privacy Principles vs Right to Be Forgotten

| Item | Analysis |
|---|---|
| Domain | D6 |
| Wrong reasoning | Treated refusal to share as not OECD-related |
| Correct concept | Purge / right to be forgotten is GDPR-style, not one of the original OECD principles |
| Patch rule | **OECD principles include collection limitation, data quality, purpose specification, use limitation, security safeguards, openness, individual participation, accountability. Right to be forgotten = GDPR-era concept.** |

---

## Q9. Patent Application Agency

| Item | Analysis |
|---|---|
| Domain | D2 / D6 IP |
| Wrong reasoning | Selected USDA |
| Correct concept | USPTO handles patent and trademark applications |
| Patch rule | **Patent / trademark application in U.S. = USPTO. USDA = agriculture. OSHA = workplace safety. SEC = securities/public companies.** |

---

## Q10. Cloud BC/DR Model

| Item | Analysis |
|---|---|
| Domain | D1 |
| Wrong reasoning | Misread normal cloud backup patterns |
| Correct concept | Cloud provider backed up by private provider is not a typical BC/DR model |
| Patch rule | **BC/DR cloud models usually involve private architecture + cloud backup, same-provider cloud backup, or another cloud provider. “Cloud provider backup from private provider” is not the normal pattern.** |

---

## Q11. DMCA / Public Domain

| Item | Analysis |
|---|---|
| Domain | D6 / D2 IP |
| Wrong reasoning | Assumed permissions are required for very old content |
| Correct concept | Very old copyrighted material may have entered public domain |
| Patch rule | **Copyright expires; public-domain works can be used without seeking permission.** |

---

## Q12. Diffie-Hellman vs RSA

| Item | Analysis |
|---|---|
| Domain | D2 cryptography |
| Wrong reasoning | Chose RSA for session-key creation |
| Correct concept | Diffie-Hellman enables creation of a shared symmetric secret over an untrusted channel |
| Patch rule | **Diffie-Hellman = key exchange/shared secret. RSA = encryption/signature scheme.** |

---

## Q13. Most Important Archiving Policy Element

| Item | Analysis |
|---|---|
| Domain | D2 |
| Wrong reasoning | Prioritized encryption over recoverability |
| Correct concept | Data format and type are most critical to archive usability and recovery |
| Patch rule | **Archive value depends on future recoverability. Wrong format can equal data loss.** |

---

## Q14. Escalation of Privilege Mitigation

| Item | Analysis |
|---|---|
| Domain | D1 / D3 |
| Wrong reasoning | Selected access control as exception |
| Correct concept | Cryptographic sanitization reduces data remanence risk, not privilege escalation |
| Patch rule | **Privilege escalation controls = access control, authentication, monitoring, log analysis, SIEM. Cryptographic sanitization = data remanence/destruction control.** |

---

## Q15. Privileged User Access

| Item | Analysis |
|---|---|
| Domain | D1 |
| Wrong reasoning | Selected granular |
| Correct concept | Privileged access should be temporary / time-bound |
| Patch rule | **Privileged access = just-in-time, temporary, least privilege, monitored.** |

---

## Q16. Vendor M&A Risk

| Item | Analysis |
|---|---|
| Domain | D6 |
| Wrong reasoning | Selected an unrelated vendor-risk item |
| Correct concept | Pending acquisition or merger may lead to vendor lockout or service discontinuation |
| Patch rule | **Vendor acquisition/merger risk = service discontinuity / vendor lockout / contract instability.** |

---

## Q17. OECD Data Quality Principle

| Item | Analysis |
|---|---|
| Domain | D6 |
| Wrong reasoning | Chose meaningless privacy-principle distractor |
| Correct concept | Data quality principle requires personal data to remain valid, accurate, and correctable |
| Patch rule | **OECD data quality = accurate, complete, current, and correctable.** |

---

## Q18. PaaS Data Storage Type

| Item | Analysis |
|---|---|
| Domain | D2 / D1 |
| Wrong reasoning | Did not map PaaS to provider-managed database services |
| Correct concept | PaaS commonly uses database storage administered by the provider but accessed by customer applications |
| Patch rule | **PaaS = customer builds/runs applications; provider manages platform and often database services.** |

---

## Q19. Two-Person Integrity

| Item | Analysis |
|---|---|
| Domain | D1 / D5 |
| Wrong reasoning | Interpreted it as two IAM matrices |
| Correct concept | Two-person integrity forces collusion for unauthorized access |
| Patch rule | **Two-person integrity = no single person can perform sensitive action alone. It reduces insider risk by requiring collusion.** |

---

## Q20. SaaS Model

| Item | Analysis |
|---|---|
| Domain | D1 |
| Wrong reasoning | Misidentified vendor-hosted application solution |
| Correct concept | SaaS provides an application running on provider/vendor infrastructure |
| Patch rule | **SaaS = use provider’s application. PaaS = build/deploy application. IaaS = manage OS/application/data over rented infrastructure.** |

---

## Q21. CSA CCM Companion Tool

| Item | Analysis |
|---|---|
| Domain | D6 |
| Wrong reasoning | Selected NIST FIPS 140-2 |
| Correct concept | CAIQ is the CSA questionnaire used with CCM |
| Patch rule | **CSA CCM = control matrix. CAIQ = questionnaire. FIPS 140-2 = cryptographic module validation. OWASP Top 10 = web app risk list.** |

---

## Q22. ISO 27001 Technology Preference

| Item | Analysis |
|---|---|
| Domain | D1 / D6 |
| Wrong reasoning | Thought ISO 27001 favors a technology type |
| Correct concept | ISO 27001 is product/technology agnostic |
| Patch rule | **ISO 27001 = ISMS framework; it does not favor open source, PC, cloud, vendor, or product type.** |

---

## Q23. EU Personal Data Transfer / Country Adequacy

| Item | Analysis |
|---|---|
| Domain | D6 |
| Wrong reasoning | Chose wrong country based on privacy-law adequacy |
| Correct concept in app item | The item treats South Korea as not conforming to EU-style privacy adequacy |
| Critical note | This item is legally time-sensitive and may be outdated. Current EU adequacy lists include the Republic of Korea. |
| Patch rule | **For exam prep: identify adequacy / cross-border transfer logic. For real-world facts: verify current official adequacy lists.** |

---

## Q24. Cloud Feature That Supports Audit

| Item | Analysis |
|---|---|
| Domain | D6 |
| Wrong reasoning | Selected a generic cloud feature |
| Correct concept | Ubiquitous baseline configuration in virtualized environments supports auditability |
| Patch rule | **Audit support = standardized baseline, configuration evidence, repeatability, versioned artifacts.** |

---

## Q25. Transparent Database Encryption Engine

| Item | Analysis |
|---|---|
| Domain | D2 |
| Wrong reasoning | Placed engine outside the DB |
| Correct concept | Transparent database encryption engine resides in the database/DBMS layer |
| Patch rule | **TDE = database-level transparent encryption. KMS manages keys; HSM protects keys; neither is the TDE engine.** |

---

# 5. Weakness Clusters

## Cluster A — D6 Legal / Privacy / Audit Taxonomy

### Symptoms

- OECD principles confused with GDPR rights.
- ISO, NIST, SOC, CSA, FIPS are mixed together.
- Vendor management and audit artifacts are not classified correctly.
- Legal facts are treated like memorized trivia rather than taxonomy.

### High-Risk Items

| Concept | Must Know |
|---|---|
| ISO 31000 | Risk management |
| ISO 27001 | ISMS; technology agnostic |
| ISO 27017 | Cloud security controls |
| NIST 800-92 | Log management |
| CSA CCM | Cloud Controls Matrix |
| CAIQ | CSA questionnaire |
| SOC 1/2/3 | Reports |
| SSAE 18 | Attestation standard |
| FIPS 140-2 | Crypto module validation |
| OECD Use Limitation | Use only for stated/permitted purpose |
| OECD Data Quality | Accurate, complete, current, correctable |

### Patch

Daily for 3 days:

- 15 minutes: legal/audit taxonomy table
- 10 minutes: OECD principles
- 10 minutes: CSA / SOC / ISO / NIST drill
- 15 questions D6 drill

Gate:

- D6 mini-test >= 75%
- No confusion between `standard`, `report`, `questionnaire`, `control matrix`, and `law`

---

## Cluster B — D2 Data Lifecycle / Archiving / Cryptography

### Symptoms

- Encryption is over-selected even when recoverability is the real issue.
- Data labels are confused with access procedures.
- TDE/KMS/HSM roles are not fully separated.
- PaaS storage model and data lifecycle phases need reinforcement.

### High-Risk Items

| Concept | Must Know |
|---|---|
| Archive policy | Format/type and recoverability matter most |
| Long-term archive | Keys, format, and media must remain usable |
| Data labels | Classification/access/distribution metadata |
| MFA | Authentication procedure, not label |
| TDE | DB/DBMS encryption engine |
| KMS | Key lifecycle management |
| HSM | Hardware key protection |
| Diffie-Hellman | Key exchange |
| RSA | Encryption/signature |
| CSU-SAD | Create, Store, Use, Share, Archive, Destroy |

### Patch

Daily for 3 days:

- 15 minutes: lifecycle table
- 15 minutes: TDE/KMS/HSM/DH/RSA
- 15 minutes: archive and label scenario drill
- 15 questions D2 drill

Gate:

- D2 mini-test >= 80%
- Can explain archive recoverability vs encryption

---

## Cluster C — D1 Cloud Models / Governance Controls

### Symptoms

- SaaS/PaaS/IaaS mapping is not always automatic.
- NIST / ISO framework purpose is confused.
- Internal vs external threat controls are mixed.
- Privilege-management controls are mixed with unrelated data controls.

### High-Risk Items

| Concept | Must Know |
|---|---|
| SaaS | Use provider’s application |
| PaaS | Build/run apps on provider platform |
| IaaS | Customer manages OS/app/data |
| NIST SP 800 | Public-domain U.S. guidance |
| ISO 31000 | Risk management |
| Two-person integrity | Requires collusion |
| Privileged access | Temporary / just-in-time |
| Perimeter hardening | External attack control |
| Background checks/training | Internal threat mitigation |

### Patch

Daily for 3 days:

- 10 minutes: SaaS/PaaS/IaaS contrast
- 10 minutes: threat-control mapping
- 10 minutes: privileged access / two-person integrity
- 15 questions D1 drill

Gate:

- D1 mini-test >= 75–80%
- Can separate cloud model, framework, and control category

---

# 6. One-Hour Immediate Patch Plan

## 0–5 min — Reset and Classification

Write three columns:

```text
D6 = law / audit / privacy / vendor / evidence
D2 = data lifecycle / crypto / archive / label / storage
D1 = cloud model / risk framework / privileged control
```

---

## 5–20 min — D6 Legal / Audit Patch

Memorize and recite:

```text
ISO 31000 = risk management
ISO 27001 = ISMS, technology agnostic
ISO 27017 = cloud security controls
NIST 800-92 = log management
CSA CCM = control matrix
CAIQ = questionnaire
FIPS 140-2 = cryptographic module validation
SSAE 18 = attestation standard
SOC 1/2/3 = reports
SOC 3 = public summary
OECD use limitation = use only for stated purpose
OECD data quality = accurate and correctable
```

Do 5 D6 questions.

---

## 20–35 min — D2 Data Security Patch

Memorize and recite:

```text
Archive policy: recoverability and data format/type matter first.
Long-term archive: keys, format, and media are all security/availability concerns.
Data label: classification, distribution, access metadata.
MFA: authentication process, not data label.
TDE: DB/DBMS encryption engine.
KMS: manages keys.
HSM: protects keys in hardware.
Diffie-Hellman: key exchange.
RSA: encryption/signature.
```

Do 5 D2 questions.

---

## 35–50 min — D1 Cloud Model / Control Patch

Memorize and recite:

```text
SaaS = use provider application.
PaaS = build/run application on provider platform.
IaaS = manage OS/app/data on provider infrastructure.
Internal threat controls = background checks, training, monitoring.
External attack controls = hardened perimeter devices.
Privileged access = temporary / just-in-time.
Two-person integrity = forces collusion.
```

Do 5 D1 questions.

---

## 50–60 min — 10-Question Oral Gate

Answer without looking:

1. ISO 31000 is for what?
2. NIST 800-92 is for what?
3. CSA CCM and CAIQ differ how?
4. SSAE 18 differs from SOC reports how?
5. OECD use limitation means what?
6. TDE engine is located where?
7. MFA belongs to data label or authentication?
8. Diffie-Hellman does what?
9. SaaS vs PaaS difference?
10. Two-person integrity reduces what risk?

Gate:

- 8/10 correct = continue to drill
- 6–7/10 = repeat the weak cluster
- <=5/10 = no mock test next day

---

# 7. Three-Day Recovery Plan

## Day 1 — D6 Priority

- 30 min D6 taxonomy
- 20 D6 questions
- 10 D6 wrong-question reviews
- 5 one-line rules

## Day 2 — D2 Priority

- 30 min D2 lifecycle + crypto
- 20 D2 questions
- 10 D2 wrong-question reviews
- 5 one-line rules

## Day 3 — D1 Priority + Mixed Drill

- 20 min D1 models and control mapping
- 15 D1 questions
- 20 mixed D1/D2/D6 questions
- Gate: mixed >= 75%

---

# 8. When to Resume Full Practice Tests

Do not resume full mixed practice tests until:

| Requirement | Target |
|---|---:|
| D1 mini-test | >=75% |
| D2 mini-test | >=80% |
| D6 mini-test | >=75% |
| Mixed D1/D2/D6 mini-test | >=75% |
| Average time | 45–75 sec/question |

Current 34 sec/question is too fast for legal/audit wording. Slow down on D6 and long scenario questions.

---

# 9. Final Diagnosis

This Custom Test is not evidence that the full preparation plan has failed. It shows that the known weak domains are still fragile when tested directly.

## Progress Exists

- D2 improved compared with the prior custom-test weak-domain score.
- Wrong questions are no longer random; they cluster around identifiable taxonomies.
- The patch path is clear.

## Risk Remains

- D6 legal/audit/privacy remains below safe level.
- D1 framework/control mapping is unstable.
- D2 archiving and crypto-role boundaries still need consolidation.

## Correct Next Move

Do not chase full mock tests immediately.

First:

```text
D6 taxonomy
D2 lifecycle / crypto / archiving
D1 cloud model / controls
```

Then:

```text
D1/D2/D6 mixed mini-test >= 75%
```

Only after that should full Practice Tests resume.
---
|Priority|Domain|Score|Weight|Weighted Risk|結論|
|---|---|---|---|---|---|
|**P0**|**D3**|54%|17%|**最高**|第一優先補|
|**P1**|**D1**|61%|17%|高|第二優先|
|**P1**|**D5**|60%|16%|高|第二優先|
|**P2**|**D6**|67%|13%|中|第三優先|
|Maintain|D2|82%|20%|低|維持即可|
|Maintain|D4|86%|17%|低|維持即可|

---

### 1. 電力系統的三劍客 (Power Supply)

當市電突然中斷時，資料中心是怎麼活下來的？

- **UPS (不斷電系統, Uninterruptible Power Supply)：** 它是「短跑選手」。停電的瞬間，UPS 會立刻接手供電，但它的電池只能撐幾分鐘。它的主要任務是爭取時間，讓發電機有時間啟動，並吸收電壓突波。
    
- **Transfer Switch (切換開關)：** 它是「指揮官」。負責偵測市電中斷，並自動將電源從市電切換到發電機，確保無縫接軌。
    
- **Generator (發電機) 與燃料 (Fuel)：** 它是「馬拉松選手」。通常需要幾十秒來啟動，但只要有燃料就能一直發電。
    
    - _Diesel (柴油)：_ 最常見，但放久了會變質（degrade），所以必須定期抽樣檢測和試運轉。
        
    - _LP Gas (液化石油氣/丙烷)：_ 不會像柴油那樣變質，但有較高的爆炸風險，且儲存槽受嚴格法規限制。
        

### 2. 環境控制與 ASHRAE 標準

伺服器非常嬌貴，太冷、太熱、太乾、太濕都不行。CCSP 常考 **ASHRAE (美國冷凍空調學會)** 的標準：

- **溫度 (Temperature)：** 建議範圍大約在 18°C 到 27°C (64.4°F - 80.6°F) 之間。
    
- **濕度 (Humidity)：** 建議維持在 40% 到 60% 之間。
    
    - ⚠️ **太乾 (Low Humidity)：** 如果空氣太乾燥，極容易產生**靜電釋放 (Static Discharge)**。就像冬天穿毛衣被電到一樣，微小的靜電就能瞬間擊穿昂貴的伺服器主機板！
        
    - ⚠️ **太濕 (High Humidity)：** 如果空氣太潮濕，金屬零件容易生鏽腐蝕，冷氣也容易產生**結露 (Condensation)** 滴水，導致短路。
        

💡 _有趣的小知識：以前資料中心都冷得像冰箱，但現在像 Google 這樣的雲端巨頭會稍微調高溫度以節省冷卻成本，只要控制在 ASHRAE 的容許範圍內即可！_

---
**情境測驗 1：** 某雲端服務供應商 (CSP) 的資料中心遭遇了突發性的市電中斷。不斷電系統 (UPS) 立刻接手供電，但過了三分鐘後，備用發電機卻因為**燃料存放過久產生變質**（degrade）而無法順利啟動，最終導致 UPS 電池耗盡，伺服器全面斷電。

**問題：** 根據上述情境，該發電機最可能使用的是哪種燃料？且在正常架構下，UPS 的「首要任務」應該是什麼？

- **A.** 液化石油氣 (LP Gas) / 確保資料中心冷卻系統能持續運作至少 48 小時。
    
- **B.** 柴油 (Diesel) / 在發電機啟動並穩定供電前的這段「空窗期」提供短期電力。
    
- **C.** 柴油 (Diesel) / 吸收電壓突波，並作為市電恢復前的長時間主要電力來源。
    
- **D.** 液化石油氣 (LP Gas) / 在發電機啟動前的空窗期提供短期電力。


ans ** B.** 柴油 (Diesel) / 在發電機啟動並穩定供電前的這段「空窗期」提供短期電力。

**柴油（Diesel）最容易產生質變（degrade）**，因此需要定期維護與循環測試；而 **UPS 的首要任務確實就是「爭取時間」**，彌補發電機啟動前的電力空窗期，而不是當作長期的電力來源。