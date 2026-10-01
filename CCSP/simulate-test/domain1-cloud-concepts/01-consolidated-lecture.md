# CCSP Domain 1：Cloud Concepts, Architecture and Design 彙整講義

> **範圍：** `simulate-test/` 內所有測驗講義中屬於 Domain 1 的內容，跨場次合併後依主題重組。
> **考試權重：** 17%
> **來源：** `by-test/01`、`by-test/02`、`by-test/03`、`by-test/04`、`by-test/07`、`by-test/09`、`by-test/learnzapp/04`
> **維護：** 新增測驗講義後，將該檔的 D1 章節併入本檔，並更新 §0 來源對照。
> **註：** 各場次分數、進步判定與補強排程留在 `by-test/` 原檔，不併入本檔。

---

## 0. 來源對照 / Source Map

| 來源檔 | 原章節 | 併入本檔位置 |
|---|---|---|
| `by-test/01-assessment-test-weakness-lecture.md` | §4.2 部署模型、§4.3 雲端角色、§4.4 IaaS 價值、§5.2 模型與角色邊界 | §1.2、§1.3、§1.4 |
| `by-test/02-custom-test-1-weakness-lecture.md` | §5.3 Q5／Q10、§7 P1 | §1.5、§2.2、§2.3 |
| `by-test/03-custom-test-2-weakness-lecture.md` | Q18 PaaS storage、Q20 SaaS model | §1.1、§2.1 |
| `by-test/04-practice-test-1-weakness-lecture.md` | §5.1 service model、§5.2 lock-out、§5.3 虛擬化 | §1.1、§1.5、§1.6、§2.1、§2.4 |
| `by-test/07-practice-test-2-weakness-lecture.md` | §6.1 Type 1 hypervisor、§6.2 hybrid、§6.3 SaaS、§6.4 public cloud governance | §1.1、§1.2、§1.6、§2.5 |
| `by-test/09-practice-test-3-weakness-lecture.md` | §9 P4 D1 Cloud Concepts | §1.2、§2.3 |
| `by-test/learnzapp/04-two-day-error-essence-lecture.md` | §8 Q14 BC/DR + Interoperability | §2.2 |
| `by-test/11-drill-2026-10-01-weakness-lecture.md` | D1 §1 Private ≠ Private Network、D1 §2 deployment 快速判斷、D1 §3 Sandbox | §1.2、§1.7、§2.6 |

---

## 1. 核心觀念 / Core Concepts

### 1.1 Service Model 責任邊界

| Model | Customer 管什麼 | Provider 管什麼 | 典型題幹線索 |
|---|---|---|---|
| **IaaS** | OS、middleware、runtime、application、data | 硬體、虛擬化層、機房 | 「customer 對 data／systems 控制最多」 |
| **PaaS** | application、data | OS 以下 ＋ runtime、常含 provider 管理的 database service | 「application testing／development environment」 |
| **SaaS** | 僅資料與使用者設定 | 幾乎全部 | 「customer 維護、管理、support 最少」「vendor 基礎架構上的 application solution」 |

```text
SaaS = 用 provider 的 application
PaaS = 在 provider 的平台上建置／部署 application
IaaS = 在租來的基礎架構上管 OS／application／data
```

**PaaS 儲存型態：** PaaS 常使用 **provider 管理、customer application 存取的 database storage**（來源：`by-test/03` Q18）。

### 1.2 Deployment Model

| Model | Definition | 定義 |
|---|---|---|
| **Public cloud** | Provisioned for open use by the general public; owned, managed, operated by a cloud provider | 開放給一般公眾使用，由雲端服務提供者擁有、管理及營運 |
| **Private cloud** | Provisioned for exclusive use by a single organization | 僅供單一組織專屬使用 |
| **Hybrid cloud** | Composition of two or more distinct cloud infrastructures bound by standardized technology | 由兩個以上不同雲端基礎架構組成，透過標準化技術連結 |
| **Community cloud** | Provisioned for exclusive use by a specific community of consumers with shared concerns | 供具有共同關注事項的特定消費者群體專屬使用 |

**Hybrid 的三個必要條件**（來源：`by-test/07` §6.2）：

```text
Hybrid cloud = two or more distinct cloud infrastructures
They remain unique entities
They are bound together by standardized or proprietary technology
They enable data/application portability
```

不要被以下詞干擾：private ＋ public 同時出現不一定就足夠；multicloud 不一定是 hybrid。**Hybrid 的關鍵是 integration／portability／binding technology**。

#### 快速判斷（來源：`by-test/11` D1 §2）

```text
Exclusive organization?           → Private
Shared industry/regulation?       → Community
Mix different environments?       → Hybrid
Elastic general provider service? → Public
```

#### Private Cloud ≠ Private Network（來源：`by-test/11` D1 §1）

Private cloud 的重點**不是**「只能公司內部的人使用」，而是：

> **cloud infrastructure dedicated to one organization**

所以 private cloud 可以 Internet-facing、可以讓客戶透過 App／Browser 使用、可以由第三方託管、不一定放在企業自有機房。

```text
Customer
   |
Internet
   |
WAF / LB
   |
+-----------------------+
| Bank Private Cloud    |
| Web/API               |
| App                   |
| Core Banking          |
| Database / HSM        |
+-----------------------+
```

外部使用者可以使用服務，但 **backend infrastructure 仍只供該組織使用**。

```text
Private = dedicated to one organization
Private ≠ not Internet-facing
```

### 1.3 Cloud Actors / Roles

| Role | Function | 功能 |
|---|---|---|
| **CSP** (Cloud Service Provider) | Provides cloud services | 提供雲端服務 |
| **CSC** (Cloud Service Customer) | Uses cloud services | 使用雲端服務 |
| **Cloud Broker** | Aggregates, integrates, or manages cloud services | 仲介、整合或管理雲端服務 |
| **Cloud Reseller** | Purchases hosting/cloud services and resells to its own customers | 購買主機／雲端服務後轉售給自有客戶 |
| **Cloud Carrier** | Provides connectivity and transport | 提供連線與傳輸服務 |
| **Cloud Auditor** | Conducts independent assessment | 執行獨立評估 |

### 1.4 IaaS 商業價值

採用 IaaS 的**核心**商業驅動力是 **transfer of ownership cost**：將資本支出（CapEx）轉換為營運支出（OpEx），客戶只需按使用量付費，無需負擔完整建置成本。

可擴展性、按量計費、能源與冷卻效率皆為**次要**效益，不是主要驅動力。

### 1.5 Interoperability / Portability / Lock-in / Lock-out

| 名詞 | 定義 | 秒殺判斷 |
|---|---|---|
| **Interoperability** | 系統之間能否互通、協作、整合 | Work with provider tools |
| **Portability** | 系統／資料能否搬到其他平台或供應商 | Move to another provider |
| **Vendor lock-in** | 難以移出或替換 provider | 出不去 |
| **Vendor lock-out** | provider 倒閉／失效導致客戶失去資料存取 | 對方消失 |
| **Reversibility** | 能否把資料與流程取回並終止服務 | 契約層的退出能力 |

### 1.6 雲端基礎特性與虛擬化

```text
Oversubscription = committed demand > actual safely supportable capacity
Virtualization   = cloud scalability / resource abstraction / multi-tenancy 的核心促成技術
```

| Hypervisor | 判斷 |
|---|---|
| **Type 1** | bare-metal，直接跑在硬體上，直接管理 CPU／RAM／storage |
| **Type 2** | 跑在 host OS 之上 |
| **Container** | OS-level isolation，**不是** hypervisor |
| **VM** | virtual machine instance |

### 1.7 Sandbox 與 Service Model

**Sandbox 是 isolation pattern（isolated testing environment），不是 service model。** 它可以建在 IaaS、PaaS、containers、Kubernetes namespace、serverless 或 local VM 之上。

| Sandbox 型態 | 適用情境 | 誰管什麼 |
|---|---|---|
| **PaaS sandbox** | developer 只想開發、測試 application | Developer 管 code／application／data；Provider 管 runtime／middleware／OS／virtualization／hardware |
| **IaaS sandbox** | custom OS、malware analysis、custom firewall、IDS/IPS、packet capture、kernel testing、network segmentation、low-level security testing | Customer 管 guest OS／host firewall／VPC-VNet／subnet／routing／security groups／agents |

```text
Sandbox = isolation pattern
PaaS    = developer sandbox
IaaS    = sandbox requiring OS/network-level control
```

**判斷順序：** 先看 requirement 是否要求「security boundary／OS／network isolation 由 customer 控制」。若是，IaaS 較合理；若題幹只說 `software development and testing sandbox`，抓 keyword **development platform → PaaS**。

> **原則：** More control ≠ automatically more secure。**More control 同時代表 more responsibility。**

---

## 2. 錯題與修正規則 / Errors & Corrections

### 2.1 Service model 判斷不夠自動化

**錯題：** PaaS 是 application testing／development environment 的最佳 fit；IaaS 是 customer 控制最多的 model；SaaS 是 customer 維護最少的 model；vendor 基礎架構上的 application solution = SaaS。

**修正規則：** 先問「customer 自己要管到哪一層？」再對照 §1.1 的責任邊界表，不要用服務名稱猜。

### 2.2 Interoperability 誤判為 Portability

**錯題（`by-test/02` Q5）：** On-prem applications 能否和 provider hosted systems／tools 正常運作 → 正解 **Interoperability**，誤選 Portability。

**錯因：** 把「能不能一起運作」誤判為「能不能搬移」。

> **一句話規則：** Work with provider tools = Interoperability；move to another provider = Portability。

**延伸（`by-test/learnzapp/04` Q14）：** Production 在 CSP-A、backup 在 CSP-B，recovery 的最大技術風險是 **interoperability／proprietary format incompatibility**，不是範圍更大的 vendor lock-in。

> **ISC2 heuristic：** 選最直接阻礙 scenario objective 的答案，不要總是選範圍最大的風險。

### 2.3 Deployment model 在隱私／地理限制題選錯

**錯題（`by-test/02` Q10）：** 歐洲公司因個資法需確保資料不離開 approved country → 正解 **Private cloud**，誤選 Hybrid cloud。

**錯因：** 看到 cloud migration 與多 workload 就選 hybrid，但題目核心 constraint 是 geophysical location／privacy compliance。

**同類（`by-test/09` §9）：** community cloud vs public／private 混淆；高度敏感／受監管產業的正解通常是 private cloud。

> **一句話規則：** Strong privacy／location constraint → 優先 Private cloud，除非題目明確要求 hybrid integration。

### 2.4 Vendor lock-out 與 migration 風險複審

**錯題：** provider 倒閉導致客戶無法取回資料 = **vendor lock-out**（不是 lock-in）；migration 後的 risk review 不需要完全重做，因為 **cost-benefit phase** 已分析大量風險與成本。

### 2.5 Public cloud 治理責任歸屬

```text
Public cloud data center control governance = cloud provider
Regulator  → 訂定要求
Customer   → 定義需求並評估 provider
Provider   → 營運 provider 自有機房的控制措施
```

詳細的實體與機房控制見 [Domain 3 彙整講義](../domain3-infrastructure/01-consolidated-lecture.md)。

### 2.6 Europe／GDPR 是否等於 Private Cloud（`by-test/11` D1 §1）

常見反駁：「歐洲公司 production 搬上 cloud，為什麼一定 Private Cloud？Public Cloud 也能符合 GDPR。」

**實務上這個反駁成立。** Public cloud 可以透過 EU region、data residency、encryption、sovereignty controls、contractual safeguards 達成合規，所以 **Europe／GDPR ≠ automatically Private Cloud**。

**但 CCSP 題目真正想抓的是**：只有在題幹**同時**暗示下列條件時才傾向 Private cloud。

```text
maximum control
dedicated infrastructure
isolation
organizational exclusivity
strict governance
```

與 §2.3 併讀：強隱私／地理限制題仍優先 Private，但要確認題幹有上述治理語彙，而不是只看到「歐洲」或「GDPR」就選。

### 2.7 歸屬他域的相關主題

- **Insider threat 的控制分類**（`by-test/11` D1 §4）→ [Domain 5 §1.6](../domain5-operations/01-consolidated-lecture.md)
- **ISO 27001 technology-neutral**（`by-test/11` D1 §5）→ [Domain 6 §1.2](../domain6-legal-compliance/01-consolidated-lecture.md)

---

## 3. 一句話規則表 / One-liner Rules

| # | 規則 |
|---|---|
| 1 | SaaS = CSP 管最多，customer 管最少；IaaS 反之。 |
| 2 | PaaS = 開發／測試／部署 application 的最佳 fit，儲存常為 provider 管理的 database。 |
| 3 | Public = 一般公眾；Private = 單一組織專屬；Community = 共同 concern 的群體；Hybrid = 兩個以上獨立雲以標準化技術綁定。 |
| 4 | Hybrid 的關鍵不是「有 public 也有 private」，而是 integration／portability／binding technology。 |
| 5 | Broker 仲介整合；Reseller 買來轉售給自有客戶；Carrier 只管連線傳輸；Auditor 做獨立評估。 |
| 6 | IaaS 的主要商業驅動力是 ownership cost transfer（CapEx → OpEx），不是 scalability。 |
| 7 | Work with = Interoperability；Move to = Portability。 |
| 8 | Lock-**in** 是出不去；Lock-**out** 是 provider 消失導致取不回資料。 |
| 9 | 嚴格的隱私／資料地理限制 → Private cloud；hybrid 不會自動正確。 |
| 10 | Type 1 = bare-metal；Type 2 = 跑在 host OS 上；Container 不是 hypervisor。 |
| 11 | Oversubscription = 承諾量超過實際可安全支撐的容量。 |
| 12 | Public cloud 機房控制的治理者是 provider；regulator 訂要求、customer 評估。 |
| 13 | **Private = dedicated to one organization；Private ≠ not Internet-facing。** |
| 14 | 歐洲／GDPR 不等於一定要 private cloud；public cloud 可用 region、residency、加密與合約達成合規。 |
| 15 | 只有題幹同時出現 maximum control／dedicated／isolation／exclusivity／strict governance 才傾向 Private。 |
| 16 | Sandbox 是 isolation pattern，不是 service model。 |
| 17 | 純開發測試 sandbox → PaaS；需要 OS／network 層控制的 sandbox → IaaS。 |
| 18 | More control ≠ more secure；more control 同時代表 more responsibility。 |

---

## 4. 易混淆邊界 / Confusable Boundaries

| A | B | 切法 |
|---|---|---|
| Interoperability | Portability | 一起運作 vs 搬得走 |
| Vendor lock-in | Vendor lock-out | 自己走不了 vs 對方倒了 |
| Hybrid cloud | Multicloud | 有無 binding technology 與 portability 整合 |
| Private cloud | Community cloud | 單一組織 vs 多組織共同 concern |
| Type 1 hypervisor | Type 2 hypervisor | 直接跑硬體 vs 跑在 host OS |
| Hypervisor | Container | 虛擬化整個 OS vs OS-level isolation |
| Cloud broker | Cloud reseller | 仲介整合管理 vs 買斷後轉售 |
| Private cloud | Private network | 專屬的雲端基礎架構 vs 不對外連通的網路 |
| PaaS sandbox | IaaS sandbox | 現成開發測試平台 vs 需自控 OS／網路隔離 |
| Sandbox | Service model | 隔離模式 vs 服務交付層級 |

### 決策流程

1. 題幹提到 **general public／open use**？→ Public cloud
2. 提到 **exclusive use by one organization**？→ Private cloud
3. 提到 **resale／own customers**？→ Reseller
4. 問 **primary benefit／business driver**？→ Ownership cost transfer

---

## 5. 補強演練 / Drills

### Drill A：三張對照表（30 分鐘，閉卷默寫）

1. SaaS／PaaS／IaaS 責任邊界
2. public／private／hybrid／community／multicloud
3. lock-in／lock-out／portability／interoperability／reversibility

### Drill B：Cloud Actors（10 分鐘）

寫出 CSP、CSC、broker、reseller、carrier、auditor 各一句功能，並各造一個題幹線索。

### Drill C：20 題 D1 drill

目標 ≥ 75%。若低於 70%，隔天不要做綜合模考，先補 D1。

### 自我檢測

- Hybrid cloud 的三個必要條件是什麼？
- 「backup 在另一家 CSP，還原不回來」最直接的風險名詞是什麼？
- IaaS 的主要商業驅動力是什麼？為什麼不是 scalability？
- Oversubscription 的定義中，被比較的兩個量各是什麼？
