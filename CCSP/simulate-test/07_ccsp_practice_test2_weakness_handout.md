# CCSP LearnZApp Practice Test 2 弱點分析與補強講義

> 題源：ISC2 LearnZApp / Practice Test 2  
> 題數：125  
> 分數：77%  
> 產出日期：2026-06-01  
> 分析基準：本次 `zapp_6.zip` 內的 Practice Test 2 結果頁與錯題 review screenshots。  
> 注意：壓縮檔內含 32 張截圖，其中 28 張為 2026-06-01 Practice Test 2 錯題 review，另有 4 張 2026-05-30 截圖看起來屬於前次 D3 drill；本講義的進步判斷與主要弱點以 Practice Test 2 為主。

---

## 1. Executive Summary

Practice Test 2 是明確進步。

| 指標 | Practice Test 1 | Practice Test 2 | 變化 |
|---|---:|---:|---:|
| 題數 | 129 | 125 | -4 |
| 答對 | 85 | 97 | +12 |
| 答錯 | 44 | 28 | -16 |
| 分數 | 65% | 77% | **+12 points** |
| 平均作答時間 | 28s / 題 | 41s / 題 | 放慢且更準 |
| Readiness | 42% → 46% | 47% → 52% | 持續上升 |

結論：

> Practice Test 2 已從「補弱期」進入「模擬考穩定化期」。D1、D2、D3、D5、D6 均達約 78% 以上，主要短板轉移到 D4 Application Security 與部分跨域名詞/定義題。

---

## 2. Practice Test 2 Domain-wise Performance

| Domain | Correct / Total | Score | 判斷 |
|---|---:|---:|---|
| D1 Cloud Concepts, Architecture and Design | 26 / 33 | **79%** | 接近穩定 |
| D2 Cloud Data Security | 14 / 18 | **78%** | 回到可接受區 |
| D3 Cloud Platform & Infrastructure Security | 12 / 15 | **80%** | 明顯修起來 |
| D4 Cloud Application Security | 22 / 31 | **71%** | 本次相對弱點 |
| D5 Cloud Security Operations | 11 / 14 | **79%** | 穩定 |
| D6 Legal, Risk and Compliance | 12 / 14 | **86%** | 明顯改善 |

---

## 3. 是否有進步？

### 3.1 Overall Progress

Practice Test 1 到 Practice Test 2：

```text
65% → 77%
```

這是實質進步，不是隨機波動。原因：

1. 題數相近，兩次都是 full practice test。
2. 錯題數從 44 題降到 28 題。
3. 平均作答時間從 28 秒提高到 41 秒，表示讀題品質提升。
4. 多個過去弱 domain 在 PT2 進入 78%+ 區間。

---

### 3.2 Domain Progress

| Domain | 前期狀態 | Practice Test 2 | 判斷 |
|---|---|---:|---|
| D1 | 之前 custom test 約 56–69% 波動 | 79% | 改善明顯 |
| D2 | 曾在 D2 drill 掉到 56% | 78% | 全局題中回穩 |
| D3 | PT1 54%，D3 drill 64% / 68% | 80% | patch 有效 |
| D4 | 之前表現通常不差 | 71% | 新短板 |
| D5 | PT1 60% | 79% | 改善 |
| D6 | 曾在 custom test 掉到 23% | 86% | 大幅改善 |

結論：

> D3 / D6 補強已經轉化成 full mock 分數；D4 變成新的優先補強區。

---

## 4. 本次錯題主題總覽

本次 28 題錯題可分為以下類型：

| Category | 代表錯題 | Domain |
|---|---|---|
| Cloud architecture / service model | Type 1 hypervisor, hybrid cloud, SaaS | D1 / D3 |
| IT governance / standards | ITIL, FedRAMP, NIST 800-53, Common Criteria | D6 / D5 |
| Application security | DAST/SAST, OWASP, API Gateway OSI layer, secure SDLC | D4 |
| Storage / networking | volume storage, VLAN, SDN control plane | D2 / D3 |
| Crypto / data security | PKI, ECC, TDE, anonymization, degaussing | D2 |
| Risk / BC-DR | qualitative risk, ALE, RPO | D3 / D6 |
| Identity / authentication | two-factor authentication, enhanced authentication | D5 / D3 |
| Audit / compliance | auditability, HIPAA | D6 |

---

## 5. P0 Weakness：D4 Cloud Application Security

D4 本次為 71%，是六個 domain 中最低。雖然不是災難分數，但在目前整體 77% 的狀態下，D4 已成為首要提升點。

### 5.1 錯題模式

#### 1. DAST / SAST / black-box testing

錯題線索：

- Black-box test
- Tool must discover individual execution paths
- 誤把其他掃描/測試類型當成答案

規則：

```text
DAST = black-box / running application / external behavior testing
SAST = white-box / source code / static analysis
IAST = inside running application / instrumentation
RASP = runtime protection inside app
```

秒殺判斷：

```text
black-box + running app + discover execution paths = DAST
source code / no execution = SAST
```

---

#### 2. OWASP framework

錯題線索：

- Application security best practices catalogued
- Framework leveraged by organizations
- Common components / app security guidance

規則：

```text
OWASP = application security best-practice community / catalog
OWASP Top 10 = common web application risks
NIST / ISO = broader standards, not app-specific best-practice catalog
```

---

#### 3. API Gateway OSI layer

錯題線索：

- API gateway operates at which OSI layer
- 誤選 Session
- 正解 Application layer

規則：

```text
API gateway = Layer 7 / Application layer
Firewall / router = lower-layer network filtering
Load balancer can vary, but API gateway is L7
```

---

#### 4. Secure software development in cloud / side-channel concern

錯題線索：

- Secure software development for the cloud
- Shared resources
- Side-channel attacks

規則：

```text
Shared cloud resources introduce side-channel concerns.
Secure SDLC in cloud must consider co-tenancy, resource isolation, and side-channel leakage.
```

---

### 5.2 D4 Patch Plan

#### 60 分鐘版

| 時間 | 任務 |
|---:|---|
| 0–10 min | DAST / SAST / IAST / RASP 對照 |
| 10–20 min | OWASP / secure SDLC / threat modeling |
| 20–30 min | API Gateway / app-layer security |
| 30–40 min | Cloud app side-channel / shared resource risk |
| 40–55 min | D4 targeted 15–20 題 |
| 55–60 min | 寫 5 條錯題規則 |

#### Gate

| 指標 | 目標 |
|---|---:|
| D4 targeted drill | 75–80% |
| D4 full mock segment | ≥75% |
| 錯題類型 | 不再集中於 DAST/SAST/API/OWASP |

---

## 6. P1 Weakness：D1 / D3 Architecture 與 Cloud Model 題

D1 和 D3 本次分數已經不差，但錯題中仍有幾個基礎概念需要釘死。

---

### 6.1 Type 1 Hypervisor

規則：

```text
Type 1 hypervisor = bare-metal hypervisor
Directly runs on hardware
Manages CPU / RAM / storage resources directly
```

常見混淆：

| 概念 | 判斷 |
|---|---|
| Type 1 | runs directly on hardware |
| Type 2 | runs on host OS |
| Container | OS-level isolation, not hypervisor |
| VM | virtual machine instance |

---

### 6.2 Hybrid Cloud

規則：

```text
Hybrid cloud = two or more distinct cloud infrastructures
They remain unique entities
They are bound together by standardized or proprietary technology
They enable data/application portability
```

不要被以下詞干擾：

- private + public 出現不一定就足夠
- multicloud 不一定是 hybrid
- hybrid 關鍵是 integration / portability / binding technology

---

### 6.3 SaaS

錯題線索：

- application solution running on vendor/cloud provider infrastructure

規則：

```text
SaaS = complete application delivered by provider
PaaS = runtime/platform for customer-developed application
IaaS = infrastructure where customer controls OS/apps/data
```

---

### 6.4 Public cloud governance responsibility

從前次 D3 drill 延續的重點：

```text
Public cloud data center control governance = cloud provider
Regulator sets requirements
Customer defines requirements and evaluates provider
Provider operates provider-owned data center controls
```

---

## 7. P1 Weakness：D2 Data Security / Crypto / Storage

D2 本次達 78%，但錯題仍集中在 classic D2 taxonomy。

---

### 7.1 Volume Storage

規則：

```text
Volume storage = virtual disks attached to compute instances
It behaves like a physical drive or array
Block-level storage model
```

對照：

| Storage Type | 判斷 |
|---|---|
| Volume / block storage | attached disk-like storage |
| Object storage | bucket/object/metadata/API |
| File storage | shared filesystem |
| Raw storage | low-level storage allocation |

---

### 7.2 PKI

規則：

```text
PKI = framework of policies, procedures, people, software, hardware, and cryptographic mechanisms
Purpose = secure communication and trust using public key cryptography
```

不要把 PKI 縮小成「只有 encryption algorithm」。

---

### 7.3 ECC

規則：

```text
ECC = Elliptic Curve Cryptography
Provides comparable security with smaller keys than traditional public-key crypto
```

---

### 7.4 Transparent Database Encryption

規則：

```text
TDE engine = database / DBMS layer
KMS = manages keys
HSM = hardware-protected key storage / crypto operations
```

---

### 7.5 Anonymization

規則：

```text
Anonymization = permanently removing personal identifiers
Pseudonymization = replacing identifiers but potentially reversible with additional information
Masking = hiding part of data for display/use
Tokenization = replacing value with token, often with vault
```

---

### 7.6 Degaussing

規則：

```text
Degaussing = strong magnetic field used to scramble magnetic media
Works on magnetic disks/tapes
Not suitable for SSD in the same way
Cloud customer usually cannot rely on direct degaussing
```

---

## 8. P1 Weakness：D3 / D5 Networking, BC/DR, Risk Metrics

---

### 8.1 VLAN

錯題線索：

- logical grouping of devices
- traffic contained
- high speed

規則：

```text
VLAN = logical segmentation of devices at Layer 2
Contains broadcast domains / traffic segmentation
```

---

### 8.2 SDN Control Plane

規則：

```text
SDN separates control plane and data plane
Control plane defines logical networking independent of physical topology
```

---

### 8.3 RPO

規則：

```text
RPO = maximum tolerable data loss measured in time
RTO = maximum tolerable recovery time
MTD/MTPD = maximum tolerable downtime before severe impact
```

---

### 8.4 ALE

規則：

```text
ALE = Annualized Loss Expectancy
ALE = SLE × ARO
Expected annual loss from a specific risk/scenario
```

---

### 8.5 Qualitative Risk Assessment

規則：

```text
Qualitative risk = categories / ratings / high-medium-low / subjective assessment
Quantitative risk = numbers / currency / probability / ALE
```

---

## 9. P2 Weakness：D6 Legal / Compliance / Standards

D6 本次 86%，是強項，但仍有名詞型錯題，需要避免低級失分。

---

### 9.1 FedRAMP

錯題線索：

- Which entities are required to use FedRAMP-accredited CSPs except?

規則：

```text
FedRAMP = U.S. federal cloud authorization program
Federal agencies/entities use FedRAMP-authorized cloud services
Private companies are not required by FedRAMP by default
```

---

### 9.2 NIST 800-53

規則：

```text
NIST SP 800-53 = Security and Privacy Controls for Information Systems and Organizations
```

---

### 9.3 Auditability

規則：

```text
Auditability = state of readiness for auditing
Not the same as being regulated
Not the same as AICPA SOC report itself
```

---

### 9.4 HIPAA

規則：

```text
HIPAA = U.S. healthcare privacy/security law
Covers electronic healthcare transactions, national identifiers, covered entities, providers, health plans, employers
```

---

### 9.5 Common Criteria

規則：

```text
Common Criteria = ISO/IEC 15408-based framework for IT product security evaluation
CC concepts include TOE, Protection Profile, Security Target, EAL
```

---

## 10. Reading Pattern Weakness

本次錯題仍可看到三種答題陷阱：

### 10.1 看見熟字就選

例如：

- SAST / DAST
- Session / Application layer
- Hybrid / private cloud
- PKI / ECC / SSL

修正：

```text
先判斷題目問的是：
definition?
function?
layer?
responsibility?
risk metric?
best answer?
```

---

### 10.2 沒有先分類

建議每題先用 3 秒分類：

```text
This is asking about:
1. cloud model?
2. app security?
3. data protection?
4. facility/infrastructure?
5. risk/compliance?
6. legal/report/standard?
```

---

### 10.3 作答仍偏快

PT2 平均 41 秒，已比 PT1 的 28 秒好很多。  
但正式考情境題建議目標：

| 題型 | 建議時間 |
|---|---:|
| 定義題 | 30–45s |
| 情境題 | 60–90s |
| best / primary / except 題 | 75–120s |
| 不確定題 | 標記後前進 |

---

## 11. Next 3-Day Plan

### Day 1：D4 Application Security

| 任務 | 量 |
|---|---:|
| DAST / SAST / IAST / RASP 對照 | 20 min |
| API Gateway / Layer 7 | 10 min |
| OWASP / secure SDLC | 20 min |
| D4 targeted drill | 25 題 |
| Gate | ≥75% |

---

### Day 2：D2 + D3 維持

| 任務 | 量 |
|---|---:|
| D2 crypto / storage / anonymization | 25 min |
| D3 RPO/RTO/ALE/VLAN/SDN | 25 min |
| D2/D3 mixed drill | 30 題 |
| Gate | ≥75–80% |

---

### Day 3：Mixed Weak Review

| 任務 | 量 |
|---|---:|
| D4 targeted | 15 題 |
| D1/D2/D3 mixed | 20 題 |
| D6 standards refresh | 10 min |
| Mixed weak test | 40 題 |
| Gate | ≥78% |

---

## 12. Practice Test 3 Readiness

### 可以做 PT3 的條件

建議滿足以下條件後做 Practice Test 3：

| Gate | 目標 |
|---|---:|
| D4 targeted drill | ≥75% |
| D2/D3 mixed drill | ≥75% |
| D4 錯題不再集中於 DAST/SAST/API/OWASP | Yes |
| 平均作答時間 | 45–75s |
| 心態 | 不追速度，追 best answer |

如果沒有時間補三天，至少補 D4 一天後再做 PT3。

---

## 13. Final Judgment

Practice Test 2 是明確進步：

```text
Practice Test 1: 65%
Practice Test 2: 77%
```

D3 / D6 的前期補強有效，D2 也在 full mock 中回穩。  
目前最大風險已轉移到 D4 application security，以及少數 D1/D2/D3/D6 名詞定義題。

最有效策略：

```text
1. 補 D4
2. 維持 D2/D3
3. 用 mixed weak test 驗證
4. 再進 Practice Test 3
```

如果 Practice Test 3 能穩在 78–80% 以上，考試準備會進入相對安全區。


---
# CCSP D4 (Cloud Application Security) 衝刺特訓講義 - Day 1

> **Date:** 2026-06-01
> **Target:** 擊破 D4 應用程式安全魔王，目標滿血通關 (PT3 ≥ 78%)
> **Focus:** 軟體安全測試、API Gateway vs Firewall、Secure SDLC 威脅建模、OWASP 與雲端旁道攻擊

---

## 👾 主題一：軟體測試的「四大神獸」 (SAST, DAST, IAST, RASP)

### 1. 核心定義與適用時機
* **SAST (靜態應用程式安全測試):** * **白箱 (White-box)**。
  * 程式「未執行」，直接掃描 **原始碼 (Source Code)**。
  * 抓取語法錯誤、Hardcode 密碼、未過濾的變數。
* **DAST (動態應用程式安全測試):** * **黑箱 (Black-box)**。
  * 程式「運行中 (Running)」，從外部狂打 **Payload / 模擬攻擊**。
  * 觀察系統崩潰、錯誤訊息外洩、發現執行路徑 (Execution paths)。
* **IAST (互動式安全測試):** * **灰箱 (Gray-box)**。
  * 程式「運行中」，但在應用程式內部植入探測器 (Instrumentation)，能精準定位漏洞對應的程式碼行數。
* **RASP (執行期自我防護):** * 部署於正式環境 (Production)。
  * 程式「運行中」，具備自我監控與主動阻擋惡意連線的能力。

### 💡 考場超強防呆機制：兩步靈魂拷問法
遇到測試分類題，立刻問自己兩個問題：
1. **「程式跑起來了嗎？」** (未執行 ➡️ SAST；執行中 ➡️ DAST/IAST/RASP)
2. **「看得到原始碼嗎？」** (看得到 ➡️ SAST/白箱；看不到 ➡️ DAST/黑箱)

---

## 🛡️ 主題二：應用程式的「守門員」 (API Gateway vs. Firewall)

### 1. 階層與能力差異
* **Firewall (防火牆):** * 運作於 **OSI Layer 3/4 (網路層/傳輸層)**。
  * 只能看懂 IP 位址與 Port 號。負責大範圍的 IP 網段阻擋 (Block IP ranges)。
* **API Gateway / WAF:** * 運作於 **OSI Layer 7 (應用層)**。
  * 能看懂 HTTP 協定與 JSON/XML 內容。
  * **專屬技能:** 流量限制 (Rate Limiting)、檢查 JWT Token、API 路由解析、防禦應用層攻擊。

### 2. 業界黃金標準 (Zero Trust 縱深防禦)
* 邊緣防禦：**WAF** 攔截 L7 惡意特徵。
* 基礎網路防禦：**Local Firewall** 進行 L3/L4 阻擋。
* 應用服務入口：**API Gateway (如 Nginx)** 處理路由、負載平衡與 TLS 卸載。
* 內部微服務防護：**Service Mesh** 負責東西向流量的加密與動態控制。

---

## 🧬 主題三：把安全融入基因 (Secure SDLC & Threat Modeling)

### 1. 安全左移 (Shift Left)
* 安全不能留到最後才做。在 CI/CD 與開發流程的最前端，就必須導入安全規範。

### 2. 威脅建模 (Threat Modeling)
* **黃金時機:** 發生在 **「設計階段 (Design Phase)」** (寫第一行程式碼之前)。
* **核心目的:** 對著架構圖分析資料流 (Data Flow)，找出系統架構層級的潛在漏洞（如 Spoofing 偽冒、Tampering 竄改）。
* **考試對照:** 只要題目說「對著架構圖分析、提前規劃防禦機制」，答案就是 Threat Modeling；如果是對著程式碼找，那是 SAST。

---

## 🏢 主題四：雲端獨有風險與權威指南 (Cloud Risks & OWASP)

### 1. OWASP Top 10 (武林秘笈)
* **定位:** 業界最權威的 **Web 應用程式安全最佳實務指南 (Best practice catalog)**。
* **注意:** 它是指南與框架，**不是**一套可以直接拿來掃描的單一工具軟體。

### 2. 旁道攻擊 (Side-channel Attacks)
* **發動條件:** 雲端公有雲的 **「多租戶與共享資源 (Multi-tenancy / Co-tenancy / Shared resources)」** 環境。
* **攻擊手法:** 駭客在同一個實體主機的另一個 VM 中，透過監控 CPU 快取 (Cache) 延遲、耗電量等「物理側信道」，反推並竊取其他租戶的加密金鑰。
* **防禦關鍵:** 強制實體硬體隔離 (Dedicated Hosts / HSM)。