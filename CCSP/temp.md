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
___


# CCSP D4｜本次測驗講義

這次真正需要留下的模型不多。主軸是：

1. **SAST / DAST / IAST 的觀察位置**
2. **OWASP 主動式測試分類**
3. **MFA 因素分類**
4. 把 MFA 那題標成 **`[Q] 高度降權`**

---

# 1. ★ 最短模型：SAST / DAST / IAST

| 類型 | 看得到內部？ | App 要執行？ | 常見分類 |
|---|---:|---:|---|
| **SAST** | ✅ | ❌ | **白箱** |
| **DAST** | ❌ 通常 | ✅ | **黑箱** |
| **IAST** | ✅，有程式內部插樁／監測 | ✅ | **混合／內部觀測** |

這張就是本輪最高價值表格。

## 一句口訣

> **SAST 看裡面但不跑；DAST 在外面打正在跑的 App；IAST 邊跑邊看裡面。**

---

# 2. SAST｜靜態應用程式安全測試

**Static Application Security Testing**

核心：

> **程式不用執行，直接分析 source code / bytecode / control flow / data flow。**

例如：

```text
Private GitLab Repository
        ↓
CI Runner
        ↓
SAST
        ↓
讀 source code
追 data flow
找 injection path
找 dangerous API
```

即使：

> Repository 是 private、外部 pentester 完全看不到。

仍然不影響 SAST 被歸類為：

> **白箱測試**

因為白箱／黑箱不是看：

> 「外面的人進不進得來？」

而是看：

> **執行測試時，測試者／工具有沒有使用系統內部資訊。**

### 最短 Rule

> **SAST = 看程式內部 + 不執行 → 白箱**

---

# 3. DAST｜動態應用程式安全測試

**Dynamic Application Security Testing**

核心：

> 對**正在執行**的 application，從外部送 request、payload、attack traffic。

例如：

```text
DAST Scanner
     ↓
HTTP requests
     ↓
Running Web App
```

DAST 通常：

- 不需要 source code
- 不需要理解內部 implementation
- 根據外部輸入／輸出找漏洞

所以通常：

> **黑箱**

### 最短 Rule

> **DAST = App 要跑 + 從外面打 → 黑箱**

---

# 4. IAST｜互動式應用程式安全測試

**Interactive Application Security Testing**

IAST 很適合拿來當 SAST / DAST 的中間橋樑。

它：

- App 正在執行
- 有 instrumentation／agent
- 可以觀察內部 execution
- 同時看到 request 與內部 code path

例如：

```text
Test Request
    ↓
Running App
    ↓
IAST Agent
├─ function call
├─ source → sink
├─ SQL query
└─ runtime data flow
```

所以：

> 它不像純 DAST 只看外部，也不像純 SAST 完全不執行。

### 最短 Rule

> **IAST = 邊跑、邊看內部。**

---

# 5. 一起放入 SCA / RASP

這四個很容易在 CCSP D4 混在一起。

| 技術 | 核心問題 | App 要跑？ |
|---|---|---:|
| **SAST** | 我自己的 code 有沒有漏洞？ | ❌ |
| **SCA** | 第三方 library / dependency 有沒有已知漏洞？ | ❌ 通常 |
| **DAST** | Running app 從外部打會不會出問題？ | ✅ |
| **IAST** | Running app 內部究竟走了哪個 vulnerable path？ | ✅ |
| **RASP** | Production/runtime 遭攻擊時要不要偵測／阻擋？ | ✅ |

## 一行口訣

> **SAST 看自己 code；SCA 看別人的 dependency；DAST 外面打；IAST 裡面看；RASP 執行時擋。**

---

# 6. SAST vs DAST 情境秒殺

### 題幹看到

> source code  
> static  
> data flow  
> insecure API  
> 不啟動 application

→ **SAST**

### 題幹看到

> running web application  
> HTTP request  
> attack payload  
> external interface

→ **DAST**

### 題幹看到

> runtime agent  
> instrumentation  
> observe internal code path while testing

→ **IAST**

---

# 7. OWASP：Intuition Testing

你這題真正要記的不是什麼神秘安全技術。

> **Intuition Testing（直覺式測試）不是 OWASP Web Security Testing Guide 的正式測試分類名稱。**

它如果作為一般軟體測試概念，可以理解成：

> 根據工程師／測試者經驗與直覺臨時設計測試。

比較接近：

- 臨機測試
- 探索式測試
- 經驗導向測試

例如：

> 「這個 API 很怪，我以前遇過類似 access-control bug，我試著改一下 object ID。」

這其實是有價值的 security tester intuition。

但：

> **不是 OWASP taxonomy 裡叫做 Intuition Testing 的正式章節。**

---

# 8. OWASP 本輪最短模型

LearnZapp 這題你只需記：

| 項目 | OWASP 正式測試類別？ |
|---|---:|
| Information Gathering | ✅ |
| Business Logic Testing | ✅ |
| Client-side Testing | ✅ |
| **Intuition Testing** | ❌ |

### 口訣

> **資訊、邏輯、用戶端都是真的；「直覺測試」是假的 taxonomy。**

---

# 9. MFA 最短模型

**多因素驗證（Multi-Factor Authentication）**

真正核心只有一句：

> **至少兩個不同種類的驗證因素，而且兩者真的參與 authentication。**

傳統三類：

| 因素 | 中文 | 例子 |
|---|---|---|
| Something you know | **你知道的東西** | password、PIN |
| Something you have | **你擁有的東西** | token、smart card、phone |
| Something you are | **你本身的生物特徵** | fingerprint、face、iris |

---

# 10. 這次 MFA 四選項

## Password + PIN

```text
Know + Know
```

❌ 不是 MFA。

---

## Fingerprint + Voice Recognition

如果 voice recognition 是 biometric：

```text
Are + Are
```

❌ 還是一種 factor category。

---

## Credit Card + Social Security Card

通常：

```text
Have + Have
```

❌ 不是 MFA。

### 特別注意

**社會安全號碼（SSN）是身分屬性，不是「你本身的生物特徵」。**

所以：

> SSN unique to you

並不代表：

> Something you are。

---

# 11. Personal Check + Signature 為什麼題目有問題？

LearnZapp 想要：

```text
Check
→ Have

Signature
→ Are
```

然後判斷：

> Have + Are = MFA

但有兩層問題。

### 問題 1：Check possession 不等於可靠 authenticator

可能：

- 偷來的
- 偽造的
- 公司支票
- 聯名帳戶
- 空白支票

所以：

> 「手上有 check」本身很弱。

### 問題 2：簽名 ≠ 已經完成 biometric verification

只是：

> 寫了一個 signature

不等於：

> 系統拿它和可信 biometric template 比對。

只有像：

```text
動態簽名
├─ 筆壓
├─ 速度
├─ stroke pattern
└─ 與已登錄模板比對
```

才比較像真正的：

> 行為生物特徵驗證。

---

# 12. MFA 題應該怎麼處理？

### 題庫作者意圖

> D 是最接近 Have + Are 的選項。

### 真正安全模型

> 題幹沒有證明 signature 被當作第二個 authentication factor 驗證。

所以：

**Topic:** MFA factor taxonomy  
**分類：`[Q]`**  
**降權：高**

### 只留下：

> **MFA = 不同 factor 類別 + 實際參與 authentication。**

不要背：

> Personal check = MFA。

---

# 13. 本次錯題分類

| 題目 | `[K/T/J/R/Q]` | 降權 |
|---|---|---:|
| SAST = White-box | **[T]** | 無 |
| OWASP Intuition Testing | **[T]** | 無 |
| Personal check = MFA | **[Q]** | **高** |

所以這輪實際上只有：

> **2 個小型 terminology remediation + 1 個爛題降權。**

沒有顯示出嚴重 D4 architecture weakness。

---

# 14. ★ 今日最短複習模型

```text
SAST
→ Static
→ 看內部
→ 不跑 App
→ White-box

DAST
→ Dynamic
→ 外部打
→ App 必須跑
→ Black-box

IAST
→ App 在跑
→ 內部 instrumentation
→ Runtime + internal visibility
```

再加：

```text
SCA
→ Dependencies

RASP
→ Runtime Protection
```

---

# 15. 30 秒版本

> **SAST = 裡面看、不執行、白箱。**  
> **DAST = 外面打、要執行、黑箱。**  
> **IAST = 邊執行邊看內部。**  
> **SCA = dependency。**  
> **RASP = runtime protection。**  
> **Intuition Testing 不是 OWASP 正式分類。**  
> **MFA = 不同 factor 類別，而且真的有驗證。**

---

# 今日閃卡

### Card 1
**Q：SAST 最短模型？**

A：

> **看內部、不執行、白箱。**

---

### Card 2
**Q：DAST 最短模型？**

A：

> **通常不看內部、App 要執行、黑箱。**

---

### Card 3
**Q：IAST 最短模型？**

A：

> **App 要執行，透過 instrumentation 觀察內部 execution。**

---

### Card 4
**Q：Private Git repo 裡跑 SAST，還算白箱嗎？**

A：

> **算。** Box classification 看測試工具是否使用內部資訊，不看外部人士能不能進 repository。

---

### Card 5
**Q：不啟動程式，追 source → sink 的 injection path？**

A：

> **SAST。**

---

### Card 6
**Q：對 running web app 發惡意 HTTP request？**

A：

> **DAST。**

---

### Card 7
**Q：Running app 裡裝 agent，同時看到 request 和內部 data flow？**

A：

> **IAST。**

---

### Card 8
**Q：SCA 最短模型？**

A：

> **掃第三方 library、dependency、package 與 SBOM。**

---

### Card 9
**Q：RASP 最短模型？**

A：

> **執行時保護：偵測／阻擋 runtime attack。**

---

### Card 10
**Q：OWASP 的 Intuition Testing 是正式分類嗎？**

A：

> **不是。** 它最多是泛指依經驗／直覺進行探索或臨機測試。

---

### Card 11
**Q：Password + PIN 是 MFA 嗎？**

A：

> **不是。Know + Know。**

---

### Card 12
**Q：Fingerprint + Voice biometric 是 MFA 嗎？**

A：

> **不是。Are + Are。**

---

### Card 13
**Q：Credit card + Social Security card 通常是 MFA 嗎？**

A：

> **不是。通常都是 possession／身分證據；SSN 也不是 biometric。**

---

### Card 14
**Q：真正 MFA 的最短規則？**

A：

> **至少兩個不同 factor 類別，而且兩者都實際參與 authentication。**

---

### Card 15
**Q：為什麼「signing a personal check = true MFA」要降權？**

A：

> 題目沒有證明 check 是綁定 authenticator，也沒有說 signature 被實際 biometric verification；只能算題庫作者想像中的 Have + Are。

---

## 最值得背的一張卡

| 類型 | 看得到內部？ | App 要執行？ | 常見分類 |
|---|---:|---:|---|
| **SAST** | ✅ | ❌ | **白箱** |
| **DAST** | ❌ 通常 | ✅ | **黑箱** |
| **IAST** | ✅，有內部插樁／監測 | ✅ | **混合／內部觀測** |

> **口訣：SAST「裡不跑」；DAST「外面打」；IAST「跑著看裡面」。**