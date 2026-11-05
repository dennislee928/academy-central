# CCSP 模擬測驗講義：Custom Test 2 弱點分析與補強

> **講義編號：** 03  
> **講義類型：** 弱點分析與補強計畫  
> **測驗來源：** ISC2 LearnZApp Custom Test（`zapp_2.zip`）  
> **證據：** 26 張 PNG（1 張成績總覽 + 25 張錯題回顧）  
> **測驗類型：** Custom Test，高度集中於弱域

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

**繁體中文：**

| 指標 | 數值 |
|---|---:|
| 總題數 | 50 |
| 答對 | 25 |
| 答錯 | 25 |
| 未作答 | 0 |
| 測驗分數 | 50% |
| 平均每題時間 | 34 秒 |
| Readiness Score | 45% → 42% |

### Domain-wise Performance from Result Screen

| Domain | Score | Correct / Total | Diagnosis |
|---|---:|---:|---|
| D1 — Cloud Concepts, Architecture and Design | 56% | 10 / 18 | Weak but recoverable |
| D2 — Cloud Data Security | 63% | 12 / 19 | Improved versus prior weak baseline, but still not stable |
| D6 — Legal, Risk and Compliance | 23% | 3 / 13 | Critical weakness |

Only D1, D2, and D6 appeared in the score summary. The test was therefore not a balanced CCSP mock. It was effectively a **targeted weak-domain stress test**.

**繁體中文：**

| Domain | 分數 | 答對／總數 | 診斷 |
|---|---:|---:|---|
| D1 — Cloud Concepts, Architecture and Design | 56% | 10 / 18 | 偏弱但可補救 |
| D2 — Cloud Data Security | 63% | 12 / 19 | 較先前弱項基準進步，但尚未穩定 |
| D6 — Legal, Risk and Compliance | 23% | 3 / 13 | 嚴重弱點 |

成績摘要只出現 D1、D2、D6，因此這不是均衡的 CCSP 模考，實質上是**針對弱域的壓力測試**。

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

**繁體中文：** 與前一次 Custom Test 的基準比較：

| Domain | 前次 Custom Test | 本次 Custom Test | 方向 |
|---|---:|---:|---|
| D1 | 69% | 56% | 下降 |
| D2 | 54% | 63% | 上升 |
| D6 | 55% | 23% | 大幅下降 |
| 整體 | 62% | 50% | 下降 |

### Interpretation

The score drop should not be interpreted as simple regression only. This test was much more concentrated in weak legal/compliance and conceptual edge cases.

However:

- **D2 shows visible improvement** from 54% to 63%.
- **D1 is not stable** under governance / architecture wording.
- **D6 is the dominant risk** and needs immediate repair.
- Average speed remains very fast at **34 seconds/question**, which likely contributes to keyword-driven errors.

**繁體中文：** 分數下降不應只解讀為退步，因為本次測驗更集中於弱項的法律／合規與概念邊界題。不過：

- **D2 明顯進步**，由 54% 升至 63%。
- **D1 在治理／架構用語下不穩定。**
- **D6 是最主要的風險**，需要立即修補。
- 平均速度仍很快，**每題 34 秒**，可能助長只看關鍵字的錯誤。

### Current Readiness Interpretation

| Area | Status |
|---|---|
| D2 patching | In progress, improving |
| D1 architecture / governance concepts | Borderline |
| D6 legal / audit / privacy vocabulary | Critical weakness |
| Mixed custom test stability | Not ready yet |
| Full mock readiness | Should pause until D6 is patched |

**繁體中文：**

| 領域 | 狀態 |
|---|---|
| D2 修補 | 進行中，持續改善 |
| D1 架構／治理概念 | 臨界 |
| D6 法律／稽核／隱私用語 | 嚴重弱點 |
| 混合 Custom Test 穩定度 | 尚未就緒 |
| 完整模考準備度 | 應暫停，待 D6 補強後再進行 |

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

**繁體中文：** 主要弱點不是單純的技術不懂，而是**分類（taxonomy）失誤**：

1. 標準 vs 報告
2. 法律原則 vs 法規權利
3. 生命週期階段 vs 控制機制
4. 雲端模型 vs 安全控制
5. Provider／vendor 風險 vs 客戶端技術控制
6. 歸檔資料可用性 vs 只想到加密
7. 隱私法用語與 OECD 原則

---

# 4. Wrong Question Analysis

The following list paraphrases the 25 incorrect review screenshots. It avoids copying full vendor text, but preserves the tested concept, selected mistake, correct concept, and patch rule.

**繁體中文：** 以下為 25 張錯題回顧截圖的改寫，未照抄原廠題目，但保留測驗概念、誤選原因、正確概念與修正規則。

---

## Q1. Internal Threat Countermeasures

| Item | Analysis |
|---|---|
| Domain | D1 |
| Wrong reasoning | Treated background checks as the exception |
| Correct concept | Hardened perimeter devices mainly reduce external attacks, not internal threats |
| Patch rule | **Internal threat controls = background checks, training, skills testing, monitoring. Perimeter hardening = external threat control.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D1 |
| 錯誤推理 | 把背景調查當成例外項 |
| 正確概念 | 強化邊界設備主要降低外部攻擊，不是內部威脅 |
| 修正規則 | **內部威脅控制 = 背景調查、訓練、技能測試、監控。邊界強化 = 外部威脅控制。** |

---

## Q2. ISO 31000 vs HIPAA / ISO 27017 / NIST 800-92

| Item | Analysis |
|---|---|
| Domain | D6 |
| Wrong reasoning | Selected NIST 800-92 |
| Correct concept | ISO 31000 is the risk management framework focused on design, implementation, and management |
| Patch rule | **ISO 31000 = risk management. ISO 27017 = cloud security controls. NIST 800-92 = log management. HIPAA = healthcare privacy.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D6 |
| 錯誤推理 | 選了 NIST 800-92 |
| 正確概念 | ISO 31000 是風險管理框架，著重設計、實施與管理 |
| 修正規則 | **ISO 31000 = 風險管理。ISO 27017 = 雲端安全控制。NIST 800-92 = 日誌管理。HIPAA = 醫療隱私。** |

---

## Q3. OECD Use Limitation Principle

| Item | Analysis |
|---|---|
| Domain | D6 |
| Wrong reasoning | Chose meaningless distractor principle |
| Correct concept | Use limitation principle restricts PII use to disclosed / permitted purposes |
| Patch rule | **OECD use limitation = collected PII may only be used for the stated purpose / permitted use.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D6 |
| 錯誤推理 | 選了沒有意義的干擾原則 |
| 正確概念 | Use limitation 原則將 PII 的使用限制在已揭露／獲允許的目的 |
| 修正規則 | **OECD use limitation = 蒐集的 PII 只能用於已聲明的目的或獲允許的用途。** |

---

## Q4. Long-Term Data Archiving Security Concern

| Item | Analysis |
|---|---|
| Domain | D2 |
| Wrong reasoning | Treated cryptographic-key retention as not a concern |
| Correct concept | Key retention, data format, and media are all archiving concerns; underground depth is not the core data-security concern |
| Patch rule | **Archive security = key availability + readable format + usable media. Physical depth is not the key concern.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D2 |
| 錯誤推理 | 認為金鑰保存不是問題 |
| 正確概念 | 金鑰保存、資料格式與媒體都是歸檔考量；埋在地下多深不是資料安全的核心 |
| 修正規則 | **歸檔安全 = 金鑰可用 + 格式可讀 + 媒體可用。實體深度不是重點。** |

---

## Q5. Cloud Secure Data Life Cycle Is Not Truly a Cycle

| Item | Analysis |
|---|---|
| Domain | D2 |
| Wrong reasoning | Focused on whether phases happen in cloud |
| Correct concept | Create → Store → Use → Share → Archive → Destroy is not truly cyclical because destroyed data does not loop back |
| Patch rule | **CSU-SAD ends at Destroy; the same data does not return to Create.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D2 |
| 錯誤推理 | 把焦點放在各階段是否發生於雲端 |
| 正確概念 | Create → Store → Use → Share → Archive → Destroy 並非真正循環，因為已銷毀的資料不會回到起點 |
| 修正規則 | **CSU-SAD 終止於 Destroy；同一份資料不會回到 Create。** |

---

## Q6. Data Labels

| Item | Analysis |
|---|---|
| Domain | D2 |
| Wrong reasoning | Treated confidentiality level as invalid label content |
| Correct concept | MFA is an authentication procedure, not a data label |
| Patch rule | **Data labels may include classification, distribution limits, access restrictions. MFA is an access-control process, not label metadata.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D2 |
| 錯誤推理 | 把機密等級當成無效的 label 內容 |
| 正確概念 | MFA 是驗證程序，不是資料 label |
| 修正規則 | **Data label 可包含分類、散布限制、存取限制。MFA 是存取控制流程，不是 label metadata。** |

---

## Q7. Why Use NIST SP 800-Series

| Item | Analysis |
|---|---|
| Domain | D1 |
| Wrong reasoning | Selected international acceptance |
| Correct concept | NIST publications are publicly available and cost-effective; they are not necessarily internationally mandated or easy |
| Patch rule | **NIST SP 800 = strong U.S. public-sector guidance, public-domain access; not primarily international acceptance.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D1 |
| 錯誤推理 | 選了國際接受度 |
| 正確概念 | NIST 出版品公開可取得且具成本效益；不一定受國際強制採用，也不一定容易 |
| 修正規則 | **NIST SP 800 = 有力的美國公部門指引、公有領域可取用；主要理由不是國際接受度。** |

---

## Q8. OECD Privacy Principles vs Right to Be Forgotten

| Item | Analysis |
|---|---|
| Domain | D6 |
| Wrong reasoning | Treated refusal to share as not OECD-related |
| Correct concept | Purge / right to be forgotten is GDPR-style, not one of the original OECD principles |
| Patch rule | **OECD principles include collection limitation, data quality, purpose specification, use limitation, security safeguards, openness, individual participation, accountability. Right to be forgotten = GDPR-era concept.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D6 |
| 錯誤推理 | 認為拒絕分享與 OECD 無關 |
| 正確概念 | Purge／被遺忘權屬 GDPR 式概念，不在原始 OECD 原則內 |
| 修正規則 | **OECD 原則包含 collection limitation、data quality、purpose specification、use limitation、security safeguards、openness、individual participation、accountability。被遺忘權 = GDPR 時代的概念。** |

---

## Q9. Patent Application Agency

| Item | Analysis |
|---|---|
| Domain | D2 / D6 IP |
| Wrong reasoning | Selected USDA |
| Correct concept | USPTO handles patent and trademark applications |
| Patch rule | **Patent / trademark application in U.S. = USPTO. USDA = agriculture. OSHA = workplace safety. SEC = securities/public companies.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D2／D6 IP |
| 錯誤推理 | 選了 USDA |
| 正確概念 | USPTO 受理專利與商標申請 |
| 修正規則 | **美國專利／商標申請 = USPTO。USDA = 農業。OSHA = 職場安全。SEC = 證券／上市公司。** |

---

## Q10. Cloud BC/DR Model

| Item | Analysis |
|---|---|
| Domain | D1 |
| Wrong reasoning | Misread normal cloud backup patterns |
| Correct concept | Cloud provider backed up by private provider is not a typical BC/DR model |
| Patch rule | **BC/DR cloud models usually involve private architecture + cloud backup, same-provider cloud backup, or another cloud provider. “Cloud provider backup from private provider” is not the normal pattern.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D1 |
| 錯誤推理 | 誤讀常見的雲端備份模式 |
| 正確概念 | 由 private provider 備份 cloud provider 不是典型 BC/DR 模型 |
| 修正規則 | **雲端 BC/DR 模型通常是 private 架構 + 雲端備份、同一 provider 的雲端備份，或另一家 cloud provider。「由 private provider 備份 cloud provider」不是常態。** |

---

## Q11. DMCA / Public Domain

| Item | Analysis |
|---|---|
| Domain | D6 / D2 IP |
| Wrong reasoning | Assumed permissions are required for very old content |
| Correct concept | Very old copyrighted material may have entered public domain |
| Patch rule | **Copyright expires; public-domain works can be used without seeking permission.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D6／D2 IP |
| 錯誤推理 | 假設非常古老的內容也需要授權 |
| 正確概念 | 非常古老的著作可能已進入公有領域 |
| 修正規則 | **著作權會到期；公有領域作品無須取得授權即可使用。** |

---

## Q12. Diffie-Hellman vs RSA

| Item | Analysis |
|---|---|
| Domain | D2 cryptography |
| Wrong reasoning | Chose RSA for session-key creation |
| Correct concept | Diffie-Hellman enables creation of a shared symmetric secret over an untrusted channel |
| Patch rule | **Diffie-Hellman = key exchange/shared secret. RSA = encryption/signature scheme.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D2 密碼學 |
| 錯誤推理 | 建立 session key 時選了 RSA |
| 正確概念 | Diffie-Hellman 可在不受信任的通道上建立共用對稱秘密 |
| 修正規則 | **Diffie-Hellman = 金鑰交換／共用秘密。RSA = 加密／簽章機制。** |

---

## Q13. Most Important Archiving Policy Element

| Item | Analysis |
|---|---|
| Domain | D2 |
| Wrong reasoning | Prioritized encryption over recoverability |
| Correct concept | Data format and type are most critical to archive usability and recovery |
| Patch rule | **Archive value depends on future recoverability. Wrong format can equal data loss.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D2 |
| 錯誤推理 | 把加密排在可復原性之前 |
| 正確概念 | 資料格式與類型對歸檔的可用性與復原最關鍵 |
| 修正規則 | **歸檔價值取決於未來可否復原。格式錯誤可能等同資料遺失。** |

---

## Q14. Escalation of Privilege Mitigation

| Item | Analysis |
|---|---|
| Domain | D1 / D3 |
| Wrong reasoning | Selected access control as exception |
| Correct concept | Cryptographic sanitization reduces data remanence risk, not privilege escalation |
| Patch rule | **Privilege escalation controls = access control, authentication, monitoring, log analysis, SIEM. Cryptographic sanitization = data remanence/destruction control.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D1／D3 |
| 錯誤推理 | 把 access control 當成例外項 |
| 正確概念 | Cryptographic sanitization 降低的是資料殘留風險，不是權限提升 |
| 修正規則 | **權限提升控制 = access control、驗證、監控、日誌分析、SIEM。Cryptographic sanitization = 資料殘留／銷毀控制。** |

---

## Q15. Privileged User Access

| Item | Analysis |
|---|---|
| Domain | D1 |
| Wrong reasoning | Selected granular |
| Correct concept | Privileged access should be temporary / time-bound |
| Patch rule | **Privileged access = just-in-time, temporary, least privilege, monitored.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D1 |
| 錯誤推理 | 選了 granular |
| 正確概念 | 特權存取應為暫時、有時間限制 |
| 修正規則 | **特權存取 = just-in-time、暫時、least privilege、受監控。** |

---

## Q16. Vendor M&A Risk

| Item | Analysis |
|---|---|
| Domain | D6 |
| Wrong reasoning | Selected an unrelated vendor-risk item |
| Correct concept | Pending acquisition or merger may lead to vendor lockout or service discontinuation |
| Patch rule | **Vendor acquisition/merger risk = service discontinuity / vendor lockout / contract instability.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D6 |
| 錯誤推理 | 選了不相關的 vendor 風險項目 |
| 正確概念 | 待完成的併購可能導致 vendor lockout 或服務終止 |
| 修正規則 | **Vendor 併購風險 = 服務中斷／vendor lockout／合約不穩定。** |

---

## Q17. OECD Data Quality Principle

| Item | Analysis |
|---|---|
| Domain | D6 |
| Wrong reasoning | Chose meaningless privacy-principle distractor |
| Correct concept | Data quality principle requires personal data to remain valid, accurate, and correctable |
| Patch rule | **OECD data quality = accurate, complete, current, and correctable.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D6 |
| 錯誤推理 | 選了沒有意義的隱私原則干擾項 |
| 正確概念 | Data quality 原則要求個資維持有效、正確且可更正 |
| 修正規則 | **OECD data quality = 正確、完整、最新且可更正。** |

---

## Q18. PaaS Data Storage Type

| Item | Analysis |
|---|---|
| Domain | D2 / D1 |
| Wrong reasoning | Did not map PaaS to provider-managed database services |
| Correct concept | PaaS commonly uses database storage administered by the provider but accessed by customer applications |
| Patch rule | **PaaS = customer builds/runs applications; provider manages platform and often database services.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D2／D1 |
| 錯誤推理 | 未把 PaaS 對應到 provider 管理的資料庫服務 |
| 正確概念 | PaaS 常用由 provider 管理、由客戶應用程式存取的資料庫儲存 |
| 修正規則 | **PaaS = 客戶建置／執行應用程式；provider 管理平台，通常也管理資料庫服務。** |

---

## Q19. Two-Person Integrity

| Item | Analysis |
|---|---|
| Domain | D1 / D5 |
| Wrong reasoning | Interpreted it as two IAM matrices |
| Correct concept | Two-person integrity forces collusion for unauthorized access |
| Patch rule | **Two-person integrity = no single person can perform sensitive action alone. It reduces insider risk by requiring collusion.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D1／D5 |
| 錯誤推理 | 解讀成兩套 IAM matrix |
| 正確概念 | Two-person integrity 迫使未授權存取必須共謀 |
| 修正規則 | **Two-person integrity = 任何單一人員都不能獨自執行敏感動作，藉由要求共謀降低內部人員風險。** |

---

## Q20. SaaS Model

| Item | Analysis |
|---|---|
| Domain | D1 |
| Wrong reasoning | Misidentified vendor-hosted application solution |
| Correct concept | SaaS provides an application running on provider/vendor infrastructure |
| Patch rule | **SaaS = use provider’s application. PaaS = build/deploy application. IaaS = manage OS/application/data over rented infrastructure.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D1 |
| 錯誤推理 | 誤判 vendor 代管的應用程式方案 |
| 正確概念 | SaaS 提供在 provider／vendor 基礎設施上執行的應用程式 |
| 修正規則 | **SaaS = 使用 provider 的應用程式。PaaS = 建置／部署應用程式。IaaS = 在租用基礎設施上管理 OS／應用程式／資料。** |

---

## Q21. CSA CCM Companion Tool

| Item | Analysis |
|---|---|
| Domain | D6 |
| Wrong reasoning | Selected NIST FIPS 140-2 |
| Correct concept | CAIQ is the CSA questionnaire used with CCM |
| Patch rule | **CSA CCM = control matrix. CAIQ = questionnaire. FIPS 140-2 = cryptographic module validation. OWASP Top 10 = web app risk list.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D6 |
| 錯誤推理 | 選了 NIST FIPS 140-2 |
| 正確概念 | CAIQ 是搭配 CCM 使用的 CSA 問卷 |
| 修正規則 | **CSA CCM = 控制矩陣。CAIQ = 問卷。FIPS 140-2 = 密碼模組驗證。OWASP Top 10 = Web 應用風險清單。** |

---

## Q22. ISO 27001 Technology Preference

| Item | Analysis |
|---|---|
| Domain | D1 / D6 |
| Wrong reasoning | Thought ISO 27001 favors a technology type |
| Correct concept | ISO 27001 is product/technology agnostic |
| Patch rule | **ISO 27001 = ISMS framework; it does not favor open source, PC, cloud, vendor, or product type.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D1／D6 |
| 錯誤推理 | 認為 ISO 27001 偏好某種技術 |
| 正確概念 | ISO 27001 不綁定產品或技術 |
| 修正規則 | **ISO 27001 = ISMS 框架；不偏好開源、PC、雲端、特定 vendor 或產品類型。** |

---

## Q23. EU Personal Data Transfer / Country Adequacy

| Item | Analysis |
|---|---|
| Domain | D6 |
| Wrong reasoning | Chose wrong country based on privacy-law adequacy |
| Correct concept in app item | The item treats South Korea as not conforming to EU-style privacy adequacy |
| Critical note | This item is legally time-sensitive and may be outdated. Current EU adequacy lists include the Republic of Korea. |
| Patch rule | **For exam prep: identify adequacy / cross-border transfer logic. For real-world facts: verify current official adequacy lists.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D6 |
| 錯誤推理 | 依隱私法 adequacy 選錯國家 |
| App 題目的正確概念 | 該題將南韓視為不符合 EU 式隱私 adequacy |
| 重要註記 | 此題有法律時效性，可能已過時；現行 EU adequacy 清單包含大韓民國 |
| 修正規則 | **備考：掌握 adequacy／跨境傳輸的判斷邏輯。實務事實：查證現行官方 adequacy 清單。** |

---

## Q24. Cloud Feature That Supports Audit

| Item | Analysis |
|---|---|
| Domain | D6 |
| Wrong reasoning | Selected a generic cloud feature |
| Correct concept | Ubiquitous baseline configuration in virtualized environments supports auditability |
| Patch rule | **Audit support = standardized baseline, configuration evidence, repeatability, versioned artifacts.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D6 |
| 錯誤推理 | 選了泛泛的雲端特性 |
| 正確概念 | 虛擬化環境中普遍一致的 baseline 組態有助於稽核 |
| 修正規則 | **稽核支援 = 標準化 baseline、組態證據、可重複性、版本化產出物。** |

---

## Q25. Transparent Database Encryption Engine

| Item | Analysis |
|---|---|
| Domain | D2 |
| Wrong reasoning | Placed engine outside the DB |
| Correct concept | Transparent database encryption engine resides in the database/DBMS layer |
| Patch rule | **TDE = database-level transparent encryption. KMS manages keys; HSM protects keys; neither is the TDE engine.** |

**繁體中文：**

| 項目 | 分析 |
|---|---|
| Domain | D2 |
| 錯誤推理 | 把引擎放在資料庫之外 |
| 正確概念 | Transparent database encryption 引擎位於資料庫／DBMS 層 |
| 修正規則 | **TDE = 資料庫層級的透明加密。KMS 管理金鑰；HSM 保護金鑰；兩者都不是 TDE 引擎。** |

---

# 5. Weakness Clusters

## Cluster A — D6 Legal / Privacy / Audit Taxonomy

### Symptoms

- OECD principles confused with GDPR rights.
- ISO, NIST, SOC, CSA, FIPS are mixed together.
- Vendor management and audit artifacts are not classified correctly.
- Legal facts are treated like memorized trivia rather than taxonomy.

**繁體中文：**

- 把 OECD 原則與 GDPR 權利混淆。
- ISO、NIST、SOC、CSA、FIPS 混在一起。
- Vendor 管理與稽核產出物分類不正確。
- 把法律事實當成零碎記憶，而不是分類體系。

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

**繁體中文：**

| 概念 | 必須知道 |
|---|---|
| ISO 31000 | 風險管理 |
| ISO 27001 | ISMS；不綁定技術 |
| ISO 27017 | 雲端安全控制 |
| NIST 800-92 | 日誌管理 |
| CSA CCM | Cloud Controls Matrix |
| CAIQ | CSA 問卷 |
| SOC 1/2/3 | 報告 |
| SSAE 18 | Attestation 標準 |
| FIPS 140-2 | 密碼模組驗證 |
| OECD Use Limitation | 只用於已聲明或獲允許的目的 |
| OECD Data Quality | 正確、完整、最新、可更正 |

### Patch

Daily for 3 days:

- 15 minutes: legal/audit taxonomy table
- 10 minutes: OECD principles
- 10 minutes: CSA / SOC / ISO / NIST drill
- 15 questions D6 drill

Gate:

- D6 mini-test >= 75%
- No confusion between `standard`, `report`, `questionnaire`, `control matrix`, and `law`

**繁體中文：** 連續 3 天，每天：

- 15 分鐘：法律／稽核分類表
- 10 分鐘：OECD 原則
- 10 分鐘：CSA／SOC／ISO／NIST 演練
- 15 題 D6 drill

門檻：

- D6 mini-test >= 75%
- 不再混淆 `standard`、`report`、`questionnaire`、`control matrix` 與 `law`

---

## Cluster B — D2 Data Lifecycle / Archiving / Cryptography

### Symptoms

- Encryption is over-selected even when recoverability is the real issue.
- Data labels are confused with access procedures.
- TDE/KMS/HSM roles are not fully separated.
- PaaS storage model and data lifecycle phases need reinforcement.

**繁體中文：**

- 即使真正問題是可復原性，仍過度選擇加密。
- 把 data label 與存取程序混淆。
- TDE／KMS／HSM 的角色尚未完全分清。
- PaaS 儲存模型與資料生命週期階段需要加強。

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

**繁體中文：**

| 概念 | 必須知道 |
|---|---|
| Archive policy | 格式／類型與可復原性最重要 |
| 長期歸檔 | 金鑰、格式與媒體都必須維持可用 |
| Data label | 分類／存取／散布 metadata |
| MFA | 驗證程序，不是 label |
| TDE | DB／DBMS 加密引擎 |
| KMS | 金鑰生命週期管理 |
| HSM | 硬體金鑰保護 |
| Diffie-Hellman | 金鑰交換 |
| RSA | 加密／簽章 |
| CSU-SAD | Create、Store、Use、Share、Archive、Destroy |

### Patch

Daily for 3 days:

- 15 minutes: lifecycle table
- 15 minutes: TDE/KMS/HSM/DH/RSA
- 15 minutes: archive and label scenario drill
- 15 questions D2 drill

Gate:

- D2 mini-test >= 80%
- Can explain archive recoverability vs encryption

**繁體中文：** 連續 3 天，每天：

- 15 分鐘：生命週期表
- 15 分鐘：TDE／KMS／HSM／DH／RSA
- 15 分鐘：歸檔與 label 情境演練
- 15 題 D2 drill

門檻：

- D2 mini-test >= 80%
- 能說明歸檔可復原性 vs 加密

---

## Cluster C — D1 Cloud Models / Governance Controls

### Symptoms

- SaaS/PaaS/IaaS mapping is not always automatic.
- NIST / ISO framework purpose is confused.
- Internal vs external threat controls are mixed.
- Privilege-management controls are mixed with unrelated data controls.

**繁體中文：**

- SaaS／PaaS／IaaS 的對應尚未完全自動化。
- 混淆 NIST／ISO 框架的用途。
- 內部與外部威脅控制混在一起。
- 特權管理控制與不相關的資料控制混在一起。

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

**繁體中文：**

| 概念 | 必須知道 |
|---|---|
| SaaS | 使用 provider 的應用程式 |
| PaaS | 在 provider 平台上建置／執行應用程式 |
| IaaS | 客戶管理 OS／應用程式／資料 |
| NIST SP 800 | 公有領域的美國指引 |
| ISO 31000 | 風險管理 |
| Two-person integrity | 需要共謀 |
| 特權存取 | 暫時／just-in-time |
| 邊界強化 | 外部攻擊控制 |
| 背景調查／訓練 | 降低內部威脅 |

### Patch

Daily for 3 days:

- 10 minutes: SaaS/PaaS/IaaS contrast
- 10 minutes: threat-control mapping
- 10 minutes: privileged access / two-person integrity
- 15 questions D1 drill

Gate:

- D1 mini-test >= 75–80%
- Can separate cloud model, framework, and control category

**繁體中文：** 連續 3 天，每天：

- 10 分鐘：SaaS／PaaS／IaaS 對照
- 10 分鐘：威脅與控制對應
- 10 分鐘：特權存取／two-person integrity
- 15 題 D1 drill

門檻：

- D1 mini-test >= 75–80%
- 能區分雲端模型、框架與控制類別

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

**繁體中文：** 不看資料回答：

1. ISO 31000 用於什麼？
2. NIST 800-92 用於什麼？
3. CSA CCM 與 CAIQ 差在哪？
4. SSAE 18 與 SOC 報告差在哪？
5. OECD use limitation 是什麼意思？
6. TDE 引擎位於何處？
7. MFA 屬於 data label 還是驗證？
8. Diffie-Hellman 做什麼？
9. SaaS 與 PaaS 的差異？
10. Two-person integrity 降低什麼風險？

門檻：8/10 正確可繼續 drill；6–7/10 重做弱項 cluster；<=5/10 隔天不做模考。

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

**繁體中文：** 達到以下目標之前，不恢復完整混合模考：

| 條件 | 目標 |
|---|---:|
| D1 mini-test | >=75% |
| D2 mini-test | >=80% |
| D6 mini-test | >=75% |
| D1／D2／D6 混合 mini-test | >=75% |
| 平均時間 | 每題 45–75 秒 |

目前每題 34 秒對法律／稽核用語來說太快，D6 與長情境題要放慢。

---

# 9. Final Diagnosis

This Custom Test is not evidence that the full preparation plan has failed. It shows that the known weak domains are still fragile when tested directly.

**繁體中文：** 這次 Custom Test 不代表整體準備計畫失敗，而是顯示已知弱域在直接測試下仍然脆弱。

## Progress Exists

- D2 improved compared with the prior custom-test weak-domain score.
- Wrong questions are no longer random; they cluster around identifiable taxonomies.
- The patch path is clear.

**繁體中文：**

- D2 較先前 Custom Test 的弱域分數進步。
- 錯題不再隨機，而是集中在可辨識的分類體系。
- 修補路徑明確。

## Risk Remains

- D6 legal/audit/privacy remains below safe level.
- D1 framework/control mapping is unstable.
- D2 archiving and crypto-role boundaries still need consolidation.

**繁體中文：**

- D6 法律／稽核／隱私仍低於安全水準。
- D1 框架與控制的對應不穩定。
- D2 歸檔與密碼學角色邊界仍需鞏固。

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

---
CCSP 非常喜歡考這四個等級的「關鍵字對應」。可以把它想像成資料中心的「裝甲等級」，等級越高、砸的錢越多，系統就越不容易因為單一故障或例行維護而斷線。

| **等級**       | **核心概念 (Exam Keyword)**               | **備援架構** | **電力與冷卻迴路** | **停機維護影響**                  |
| ------------ | ------------------------------------- | -------- | ----------- | --------------------------- |
| **Tier I**   | Basic Capacity (基本容量)                 | N (無備援)  | 單一迴路        | 遇到維護或故障，**一定會斷線**。          |
| **Tier II**  | Redundant Components (備援元件)           | N+1      | 單一迴路        | 設備有備胎，但迴路只有一條。維護時**仍可能斷線**。 |
| **Tier III** | **Concurrently Maintainable** (可並行維護) | N+1      | 多條迴路 (一條活躍) | **可以在不中斷系統的情況下進行維護**。       |
| **Tier IV**  | **Fault Tolerant** (完全容錯)             | 2(N+1)   | 多條迴路 (同時活躍) |                             |
考題最常考的辨識點是：只要題目提到 **"maintenance without downtime" (維護不停機)**，答案就是 **Tier III**；如果提到 **"survive a single failure" (承受單一故障)** 或 **"Fault Tolerant"**，答案就是 **Tier IV**。

**情境測驗 2：** 某企業正在規劃將部分關鍵業務遷移至某雲端服務供應商 (CSP)。業務單位的要求（Business Requirement）是：「我們必須能夠在進行任何例行性的基礎設施維護（如更換冷卻系統或進行電力迴路保養）時，系統依然保持在線且不中斷服務。然而，我們的預算有限，無法負擔防禦『任何單一不可預期之嚴重設備故障』的最高級別架構。」

**問題：** 根據上述業務要求與預算限制，應在服務層級協議 (SLA) 中要求該 CSP 至少達到 Uptime Institute 的哪一個等級？

- **A.** Tier I (Basic Capacity)

- **B.** Tier II (Redundant Components)

- **C.** Tier III (Concurrently Maintainable)

- **D.** Tier IV (Fault Tolerant)

作答時應同時寫出解答與判斷邏輯。

C. Tier III (Concurrently Maintainable) - 
1.能夠在進行任何例行性的基礎設施維護
2.系統依然保持在線且不中斷服務(比單純n+1B. Tier II (Redundant Components)更符合）
3.法負擔防禦『任何單一不可預期之嚴重設備故障』的最高級別架構->無法負擔2(n+1) D. Tier IV (Fault Tolerant)

考題設計的陷阱：

1. **Tier III 的靈魂**就是「Concurrently Maintainable（可並行維護）」，也就是維護不停機。

2. 也不應被誘導去選最高級的 Tier IV，因為題目明確限制了預算，且不需要「容錯 (Fault Tolerant，防禦單一突發故障)」。 這種「根據業務需求 (Business Requirements) 選擇最適當的控制措施 (Controls)，而不是盲目選擇最貴的」，正是 CCSP 考試最核心的考點精神！
---
### A. 外部連線韌性 (External Connectivity)

資料中心必須確保對外網路不會因為「怪手挖斷馬路邊的電纜」就全面癱瘓。CCSP 常考的兩個關鍵字是：

- **Multiple Carriers (多間電信服務商)：** 不要把雞蛋放在同一個 ISP 籃子裡。

- **Diverse Routing (多樣化路由/實體路徑分離)：** 這非常重要！即使採購了兩家電信的線路，如果它們的實體光纖都埋在「同一條地下管道」裡，怪手一挖還是會同時斷線。因此，實體線路必須從建築物的不同方向（例如東門和西門）進入資料中心。

### B. BC/DR 執行四大階段 (BC/DR Execution)

當真正的災難（例如地震、火災）發生時，應變是有嚴格順序的。請記住這四個 "R" 的順序：

1. **Respond (應變/反應)：** 災難發生的當下。🚨 **最高指導原則：保護人員生命安全 (Human safety first)！** 接著才是評估損害程度、宣告災難發生。

2. **Recover (復原)：** 在備援站點 (Alternate site / DR site) 將「最關鍵的業務系統」啟動，讓公司能繼續做生意。這時候主要站點還是壞的。

3. **Restore (還原)：** 災後重建。派人回到「原本的主要站點 (Primary site)」去修復硬體、清理積水、重新安裝設備。

4. **Resume (恢復/復歸)：** 主要站點修好後，將業務從備援站點「切換回 (Failback)」主要站點，全面恢復正常營運。
**情境測驗 3：** 某個位於地震帶的雲端資料中心遭遇了規模 7.0 的強震。建築物部分受損，市電完全中斷，且兩家不同電信商的外部網路線路也因為橋樑斷裂而同時中斷。災難應變小組 (Incident Response Team) 剛剛抵達現場。

**問題：** 根據 BC/DR（業務連續性與災難復原）的最佳實踐原則，該小組抵達現場後的「第一優先行動」應該是什麼？另外，當未來這座主要資料中心完全修復後，將業務從備援站點「切換回 (Failback)」主要站點的過程，屬於哪一個執行階段？

- **A.** 立即評估硬體設備的受損程度 (Assess damage) / 屬於 Restore (還原) 階段

- **B.** 確保現場所有人員的生命安全 (Ensure human safety) / 屬於 Resume (恢復/復歸) 階段

- **C.** 立刻將關鍵業務系統切換至備援站點 (Failover) / 屬於 Recover (復原) 階段

- **D.** 確保現場人員安全 (Ensure human safety) / 屬於 Restore (還原) 階段

B. 確保現場所有人員的生命安全 (Ensure human safety) / 屬於 Resume (恢復/復歸) 階段

p0永遠是保護人命![[]]，![[]]p1是恢復resume (恢復/復歸) 階段,接著才是restore-> 恢復提供服務

推論邏輯做一個非常關鍵的「微調」，這在考試中很容易變成陷阱：常見的說法是「先 Resume，接著才是 Restore」，**但這兩個階段的實際順序恰好相反。**

再複習一次災難發生後的時間軸（4 個 R）：

1. **Respond (應變)：** 疏散人群、保護人命、評估災情。

2. **Recover (復原)：** 在「備援站點 (DR site)」把關鍵系統開起來，先讓公司能繼續運作 (Failover)。

3. **Restore (還原)：** 派工程師回到災區的「主要站點」，把毀損的建築物修好、伺服器換新（**先修復場地**）。

4. **Resume (復歸)：** 主要站點修好後，把系統從備援站點「切換回家 (Failback)」，全面恢復正常營運（**最後才回家**）。

所以是先 **Restore (把家修好)**，然後才能 **Resume (搬回家)**。

---

## 繁體中文版 / Traditional Chinese Version

本文件是 Custom Test 2 的弱點分析與補強計畫。各英文段落後方已附繁體中文；以下為全文整理，含未逐段附譯的部分。

- **成績：** 50 題答對 25 題（50%），每題平均 34 秒。D1 56%、D2 63%、D6 23%，屬針對弱域的壓力測試。
- **進步評估（§2）：** 有部分進步，但尚未全面穩定；D2 進步，D1 與 D6 下滑。
- **核心弱點（§3）：** 分類失誤，例如標準 vs 報告、法律原則 vs 法規權利、生命週期階段 vs 控制機制。
- **錯題分析（§4）：** Q1–Q25 逐題記錄錯誤推理、正確概念與修正規則。
- **弱點群（§5）：** A = D6 法律／隱私／稽核分類；B = D2 生命週期／歸檔／密碼學；C = D1 雲端模型／治理控制。
- **一小時修補（§6）：** 先分三欄（D6、D2、D1 各自的主題），再依序背誦 D6、D2、D1 對照表，每段做 5 題，最後 10 題口試：8/10 繼續 drill；6–7/10 重做弱項；<=5/10 隔天不模考。
- **三天計畫（§7）：** Day 1 D6（30 分鐘分類、20 題、10 題錯題檢討、5 條一句話規則）；Day 2 D2（同樣配置）；Day 3 D1 模型與控制對應，加 20 題 D1／D2／D6 混合題，門檻 >= 75%。
- **恢復模考條件（§8）：** D1、D6 >= 75%，D2 >= 80%，混合 >= 75%，每題 45–75 秒。
- **最終診斷（§9）：** 先補 D6 分類、D2 生命週期／密碼學／歸檔、D1 雲端模型／控制，混合 mini-test 達 75% 後才恢復完整模考。
- **檔尾補充（已是中文）：** 弱域優先序表、電力系統與 ASHRAE、Uptime Tier I–IV、外部連線韌性、BC/DR 的 Respond → Recover → Restore → Resume 順序，以及情境測驗。
