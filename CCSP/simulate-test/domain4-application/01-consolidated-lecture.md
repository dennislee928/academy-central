# CCSP Domain 4：Cloud Application Security 彙整講義

> **範圍：** `simulate-test/` 內所有測驗講義中屬於 Domain 4 的內容，跨場次合併後依主題重組。
> **考試權重：** 16%
> **來源：** `by-test/04`、`07`、`08`、`09`、`by-test/learnzapp/01`、`daily/`
> **維護：** 新增測驗講義後，將該檔的 D4 章節併入本檔，並更新 §0 來源對照。
> **註：** 各場次分數、進步判定與補強排程留在 `by-test/` 原檔，不併入本檔。

---

## 0. 來源對照 / Source Map

| 來源檔 | 原章節 | 併入本檔位置 |
|---|---|---|
| `by-test/04-practice-test-1-weakness-lecture.md` | §8.1 SAML、§8.2 identity 用語 | §1.5 |
| `by-test/07-practice-test-2-weakness-lecture.md` | §5.1 DAST/SAST、OWASP、API gateway、side-channel | §1.3、§1.4、§1.6 |
| `by-test/08-d4-drill-1-weakness-lecture.md` | P0-1 best-answer、P0-3 Secure SDLC、P0-4 sandbox、P1-1 SOAP、P1-2 ISO 27034、P1-3 MFA | §1.1、§1.2、§1.5、§1.6、§2.1–§2.5 |
| `by-test/09-practice-test-3-weakness-lecture.md` | §6 P1 D4（web service／測試／service model／IP／federation） | §1.3、§1.4、§1.5、§2.6 |
| `by-test/learnzapp/01-...-lecture.md` | §3 應用安全與管理視角 | §1.1、§1.3、§1.4、§1.7 |
| `daily/2026-09-25`、`daily/2026-09-26` | §3 LO `4.2` requirements、`4.5` shadow API、`4.7` federation | §1.2、§1.5、§2.7 |

> **交叉引用：** Data masking／tokenization／PCI DSS 的完整整理見 [Domain 2 §1.5、§1.9](../domain2-data-security/01-consolidated-lecture.md)（多份 D4 drill 錯題落在該邊界）。

---

## 1. 核心觀念 / Core Concepts

### 1.1 ISC2 的最佳解邏輯（D4 最大失分點）

D4 失分多半不是「完全不會」，而是一看到技術威脅就立刻選封鎖、中斷、重寫。

```text
釐清業務需求與影響
        ↓
蒐集更多資料（gather more data）
        ↓
評估風險與控制選項
        ↓
才採取可能中斷營運的強制動作
```

**發現未授權 API 未必該立刻 block**，先確認該 API 是否為合法業務依賴。

**題幹限定詞的處理：**

```text
看到 best / most important / most comprehensive / particularly / first / should not：
先判斷題目要的是「最高層原則、最早階段、最完整定義、最貼近情境」哪一種。
不要只選第一個看起來正確的控制或名詞。
```

有些選項「也對」，但不是最廣、最上位或最貼題的答案。

### 1.2 Secure SDLC

| 題型 | 正確思路 |
|---|---|
| **Most important SDLC input** | **Business requirements** |
| **Security first involved in SDLC** | **Define**（最早階段，不是 Design） |
| Security controls in SDLC | 越早導入越有效、越便宜 |
| Developer training 的理由 | 現代開發高度依賴 libraries／frameworks／components，開發者可能不了解底層安全風險 |
| Legislation／regulation | 重要限制，但通常被 business requirements 吸收，不是最上位 input |

**Business requirements 的定義（`daily` LO `4.2`）：** 該組織／該系統特定的功能、效能、安全需求，通常來自**使用者與業務 stakeholder**，不是一般市場智庫或 open data 可完全取代。題目的 `user involvement` 要理解成廣義的業務需求提供者，不一定是逐一訪談終端使用者。

> 需求一開始定錯，測試只會確認做出了一個錯的東西，而且越晚發現修正成本越高。「使用者最關鍵」通常落在 **Define／requirements**，Test／beta 只能驗證是否符合已定需求。

**Nonfunctional requirement：** 非安全類產品中的安全缺陷，通常屬於 **nonfunctional requirement**。

### 1.3 應用測試

| 方法 | 定位 |
|---|---|
| **SAST** | white-box／原始碼／靜態分析；**找程式邏輯錯誤靠 SAST／原始碼審查**，不是弱點掃描 |
| **DAST** | black-box／執行中的應用／外部行為測試 |
| **IAST** | 在執行中的應用內部做 instrumentation |
| **RASP** | 部署於正式環境，執行期自我防護與主動阻擋 |
| **Fuzz testing** | 餵入畸形／隨機輸入，偵測非預期行為 |

```text
black-box + running app + discover execution paths = DAST
source code / no execution                          = SAST
```

**測試獨立性：** 開發人員測試自己寫的程式，問題不是「技術能力不足」，而是**既得利益（vested interest）造成的利益衝突與盲點**。考試要的是 conflict of interest／testing independence。公開玩家測試也需要中立主持人。

**弱點掃描 vs 原始碼審查：** 弱掃找已知系統弱點；程式邏輯錯誤靠 SAST／code review。

### 1.4 Web service、API 與應用架構

| 技術 | 特徵 |
|---|---|
| **SOAP** | **XML-based messaging**，取代 DCOM／CORBA 的 binary messaging；依賴嚴格協定標準 |
| **REST** | 輕量、resource-oriented、**URI-based**，常用 HTTP verbs |
| **XML** | 跨平台文字格式，適合 Internet／web context |
| **DCOM／CORBA** | 舊式分散式物件模型，binary／tightly-coupled |
| **API Gateway** | **OSI Layer 7／Application layer** |
| **OWASP** | 應用安全最佳實務社群與目錄；OWASP Top 10 = 常見 web 應用風險 |
| **ISO/IEC 27034** | 應用安全框架：組織層級 **1 個 ONF**，每個應用 **1 個 ANF** |

```text
SOAP 不是特別 lightweight。
SOAP 不是因為比較新才成為正解。
SOAP 不是天生比 DCOM/CORBA 更安全。
核心是：XML replacing binary messaging。
```

**Forklifting／Lift and shift：** 把傳統應用**不經修改**直接搬上雲端。不是 re-architect，也不是雲原生改造。

**雲端開發者最容易失去的控制權：底層 logging 設施**（logging infrastructure 常由 CSP 營運）；應用欄位驗證仍在開發者手上。

**應用測試的 service model：PaaS** 通常最適合，因為 runtime／platform 支援由 provider 提供；SaaS 太固定，IaaS 給了基礎架構但客戶負擔更大。

### 1.5 身分、認證與聯合身分

| 名詞 | 定義 |
|---|---|
| **Authentication** | 驗證身分（你是誰） |
| **Authorization** | 決定可存取的範圍 |
| **Non-repudiation** | 無法否認曾執行某動作 |
| **IAM 的終極目的** | **Accountability（可歸責）**——授權只是過程 |
| **SAML** | 在 security domains 之間交換 **authentication 與 authorization** 斷言的標準 |
| **OAuth** | Delegated authorization |
| **OIDC** | 建立在 OAuth 2.0 之上的 identity layer |

#### MFA factor 分類

| Factor | Example |
|---|---|
| Something you know | password、PIN |
| Something you have | card、token、phone、smart card |
| Something you are | fingerprint、iris、face、voice biometric |
| Somewhere you are | location |
| Something you do | behavior／gesture／typing pattern |

```text
Password + PIN      = 同一因子（know）→ 不是 MFA
Voice + fingerprint = 同一因子（are） → 不是 MFA
ATM card + PIN      = have + know     → 是 MFA
```

#### Federation 信任模型（`daily` LO `4.7`，複習最優先）

| 模型 | 結構 | 取捨 |
|---|---|---|
| **Web of trust** | 成員彼此直接信任，每個組織同時是 IdP 與 SP | 成員一多就難以擴充 |
| **Trusted third party（hub-and-spoke）** | 大家信任同一個第三方 IdP／broker，各組織只當 SP | 擴充容易，但第三方成為單點依賴 |
| **Cross-certification** | 每個參與者各自審查並信任其他參與者 | 隨參與者數量增加而複雜 |

**要點：** TTP 中的第三方通常是 **IdP／broker**，不是 service provider。要分清 IdP 與 SP／relying party。**不要自動把每個 federation 角色都指派給 cloud provider**；角色取決於誰提供／消費／宣告 identity。

### 1.6 雲端應用的特殊風險

| 主題 | 規則 |
|---|---|
| **Side-channel** | 共享雲端資源帶來 side-channel 疑慮；cloud 的 secure SDLC 必須考量 co-tenancy、資源隔離與 side-channel 洩漏 |
| **Cloud sandbox** | 可用於 application security testing、interoperability testing；**不宜用於 malware analysis**（涉及惡意程式執行、第三方基礎設施、法律與供應商條款風險） |
| **Code signing** | 可作為軟體完整性與**所有權**的證據 |

### 1.7 政策與執法的先後（LO `4.5` shadow API）

題幹若強調「政策成本遠高於 API、多數人繞過、生產力大增」，代表**政策／流程可能不符業務需求**。

```text
判斷步驟：
1. 先找出題幹中指出根本原因的限定詞（成本、繞過率、生產力）
2. 選處理該根因的選項
3. 不要先跳到「只強制執行既有流程」
```

存量未審查 API 的風險可保留為異議，但先對準題幹所問。**先修政策，再談執法。**

---

## 2. 錯題與修正規則 / Errors & Corrections

### 2.1 Best-answer 判斷偏弱（`by-test/08` P0-1）

- Data masking 題兩次都選到「hide PII／protect prying eyes」這種局部正確答案 → best definition 應是「similar but inauthentic dataset」。
- SDLC input 題選 legislation／regulation → best answer 是 **business requirements**。
- Developer training 題選 Secure SDLC 原則 → 題目問的是「為什麼 cloud training 對 developer 特別重要」。

### 2.2 Secure SDLC 階段判斷（`by-test/08` P0-3）

Design 不是最早階段，**Define 才是**。Secure SDLC 原則正確，不代表是每題最佳答案。

### 2.3 Cloud sandbox 的法律邊界（`by-test/08` P0-4）

題目問 `should not be used for` 時，**malware analysis** 通常是高風險答案。Cloud sandbox 不等於所有 sandbox 用途都能搬上雲。

### 2.4 SOAP 為何用於 web services（`by-test/08` P1-1、`by-test/09`）

正解：**SOAP replaces binary messaging with XML**。不是因為輕量、較新或較安全。

### 2.5 ISO 27034 的 ONF／ANF（`by-test/08` P1-2、`lz01` §3.5）

```text
Organization level = 1 個 ONF
Application level  = 每個應用 1 個 ANF
```

常見陷阱：以為一個應用對應 3 個 ANF。`SAS`（Standard Application Security）不是本題的框架名詞。

### 2.6 Federation 角色誤派（`by-test/09` §6.1）

在參與者之間的 federation 中，**參與實體本身可以是 federated service provider**。不要自動把角色指派給 cloud provider。

### 2.7 Object vs volume 的考試用語（`daily` LO `2.2`，D4 場次錯題但屬 D2 知識）

完整整理見 [Domain 2 §1.3](../domain2-data-security/01-consolidated-lecture.md)。此規則目前標記為 **Unresolved／待對照教材確認**。

---

## 3. 一句話規則表 / One-liner Rules

| # | 規則 |
|---|---|
| 1 | 看到威脅先 gather more data，不要直接選封鎖或中斷營運。 |
| 2 | 未授權 API 不一定要立刻 block，先確認是否為合法業務依賴。 |
| 3 | 遇到 best／most／particularly／first／should not，先判斷題目要哪一種「最」。 |
| 4 | SDLC 最重要的 input 是 **business requirements**。 |
| 5 | 安全人員應從 **Define** 階段就介入。 |
| 6 | Legislation／regulation 通常被 business requirements 吸收，不是最上位 input。 |
| 7 | Business requirements 來自本組織的使用者與業務 stakeholder。 |
| 8 | 非安全產品中的安全缺陷屬 nonfunctional requirement。 |
| 9 | Black-box + running app + execution paths = **DAST**；source code = **SAST**。 |
| 10 | 程式邏輯錯誤靠 SAST／code review，不是弱點掃描。 |
| 11 | Fuzz testing = 畸形／隨機輸入測非預期行為。 |
| 12 | 開發者測自己的程式是 **conflict of interest**，不是能力問題。 |
| 13 | SOAP = XML messaging，取代 binary；不是因為輕量或較新。 |
| 14 | REST = URI-based、輕量、resource-oriented。 |
| 15 | API Gateway 在 **OSI Layer 7**。 |
| 16 | ISO 27034：組織 1 個 **ONF**，每個應用 1 個 **ANF**。 |
| 17 | OWASP 是應用安全最佳實務目錄；NIST／ISO 是更廣的標準。 |
| 18 | Forklifting／lift-and-shift = 不修改直接上雲。 |
| 19 | 雲端開發者最容易失去的是底層 logging 控制權。 |
| 20 | 應用測試的最佳 service model 通常是 **PaaS**。 |
| 21 | MFA 需要**不同類別**的因子，不是兩樣東西。ATM card + PIN 才是 MFA。 |
| 22 | SAML 交換認證與授權斷言；OAuth 是委派授權；OIDC 是 OAuth 上的身分層。 |
| 23 | IAM 的終極目的是 **Accountability**，不是 Authorization。 |
| 24 | Web of trust 難擴充；TTP 好擴充但第三方是單點依賴。 |
| 25 | Federation 角色看誰提供／消費／宣告 identity，不自動歸 CSP。 |
| 26 | 共享雲端資源 → side-channel 風險；secure SDLC 必須納入 co-tenancy。 |
| 27 | Cloud sandbox **不宜**用於 malware analysis。 |
| 28 | Code signing 可作為軟體完整性與所有權證據。 |
| 29 | 政策成本高、繞過率高 → 先修政策，再談執法。 |
| 30 | Masking 的 best definition 是「similar but inauthentic dataset」，hide PII 只是效果之一。 |

---

## 4. 易混淆邊界 / Confusable Boundaries

| A | B | 切法 |
|---|---|---|
| SAST | DAST | 看原始碼不執行 vs 黑箱測執行中的應用 |
| DAST | IAST／RASP | 外部行為 vs 應用內部 instrumentation／執行期防護 |
| 弱點掃描 | 原始碼審查 | 已知系統弱點 vs 程式邏輯錯誤 |
| SOAP | REST | 嚴格 XML 協定 vs 輕量 URI resource |
| Define | Design | 最早的需求階段 vs 設計階段 |
| Business requirements | Legislation／regulation | 最上位 input vs 被吸收的限制條件 |
| Authentication | Authorization | 你是誰 vs 你能做什麼 |
| SAML | OAuth／OIDC | 認證＋授權斷言 vs 委派授權／身分層 |
| Web of trust | Trusted third party | 彼此直接信任 vs 共同信任第三方 IdP |
| IdP | SP／relying party | 提供身分 vs 消費身分 |
| ONF | ANF | 組織層級（1 個） vs 應用層級（每應用 1 個） |
| Forklifting | Re-architect | 不修改搬遷 vs 雲原生改造 |
| Masking | Tokenization | 相似但不真實的資料集 vs vault 映射替代值 |

---

## 5. 補強演練 / Drills

### Drill A：60 分鐘 D4 補弱

| 時間 | 任務 |
|---|---|
| 0–10 min | DAST／SAST／IAST／RASP／Fuzz 對照 |
| 10–20 min | OWASP／Secure SDLC／threat modeling |
| 20–30 min | API Gateway／SOAP vs REST／ISO 27034 |
| 30–40 min | Cloud app side-channel／sandbox 邊界 |
| 40–55 min | D4 targeted 15–20 題 |
| 55–60 min | 寫 5 條錯題規則 |

### Drill B：Federation 畫圖（15 分鐘）

閉卷畫出 web of trust 與 trusted third party 兩種模型，標出 IdP、SP／relying party 與信任關係，並寫下各自的擴充性取捨。

### Drill C：最佳解判斷（10 分鐘）

取 5 題含 best／most／first／should not 的題幹，先寫下「題目要的是哪一種最」，再作答。

### Gate

| 指標 | 目標 |
|---|---|
| D4 targeted drill 25–30 題 | 75–80% |
| D4 full mock segment | ≥ 75% |
| 錯題類型 | 不再集中於 DAST/SAST／API／OWASP／best-answer |

### 自我檢測

- 找程式邏輯錯誤該用哪種測試？為什麼不是弱點掃描？
- SDLC 最重要的 input 是什麼？legislation 為什麼不是？
- ATM card + PIN 為什麼算 MFA，password + PIN 為什麼不算？
- ISO 27034 中組織有幾個 ONF？每個應用有幾個 ANF？
- 為什麼 cloud sandbox 不適合做 malware analysis？
