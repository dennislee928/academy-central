## 錯題的核心集中點

- **2.2 Cloud data storage architectures**：佔你已提供錯題的 **4/6 = 66.7%** → 這次的 **P0**
    
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

**題意**：需要在 storage solution 內，對「個別資料元素/物件」做到更細的 at-rest encryption granularity。

- **正解：Object storage**
    
- **選：Hybrid storage**
    

### 為什麼是 Object storage

- 典型 object storage（概念層面）支援**物件層級**（per-object）：
    
    - 物件層級 policy/ACL
        
    - per-object encryption（或至少可做到每個 object 使用不同 key/不同 encryption context 的管理模式）
        
- 對比 block/file 通常落在**volume / filesystem / share** 層級更常見。
    

### 你選 Hybrid 為何不對

- **Hybrid storage**不是一個「天然提供更細加密粒度」的 storage type；它只是組合/部署形態，粒度取決於底層用的 object/file/block。
    

**考場關鍵字**

- 看到「**individual object / per-object / granular at-rest controls**」→ **Object storage**
## 2) SDS（Software-Defined Storage）最關鍵的安全風險是什麼？

- **正解：Vulnerability of the control plane to unauthorized access**
    
- **選：Risk of performance degradation due to centralized management**
    

### 為什麼是 Control Plane

- SDS 的核心是「**控制面**（orchestration/management）」與「資料面」分離。
    
- **控制面一旦被入侵**，攻擊者通常能：
    
    - 重新掛載/複製 volume、建立 snapshot、調整 replication、改 policy  
        → 直接擴大成 **全面性資料曝露/破壞**（CIA 都會中）
        

### 你選的效能退化為何不是「最關鍵」

- 效能是風險，但不一定是**最嚴重的安全風險**；題目問 “most critical security concern” 通常選「被接管後的爆炸半徑最大」那個。
    

**考場口訣**

- SDS / SDN 這類「software-defined」題：  
    **Control plane compromise = catastrophe**


## 3) Object storage 相對 Block storage 的主要「資料安全」優勢？

- **正解：Object storage supports finer-grained access control**
    
- **選：Object storage implements automatic data classification**
    

### 為什麼是 finer-grained access control

- object storage 的存取通常以「object/bucket policy、metadata、ACL」為中心 → **更容易做到物件級權限**、更細的 policy 條件化（概念上）。
    
- block storage 多半像磁碟：權限經常綁在「instance/volume attach」與 OS 層檔案權限 → **雲端層面通常沒 object 那麼細**。
    

### automatic data classification 為何不對

- classification 是資料治理/安全工具能力（DLP、data catalog、DSPM…），**不是 object storage 的“典型內建特性”**。
    

**秒殺辨識**

- 看到「advantage of object storage over block（security）」→ **granular access control / policy at object-level**