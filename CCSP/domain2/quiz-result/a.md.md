## Domain 2 弱點總結（從錯題反推）

錯題集中在兩個核心：

### A) **資料角色 / 責任邊界（最主要弱點，P0）**

多次混淆：

- **Data Owner vs Data Custodian**（誰「定義分類與政策」vs 誰「技術上管理/落地」）
    
- **Data Steward vs Data Controller**（誰「治理/品質/合規協調」vs 誰「決定處理目的/方式」）
    
- **Controller vs Processor（GDPR）**在 multi-cloud 下如何落實責任劃分（需要 governance framework）
    
- **Shared Responsibility 下 access control 是誰的責任**（多數情境：**Cloud Customer**負責 IAM/資料存取控制）
    

> 這類題目是 Domain 2 的「骨架」。角色一錯，後面 lifecycle、classification、IRM、audit 題都會被帶歪。

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
    
    - 錯在：Owner vs Custodian、Steward vs Controller、Controller/Processor 責任劃分、shared responsibility 下 access control 主責
        
- **Cloud data life cycle phases（Create/Store/Use/Share/Archive/Destroy）**：**P1**
    
    - 錯在：**Retention/Archive**概念題、**Destroy phase**對應的作法（cryptographic erasure）
        
- CIA triad / Authenticity / Non-repudiation：**尚未考到**
    
- Data dispersion / Data flows / DFD：**尚未考到**
    

### 2.2 Design and implement cloud data storage architectures

- **尚未考到**（附件沒有 storage 架構/威脅類題目）
    

### 2.3 Design and apply data security technologies and strategies

- **Data obfuscation / masking 技術細節（含 shuffling/substitution）**：**P0**
    
    - 錯在：把「可用於測試的假資料」誤認為 anonymization；把 shuffling 誤認為 substitution
        
- **Tokenization vs Masking 的使用情境與可逆性**：**P0**
    
    - 錯在：把 tokenization 題選成 masking
        
- DLP（Discovery/Monitoring/Enforcement）與監控點（in-motion/in-use/at-rest）：**尚未考到**
    
- Encryption/Hashing/Key management：**本次不在截圖錯題中（尚未考到）**
    

### 2.4 Implement data discovery

- Structured / Unstructured / Semi-structured、Data location/jurisdiction：**尚未考到**
    

### 2.5 Plan and implement data classification

- **Classification policy 誰決定（Owner）**：**P1**
    
    - 錯在：「決定分類與政策」的主責角色判斷
        
- Data labeling / security label vs marking / metadata：**尚未考到**
    
- Data mapping：**尚未考到**
    

### 2.6 Design and implement IRM

- **Provisioning / Access models（least privilege 如何跨 IaaS/PaaS/SaaS 一致落地）**：**P1**
    
    - 錯在：multi-cloud 下選「各自做 RBAC」而不是「centralized IAM / 統一治理」
        
- IRM vs DRM、IP 類型、Certificates in IRM：**尚未考到**
    

### 2.7 Data retention, deletion and archiving

- **Destroy phase / media sanitization / cryptographic erasure（cryptoshredding）**：**P1**
    
    - 錯在：Destroy phase 的最佳作法選成 audit
        
- Retention vs Archive 的定位、Legal hold：**P1（retention/archiving 題已出現）**
    

### 2.8 Auditability, traceability and accountability of data events

- Logging / SIEM / chain of custody / non-repudiation：**尚未考到**
    

---

## 現在最該補的 3 個「高投報」補強包（照順序）

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