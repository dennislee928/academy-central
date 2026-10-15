# CCSP D1｜今日錯題補強講義

今天真正要修的只有一個明確知識缺口：

> **共同準則（Common Criteria）EAL1–EAL7 的保證嚴謹程度（assurance rigor）**

另一題「CEO 遷雲最大因素 = 成本」比較像 LearnZapp 的管理階層最佳答案套路，應 **`[Q] 中高降權`**，不要背成「CEO 永遠先看成本」。

---

# 1. Common Criteria 與 EAL 到底在衡量什麼？

## Common Criteria

**共同準則（Common Criteria, CC）**

用途：

> 對資訊科技產品的安全功能與安全保證進行標準化評估。

## EAL

**Evaluation Assurance Level（評估保證等級）**

核心不是：

> 產品「有多安全」。

而是：

> **我們對這個產品的安全設計、實作與測試，做了多嚴格、多深入的驗證。**

所以：

```text
EAL 越高
   ↓
評估證據更多
設計分析更深入
驗證更嚴格
形式化程度更高
```

但：

> **EAL7 ≠ 產品一定比 EAL4 更適合你的環境。**

它代表的是：

> **保證／驗證嚴謹程度更高。**

---

# 2. ★ EAL1–EAL7 完整比較表

| EAL | 官方核心概念 | 中文理解 | 最重要 Trigger |
|---:|---|---|---|
| **EAL1** | Functionally Tested | **功能測試** | Functional |
| **EAL2** | Structurally Tested | **結構化測試** | Structural |
| **EAL3** | Methodically Tested and Checked | **有系統地測試與檢查** | Tested + Checked |
| **EAL4** | Methodically Designed, Tested and Reviewed | **有系統地設計、測試與審查** | Designed + Reviewed |
| **EAL5** | Semiformally Designed and Tested | **半形式化設計與測試** | Semi-formal Design |
| **EAL6** | Semiformally Verified Design and Tested | **半形式化驗證設計與測試** | Semi-formal Verification |
| **EAL7** | Formally Verified Design and Tested | **形式化驗證設計與測試** | **Formal Verification** |

---

# 3. ★ 最重要的分界不是數字，而是這條梯子

```text
EAL1
功能測試
   ↓
EAL2
結構化測試
   ↓
EAL3
有系統地「測試＋檢查」
   ↓
EAL4
有系統地「設計＋測試＋審查」
   ↓
EAL5
半形式化「設計」
   ↓
EAL6
半形式化「驗證」
   ↓
EAL7
形式化「驗證」
```

你今天錯的是：

> `formally verified`

卻選到 EAL3。

這兩者距離其實非常大：

- EAL3：**有系統地測試與檢查**
- EAL7：**形式化驗證**

---

# 4. ★ EAL 口訣

我建議直接背：

> **1 功、2 構、3 測查、4 設測審、5 半設、6 半驗、7 全驗**

拆開：

| EAL | 口訣 |
|---:|---|
| 1 | **功**能 |
| 2 | **構**造／結構 |
| 3 | **測查** |
| 4 | **設測審** |
| 5 | **半設** |
| 6 | **半驗** |
| 7 | **全驗** |

完整念法：

> **功 → 構 → 測查 → 設測審 → 半設 → 半驗 → 全驗**

這比死背七句英文穩定。

---

# 5. ★ EAL5 / 6 / 7 是最值得區分的三個

這三個最容易出選項陷阱。

## EAL5

> **半形式化設計與測試**

關鍵：

> `semi-formally designed`

### 記
> **5 = 半設**

---

## EAL6

> **半形式化驗證設計與測試**

關鍵多了一個：

> **verified**

### 記
> **6 = 半驗**

---

## EAL7

> **形式化驗證設計與測試**

關鍵：

> **formally verified**

### 記
> **7 = 全驗**

所以：

```text
Semi-formally designed
→ EAL5

Semi-formally verified
→ EAL6

Formally verified
→ EAL7
```

這三條建議直接做到 reflex。

---

# 6. EAL1–4 怎麼快速切？

## EAL1

> 功能有沒有正常做？

**Functionally Tested**

---

## EAL2

> 比單純黑箱功能測試多一層結構性分析。

**Structurally Tested**

---

## EAL3

> 有系統地測，而且有檢查。

**Methodically Tested and Checked**

你今天選的就是它。

看到：

> `methodically tested and checked`

才是 EAL3。

---

## EAL4

比 EAL3 再多：

> **設計 + 審查**

**Methodically Designed, Tested and Reviewed**

### 3 vs 4

> **3 = 測＋查**

> **4 = 設＋測＋審**

---

# 7. 今天這題真正的答題 Trigger

題幹：

> formally verified in terms of design and tested...

第一眼只看：

> **formally verified**

就可以直接：

> **EAL7**

「independent third party」不是決勝字眼。

不要形成：

> third-party test → EAL7

這種錯誤 association。

---

# 8. 今天 EAL 題紀錄

**Topic:** Common Criteria / Evaluation Assurance Level

**[K/T/J/R/Q]: `[T]`**

**Rule:**

> **Formal verification → EAL7**  
> **Semi-formal verification → EAL6**  
> **Semi-formal design → EAL5**

**降權程度：無**

這是有效錯題，值得修。

---

# 9. CEO 遷雲最大因素題

題目把：

> CEO / senior management

和：

> Reduced overall cost

直接綁在一起。

你選：

> Global accessibility

這不是荒謬答案。

---

## 四個選項其實都是合理 cloud benefits

### Network scalability
網路／資源擴充能力

### Off-site backup
異地備援能力

### Global accessibility
全球存取／全球部署能力

### Reduced cost
成本最佳化／降低部分管理成本

題幹完全沒有說 Alice 的：

- business objective
- existing infrastructure cost
- target market
- workforce distribution
- application architecture
- current backup capability

因此沒辦法客觀證明：

> Cost 一定是 biggest factor。

---

# 10. 這題真正可以留下的是 ISC2 判斷技巧

不要背：

> **CEO = Cost**

應該背：

> **高階管理者題 → 優先從 business outcome / organizational risk 的角度思考。**

例如：

```text
CEO / Board / Senior Management
           ↓
Business objectives
Risk
Financial impact
Compliance
Strategy
Agility
```

而不是一看到 CEO 就：

> `$ $ $`

---

## 為什麼 LearnZapp 選 Cost？

因為它把：

> technical characteristics

和：

> business/financial outcome

做層級比較。

前三個比較像：

- scalability
- backup capability
- accessibility

D 則直接是：

> business financial benefit。

因此按照典型 ISC2 managerial-answer heuristic：

> D 是題庫 intended answer。

但這只是：

> **best-answer heuristic**

不是普遍事實。

---

# 11. 這題紀錄

**Topic:** Cloud Adoption / Executive Decision

**[K/T/J/R/Q]: `[Q]`**

**Rule:**

> 高階管理者通常關注 business outcome；但不能建立「CEO 必然最重視成本」的硬規則。

**降權程度：中高**

不應因為這題判斷你：

> 不懂 cloud adoption benefits。

---

# 12. 今日兩題總結

| 題目 | 分類 | 降權 | 要不要複習 |
|---|---|---:|---|
| **EAL3 vs EAL7** | `[T]` | **無** | **要，今日主修** |
| CEO migration → cost | `[Q]` | **中高** | 只留 managerial heuristic |

---

# 13. ★ 今日必背區

```text
EAL1 = 功能測試
EAL2 = 結構化測試
EAL3 = 有系統地測試＋檢查
EAL4 = 有系統地設計＋測試＋審查
EAL5 = 半形式化設計
EAL6 = 半形式化驗證
EAL7 = 形式化驗證
```

### 口訣

> **1 功、2 構、3 測查、4 設測審、5 半設、6 半驗、7 全驗**

尤其：

> **5 半設 → 6 半驗 → 7 全驗**

以及：

> **Formal Verification = EAL7**

---

# 今日閃卡

點一下卡片查看答案。知道就標 **✓**，不知道就標 **×**，我會追蹤你的進度。







你可以在任何聊天中叫我複習這些閃卡、修改牌組，或設定每日複習。