# CCSP 模擬測驗講義：兩日錯題精華

> **講義類型：** 跨域錯題精華／考前收斂  
> **適用領域：** 以 Domain 2 為主，並涵蓋 D1 責任邊界、D3 供應鏈、D5 組態維護、D6 標準與報告  
> **題型標記：** `[K]` 必背知識；`[T]` 術語邊界；`[J]` 情境判斷  
> **使用方式：** 依主題讀概念對照表，再做各節自我提問。最後一章五條 Rules 必須能閉卷複述。

---

## 本講義架構

1. Cloud Secure Data Lifecycle  
2. Discovery／Metadata／Classification／DLP／IRM  
3. Cloud Storage  
4. Data Destruction／Crypto-Erasure  
5. PCI DSS／Data Handling  
6. Responsibility／Accountability  
7. Supply Chain／Third-Party Risk  
8. BC/DR 與 Interoperability  
9. BIA／Asset Value  
10. Cloud Sprawl  
11. Configuration Management（D5）  
12. Hardening → Patch → Maintenance  
13. Standards／Reports 邊界  
14. 兩日復現弱點  
15. 考前五條 Rules

---

## 1. Cloud Secure Data Lifecycle

### Q1

資料一建立時，最早應執行哪項治理活動？

**答案：Classification**

**分類：[K]**

### 邏輯

Cloud Secure Data Lifecycle：

**Create → Store → Use → Share → Archive → Destroy**

Classification 應在 **Create** 階段盡早完成，因為後續的：

- encryption
    
- access control
    
- DLP
    
- retention
    
- sharing restrictions
    
- destruction
    

都可能依賴 classification。

### 必背

**C-S-U-S-A-D**

> Create → Store → Use → Share → Archive → Destroy

---

### Q2

在 `Share` 之前是哪一個 lifecycle phase？

**答案：Use**

**分類：[K]**

### 邏輯

Encryption、tokenization、DLP 都是 **controls**，不是 lifecycle phase。

看到題目混入：

- Encrypt
    
- Protect
    
- Validate
    

這類動詞時要先問：

> 它是 lifecycle phase，還是 security control？

---

# 2. Discovery / Metadata / Classification / DLP / IRM

這是目前最值得優先修補的 D2 cluster。

## Q3

「自動附加到資料，用來描述資料本身的資訊」最接近什麼？

**答案：Metadata**

**分類：[T]**

### 邏輯

**Metadata**  
= data about data

例如：

- creation time
    
- author
    
- file type
    
- location
    
- owner
    
- schema
    

**Label / Tag**  
則通常是刻意附加的分類或治理標誌，例如：

- Confidential
    
- Internal
    
- PII
    
- Restricted
    

### 快速區分

|概念|問的問題|
|---|---|
|Metadata|「關於這份資料，有哪些描述資訊？」|
|Label|「這份資料被標記成什麼？」|
|Classification|「這份資料有多敏感？」|
|Discovery|「資料在哪裡？內容是什麼？」|

---

## Q4

哪一類控制可以依內容辨識敏感資料，並監控或阻止資料外流？

**答案：DLP**

**分類：[K]**

### 邏輯

DLP 的典型流程：

**Discover → Inspect → Match/Classify → Monitor → Alert/Block**

可能部署於：

- Endpoint
    
- Network
    
- Cloud/SaaS
    

不要把 DLP 固定理解成「一定是 endpoint agent」。

---

## Q5

IRM / DRM 和 DLP 最大差異是什麼？

**答案：IRM 控制授權使用方式；DLP 偏向偵測與阻止資料不當流動。**

**分類：[T]**

### IRM / DRM

即使使用者合法拿到檔案，仍可限制：

- view
    
- copy
    
- print
    
- forward
    
- expiration
    

### DLP

關心：

> 「這個敏感資料正在去哪裡？」

### 記法

> **DLP = movement**
> 
> **IRM = usage rights**

---

# 3. Cloud Storage

## Q6

VM 看見一個邏輯磁碟裝置，但實體 storage 不一定和 compute node 位於同一設備，這通常是？

**答案：Volume / Block Storage**

**分類：[T]**

### 邏輯

### Volume / Block

對主機呈現：

> disk / volume / blocks

### Object Storage

對應：

> Object + Metadata + Identifier

通常透過 API 存取。

### CDN

目的主要是：

> cache / distribute content closer to consumers

CDN 不是 generic attached storage volume。

---

# 4. Data Destruction / Crypto-Erasure

這是連續兩天出現的 recurring topic。

## Q7

為什麼 traditional overwrite 在 cloud 中可能無法提供可靠 sanitization？

**答案：Customer 通常無法直接控制底層實體媒體，而且資料可能存在 snapshots、replicas 或 backups。**

**分類：[K]**

### 邏輯

Traditional environment：

**Customer → Physical Media**

Cloud：

**Customer → Logical abstraction → CSP storage infrastructure**

所以 customer 未必能指定：

> 「覆寫這一個實體 sector。」

---

## Q8

Physical destruction 和 cryptographic erasure 哪一個一定比較安全？

**答案：不能脫離 scenario 判斷。**

**分類：[J]**

### 判斷法

如果：

**自己控制實體媒體 + media retirement**

→ physical destruction 可以是極強的 destruction method。

如果：

**cloud / virtualized / logical storage**

→ customer 往往無法 physically destroy provider media。

此時：

> encryption + destruction of the relevant cryptographic key

可能是實際可行的方法。

### 不要背

> Physical destruction 永遠最好。

也不要背：

> Crypto-shredding 永遠最好。

### CCSP 做法

先問：

> **Who controls the physical media?**

---

# 5. PCI DSS / Data Handling

## Q9

PCI DSS 中，交易授權後不能保留的典型 sensitive authentication data 是什麼？

**答案：CVV / CVC**

**分類：[K]**

### 不要和 PAN 混淆

**PAN**  
可以在符合保護要求下儲存。

**CVV/CVC**  
屬 sensitive authentication data，處理限制更嚴格。

### Terminology

PCI DSS 是：

> **industry security standard**

不是政府 statute/regulation 本身。

---

# 6. Responsibility / Accountability

這是今天 Mixed test 最重要的新 weakness。

## Q10

企業把 PII 放在 CSP，若 CSP 發生 breach，誰的 accountability 就此消失？

**答案：沒有。Customer / data owner/controller 仍不能單純把 accountability outsource 掉。**

**分類：[J]**

### 核心 CCSP 原則

> **Responsibility can be shared or delegated.  
> Accountability usually remains with the accountable organization / data owner / controller.**

不要看到：

> CSP caused the incident

就自動選：

> CSP has all responsibility.

---

## Q11

在典型 privacy processing 關係中，誰較可能代表 customer 處理資料？

**答案：Processor**

**分類：[T]**

簡化模型：

**Controller**  
決定：

> why + how personal data is processed

**Processor**  
依 controller 指示：

> processes data

Cloud provider 在很多架構中可能扮演 processor / subprocessor。

但實際角色仍依 processing relationship 決定。

---

## Q12

Access control criteria 最終應主要源自什麼？

**答案：Organizational policy / business requirements**

**分類：[J]**

### 層次

External requirements：

- law
    
- regulation
    
- contractual requirements
    
- standards
    

↓

轉換成：

**organizational policies**

↓

再轉換成：

- technical controls
    
- IAM
    
- ACL
    
- configuration
    

所以題目問：

> 「誰決定 organization 的 access criteria？」

通常不是直接回答 ISO/NIST。

而是：

> organization 根據適用要求制定 policy。

---

# 7. Supply Chain / Third-Party Risk

## Q13

評估 CSP 時，除了 CSP 自己的 security posture，還需要關注什麼？

**答案：CSP 所依賴的 third parties / subprocessors / supply chain。**

**分類：[J]**

### 邏輯

實際架構可能是：

**Customer  
↓  
CSP  
↓  
Subprocessor  
↓  
Another service**

所以：

> CSP secure ≠ entire service chain secure

這是典型 **concentration / dependency / supply-chain risk** reasoning。

---

# 8. BC/DR + Interoperability

## Q14

Production 在 CSP-A，backup 在 CSP-B。Recovery 最大技術風險之一是什麼？

**答案：Interoperability / proprietary format incompatibility**

**分類：[J]**

### 為什麼不是先選 Vendor Lock-in？

Vendor lock-in 是更廣義風險。

但 scenario 的 immediate objective 是：

> **Can CSP-B's backup actually restore into the recovery environment?**

所以更直接的是：

- proprietary format
    
- incompatible APIs
    
- unsupported image format
    
- different storage representation
    

### ISC2 exam heuristic

> **選最直接阻礙 scenario objective 的答案。**

不要總是選範圍最大的風險。

---

# 9. BIA / Asset Value

## Q15

Business requirements 能幫助識別 asset，但哪些東西不一定能只靠客觀 technical inventory 得到？

**答案：Business usefulness / value / criticality**

**分類：[K]**

### Asset inventory 回答

> What do we have?

BIA 回答：

> What matters most?

包括：

- criticality
    
- business impact
    
- dependencies
    
- acceptable downtime
    
- business value
    

技術資產清單本身無法完整回答 business importance。

---

# 10. Cloud Sprawl

## Q16

Cloud sprawl 除了 compute/storage consumption，還可能產生哪類容易被忽略的成本？

**答案：Software licensing**

**分類：[K]**

### 邏輯

新增：

- VM
    
- database instance
    
- commercial OS
    
- security appliance
    
- enterprise software
    

可能同時增加：

- license count
    
- subscription fee
    
- support cost
    
- management overhead
    

因此：

> Cloud sprawl ≠ only infrastructure bill.

---

# 11. Configuration Management / D5

## Q17

下列哪一項不是 configuration maintenance 本身？

**答案：Social engineering**

**分類：[T]**

### Configuration maintenance 包含

- baseline
    
- configuration changes
    
- patching
    
- version control
    
- configuration validation
    
- deviation management
    
- documentation
    

Social engineering 屬：

> human-layer attack/testing activity

不是 configuration maintenance。

---

## Q18

Baseline deviation 應怎麼處理？

**答案：Document → assess → authorize/remediate → update baseline if legitimate**

**分類：[J]**

### 不要做

> 發現 deviation → 直接改回去

因為 deviation 可能是：

- approved change
    
- emergency change
    
- unauthorized change
    
- drift
    
- compromise
    

所以先判斷。

---

# 12. Hardening → Patch → Maintenance

## Q19

為什麼 production patch 不應看到更新就直接部署？

**答案：需要測試 compatibility、availability impact 與 change risk。**

**分類：[J]**

典型流程：

**Identify → Evaluate → Test → Approve → Deploy → Validate**

注意：

> Vendor guidance 很重要，但 vendor 不是組織的 risk owner。

---

## Q20

Host 進入 maintenance 前，cluster environment 通常首先要做什麼？

**答案：Move/drain workload 或確保服務仍由其他節點承載。**

**分類：[J]**

Mental model：

**HA  
→ migrate/drain  
→ maintenance mode  
→ patch/change  
→ validate  
→ return to service**

---

# 13. Standards / Reports：只記正確邊界

## SOC Reports

### SOC 2

詳細 controls / assurance information，通常 restricted use。

### SOC 3

較高階、一般公開使用。

不要死背：

> Cloud customer 一定最常收到 SOC 3。

題目必須看：

- public availability?
    
- detailed controls?
    
- auditor assurance?
    
- restricted distribution?
    

---

## FIPS

不要只背：

> FIPS 140-2

現在應知道：

**FIPS 140-2 = legacy**

**FIPS 140-3 = current generation**

考試若出舊 terminology，理解歷史即可，不要因此建立錯誤的新知識模型。

---

# 14. 兩日最重要的 recurring weaknesses

## Priority 1 — D2 Data Security

必須一次切清：

**Metadata  
≠ Label  
≠ Classification  
≠ Discovery  
≠ DLP  
≠ IRM**

---

## Priority 2 — Data Lifecycle

必須秒答：

**Create → Store → Use → Share → Archive → Destroy**

---

## Priority 3 — Data Destruction

每次先問：

> Who controls physical media?

再判斷：

- overwrite
    
- crypto-erasure
    
- physical destruction
    

---

## Priority 4 — Responsibility / Accountability

每題先問：

1. Who owns the data?
    
2. Who defines policy?
    
3. Who accepts risk?
    
4. Who operates the control?
    
5. Who remains accountable?
    

---

## Priority 5 — ISC2 Scenario Logic

看到兩個答案都合理時：

> **選最直接解決題目所問 business/security objective 的答案。**

例如：

BC/DR restore 問題：

`interoperability`

比：

`generic vendor lock-in`

更直接。

---

# 15. 考前五條 Rules

### Rule 1

**Control ≠ Lifecycle phase**

### Rule 2

**Responsibility can move; accountability usually does not disappear**

### Rule 3

**Data classification drives controls**

### Rule 4

**Cloud abstraction changes destruction and ownership assumptions**

### Rule 5

**ISC2 often wants the governance/root-cause answer, not the most technical answer**