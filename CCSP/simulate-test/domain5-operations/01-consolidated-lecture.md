# CCSP Domain 5：Cloud Security Operations 彙整講義

> **範圍：** `simulate-test/` 內所有測驗講義中屬於 Domain 5 的內容，跨場次合併後依主題重組。
> **考試權重：** 17%
> **來源：** `by-test/03`、`04`、`07`、`09`、`10`、`by-test/learnzapp/02`、`03`、`04`
> **維護：** 新增測驗講義後，將該檔的 D5 章節併入本檔，並更新 §0 來源對照。
> **註：** 各場次分數、進步判定與補強排程留在 `by-test/` 原檔，不併入本檔。

---

## 0. 來源對照 / Source Map

| 來源檔 | 原章節 | 併入本檔位置 |
|---|---|---|
| `by-test/03-custom-test-2-weakness-lecture.md` | Q1 內部威脅、Q10 BC/DR 模型、Q14 privilege escalation、Q15 privileged access | §1.6、§2.1 |
| `by-test/04-practice-test-1-weakness-lecture.md` | §9.1 egress/classification、§9.2 hardening vs redundancy、§9.3 baseline deviation、§9.4 機房維運 | §1.2、§1.3、§1.4、§2.2 |
| `by-test/07-practice-test-2-weakness-lecture.md` | §8 風險指標（交叉至 D6） | §1.8 |
| `by-test/09-practice-test-3-weakness-lecture.md` | §8 P3 D5（isolation、maintenance mode、vendor guidance、SIEM 調校、TLS） | §1.4、§1.5、§1.7、§2.3 |
| `by-test/10-drill-2026-09-30-weakness-lecture.md` | 上篇 D patch advice、H incident 定義 | §1.3、§1.6、§2.4 |
| `by-test/learnzapp/02-...-lecture.md` | §2 維運監控與系統生命週期 | §1.2、§1.3、§1.5 |
| `by-test/learnzapp/03-...-lecture.md` | 上篇 §1 維運生命週期、§1.5 資料中心三層 | §1.1、§1.4 |
| `by-test/learnzapp/04-two-day-error-essence-lecture.md` | §6 responsibility、§7 supply chain、§10 cloud sprawl、§11–12 configuration/patch | §1.3、§1.7、§1.9 |

---

## 1. 核心觀念 / Core Concepts

### 1.1 維運生命週期心智模型

```text
Baseline → Harden → Document → Monitor
        → Detect deviation → Change management
        → Patch / test → Remediate → Re-baseline
```

**資料中心三層視角：**

```text
Physical              Environmental          Resilience
├─ site / location    ├─ HVAC                ├─ UPS / generators / fuel
├─ physical access    ├─ temperature/humidity├─ redundant power
├─ seismic/flood/fire ├─ airflow/hot-cold aisle ├─ redundant cooling
└─ facility security  └─ fire suppression    └─ redundant connectivity
```

實體與環境細節見 [Domain 3 §1.1](../domain3-infrastructure/01-consolidated-lecture.md)。

### 1.2 Baseline、Hardening 與 Configuration Management

| 概念 | 定義 |
|---|---|
| **Baseline** | 「比較的標準」——不是防毒軟體、不是 HIDS |
| **Hardening** | 縮小攻擊面：安全組態、關閉不必要服務、patch、baseline |
| **Redundancy** | 可用性／容錯——**冗餘電源是 redundancy，不是 hardening** |
| **Configuration maintenance** | baseline、configuration change、patching、version control、configuration validation、deviation management、documentation |

**Baseline 沒有 documentation 就等於不存在：** 無法證明 configuration drift、無法稽核偏離、無法可靠還原。遇到「baseline 需要什麼」時選 **Documentation**，不要選培訓、HIDS 或更多掃描。

**Baseline deviation 的正確處理順序：**

```text
Document → Assess → Authorize / Remediate → 若屬合理則透過變更流程 update baseline
```

**不要**發現 deviation 就直接改回去，因為它可能是 approved change、emergency change、unauthorized change、drift 或 compromise——必須先判斷。

**Social engineering 不屬於 configuration maintenance**，它是 human-layer 的攻擊／測試活動。

### 1.3 Patch Management

**典型流程：**

```text
Identify → Evaluate → Test → Approve → Deploy → Validate
```

Production 不能看到更新就直接部署，必須測試 **compatibility、availability impact 與 change risk**。

#### Vendor 的角色

**題目問「production 系統修補時誰的建議權重最高」→ Vendor**，因為 vendor 最清楚 prerequisites、compatibility、supported versions、known issues、rollback、reboot requirement。

但治理模型必須分清：

```text
Vendor                → technical advice
Security              → vulnerability risk
Compliance            → obligation / deadline
Change Management     → controlled approval
Business/System Owner → operational risk / accountability
```

> **一句記：** Vendor advises; the organization decides. Vendor guidance 展現 due diligence，但 vendor 不是組織的 risk owner。

#### 修補死角

自動化修補排程只對**正在運行**的機器有效。存在 storage 裡的 **snapshots、saved VM images、dormant／powered-off guests** 都收不到 patch，下次被喚醒時就帶著已知漏洞上線。

> **考場句型：** 問「cloud auto-patching 的最大風險」→ 找 `snapshot / saved VM images won't take a patch`。

### 1.4 Maintenance Mode 與高可用

**維護模式心智模型：**

```text
Drain / migrate workload
        → 必要時阻擋新工作負載（prevent new logins）
        → 維持 monitoring / logging
        → 執行維護
        → 驗證
        → 恢復服務
```

| 重點 | 規則 |
|---|---|
| 進入維護前 | 先移除／遷移 active production instance，或確保其他節點承載服務 |
| 維護期間 | **不可停止 logging** |
| 管理員存取 | **Maintenance mode 不會阻擋 admin 存取** |
| HA → 維護的順序 | HA → migrate／drain → maintenance mode → patch／change → validate → return to service |
| **管理平面** | 必須隔離（isolated management network），因為它是最高權限入口 |
| **多租戶隔離** | 雲端是多租戶環境，isolation 是關鍵控制 |

### 1.5 監控、日誌與偵測工具

| 主題 | 規則 |
|---|---|
| **日誌關聯的第一先決條件** | **Clock synchronization（NTP）**——不是 RAM、磁碟空間或 SIEM 品牌。沒有一致時間戳，correlation 沒有意義 |
| **SIEM／DLP 調校** | 需要 tuning／learning period，初期 false positive 高是正常現象 |
| **Egress monitoring 與 classification** | Egress monitoring 依賴 classification／labeling 才知道哪些資料不該外流；classification 從 Create 階段開始 |
| **加密對監控的影響** | 見 [Domain 3 §1.7](../domain3-infrastructure/01-consolidated-lecture.md) |

#### Honeypot

| 合法目的 | 不該選 |
|---|---|
| 偵測攻擊 | **Luring attackers（主動招攬）** |
| 分散注意力（distract） | Entrapment（誘捕入罪） |
| 拖延攻擊者（delay） | 當成生產系統的替代防禦 |
| 蒐集威脅情報 | |

> **EXCEPT 題秒選：** Luring attackers。主動引誘可能構成 legal entrapment，傷害後續追訴。

### 1.6 Incident、權限與內部威脅

**Incident 定義：** 題庫常寫 `Incident = unscheduled event`，這是過度寬鬆的 legacy operational wording。

> Security incident 更好的理解：**對 CIA、系統或安全政策造成實際或潛在危害／違反的事件**。NIST 現行定義也以 confidentiality、integrity、availability 或 security-policy violation 為核心。
>
> **不要背：** Every unscheduled event = security incident.

| 主題 | 規則 |
|---|---|
| **Privileged access** | 應為 **just-in-time、temporary、time-bound、least privilege、monitored**，重點不是 granular |
| **Privilege escalation 的控制** | access control、authentication、monitoring、log analysis、SIEM。**Cryptographic sanitization 是 data remanence 控制，不是 privilege escalation 控制** |
| **內部威脅控制** | background check、training、skills testing、monitoring。**Perimeter hardening 主要對抗外部威脅** |

### 1.7 Responsibility、Accountability 與供應鏈

> **核心 CCSP 原則：** Responsibility can be shared or delegated. **Accountability usually remains with the accountable organization, data owner, or controller.**

不要看到「CSP caused the incident」就自動選「CSP has all responsibility」。

| 角色 | 定義 |
|---|---|
| **Controller** | 決定 **why + how** personal data is processed |
| **Processor** | 依 controller 指示處理資料；cloud provider 在許多架構中扮演 processor／subprocessor |

**Access control criteria 的來源層次：**

```text
External requirements（law / regulation / contract / standards）
        ↓
Organizational policies
        ↓
Technical controls（IAM / ACL / configuration）
```

題目問「誰決定組織的 access criteria」→ **組織依適用要求制定的 policy**，通常不是直接回答 ISO／NIST。

**供應鏈風險：** 評估 CSP 時，除了 CSP 自身的 security posture，還要看它所依賴的 **third parties／subprocessors**。

```text
Customer → CSP → Subprocessor → Another service
```

> CSP secure ≠ entire service chain secure。這是典型的 concentration／dependency／supply-chain risk。

### 1.8 風險指標（與 D6 交叉）

```text
SLE = AV × EF
ALE = SLE × ARO
```

**Exposure Factor（EF）** 是單一事件可能造成的資產損失比例；**威脅媒介類型（type of threat vector）決定破壞機制與損失百分比，因此對 EF 影響最大**。不要把 EF 等同「攻擊目標」或「資產名稱」。

風險處置、質性／量化評估、risk appetite 歸屬的完整整理見 [Domain 6 彙整講義](../domain6-legal-compliance/01-consolidated-lecture.md)。

### 1.9 Cloud Sprawl

Cloud sprawl 除了 compute／storage 費用，還會產生容易被忽略的 **software licensing** 成本：

```text
新增 VM / database instance / commercial OS / security appliance / enterprise software
        ↓
license count、subscription fee、support cost、management overhead 同步增加
```

> Cloud sprawl ≠ only infrastructure bill。雲端最常見的無意行為是忘記關 VM，造成 resource sprawl。

### 1.10 TLS 的維運面

```text
TLS
├─ Authentication          → certificate / PKI（X.509 + digital signature）
├─ Key agreement           → TLS 1.3 通常為 (EC)DHE，或 PSK / PSK+(EC)DHE
├─ Derived traffic keys    → symmetric
└─ Application traffic     → symmetric AEAD encryption
```

**TLS session key = symmetric cryptography；TLS trust 通常來自 PKI certificates。** 密碼學原理見 [Domain 2 §1.7](../domain2-data-security/01-consolidated-lecture.md)，協定與傳輸面見 [Domain 3 §1.3](../domain3-infrastructure/01-consolidated-lecture.md)。

---

## 2. 錯題與修正規則 / Errors & Corrections

### 2.1 內部威脅與特權存取（`by-test/03` Q1、Q14、Q15）

- 內部威脅控制的例外是 **hardened perimeter devices**（那是外部威脅控制）。
- Privilege escalation 控制的例外是 **cryptographic sanitization**（那是資料殘餘控制）。
- Privileged access 的正解是 **temporary／time-bound**，不是 granular。

### 2.2 Hardening vs Redundancy（`by-test/04` §9.2）

冗餘電源供應器是 **redundancy**，不是 hardening。

```text
Hardening  = 縮小攻擊面 / 安全組態 / 關閉不必要服務 / patch / baseline
Redundancy = 可用性 / 容錯
```

### 2.3 Maintenance mode 與 vendor 盡職（`by-test/09` §8）

- Maintenance mode **不會**阻擋 admin 存取。
- 遵循 vendor guidance 可展現 due diligence。
- DLP／SIEM 工具需要調校與學習期。
- 雲端是多租戶環境，**isolation 是關鍵**。

### 2.4 Patch 建議權重（`by-test/10` 上篇 D，Recurring）

`Whose advice should receive most weight about patching a production system?` → **Vendor**。但 vendor ≠ final decision maker，見 §1.3 的治理模型。

### 2.5 BC/DR 模型（`by-test/03` Q10）

常見雲端 BC/DR 模型：private architecture + cloud backup、同一 provider 的雲端備份、另一家 cloud provider。**「cloud provider 由 private provider 備援」不是典型模式。** BC/DR 的完整整理見 [Domain 3 §1.6](../domain3-infrastructure/01-consolidated-lecture.md)。

---

## 3. 一句話規則表 / One-liner Rules

| # | 規則 |
|---|---|
| 1 | Baseline 是比較的標準，沒有 documentation 就無法稽核偏離。 |
| 2 | Baseline deviation：先 document 與 assess，不要直接改回去。 |
| 3 | 合理且重複出現的 deviation，透過變更流程 update baseline。 |
| 4 | Hardening 縮小攻擊面；Redundancy 提供可用性——冗餘電源不是 hardening。 |
| 5 | Social engineering 不屬於 configuration maintenance。 |
| 6 | Patch 流程：Identify → Evaluate → Test → Approve → Deploy → Validate。 |
| 7 | Vendor advises; the organization decides——vendor 不是 risk owner。 |
| 8 | 遵循 vendor guidance 可展現 due diligence。 |
| 9 | Snapshot 與休眠 VM 收不到 patch，是自動修補的最大死角。 |
| 10 | 進入 maintenance mode 前先 drain／migrate workload。 |
| 11 | Maintenance mode 期間不可停止 logging，也不會阻擋 admin 存取。 |
| 12 | 管理平面必須隔離；雲端多租戶下 isolation 是關鍵控制。 |
| 13 | 跨系統日誌關聯的第一先決條件是 **clock synchronization／NTP**。 |
| 14 | SIEM／DLP 需要 tuning 與學習期，初期誤報高是正常的。 |
| 15 | Egress monitoring 依賴 classification／labeling 才知道什麼不該外流。 |
| 16 | Honeypot 可偵測、分流、拖延、蒐集情報；**不能主動 luring**。 |
| 17 | Incident 不等於「任何非排程事件」，核心是 CIA 或安全政策受損／違反。 |
| 18 | Privileged access = just-in-time、temporary、least privilege、monitored。 |
| 19 | Privilege escalation 控制是存取控制與監控，不是 cryptographic sanitization。 |
| 20 | 內部威脅靠 background check／training／monitoring；周界強化對付外部威脅。 |
| 21 | Responsibility 可委派，**accountability 通常留在組織／data owner／controller**。 |
| 22 | Controller 決定 why + how；Processor 依指示處理。 |
| 23 | Access criteria 源自組織 policy，policy 再源自外部要求。 |
| 24 | 評估 CSP 必須一併評估其 subprocessor 與供應鏈。 |
| 25 | SLE = AV × EF；ALE = SLE × ARO；threat vector 類型對 EF 影響最大。 |
| 26 | Cloud sprawl 還會帶來 software licensing 成本。 |
| 27 | TLS session key 是 symmetric；TLS trust 來自 PKI certificates。 |

---

## 4. 易混淆邊界 / Confusable Boundaries

| A | B | 切法 |
|---|---|---|
| Baseline | Hardening | 比較基準 vs 縮小攻擊面的動作 |
| Hardening | Redundancy | 安全組態 vs 可用性冗餘 |
| Configuration maintenance | Social engineering | 組態治理活動 vs 人員層攻擊／測試 |
| Vendor advice | Risk ownership | 技術建議 vs 最終決策與歸責 |
| Maintenance mode | 停機 | 排空工作負載但保留 logging 與 admin 存取 vs 全停 |
| HA／clustering | Live migration | 服務持續機制 vs 搬移執行中 VM 的動作 |
| Honeypot 偵測 | Luring／entrapment | 合法情報蒐集 vs 可能構成誘捕入罪 |
| Incident | Unscheduled event | CIA／政策受損 vs 任何非排程事件 |
| Responsibility | Accountability | 可委派 vs 通常留在組織 |
| Controller | Processor | 決定目的與方式 vs 依指示處理 |
| Privilege escalation 控制 | Cryptographic sanitization | 存取與監控 vs 資料殘餘處理 |
| 內部威脅控制 | Perimeter hardening | 人員與監控 vs 外部邊界 |
| EF | ARO | 單次損失比例 vs 年度發生頻率 |

---

## 5. 補強演練 / Drills

### Drill A：2 天 patch

**Day 1**（約 60 分鐘）

- Hardening／baseline／patching 觀念：30 分鐘
- D5 drill 20 題

**Day 2**（約 60 分鐘）

- 機房與維運事實（maintenance mode、KVM、UPS、燃料、ASHRAE）：30 分鐘
- D5 drill 20 題

**Gate：D5 mini-test ≥ 75%。**

### Drill B：閉卷問答（不看筆記）

1. Baseline、hardening、configuration management 差在哪？
2. Baseline deviation 的正確處理順序是什麼？
3. 為什麼 production 不能看到 patch 就直接部署？
4. Golden image／snapshot 為何造成 patch risk？
5. 進入 maintenance mode 前，workload 要怎麼處理？
6. HA、clustering、live migration 的差異？
7. 為什麼 management plane 應隔離？
8. 為什麼 maintenance mode 不能停 logging？
9. 跨系統日誌關聯的第一先決條件是什麼？
10. Honeypot 的哪一項用途會是 EXCEPT 題的答案？

### Drill C：責任邊界演練（15 分鐘）

寫出 responsibility vs accountability、controller vs processor 的定義，並各舉一個雲端 breach 情境說明歸責落在誰身上。

### 值得記 vs 現階段不必死磕

| 值得記 | 不必死背 |
|---|---|
| Uptime Tier I–IV 名稱與意義 | Secure KVM chipset 是否焊接 |
| 燃油基準：12 hours at N load | Raised floor 是 18" 還是 24" |
| ASHRAE A1–A4 建議溫度 18–27°C（93°F 過高） | Halon「illegal」字眼 |
| ITIL = IT service management | 醫院一定是 Tier IV |
| NAS vs SAN | SIEM 一定要等三週 |
| SLE = AV × EF | 特定 HVAC airflow 用詞 |
| 風險處置：avoid／mitigate／transfer／accept；residual risk 必須被接受 | |
| 集中日誌必須時鐘同步 | |
