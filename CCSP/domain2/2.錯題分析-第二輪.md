# Domain 2 錯題分析講義（第二輪）

## 錯題核心集中點

- **2.2 Cloud data storage architectures**：佔已提供錯題的 **4/6 = 66.7%** → 這次的 **P0**
    
- **2.1 Data roles（Data Steward）**：1/6 → **P1**
    
- **2.6 Access models（ABAC）**：1/6 → **P1**
- 
---

# 精準量化（命中幾題 / 錯題占比 / P0-P1 權重）

以下用「**命中錯題數 × 重要度**」當風險分數（越高越先補）  
重要度用：2.1=5、2.2=4、2.6=4（Domain2常考/骨幹程度）

|Domain 2 section|命中錯題數（n=6）|錯題占比|重要度|風險分數|Priority|覆蓋到的題目|
|---|---|---|---|---|---|---|
|**2.2 Storage architectures**|**4**|**66.7%**|4|**16**|**P0**|Q-EncGranularity / Q-SDS / Q-ObjVsBlock / Q-Residency|
|**2.1 Cloud data concepts**|1|16.7%|5|5|P1|Q-DataSteward|
|**2.6 IRM / Access models**|1|16.7%|4|4|P1|Q-ABAC|
|2.3 Data security tech/strategy|0|0%|5|0|尚未考到|—|
|2.4 Data discovery|0|0%|3|0|尚未考到|—|
|2.5 Data classification|0|0%|4|0|尚未考到|—|
|2.7 Retention/Deletion/Archiving|0|0%|4|0|尚未考到|—|
|2.8 Auditability/Traceability|0|0%|3|0|尚未考到|—|

---

## C) 每個錯題詳解

## 1) 個別 data elements 的最細粒度「靜態加密」選哪種 storage？

**題意**：在儲存方案中，對「個別資料元素／物件」達成更細的 at-rest 加密粒度時，應選何種儲存類型？

- **正解：Object storage**
    
- **常見誤選：** Hybrid storage
    

### 正解說明：Object storage

- 典型 object storage（概念層面）支援**物件層級**（per-object）：
    
    - 物件層級 policy/ACL
        
    - per-object encryption（或至少可做到每個 object 使用不同 key/不同 encryption context 的管理模式）
        
- 對比 block/file 通常落在**volume / filesystem / share** 層級更常見。
    

### 誤選說明：Hybrid

- **Hybrid storage**不是一個「天然提供更細加密粒度」的 storage type；它只是組合/部署形態，粒度取決於底層用的 object/file/block。
    

**考場關鍵字**

- 看到「**individual object / per-object / granular at-rest controls**」→ **Object storage**
## 2) SDS（Software-Defined Storage）最關鍵的安全風險是什麼？

- **正解：Vulnerability of the control plane to unauthorized access**
    
- **常見誤選：** Risk of performance degradation due to centralized management
    

### 正解說明：Control Plane

- SDS 的核心是「**控制面**（orchestration/management）」與「資料面」分離。
    
- **控制面一旦被入侵**，攻擊者通常能：
    
    - 重新掛載/複製 volume、建立 snapshot、調整 replication、改 policy  
        → 直接擴大成 **全面性資料曝露/破壞**（CIA 都會中）
        

### 誤選說明：效能退化

- 效能是風險，但不一定是**最嚴重的安全風險**；題目問 “most critical security concern” 通常選「被接管後的爆炸半徑最大」那個。
    

**考場口訣**

- SDS / SDN 這類「software-defined」題：  
    **Control plane compromise = catastrophe**


## 3) Object storage 相對 Block storage 的主要「資料安全」優勢？

- **正解：Object storage supports finer-grained access control**
    
- **常見誤選：** Object storage implements automatic data classification
    

### 正解說明：finer-grained access control

- object storage 的存取通常以「object/bucket policy、metadata、ACL」為中心 → **更容易做到物件級權限**、更細的 policy 條件化（概念上）。
    
- block storage 多半像磁碟：權限經常綁在「instance/volume attach」與 OS 層檔案權限 → **雲端層面通常沒 object 那麼細**。
    

### 誤選說明：automatic data classification

- classification 是資料治理/安全工具能力（DLP、data catalog、DSPM…），**不是 object storage 的“典型內建特性”**。
    

**秒殺辨識**

- 看到「advantage of object storage over block（security）」→ **granular access control / policy at object-level**

## 4) 多國資料主權（data sovereignty）下，哪種 storage 最難滿足 data residency？

- **正解：Object storage with global distribution**
    
- **常見誤選：** 其他選項（非 global object storage）
    

### 正解說明：object storage + global distribution

- global distribution 典型會牽涉：
    
    - 自動 replication、跨區 caching/edge、地理分散的冗餘
        
- 越「全球化」地分散資料，越難保證 **資料/副本永遠只落在特定司法轄區**，也更難做完整稽核與證明。
    

**考場關鍵字**

- 看到「multi-country + data sovereignty + replication/geographic distribution」→ 通常選 **global object storage** 為最大挑戰

## 5) Data Steward 的主要責任是什麼？

- **正解：Ensuring proper data content, context, and associated business rules**
    
- **常見誤選：** Implementing encryption algorithms for data at rest and in transit
    

### 正解說明：內容/脈絡/規則

- Data Steward = **治理、品質、合規**的推動者/守門人：
    
    - 確保資料定義、metadata、品質、使用規則、分類與合規流程能落地
        
- encryption algorithms 屬於**技術控制落地**（更靠近 security engineering / custodian/平台團隊責任）
    

**口訣**

- **Steward = data governance + quality + business rules**
    
- **Custodian/Engineering = encryption / backup / restore / technical controls**

## 6) Hybrid cloud 要安全合規地管「全生命週期存取控制」：最適合的方法？

- **正解：ABAC（Attribute-Based Access Control）**
    
- **常見誤選：** 其他存取模型（如純 RBAC）
    

### 正解說明：ABAC

- hybrid cloud 會遇到：資產多樣、標籤/分類不同、風險條件多（地點、裝置、資料等級、身分風險、用途…）
    
- ABAC 可以用「屬性」做動態決策：
    
    - user attributes、resource attributes、environment attributes、action
        
- 比純 RBAC 更能處理「跨雲 + 多資料類型 + 合規條件」的細粒度限制。
    

**考場關鍵字**

- 看到「hybrid cloud / diverse data assets / compliant access across lifecycle」→ **ABAC**

---
## Section 命中對照表（第一次 vs 第二次已知）

| Section                       | 第一次錯題統計 | 第二次（n=6） | 變化解讀                          |
| ----------------------------- | ------------ | ----------- | ----------------------------- |
| **2.2 Storage architectures** | 0            | **4**       | **新弱點浮現（P0）**：storage 題開始大量出現 |
| **2.1 Data concepts/roles**   | 4            | 1           | 2.1 錯題下降，Steward 與技術職責仍易混淆    |
| **2.3 Data security tech**    | 3            | 0           | 本次錯題未再出現（可能補強有效）    |
| **2.6 IRM/access models**     | 1            | 1           | Access model（ABAC）仍為易錯點     |
| **2.7 Retention/Destroy**     | 2            | 0           | 本次未再出現（仍可能命題）                |

---
# 建議複習策略

## P0：2.2 Storage architectures

建議以「對照表」系統記憶：

- **Object storage**
    
    - security：object-level policy/ACL、per-object encryption/keying model、metadata
        
    - risk：**global distribution → residency 困難**
        
- **Block storage**
    
    - security：volume-level encryption、snapshot/backup、attach boundary
        
    - risk：mis-attach / snapshot exposure / host compromise
        
- **File storage**
    
    - security：share/file system level、NFS/SMB permission model
        
- **SDS**
    
    - **Control plane 是最致命的攻擊面**（身份/權限/網段隔離/審計）
        

## P1：2.1 + 2.6

- **Data Steward vs Custodian/Engineering**：區分「治理/規則/品質」與「技術控制」
- **ABAC**：高頻出現於 hybrid/multi、合規、跨資產/跨生命週期題型