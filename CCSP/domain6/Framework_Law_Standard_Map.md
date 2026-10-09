# CCSP Domain 6：Framework / Law / Standard Map

> **用途：** 看到一個名稱，兩秒內知道**它屬於哪一類**。這是「名稱 → 類別」的歸位地圖，不是逐條細節表。
> **為什麼需要：** D6 最常見的題型是「下列哪個 framework 專注於 X？」然後把法律、風險框架、雲端控制指引、日誌管理指南混在同四個選項裡。能歸位就能秒答。
>
> **與其他檔案的分工：**
>
> | 檔案 | 切法 |
> |---|---|
> | **本檔** | 按**「它是什麼東西」**歸位：法律／風險治理／ISMS 控制／維運鑑識／雲端／稽核 |
> | [`../domain6-legal-framework-reference.md`](../domain6-legal-framework-reference.md) | 按**地區與類別分區**（A 美國／B EU／C 加拿大／D 印度／E 其他國家／F ISO／G NIST…）＋ Legacy 陷阱表 ＋ trigger 索引 |
> | [`../simulate-test/domain6-legal-compliance/01-consolidated-lecture.md`](../simulate-test/domain6-legal-compliance/01-consolidated-lecture.md) | 完整推導、錯題脈絡與邊界討論 |
>
> 同資料夾另有 `01-core-concepts.md`、`02-full-notes.md`、`03-blindspots-errors.md`（概念型講義）。

---

## 一頁式總覽

```text
LAW / REGULATION
├─ HIPAA → Healthcare
├─ HITECH → EHR / Breach
├─ GLBA → Finance
├─ FERPA → Education
├─ COPPA → Children
├─ SOX → Financial reporting
├─ FISMA → US Federal Security
├─ GDPR → EU Privacy
├─ UK GDPR + DPA 2018 → UK Privacy
├─ Argentina Law 25.326 → Personal Data（comprehensive）
├─ Singapore PDPA → Personal Data
├─ India DPDP 2023 → Personal Data
└─ Brazil LGPD / Japan APPI / China PIPL → Personal Data

RISK / GOVERNANCE
├─ ISO 31000 → General Risk Management
├─ NIST SP 800-37 → RMF
├─ COBIT → IT Governance
└─ COSO → Enterprise Risk / Internal Control

ISMS / SECURITY CONTROLS
├─ ISO 27001 → ISMS Requirements（可認證）
├─ ISO 27002 → Control Guidance
├─ ISO 27017 → Cloud Controls
├─ ISO 27018 → Public Cloud PII
├─ NIST 800-53 → Controls
└─ NIST 800-53A → Control Assessment

OPERATIONS / FORENSICS
├─ NIST 800-92 → Log Management
├─ NIST 800-88 → Media Sanitization
├─ ISO 27036 → Supplier / Supply Chain
├─ ISO 27037 → Evidence Collection
├─ ISO 27041 → Forensic Method Assurance
├─ ISO 27042 → Evidence Analysis
├─ ISO 27043 → Incident Investigation
└─ ISO 27050 → eDiscovery

CLOUD
├─ CSA CCM → Controls
├─ CAIQ → Questionnaire
├─ STAR → Assurance（L1 自評 / L2 第三方 / L3 持續）
├─ FedRAMP → US Federal Cloud Authorization
└─ ISO 27017 → Cloud Security

AUDIT / ATTESTATION
├─ SSAE 18 → Auditor Attestation Standard
├─ SOC 1 → Financial Reporting Controls
├─ SOC 2 → Trust Services
├─ SOC 3 → General-use Report
├─ Type 1 → Point-in-time Design
└─ Type 2 → Operating Effectiveness over Period
```

---

## A. 法律／法規（Law / Regulation）

| 名稱 | 中文定位 | 看到什麼就想到 |
|---|---|---|
| **HIPAA** | 美國醫療資訊相關聯邦法律 | PHI／ePHI／Healthcare |
| **HITECH** | 強化電子醫療與 HIPAA 的美國法律 | Breach／EHR／HIPAA enforcement |
| **GLBA** | 美國金融隱私法律 | Financial institutions／NPI |
| **FERPA** | 美國學生教育紀錄隱私法律 | Student records |
| **COPPA** | 美國兒童線上隱私保護法律 | Children／兒童個資 |
| **SOX** | 美國上市公司財務報告／內部控制法律 | Financial reporting／internal controls |
| **FISMA** | 美國聯邦資訊安全法律 | Federal information security |
| **GDPR** | 歐盟一般資料保護規則 | EU personal data |
| **UK GDPR ＋ DPA 2018** | 英國資料保護制度 | UK personal data |
| **Argentina Law 25.326** | **阿根廷全面性個人資料保護法** | **Argentina／personal data** |
| **Singapore PDPA** | 新加坡個人資料保護法 | Singapore personal data |
| **India DPDP Act 2023** | 印度數位個人資料保護法 | India personal data |
| **Brazil LGPD** | 巴西一般資料保護法 | Brazil personal data |
| **Japan APPI** | 日本個人資訊保護法 | Japan personal data |
| **China PIPL** | 中國個人信息保護法 | China personal data |

### ⭐ Argentina 有 comprehensive personal-data law

```text
Argentina → Law 25.326 → comprehensive personal-data protection law
```

《個人資料保護法第 25.326 號》（Ley 25.326 de Protección de los Datos Personales）第 1 條明示其目的是對**公共或私人資料庫、登錄、資料檔案及其他個人資料處理媒介**中的個人資料提供**整體（integral）保護**，並保障隱私、名譽與個人對自己資料的存取權（[阿根廷政府法規頁](https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790/texto)）。

> **絕對不要記成「Argentina 沒有 comprehensive privacy law」。**

### ⭐ 美國不是「完全沒有 privacy law」

```text
US = sectoral federal + state patchwork
```

沒有單一、全面、一般適用於私人部門的**聯邦**個資法，但有大量 sector-specific 法律，加上州級 comprehensive privacy laws：

```text
Healthcare → HIPAA
Financial  → GLBA
Education  → FERPA
Children   → COPPA
＋ 州級 comprehensive privacy laws
```

截至 2026，美國已有大量州級 comprehensive privacy laws，聯邦層級仍持續有統一隱私法提案但尚未形成單一全面性聯邦法（[IAPP](https://iapp.org/news/a/what-increasing-privacy-enforcement-activity-means-for-us-privacy-legislation)）。

> **錯誤理解：** `United States has no privacy laws.`

### 各國隱私法速答

```text
EU        → GDPR（comprehensive regional regime）
Argentina → Law 25.326（comprehensive national law）
Singapore → PDPA（national personal-data law）
India     → DPDP Act 2023
US        → sectoral federal + state patchwork（無單一全面性聯邦私部門法）
```

---

## B. 風險／治理框架（Risk / Governance）

| 名稱 | 中文定位 | 秒答 |
|---|---|---|
| **ISO 31000** | 通用風險管理指南 | Enterprise Risk |
| **NIST SP 800-37** | NIST 風險管理框架 | RMF |
| **COBIT** | 企業 IT 治理與管理框架 | IT Governance |
| **COSO** | 企業風險／內部控制框架 | ERM／Internal Control |

### ISO 31000 的範圍

> **通用風險管理的原則、框架與流程指南。**

可用於 identification、analysis、evaluation、treatment、monitoring、communication。

**它不是：** cloud-only、cybersecurity-only、certification standard。現行版本為 **ISO 31000:2018**（[ISO](https://www.iso.org/standard/31000)）。

```text
ISO 31000 = Risk Management
```

---

## C. ISMS／資安控制（Security Controls）

| 標準 | 中文定位 | 秒答 |
|---|---|---|
| **ISO/IEC 27001** | ISMS 要求，可認證 | Requirements／Certification |
| **ISO/IEC 27002** | 資安控制實作指引 | Controls Guidance |
| **ISO/IEC 27017** | 雲端安全控制指引 | Cloud Security |
| **ISO/IEC 27018** | 公有雲個資處理保護 | Public Cloud PII |
| **NIST SP 800-53** | 安全與隱私控制目錄 | Controls |
| **NIST SP 800-53A** | 控制評估方法 | Assess Controls |

### ISO/IEC 27017 的定位

現行為 **ISO/IEC 27017:2026**。它**建立在 ISO/IEC 27002 之上**，增加 cloud-specific security guidance／controls，明確適用 **CSP、CSC、public／private／hybrid cloud**（[ISO](https://www.iso.org/standard/27017)）。

```text
27017 = Cloud
```

---

## D. 維運／鑑識（Operations / Forensics）

| NIST／ISO | 中文定位 | 秒答 |
|---|---|---|
| **NIST SP 800-92** | **電腦／資安日誌管理指南** | **Logs** |
| **NIST SP 800-88** | 媒體清除／銷毀指南 | Sanitization |
| **ISO/IEC 27036** | 供應商／供應鏈安全 | Supplier Security |
| **ISO/IEC 27037** | 數位證據識別、蒐集、取得、保存 | Forensic Collection |
| **ISO/IEC 27041** | 鑑識方法適切性／可信度 | Investigation Assurance |
| **ISO/IEC 27042** | 數位證據分析與解釋 | Analysis |
| **ISO/IEC 27043** | 事件調查流程 | Investigation |
| **ISO/IEC 27050** | 電子證據開示 | eDiscovery |

### ⭐ NIST SP 800-92 = Logs，不是 risk framework

主題是 **Guide to Computer Security Log Management**，涵蓋 log generation、transmission、storage、analysis、disposal 與 log management infrastructure（[NIST](https://www.nist.gov/publications/guide-computer-security-log-management)）。

```text
800-92 = Logs
```

> NIST 另在發展 **SP 800-92 Revision 1**（聚焦組織層級的資安日誌管理規劃），但舊題庫最常見的仍是原始版（[NIST CSRC](https://csrc.nist.gov/Projects/log-management)）。

### 其他 NIST／FIPS

| 名稱 | 秒答 |
|---|---|
| **FIPS 199** | Categorization（系統／資訊安全分類） |
| **FIPS 200** | Minimum Requirements（聯邦最低安全要求） |
| **FIPS 140-3** | Crypto Modules（密碼模組安全驗證） |

---

## E. 雲端（Cloud）

| 名稱 | 中文定位 | 秒答 |
|---|---|---|
| **CSA CCM** | 雲端控制矩陣 | Controls |
| **CAIQ** | 雲端控制問卷 | Questions |
| **CSA STAR** | 雲端保證／登錄計畫 | Assurance |
| **FedRAMP** | 美國聯邦雲端安全評估與授權 | Federal Cloud |
| **ISO/IEC 27017** | 雲端安全控制 | Cloud Controls |

```text
CCM  = Controls
CAIQ = Questions
STAR = Assurance
       ├─ Level 1 → 自我評估
       ├─ Level 2 → 第三方保證
       └─ Level 3 → 持續監控／持續稽核   （沒有 Level 4）
```

---

## F. 稽核／鑑證（Audit / Attestation）

| 名稱 | 中文定位 | 秒答 |
|---|---|---|
| **SSAE 18** | 鑑證業務標準 | Auditor rules（規範 auditor，不是 report） |
| **SOC 1** | 財務報告相關控制 | Financial Reporting |
| **SOC 2** | Trust Services Criteria | Security／Availability／Processing Integrity／Confidentiality／Privacy |
| **SOC 3** | 一般用途公開報告 | Public-facing |
| **Type 1** | 某時間點的控制**設計** | Point in time |
| **Type 2** | 一段期間控制**運作有效性** | Operating effectiveness |

---

## G. 跨境資料傳輸（Cross-border Transfer）

| 機制 | 中文 |
|---|---|
| **SCC** | 標準契約條款（Standard Contractual Clauses） |
| **BCR** | 約束性公司規則（Binding Corporate Rules） |
| **Adequacy Decision** | 充分性認定 |
| **EU-U.S. DPF** | EU-U.S. Data Privacy Framework |
| Privacy Shield | **Legacy／invalidated** —— 不可當現行制度 |

---

## H. 支付／產業標準（Payment / Industry）

**PCI DSS** —— 支付卡產業資料安全標準，**不是法律**。

- **Trigger：** PAN、cardholder data、CDE
- **Merchant tier：** 主要影響 **compliance validation／reporting requirements 與驗證嚴謹程度**，**不是**不同 tier 使用不同控制集合

---

## ⭐ 版本與易錯提醒

| 題庫可能出 | 現行 |
|---|---|
| ISO 31000:**2009** | **2018** |
| ISO 27017:**2015** | **2026** |
| ISO 27018:**2019** | **2025** |
| FIPS **140-2** | **140-3** |
| **SAS 70** | legacy → 後繼 **SOC 1** |
| **Privacy Shield** | invalidated → **EU-U.S. DPF** |

---

## ⭐ 四選一實戰範例

題目：`Which framework focuses specifically on design, implementation and management?`

| 選項 | 歸位 | 判定 |
|---|---|---|
| **ISO 31000:2009** | 風險／治理 → 通用風險管理 | ✅ 概念正確，但**版本 legacy**（現行 2018） |
| HIPAA | 法律 → 美國醫療 | ❌ 是法律，不是 framework |
| ISO/IEC 27017 | 雲端 → 雲端安全控制指引 | ❌ 範圍是 cloud controls |
| NIST SP 800-92 | 維運 → **日誌管理** | ❌ **不是 risk framework** |

> 這題考的不是細節，而是**能不能把 framework 名稱 mapping 到類別**。分類 `[T] 術語邊界`。

---

## 本頁最該固定的五條

```text
ISO 31000      = Risk Management
NIST 800-92    = Logs
ISO 27017      = Cloud Security
HIPAA          = Healthcare（法律，不是 framework）
Argentina      = Law 25.326 = comprehensive personal-data protection
```
