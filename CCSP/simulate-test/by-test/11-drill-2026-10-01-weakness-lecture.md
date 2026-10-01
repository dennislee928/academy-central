# CCSP 模擬測驗講義：2026-10-01 反駁題概念釐清（D1／D2／D5）

> **講義編號：** 11
> **講義類型：** 反駁題 remediation —— 對題庫敘述提出質疑後的概念釐清
> **日期：** 2026-10-01
> **原檔標示 Domain：** Domain 1、Domain 2、Domain 5
> **彙整歸屬：** 部分主題依 `README.md` 既定結構重導至其他 domain，見下方對照表

## 本檔內容在彙整講義中的落點

| 本檔章節 | 主題 | 彙整講義落點 |
|---|---|---|
| D1 §1 | Private Cloud ≠ Private Network | [D1 §1.2](../domain1-cloud-concepts/01-consolidated-lecture.md) |
| D1 §2 | Cloud Deployment Models 快速判斷 | D1 §1.2 |
| D1 §3 | Sandbox ≠ Service Model | D1 §1.7 |
| D1 §4 | Insider Threat 控制分類 | [D5 §1.6](../domain5-operations/01-consolidated-lecture.md) |
| D1 §5 | ISO 27001 technology-neutral | [D6 §1.2](../domain6-legal-compliance/01-consolidated-lecture.md) |
| D2 §1 | Volume／Block Storage | [D2 §1.3](../domain2-data-security/01-consolidated-lecture.md) |
| D2 §2 | Virtualization vs Multitenancy | D2 §1.10 |
| D2 §3 | Egress Monitoring 雲端障礙 | D2 §1.2 |
| D2 §4 | Two-Person Integrity 系列 | D2 §1.11 |
| D5 §1–2 | ARO evidence／SLE／ALE | [D6 §1.8](../domain6-legal-compliance/01-consolidated-lecture.md) |
| D5 §3 | Synthetic Monitoring vs RUM | [D5 §1.5](../domain5-operations/01-consolidated-lecture.md) |
| D5 §4 | NIST RMF 7 steps | D6 §1.2 |
| D5 §5 | Hot／Cold Aisle | [D3 §1.1](../domain3-infrastructure/01-consolidated-lecture.md) |
| D5 §6 | DHCP vs NTP | D5 §1.5 |
| D5 §7 | High Availability | D5 §1.4 |

---

# Domain 1 — Cloud Concepts, Architecture and Design

## 1. Private Cloud ≠ Private Network

### 核心

Private Cloud 的重點不是「只能公司內部的人使用」，而是：

> **cloud infrastructure dedicated to one organization**

所以 private cloud：

- 可以 Internet-facing
- 可以讓銀行客戶透過 App／Browser 使用
- 可以由第三方託管
- 不一定放在企業自己機房

### 架構例

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

外部使用者可以使用服務，但 backend infrastructure **仍只供該銀行組織使用**。

### 反駁重點：Europe → Private Cloud？

此處的反駁成立：

> 「歐洲公司 production 搬上 cloud，為什麼一定 Private Cloud？Public Cloud 也能符合 GDPR。」

**實務上完全正確。** Public Cloud 可以提供：

- EU region
- data residency
- encryption
- sovereignty controls
- contractual safeguards

所以：**Europe／GDPR ≠ automatically Private Cloud**。

### CCSP 題目真正想抓

只有在題目**同時**暗示下列條件時，才傾向 Private Cloud：

- maximum control
- dedicated infrastructure
- isolation
- organizational exclusivity
- strict governance

### Exam Rule

```text
Private = dedicated to one organization
Private ≠ not Internet-facing
```

---

## 2. Cloud Deployment Models

| Model | 核心 |
|---|---|
| **Public** | provider infrastructure，通常 multi-tenant |
| **Private** | single organization exclusive use |
| **Community** | organizations share common mission／regulatory needs |
| **Hybrid** | combines distinct cloud environments |

### 快速判斷

```text
Exclusive organization?          → Private
Shared industry/regulation?      → Community
Mix different environments?      → Hybrid
Elastic general provider service? → Public
```

---

## 3. Sandbox ≠ Service Model

Sandbox 是 **isolated testing environment／isolation pattern**，它不是 IaaS／PaaS 本身。

Sandbox 可以建在：IaaS、PaaS、containers、Kubernetes namespace、serverless、local VM。

### PaaS Sandbox

適合：developer 只想開發、測試 application。

```text
Developer manages:        Provider manages:
- code                    - runtime
- application             - middleware
- data                    - OS
                          - virtualization
                          - hardware
```

### IaaS Sandbox

適合：custom OS、malware analysis、custom firewall、IDS/IPS、packet capture、kernel testing、network segmentation、low-level security testing。

```text
Customer controls:
- guest OS        - VPC/VNet       - routing
- host firewall   - subnet         - security groups / agents
```

### 反駁重點：Secure sandbox 為什麼不是 IaaS？

反駁論點：

> IaaS 能控制 OS + network segmentation，不是更符合真正 isolation 嗎？

**實務上成立。** 如果 requirement 是「security boundary／OS／network isolation must be controlled by customer」，那 IaaS 通常更合理。

但 CCSP 題目如果只說 `software development and testing sandbox`，通常抓 keyword：**development platform → PaaS**。

### Exam Rule

```text
Sandbox = isolation pattern
PaaS    = developer sandbox
IaaS    = sandbox requiring OS/network-level control
```

---

## 4. Insider Threat

> **彙整落點：[D5 §1.6](../domain5-operations/01-consolidated-lecture.md)**

Insider threat 通常指已位於某種 trust boundary 內的：employee、contractor、privileged administrator、trusted partner。

### 常見 controls

| 類別 | 控制 |
|---|---|
| **Preventive** | background screening、least privilege、separation of duties、job rotation、mandatory vacation、PAM |
| **Detective** | logging、SIEM、UEBA、DLP、privileged activity monitoring |
| **Administrative** | policy、awareness、sanctions、offboarding |

### 反駁重點：Aggressive Background Checks

此處的質疑合理：「aggressive background checks」這種措辭太強。

比較正確的說法應是 **appropriate／lawful／proportionate personnel screening**，而不是「越激進越安全」。

### 反駁重點：Hardened perimeter 不也能防 insider？

提出的情境：機房再放 firewall／biometric，避免偽裝員工進入。

這在實務上成立，但要拆開看：

**Internal segmentation firewall**

```text
Corporate LAN
     |
Internal Firewall
     |
Sensitive Network
```

可以限制 insider lateral movement，但它叫 **internal segmentation**，不是典型的 perimeter device。

**Biometric** 是 **physical access control**，可以防 unauthorized physical entry、impersonation、stolen badge，但也不是 network perimeter hardening。

### Exam Rule

```text
Background screening        = preventive personnel control
Internal segmentation       = limits insider movement
External perimeter hardening = primarily outsider-focused
```

---

## 5. ISO 27001

> **彙整落點：[D6 §1.2](../domain6-legal-compliance/01-consolidated-lecture.md)**

ISO 27001 是 **ISMS requirements**，不是 cloud-specific、on-prem-specific、vendor-specific 或 open-source-specific——它是 **technology-neutral**。

```text
ISO 27001 = management system / requirements
ISO 27002 = security control guidance
```

---

## Domain 1 Flash Cards

| # | Q | A |
|---|---|---|
| D1-01 | Private Cloud 的核心定義？ | Infrastructure dedicated to one organization；不代表不能 Internet-facing。 |
| D1-02 | Europe／GDPR 是否代表一定要 Private Cloud？ | No。Public Cloud 也可透過 region、residency、encryption、contractual controls 合規。 |
| D1-03 | Sandbox 是 service model 嗎？ | No。Sandbox 是 isolation pattern，可存在於 IaaS、PaaS、containers 等。 |
| D1-04 | Developer 想要現成的 coding／testing 環境？ | PaaS。 |
| D1-05 | Sandbox requires custom OS／network isolation？ | IaaS。 |
| D1-06 | Insider threat 主要 controls？ | Least privilege、SoD、screening、logging、UEBA、DLP、PAM。 |
| D1-07 | External perimeter hardening 是主要 insider control 嗎？ | No。Internal segmentation 才較直接。 |
| D1-08 | ISO 27001 偏好哪種 technology？ | None。Technology-neutral ISMS requirements。 |

---

# Domain 2 — Cloud Data Security

## 1. Volume / Block Storage

Volume storage 本質：**virtual block device presented like a physical disk**。

```text
Physical storage pool
        |
Virtual volume
        |
      VM
        |
Guest OS sees:
 /dev/sda
 E:
 disk
```

### Storage Comparison

| Type | Looks like | Access |
|---|---|---|
| **Block／Volume** | Disk | block device |
| **File** | Folder／share | NFS／SMB |
| **Object** | Object + metadata | API／HTTP |

### Exam Rule

```text
Volume = virtual block device behaving like a disk
```

---

## 2. Virtualization vs Multitenancy

### Virtualization

回答：**How resources／data are abstracted**。

可能讓資料改變 representation／container：

```text
file → VM disk → snapshot → image → backup → object
```

因此 **classification 必須跟著資料走**。

### Multitenancy

回答：**Who shares infrastructure**。

```text
Host
├ Tenant A
├ Tenant B
└ Tenant C
```

主要風險：isolation、co-residency、leakage、shared resource。

### Exam Rule

```text
Virtualization = abstraction / transformation
Multitenancy   = shared infrastructure
```

---

## 3. Egress Monitoring

Egress 指 **outbound traffic**。

```text
Cloud workload
      |
      | egress
      v
Internet / external service
```

監控用途：exfiltration、C2、malicious upload、DLP、unauthorized outbound access。

### Cloud Egress Monitoring Challenges

- limited visibility
- limited privileges
- dynamic workloads
- encryption
- changing topology
- performance overhead

### EXCEPT 題型

**Redundancy／resilience 本身不是主要的 egress-monitoring obstacle。**

---

## 4. Two-Person Integrity

TPI：敏感操作不能由單一人員完成，至少兩位 authorized individuals 共同參與。

```text
Admin A ----\
             > HSM key operation
Admin B ----/
```

### 和其他 concepts 分開

**Separation of Duties** — 不同 duties 給不同人

```text
Alice requests → Bob approves → Carol executes
```

**Dual Control／TPI** — 同一敏感操作需要兩人

```text
Alice + Bob → key export
```

**Split Knowledge** — 每個人只知道 secret 的一部分

```text
Alice → key share A
Bob   → key share B
A + B → complete key
```

**M-of-N** — 例如 3-of-5 custodians required。

### Exam Rule

```text
SoD                = divide responsibilities
TPI / Dual Control = two people required
Split Knowledge    = nobody knows full secret
M-of-N             = threshold control
```

---

## Domain 2 Flash Cards

| # | Q | A |
|---|---|---|
| D2-01 | Volume storage？ | Virtual block device presented like a disk. |
| D2-02 | Object storage 和 volume 最大差別？ | Object 透過 API／object ID；Volume 是 block device。 |
| D2-03 | Virtualization 影響 data classification 的原因？ | Data may change representation／container，如 file→snapshot→image→backup，但 classification 必須保留。 |
| D2-04 | Multitenancy 主要 concern？ | Isolation／co-residency／shared-resource exposure。 |
| D2-05 | Egress monitoring 主要監控？ | Outbound exfiltration、C2、DLP violation。 |
| D2-06 | Two-Person Integrity？ | 至少兩位 authorized persons 才能執行 sensitive operation。 |
| D2-07 | TPI vs Split Knowledge？ | TPI = 多人共同執行；Split Knowledge = 每人只有 secret 的一部分。 |
| D2-08 | 2-of-3 key custodians？ | M-of-N／threshold control。 |

---

# Domain 5 — Cloud Security Operations

## 1. ARO

> **彙整落點：[D6 §1.8](../domain6-legal-compliance/01-consolidated-lecture.md)**

ARO：**Annualized Rate of Occurrence**，回答「一年預期發生幾次？」

### 為什麼 Historical Data？

因為 historical data 是 **evidence／input**。例如：

```text
5 years, 10 incidents
10 / 5 = ARO 2
```

### 為什麼 Aggregation 不是最佳答案？

Aggregation 是 **processing／calculation technique**，不是 evidence source。

```text
Historical data
      ↓
Aggregation / average
      ↓
Observed frequency
      ↓
ARO estimate
```

### 反駁重點

```text
Historical data = evidence
Aggregation     = calculation technique
```

Aggregation 不是「不能用」，而是**它必須先有 historical observations 才能 aggregate**。

---

## 2. SLE / ARO / ALE

```text
SLE = Asset Value × Exposure Factor      （一次損失）
ARO = 一年發生幾次
ALE = SLE × ARO                           （一年預期損失）
```

---

## 3. Synthetic Monitoring vs RUM

### Synthetic Monitoring

**scripted simulated transactions**，例如 `Login → Search → Checkout`。

可以固定：time、location、browser、workflow，所以是 **controlled／repeatable**。

**為什麼 broad coverage？** 因為可以主動測試 rare workflows、no-user periods、specific regions、critical endpoints，不必等真實 user 剛好操作。

### RUM

**Real User Monitoring**，觀察：real browser、real ISP、real device、actual user behavior、actual latency。

### 反駁重點

```text
Synthetic = controlled simulation / broad planned coverage
RUM       = real behavior / realistic experience
```

### Exam Rule

```text
Synthetic asks: Can it work?
RUM asks:       How is it actually working for users?
```

---

## 4. NIST RMF

> **彙整落點：[D6 §1.2](../domain6-legal-compliance/01-consolidated-lecture.md)**

RMF：**Risk Management Framework**，七步驟：

```text
Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor
```

口訣：**P-C-S-I-A-A-M**

### RMF 不是什麼？

不是 threat-only framework，也不是 cost-only framework。**Threat 與 cost 都只是 risk decision inputs。**

### RMF 核心

```text
Mission/business context
        ↓
Risk
        ↓
Controls
        ↓
Assessment
        ↓
Authorization
        ↓
Continuous monitoring
```

---

## 5. Hot Aisle / Cold Aisle

> **彙整落點：[D3 §1.1](../domain3-infrastructure/01-consolidated-lecture.md)**

典型 server airflow：

```text
FRONT              REAR

Cold air
   ↓
[ SERVER ]
          ↓
       Hot air
```

**Cold Aisle** — front faces front

```text
Rack FRONT → COLD AISLE ← FRONT Rack
```

**Hot Aisle** — rear／exhaust faces rear／exhaust

```text
Rack REAR → HOT AISLE ← REAR Rack
```

### 反駁／易錯點

錯誤擺法：`Exhaust → Inlet`，因為會造成 **hot air recirculation**。

### Exam Rule

```text
Front ↔ Front = Cold aisle
Back  ↔ Back  = Hot aisle
Never Hot → Cold
```

---

## 6. DHCP

DHCP 主要派送：IP address、subnet mask、gateway、DNS、option-based network configuration。

它可以透過 **Option 42** 告訴 client NTP server address，但**DHCP 本身不執行時間同步**。

### Exam Rule

```text
DHCP distributes network configuration.
NTP synchronizes clocks.
DHCP does not negotiate encryption protocols.
```

---

## 7. High Availability

HA 關注：**service remains available despite failures**。

常見手段：redundancy、replication、clustering、failover、load balancing。

### 注意

**Failback to on-prem 不是所有 cloud HA architecture 必備。** 是否存在取決於 hybrid architecture、organization environment、DR strategy。

---

## Domain 5 Flash Cards

| # | Q | A |
|---|---|---|
| D5-01 | ARO 最直接 evidence？ | Historical occurrence data。 |
| D5-02 | Aggregation 對 ARO 是什麼角色？ | Calculation／processing technique，不是 evidence source。 |
| D5-03 | SLE × ARO？ | ALE。 |
| D5-04 | Synthetic Monitoring？ | Scripted simulated transactions，controlled、repeatable、可做 broad planned coverage。 |
| D5-05 | RUM？ | Observes actual production users and real user experience。 |
| D5-06 | Synthetic vs RUM 一句話？ | Synthetic = Can it work?；RUM = How is it actually working? |
| D5-07 | RMF 7 steps？ | Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor。 |
| D5-08 | RMF 是以 cost／threat 為 foundation 嗎？ | No。Risk-based framework；cost／threat 都是 inputs。 |
| D5-09 | Hot aisle？ | Rack exhaust／rear faces exhaust／rear。 |
| D5-10 | Cold aisle？ | Rack inlet／front faces inlet／front。 |
| D5-11 | DHCP vs NTP？ | DHCP distributes configuration；NTP synchronizes time。 |

---

# 本次反駁題規則總表

本節適合直接作為隔日 active recall 題庫。

### ARO

```text
Historical data = evidence
Aggregation     = calculation technique
```

不是 aggregation 不能用，而是 aggregation 需要 historical observations 才能產生 frequency estimate。

### Private Cloud

```text
Private = dedicated to one organization
```

不代表不能 Internet-facing。銀行網站可以公開給客戶使用，backend 仍然可以是 private cloud。

### Sandbox

```text
Sandbox = isolation pattern
PaaS 適合 developer sandbox
IaaS 適合需要 OS/network-level isolation control 的 sandbox
```

**More control ≠ automatically more secure。More control 同時代表 more responsibility。**

### Insider Threat

- Background screening 是 preventive personnel control。
- Internal segmentation 可以限制 insider lateral movement。
- External perimeter hardening 主要還是 outsider-focused。

### Synthetic vs RUM

```text
Synthetic = controlled / repeatable / broad planned coverage
RUM       = realistic / actual user experience
```

### Virtualization vs Multitenancy

```text
Virtualization = abstraction / transformation
Multitenancy   = shared infrastructure
```

### TPI / SoD / Split Knowledge

```text
SoD             = divide duties
TPI             = two people required
Split Knowledge = nobody knows complete secret
M-of-N          = threshold
```

### Hot / Cold Aisle

```text
Front ↔ Front = Cold
Rear  ↔ Rear  = Hot
Exhaust → Inlet = bad recirculation
```

---

## 真正需要固化的八組 distinction

| # | Distinction | 彙整落點 |
|---|---|---|
| 1 | ARO vs Aggregation | D6 §1.8 |
| 2 | Synthetic vs RUM | D5 §1.5 |
| 3 | Private Cloud vs Private Network | D1 §1.2 |
| 4 | PaaS sandbox vs IaaS sandbox | D1 §1.7 |
| 5 | Insider controls vs perimeter controls | D5 §1.6 |
| 6 | Virtualization vs Multitenancy | D2 §1.10 |
| 7 | TPI vs SoD vs Split Knowledge | D2 §1.11 |
| 8 | Hot aisle vs Cold aisle | D3 §1.1 |

能在不看筆記的情況下完整講出這八組，本次 D1／D2／D5 remediation 才算完成。
