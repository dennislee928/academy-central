# CCSP Assessment Test Review / 錯題複習講義

> **Test Source / 題庫來源:** ISC2 CCSP LearnZapp — Assessment Test (30 questions)  
> **Score / 得分:** 20/30 (66%)  
> **Focus / 範圍:** Wrong-question concept correction only

---

## 1. Test Overview / 測驗概覽

| Metric | Value | Note |
|---|---|---|
| Total Questions | 30 | Small sample size — serves as a weakness probe |
| Correct | 20 | Foundation exists but mixed assessment is unstable |
| Incorrect | 10 | Concentrated in D1 / D2 / D6 boundary concepts |
| Score | 66% | Below the formal mock-exam safety threshold |
| Avg Time | 31s / question | Speed is not the issue — risk is rapid pattern-matching |

---

## 2. Domain Performance / 領域表現

| Domain | Score | Key Finding |
|---|---|---|
| D1: Cloud Concepts, Architecture & Design | 60% | Cloud models, cloud roles, IaaS business value need reinforcement |
| D2: Cloud Data Security | 50% | Encryption, key management, data disposal, TDE/HSM/DRM boundaries unstable |
| D3: Cloud Platform & Infrastructure Security | 75% | Acceptable — not a primary concern |
| D4: Cloud Application Security | 100% | Good, but only 4 sampled questions |
| D5: Cloud Security Operations | 100% | Good, but only 2 sampled questions |
| D6: Legal, Risk & Compliance | 50% | Regulation, audit standards, compliance terminology need reinforcement |

---

## 3. Wrong-Question Summary / 錯題總表

| # | Topic | Mistake | Correct Concept | Error Category |
|---|---|---|---|---|
| 1 | GLBA vs PCI | Chose PCI as financial privacy law | GLBA is the U.S. federal law protecting customer financial information | Regulation name confusion |
| 2 | Public cloud definition | Confused with private cloud | Open use by the general public, owned/managed by provider = public cloud | Cloud model definition |
| 3 | Cloud data disposal | Chose degaussing | Encryption / crypto-erasure is more universally feasible in cloud; physical destruction, overwriting, degaussing may not be | Cloud data disposal |
| 4 | SSAE 18 / SOC 1 / SOC 2 | Chose SOC 2 as audit standard | SSAE 18 is the attestation standard; SOC 1/2 are report types | Audit terminology |
| 5 | IaaS primary benefit | Chose energy/cooling efficiency | Primary business driver = transfer of ownership cost (CapEx → OpEx) | Cloud value proposition |
| 6 | Mobile cloud storage | Chose raw storage | Personal mobile device data sync/remote access = mobile cloud storage | Storage type |
| 7 | Cloud reseller vs broker | Chose broker | Buys hosting/cloud service and resells = cloud computing reseller | Cloud actor / role |
| 8 | Transparent database encryption | Chose KMS | TDE encryption engine resides in database / DBMS layer; KMS manages keys, not the engine itself | Encryption architecture |
| 9 | HSM | Chose TOS | Tamper-resistant hardware for key storage/management = HSM | Key management |
| 10 | DRM vs Enterprise DRM | Chose enterprise DRM | DRM is the broad mechanism against unauthorized copying; Enterprise DRM/IRM is a subset | Data protection terminology |

---

## 4. Key Concepts / 重點概念

### 4.1 Regulations & Standards / 法規與標準

**English**

| Term | Type | Scope |
|---|---|---|
| **GLBA** (Gramm-Leach-Bliley Act) | U.S. federal law | Financial institutions handling customers' non-public personal information |
| **PCI DSS** | Security standard | Payment card data security requirements — not a federal privacy law |
| **SSAE 18** | Attestation standard | Service organization audit/attestation standard |
| **SOC 1 / SOC 2** | Report type | Based on SSAE 18 — SOC 1 = financial reporting controls, SOC 2 = security/privacy controls |
| **ISO/IEC** | Standards organization | Not a law or report — develops international standards |

**Chinese**

| 術語 | 類型 | 適用範圍 |
|---|---|---|
| **GLBA**（格雷姆-里奇-比利雷法案） | 美國聯邦法律 | 規範金融機構處理客戶非公開個人資訊 |
| **PCI DSS** | 安全標準 | 支付卡資料安全要求 — 非聯邦隱私法 |
| **SSAE 18** | 認證標準 | 服務組織審計／認證標準 |
| **SOC 1 / SOC 2** | 報告類型 | 基於 SSAE 18 — SOC 1 為財務報導控制，SOC 2 為安全／隱私控制 |
| **ISO/IEC** | 標準組織 | 非法律或報告 — 制定國際標準 |

**Mnemonics / 記憶口訣**

| Concept | Mnemonic |
|---|---|
| Financial privacy law | **GLBA** |
| Payment card security | **PCI DSS** |
| Service org audit standard | **SSAE 18** |
| Service org reports | **SOC 1 / SOC 2** |

---

### 4.2 Cloud Deployment Models / 雲端部署模型

**English**

| Model | Definition |
|---|---|
| **Public cloud** | Provisioned for open use by the general public; owned, managed, and operated by a cloud provider |
| **Private cloud** | Provisioned for exclusive use by a single organization |
| **Hybrid cloud** | Composition of two or more distinct cloud infrastructures bound by standardized technology |
| **Community cloud** | Provisioned for exclusive use by a specific community of consumers from organizations with shared concerns |

**Chinese**

| 模型 | 定義 |
|---|---|
| **公有雲（Public cloud）** | 開放給一般公眾使用，由雲端服務提供者擁有、管理及營運 |
| **私有雲（Private cloud）** | 僅供單一組織專屬使用 |
| **混合雲（Hybrid cloud）** | 由兩個以上不同雲端基礎架構組成，透過標準化技術連結 |
| **社群雲（Community cloud）** | 供具有共同關注事項的特定消費者群體專屬使用 |

---

### 4.3 Cloud Actors / Roles / 雲端角色

**English**

| Role | Function |
|---|---|
| **CSP** (Cloud Service Provider) | Provides cloud services |
| **CSC** (Cloud Service Customer) | Uses cloud services |
| **Cloud Broker** | Intermediary that aggregates, integrates, or manages cloud services |
| **Cloud Reseller** | Purchases hosting/cloud services and resells to its own customers |
| **Cloud Carrier** | Provides connectivity and transport |
| **Cloud Auditor** | Conducts independent assessment |

**Chinese**

| 角色 | 功能 |
|---|---|
| **CSP**（雲端服務提供者） | 提供雲端服務 |
| **CSC**（雲端服務客戶） | 使用雲端服務 |
| **Cloud Broker**（雲端經紀人） | 仲介、整合或管理雲端服務 |
| **Cloud Reseller**（雲端轉售商） | 購買主機／雲端服務後轉售給自有客戶 |
| **Cloud Carrier**（雲端傳輸業者） | 提供連線與傳輸服務 |
| **Cloud Auditor**（雲端稽核員） | 執行獨立評估 |

---

### 4.4 IaaS Value Proposition / IaaS 商業價值

**English**

The primary business driver for adopting IaaS is **transfer of ownership cost** — converting capital expenditure (CapEx) to operational expenditure (OpEx). Customers pay only for what they use instead of bearing the full implementation cost.

Other benefits (scalability, metered service, energy/cooling efficiencies) are secondary, not the primary driver.

**Chinese**

採用 IaaS 的核心商業驅動力是**擁有成本轉移（transfer of ownership cost）** — 將資本支出（CapEx）轉換為營運支出（OpEx）。客戶只需按使用量付費，無需負擔完整建置成本。

其他效益（可擴展性、按量計費、能源與冷卻效率）皆為次要，非主要驅動力。

---

### 4.5 Cloud Data Disposal / 雲端資料銷毀

**English**

| Method | Description | Feasibility in Cloud |
|---|---|---|
| **Encryption / Crypto-erasure** | Renders data unreadable by destroying encryption keys | ✅ Generally feasible |
| **Physical destruction** | Physically destroys storage media | ❌ May not be accessible to customers |
| **Overwriting** | Writes new data over existing data | ❌ Multi-tenant environments complicate this |
| **Degaussing** | Uses magnetic field to erase magnetic media | ❌ Customer cannot typically guarantee execution |

**Chinese**

| 方法 | 說明 | 雲端可行性 |
|---|---|---|
| **加密／加密銷毀** | 透過銷毀加密金鑰使資料無法讀取 | ✅ 普遍可行 |
| **物理銷毀** | 物理上破壞儲存媒體 | ❌ 客戶可能無法存取 |
| **覆寫** | 以新資料覆蓋既有資料 | ❌ 多租戶環境增加困難度 |
| **消磁** | 利用磁場清除磁性媒體 | ❌ 客戶通常無法保證執行 |

---

### 4.6 Encryption Architecture / 加密架構

**English**

| Concept | Core Function | Common Trap |
|---|---|---|
| **TDE** (Transparent Data Encryption) | Encryption engine in database / DBMS layer | Don't mistake KMS as the encryption engine |
| **KMS** (Key Management Service) | Manages key lifecycle, rotation, access control | Manages keys, doesn't necessarily perform data encryption |
| **HSM** (Hardware Security Module) | Tamper-resistant hardware for key storage and cryptographic operations | Not the key itself — it's the secure container |

**Chinese**

| 概念 | 核心功能 | 常見陷阱 |
|---|---|---|
| **TDE**（透明資料加密） | 加密引擎位於資料庫／DBMS 層 | 不要把 KMS 當作加密引擎 |
| **KMS**（金鑰管理服務） | 管理金鑰生命週期、輪換、存取控制 | 管金鑰，不一定執行資料加密 |
| **HSM**（硬體安全模組） | 防篡改硬體，用於金鑰儲存與密碼運算 | 不是金鑰本身，而是安全的儲存容器 |

**TDE Architecture / TDE 架構**

```
Application → DBMS (TDE Engine) → Encrypted Data
                    ↕
            KMS (Key Management)
                    ↕
            HSM (Secure Storage)
```

---

### 4.7 Data Protection: DRM / IRM / 資料保護

**English**

| Term | Scope |
|---|---|
| **DRM** (Digital Rights Management) | Broad concept — prevents unauthorized copying and restricts distribution to paid/authorized users |
| **Enterprise DRM / IRM** (Information Rights Management) | Business-to-business subset of DRM; secures enterprise documents and information rights |
| **Bit splitting** | Data dispersion technique — splits data across multiple geographic locations; not rights management |
| **Degaussing** | Media sanitization method; not rights management |

**Chinese**

| 術語 | 範圍 |
|---|---|
| **DRM**（數位版權管理） | 廣義概念 — 防止未授權複製，限制內容僅供付費／授權使用者 |
| **Enterprise DRM / IRM**（企業版權管理） | DRM 的企業對企業子集，保護企業文件與資訊權 |
| **Bit splitting**（位元分割） | 資料分散技術，橫跨多個地理區域儲存；非權限管理 |
| **Degaussing**（消磁） | 媒體淨化方法；非權限管理 |

---

## 5. Error Pattern Analysis / 錯因模式分析

### 5.1 Regulation & Standard Name Confusion / 法規與標準名稱混淆

**Rule / 規則:**
- GLBA → U.S. financial institutions + customer private information
- PCI DSS → payment card data security (not a federal privacy law)
- SSAE 18 → attestation/audit standard
- SOC 1 / SOC 2 → report types derived from SSAE 18

**Root Cause / 根本原因:** Memorizing names without distinguishing category (law vs standard vs report vs organization).

---

### 5.2 Cloud Model & Role Boundary / 雲端模型與角色邊界

**Rules / 規則:**
- Public cloud → general public / open use
- Private cloud → single organization exclusive use
- Broker → intermediary, aggregation, integration, management
- Reseller → buys service, resells to own customers
- IaaS primary benefit → transfer of ownership cost (CapEx → OpEx)

**Decision Flow / 判斷順序:**
1. Does the scenario mention **general public / open use**? → Public cloud
2. Does it mention **exclusive use by one organization**? → Private cloud
3. Does it mention **resale / own customers**? → Reseller
4. Does it ask about **primary benefit / business driver**? → Ownership cost transfer

---

### 5.3 Cloud Disposal & Encryption / 雲端銷毀與加密

**Rules / 規則:**
- Cloud: physical destruction, degaussing, overwriting may **not** be feasible
- **Encryption / crypto-erasure** is the most universally applicable disposal method
- TDE encryption engine → database / DBMS layer (not KMS)
- KMS → manages key lifecycle (not the encryption engine itself)
- HSM → tamper-resistant hardware for key storage and crypto operations

---

### 5.4 DRM vs Enterprise DRM / IRM

**Rules / 規則:**
- **DRM** = broad: prevents unauthorized copying, restricts distribution to authorized users
- **Enterprise DRM / IRM** = enterprise-focused subset of DRM
- Bit splitting = data dispersion (not rights management)
- Degaussing = media sanitization (not rights management)

---

## 6. One-Liner Rule Table / 一句話規則表

| Topic | One-Liner Rule |
|---|---|
| **GLBA** | U.S. federal law for financial institutions protecting customer non-public personal information |
| **PCI DSS** | Payment card data security requirements, not a federal privacy law |
| **SSAE 18** | Service organization attestation standard (not a report type) |
| **SOC 2** | Report based on trust service criteria (not a standard itself) |
| **Public cloud** | General public / open use |
| **Private cloud** | Single organization exclusive use |
| **Reseller** | Buys service then resells to own customers |
| **Broker** | Intermediates, aggregates, or manages services |
| **IaaS benefit** | Primary = transfer of ownership cost (CapEx → OpEx) |
| **Cloud disposal** | Physical destruction / degaussing / overwriting may not be feasible; encryption/crypto-erasure is more universal |
| **TDE** | Encryption engine resides in database / DBMS layer |
| **KMS** | Manages keys, not necessarily the encryption engine |
| **HSM** | Tamper-resistant hardware for key storage and cryptographic operations |
| **DRM** | Broad rights protection for paid/authorized content |
| **Enterprise DRM / IRM** | Enterprise subset of DRM |

---

## 7. Study Drills / 複習演練

### Drill A: Regulations & Standards (10 min)

Quick daily Q&A:
- What does GLBA govern?
- What does PCI DSS govern?
- Is SSAE 18 a report or a standard?
- What are SOC 1 and SOC 2 oriented toward respectively?
- Is ISO/IEC a law, a standards organization, or a report?

**快速問答：**
- GLBA 管什麼？
- PCI DSS 管什麼？
- SSAE 18 是報告還是標準？
- SOC 1 與 SOC 2 分別偏重什麼？
- ISO/IEC 是法律、標準組織、還是報告？

### Drill B: Cloud Actors (10 min)

Quickly distinguish:
- CSP vs CSC vs CSN
- Cloud broker vs cloud reseller
- Cloud carrier vs cloud auditor

**快速分辨：**
- CSP / CSC / CSN
- Cloud broker / Cloud reseller
- Cloud carrier / Cloud auditor

### Drill C: Encryption Architecture (15 min)

Be able to clearly explain:
- TDE vs application-level encryption
- KMS vs HSM
- Encryption vs tokenization vs masking
- Crypto-erasure vs degaussing vs physical destruction

**必須能講清楚：**
- TDE 與應用層加密的差異
- KMS 與 HSM 的差異
- 加密、代碼化、遮罩的區別
- 加密銷毀、消磁、物理銷毀的比較

---

## 8. Conclusion / 結論

**English**

This 66% score does not indicate overall readiness failure — the sample is only 30 questions, and D4/D5 performed well. However, it reveals a clear issue: **in mixed assessments, regulation/standard terminology, cloud roles, and D2 encryption/disposal boundaries are easily disrupted by distractor options.**

**Priorities:**

1. Stop chasing new questions.
2. Fix wrong-question concepts in D1 / D2 / D6 first.
3. Verify with a 30–50 question mixed quiz.
4. Before attempting a full 100–125 question timed practice, bring D1/D2/D6 mini-quiz scores back to 75–80%.

**Chinese**

本次 66% 不代表整體準備失敗 — 樣本只有 30 題，且 D4/D5 表現良好。但此分數指出一個明確問題：**在混合測驗中，法規／標準名詞、雲端角色、D2 加密與資料銷毀邊界容易被干擾選項帶走。**

**後續優先策略：**

1. 不再大量追新題。
2. 先修正 D1 / D2 / D6 的錯題概念。
3. 用 30–50 題小型 mixed quiz 檢查修正效果。
4. 進入 100–125 題完整計時練習前，先讓 D1/D2/D6 的小測成績回到 75–80%。

---
## 9.

# 複習主軸

## 優先順序

|Priority|主題|目的|
|---|---|---|
|**P0**|D6 法規 / 審計 / 合規名詞|避免 GLBA、PCI、SSAE、SOC 類題繼續混淆|
|**P0**|D2 加密 / 銷毀 / 金鑰 / 權限保護|修正 TDE、HSM、DRM、cloud disposal 的概念邊界|
|**P1**|D1 Cloud models / cloud actors / service models|修正 public cloud、reseller、IaaS benefit 類基礎題|
|**P1**|法律流程詞彙|補 legal hold、eDiscovery、chain of custody 等非工程背景名詞|
|**P2**|雲合約 / assurance / audit artifact|補 SLA、right to audit、SOC report、ISO、CSA STAR 等考試常見詞|

Assessment 錯題中明確出現 GLBA、public cloud、cloud disposal、SSAE 18、IaaS benefit、mobile cloud storage、cloud reseller、transparent encryption、HSM、DRM 等錯誤點。

---

# A. D6 法規 / 合規 / 審計名詞

## A1. 法規與產業規範

|名詞|中文理解|秒殺判斷|
|---|---|---|
|**GLBA**|Gramm-Leach-Bliley Act，美國金融隱私法|**美國金融機構 + 客戶個資 / private financial information**|
|**PCI DSS**|支付卡產業資料安全標準|**信用卡資料 / cardholder data / payment card**|
|**HIPAA**|美國醫療資料保護法|**health information / PHI / healthcare**|
|**SOX**|Sarbanes-Oxley Act|**上市公司財務報告、內控、審計責任**|
|**GDPR**|歐盟個資保護規範|**EU personal data / data subject rights / controller / processor**|
|**CCPA / CPRA**|加州消費者隱私法|**California consumer privacy rights**|
|**PIPEDA**|加拿大個資保護法|**Canada personal information**|
|**FISMA**|美國聯邦資訊安全管理|**U.S. federal agency information systems**|
|**FedRAMP**|美國聯邦雲端授權框架|**cloud service for U.S. federal government**|
|**FERPA**|美國教育資料隱私法|**student education records**|

### 明天要背的最小集合

```
GLBA = 金融個資PCI DSS = 支付卡資料HIPAA = 醫療 PHISOX = 財報內控GDPR = EU 個資FedRAMP = 美國聯邦雲服務授權FISMA = 美國聯邦資訊系統安全
```

---

## A2. 審計標準 / 報告 / Assurance

|名詞|類型|秒殺判斷|
|---|---|---|
|**SSAE 18**|審計 / attestation 標準|**service organization audit standard**|
|**SOC 1**|報告類型|**財務報告相關控制**|
|**SOC 2**|報告類型|**Security / Availability / Processing Integrity / Confidentiality / Privacy**|
|**SOC 3**|報告類型|**公開版、摘要版 SOC 2**|
|**ISAE 3402**|國際 attestation 標準|類似 SOC 1 國際版脈絡|
|**ISO/IEC 27001**|ISMS 認證標準|**資訊安全管理系統，可被認證**|
|**ISO/IEC 27002**|控制實務指引|控制目錄 / guidance，不是認證主體|
|**ISO/IEC 27017**|雲端安全控制指引|cloud security controls|
|**ISO/IEC 27018**|公有雲個資保護|PII protection in public cloud|
|**CSA STAR**|Cloud Security Alliance 評估/登錄|cloud provider assurance / transparency|
|**CAIQ**|Consensus Assessments Initiative Questionnaire|CSP 安全問卷|
|**CCM**|Cloud Controls Matrix|CSA 的雲端控制矩陣|

### 易混淆規則

```
SSAE 18 = 標準SOC 1 / SOC 2 / SOC 3 = 報告ISO 27001 = ISMS 認證ISO 27002 = 控制指引ISO 27017 = 雲端安全ISO 27018 = 公有雲 PIICSA CCM = 控制矩陣CAIQ = 問卷
```

---

# B. 法律流程 / 證據 / 調查名詞

這一區通常不是工程師日常用語，但 CCSP 很常用來考 D6。

|名詞|中文理解|秒殺判斷|
|---|---|---|
|**Legal hold**|法律保全令 / 暫停刪除|有訴訟或調查時，**先保留資料，不可刪**|
|**eDiscovery**|電子證據揭露|搜尋、收集、保存、提交電子證據|
|**Chain of custody**|證據保管鏈|證明證據從取得到提交期間未被竄改|
|**Forensic image**|鑑識映像|對磁碟/資料做 bit-level 或可驗證副本|
|**Spoliation**|證據破壞|該保留卻刪除或破壞證據|
|**Subpoena**|傳票 / 法院命令|要求提供證據或出庭|
|**Warrant**|搜索令|執法機關取得搜索/扣押授權|
|**MLAT**|Mutual Legal Assistance Treaty|跨國司法協助|
|**Jurisdiction**|管轄權|哪個國家/地區法律有權管|
|**Data residency**|資料存放地|資料實際放在哪裡|
|**Data sovereignty**|資料主權|資料受哪個國家法律管|
|**Data localization**|資料本地化|法規要求資料必須留在特定國家/地區|

### 秒殺對比

```
Residency = 資料放在哪裡Sovereignty = 資料受誰的法律管Localization = 法律要求資料必須留在某地Legal hold = 先保留，不要刪eDiscovery = 找電子證據Chain of custody = 證據保管流程可證明
```

---

# C. 合約 / 供應商治理 / 責任邊界名詞

|名詞|中文理解|秒殺判斷|
|---|---|---|
|**SLA**|Service Level Agreement|服務承諾，例如 uptime、response time|
|**SLO**|Service Level Objective|內部或目標性服務水準|
|**SLI**|Service Level Indicator|可量測指標，例如 latency、availability|
|**MSA**|Master Service Agreement|主服務合約|
|**DPA**|Data Processing Agreement|資料處理協議，GDPR/processor 情境常見|
|**NDA**|Non-Disclosure Agreement|保密協議|
|**Right to audit**|稽核權|客戶或第三方可稽核 CSP 控制|
|**Indemnification**|補償 / 賠償條款|一方因特定損害負責賠償|
|**Liability**|法律責任|誰對損失負責|
|**Due care**|合理注意|日常維持合理安全措施|
|**Due diligence**|盡職調查|事前審查、評估、驗證|
|**RACI**|Responsible / Accountable / Consulted / Informed|責任矩陣|

### 常見陷阱

```
Outsourcing 不等於責任全部轉移。SLA 是服務水準承諾，不是完整安全保證。Right to audit 是 assurance 能力，不是技術控制。Due diligence 偏事前調查；due care 偏持續合理注意。
```

---

# D. D2 資料安全 / 加密 / 銷毀 / 權限保護名詞

## D1：資料銷毀與媒體處理

|名詞|中文理解|秒殺判斷|
|---|---|---|
|**Crypto-erasure**|加密銷毀|銷毀 key，使資料不可讀|
|**Degaussing**|消磁|適用磁性媒體，需要實體控制|
|**Overwriting**|覆寫|cloud/multi-tenant 環境不一定可保證|
|**Physical destruction**|實體破壞|cloud 中通常無法由客戶直接做|
|**Encryption**|加密|cloud 資料銷毀/不可讀化最常見可行方向|
|**Sanitization**|資料清除|general term，包含多種方法|

### 秒殺規則

```
Cloud disposal 問 always safe / cloud environment：優先想 encryption / crypto-erasure。不要優先選 degaussing / physical destruction。
```

---

## D2：加密與金鑰管理

|名詞|中文理解|秒殺判斷|
|---|---|---|
|**TDE**|Transparent Data Encryption|DB/DBMS 層透明加密|
|**KMS**|Key Management System|管理金鑰生命週期|
|**HSM**|Hardware Security Module|硬體保護金鑰、簽章、加解密操作|
|**BYOK**|Bring Your Own Key|客戶帶自己的 key 給 CSP 使用|
|**HYOK**|Hold Your Own Key|客戶自己持有 key，CSP 不持有|
|**Key rotation**|金鑰輪替|定期換 key 降低暴露風險|
|**Key escrow**|金鑰託管|第三方或受控方式保存 key|
|**Envelope encryption**|信封加密|data key 加密資料，master key 加密 data key|

### 秒殺規則

```
TDE = encryption engine at DB/DBMS layerKMS = 管 key，不是 encryption engineHSM = 硬體保護 keyBYOK = 自帶 keyHYOK = 自己保管 key
```

---

## D3：資料保護技術

|名詞|中文理解|秒殺判斷|
|---|---|---|
|**Tokenization**|代碼化|用 token 替代真值，原值存在 token vault|
|**Masking**|遮罩|顯示時隱藏敏感部分|
|**Dynamic masking**|動態遮罩|查詢/顯示時依角色遮罩，不改原始資料|
|**Static masking**|靜態遮罩|產生已遮罩資料副本|
|**Redaction**|塗黑 / 移除敏感資訊|文件/非結構化資料常見|
|**FPE**|Format-Preserving Encryption|保留格式的加密，例如仍像信用卡號|
|**DRM**|Digital Rights Management|防止未授權複製、限制內容分發|
|**Enterprise DRM / IRM**|企業資訊權限管理|文件/企業資訊權限控管，是 DRM 子集|

---

# E. D1 雲模型 / 雲角色 / 架構名詞

## E1. Cloud deployment models

|名詞|秒殺判斷|
|---|---|
|**Public cloud**|open use by general public|
|**Private cloud**|exclusive use by one organization|
|**Community cloud**|shared by organizations with common concerns|
|**Hybrid cloud**|two or more distinct cloud infrastructures bound together|
|**Multicloud**|使用多個 cloud providers，不一定整合成 hybrid|

---

## E2. Cloud service models

|名詞|秒殺判斷|
|---|---|
|**IaaS**|客戶管 OS / app / data；CSP 管底層基礎設施|
|**PaaS**|客戶專注 app/code；CSP 管 runtime / OS / infra|
|**SaaS**|CSP 提供完整 application|
|**FaaS / Serverless**|event-driven function；客戶不管 server 管理|

### IaaS 商業價值

```
IaaS primary benefit = transfer ownership cost / CapEx → OpEx不是 energy/cooling efficiency。
```

---

## E3. Cloud actors

|名詞|秒殺判斷|
|---|---|
|**Cloud consumer**|使用雲服務者|
|**Cloud provider**|提供雲服務者|
|**Cloud broker**|中介、整合、管理、仲介服務|
|**Cloud reseller**|先購買服務，再轉售給客戶|
|**Cloud auditor**|獨立評估雲服務、控制、合規|
|**Cloud carrier**|提供網路連線/傳輸|

### Broker vs Reseller

```
Reseller = buys and resellsBroker = intermediary / aggregation / integration / management
```

---

# F. 明天完整複習清單

## 版本 A：2 小時版

|時間|任務|
|---|---|
|30 min|D2：TDE / KMS / HSM / crypto-erasure / DRM 對照|
|20 min|D2 drill 15–20 題|
|25 min|D6：GLBA / PCI / SSAE / SOC / legal hold / eDiscovery|
|15 min|D6 drill 10–15 題|
|20 min|D1：cloud model / actor / IaaS benefit|
|15 min|D1 drill 10–15 題|
|10 min|寫 10 條一句話規則|

---

## 版本 B：3 小時版

|時間|任務|
|---|---|
|40 min|D2 加密、金鑰、銷毀、DRM 對照|
|25 min|D2 drill 20 題|
|35 min|D6 法規、標準、審計、法律流程|
|20 min|D6 drill 15–20 題|
|30 min|D1 deployment / service model / cloud actors|
|20 min|D1 drill 15–20 題|
|20 min|錯題規則整理|
|10 min|口頭複誦：每個錯題為什麼錯|

---

# G. 明天必背的一句話規則

```
GLBA = 金融機構個資；PCI = 支付卡資料。SSAE 18 = attestation standard；SOC 1/2/3 = report。SOC 1 = 財報控制；SOC 2 = trust services controls；SOC 3 = public summary。ISO 27001 = ISMS certification；27002 = controls guidance；27017 = cloud；27018 = public cloud PII。Legal hold = 先保留，不刪除。eDiscovery = 找電子證據。Chain of custody = 證據保管鏈。Residency = 資料放哪；Sovereignty = 受誰法律管；Localization = 必須留在哪。TDE = database/DBMS layer encryption。KMS = 管 key；HSM = 硬體保護 key。Cloud disposal 優先想 encryption / crypto-erasure。DRM = 廣義防拷貝與授權分發；IRM = 企業資訊權限控管。Public cloud = open to general public。Reseller = buys and resells；Broker = intermediary / aggregation / integration。IaaS benefit = transfer ownership cost / CapEx to OpEx。Outsourcing 不等於責任完全轉移。
```

---

