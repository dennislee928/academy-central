# 題詳解（已解析到的 8 題）

> 我用你截圖的 UI 判讀：紫色勾勾＝正解，灰色圈圈＝你選的。

---

## Q1（2.2）Object vs Block：主要安全優勢

**題意**：從 data security 角度，object storage 相比 block storage 的主要優勢？

- **正解**：Object storage **通常內建 at-rest encryption**（或可視為預設/標準能力）
    
- **你選**：Object storage 對 unstructured data 有更好的未授權保護
    

**為什麼正解更“主要”**

- 這題在考「**storage type 的典型安全控制**」：object storage（S3 類）最常被拿來強調的是 **server-side encryption / at-rest encryption** 的標準化與 policy 化管理。
    
- “unstructured data 保護較好”太籠統，且保護強度主要取決於 IAM/policy/加密/網路控管，不是因為「unstructured」。
    

**秒殺關鍵字**

- “primary advantage / security perspective / object vs block” → 優先想 **encryption-at-rest + object-level policy/ACL**
    

---

## Q2（2.3）DR 資料傳輸/儲存的 confidentiality：選哪個 crypto feature？

- **正解**：**End-to-end encryption**
    
- **你選**：Digital signatures
    

**核心概念**

- **Confidentiality = 加密**（讓別人看不懂）
    
- **Digital signature = integrity + authenticity + non-repudiation**（證明沒被改、誰簽的）  
    簽章不會把內容藏起來，所以不解 confidentiality。
    

**秒殺關鍵字**

- 問 “confidentiality during transfer/storage” → **encryption**
    
- 問 “integrity/nonrepudiation” → **signature**
    

---

## Q3（2.2）Synchronous vs Asynchronous replication：trade-off

- **正解**：Synchronous replication 提供更強一致性，但會有 **latency/performance cost**
    
- **你選**：Asynchronous replication 在大多數情境能平衡 performance 與 integrity
    

**為什麼你選項不對**

- Async replication 的 trade-off 是：**RPO 風險**（可能丟最後一段資料）→ consistency/integrity（以「最新狀態一致性」而言）較弱。
    
- 題目在問「trade-off（本質差異）」：sync 的代價就是效能/延遲。
    

**秒殺關鍵字**

- “synchronous replication” → **strong consistency / low RPO / higher latency**
    
- “asynchronous replication” → **better performance / higher RPO risk**
    

---

## Q4（2.3）SDS 分散式資料：最大安全挑戰

- **正解**：分散式環境下 **加密與金鑰管理複雜度**（key mgmt across distributed data）
    
- **你選**：未授權的實體存取風險更高
    

**為什麼正解更關鍵**

- SDS 把儲存抽象化、節點分散，真正難點是：
    
    - key lifecycle（產生/輪替/吊銷/備援/稽核）
        
    - key ownership（CSP-managed vs customer-managed）
        
    - cross-domain trust（多節點、多區、多雲）
        
- 實體存取通常是 CSP 的責任邊界（shared responsibility 底層），不是 SDS 特有的「最核心」風險點。
    

**秒殺關鍵字**

- “SDS / distributed storage / key challenge” → **key management**
    

---

## Q5（2.3）Compression vs Encryption：順序

- **正解**：**先壓縮再加密**
    
- **你選**：先加密再壓縮（優先安全）
    

**為什麼**

- 加密後資料近似隨機，**幾乎不可壓縮**；先加密再壓縮通常只會浪費 CPU。
    
- 正確工程順序：**compress → encrypt → transmit/store**。
    

**秒殺關鍵字**

- “optimize efficiency + confidentiality” → **compress then encrypt**
    

---

## Q6（2.3 + sovereignty情境）Multi-cloud object storage 合規/主權：最有效控制

- **正解**：**Client-side AES-256 encryption + locally managed keys（KMIP）**
    
- **你選**：Granular RBAC + regular access review
    

**為什麼 RBAC 不夠**

- Sovereignty/合規的痛點常在：你是否能**保證 CSP/跨區複本也無法解密**。
    
- 只有在你掌握金鑰（尤其 client-side encryption）時，資料即使被複製到不期望的區域，也仍然不可讀（至少在密文層面更可控）。
    
- RBAC 是 access governance，但不等於“對資料本體的不可讀性”。
    

**秒殺關鍵字**

- “data sovereignty / local control / multi-cloud object storage” → **customer-managed keys / client-side encryption**
    

---

## Q7（2.2）Storage virtualization：可用性 vs 安全的最大 trade-off

- **正解**：抽象化提升彈性/擴展，但可能引入 **hypervisor layer vulnerability**
    
- **你選**：跨租戶 dedup 提升效率但降低 isolation
    

**為什麼 hypervisor 更「最顯著」**

- Virtualization 的單點爆炸半徑通常在 **hypervisor/virtualization stack**：一旦被打穿可能是多租戶全面影響。
    
- Dedup 的確有 side-channel/隔離風險，但題目問 “most significant trade-off”，更常指向 virtualization layer 被攻擊的系統性風險。
    

**秒殺關鍵字**

- “virtualization / multi-tenant / most significant security trade-off” → **hypervisor escape / isolation failure**
    

---

## Q8（2.5 + residency情境）Multi-tier cloud storage：最關鍵 confidentiality + compliance 控制

- **正解**：跨 tier **統一 enforce data classification + residency rules**
    
- **你選**：RBAC for storage management
    

**為什麼**

- 金融/多層儲存的核心風險是：資料從 hot→warm→cold、跨區、跨雲搬移後，**分類/主權規則被破壞**。
    
- RBAC 是「誰能操作」，但這題要的是「資料在哪裡、能不能搬、搬到哪裡仍合規」。
    

**秒殺關鍵字**

- “multi-tier storage + regulatory compliance + confidentiality” → **classification + residency enforcement**