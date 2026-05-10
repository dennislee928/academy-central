# Domain 2 弱點總結（從錯題反推）

本講義由錯題反推高頻弱點，供複習與考場速查。

錯題集中於兩大核心：

### A) **資料角色與責任邊界（最主要弱點，P0）**

常見混淆包括：

- **Data Owner vs Data Custodian（保管員）**：誰「定義分類與政策」vs 誰「技術上管理／落地」
- **Data Steward（資料治理員） vs Data Controller**：誰「治理／品質／合規協調」vs 誰「決定處理目的與方式」
    
- **Controller vs Processor（GDPR）**：multi-cloud 下如何落實責任劃分（需 governance framework）
- **Shared Responsibility**：access control 多數情境由 **Cloud Customer** 負責 IAM／資料存取控制

> 本類題目為 Domain 2 的「骨架」；角色判斷錯誤易連帶影響 lifecycle、classification、IRM、audit 等題。

---

### 1. Data Steward（資料管家 / 資料治理員）

Data Steward 通常來自**業務部門（Business）**，他們最了解資料的意義、價值與使用場景。他們是資料的「業務守門員」。

- **核心焦點：** 資料的品質、意義、規則與合規性。
    
- **主要職責：**
    
    - 定義資料的標準與業務術語（Metadata）。
        
    - 制定資料存取政策（誰有權限看什麼資料）。
        
    - 確保資料品質（準確性、完整性、一致性）。
        
    - 處理資料相關的業務爭議與合規性（如 GDPR、個人資料保護法）。
        
- **常見身分：** 業務主管、資料分析師、特定業務流程的負責人。
    

---

### 2. Data Custodian（資料保管員 / 資料維護者）

Data Custodian 通常來自**資訊科技部門（IT）**，他們不一定關心資料裡面的具體業務數字，但他們必須確保這些資料安全、可用且存放妥當。

- **核心焦點：** 資料的儲存、安全、技術基礎設施與架構。
    
- **主要職責：**
    
    - 執行 Data Steward 制定的存取政策（設定系統權限）。
        
    - 負責資料庫的日常維運、效能調校。
        
    - 執行資料備份與災難復原計畫（Disaster Recovery）。
        
    - 實施資安防護技術（加密、防火牆、存取監控）。
        
- **常見身分：** 資料庫管理員（DBA）、系統管理員、資料工程師。

| **比較項目**  | **Data Steward (資料管家)** | **Data Custodian (資料保管員)** |
| --------- | ----------------------- | -------------------------- |
| **所屬領域**  | 業務端 (Business)          | 技術端 (IT)                   |
| **主要關注點** | 資料的「內容」與「品質」            | 資料的「儲存」與「安全」               |
| **職責性質**  | 制定規則、定義政策、業務邏輯          | 執行規則、系統維運、技術實作             |
| **經典問題**  | 「這筆資料代表什麼？誰可以看？」        | 「資料要存在哪個伺服器？如何加密？」         |
| **管理對象**  | 關心 Data (資料本身)          | 關心 Database (資料庫/系統)       |

### 簡單的比喻：圖書館與銀行

- **圖書館比喻：** Data Steward 就像是**圖書館長/編目員**，決定要進哪些書、書要怎麼分類、借閱規則是什麼；Data Custodian 則是**圖書館的 IT 人員或保全**，負責維護電子借閱系統不當機、確保書架堅固，以及防止書籍被偷。
    
- **銀行比喻：** Data Steward 就像是**銀行經理**，決定誰有資格開保險箱、裡面應該放什麼；Data Custodian 則是**金庫管理員/保全**，負責打造堅固的金庫大門、設定密碼鎖並定期巡邏。

---
### B) **資料去識別/遮罩/代碼化（P0）**

多次混淆：

- **Data Masking**（產生可用於測試/分析的替代資料；包含 substitution/shuffling/variance/nulling…）
    
- **Tokenization**（用 token 取代敏感值，**可透過 token vault 對應回原值**）
    
- **Anonymization**（去除識別資訊，理想上不可回推；要考慮 indirect identifiers）
    

---

## Domain 2 各小節加強點與 Priority

> Priority 建議：**P0=立即補強（高頻+基礎）**、**P1=次高（常考+已暴露弱點）**、**P2=後補**、**尚未考到=本次錯題未覆蓋**

### 2.1 Describe cloud data concepts

- **Data roles（Owner/Controller/Processor/Custodian/Steward/Subject）**：**P0**
    
    - 易錯點：Owner vs Custodian、Steward vs Controller、Controller/Processor 責任劃分、shared responsibility 下 access control 主責
        
- **Cloud data life cycle phases（Create/Store/Use/Share/Archive/Destroy）**：**P1**
    
    - 易錯點：**Retention/Archive**概念題、**Destroy phase**對應的作法（cryptographic erasure）
        
- CIA triad / Authenticity / Non-repudiation：**尚未考到**
    
- Data dispersion / Data flows / DFD：**尚未考到**
    

### 2.2 Design and implement cloud data storage architectures

- **尚未考到**（附件沒有 storage 架構/威脅類題目）
    

### 2.3 Design and apply data security technologies and strategies

- **Data obfuscation / masking 技術細節（含 shuffling/substitution）**：**P0**
    
    - 易錯點：把「可用於測試的假資料」誤認為 anonymization；把 shuffling 誤認為 substitution
        
- **Tokenization vs Masking 的使用情境與可逆性**：**P0**
    
    - 易錯點：把 tokenization 題選成 masking
        
- DLP（Discovery/Monitoring/Enforcement）與監控點（in-motion/in-use/at-rest）：**尚未考到**
    
- Encryption/Hashing/Key management：**本次不在截圖錯題中（尚未考到）**
    

### 2.4 Implement data discovery

- Structured / Unstructured / Semi-structured、Data location/jurisdiction：**尚未考到**
    

### 2.5 Plan and implement data classification

- **Classification policy 誰決定（Owner）**：**P1**
    
    - 易錯點：「決定分類與政策」的主責角色判斷
        
- Data labeling / security label vs marking / metadata：**尚未考到**
    
- Data mapping：**尚未考到**
    

### 2.6 Design and implement IRM

- **Provisioning / Access models（least privilege 如何跨 IaaS/PaaS/SaaS 一致落地）**：**P1**
    
    - 易錯點：multi-cloud 下選「各自做 RBAC」而不是「centralized IAM / 統一治理」
        
- IRM vs DRM、IP 類型、Certificates in IRM：**尚未考到**
    

### 2.7 Data retention, deletion and archiving

- **Destroy phase / media sanitization / cryptographic erasure（cryptoshredding）**：**P1**
    
    - 易錯點：Destroy phase 的最佳作法選成 audit
        
- Retention vs Archive 的定位、Legal hold：**P1（retention/archiving 題已出現）**
    

### 2.8 Auditability, traceability and accountability of data events

- Logging / SIEM / chain of custody / non-repudiation：**尚未考到**
    

---

## 建議補強順序：高投報三包（依序）

### P0-1：Data Roles 責任矩陣（背定 + 情境判斷）

用一句話區分（考場超常用）：

- **Owner/Controller：定義目的、政策、分類、責任歸屬**
    
- **Custodian：技術落地（備份、存取、容量、可用性）**
    
- **Steward：治理/品質/合規協調（跨部門、全生命週期落實）**
    
- **Processor：受託處理資料（通常是 CSP / SaaS）**
    
- **Customer vs Provider（shared responsibility）：資料存取控制/IAM 多數由 Customer 主責**
    

### P0-2：Masking vs Tokenization vs Anonymization（一定要拉開）

- **Masking**：為了可用性（測試/分析），產生「看起來像真的」的替代值（含 shuffling/substitution）
    
- **Tokenization**：用 token 代替敏感值，**可映射回原值（token vault）**，常見於 PCI
    
- **Anonymization**：目標是不可回推個資（要考慮 indirect identifiers）
    

### P1-3：Lifecycle（尤其 Archive / Destroy）＋ Cloud 下可行的刪除策略

- **Archive**：長期保存/符合法規保留（retention）＋取回成本/可用性
    
- **Destroy**：雲上無法物理粉碎 → 常用 **cryptographic erasure / cryptoshredding**
---
### 錯題分佈（以每題的「主要考點 section」歸類）

**總錯題：11 題**

|Domain 2 section|命中錯題數|錯題占比（在 11 題內）|重要度(1-5)*|風險分數（命中×重要度）|Priority|對應錯題|
|---|---|---|---|---|---|---|
|**2.1 Cloud data concepts**|**4**|**36.4%**|5|**20**|**P0**|Q6, Q8, Q10, Q11|
|**2.3 Data security tech/strategy**|**3**|**27.3%**|5|**15**|**P0**|Q1, Q2, Q4|
|**2.7 Retention / deletion / archiving**|**2**|**18.2%**|4|**8**|**P1**|Q3, Q9|
|**2.5 Data classification**|1|9.1%|4|4|**P1**|Q5|
|**2.6 IRM**|1|9.1%|4|4|**P1**|Q7|
|2.2 Storage architectures|0|0%|3|0|尚未考到|—|
|2.4 Data discovery|0|0%|3|0|尚未考到|—|

---
## 錯題詳解

### Q1（2.3 Data obfuscation/masking）

**題目：**「哪種資料混淆方法會把原始資料改值/打亂，在不暴露敏感資料的情況下做測試或分析？」

- **正解：Data Masking**
    
- **常見誤選：** Anonymization
    

**正解說明：Masking**

- **Masking 的核心目的＝“可用”**：讓資料看起來像真的、仍可測試/分析（格式、分佈、統計特性可保留），但不是真值。
    

**誤選說明（常見陷阱）**

- **Anonymization 的核心目的＝“不可回推個體”**：重點在移除識別性（direct/indirect identifiers），不一定保留可用的真實分佈或格式。
    

**考場口訣**

- **Masking = 用來「測試/開發/分析」**
    
- **Anonymization = 用來「隱私/去識別」**
    

---

### Q2（2.3 Data masking techniques）

**題目：**「把資料值在 dataset 內重新排列，隱藏模式但保留整體特性（避免重新識別）」

- **正解：Shuffling**
    
- **常見誤選：** Static Substitution
    

**正解說明：Shuffling**

- **Shuffling = 重新排列（permutation）**：把同欄位的值打散交換，**保留值集合/分佈**，但破壞個體對應關係（降低 re-identification）。
    

**Static Substitution 誤選說明**

- **Substitution = 替換成別的值（常是“看似真實的假值”）**：重點是換值，不是重新排列原值。
    

**考場辨識點**

- 看到「reorganize / reorder / rearrange values」＝**Shuffling**
    
- 看到「replace with realistic fake values」＝**Substitution**
    

---

### Q3（2.7 Retention + lifecycle / 2.1 lifecycle cross）

**題目：**「雲端資料生命週期中，哪個 phase 透過 retention policies 來確保合規？」

- **正解：Archive**
    
- **常見誤選：** Store
    

**正解說明：Archive**

- **Archive phase = 長期保存/保留**（符合法規保留年限、保留可取回性、通常是低成本冷儲存）。
    
- Retention policy 的典型落點就是「何時進 archive、保留多久、何時銷毀」。
    

**Store 誤選說明**

- Store 是把資料寫入/持久化到儲存系統；retention 是**資料管理政策**（保留/歸檔/到期）更貼近 Archive。
    

**考場口訣**

- **Retention 合規 → Archive**
    
- **寫入保存 → Store**
    

---

### Q4（2.3 Tokenization）

**題目：**「用非敏感替代值取代敏感資料，仍能做某些操作且不暴露真值」

- **正解：Tokenization**
    
- **常見誤選：** Data Masking
    

**正解說明：Tokenization**

- Tokenization 用 token 取代敏感值，**可透過 token vault / tokenization system 對回原值**（受控可逆）。
    

**Masking 誤選說明**

- Masking 多數情境是**不可逆或不設計成可回推**，重點是可用性（測試/分析），不是受控映射回真值。
    

**秒殺辨識法**

- 看到「token / substitute identifier / map back / vault」＝**Tokenization**
    
- 看到「test data / altered values / scrambled」＝**Masking**
    

---

### Q5（2.5 Classification policies / roles cross）

**題目：**「誰決定資料分類等級，並制定保護政策？」

- **正解：Cloud Data Owner**
    
- **常見誤選：** Cloud Data Custodian
    

**正解說明：Owner**

- **Owner（或 Controller）= accountable + 定義政策/分類/風險接受**（“決策權”）。
    

**Custodian 誤選說明**

- **Custodian = 技術落地**（備份、存取機制、容量、可用性、restore），不是決策者。
    

**口訣**

- **Owner 決定（policy/classification）**
    
- **Custodian 執行（technical controls）**
    

---

### Q6（2.1 Lifecycle concepts in cloud-edge）

**題目：**「智慧城市 IoT + cloud-edge 生態下，傳統 data roles 哪個面向需要最大調整來因應新安全挑戰？」

- **正解：Data lifecycle management across distributed environments**
    
- **常見誤選：** Implementation of edge-specific access controls
    

**正解說明：lifecycle management**

- cloud-edge 讓資料從 **create → store → use → share → archive → destroy** 分散在裝置、邊緣、雲端、多供應商。
    
- 真正難的是：**可視性、治理一致性、保留/刪除落地、資料流向/責任切割**，而不只是 edge 做 RBAC。
    

**誤選說明：為何不夠「最主要」**

- edge access control 是其中一個 control；題目問的是「data roles」在新生態需要最大調整的面向，答案更偏 governance/lifecycle。
    

**考場提示**

- 看到「IoT / distributed / edge + cloud」且問 “roles adaptation” → 通常指 **governance + lifecycle end-to-end**
    

---

### Q7（2.6 IRM / access governance）

**題目：**「多雲 + IaaS/PaaS/SaaS，如何一致且可擴展地落實 least privilege？」

- **正解：Centralized IAM with adaptive access controls**
    
- **常見誤選：** 每個服務模型各自做 RBAC
    

**正解說明：centralized IAM**

- 多雲/多模型若各自 RBAC：政策分裂、審計困難、Joiner/Mover/Leaver 風險上升。
    
- **Centralized IAM**（IdP/SSO/政策引擎）才能統一：
    
    - 身份生命週期
        
    - 權限模型與審計
        
    - 動態條件（device posture / location / risk）
        

**誤選說明**

- 分散 RBAC = 可行但不可控、不可擴展、難以保證一致 least privilege。
    

**口訣**

- **Multi-cloud least privilege → Central policy + Central identity**
    

---

### Q8（2.1 Data roles: stewardship）

**題目：**「跨整個資料生命週期（create 到 delete）監督資料安全責任的是誰？」

- **正解：Data Steward**
    
- **常見誤選：** Data Controller
    

**正解說明：Data Steward**

- **Steward = governance/quality/compliance 的“日常監督者與協調者”**，確保流程、標準、metadata、使用合規在全生命周期落地。
    

**Controller 誤選說明**

- Controller（GDPR）偏向 **決定處理目的/方式** 的法律角色；不等於負責日常端到端治理與品質/合規營運。
    

**記憶法**

- **Controller = 決定“為什麼/怎麼處理”**
    
- **Steward = 確保“整個生命週期都照規矩跑”**
    

---

### Q9（2.7 Destroy / sanitization）

**題目：**「Destroy phase 在 shared responsibility 下，最能解決雲端資料銷毀挑戰的方法？」

- **正解：Cryptographic erasure（cryptoshredding）**
    
- **常見誤選：** Regular third-party security audits
    

**正解說明：cryptographic erasure**

- 雲上通常**碰不到實體媒體**，很難用 shred/incinerate。
    
- 最可控方式是：**資料先加密**，到期/需銷毀時**安全清除金鑰** → 即使殘留 bit 也不可讀。
    

**Audit 誤選說明**

- Audit 是治理/驗證手段，不是「銷毀機制」。
    

**秒殺辨識**

- 看到「Destroy phase + cloud + cannot physically destroy」→ **cryptoshredding**
    

---

### Q10（2.1 Roles + shared responsibility implication）

**題目：**「shared responsibility model 下，誰主要負責實作與管理雲端資料的 access control？」

- **正解：Cloud service customer**
    
- **常見誤選：** Provider & customer 共同負責
    

**正解說明：customer**

- 多數雲模型中：
    
    - Provider 負責平台/基礎設施安全（底層）
        
    - **Customer 負責資料與其存取權限（IAM/ACL/資料面控制）**  
        題目問的是 **data access controls**，通常落在 customer。
        

**誤選說明（常見陷阱）**

- shared responsibility 不是「每一件事都共同」；要看 control 類型。資料存取控制通常屬於 customer 的責任區。
    

**口訣**

- **Your data, your access = customer**
    

---

### Q11（2.1 Roles + governance: Controller vs Processor）

**題目：**「多雲下要清楚劃分 Controller/Processor 並確保 GDPR 合規，最有效策略？」

- **正解：Centralized data governance framework with defined roles/responsibilities**
    
- **常見誤選：** 為每個雲服務做一份責任矩陣
    

**正解說明：governance framework**

- 責任矩陣是產物（artifact），但沒有治理框架就會：
    
    - 版本漂移（不同 BU / 不同供應商）
        
    - 沒有一致的 RACI、流程、批准機制、例外處理
        
    - 很難持續維運
        
- **Central governance framework** 才是能長期運作的系統：定義角色、流程、標準、稽核節點、合約/DPAs 的落地方式。
    

**誤選說明**

- matrix 是必要但不足；題目問「most effectively」，答案選能系統化、可維運的治理機制。
    

**考場口訣**

- 看到「multi-cloud + GDPR + delineate responsibilities」→ **governance framework（含流程+角色+契約落地）**
    

---

## 建議複習順序（對應 P0/P1）

### P0（優先）

1. **2.1 Roles/責任邊界**：Owner/Controller/Processor/Custodian/Steward + shared responsibility 在 data access 的落點
2. **2.3 三分法**：Masking vs Tokenization vs Anonymization（含 shuffling/substitution 關鍵字辨識）

### P1（次之）

3. **2.7 Archive/Destroy + cryptoshredding**（雲端刪除高頻考點）
4. **2.6 Least privilege 的 centralized IAM 模式**
5. **2.5 classification policy（Owner）**