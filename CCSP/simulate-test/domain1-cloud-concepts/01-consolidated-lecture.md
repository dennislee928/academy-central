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
| `by-test/13-d2-d6-drill-2026-10-03-weakness-lecture.md` | Part 1 §8 Quantum computing | §1.8 |
| 2026-10-04 D6 補強講義（內容已併入，原檔未封存） | §9 Cloud actors：Carrier vs Broker | §1.3 |
| 2026-10-07 D3 ＋ D6 錯題補強與本輪 recall（內容已併入，原檔未封存） | 供應商鎖定雙層模型、media 分類、private cloud plane 區分 | §1.2、§1.5 |

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

**哪一層可以對外、哪一層要鎖死：**

| 層 | 對外暴露 |
|---|---|
| Web／API／application plane | 通常**可以**對外（客戶要用服務） |
| **Management plane、config plane、admin interface** | **應嚴格限制**，不對公網開放 |

與 [Domain 3 §1.4](../domain3-infrastructure/01-consolidated-lecture.md) 的管理平面隔離原則一致——「private cloud 可以 Internet-facing」指的是服務平面，不是管理平面。

### 1.3 Cloud Actors / Roles

| Role | Function | 功能 |
|---|---|---|
| **CSP** (Cloud Service Provider) | Provides cloud services | 提供雲端服務 |
| **CSC** (Cloud Service Customer) | Uses cloud services | 使用雲端服務 |
| **Cloud Broker** | Aggregates, integrates, or manages cloud services | 仲介、整合或管理雲端服務 |
| **Cloud Reseller** | Purchases hosting/cloud services and resells to its own customers | 購買主機／雲端服務後轉售給自有客戶 |
| **Cloud Carrier** | Provides connectivity and transport | 提供連線與傳輸服務 |
| **Cloud Auditor** | Conducts independent assessment | 執行獨立評估 |

#### Carrier vs Broker（最常混的一組）

```text
Carrier carries traffic.    → connectivity / transport（ISP、telecom、transport path）
Broker manages services.    → 管理、整合、協商 cloud services
```

**Carrier 在路徑上的位置：**

```text
Consumer
   │
 network
   │
Carrier
   │
 network
   │
Provider
```

**Broker 的架構與三種行為：**

```text
Customer
   │
 Broker
 ├── AWS
 ├── Azure
 └── GCP
```

Broker 可能執行 **aggregation**（彙總多個服務）、**intermediation**（加值中介）、**arbitrage**（在供應商之間動態選擇）。

> 與 **Reseller** 的差別見上表：reseller 是買斷後轉售給自有客戶，broker 是仲介、整合與管理。

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

#### ⭐ 降低供應商鎖定的雙層模型

> **`降低供應商鎖定 = 技術可移轉性 ＋ 合約退出保障`**

```text
              降低供應商鎖定
                     │
          ┌──────────┴──────────┐
          ↓                     ↓
      技術可移轉性            合約退出保障
          │                     │
     開放格式                 匯出權
     標準介面                 匯出時限
     可移植設定               轉移協助
     IaC                      終止條款
     備份匯出                 費用／刪除
          │                     │
          └──────────┬──────────┘
                     ↓
                  退出策略
```

| 層 | 具體手段 |
|---|---|
| **技術可移轉性** | 開放／非專有資料格式、標準介面、可移植映像格式、Kubernetes YAML、IaC、標準化日誌格式、可匯出的備份、避免過度依賴單一 CSP 專有服務、**定期測試資料匯出與復原** |
| **合約退出保障** | 資料匯出權、匯出格式、匯出期限、轉移協助、終止條款、退出費用、終止後資料保留期限、資料刪除、API／account termination timing |

> **不要背「合約永遠比技術措施重要」。** 兩層缺一不可：技術上搬得走，供應商在法律與商業上也必須允許並協助搬遷。依題幹判斷問的是技術層還是合約層。
>
> 技術需求由誰定義、誰負責寫進合約，見 [Domain 6 §1.6](../domain6-legal-compliance/01-consolidated-lecture.md)。

#### industry-standard「media」的精確分類

題庫以 `industry-standard media` 泛稱可降低鎖定的手段，措辭含糊（標 `[Q]`）。精確分類：

| 項目 | 更精確的名稱 |
|---|---|
| JSON | 資料交換格式 |
| ISO image | 磁碟映像格式 |
| Syslog | 日誌格式／傳輸標準 |
| YAML | 設定表示格式 |
| Terraform／OpenTofu HCL | IaC 設定語言 |
| Kubernetes manifests | 可移植的工作負載設定 |
| Backup | 備份資料／復原工件 |
| Vault secret | **秘密資料，不是「媒介」** |

共同點確實是**降低對單一供應商專有格式的依賴**，但**不要把 media 當成現代雲端架構的精準分類**。

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

### 1.8 相關與新興技術

依 ISC2 outline，related／emerging technologies 歸在 Domain 1。這類題多半是**關鍵字直送**，不要求原理。

#### Quantum computing（來源：`by-test/13` Part 1 §8）

題幹出現下列任一關鍵字，優先選 **quantum computing**：

```text
superposition
qubit
entanglement
quantum interference
```

其中 `superposition of physical states` 幾乎是送分 keyword。

**反例提醒：** **AONT-RS**（All-or-Nothing Transform + Reed-Solomon）屬於 data transformation／dispersion，**不是** quantum computing——詳見 [Domain 2 §1.5](../domain2-data-security/01-consolidated-lecture.md)。密碼學本身的整理在 [Domain 2 §1.7](../domain2-data-security/01-consolidated-lecture.md)。

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
| 19 | 看到 superposition／qubit／entanglement／quantum interference → **quantum computing**。 |
| 20 | AONT-RS 是 data dispersion，不是 quantum computing。 |
| 21 | **Carrier carries traffic；Broker manages services。** |
| 22 | Broker 的三種行為：aggregation、intermediation、arbitrage。 |
| 23 | **降低供應商鎖定 = 技術可移轉性 ＋ 合約退出保障**；不是「合約永遠勝過技術措施」。 |
| 24 | 技術層：開放格式、標準介面、IaC、K8s manifest、可匯出備份、定期測試匯出與復原。 |
| 25 | 合約層：匯出權／格式／期限、轉移協助、終止條款、退出費用、終止後保留與刪除。 |
| 26 | `industry-standard media` 是含糊措辭；JSON/YAML/HCL/K8s manifest 各有精確名稱，Vault secret 不是「媒介」。 |
| 27 | Private cloud 可對外的是 web／API／application plane；**management／config／admin plane 要鎖死**。 |

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
| Quantum computing | AONT-RS | superposition／qubit 關鍵字 vs 資料轉換與分散 |
| Cloud carrier | Cloud broker | 載送流量（連線與傳輸） vs 管理整合服務 |
| 技術可移轉性 | 合約退出保障 | 搬得走 vs 法律上允許並協助搬 |
| Application plane | Management plane | 可對外的服務介面 vs 必須鎖死的管理介面 |

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
- 降低供應商鎖定的兩層各包含哪些手段？為什麼不能只靠合約？
- Private cloud 的哪一層可以對外、哪一層必須鎖死？
