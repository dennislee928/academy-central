# CCSP Domain 6 完整講義 / Legal, Risk & Compliance — Full Notes

> **Domain 6 定位：** 本講義為完整知識點匯整，涵蓋法律層級、隱私框架、風險管理、合規標準、稽核機制與合約條款。適合系統性複習使用，與 `01-core-concepts.md` 速查表搭配使用效果最佳。

---

## 一、Domain 6 核心定位

CCSP Domain 6 的主軸是 **法律、風險、合規、稽核、隱私、合約責任**。本領域通常不是測驗技術操作細節，而是測驗雲端環境中的責任歸屬、法規要求、證據保存、風險處理與合約條款。

常見考題方向包括：

- 雲端服務責任是否能完全外包

- 資料所在地與法律管轄權的差異

- 發生訴訟或調查時資料是否能刪除

- 雲端服務商是否具備第三方安全驗證

- 合約中是否明確規定 breach notification、right to audit、SLA 等要求

- 個人資料、醫療資料、財務資料分別受到哪些要求約束

考試判斷原則：

> 雲端服務可以外包，合規與責任不能完全外包。

---

## 二、法律、法規、標準與政策

### 1. Law 法律

**法律**由政府制定，具有強制力。不遵守法律可能導致罰款、訴訟或刑事責任。

常見例子：

- SOX

- HIPAA

- GDPR

判斷關鍵字：

- government

- legal requirement

- mandatory

- penalty

- statute

---

### 2. Regulation 法規

**法規**通常是法律下的具體執行要求，用來規定組織必須如何遵守法律。

判斷關鍵字：

- regulator

- compliance requirement

- government agency

- enforcement

---

### 3. Standard 標準

**標準**通常是業界最佳實務或安全控制框架。標準本身不一定具有法律強制力，但可能透過合約、法規或客戶要求變成必須遵守的要求。

常見例子：

- ISO 27001

- NIST

- CSA CCM

判斷關鍵字：

- framework

- best practice

- control set

- certification

- baseline

---

### 4. Policy 政策

**政策**是組織內部制定的正式規則，用來說明安全、隱私、資料保存、存取控制等要求。

常見例子：

- 資料保留政策

- 密碼政策

- 存取控制政策

- 資料分類政策

判斷關鍵字：

- internal rule

- organizational requirement

- approved by management

---

## 三、SOX、CSA CCM、CSA STAR

### 1. SOX

**SOX = Sarbanes-Oxley Act**

SOX 是美國法律，主要規範上市公司的財務報告、內部控制與稽核要求。

CCSP 考點：

- 財務資料

- 上市公司

- 內部控制

- 稽核證據

- 財務報表正確性

雲端情境：

上市公司將財務報表系統搬到雲端後，仍需確保財務資料完整、正確、可稽核，並且有足夠內部控制。雲端服務商提供基礎設施或平台，不代表上市公司可免除 SOX 責任。

記憶方式：

> SOX = 財務資料 + 上市公司 + 內部控制 + 稽核

---

### 2. CSA CCM

**CSA = Cloud Security Alliance**  
**CCM = Cloud Controls Matrix**

CSA CCM 是雲端安全控制矩陣，可視為雲端安全控制框架或安全檢查表。

用途：

- 評估雲端服務商安全控制

- 對照雲端安全要求

- 建立雲端控制基準

- 支援雲端風險評估與合規檢查

常見控制領域：

- 存取控制

- 加密

- 日誌與監控

- 供應商風險

- 資料治理

- 事件回應

- 業務連續性

記憶方式：

> CSA CCM = 雲端安全控制清單

---

### 3. CSA STAR

**STAR = Security, Trust, Assurance, and Risk**

CSA STAR 是 Cloud Security Alliance 提供的雲端安全保證與透明度計畫，用來展示或查詢雲端服務商的安全成熟度、保證資訊或第三方驗證狀態。

用途：

- 查詢 CSP 安全保證資訊

- 提供客戶信任依據

- 展示雲端服務商安全透明度

- 支援第三方驗證與安全成熟度評估

記憶方式：

> CSA STAR = 雲端服務商安全保證與信任展示

---

### 4. CSA CCM 與 CSA STAR 比較

|名詞|類型|主要用途|關鍵字|
|---|---|---|---|
|CSA CCM|控制框架|對照雲端安全控制|controls, framework, checklist|
|CSA STAR|安全保證計畫|展示 CSP 安全透明度與信任資訊|assurance, trust, registry, certification|

判斷重點：

- 題目提到「安全控制框架」、「控制矩陣」、「control checklist」：CSA CCM

- 題目提到「安全保證」、「信任」、「公開登錄」、「第三方驗證資訊」：CSA STAR

---

## 四、雲端責任分工：Shared Responsibility

### 1. 核心觀念

**Shared responsibility** 指雲端安全與合規責任由雲端客戶與雲端服務商共同承擔。雲端服務商可承擔部分技術與基礎設施控制，但雲端客戶仍需負責資料、存取、合規要求與使用方式。

核心句：

> Work can be outsourced; accountability cannot be fully outsourced.

---

### 2. 常見責任分工

#### CSP 常見責任

- 實體資料中心安全

- 底層硬體

- 網路基礎設施

- 雲端平台基礎服務

- 實體環境監控

#### 雲端客戶常見責任

- 資料分類

- 資料保護要求

- 使用者存取權限

- 身分與權限管理

- 合規要求確認

- 合約審查

- 日誌需求設定

- 資料保存與刪除決策

#### 共同責任

- 加密設計與金鑰管理

- 日誌與監控

- 事件回應

- 合規證明

- 安全控制驗證

---

### 3. IaaS、PaaS、SaaS 責任差異

|雲端模型|客戶責任程度|CSP 責任程度|考試重點|
|---|--:|--:|---|
|IaaS|高|中|客戶通常仍需管理作業系統、應用程式、資料|
|PaaS|中|中高|CSP 管理平台，客戶管理應用與資料|
|SaaS|較低|高|客戶仍負責資料、使用者、合規需求|

重要提醒：

> SaaS 減少客戶技術操作責任，但不代表客戶免除資料與合規責任。

---

## 五、資料隱私與角色

### 1. PII

**PII = Personally Identifiable Information**

PII 是可識別個人的資料。

例子：

- 姓名

- 身分證號

- 電話號碼

- 電子郵件地址

- 地址

- 可識別個人的帳號資訊

---

### 2. PHI

**PHI = Protected Health Information**

PHI 是受保護的健康資訊，常與 HIPAA 相關。

例子：

- 病歷

- 診斷資料

- 醫療紀錄

- 醫療保險資訊

- 病患健康相關資料

常見錯誤：

> PHI 不是 Personal Health Information，而是 Protected Health Information。

---

### 3. Data Subject

**Data subject = 資料本人**

資料本人是個人資料所指向的自然人。

例子：

客戶資料中的姓名、電話、病歷屬於資料；該名客戶本人屬於 data subject。

常見錯誤：

> Data subject 不是資料本身，而是資料所指向的人。

---

### 4. Data Controller

**Data controller = 決定資料處理目的與方式的組織或個人**

判斷關鍵字：

- 決定為何收集資料

- 決定資料用途

- 決定保存多久

- 決定處理方式

例子：

公司決定收集客戶個資、使用個資進行服務提供、保存一年後刪除，該公司通常是 data controller。

記憶方式：

> Controller = 決定目的與方式

---

### 5. Data Processor

**Data processor = 依照 controller 指示處理資料的組織或個人**

判斷關鍵字：

- 依照客戶指示

- 儲存資料

- 處理資料

- 備份資料

- 不決定資料用途

例子：

雲端服務商依照客戶指示儲存、備份、處理個人資料，雲端服務商通常是 data processor。

記憶方式：

> Processor = 照指示處理資料

---

### 6. Subprocessor

**Subprocessor = processor 再委託的資料處理者**

判斷關鍵字：

- CSP 又找另一家公司協助處理資料

- processor 委外給第三方處理

- 第三方協助儲存、備份、分析或支援資料處理

例子：

雲端服務商委託另一家公司提供備份、客服或分析服務，且該公司會接觸個人資料，該公司可能是 subprocessor。

---

### 7. 角色比較

|名詞|中文|核心意義|關鍵字|
|---|---|---|---|
|Data subject|資料本人|個資指向的自然人|individual, person|
|Controller|控制者|決定目的與方式|decide purpose and means|
|Processor|處理者|依指示處理資料|process on behalf of controller|
|Subprocessor|次處理者|processor 再委託的第三方|third party processor|

---

## 六、Data Residency、Data Sovereignty、Jurisdiction

### 1. Data Residency

**Data residency = 資料實際存放在哪個國家或地區**

判斷關鍵字：

- data location

- stored in

- region

- country

- data center location

- where data resides

例子：

公司將資料指定存放於日本、新加坡或美國資料中心，這是在討論 data residency。

記憶方式：

> Residency = where data lives

---

### 2. Data Sovereignty

**Data sovereignty = 資料受哪個國家的法律管**

判斷關鍵字：

- government access

- legal authority

- national law

- government request

- law applies to data

例子：

資料存在某國雲端資料中心，該國法律允許政府在特定情況下要求取得資料，這是在討論 data sovereignty。

記憶方式：

> Sovereignty = whose law controls the data

---

### 3. Jurisdiction

**Jurisdiction = 哪個國家、法院或政府機關有權處理、審理或管轄某件事**

判斷關鍵字：

- court

- legal authority

- dispute

- legal proceeding

- multiple countries

- government authority

例子：

資料存在 A 國，客戶位於 B 國，公司總部位於 C 國。若發生爭議，需要判斷哪個國家、法院或政府機關有權處理，這是在討論 jurisdiction。

記憶方式：

> Jurisdiction = who has legal authority over the case or dispute

---

### 4. 三者比較

|名詞|核心問題|中文理解|常見關鍵字|
|---|---|---|---|
|Data residency|資料在哪裡？|存放地點|stored in, region, data center|
|Data sovereignty|資料受誰法律管？|資料主權|government access, national law|
|Jurisdiction|誰有權處理案件或爭議？|法律管轄權|court, authority, dispute|

常見錯點：

- 題目強調「資料實際存放地點」：Data residency

- 題目強調「政府依法律要求存取資料」：Data sovereignty

- 題目強調「多國法律、法院、政府機關誰有權管」：Jurisdiction

---

## 七、GDPR 與資料主體權利

### 1. Right to be forgotten

**Right to be forgotten = 被遺忘權 / 刪除權**

資料本人可要求組織刪除個人資料，特別是在資料不再需要、撤回同意或無合法處理依據時。

判斷關鍵字：

- request deletion

- erase personal data

- no longer wants company to retain data

---

### 2. 常見限制

Right to be forgotten 不是絕對權利。若存在法律保存義務、調查、訴訟或 legal hold，相關資料可能不能立即刪除。

考試陷阱：

資料本人要求刪除資料，但同一批資料正受到法院要求保存。最佳做法通常是暫停刪除相關資料，因為 legal hold 優先。

---

### 3. Cross-border Data Transfer

**Cross-border data transfer = 跨境資料傳輸**

當歐盟個人資料被傳輸到非歐盟國家處理時，需確認 GDPR 或其他適用法律對跨境傳輸的要求。

判斷關鍵字：

- EU personal data

- transfer to non-EU country

- cross-border

- international data transfer

- GDPR safeguards

重點：

- 法律是否允許傳輸

- 是否需要適當保護措施

- 合約條款是否足夠

- 是否涉及 subprocessor

- 是否需通知或取得授權

---

## 八、Legal Hold、eDiscovery、Forensics、Chain of Custody

### 1. Legal Hold

**Legal hold = 法律保全 / 訴訟保留**

當組織面臨可能的訴訟、調查或法律程序時，必須暫停刪除相關資料，即使資料已達原本保存期限。

判斷關鍵字：

- litigation

- investigation

- preserve data

- suspend deletion

- cannot delete

- evidence preservation

考試重點：

> Legal hold 優先於一般資料刪除政策。

例子：

公司資料保存政策規定日誌保存一年後刪除，但日誌與訴訟調查有關，因此需暫停刪除。

---

### 2. eDiscovery

**eDiscovery = electronic discovery / 電子資料開示**

eDiscovery 是法律程序中尋找、保存、蒐集、審查與提交電子資料的過程。

常見資料類型：

- 電子郵件

- 雲端檔案

- 系統日誌

- 即時通訊紀錄

- 備份資料

- 資料庫紀錄

判斷關鍵字：

- legal discovery

- electronic evidence

- litigation support

- search and produce records

---

### 3. Forensics

**Forensics = 數位鑑識**

Forensics 用於調查安全事件、資料外洩或法律案件，目標是以可接受的方式收集與分析證據。

重點：

- 不破壞原始證據

- 維持證據完整性

- 記錄調查過程

- 確保證據可在法律程序中使用

---

### 4. Chain of Custody

**Chain of custody = 證據保管鏈**

Chain of custody 用於證明證據從收集、保存、移交到提交的過程中沒有被竄改、掉包或污染。

必須記錄：

- 誰取得證據

- 何時取得證據

- 從哪裡取得證據

- 如何保存證據

- 誰曾接觸證據

- 是否進行複製、分析或移交

- 證據完整性如何驗證

判斷關鍵字：

- who collected

- when collected

- how preserved

- evidence integrity

- tamper proof

- admissible evidence

記憶方式：

> Chain of custody = 證據可信度的保存紀錄

---

## 九、Incident Response 與 Breach Notification

### 1. Incident Response

**Incident response = 事件回應**

當雲端環境發生疑似資料外洩或安全事件時，最佳做法通常不是立刻刪除資料、關閉所有系統或通知媒體，而是啟動事件回應計畫並保存證據。

正確方向：

- 啟動 incident response plan

- 保存證據

- 避免破壞日誌與鑑識資料

- 通知適當內部角色

- 依法律與合約判斷通知義務

錯誤方向：

- 立即刪除可疑資料

- 未記錄原因就關閉所有系統

- 未確認事實即對外公開

- 交由 CSP 自行決定所有處置

---

### 2. Breach Notification

**Breach notification = 資料外洩通知**

資料外洩後，通知主管機關、受影響客戶或資料主體的時限與流程通常由法律、法規、合約與資料類型決定。

合約中應明確規定：

- CSP 通知客戶的時限

- 通知內容

- 通知流程

- 聯絡窗口

- 配合調查方式

- 日誌與證據提供方式

- 下游 subprocessor 通知責任

判斷關鍵字：

- breach

- notification timeframe

- notify regulator

- notify affected individuals

- incident reporting

考試重點：

> 發生資料外洩後，通知時限應優先依適用法律、合規要求與合約條款判斷。

---

## 十、風險管理

### 1. Risk 基本組成

風險通常與威脅、弱點、影響與發生可能性有關。

常見概念：

|名詞|中文|說明|
|---|---|---|
|Threat|威脅|可能造成傷害的來源，例如駭客、火災、惡意員工|
|Vulnerability|弱點|可被利用的缺陷，例如未修補漏洞、弱密碼|
|Impact|影響|事件發生後造成的損失，例如資料外洩、營運中斷|
|Likelihood|可能性|事件發生機率|
|Risk|風險|威脅利用弱點後造成影響的可能性|

常見公式概念：

> Risk = Threat × Vulnerability × Impact

考試不一定要求計算，但常要求辨識各要素。

---

### 2. Inherent Risk

**Inherent risk = 固有風險 / 原始風險**

指尚未加入安全控制前的風險。

判斷關鍵字：

- before controls

- no safeguards

- original risk

記憶方式：

> Inherent risk = 控制前的風險

---

### 3. Residual Risk

**Residual risk = 殘餘風險**

指加入安全控制後仍然剩下的風險。

判斷關鍵字：

- after controls

- remaining risk

- risk left after mitigation

記憶方式：

> Residual risk = 控制後剩下的風險

---

### 4. 風險處理方式

|方法|中文|核心意思|例子|
|---|---|---|---|
|Risk avoidance|避免風險|不做高風險活動|風險太高，因此不使用某雲端服務|
|Risk mitigation|降低風險|加入控制降低可能性或影響|MFA、加密、備份、監控|
|Risk transfer|轉移風險|將部分財務影響轉移出去|購買網路安全保險|
|Risk acceptance|接受風險|正式記錄並接受剩餘風險|低風險問題修補成本高於可能損失，經管理層批准後不修|

---

### 5. 常見判斷關鍵字

#### Risk avoidance

- do not use

- stop activity

- avoid service

- discontinue

#### Risk mitigation

- reduce risk

- implement control

- MFA

- encryption

- backup

- monitoring

#### Risk transfer

- insurance

- transfer financial impact

- outsourcing some risk cost

#### Risk acceptance

- documented

- management approval

- cost exceeds benefit

- accept low risk

---

## 十一、稽核、保證與第三方報告

### 1. Audit Assurance

**Audit assurance = 稽核保證**

用於確認雲端服務商是否符合安全、合規或合約要求。第三方稽核報告可提供獨立驗證依據。

常見報告或認證：

- SOC 1

- SOC 2

- ISO 27001

- CSA STAR

判斷關鍵字：

- third-party audit report

- independent verification

- assurance

- control effectiveness

- compliance evidence

---

### 2. SOC 2 Type I 與 Type II

|報告類型|重點|考試判斷|
|---|---|---|
|SOC 2 Type I|某一時間點控制設計是否合理|point in time, design|
|SOC 2 Type II|一段期間內控制是否有效運作|period of time, operating effectiveness|

重點：

> SOC 2 Type II 較能證明控制在一段期間內有效運作。

錯誤觀念：

- SOC 2 不保證 CSP 永遠不會被攻擊。

- SOC 2 不取代客戶所有法律責任。

- SOC 2 不決定資料必須存在哪個國家。

---

### 3. ISO 27001

ISO 27001 是資訊安全管理系統標準，用於建立、維護與持續改善組織的資訊安全管理制度。

考試方向：

- 安全管理制度

- 第三方認證

- 控制框架

- 合規證據

---

## 十二、雲端合約與常見文件

### 1. SLA

**SLA = Service Level Agreement**

SLA 是服務等級協議，用於定義服務可用性、回應時間、支援時間與違約補償。

常見內容：

- uptime 99.9%

- 服務可用性

- 支援回應時間

- 事件回復時間

- service credit

- 違約補償

常見錯誤：

> SLA 不是 Service Legal Agreement，而是 Service Level Agreement。

判斷關鍵字：

- uptime

- availability

- response time

- service credit

- performance commitment

---

### 2. MSA

**MSA = Master Service Agreement**

MSA 是主服務合約，用於定義整體服務條款與商業法律框架。

常見內容：

- 整體服務條款

- 責任分配

- 付款條件

- 終止條件

- 法律責任

- 爭議處理

- 保密條款

常見錯誤：

> MSA 不是 Main Service Agreement，而是 Master Service Agreement。

判斷關鍵字：

- master agreement

- overall terms

- payment

- termination

- liability

---

### 3. BAA

**BAA = Business Associate Agreement**

BAA 是 HIPAA 下常見的商業夥伴協議。當醫療機構使用雲端服務處理 PHI 時，可能需要與雲端服務商簽署 BAA。

常見情境：

- 醫療機構

- 病患資料

- PHI

- HIPAA

- 雲端服務商協助處理健康資訊

判斷關鍵字：

- HIPAA

- PHI

- healthcare

- business associate

- protected health information

記憶方式：

> HIPAA + PHI + 雲端服務商處理醫療資料 = BAA

---

### 4. DPA

**DPA = Data Processing Agreement**

DPA 是資料處理協議，常見於 GDPR 場景，用於規定 controller 與 processor 之間如何處理個人資料。

常見內容：

- CSP 如何處理個人資料

- 處理目的與範圍

- 資料安全控制

- breach notification

- subprocessor 使用條件

- 資料刪除或返還

- 稽核權利

常見錯誤：

> DPA 不是 Data Privacy Agreement，而是 Data Processing Agreement。

判斷關鍵字：

- GDPR

- personal data

- processor

- data processing

- subprocessors

記憶方式：

> GDPR + personal data + processor = DPA

---

### 5. Right to Audit

**Right to audit = 稽核權**

Right to audit 是合約條款，用於保留檢查雲端服務商是否遵守安全、合規與合約要求的權利。

常見內容：

- 查閱稽核報告

- 要求安全證明

- 檢查控制有效性

- 確認合規要求

- 審查第三方與 subprocessor 控制

判斷關鍵字：

- audit right

- verify compliance

- inspect controls

- review CSP security

---

### 6. 合約文件比較

|文件|全名|主要用途|關鍵字|
|---|---|---|---|
|SLA|Service Level Agreement|服務等級承諾|uptime, availability, response time|
|MSA|Master Service Agreement|主服務合約與整體條款|payment, termination, liability|
|BAA|Business Associate Agreement|HIPAA 下保護 PHI|HIPAA, PHI, healthcare|
|DPA|Data Processing Agreement|GDPR 下規範個資處理|GDPR, personal data, processor|
|Right to audit|稽核權|檢查 CSP 是否合規|audit, verify, compliance|

---

## 十三、Data Retention 與 Secure Data Destruction

### 1. Data Retention

**Data retention = 資料保留**

資料保留政策定義資料需要保存多久、保存在哪裡、由誰負責管理，以及何時可以刪除。

常見考點：

- 法律保存要求

- 合約要求

- 業務需求

- 日誌保存期限

- 備份資料保存期限

---

### 2. Secure Data Destruction

**Secure data destruction = 安全資料銷毀**

安全資料銷毀要求資料在刪除後無法被復原。單純按下 delete 通常不足以證明資料已安全銷毀。

常見方法：

- 加密刪除

- 銷毀加密金鑰

- 覆寫

- 符合標準的清除流程

- 實體媒體銷毀

- 取得銷毀證明

判斷關鍵字：

- cannot be recovered

- secure deletion

- data destruction

- crypto shredding

- destroy encryption keys

考試陷阱：

- 一般刪除不等於安全銷毀。

- 資料到期可刪除，但遇到 legal hold 必須暫停刪除。

---

## 十四、常見情境題判斷表

|題目情境|最可能考點|判斷理由|
|---|---|---|
|政府要求取得雲端資料|Data sovereignty|政府依法律要求存取資料|
|資料指定存在日本或新加坡|Data residency|重點是資料存放地點|
|多國公司、客戶、資料中心牽涉爭議|Jurisdiction|重點是誰有法律管轄權|
|上市公司財務系統搬到雲端|SOX|財務資料、內部控制、稽核|
|雲端安全控制框架|CSA CCM|控制矩陣、控制清單|
|CSP 公開安全保證或登錄資訊|CSA STAR|信任、保證、第三方驗證|
|可能訴訟，暫停刪除資料|Legal hold|法律程序下保存資料|
|記錄誰取得證據、何時取得、如何保存|Chain of custody|證據可信度與完整性|
|使用保險降低資料外洩財務損失|Risk transfer|財務影響轉移|
|不使用高風險服務|Risk avoidance|避開風險活動|
|導入 MFA、加密、備份|Risk mitigation|降低風險可能性或影響|
|低風險問題經核准後不修|Risk acceptance|正式接受風險|
|控制前的風險|Inherent risk|before controls|
|控制後剩下的風險|Residual risk|after controls|
|uptime 99.9% 與 service credit|SLA|服務等級承諾|
|整體合約條款、付款、終止|MSA|主服務合約|
|HIPAA、PHI、醫療資料|BAA|商業夥伴協議|
|GDPR、個資處理、processor|DPA|資料處理協議|
|檢查 CSP 是否符合要求|Right to audit|合約保留稽核權|
|SOC 2 Type II|Audit assurance|一段期間內控制有效性|
|刪除後不可復原|Secure data destruction|安全銷毀|
|歐盟資料傳到非歐盟國家|Cross-border data transfer|跨境資料傳輸要求|

---

## 十五、常見易混淆比較

### 1. Data Residency vs Data Sovereignty

|比較項目|Data Residency|Data Sovereignty|
|---|---|---|
|核心問題|資料在哪裡|資料受哪國法律管|
|關鍵字|location, region, stored in|government, law, legal access|
|例子|資料存在歐盟區域|歐盟法律適用該資料|

---

### 2. Data Sovereignty vs Jurisdiction

|比較項目|Data Sovereignty|Jurisdiction|
|---|---|---|
|核心問題|資料受哪國法律管|哪個法院、政府或國家有權處理事件|
|焦點|資料本身|案件、爭議或法律程序|
|例子|某國法律允許政府要求存取資料|多國法院或監管機關爭議誰能處理案件|

考試版定義：

- Data sovereignty：資料受哪個國家的法律管。

- Jurisdiction：哪個國家、法院或政府機關有權處理這件事。

---

### 3. Legal Hold vs Right to be Forgotten

|比較項目|Legal Hold|Right to be Forgotten|
|---|---|---|
|核心|法律程序要求保存資料|資料本人要求刪除個資|
|方向|不可刪除|要求刪除|
|衝突時|通常 legal hold 優先|可能被法律保存義務限制|

---

### 4. CSA CCM vs CSA STAR

|比較項目|CSA CCM|CSA STAR|
|---|---|---|
|類型|控制框架|安全保證計畫|
|用途|評估雲端安全控制|展示 CSP 安全透明度|
|關鍵字|controls, matrix, framework|trust, assurance, registry|

---

### 5. SLA vs MSA

|比較項目|SLA|MSA|
|---|---|---|
|全名|Service Level Agreement|Master Service Agreement|
|重點|服務等級|整體合約條款|
|常見內容|uptime、回應時間、補償|付款、責任、終止、法律條款|

---

### 6. DPA vs BAA

|比較項目|DPA|BAA|
|---|---|---|
|全名|Data Processing Agreement|Business Associate Agreement|
|常見法規|GDPR|HIPAA|
|資料類型|個人資料|PHI|
|關鍵字|personal data, processor|healthcare, PHI, business associate|

---

### 7. Inherent Risk vs Residual Risk

|比較項目|Inherent Risk|Residual Risk|
|---|---|---|
|時間點|控制前|控制後|
|中文|固有風險 / 原始風險|殘餘風險|
|關鍵字|before controls|after controls, remaining risk|

---

## 十六、考試答題技巧

### 1. 先看題目關鍵字

CCSP Domain 6 題目常透過關鍵字引導答案。答題時可先圈出以下線索：

- 財務、上市公司、內部控制：SOX

- HIPAA、PHI、醫療：BAA

- GDPR、個資、processor：DPA

- uptime、99.9%、補償：SLA

- 整體條款、付款、終止：MSA

- 稽核權、檢查 CSP：Right to audit

- 第三方稽核、SOC 2、ISO 27001：Audit assurance

- 資料存放地點：Data residency

- 政府依法要求存取：Data sovereignty

- 法院、政府機關、多國爭議：Jurisdiction

- 暫停刪除：Legal hold

- 誰取得證據、何時取得：Chain of custody

---

### 2. 避免只用「技術答案」解法律合規題

Domain 6 題目常出現技術選項作為干擾，例如：

- Load balancing

- Auto scaling

- Data compression

- VM CPU 型號

- Container orchestration

若題目在問法律、合規、風險、證據或合約，通常應選治理、法律或合約相關選項，而非純技術選項。

---

### 3. 注意「best」題型

當題目問最佳做法時，通常應優先選擇：

- 符合法律與合規要求

- 保留證據

- 啟動正式流程

- 查看合約與責任分工

- 使用第三方稽核或正式驗證

- 避免未授權刪除或未記錄操作

---

## 十七、互動複習題庫

### 題目 1

一家公司把客戶資料放到雲端。後來政府要求調查這些資料。這最可能考哪個概念？

A. Load balancing  
B. Data sovereignty  
C. Container orchestration  
D. Auto scaling

答案：B  
解析：政府依法律要求調查或存取資料，核心是資料受哪個國家法律管，屬於 data sovereignty。

---

### 題目 2

公司要評估雲端服務商是否有完整安全控制，並希望對照一套雲端安全控制框架。這最可能考哪個概念？

A. SOX  
B. CSA CCM  
C. Data sovereignty  
D. Load balancing

答案：B  
解析：安全控制框架、控制矩陣、雲端安全檢查表對應 CSA CCM。

---

### 題目 3

上市公司把財務報表系統搬到雲端，但仍要確保財務資料可稽核、內部控制有效。這最可能考哪個概念？

A. SOX  
B. CSA STAR  
C. Data residency  
D. Chain of custody

答案：A  
解析：上市公司、財務資料、稽核、內部控制對應 SOX。

---

### 題目 4

公司想查看某雲端服務商是否有公開的安全保證資料、信任等級或第三方登錄資訊。這最可能考哪個概念？

A. SOX  
B. CSA STAR  
C. Legal hold  
D. Data residency

答案：B  
解析：安全保證、信任、登錄資訊、第三方驗證對應 CSA STAR。

---

### 題目 5

公司因為可能被告，所以必須暫停刪除相關雲端資料，即使資料原本已到保存期限。這最可能考哪個概念？

A. Data residency  
B. Legal hold  
C. SOX  
D. CSA CCM

答案：B  
解析：可能訴訟或調查導致暫停刪除資料，對應 legal hold。

---

### 題目 6

調查人員收集雲端日誌作為證據，必須記錄誰取得、何時取得、如何保存、是否被修改。這最可能考哪個概念？

A. Data sovereignty  
B. Chain of custody  
C. CSA STAR  
D. SOX

答案：B  
解析：記錄證據取得、保存與移交流程，目標是證明證據未被竄改，對應 chain of custody。

---

### 題目 7

公司想確認資料實際被存放在哪個國家或地區。這最可能考哪個概念？

A. Data sovereignty  
B. Data residency  
C. Chain of custody  
D. Legal hold

答案：B  
解析：資料實際存放地點對應 data residency。

---

### 題目 8

公司把資料存在某國雲端資料中心，但該國法律允許政府在特定情況下要求存取資料。這最可能考哪個概念？

A. Data residency  
B. Data sovereignty  
C. Load balancing  
D. CSA CCM

答案：B  
解析：政府依法律存取資料，核心是資料受哪國法律管，對應 data sovereignty。

---

### 題目 9

雲端客戶以為使用 CSP 後合規責任全部轉給 CSP。稽核員指出該想法錯誤。這最可能考哪個概念？

A. Shared responsibility  
B. Auto scaling  
C. Data residency  
D. Chain of custody

答案：A  
解析：雲端責任由客戶與 CSP 共同承擔，合規責任不能完全外包。

---

### 題目 10

公司購買網路安全保險，以降低資料外洩造成的財務損失。這屬於哪種風險處理？

A. Risk avoidance  
B. Risk mitigation  
C. Risk transfer  
D. Risk acceptance

答案：C  
解析：購買保險可將部分財務影響轉移出去，屬於 risk transfer。

---

### 題目 11

公司發現某雲端服務風險太高，因此決定不使用該服務。這屬於哪種風險處理？

A. Risk avoidance  
B. Risk mitigation  
C. Risk transfer  
D. Risk acceptance

答案：A  
解析：不做高風險活動，屬於 risk avoidance。

---

### 題目 12

公司知道某個低風險問題存在，但修補成本比可能損失還高，因此正式記錄後決定不修。這屬於哪種風險處理？

A. Risk avoidance  
B. Risk mitigation  
C. Risk transfer  
D. Risk acceptance

答案：D  
解析：經正式記錄與批准後接受低風險，屬於 risk acceptance。

---

### 題目 13

公司導入 MFA、加密與備份，來降低資料外洩或服務中斷的可能性與影響。這屬於哪種風險處理？

A. Risk avoidance  
B. Risk mitigation  
C. Risk transfer  
D. Risk acceptance

答案：B  
解析：加入控制降低風險可能性或影響，屬於 risk mitigation。

---

### 題目 14

尚未加入任何安全控制前，雲端系統原本的風險很高。這種控制前風險稱為什麼？

A. Residual risk  
B. Inherent risk  
C. Risk transfer  
D. Legal hold

答案：B  
解析：控制前的原始風險稱為 inherent risk。

---

### 題目 15

加入 MFA、加密與監控後，風險仍未完全消失。剩下的風險稱為什麼？

A. Inherent risk  
B. Residual risk  
C. Legal hold  
D. Chain of custody

答案：B  
解析：控制後剩下的風險稱為 residual risk。

---

### 題目 16

公司想確認 CSP 是否符合安全要求，要求查看 SOC 2 或 ISO 27001 等第三方稽核報告。這最可能考哪個概念？

A. Audit assurance  
B. Auto scaling  
C. Data sovereignty  
D. Legal hold

答案：A  
解析：第三方稽核報告與獨立驗證對應 audit assurance。

---

### 題目 17

公司想知道 CSP 的服務可用性承諾，例如每月 uptime 99.9% 與故障補償。這最可能對應哪個文件？

A. SLA  
B. SOX  
C. Legal hold  
D. Chain of custody

答案：A  
解析：uptime、服務可用性與補償對應 SLA。

---

### 題目 18

公司和 CSP 簽署大合約，定義整體服務條款、責任、付款與終止條件。這最可能對應哪個文件？

A. SLA  
B. MSA  
C. Legal hold  
D. CSA CCM

答案：B  
解析：整體服務條款、付款、責任與終止條件對應 MSA。

---

### 題目 19

醫療機構使用雲端服務處理病患資料。因受 HIPAA 管制，需要和雲端服務商簽署協議，要求服務商保護 PHI。這最可能對應哪個文件？

A. SLA  
B. MSA  
C. BAA  
D. CSA STAR

答案：C  
解析：HIPAA、PHI、醫療資料與 business associate 對應 BAA。

---

### 題目 20

公司和雲端服務商簽署協議，明確規定服務商如何處理個人資料，特別是為符合 GDPR。這最可能對應哪個文件？

A. SLA  
B. DPA  
C. BAA  
D. MSA

答案：B  
解析：GDPR、個人資料與資料處理要求對應 DPA。

---

### 題目 21

公司使用雲端服務。CSP 又找另一家公司協助處理資料。該另一家公司最可能是哪種角色？

A. Data subject  
B. Controller  
C. Processor  
D. Subprocessor

答案：D  
解析：processor 再找來協助處理資料的第三方稱為 subprocessor。

---

### 題目 22

公司決定為什麼收集客戶個資、要用來做什麼、要保存多久。該公司最可能是哪種角色？

A. Data subject  
B. Data controller  
C. Data processor  
D. Subprocessor

答案：B  
解析：決定資料處理目的與方式的角色是 data controller。

---

### 題目 23

雲端服務商依照客戶指示，幫忙儲存、處理與備份客戶個人資料。該雲端服務商最可能是哪種角色？

A. Data subject  
B. Data controller  
C. Data processor  
D. Subprocessor

答案：C  
解析：依 controller 指示處理資料的角色是 data processor。

---

### 題目 24

客戶要求公司刪除個人資料，因為不希望公司繼續保存。這最可能對應 GDPR 哪個概念？

A. Right to be forgotten  
B. Chain of custody  
C. SLA  
D. Risk transfer

答案：A  
解析：要求刪除個人資料對應 right to be forgotten。

---

### 題目 25

公司收到客戶刪除個資要求，但同一批資料正在被法院要求保留，因涉及訴訟調查。最佳做法為何？

A. 立刻刪除，因為客戶有 right to be forgotten  
B. 不刪除相關資料，因為 legal hold 優先  
C. 把資料搬到另一個國家  
D. 交給 CSP 自行決定

答案：B  
解析：legal hold 通常優先於一般刪除要求。

---

### 題目 26

公司發生資料外洩後，想知道多久內要通知主管機關或受影響客戶。最應先確認哪一項？

A. SLA  
B. 適用的法律與合規要求  
C. Auto scaling 設定  
D. 資料壓縮比例

答案：B  
解析：通知時限由法律、法規、合約與資料類型決定。

---

### 題目 27

雲端合約中需要明確規定 CSP 發生資料外洩時的通知時限與流程。這對應哪個概念？

A. Breach notification  
B. CPU 型號  
C. 螢幕解析度  
D. 壓縮格式

答案：A  
解析：資料外洩後的通知時限、流程與責任對應 breach notification。

---

### 題目 28

公司想保留檢查 CSP 是否遵守安全與合規要求的權利。合約中最應包含哪一項？

A. Right to audit  
B. Auto scaling  
C. Data compression  
D. Load balancing

答案：A  
解析：保留檢查與稽核 CSP 的權利對應 right to audit。

---

### 題目 29

公司取得 SOC 2 Type II 報告。該報告最主要能協助證明什麼？

A. CSP 控制在一段期間內有效運作  
B. CSP 永遠不會被攻擊  
C. 資料應該存在哪個國家  
D. 取代所有法律責任

答案：A  
解析：SOC 2 Type II 重點是一段期間內控制的 operating effectiveness。

---

### 題目 30

資料保留政策規定日誌保存一年後刪除，但刪除時必須確保資料不能被復原。這最可能考哪個概念？

A. Secure data destruction  
B. Data sovereignty  
C. SLA  
D. Risk transfer

答案：A  
解析：刪除後不可復原對應 secure data destruction。

---

### 題目 31

公司想把歐盟客戶資料傳到非歐盟國家處理。最需要先確認什麼？

A. Cross-border data transfer requirements  
B. Auto scaling 設定  
C. 壓縮格式  
D. VM 的 CPU 數量

答案：A  
解析：歐盟個資傳到非歐盟國家，需確認 GDPR 與跨境資料傳輸要求。

---

### 題目 32

公司使用雲端服務，但資料可能同時受到多個國家的法律影響，例如資料存在 A 國，客戶在 B 國，公司總部在 C 國。這最可能考哪個概念？

A. Jurisdiction  
B. Auto scaling  
C. Data compression  
D. Load balancing

答案：A  
解析：多國法律與管轄權問題對應 jurisdiction。

---

## 十八、最終速記表

|關鍵字|答案|
|---|---|
|財務、上市公司、內部控制|SOX|
|雲端安全控制矩陣|CSA CCM|
|安全保證、信任、登錄|CSA STAR|
|資料實際存放地點|Data residency|
|資料受哪國法律管|Data sovereignty|
|哪個法院或政府機關有權處理|Jurisdiction|
|訴訟或調查下暫停刪除|Legal hold|
|證據取得與保存紀錄|Chain of custody|
|電子資料法律開示|eDiscovery|
|控制前風險|Inherent risk|
|控制後剩餘風險|Residual risk|
|不做高風險活動|Risk avoidance|
|加控制降低風險|Risk mitigation|
|買保險|Risk transfer|
|記錄後接受風險|Risk acceptance|
|uptime、可用性、補償|SLA|
|整體服務條款|MSA|
|HIPAA、PHI|BAA|
|GDPR、個人資料處理|DPA|
|檢查 CSP 是否符合要求|Right to audit|
|SOC 2 Type II|一段期間內控制有效性|
|刪除後不可復原|Secure data destruction|
|歐盟資料傳到非歐盟|Cross-border data transfer|

---

## 十九、考前口訣

1. **資料在哪裡 = Residency**

2. **資料受誰法律管 = Sovereignty**

3. **誰有權處理案件 = Jurisdiction**

4. **訴訟來了先別刪 = Legal hold**

5. **證據可信靠保管鏈 = Chain of custody**

6. **財務內控找 SOX**

7. **雲端控制找 CSA CCM**

8. **雲端信任保證找 CSA STAR**

9. **服務等級找 SLA**

10. **主合約找 MSA**

11. **醫療 PHI 找 BAA**

12. **GDPR 個資處理找 DPA**

13. **控制前是 inherent，控制後是 residual**

14. **保險是 transfer，控制是 mitigation，不做是 avoidance，記錄接受是 acceptance**

---

## 二十、建議複習方式

1. 先背「最終速記表」。

2. 再練「常見情境題判斷表」。

3. 遇到題目時先圈關鍵字，不急著看選項。

4. 遇到技術選項時，先確認題目是否其實在問法律、合規、證據或合約。

5. 對易混淆詞進行對照記憶，例如 residency / sovereignty / jurisdiction，SLA / MSA，DPA / BAA。

---

# 附錄：Domain 6 高頻錯誤修正

| 易錯說法                              | 正確說法                               |
| --------------------------------- | ---------------------------------- |
| SLA = Service Legal Agreement     | SLA = Service Level Agreement      |
| MSA = Main Service Agreement      | MSA = Master Service Agreement     |
| DPA = Data Privacy Agreement      | DPA = Data Processing Agreement    |
| PHI = Personal Health Information | PHI = Protected Health Information |
| Data subject = 資料本身               | Data subject = 資料本人                |
| Data sovereignty = 資料中心層面         | Data sovereignty = 資料受哪國法律管        |
| Legal hold = 一般資料保存政策             | Legal hold = 訴訟、調查或法律程序下暫停刪除       |
| Chain of custody = 一般紀錄鏈          | Chain of custody = 證據保管鏈           |
| Risk mitigation = 馬上處理            | Risk mitigation = 降低風險可能性或影響       |
| SaaS 代表客戶沒有責任                     | SaaS 仍保留資料、使用者與合規責任                |