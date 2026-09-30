# CCSP Domain 3：Cloud Platform & Infrastructure Security 彙整講義

> **範圍：** `simulate-test/` 內所有測驗講義中屬於 Domain 3 的內容，跨場次合併後依主題重組。
> **考試權重：** 17%
> **來源：** `by-test/03`、`04`、`05`、`06`、`07`、`09`、`10`、`by-test/learnzapp/01`、`04`
> **維護：** 新增測驗講義後，將該檔的 D3 章節併入本檔，並更新 §0 來源對照。
> **註：** 各場次分數、進步判定與補強排程留在 `by-test/` 原檔，不併入本檔。

---

## 0. 來源對照 / Source Map

| 來源檔 | 原章節 | 併入本檔位置 |
|---|---|---|
| `by-test/03-custom-test-2-weakness-lecture.md` | Uptime Tier I–IV、外部連線韌性、BC/DR 四階段 | §1.1、§1.5、§1.6 |
| `by-test/04-practice-test-1-weakness-lecture.md` | §7.1 business requirements、§7.2 連線韌性、§7.3 BC/DR 紀律、§7.5 機房設施 | §1.1、§1.6、§2.1 |
| `by-test/05-d3-drill-1-weakness-lecture.md` | 全檔（Q2、Q4、Q6、Q7、Q10、Q13、Q17、Q20、Q24 與 §5 高頻主題） | §1.2、§1.4、§1.6、§1.7、§2.2–§2.6 |
| `by-test/06-d2-drill-1-weakness-lecture.md` | 檔尾 D3 特訓：FC／iSCSI／FCoE／SDN、Uptime Tier、BC/DR 指標 | §1.1、§1.3、§1.6 |
| `by-test/07-practice-test-2-weakness-lecture.md` | §6.1 hypervisor、§8.1 VLAN、§8.2 SDN、§8.3 RPO | §1.3、§1.4、§1.6 |
| `by-test/09-practice-test-3-weakness-lecture.md` | §5 P0 D3（儲存網路 taxonomy、BC/DR、機房、虛擬化、認證） | §1.1、§1.3、§1.4、§1.6 |
| `by-test/10-drill-2026-09-30-weakness-lecture.md` | 上篇 A Secure KVM、C GRE vs IPsec、F ASHRAE、G plenum | §1.1、§1.3、§1.4 |
| `by-test/learnzapp/01-...-lecture.md` | §2 基礎架構與實體邊界 | §1.1、§1.4、§1.6 |
| `by-test/learnzapp/04-two-day-error-essence-lecture.md` | §8 BC/DR + interoperability、§10 cloud sprawl | §1.6 |

---

## 1. 核心觀念 / Core Concepts

### 1.1 機房設施與環境控制

| 主題 | 規則 |
|---|---|
| **Raised flooring** | 設計目的**只有兩項**：空調送／回風管道（air plenum）、纜線管路通道。不是避難所或儲藏空間 |
| 地板下線材凌亂 | 最大危害是**阻礙氣流、降低 HVAC 效率**，不是防跌倒 |
| **Underfloor plenum 開孔** | 用 grommet／tight gasket 封住 cable opening，避免冷空氣不受控外漏 |
| **ASHRAE temperature** | Server inlet 應維持在合理 equipment operating range；93°F（約 34°C）明顯過高 |
| **ASHRAE humidity** | 維持濕度標準可降低 static discharge 風險 |
| **UPS** | 不只供電，也做 **line conditioning**；續航要能撐到交易完成／接上發電機 |
| **Transfer switch** | 市電失效後，在 UPS／電池撐不住前快速切到 generator |
| **Generator fuel** | 燃料存量至少可支撐 **12 hours** |
| **LP gas** | 長期儲存較穩定，不像 gasoline／diesel 容易 spoil |
| **Generator 的風險** | 在各項冗餘中，**generators／fuel 對人身安全威脅最大**（燃料、火災、排氣、機電）|
| **Ionization smoke detector** | 使用放射性物質 |
| **Emergency egress** | 是 safety control，**不是** redundancy threat |

#### Uptime Institute Tier I–IV

| 分級 | 核心概念 | 路徑與設備 | 容忍「維護」不停機？ | 容忍「無預警」當機？ | 典型情境 |
|---|---|---|:-:|:-:|---|
| **Tier I** | Basic Capacity | 單一路徑／無備援 | ❌ | ❌ | 小微企業、冷封存 |
| **Tier II** | Redundant Capacity Components | 單一路徑／有備援設備 | ❌（單一路徑） | ⚠️ 部分 | 中小企業、可接受歲修 |
| **Tier III** | **Concurrently Maintainable** | 多路徑（主動／被動）／有備援 | ✅ | ❌ 仍可能短暫中斷 | 金融、標準 24/7 生產環境 |
| **Tier IV** | **Fault Tolerant** | 多路徑全主動、實體隔離 | ✅ | ✅ | 攸關人命的極端環境 |

**考場關鍵字：** Tier III = `concurrently maintainable`、`multiple paths, only one active`、`no shutdowns for maintenance`；Tier IV = `fault tolerant`、`multiple active paths`、`compartmentalized`、`autonomous response`。

> **判斷精神：** 依業務需求選最適當的等級，不是盲選最貴的。題幹若限定預算且只要求「維護時不中斷」→ Tier III，不是 Tier IV。

### 1.2 實體存取控制分層

| 控制 | 所屬層級 |
|---|---|
| **Reception area** | 一般入口控制 |
| **Badging** | 一般存取控制 |
| **Video surveillance** | 監控／嚇阻 |
| **Mantrap** | **敏感／高安全區域**控制 |
| **Bollards** | 車輛阻擋／周界 |

> **一句話：** Mantrap 不是一般 campus entrance 的必備項目，它保護的是內部敏感區域。

### 1.3 網路與儲存架構

| 名詞 | 它是什麼 | 解決什麼 | CCSP 關鍵字 |
|---|---|---|---|
| **FC**（Fibre Channel） | 儲存專屬網路 | 極致儲存效能與穩定度 | Dedicated storage network、lossless、expensive |
| **iSCSI** | 跑在 TCP/IP 上的儲存協定 | 用最便宜的方式建立儲存網路 | Storage over TCP/IP、cost-effective |
| **FCoE** | 把 FC 封裝在乙太網路 | 讓 FC 免專屬線路 | Encapsulates FC over Ethernet |
| **Converged Networking** | 實體架構模型 | 合併 LAN 與 SAN，減少機房線路 | Combined storage and IP、unified fabric |
| **SDN** | 網路管理模型 | 集中管理路由，提升敏捷與自動化 | **Decouple control and data plane**、APIs |
| **VLAN** | Layer 2 邏輯分段 | 切分廣播網域／流量隔離 | Logical grouping、traffic contained |
| **RAID** | **冗餘／組態**，不是協定 | 磁碟層級容錯 | 不要選成 storage protocol |

```text
iSCSI / Fibre Channel / FCoE = storage protocols
RAID                         = redundancy / configuration, NOT a protocol
Fiber-optic lines            = OSI Layer 1（physical media）
SDN control plane            = 定義邏輯網路，獨立於實體拓樸
```

#### GRE vs IPsec

```text
GRE   = Tunnel（Generic Routing Encapsulation，只做封裝，不提供 encryption）
IPsec = Secure（保護 IP 通訊，有 transport 與 tunnel 兩種 mode）

GRE over IPsec = Tunnel + Security
```

題目問 `most associated with tunneling` → **GRE**。

### 1.4 虛擬化、容器與管理平面

| 主題 | 規則 |
|---|---|
| **Hypervisor** | 雲端底層攔截並協調硬體資源呼叫（orchestrating resource calls）的是 hypervisor，不是系統管理員 |
| **Type 1 / Type 2** | 見 [Domain 1 §1.6](../domain1-cloud-concepts/01-consolidated-lecture.md) |
| **Containerization** | **不模擬硬體**，共用 kernel |
| **Live migration** | Host 維護期間搬移 VM 的正式名稱 |
| **管理平面隔離** | Virtualization management tools 必須放在隔離的管理網路 |
| **VM configuration management tool** | 必須具備 **log generation 與 audit trail** |
| **Snapshot／dormant VM** | 收不到 patch，是常見盲點 |
| **Cloud sprawl** | 雲端最常見的無意行為後果是忘記關 VM，造成 resource sprawl，不一定是 disaster |

#### Secure KVM

Secure KVM 要避免的是**不同 security domains 透過 peripherals 發生 cross-domain leakage**。

```text
├─ Isolated data paths
├─ Explicit physical port selection
├─ Clear active-port indication
├─ Clear keyboard/mouse buffers
├─ Reject unauthorized peripherals
├─ Tamper resistance/evidence
└─ NO keystroke logging        ← keystroke logging 本身就是 leakage threat
```

`Welded chipsets` 理解成 hardware tamper resistance 即可。

### 1.5 責任邊界：Provider／Customer／Regulator

| 題目問法 | 優先答案 |
|---|---|
| Public cloud data center controls | **Provider** |
| Customer data governance | Customer／data owner |
| Legal／regulatory mandate | Regulator／law |
| Contractual requirement | Contract／SLA／provider agreement |

```text
Public cloud data center control deployment = provider governance
Regulator only sets requirements；它不直接營運 provider 的機房控制
Customer defines requirements and evaluates the provider
```

**產品特定的安全組態：vendor guidance 通常優先**（storage controller 等），不是先套用泛用法規。

### 1.6 BC/DR 與韌性

#### 指標

| 術語 | 全名 | 誰決定 | 意義 |
|---|---|---|---|
| **MAD／MTD** | Maximum Allowable Downtime | 業務 | 業務可容忍的停機上限 |
| **RTO** | Recovery Time Objective | IT／DR 規劃 | 復原必須達成的時間目標 |
| **RPO** | Recovery Point Objective | 業務／IT | **可容忍的資料流失量**（以時間計）。注意：不是商業價值的流失 |

```text
必背關係： RTO < MAD
```

#### BC/DR 執行四階段（4R）

1. **Respond（應變）** — 🚨 最高原則：**保護人員生命安全**，接著評估損害、宣告災難。
2. **Recover（復原）** — 在備援站點啟動最關鍵業務系統（failover）。
3. **Restore（還原）** — 回到主要站點修復硬體與場地。
4. **Resume（復歸）** — 主要站點修好後 failback，全面恢復正常營運。

> **考試陷阱：** 順序是先 **Restore（把家修好）**，才能 **Resume（搬回家）**。

#### 連線韌性

```text
External connectivity threat → redundant carriers / ISPs / diverse paths
Local disaster               → sister facility / alternate site / joint operating agreement
```

**Diverse Routing** 特別重要：即使採購兩家電信線路，若實體光纖埋在同一條地下管道，一次施工就會同時斷線。實體線路必須從建築物**不同方向**進入資料中心。

**雲端 DR 的阿基里斯腱：ISP connectivity。** 連不上雲端，DR 計畫即失敗。

#### 計畫內容與演練

| 應包含 | 不必完整包含 |
|---|---|
| Responsible office／owner（任務分工） | 法律與法規的**完整副本** |
| Contact lists（call trees） | 標準的完整副本 |
| Emergency procedures | 完整治理文件庫 |
| Checklists、Recovery procedures | |

```text
BC/DR plan references laws/standards；it does not need to embed full copies.
```

- **執行紀律：** 災難當下要**按 plan／checklist 執行**，不是臨場 improvisation。
- **可執行性：** 核心 DR 團隊可能無法連線，計畫必須讓**具備基本技能的人**都能執行。
- **演練風險：** Tabletop 最安全；**full testing 本身帶有極高的營運中斷風險**。
- **雲端特性對 BC/DR 的幫助：** on-demand self-service 可快速供裝；任意位置存取可降低對專屬備援設施的需求；**data classification 可辨識關鍵資產與復原優先序**。
- **反例：** Egress monitoring **不是** BC/DR 事件預測來源。
- **跨 CSP 備份的最大技術風險：** interoperability／proprietary format incompatibility（見 [Domain 1 §2.2](../domain1-cloud-concepts/01-consolidated-lecture.md)）。

### 1.7 監控可視性與控制搭配

| 概念 | 重點 |
|---|---|
| **Egress monitoring** | 偵測資料外流，**需要內容可視性** |
| **Encryption** | 保護內容，但**可能遮蔽 payload** 導致監控失效 |
| **DLP／content inspection** | 需要能分析內容 |
| **Firewall** | 控制連線，**不等於**內容可視性 |

```text
問 monitoring functionality 被什麼影響 → 優先想 encryption / visibility loss
```

**Control pairing：** **Data dispersion + encryption** 是強互補的分層保護組合。Training、inventory、firewall、fence 各有價值，但不一定是該題的最佳配對。

**Cloud penetration test：** 需要 provider 許可；**advanced notice 會降低測試的真實性**。

> 風險處置（avoid／mitigate／transfer／accept）、ALE、質性／量化風險評估與 risk appetite 歸屬，見 [Domain 6 彙整講義](../domain6-legal-compliance/01-consolidated-lecture.md)。

---

## 2. 錯題與修正規則 / Errors & Corrections

### 2.1 Business requirements 是控制的驅動來源（`by-test/04` §7.1）

```text
Business requirements drive security controls.
Regulations / laws / best practices 形塑需求，但不一定是 primary driver。
BIA / requirements 聚焦於 business impact、assets、availability、criticality、dependencies。
Robustness 通常不是由 requirements gathering 直接決定。
```

### 2.2 Encryption 影響 egress monitoring（`by-test/05` Q2）

題幹：This type of control might affect the functionality of egress monitoring solutions。誤選 Firewall，正解 **Encryption**。原因：egress monitoring 依賴可見性，內容被加密後無法做 content inspection／DLP／exfiltration detection。

### 2.3 Variable keystrokes 不是認證手段（`by-test/05` Q4、`by-test/09`）

**正解：Variable keystrokes** 為「不是 enhanced authentication 常見手段」的答案。認證需要穩定的 template／factor；「每次都在變」的特徵無法建立可靠基準。

> 對照：`Dynamic end-user knowledge` 是有效手段（例如詢問「上一筆信用卡消費金額」或發送 OTP），而不是靜態知識題。
> **判讀口訣：** 看到 `Dynamic`、`Behavioral biometric` 通常是好事；看到 `Variable`、`Inconsistent` 就不能當認證依據。

### 2.4 Public cloud 機房治理（`by-test/05` Q6）

正解：由 **provider** 制定機房控制治理。Regulator 可施加要求，但不直接治理雲端資料中心的控制部署。

### 2.5 Mantrap 的層級（`by-test/05` Q10）

Campus entrance 必備項目是 reception、badging、video surveillance；**mantrap 是敏感區域控制**，不是一般 campus access point 必備。

### 2.6 BC/DR plan 不放法規全文（`by-test/05` Q20）

GDPR 有 99 條、ISO 27001 有數百頁，災難當下無人有時間翻閱。正確作法是在計畫中**引用（reference／cite）**，例如「本復原計畫遵循 GDPR 第 32 條之要求」。

### 2.7 儲存與網路 taxonomy（`by-test/09` §5.1）

RAID 不是 storage protocol；iSCSI／Fibre Channel／FCoE 才是。Fiber-optic lines 屬 **OSI Layer 1**。

---

## 3. 一句話規則表 / One-liner Rules

| # | 規則 |
|---|---|
| 1 | Egress monitoring 需要可視性；encryption 會破壞 content inspection。 |
| 2 | Firewall 控制流量；encryption 隱藏內容——兩者不同。 |
| 3 | 認證需要穩定 template／factor；variable keystrokes 本身很弱。 |
| 4 | Public cloud 機房治理由 **provider** 控制。 |
| 5 | Regulator 訂要求，不營運 provider 的機房控制。 |
| 6 | VM configuration management 工具必須產生 log 與 audit trail。 |
| 7 | Campus 入口控制包含 reception、badging、video surveillance。 |
| 8 | Mantrap 保護內部敏感區域，不是一般入口。 |
| 9 | Data dispersion + encryption 是強分層保護組合。 |
| 10 | 雲端滲透測試需 provider 許可；advanced notice 會降低真實性。 |
| 11 | BC/DR plan 包含角色、聯絡、流程與 checklist。 |
| 12 | BC/DR plan 只需引用法規標準，不需嵌入完整副本。 |
| 13 | Emergency egress 是 safety control，不是冗餘威脅。 |
| 14 | 冗餘項目中，generators／fuel 的人身安全風險最大。 |
| 15 | Raised floor 只為 air plenum 與 cable conduit 而設計。 |
| 16 | RAID 是冗餘組態；iSCSI／FC／FCoE 才是 storage protocol。 |
| 17 | Fiber-optic line 屬 OSI Layer 1。 |
| 18 | RTO = 復原時間；RPO = 可容忍資料流失；RTO 必須小於 MAD。 |
| 19 | 4R 順序：Respond → Recover → **Restore** → **Resume**。 |
| 20 | 災難第一優先永遠是人身安全。 |
| 21 | 多電信商還不夠，還要 diverse routing（實體路徑分離）。 |
| 22 | 雲端 BC/DR 最大依賴是 ISP connectivity。 |
| 23 | SDN 的核心是 control plane 與 data plane 分離。 |
| 24 | VLAN 是 Layer 2 邏輯分段，用於切分廣播網域。 |
| 25 | GRE 做 tunnel，IPsec 做 security；兩者可疊加。 |
| 26 | Container 不模擬硬體，共用 kernel。 |
| 27 | Host 維護搬移 VM = live migration。 |
| 28 | 虛擬化管理平面必須放在隔離的管理網路。 |
| 29 | Snapshot 與休眠 VM 收不到 patch。 |
| 30 | Tier III = 維護不停機；Tier IV = 容錯，連無預警故障都撐得住。 |
| 31 | 依業務需求選 Tier，不是盲選最高等級。 |
| 32 | 產品特定安全組態以 vendor guidance 優先。 |
| 33 | Business requirements 驅動安全控制。 |
| 34 | Secure KVM 絕不含 keystroke logging。 |

---

## 4. 易混淆邊界 / Confusable Boundaries

| A | B | 切法 |
|---|---|---|
| Firewall | Encryption | 控制連線 vs 隱藏內容 |
| Mantrap | Reception／badging | 敏感內區 vs 一般入口 |
| RAID | iSCSI／FC／FCoE | 冗餘組態 vs 儲存協定 |
| FC | FCoE | 專屬儲存網路 vs 封裝跑在乙太網路 |
| GRE | IPsec | 封裝／隧道 vs 加密保護 |
| VLAN | SDN | Layer 2 分段 vs 控制平面與資料平面分離 |
| Hypervisor | Container | 硬體虛擬化 vs 共用 kernel、不模擬硬體 |
| RTO | RPO | 可停多久 vs 可丟多少資料 |
| MAD／MTD | RTO | 業務上限 vs IT 目標（RTO < MAD） |
| Restore | Resume | 修好主要站點 vs 切換回主要站點 |
| Recover | Restore | 在備援站點起服務 vs 修復原站點 |
| Tier III | Tier IV | 維護不停機 vs 無預警故障也不停機 |
| Multiple carriers | Diverse routing | 多家電信 vs 實體路徑分離 |
| Tabletop 演練 | Full test | 最安全 vs 高營運中斷風險 |

---

## 5. 補強演練 / Drills

### Drill A：90 分鐘 D3 補弱

| 時間 | 任務 |
|---|---|
| 0–10 min | 讀完 §3 的 34 條規則 |
| 10–25 min | Egress monitoring／encryption／data dispersion |
| 25–40 min | Provider governance／public cloud 責任邊界 |
| 40–55 min | 實體存取控制與機房安全 |
| 55–70 min | BC/DR plan／policy／文件邊界 |
| 70–85 min | D3 mini-test 15 題 |
| 85–90 min | 寫下錯題一句話規則 |

### Drill B：60 分鐘精簡版

| 時間 | 任務 |
|---|---|
| 0–10 min | 背 §3 前 10 條 |
| 10–25 min | 機房／實體題 drill |
| 25–40 min | BC/DR + governance 題 drill |
| 40–55 min | Encryption／monitoring／control pairing drill |
| 55–60 min | 寫 5 條錯題規則 |

### Drill C：taxonomy 快篩（15 分鐘）

閉卷寫出：儲存協定 vs RAID、VLAN vs SDN、GRE vs IPsec、hypervisor vs container、Tier I–IV 四個關鍵字。

### Gate

下一回 D3 drill 25–30 題，目標 **≥ 75%**。若低於 70%，不要開下一回 full practice test，先再補 D3 與機房／維運題。

### 自我檢測

- Raised flooring 的兩個設計目的是什麼？
- RTO、RPO、MAD 三者的關係式是什麼？
- 4R 的正確順序是什麼？哪兩個最常被顛倒？
- 多電信商之外還需要什麼才能抵抗實體線路中斷？
- 哪一項冗餘設施帶來最大的人身安全風險？
