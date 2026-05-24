# CCSP Domain 1 錯題分析 / Error Analysis (Q21–Q24)

## 一、錯題主軸 1：Hybrid vs Community vs Private

### Q21 錯點

題目情境是：

組織需要：

- 嚴格 data sovereignty
- data residency 在本國境內
- 同時還要使用 public cloud 處理 non-sensitive workloads

原選 **Community cloud**，正解是 **Hybrid cloud**。

### 觀念

**Hybrid cloud = 混合兩種以上部署模型。**

看到這種組合：

**敏感資料留在受控環境 + 非敏感工作負載用 public cloud**

就要想到 **Hybrid cloud**。

Community cloud 不是「合規很嚴格」就一定選。  
Community cloud 是多個有共同需求的組織共享，例如同產業、同政府單位、同研究群體。

考試判斷：

|題目關鍵字|較可能答案|
|---|---|
|sensitive data on-prem + public cloud for other workloads|Hybrid cloud|
|same industry / shared mission / common compliance group|Community cloud|
|maximum control / dedicated environment|Private cloud|
|scalability / fast DevOps / low upfront cost|Public cloud|

---

## 二、錯題主軸 2：Private vs Hybrid

### Q22 錯點

題目問：

「最高資料控制、可能更快 RTO、critical business applications、但可能需要較高 upfront DR investment。」

原選 **Hybrid cloud**，正解是 **Private cloud**。

### 觀念

看到 **highest level of data control**，通常要優先想到：

**Private cloud**

Hybrid cloud 的強項是 **balance**：

- control
- flexibility
- public cloud scalability
- private/on-prem sensitivity

但題目如果強調的是 **最高控制**，不要被「balancing performance, cost, and control」帶走。  
考試裡 **highest / maximum / most control** 常常指向 **Private cloud**。

---

## 三、錯題主軸 3：Insider threat + shared responsibility

### Q23 錯點

題目問：

在 shared responsibility model 下，哪個 insider threat 管理最困難？

原選：

**Implementing consistent access controls across cloud services**

正解：

**Coordinating user activity monitoring across organizational boundaries**。

### 觀念

這題不是單純問 IAM。

它在問：

**責任分散在 CSP 與 customer 之間時，最難的是什麼？**

最難通常是：

**跨組織邊界的可見性、監控、協調、證據整合。**

Access control 雖然重要，但多數仍可透過 IAM、SSO、RBAC、policy 做設計。  
但 insider threat 需要看到使用者行為、管理員行為、CSP 端活動、客戶端活動，這會跨越責任邊界。

考試記法：

**shared responsibility + insider threat = monitoring coordination / visibility challenge**

---

## 四、錯題主軸 4：CIA triad 與多租戶環境

### Q24 錯點

題目問：

多租戶雲端中，哪個策略最能維持 CIA triad？

原選：

**Replicating data across multiple geographic regions**

正解：

**RBAC + regular access reviews + least privilege**。

### 觀念

多區域複寫主要強化：

**Availability 可用性**

但 CIA triad 有三個：

- Confidentiality 保密性
- Integrity 完整性
- Availability 可用性

RBAC、least privilege、regular access reviews 比較能同時支援：

- Confidentiality：限制誰能看
- Integrity：限制誰能改
- Availability：降低誤用與濫權造成中斷

這題的陷阱是：  
看到 cloud / multi-region 就想選 HA。  
但題目問的是 **CIA triad 整體**，不能只滿足 A。
