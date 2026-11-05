# CCSP Domain 1：Cloud Concepts, Architecture and Design 彙整講義

> **範圍：** `simulate-test/` 內所有測驗講義中屬於 Domain 1 的內容，跨場次合併後依主題重組。
> **考試權重：** 17%
> **來源：** `by-test/01`、`by-test/02`、`by-test/03`、`by-test/04`、`by-test/07`、`by-test/09`、`by-test/learnzapp/04`、2026-10-27 D1 Fresh、2026-10-30／10-31／11-03 錯題講義、2026-11-05 Gap Remediation
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
| 2026-10-15 D1 錯題補強（內容已併入，原檔未封存） | Common Criteria／EAL1–7、CEO 遷雲 = cost `[Q]` | §1.9、§2.8、§2.9 |
| 2026-10-27 D1 Fresh 講義與閃卡（內容已併入，原檔未封存） | §0–§1 量詞／角色／抽象層級判讀、§2 Q2 all cloud models、Q5 metered service、§3 檢查表、§4 最短模型；Q1 → D4、Q3 → D4、Q4 → D6 | §1.10、§2.7、§2.10、§2.11 |
| 2026-10-30 今日錯題講義與閃卡（內容已併入，原檔未封存） | §1 Common Criteria publisher、§3 provider automation、§7 D1 操題模型（已由 §1.10 涵蓋）；§2 Data Controller → D6、§4 NIST Price → D6、§5 ECC → D2、§6 Isolation → D3 | §1.9、§2.7、§2.12、§2.13 |
| 2026-10-31 今日講義與閃卡（內容已併入，原檔未封存） | §5 security controls vs cloud TCO；§1 process isolation → D3／D4、§2 ISO 27018 → D6、§3 Secure KVM → D3、§4 TPI → D2、§6 Notorious Nine → D2 | §2.7、§2.14 |
| 2026-11-03 今日講義與閃卡（內容已併入，原檔未封存） | §5 CEO reduced cost 再現、§10.6 `best / biggest / most` 警戒、§6 compute 抽象層級（概念 → D3）；§1 → D2、§2 → D6、§3／§4／§8 → D3、§7 → D4 | §1.10、§2.7、§2.9 |
| 2026-11-05 Gap Remediation 講義與閃卡（內容已併入，原檔未封存） | §0 共同錯誤模式、§6 TOE／PP／ST、§8 跨主題判斷表、§10 closed-book drill、§11 考場口訣、使用優先度 | §1.9、§1.10、§3、§4、§5 Drill D |

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

### 1.9 Common Criteria 與 EAL（來源：2026-10-15 D1 錯題補強）

依 ISC2 outline，產品認證（**Common Criteria**、FIPS 140-2/3）屬於 1.5 Evaluate cloud service providers，歸在 Domain 1。

**共同準則（Common Criteria, CC）：** 對 IT 產品的安全功能與安全保證進行標準化評估。

**Evaluation Assurance Level（EAL，評估保證等級）** 衡量的**不是**產品「有多安全」，而是：

> **對產品的安全設計、實作與測試，做了多嚴格、多深入的驗證。**

```text
EAL 越高
   ↓
評估證據更多
設計分析更深入
驗證更嚴格
形式化程度更高
```

> **EAL7 ≠ 產品一定比 EAL4 更適合某個環境。** EAL 代表的是**保證／驗證嚴謹程度**。

#### ⭐ EAL1–EAL7 對照表

| EAL | 官方核心概念 | 中文理解 | Trigger |
|---:|---|---|---|
| **EAL1** | Functionally Tested | 功能測試 | Functional |
| **EAL2** | Structurally Tested | 結構化測試 | Structural |
| **EAL3** | Methodically Tested and Checked | 有系統地測試與檢查 | Tested + Checked |
| **EAL4** | Methodically Designed, Tested and Reviewed | 有系統地設計、測試與審查 | Designed + Reviewed |
| **EAL5** | Semiformally Designed and Tested | 半形式化設計與測試 | Semi-formal Design |
| **EAL6** | Semiformally Verified Design and Tested | 半形式化驗證設計與測試 | Semi-formal Verification |
| **EAL7** | Formally Verified Design and Tested | 形式化驗證設計與測試 | **Formal Verification** |

#### 分界看動詞，不看數字

```text
EAL1 功能測試
  ↓
EAL2 結構化測試
  ↓
EAL3 有系統地「測試＋檢查」
  ↓
EAL4 有系統地「設計＋測試＋審查」
  ↓
EAL5 半形式化「設計」
  ↓
EAL6 半形式化「驗證」
  ↓
EAL7 形式化「驗證」
```

**口訣：** **1 功、2 構、3 測查、4 設測審、5 半設、6 半驗、7 全驗**

#### ⭐ EAL5／6／7：最容易出選項陷阱的三個

```text
Semi-formally designed  → EAL5（半設）
Semi-formally verified  → EAL6（半驗）
Formally verified       → EAL7（全驗）
```

**EAL3 vs EAL4：** 3 = 測＋查（`methodically tested and checked`）；4 = 設＋測＋審（`methodically designed, tested and reviewed`）。

> **答題 trigger：** 題幹出現 `formally verified` 即直接 **EAL7**。`independent third party` 不是決勝字眼——不要建立「third-party test → EAL7」的錯誤 association。

#### 標準出版者 vs 認證體系：ISO/IEC、CCRA、National Scheme（來源：2026-10-30 錯題，`[Q]`）

Common Criteria 的技術標準對應 **ISO/IEC 15408**（IT security evaluation criteria）與 **ISO/IEC 18045**（Common Evaluation Methodology，CEM）。ISO/IEC 出版並維護這些標準，但**不直接運作全球 CC certification program、也不直接發產品證書**。

```text
ISO/IEC
   └── publishes ISO/IEC 15408 / 18045
             │
             ▼
Common Criteria / CCRA ecosystem
     ┌───────┴────────┐
     ▼                ▼
National Scheme    Licensed Labs
     │
     ▼
Certificate
```

- **CCRA**（Common Criteria Recognition Arrangement）：國際互認架構。
- **National schemes／Certification Bodies**：各國實際執行認證、發證。
- **Licensed labs**：執行評估。

> **口訣：ISO 寫規格，CCRA 做互認，各國 scheme 發證。**

#### TOE／PP／ST：評估用語（來源：2026-11-05，`[T]`）

| 名詞 | 全名 | 定義 |
|---|---|---|
| **TOE** | Target of Evaluation | 被評估的產品／系統或其明確範圍 |
| **PP** | Protection Profile | 某類產品的通用 security requirements |
| **ST** | Security Target | 特定 TOE 聲明要滿足的 security requirements |
| **EAL** | Evaluation Assurance Level | 對 security claims 的 assurance rigor |

```text
PP = product-category requirement profile
ST = this specific TOE's security claim
```

**Higher EAL 不等於：** security features 一定更多、適合所有 organization、EAL7 一定比 EAL4「功能更安全」。

參考：[Common Criteria Portal](https://www.commoncriteriaportal.org/)。

STAR、Uptime Tier、EAL 三套數字的對照見 [Domain 6 §4](../domain6-legal-compliance/01-consolidated-lecture.md)（STAR 1–2、Tier I–IV、EAL1–7）。

### 1.10 D1 題目判讀模型：量詞、角色、抽象層級（來源：2026-10-27 D1 Fresh）

高投報率的 ISC2 解題順序：**先判讀題目的量詞、角色、抽象層級，再進入技術細節。** D1 fresh 題優先掃描：

- `all / always / every`
- `most / best / primarily / typically`
- provider / customer / consumer / broker / carrier / auditor
- IdP / SP / RP / broker
- control 本身 vs 促成因素（enabler）
- technical role vs commercial／legal role

#### 量詞 `all / always / every` → 算交集

不要先找現實世界反例，先算集合：

```text
IaaS ∩ PaaS ∩ SaaS
```

判斷依據：哪一個選項在**所有 service model 的預設語義下**都成立？`all` 題的核心不是「能不能想出一個反例」，而是「哪個選項最接近 universal common denominator」。例：`In all cloud models, the customer will be given access and ability to modify ...` → **Data**（見 §2.10）。

#### 量詞 `most / best / primarily / typically` → 找預設語義

```text
Default / normal semantics
    >
common architecture
    >
edge case
```

`best` 不代表其他選項完全沒用，而是問：哪個答案對題幹目標**最直接、最一般、假設最少**。技術上兩個答案都合理時，比較直接性、一般性與需要的額外假設。

```text
Direct control
> enabling condition
> supporting capability
> downstream consequence
```

**`best / biggest / most` 先警戒 context 是否足夠（來源：2026-11-03）：** 題幹沒給 RTO／RPO、預算、規模、business objective 等必要條件時，題庫答案往往是 heuristic（例：CEO 遷雲 → cost、小型醫療中心 → 自建 DC，見 §2.9 與 [Domain 3 §2.16](../domain3-infrastructure/01-consolidated-lecture.md)）。處理方式：先找 ISC2 management／risk／business perspective；**不要把題庫 heuristic 當 universal truth**，此類題標 `[J]` 或 `[Q]`。

#### 角色：先拆商業角色與技術角色

| 類別 | 角色 |
|---|---|
| 商業角色 | CSP（Cloud Service Provider）、CSC（Cloud Service Customer） |
| 技術角色 | IdP（Identity Provider）、SP／RP（Service Provider／Relying Party）、Broker（federation intermediary）、Carrier（connectivity／transport）、Auditor（assessment／assurance） |

一個實體可能同時扮演多個角色：

```text
某 CSP
├─ 是 cloud provider
├─ 也可能是 IdP
└─ 也可能提供 broker service
```

題目若明確說 centralized broker federation，優先依 **federation role** 解（SAML assertion 題見 [Domain 4 §2.12](../domain4-application/01-consolidated-lecture.md)）。CSP ≠ IdP；Broker（federation）≠ Carrier。

#### 抽象層級：先問選項在哪一層

```text
1. Technical mechanism
2. Security control
3. Service characteristic / architecture
4. Business / economic / governance enabler
```

BC/DR 例：

```text
Replication       → 直接技術能力
Backup            → 直接復原能力
Geo-distribution  → 直接 resiliency
Metered service   → 經濟／營運促成因素
```

**Abstraction mismatch：** 把不同層級的正確敘述互相比較，例如拿「Metered service 有助 DR 成本」和「Replication 直接提供 DR 能力」相比（見 §2.11）。

**上位詞不自動優先：** 題目同時出現上位概念（security、risk management、enhancement mechanisms）與精確 property／stage（confidentiality、assess、process isolation）時，依題幹的 abstraction level 作答——問 property 就選 property，問特定 stage 就選該 stage；優先選**正式、可驗證、能直接映射題幹**的概念（process isolation 例見 [Domain 4 §2.15](../domain4-application/01-consolidated-lecture.md)）。

**資源本體 vs 實作形式（來源：2026-11-03）：** `Compute is made up of ___ and ___` 問的是資源構成（**CPU + RAM**），`virtualized / physical` 描述的是實作形式，SSD／HDD 屬 storage——同樣是 abstraction level error（概念見 [Domain 3 §1.4](../domain3-infrastructure/01-consolidated-lecture.md)）。

#### D1 Fresh 解題檢查表

| Step | 先判斷什麼 | 快速例子 |
|---|---|---|
| 1 | 有沒有 `all / always / every`？ | 算交集，不先找反例 |
| 2 | 有沒有 `most / best / primarily / typically`？ | 找 default，不選 edge case |
| 3 | 是商業角色還是技術角色？ | CSP ≠ IdP；Broker ≠ Carrier |
| 4 | 題目在哪個 abstraction level？ | mechanism／control／architecture／governance／economics |
| 5 | 哪個答案假設最少？ | 不補題目沒說的架構條件 |

**錯題紀錄欄位：** `Q# / Quantifier / Role / Level / 作答 / 理由 / Confidence`，答錯後再貼 `[K/T/J/R/Q]` 標籤（見 [README](../README.md)）。

> **口訣：量詞看交集，角色看職責，最佳看預設，答案看層級。**

#### Role／Property／Mechanism／Implementation：先判斷題目問哪一層（來源：2026-11-05，`[T]`）

Federation、classification、TPI、sandbox 這批 recurring 錯題，多半不是核心技術不會，而是以下三種模式：

| 錯誤模式 | 內容 | 例子 |
|---|---|---|
| **Role confusion** | 把 federation 的角色名稱與一般商業角色混在一起 | 把 SAML `SP` 理解成「提供 federation service 的公司」（[Domain 4 §1.5](../domain4-application/01-consolidated-lecture.md)） |
| **Property vs Implementation** | 把安全性質與某個具體實作混在一起 | 把 two IAM matrices 當成 TPI 的定義（[Domain 2 §1.11](../domain2-data-security/01-consolidated-lecture.md)） |
| **Abstraction-level mismatch** | 題目問哪一層，答案卻選了另一層 | 題目問 classification 要配什麼 protection，卻選 metadata（[Domain 2 §2.19](../domain2-data-security/01-consolidated-lecture.md)） |

> **總口訣：先判斷題目問 Role、Property、Mechanism，還是 Implementation。**

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
- **Cloud developer training：encryption vs regulatory mandates**（2026-10-27 D1 Fresh Q1，`[Q]` 中度）→ [Domain 4 §2.11](../domain4-application/01-consolidated-lecture.md)
- **Brokered federation 中誰發 SAML assertion**（2026-10-27 D1 Fresh Q3，`[T]`）→ [Domain 4 §2.12](../domain4-application/01-consolidated-lecture.md)
- **PCI SSC 能否處罰／是否為 regulator**（2026-10-27 D1 Fresh Q4，`[Q]` 重度）→ [Domain 6 §2.8](../domain6-legal-compliance/01-consolidated-lecture.md)
- **Data Controller = WHY + HOW**（2026-10-30，`[T]`）、**NIST SP 800 = Price**（2026-10-30，`[Q]`）、**ISO 27018:2025**（2026-10-31，`[K]`）、**CSA STAR Level 1／2**（2026-11-03，`[T]`）→ [Domain 6](../domain6-legal-compliance/01-consolidated-lecture.md)
- **ECC = public-key + 短 key**（2026-10-30，`[K]`）、**TPI 增補**、**Notorious Nine／data loss**（2026-10-31）、**classification 在 Create**（2026-11-03，`[T]`）→ [Domain 2](../domain2-data-security/01-consolidated-lecture.md)
- **DNSSEC＋IPsec＋TLS ≠ Isolation**（2026-10-30，`[Q]`）、**Process isolation 概念**、**Secure KVM 與 TPM**（2026-10-31）、**Compute = CPU + RAM**、**Uptime Tier 與小型醫療中心自建 DC**、**Loosely coupled storage cluster**（2026-11-03）→ [Domain 3](../domain3-infrastructure/01-consolidated-lecture.md)
- **Secure software development → Process isolation**（2026-10-31，`[T]`）、**IdP vs RP/SP**（2026-11-03，`[T]`）→ [Domain 4](../domain4-application/01-consolidated-lecture.md)

### 2.8 EAL3 誤選為 formally verified（2026-10-15）

**錯題：** 題幹 `formally verified in terms of design and tested`（並提到 independent third party）→ 正解 **EAL7**，誤選 EAL3。

**錯因：** EAL3 是 `methodically tested and checked`，與 `formally verified` 差距極大；且被 `independent third party` 分散注意力。

**分類：** `[T]`（terminology），**降權：無**——有效錯題，值得修。

> **一句話規則：** Formal verification → EAL7；Semi-formal verification → EAL6；Semi-formal design → EAL5。詳見 §1.9。

### 2.9 CEO 遷雲最大因素 = 成本（2026-10-15，`[Q]` 中高降權）

**錯題：** CEO／senior management 遷雲的 biggest factor → 題庫答案 **Reduced overall cost**，誤選 Global accessibility。

四個選項（network scalability、off-site backup、global accessibility、reduced cost）都是合理的 cloud benefits；題幹沒有提供 business objective、既有基礎架構成本、目標市場、人員分布、應用架構或既有備援能力，因此無法客觀證明 cost 一定是 biggest factor。

**題庫邏輯：** 把 technical characteristics（scalability、backup、accessibility）與 business／financial outcome 做層級比較，依 ISC2 managerial-answer heuristic 選後者。這只是 **best-answer heuristic**，不是普遍事實。

```text
CEO / Board / Senior Management
           ↓
Business objectives、Risk、Financial impact、Compliance、Strategy、Agility
```

**分類：** `[Q]`（題目品質），**降權：中高**。不代表不懂 cloud adoption benefits。

**再現（2026-11-03）：** 同題再出現，題庫答案 `reduced overall cost due to outsourcing administration`。真實世界的遷雲驅動因素還包括 elasticity、time-to-market、resilience、global reach、CapEx → OpEx、modernization、skill shortage、M&A、managed services——**cloud 不保證比較便宜**（另見 §2.14：list price ≠ TCO）。考場 heuristic：

```text
CEO / senior management
+ 沒有 technical constraints
+ 問 biggest / primary / most important
→ 先看 business value、risk、cost／TCO、strategy、governance
→ 再看 technical feature／protocol／implementation detail
```

> **一句話規則：** 高階管理者題 → 優先從 business outcome／organizational risk 思考；**不要背成「CEO = Cost」**。

### 2.10 In all cloud models, customer can modify what?（2026-10-27 D1 Fresh Q2，`[J]` 輕度降權）

**錯題：** 題庫答案 **Data**，誤選 Security controls。

**反駁在技術上成立：** 以 Cloudflare 為例，customer 可以設定 WAF、managed rules、bot controls、ZTNA policy、IAM。

**但題目寫 `in all cloud models`**，所以要算 `IaaS ∩ PaaS ∩ SaaS`：security controls 的 customer control 隨 service model 改變；**data responsibility／control 是最穩定的共同交集**。

**題庫措辭仍太絕對：** `access and ability to modify data` 在真實世界有 immutable logs、WORM、password hash、object lock、legal hold 等例外。精確說法是：customer retains responsibility／control over its data，subject to service capability、policy、immutability 等限制；不代表所有 data object 都可任意修改。

```text
all service models
→ 找共同交集
→ Data 最穩
```

### 2.11 BC/DR benefit EXCEPT：Metered service（2026-10-27 D1 Fresh Q5，`[J]` 中度降權）

**錯題：** 題庫答案 **Metered service**，誤選 Regular backups offered by cloud providers。

**反駁在技術上成立：** metered service 可以讓 pilot light、warm standby、on-demand DR capacity 更有成本可行性。

**但題庫在考 abstraction level：**

```text
Replication             → direct mechanism
Backup                  → direct recovery mechanism
Distributed processing  → direct resiliency
Metered service         → economic / operational enabler
```

題目若問「which makes DR more cost-effective」，metered service 可能是答案；若問「directly enhances recovery capability」，replication／backup 更直接。

> **一句話規則：** Direct mechanism ＞ enabling condition ＞ economic benefit。

### 2.12 Common Criteria certification program 的發布者 = ISO（2026-10-30 錯題，`[Q]` 中度降權）

**錯題：** `What is the organization that publishes and maintains the Common Criteria certification program for IT products?` → 題庫答案 **ISO**（其他選項 NIST、NATO、UNESCO）。

**問題：** 題目把 **standards publisher** 與 **certification scheme** 混為一談。ISO/IEC 出版 15408／18045；CCRA 負責互認；national schemes 實際發證（見 §1.9）。

**考場：** 選項只有 NIST／ISO／NATO／UNESCO、且 wording 明顯在問「標準來源」→ 選 **ISO**。但不要背成「ISO = 全球 CC 發證機關」。

> **一句話規則：** ISO/IEC = CC 標準；CCRA = 國際互認；national scheme = 實際 certification。

### 2.13 Cloud provider 最應關注的 architecture trait（2026-10-30 錯題，`[J]`）

**錯題：** 題庫答案 **Automating service enablement**，誤選 MTTR。

**判讀：** 題目不是說 MTTR 不重要，而是問哪一個最像 **cloud provider 的核心 operating model**。Provider 要處理大量 tenants、重複 provisioning、elasticity、self-service、標準化部署、API-driven operations、低 marginal operational cost：

```text
Automation
  ↓
Repeatability
  ↓
Scalability
  ↓
Lower manual cost
  ↓
Cloud operating model
```

MTTR／MTBF 是 reliability metrics，重要但不是 provider 最具代表性的 architecture trait。

> **一句話規則：** Provider 題先想 **automation／scale／standardization**。

### 2.14 什麼會侵蝕遷雲的實際財務效益？Security controls and countermeasures（2026-10-31 錯題，`[J]`）

**錯題：** Cloud migration 可能省錢，但什麼會侵蝕實際 financial benefit？→ 題庫答案 **Security controls and countermeasures**。

**`Security controls` 不只代表 network／software controls：** 它是上位集合，含技術／邏輯控制（WAF、MFA、KMS、DLP、SIEM）、network controls（firewall、segmentation、VPN、ZTNA）、管理控制（policy、training、audit、change management）、physical／environmental controls。但在 CSC migration TCO 語境中，題庫主要指 **customer 額外負擔的 technical／operational／compliance security overhead**：

```text
Cloud base price
+ WAF
+ KMS/HSM
+ SIEM/logging
+ DLP
+ backup/replication
+ private connectivity
+ audit/compliance
= Real TCO
```

> **一句話規則：** **Cloud list price ≠ Cloud TCO。**

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
| 28 | **EAL 衡量驗證嚴謹程度，不是產品安全程度**；EAL7 ≠ 一定比 EAL4 更適合。 |
| 29 | EAL 口訣：**1 功、2 構、3 測查、4 設測審、5 半設、6 半驗、7 全驗**。 |
| 30 | **Formally verified → EAL7**；semi-formally verified → EAL6；semi-formally designed → EAL5。 |
| 31 | `independent third party` 不是 EAL7 的判斷字眼，`formally verified` 才是。 |
| 32 | 高階管理者題 → business outcome／organizational risk；**不要背成「CEO = Cost」**（`[Q]` 中高降權）。 |
| 33 | `all / always / every` → 算 **IaaS ∩ PaaS ∩ SaaS** 交集，不先用 edge case 找反例。 |
| 34 | `most / best / primarily / typically` → default semantics，選最直接、最少假設的答案。 |
| 35 | CSP／CSC 是商業角色；IdP／SP／RP／Broker 是 federation 角色；同一家公司可兼任，但概念不同。 |
| 36 | `In all cloud models` 的 customer 共同控制面 → **Data**（security controls 隨 service model 改變）。 |
| 37 | **Direct mechanism ＞ enabling condition ＞ economic benefit**；metered service 是 BC/DR 的經濟促成因素，不是復原機制。 |
| 38 | 口訣：**量詞看交集，角色看職責，最佳看預設，答案看層級。** |
| 39 | **ISO 寫規格（15408／18045），CCRA 做互認，各國 scheme 發證**；ISO ≠ 全球 CC 發證機關（`[Q]`）。 |
| 40 | Provider architecture 題 → **automation → repeatability → scalability**；MTTR／MTBF 是 reliability metric，不是 provider 核心 trait。 |
| 41 | **Cloud list price ≠ actual TCO**；security controls／compliance／operations overhead 會侵蝕遷雲財務效益。 |
| 42 | `best / biggest / most` 但 context 不足 → 找 management／risk／business perspective，不把題庫 heuristic 當 universal truth。 |
| 43 | 上位詞不自動優先；**正式、可驗證、可直接映射題幹**的概念才優先。 |
| 44 | CEO 題 → business outcome first；cost 只是 heuristic，**cloud 不保證比較便宜**。 |
| 45 | **PP = 產品類別的通用 requirements；ST = 特定 TOE 的 security claim；TOE = 被評估的範圍。** |
| 46 | Higher EAL = greater assurance／evaluation rigor，不等於 security features 更多。 |
| 47 | 先判斷題目問 **Role、Property、Mechanism 還是 Implementation**，再看選項。 |

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
| EAL3 | EAL4 | 有系統地測試＋檢查 vs 有系統地設計＋測試＋審查 |
| EAL5 | EAL6 | 半形式化**設計** vs 半形式化**驗證** |
| EAL6 | EAL7 | **半**形式化驗證 vs **全**形式化驗證 |
| PP（Protection Profile） | ST（Security Target） | 某類產品的通用 requirements vs 特定 TOE 的 security claim |
| Property | Implementation | 必須成立的安全性質 vs 達成該性質的其中一種做法 |
| EAL 等級 | 產品安全程度 | 驗證的嚴謹與深入程度 vs 產品本身多安全 |
| CSP（商業角色） | IdP（技術角色） | 提供 cloud service vs 發出 identity assertion |
| `all` 題 | `best` 題 | 算共同交集 vs 找預設語義下最直接的答案 |
| Replication／Backup | Metered service | 直接復原機制 vs 經濟／營運促成因素 |
| ISO/IEC 15408 | CCRA／National scheme | 標準出版 vs 國際互認／實際發證 |
| Automation（provider trait） | MTTR／MTBF | 雲端營運模式核心 vs reliability metric |
| Cloud list price | Cloud TCO | 牌價 vs 加上 security／compliance／operations overhead 的實際總成本 |
| 資源構成（CPU + RAM） | 實作形式（virtual／physical） | 問「由什麼組成」vs 問「如何實現」 |

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

### Drill D：2026-11-05 跨域 closed-book（15 分鐘）

不看講義，每題 2–5 秒回答：

```text
IdP? SP/RP? Broker? Federation Authority?
Metadata? Classification? Controls? Policy?
Sandbox? Process Isolation?
TPI? SoD? Split Knowledge?
Secure KVM? TPM?
TOE? PP? ST? EAL?
Controller? Processor? Regulator?
```

**Gate（共 22 項）：**

- **20–22 項秒答**：這批 cluster 進 maintenance
- **17–19 項**：只複習答不出的項目
- **≤16 項**：隔天再做同一組 recall，不增加 LearnZApp 題量

**跨主題判斷表：**

| 題目在問 | 反射 | 完整內容 |
|---|---|---|
| authenticate／assert identity | **IdP** | [D4 §1.5](../domain4-application/01-consolidated-lecture.md) |
| consume assertion + provide service | **RP／SP** | D4 §1.5 |
| mediate federation protocol | **Broker／Proxy** | D4 §1.5 |
| manage trust／vet members | **Federation Authority** | D4 §1.5 |
| mark actual data | **Metadata／Label** | [D2 §1.2](../domain2-data-security/01-consolidated-lecture.md) |
| sensitivity bucket | **Classification** | D2 §1.2 |
| protect based on class | **Security Controls** | D2 §1.2 |
| define rules | **Policy** | D2 §1.2 |
| one person cannot perform action | **TPI／Dual Control** | [D2 §1.11](../domain2-data-security/01-consolidated-lecture.md) |
| one person cannot own incompatible duties | **SoD** | D2 §1.11 |
| one person cannot know whole secret | **Split Knowledge** | D2 §1.11 |
| restricted execution environment | **Sandbox** | [D3 §1.4](../domain3-infrastructure/01-consolidated-lecture.md) |
| stop processes interfering | **Process Isolation** | D3 §1.4 |
| peripheral isolation across hosts | **Secure KVM** | D3 §1.4 |
| evaluation assurance depth | **EAL** | 本檔 §1.9 |
| determine purposes／means | **Controller** | [D6 §1.4](../domain6-legal-compliance/01-consolidated-lecture.md) |
| enforce law／regulation | **Regulator** | D6 §1.4 |

**八條考場口訣：**

```text
1. IdP asserts; RP/SP provides service.
2. Broker = RP upstream, IdP downstream.
3. Metadata = label; Classification = bucket; Controls = treatment; Policy = rulebook.
4. Sandbox = restricted environment; Process isolation = isolation mechanism.
5. TPI = one person cannot act alone.
6. SoD = incompatible duties; Split Knowledge = no one knows the whole secret.
7. Secure KVM = peripheral isolation, not TPM.
8. Controller = WHY + HOW; Processor = on behalf; Regulator = enforce.
```

**使用優先度：**

| 優先度 | 主題 |
|---|---|
| **P0** | IdP／SP／RP／Broker；Policy／Classification／Metadata／Controls；TPI／SoD／Split Knowledge；Controller／Processor／Regulator |
| **P1** | Sandbox／Process Isolation；Common Criteria／EAL |
| **P2** | Secure KVM 細節 |

> 目標不是背整份，而是 Trigger → correct role／property／mechanism 在 2–5 秒內出現。

### 自我檢測

- Hybrid cloud 的三個必要條件是什麼？
- 「backup 在另一家 CSP，還原不回來」最直接的風險名詞是什麼？
- IaaS 的主要商業驅動力是什麼？為什麼不是 scalability？
- Oversubscription 的定義中，被比較的兩個量各是什麼？
- 降低供應商鎖定的兩層各包含哪些手段？為什麼不能只靠合約？
- Private cloud 的哪一層可以對外、哪一層必須鎖死？
- 不看表，默寫 EAL1–EAL7 的口訣與英文核心動詞。
- 題幹 `formally verified` 對應哪個 EAL？為什麼 `independent third party` 不是判斷依據？
- CEO 遷雲題為何選 reduced cost？這條 heuristic 的適用範圍在哪？
- 看到 `all / always / every service model`，第一步做什麼？
- 什麼叫 abstraction mismatch？舉 BC/DR 的例子。
- `In all cloud models` 題，為何 Data 比 Security controls 共同性高？`customer can modify data` 要怎麼精確化？
- ISO/IEC、CCRA、national scheme 三者在 Common Criteria 中各負責什麼？
- Provider architecture 題，automation 為什麼比 MTTR 更像核心？
- 為什麼 security controls 會降低 cloud migration 的實際財務效益？
- `best / biggest / most` 題資訊不足時，該如何處理？
- TOE、PP、ST 各是什麼？PP 與 ST 最短怎麼分？
- Property 與 Implementation 差在哪？舉 TPI 的例子。

---

## 繁體中文版 / Traditional Chinese Version

本文件是 Domain 1 的彙整講義，主體已是中文，依固定骨架 §0–§5 編排。

- **來源對照（§0）：** 各場次講義併入的位置。
- **核心觀念（§1）：** 服務模型責任邊界、部署模型、雲端角色、IaaS 商業價值、interoperability／portability／lock-in、虛擬化、sandbox 與服務模型、新興技術、Common Criteria 與 EAL（含 TOE／PP／ST）、題目判讀模型（量詞、角色、抽象層級、Role／Property／Mechanism）。
- **錯題與規則（§2）：** 服務模型、部署模型、CEO 遷雲成本、`all cloud models` 題、Common Criteria 發布者、cloud TCO 等修正規則。
- **一句話規則與邊界（§3–§4）：** 考前速記與易混淆對照。
- **演練（§5）：** 對照表默寫、雲端角色、20 題 drill、跨域 closed-book 與自我檢測。
