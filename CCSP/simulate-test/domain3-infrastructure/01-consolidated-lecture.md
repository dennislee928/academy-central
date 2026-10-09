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
| `by-test/11-drill-2026-10-01-weakness-lecture.md` | D5 §5 Hot／Cold Aisle | §1.1 |
| `by-test/12-d5-drill-2026-10-02-weakness-lecture.md` | §1 management plane、§8 live migration、§11 raised floor、§9／§10 GRE／KVM（復現） | §1.1、§1.3、§1.4 |
| `02-airflow-diagrams.md`（原 `CCSP_D5_Data_Center_Airflow_Mermaid.md`） | §5 hot-air recirculation 後果鏈 | §1.1 |
| 2026-10-07 D3 ＋ D6 錯題補強與本輪 recall（內容已併入，原檔未封存） | 資源分配三機制、BC/DR 測試變數 | §1.4、§1.6 |
| 2026-10-09 D1-D4 防守成果 ＋ D3 BC/DR 與 25 題錯題補強（內容已併入，原檔未封存） | BC/DR 四指標與公式、OSI 七層、FC/FCP、storage taxonomy、Converged ≠ SDN ≠ HCI、三類 controls、VM vs Container、vendor guidance 層級 | §1.3、§1.4、§1.5、§1.6、§1.8 |

---

## 1. 核心觀念 / Core Concepts

### 1.1 機房設施與環境控制

| 主題 | 規則 |
|---|---|
| **Raised flooring** | 設計目的**只有兩項**：空調送／回風管道（air plenum）、纜線與管路通道（power／network cable／fiber／piping）。不是避難所、不是儲藏空間，**也不是為了增加結構強度** |
| 地板下線材凌亂 | 最大危害是**阻礙氣流、降低 HVAC 效率**，不是防跌倒 |
| **Underfloor plenum 開孔** | 用 grommet／tight gasket 封住 cable opening，避免冷空氣不受控外漏 |
| **Raised floor 的承重** | raised floor **本身**必須被設計成能承受 rack 重量；它不是結構補強手段，而是需要被結構設計照顧的對象 |
| **ASHRAE temperature** | Server inlet 應維持在合理 equipment operating range；93°F（約 34°C）明顯過高 |
| **ASHRAE humidity** | 維持濕度標準可降低 static discharge 風險 |
| **UPS** | 不只供電，也做 **line conditioning**；續航要能撐到交易完成／接上發電機 |
| **Transfer switch** | 市電失效後，在 UPS／電池撐不住前快速切到 generator |
| **Generator fuel** | 燃料存量至少可支撐 **12 hours** |
| **LP gas** | 長期儲存較穩定，不像 gasoline／diesel 容易 spoil |
| **Generator 的風險** | 在各項冗餘中，**generators／fuel 對人身安全威脅最大**（燃料、火災、排氣、機電）|
| **Ionization smoke detector** | 使用放射性物質 |
| **Emergency egress** | 是 safety control，**不是** redundancy threat |

#### 冷風路徑（來源：`by-test/12` §11）

```text
CRAC/CRAH
  ↓
Underfloor plenum
  ↓
Perforated tile
  ↓
Cold aisle
  ↓
Server inlet
```

題目問 `Raised floor serves what purposes?` → **cold air feed ＋ place to run wires／cables**，不是 `increases structural soundness`。

#### Hot Aisle / Cold Aisle（來源：`by-test/11` D5 §5）

典型 server 氣流是**前進後出**：

```text
FRONT              REAR

Cold air
   ↓
[ SERVER ]
          ↓
       Hot air
```

因此機櫃必須成對相向擺放：

| 走道 | 擺法 | 走道裡是什麼 |
|---|---|---|
| **Cold aisle** | front（inlet）面對 front | 空調送出的冷風，供伺服器吸入 |
| **Hot aisle** | rear（exhaust）面對 rear | 伺服器排出的熱風，由空調回風帶走 |

```text
Rack FRONT → COLD AISLE ← FRONT Rack
Rack REAR  → HOT AISLE  ← REAR  Rack
```

**易錯擺法：`Exhaust → Inlet`**——一排的排氣直接吹進下一排的進氣，造成 **hot air recirculation**，伺服器吸入的是熱風，冷卻效率崩壞。

```text
Front ↔ Front = Cold aisle
Back  ↔ Back  = Hot aisle
Never Hot → Cold
```

**Hot-air recirculation 的完整後果鏈**（來源：`02-airflow-diagrams.md` §5）：

```text
熱氣被另一台 server 吸入
   → Inlet temperature ↑
   → Fan speed ↑
   → Cooling load ↑
   → Energy cost ↑
   → Thermal risk ↑
```

考試常見的不完整選項只答「溫度升高」。完整後果同時涉及**能耗成本**與**過熱風險**——這也是氣流管理同屬 availability 與成本議題的理由。

> **視覺化：** 五張 Mermaid 流程圖（server 氣流、cold／hot aisle 配置、錯誤配置、後果鏈、完整機列配置）與俯視示意見 [02-airflow-diagrams.md](02-airflow-diagrams.md)。

**復現標記：** hot／cold aisle 已在 `by-test/11` D5 §5、`by-test/12` §11 與 `02-airflow-diagrams.md` 連續三次出現，屬高頻考點。

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

#### ⭐ OSI 七層

| Layer | 中文 | 核心 | 典型關鍵字 |
|---:|---|---|---|
| **7** | 應用層 | 應用服務 | HTTP、DNS、SMTP |
| **6** | 表示層 | 格式、編碼、表示 | Encoding、Serialization、Compression |
| **5** | 會議層 | Session 管理 | Establish／Maintain／Terminate |
| **4** | 傳輸層 | 端到端傳輸 | TCP、UDP、Port |
| **3** | 網路層 | IP 與 Routing | IP、Router |
| **2** | 資料連結層 | Frame／MAC | Ethernet Frame、MAC、Switch、VLAN |
| **1** | **實體層** | **Bit／Signal／Medium** | **Fiber、Copper、Radio** |

```text
L1 = 線與訊號
L2 = Frame + MAC
L3 = IP + Router
L4 = TCP/UDP + Port
```

D3 最常考的其實就是 **L1–L4**。

#### 為什麼 fiber-optic line = Layer 1

**常見質疑：** fiber 可能接 Ethernet，所以不一定是 Layer 1？

關鍵是把**媒介**與**跑在媒介上的協定**拆開。光纖本身做的是傳送光訊號、表示 bits、physical medium、connector／wavelength／signal —— 所以 **fiber-optic line 本身 = Layer 1**。

Ethernet 則**同時涉及 L1 與 L2**：

```text
Ethernet
├─ Layer 1：光／電訊號、PHY、Fiber／Copper
└─ Layer 2：Ethernet Frame、MAC Address、VLAN
```

> **「Ethernet 跑在 fiber 上」不會把 fiber 本身變成 Layer 2。**

類比：

```text
道路           = Layer 1
貨櫃格式       = Layer 2
地址與路由     = Layer 3
```

車子開在道路上，不代表道路本身變成物流協定。

**判題四條：**

```text
Fiber-optic line / cable / medium  → Layer 1
MAC Address / Frame / VLAN         → Layer 2
IP Address / Routing               → Layer 3
TCP / UDP / Port                   → Layer 4
```

> 此題**不該降權**，分類是 `[T] 術語邊界`。

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

#### ⭐ Storage taxonomy：傳輸 vs 磁碟排列

```text
Storage Networking / Transport          Disk Organization
│                                       │
├─ iSCSI  → SCSI over TCP/IP            └─ RAID
├─ Fibre Channel → storage fabric           ├─ Striping
└─ FCoE   → FC frame over Ethernet          ├─ Mirroring
                                            └─ Parity
```

```text
FC / FCoE / iSCSI = 資料怎麼傳
RAID              = 磁碟裡怎麼排
```

RAID 處理的是 striping／mirroring／parity／disk redundancy，**不是在回答「host 要怎麼把 storage command 傳到 storage array」**。

> 題庫以 `storage protocols except RAID` 出題，**答案方向正確**，但把前三者粗略統稱 `storage protocols` 不夠精準——列為**中度 `[Q]`**，概念仍必須會（見 [README 的降權處理](../README.md)）。

#### Fibre Channel vs FCP（更精確的區分）

**常見質疑成立：** 直接說「Fibre Channel 是 storage protocol」過於粗糙。

| 名稱 | 更精確的定位 |
|---|---|
| **Fibre Channel（FC）** | **高速儲存網路傳輸技術／協定族**，通常用來建立 SAN；不必依靠傳統 TCP/IP |
| **FCP（Fibre Channel Protocol）** | 把 **SCSI command 映射／承載於 Fibre Channel 上**的協定 |

```text
SCSI commands → FCP → Fibre Channel fabric
```

#### ⭐ Converged Networking ≠ SDN ≠ HCI

傳統機房常有**兩套 network fabric**：

```text
Server
├─ Ethernet NIC → LAN / IP traffic
└─ FC HBA       → SAN / Storage traffic
```

**Converged Networking** 的核心是：讓一般 IP traffic 與 storage traffic **共用相同的網路基礎設施**。

```text
                    ┌─ Web / API
                    ├─ VM Traffic
Server ─ Ethernet ──┼─ Management
                    ├─ iSCSI
                    └─ FCoE
```

目的：減少 adapters、減少 cabling、減少 switches、統一 fabric、簡化資料中心 networking。

**三者回答的是不同問題，不要混：**

| 技術 | 核心問題 |
|---|---|
| **Converged Networking** | Traffic 是否**共用 fabric**？ |
| **SDN** | 網路**如何被控制**？（control plane 與 data plane 分離，可集中程式化控制） |
| **HCI** | **Compute ＋ Storage ＋ Virtualization 如何整合**？ |

#### GRE vs IPsec

> **復現標記：** 已在 `by-test/10` 上篇 C 與 `by-test/12` §9 連續出現，屬 recurring terminology。

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
| **Containerization** | **不模擬硬體**，共用 kernel（完整架構對照見下方） |
| **Live migration** | Host 維護期間搬移 VM 的正式名稱；要 **move VM as a live instance**，不是存 snapshot image |
| **Snapshot** | point-in-time state／rollback／reference——**不是**維護期間搬移工作負載的手段 |
| **管理平面隔離** | Virtualization management tools 必須放在隔離的管理網路，詳見下方 |
| **VM configuration management tool** | 必須具備 **log generation 與 audit trail** |
| **Snapshot／dormant VM** | 收不到 patch，是常見盲點 |
| **Cloud sprawl** | 雲端最常見的無意行為後果是忘記關 VM，造成 resource sprawl，不一定是 disaster |

#### ⭐ 資源分配三機制：Reservation／Limit／Shares

Hypervisor 層的資源管理有三個常被混用的機制，各回答不同問題：

| 機制 | 回答什麼 | 記法 |
|---|---|---|
| **Reservation**（資源保留） | 至少保證多少？ | **保底** |
| **Limit**（資源上限） | 最多能用多少？ | **封頂** |
| **Shares**（資源權重） | 不夠分時誰相對優先？ | **排順位** |

```text
Reservation：VM-A CPU 保留 = 4 GHz  → 平台應保證至少取得此量
Limit      ：VM-A CPU 上限 = 6 GHz  → 即使 host 還有大量閒置 CPU 也不能超過
Shares     ：VM-A = 2000、VM-B = 1000
             無爭用時通常沒有明顯作用；發生爭用時 A : B ≈ 2 : 1
```

**題幹觸發詞 → Shares：**

```text
contention
prioritize resource requests
relative priority
relative entitlement
```

> **常見錯因：** reservation 確實能在資源爭用時保護重要 VM，所以容易被誤選。但它回答的是「**至少要給多少**」，不是「**剩下的資源不夠分時，誰相對優先**」——後者才是 shares。

#### Virtualization Management Plane（來源：`by-test/12` §1）

**Virtualization management toolset 指的是管理 hypervisor／VM／host 的介面，不是裝在 guest OS 裡的工具。**

| | **Management Plane** | **VMware Tools（guest agent）** |
|---|---|---|
| 位置 | 管理 hypervisor／VM／host | 裝在 **Guest OS** 內 |
| 內容 | ESXi management interface、vCenter、hypervisor management API、orchestration／admin plane | drivers、time sync、graceful shutdown、guest integration |

```text
VMware Tools   → 裝在 Guest OS
Management Plane → 管 Hypervisor / VM / Host（vCenter / ESXi mgmt / APIs）
```

**安全原則：**

- 與 workload network 分離
- 避免 public-facing
- 透過 dedicated management VLAN／subnet／VRF／admin zone
- 僅允許管理員與管理工具存取
- MFA／bastion／logging

> **考試版：** Management plane should be isolated／segmented from production and public networks.
>
> **不要死背「一定只能用 VLAN」**——subnet、VRF、admin zone 都是合法的隔離手段。

#### VM vs Container 的架構對照

```text
VM                              Container
Hardware                        Hardware
  ↓                               ↓
Hypervisor                      Host Kernel
  ↓                               ↓
Virtual Hardware                Container Runtime
├─ vCPU                           ↓
├─ vNIC                         Namespaces + cgroups
├─ vDisk Controller             ├─ Container A
└─ Virtual Memory               ├─ Container B
  ↓                             └─ Container C
Guest Kernel
  ↓
Guest OS
```

| | **VM** | **Container** |
|---|---|---|
| Kernel | **獨立 guest kernel** | **共享 host kernel** |
| 硬體 | virtual hardware（hardware emulation） | 無硬體模擬 |
| 可擁有 | 完整 guest OS | 自己的 network view、filesystem view、process namespace、userspace |

**常見反駁：** container 也有自己的 storage／network 設定（network namespace、virtual interface、IP、route、mount namespace、overlay filesystem、volume、cgroups）——**這點成立，但那些都不是 hardware emulation。**

> **WSL2 不適合當反例：** WSL2 底層實際涉及**輕量 VM／virtualization**（`WSL2 Linux environment → Lightweight VM → Virtualization`），不能用它證明「純 container 也有 hardware emulation」。
>
> 題庫選項的 `OS replication` 用詞也不佳——container 通常不會為每個實例複製完整 guest kernel，但確實有自己的 userspace、libraries、root filesystem。此題列為**中度 `[Q]`**，但架構模型必須會。

#### Secure KVM

> **復現標記：** 已在 `by-test/10` 上篇 A 與 `by-test/12` §10 連續出現。

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

#### Vendor guidance 的層級（不要過度推論）

問「某個特定 storage controller 的 queue depth、firmware、cache、multipathing 怎麼設定」時，最精確的來源確實是**廠商產品指引**——因為它掌握 model-specific limits、firmware compatibility、supported topology、driver requirements。

但完整的要求來源是疊加的：

```text
法律／監管要求
        ＋
內部安全政策
        ＋
產業標準
        ＋
產品特定廠商指引
```

> **Vendor guidance 不能凌駕 regulation／policy。** 題庫選 vendor guidance 合理，但不要推論成「廠商說什麼就做什麼」。分類 `[J]`。

### 1.6 BC/DR 與韌性

#### 指標

| 指標 | 全稱 | 誰決定 | 核心問題 |
|---|---|---|---|
| **RPO** | Recovery **Point** Objective | 業務／IT | 最多能丟多久資料？（往事故**前**看）。注意：不是商業價值的流失 |
| **RTO** | Recovery **Time** Objective | IT／DR 規劃 | **IT／服務**多久要恢復？ |
| **WRT** | **Work Recovery Time** | 業務 | **IT 恢復後，業務還要多久才真正恢復？** |
| **MTD／MAO** | Maximum Tolerable Downtime／**Maximum Acceptable Outage** | 業務 | **整體**最多能中斷多久？再久就造成不可接受的損害 |

#### 完整時間軸

```text
最後可接受的復原點 ──── 事故 ──── IT 恢復 ──── 業務恢復
        │                │           │            │
        └──── RPO ───────┤           │            │
                         └── RTO ────┤            │
                                     └─── WRT ────┤
                         └────── MTD / MAO ────────┘
```

#### ⭐ 必背關係式

```text
RTO + WRT ≤ MTD / MAO
```

**IT 恢復所需時間 ＋ 業務恢復所需時間，不可超過業務最大可容忍中斷時間。**

| 例 | RTO | WRT | MTD | 判定 |
|---|---:|---:|---:|---|
| 符合 | 4h | 2h | 8h | `4 + 2 = 6 ≤ 8` ✅ |
| 不符合 | 7h | 2h | 8h | `7 + 2 = 9 > 8` ❌ |

> **註：** 舊的簡化寫法 `RTO < MAD` **漏掉了 WRT**，在有可觀業務恢復工作的情境下會低估需求。以上式為準。

#### WRT：IT 恢復 ≠ 業務恢復

很多人誤以為「IT 系統恢復 = 業務恢復」，實務上通常不是：

```text
08:00  事故
11:00  IT 系統恢復          ← RTO 到此為止（3h）
11:00–12:30  驗證資料、對帳、重啟批次、補送交易、重新同步、員工重新登入
12:30  業務真正恢復          ← WRT = 1.5h
```

**WRT 的典型活動：** 資料驗證、資料同步、對帳、補交易、工作流程重新啟動、使用者重新登入、應用程式重新連線、驗證業務流程、恢復 backlog。

> **⭐ WRT 陷阱：** 題幹說「Database 已恢復，但 Finance team 還需要 2 小時確認交易與對帳」——**那 2 小時是 WRT，不是 RTO**。

#### 四指標口訣

```text
RPO       = 往事故前看資料損失
RTO       = 到 IT 恢復
WRT       = IT 恢復後到業務恢復
MTD / MAO = 包住整段最大可接受中斷
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
- **測試情境要有變數：** 見下方小節。

#### BC/DR 測試為什麼要有「變數」

題型：`It is best to use variables in ______.` → **BC/DR tests**。

這裡的「變數」不是程式變數，而是**改變測試情境、故障條件與突發事件**：

```text
第一次：主要資料中心失效
第二次：資料庫毀損
第三次：主要區域失效 ＋ 備援連線異常
第四次：關鍵人員無法聯絡 ＋ 備份復原時間超過 RTO
```

**為什麼要變？** 若每次演練劇本完全相同，結果只是「大家知道劇本 → 照 SOP 演一次 → 全部通過」——**會演習不代表真正有復原能力**。

變化情境才能驗證：

- 人員是否真的理解程序（而非背劇本）
- 備援方案有沒有未知依賴
- RTO／RPO 能否真正達成
- 單點故障是否真的處理掉
- plan 是否只適用單一劇本

> **⭐ 對照：Baseline 要穩，BC/DR 測試要變。**
>
> Baseline 的目的是提供**穩定、已核准的參考狀態**，必須以 current state 比對 approved baseline 才能偵測 configuration drift。baseline 若自己一直變就失去 reference value。詳見 [Domain 5 §1.2](../domain5-operations/01-consolidated-lecture.md)。
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

### 1.8 三類 Security Controls

| 類別 | 核心 | 典型項目 |
|---|---|---|
| **行政／管理控制**<br>Administrative／Management | 政策、流程、治理、人員 | Security Policy、**Configuration Procedures**、Change Management、Risk Assessment、Awareness Training、Personnel Screening、Vendor Management |
| **技術／邏輯控制**<br>Technical／Logical | **由技術系統直接執行或強制** | Firewall、MFA、ACL、Encryption、IDS／IPS、DLP、**Audit Trail**、Logging、PAM |
| **實體／環境控制**<br>Physical／Environmental | 保護人、設備、建築與環境 | Locks、Guards、Mantrap、CCTV、**Fire Suppression**、HVAC、UPS、Generator、Water Detection |

**四選一範例** —— 問「下列哪一項是技術控制」：

| 選項 | 分類 |
|---|---|
| Fire suppression equipment | 實體／環境 |
| **Audit trails** | **技術** ← 正解 |
| Security policies | 行政／管理 |
| Configuration procedures | 行政／管理 |

> **註：** 若題庫解析把 fire suppression 歸成 administrative，那是解析錯誤，但不影響本題唯一最佳答案。

> 相關：Defense in Depth 是**根本原則**，MFA 只是其中一項控制——見 `by-test/learnzapp/01` §2.5 與 [Domain 4 §1.5](../domain4-application/01-consolidated-lecture.md) 的 MFA factor 分類。風險處置（avoid／mitigate／transfer／accept）見 [Domain 6 §1.9](../domain6-legal-compliance/01-consolidated-lecture.md)。

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
| 35 | **Front ↔ Front = Cold aisle；Rear ↔ Rear = Hot aisle。** |
| 36 | 絕不讓 exhaust 吹進 inlet，那是 hot air recirculation。 |
| 37 | Raised floor = cooling plenum ＋ cabling／infrastructure space；**不是**增加結構強度。 |
| 38 | Raised floor 本身必須被設計成能承受 rack 重量。 |
| 39 | 冷風路徑：CRAC/CRAH → underfloor plenum → perforated tile → cold aisle → server inlet。 |
| 40 | **VMware Tools ≠ virtualization management plane**；前者在 guest OS，後者管 hypervisor／VM／host。 |
| 41 | Management plane 必須與 workload 及公開網路隔離；手段不限 VLAN（subnet／VRF／admin zone 皆可）。 |
| 42 | **Live migration moves a running VM; snapshot does not。** |
| 43 | Server 氣流固定是 **Front／Inlet → Server → Rear／Exhaust**。 |
| 44 | Hot-air recirculation 的後果鏈：inlet temp ↑ → fan speed ↑ → cooling load ↑ → energy cost ↑ → thermal risk ↑。 |
| 45 | **Reservation = 保底；Limit = 封頂；Shares = 爭用時排順位。** |
| 46 | 題幹出現 contention／prioritize／relative priority／relative entitlement → **Shares**。 |
| 47 | Reservation 回答「至少給多少」，不是「不夠分時誰優先」。 |
| 48 | Limit 即使在 host 閒置時也會封頂。 |
| 49 | **BC/DR 測試要有變數（改變故障情境）；Baseline 要穩。** |
| 50 | 劇本固定的演練只證明「會演習」，不代表有復原能力。 |
| 51 | **WRT = Work Recovery Time：IT 恢復後業務還要多久才真正恢復。** |
| 52 | **MAO = Maximum Acceptable Outage**，與 MTD 同義（整體最大可容忍中斷）。 |
| 53 | **必背關係式：`RTO + WRT ≤ MTD／MAO`**（舊寫法 `RTO < MAD` 漏了 WRT）。 |
| 54 | 「DB 已恢復但財務還要 2 小時對帳」→ 那 2 小時是 **WRT**，不是 RTO。 |
| 55 | 口訣：RPO 往前看資料、RTO 到 IT 恢復、WRT 到業務恢復、MTD/MAO 包住整段。 |
| 56 | **`L1 = 線與訊號／L2 = Frame+MAC／L3 = IP+Router／L4 = TCP/UDP+Port`。** |
| 57 | **Fiber-optic line 本身是 L1**；Ethernet 同時涉及 L1（PHY）與 L2（Frame／MAC／VLAN）。 |
| 58 | 「Ethernet 跑在 fiber 上」不會讓 fiber 變成 L2——媒介與協定要拆開。 |
| 59 | 判題：line/cable/medium → L1；MAC/Frame/VLAN → L2；IP/Routing → L3；TCP/UDP/Port → L4。 |
| 60 | **`FC／FCoE／iSCSI = 資料怎麼傳`；`RAID = 磁碟裡怎麼排`。** |
| 61 | **FC = 儲存網路傳輸技術／協定族；FCP 才是把 SCSI command 承載於 FC 上的協定。** |
| 62 | **Converged Networking = traffic 共用同一套 fabric**（減 adapters／cabling／switches）。 |
| 63 | `Converged → 是否共用 fabric`；`SDN → 網路如何被控制`；`HCI → compute+storage+虛擬化如何整合`。 |
| 64 | **VM = virtual hardware ＋ 獨立 guest kernel；Container = 共享 host kernel、無硬體模擬。** |
| 65 | Container 有自己的 namespace／IP／mount／cgroups，但那些**不是 hardware emulation**。 |
| 66 | WSL2 底層涉及輕量 VM，不能當「container 也有硬體模擬」的反例。 |
| 67 | **三類控制：行政（政策流程人員）／技術（系統強制執行）／實體（人與設備環境）。** |
| 68 | Audit trail = 技術控制；Security policy 與 configuration procedures = 行政控制；fire suppression = 實體控制。 |
| 69 | 要求來源疊加：法律監管 ＋ 內部政策 ＋ 產業標準 ＋ 廠商指引；**vendor guidance 不能凌駕 regulation／policy**。 |

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
| MAD／MTD／MAO | RTO ＋ WRT | 業務整體上限 vs IT 恢復＋業務恢復之和 |
| RTO | WRT | 到 IT 恢復 vs IT 恢復後到業務恢復 |
| Fiber（媒介） | Ethernet（協定） | L1 實體媒介 vs 同時涉及 L1＋L2 的協定 |
| FC／FCoE／iSCSI | RAID | 資料怎麼傳 vs 磁碟裡怎麼排 |
| Fibre Channel | FCP | 傳輸技術／協定族 vs 承載 SCSI command 的協定 |
| Converged Networking | SDN | traffic 共用 fabric vs 網路如何被控制 |
| Converged Networking | HCI | 網路 fabric 整合 vs compute＋storage＋虛擬化整合 |
| VM | Container | 獨立 guest kernel ＋ 硬體模擬 vs 共享 host kernel |
| Container 的 namespace | Hardware emulation | 隔離視圖 vs 模擬虛擬硬體 |
| 行政控制 | 技術控制 | 政策流程人員 vs 系統直接執行強制 |
| 技術控制 | 實體控制 | 系統強制 vs 保護人與設備環境 |
| Vendor guidance | Regulation／Policy | 產品特定最精確 vs 不可被廠商指引凌駕 |
| Restore | Resume | 修好主要站點 vs 切換回主要站點 |
| Recover | Restore | 在備援站點起服務 vs 修復原站點 |
| Tier III | Tier IV | 維護不停機 vs 無預警故障也不停機 |
| Multiple carriers | Diverse routing | 多家電信 vs 實體路徑分離 |
| Tabletop 演練 | Full test | 最安全 vs 高營運中斷風險 |
| Hot aisle | Cold aisle | 機櫃後方排氣相對 vs 機櫃前方進氣相對 |
| Management plane | VMware Tools／guest agent | 管 hypervisor／VM／host vs 裝在 guest OS 內 |
| Live migration | Snapshot | 搬移執行中的 VM vs 保存時間點狀態 |
| Reservation | Shares | 保證最低量 vs 爭用時的相對優先級 |
| Reservation | Limit | 保底 vs 封頂 |
| BC/DR 測試 | Baseline | 情境要變（驗證真實復原力） vs 要穩（作為比對基準） |

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
- Cold aisle 是哪一面相對？為什麼 `exhaust → inlet` 的擺法是錯的？
- Raised floor 的兩個用途是什麼？為什麼「增加結構強度」是錯的？
- VMware Tools 與 virtualization management plane 差在哪？
- Host 進維護時搬移 VM 的正確機制是什麼？為什麼不是 snapshot？
- Hot-air recirculation 除了溫度升高，還會連帶造成哪四項後果？
- Reservation、Limit、Shares 各回答什麼問題？看到 contention 該選哪個？
- BC/DR 測試為什麼要換情境？為什麼 baseline 相反地要穩定？
- 四個 BC/DR 指標的關係式是什麼？WRT 量的是哪一段？
- Fiber-optic line 屬哪一層？為什麼 Ethernet 跑在 fiber 上不會改變這個答案？
- `FC／FCoE／iSCSI` 與 `RAID` 回答的是不同問題——各是什麼？
- Converged Networking、SDN、HCI 各回答什麼問題？
- Audit trail 屬哪一類控制？Configuration procedures 呢？
