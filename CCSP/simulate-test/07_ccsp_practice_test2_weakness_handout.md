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
