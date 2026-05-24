# CCSP Practice Test 1 弱點分析 / Weighted Weakness Analysis & Priority Strategy

> 測驗來源：`isc2.learnzapp.com/practicetest` Practice Test 1  
> 測驗型態：全局 Practice Test，非只打弱點的 Custom Test  
> 題數：129 題  
> 成績：65%  
> Correct / Incorrect：85 / 44  
> 平均作答時間：28 秒 / 題  
> Readiness：42% → 46%

---

## 1. 本次測驗結論

這次 Practice Test 1 比前兩次 Custom Test 更有參考價值，因為它涵蓋六個 domain，而不是只集中打 D1 / D2 / D6。

### 核心結論

目前狀態不是「沒有進步」，而是：

1. **D2 明顯補起來**
2. **D6 從極弱回升到可補強區**
3. **D4 仍穩**
4. **D3 / D5 被全局模考重新暴露為新弱點**
5. **D1 還是邊界題與 cloud model 題不夠穩**

也就是說，準備狀態從「D1/D2/D6 特定弱點」變成「需要依照 domain 權重做加權補強」。

---

## 2. Practice Test 1 Domain-wise Performance

| Domain | 題數 | Correct | Score | 判斷 |
|---|---:|---:|---:|---|
| D1 Cloud Concepts, Architecture and Design | 28 | 17 | 61% | 邊界不穩，需要補 |
| D2 Cloud Data Security | 17 | 14 | 82% | 明顯進步，維持即可 |
| D3 Cloud Platform & Infrastructure Security | 24 | 13 | 54% | 本次最大新弱點 |
| D4 Cloud Application Security | 14 | 12 | 86% | 穩定 |
| D5 Cloud Security Operations | 25 | 15 | 60% | 明顯需要補 |
| D6 Legal, Risk and Compliance | 21 | 14 | 67% | 有進步，但仍需補 |

---

## 3. 是否有進步？

### 與 Assessment Test 對比

| Domain | Assessment Test | Practice Test 1 | 變化 |
|---|---:|---:|---|
| D1 | 60% | 61% | 持平，小幅改善 |
| D2 | 50% | 82% | 明顯進步 |
| D3 | 75% | 54% | 下降，樣本變大後暴露弱點 |
| D4 | 100% | 86% | 仍穩 |
| D5 | 100% | 60% | 下降，樣本變大後暴露弱點 |
| D6 | 50% | 67% | 明顯進步 |

### 與 Custom Test 2 對比

| Domain | Custom Test 2 | Practice Test 1 | 變化 |
|---|---:|---:|---|
| D1 | 56% | 61% | 小幅改善 |
| D2 | 63% | 82% | 明顯進步 |
| D6 | 23% | 67% | 大幅改善 |
| Overall | 50% | 65% | 明顯改善 |

### 進步判斷

有進步，尤其是：

- **D2：50% / 54% / 63% → 82%**
- **D6：23% → 67%**
- **Overall：50% → 65%**

但目前還不能說穩，因為：

- D3 只有 54%
- D5 只有 60%
- D1 仍只有 61%
- Practice Test 1 總分 65%，還沒到穩定安全區

---

## 4. 根據 CCSP 官方權重的補強優先順序

CCSP 官方 exam weight：

| Domain | Weight |
|---|---:|
| D1 Cloud Concepts, Architecture and Design | 17% |
| D2 Cloud Data Security | 20% |
| D3 Cloud Platform & Infrastructure Security | 17% |
| D4 Cloud Application Security | 17% |
| D5 Cloud Security Operations | 16% |
| D6 Legal, Risk and Compliance | 13% |

以 80% 作為安全練習目標，使用以下風險指標：

```text
Priority Risk = Domain Weight × max(0, 80% - Current Score)
```

| Priority | Domain | Score | Weight | Gap to 80% | Weighted Risk | 結論 |
|---|---|---:|---:|---:|---:|---|
| P0 | D3 | 54% | 17% | 26% | 4.42 | 第一優先 |
| P1 | D1 | 61% | 17% | 19% | 3.23 | 第二優先 |
| P1 | D5 | 60% | 16% | 20% | 3.20 | 第二優先 |
| P2 | D6 | 67% | 13% | 13% | 1.69 | 第三優先 |
| Maintain | D2 | 82% | 20% | 0% | 0 | 高權重，但目前已過線 |
| Maintain | D4 | 86% | 17% | 0% | 0 | 維持即可 |

### 補強順序

```text
P0: D3
P1: D1 + D5
P2: D6
維持: D2 + D4
```

---

# 5. Domain 1 弱點分析：Cloud Concepts, Architecture and Design

## 本次成績

- 17 / 28
- 61%

## 錯題主題

### 5.1 Service model 判斷仍不夠自動化

錯題包含：

- PaaS 是 application testing / development environment 的最佳 fit
- IaaS 是 customer 對 data / systems 控制最多的 service model
- SaaS 是 customer 維護、管理、support 最少的 service model

### 秒殺規則

```text
SaaS = CSP 管最多，customer 管最少
PaaS = 適合開發、測試、部署 application
IaaS = customer 對 OS / data / app / system control 最多
```

---

### 5.2 Vendor lock-out / migration risk / cost-benefit

錯題包含：

- provider out of business 導致 customer 無法取回資料 = vendor lock-out
- migration 後 risk review 不需要完全重做，因為 cost-benefit phase 已經分析大量風險

### 秒殺規則

```text
Vendor lock-in = 難以移出或替換 provider
Vendor lock-out = provider failure / bankruptcy 導致 customer 失去資料存取
Cost-benefit phase = migration 前大量風險與成本已被分析
```

---

### 5.3 Cloud 基礎特性與虛擬化

錯題包含：

- oversubscription = 連上系統的 user 超過完全可支援容量
- virtualization 提升 cloud service viability

### 秒殺規則

```text
Oversubscription = committed demand > actual safely supportable capacity
Virtualization = cloud scalability / resource abstraction / multi-tenancy 的核心促成技術
```

---

### D1 補強方法

#### 30 分鐘概念補強

建立三張小表：

1. SaaS / PaaS / IaaS 責任邊界
2. public / private / hybrid / community / multicloud
3. lock-in / lock-out / portability / interoperability / reversibility

#### 20 題 D1 drill

目標：

- ≥75%
- 若低於 70%，隔天不要做模考，繼續補 D1

---

# 6. Domain 2 弱點分析：Cloud Data Security

## 本次成績

- 14 / 17
- 82%

## 判斷

D2 是本次最大的進步區，不需要再大量刷，但仍需維持。

## 錯題主題

### 6.1 Data masking 不等於 encryption

錯題：哪個不是 cloud computing 中 encryption 的例子？  
正確概念：data masking 不是 encryption。

```text
Encryption = reversible with key
Masking = substitute / hide values
Tokenization = replace with token and map through token vault
FPE = encryption but preserves format
```

---

### 6.2 Tokenization 需要 token mapping / token database

錯題：tokenization proper operation 需要什麼？  
正確概念：需要原始資料與 token mapping 的資料庫 / token vault。

```text
Tokenization = original sensitive value stored separately; token maps back through vault
```

---

### 6.3 IP protection

錯題：manufacturing process 的 intellectual property 用什麼保護？  
正確概念：process / invention 通常是 patent。

```text
Patent = invention / process
Copyright = creative expression
Trademark = brand identifier
Trade secret = confidential business information
```

---

### D2 維持方法

每週：

- 15 題 D2 mixed drill
- 重點看錯題，而不是追新題量

---

# 7. Domain 3 弱點分析：Cloud Platform & Infrastructure Security

## 本次成績

- 13 / 24
- 54%

## 判斷

這是本次最重要的新弱點。先前 D3 在小樣本裡看起來還可以，但 Practice Test 1 用 24 題打出比較可靠的訊號：D3 需要重新補。

---

## 7.1 Business requirements / BIA / control driver

錯題包含：

- gathering business requirements 不會直接決定 robustness
- cloud security controls primarily driven by business needs，不是 state laws、best practices
- local disaster 情境下，sister facility joint operating agreement 有用

### 秒殺規則

```text
Business requirements drive security controls.
Regulations / laws / best practices shape requirements, but are not always the primary driver.
BIA / requirements focus on business impact, assets, availability, criticality, dependencies.
Robustness is not usually directly determined by requirements gathering.
```

---

## 7.2 External threat / connectivity resilience

錯題包含：

- redundant ISPs / carriers 可減少 DDoS、fiber cut 等 external threat impact
- local communications interruption 可透過 sister facility / joint operating agreement 互助

### 秒殺規則

```text
External connectivity threat = redundant carriers / ISPs / diverse paths
Local disaster = sister facility / alternate site / reciprocal or joint operating agreement
```

---

## 7.3 BC/DR execution discipline

錯題包含：

- BC/DR incident 中最重要的是按 plan / checklist 執行
- 不是臨場 improvisation

### 秒殺規則

```text
BC/DR event = execute documented plan
Checklist = prevents improvisation and missed steps
```

---

## 7.4 Risk treatment

錯題包含：

- risk cannot be reversed
- risk can be mitigated, transferred, accepted, avoided

### 秒殺規則

```text
Risk treatment = avoid / mitigate / transfer / accept
Risk cannot be reversed
```

---

## 7.5 Data center facility facts

錯題包含：

- UPS 不只供電，也做 line conditioning
- transfer switch 要在 UPS/battery 撐不住前快速切到 generator
- LP gas 不像 gasoline / diesel 那樣容易 spoil
- Uptime Institute tier：1 最低，4 最高
- ASHRAE humidity standard 可降低 static discharge
- generator fuel reserve 至少 12 hours

### 秒殺規則表

| 主題 | 規則 |
|---|---|
| UPS | power backup + line conditioning |
| Transfer switch | utility power failure 後快速切到 generator |
| Generator fuel | 至少可支撐 12 hours |
| LP gas | 長期儲存較穩，不像 gasoline/diesel 容易 spoil |
| Uptime Tier | Tier 1 最低；Tier 4 最高 |
| ASHRAE humidity | 降低 static discharge 風險 |
| Redundant carriers | 抵抗 fiber cut / DDoS / external connectivity issue |

---

## D3 補強方法

### 2 天 patch

Day 1：

- Data center resilience facts：30 分鐘
- D3 drill：25 題

Day 2：

- BC/DR + risk treatment：30 分鐘
- D3 drill：25 題

Gate：

```text
D3 mini-test ≥75%
若低於 70%，不要開下一回 full practice test
```

---

# 8. Domain 4 弱點分析：Cloud Application Security

## 本次成績

- 12 / 14
- 86%

## 判斷

D4 表現穩。只需要維持，不需要主攻。

## 錯題主題

### 8.1 Authentication / authorization exchange

錯題包含：

- SAML = standard for exchanging authentication and authorization data between security domains

### 秒殺規則

```text
SAML = federated authentication / authorization assertions between security domains
OAuth = delegated authorization
OIDC = identity layer on top of OAuth 2.0
```

### 8.2 Eligibility / identity verification wording

題目問：identifying or verifying eligibility of station/originator/individual to access information。

建議用以下判斷：

```text
Authentication = verify identity
Authorization = determine allowed access
Non-repudiation = cannot deny action
```

---

# 9. Domain 5 弱點分析：Cloud Security Operations

## 本次成績

- 15 / 25
- 60%

## 判斷

D5 是第二大弱點之一，且和 D3 有大量交疊：data center operations、baseline、patching、maintenance、redundancy、KVM、facility standards。

---

## 9.1 Egress monitoring / classification

錯題包含：

- egress monitoring tools closely associated with data classification
- classification normally occurs at data creation

```text
Egress monitoring depends on classification/labeling to know what data should not leave.
Classification starts at Create phase.
```

---

## 9.2 Hardening vs redundancy

錯題包含：

- redundant power supply is redundancy, not hardening

```text
Hardening = reduce attack surface / secure config / disable unnecessary services / patch / baseline
Redundancy = availability / fault tolerance
```

---

## 9.3 Baseline deviation handling

錯題包含：

- baseline deviation should be investigated and documented
- valid deviation may lead to baseline review/change

```text
Deviation from baseline = investigate + document
Valid recurring deviation = update baseline through change process
```

---

## 9.4 Data center standards and operations

錯題包含：

- Uptime Institute tier lowest/highest
- ASHRAE humidity reduces static discharge
- generator fuel 12 hours
- maintenance mode actions
- secure KVM features
- patch live production system：vendor guidance weight highest

### 秒殺規則表

| 主題 | 規則 |
|---|---|
| Uptime tiers | 1 lowest, 4 highest |
| ASHRAE humidity | reduce static discharge |
| Generator fuel | at least 12 hours |
| Maintenance mode | remove active production instances + prevent new logins + continue logging |
| Secure KVM | port isolation, tamper resistance, secure switching, no data leakage |
| TPM | machine-level secure key storage, not a secure KVM feature |
| Live production patch | vendor guidance carries high weight |
| Baseline deviation | investigate + document |

---

## D5 補強方法

### 2 天 patch

Day 1：

- Hardening / baseline / patching：30 分鐘
- D5 drill：20 題

Day 2：

- Facility operation facts：30 分鐘
- D5 drill：20 題

Gate：

```text
D5 mini-test ≥75%
```

---

# 10. Domain 6 弱點分析：Legal, Risk and Compliance

## 本次成績

- 14 / 21
- 67%

## 判斷

D6 比前幾次明顯進步，但仍低於 75–80% 安全區。

---

## 10.1 Contract as trust mechanism

錯題包含：

- most important mechanism to ensure trust in provider performance and duties = contract

```text
Trust in provider obligations = contract
Technical controls support assurance, but legal responsibility is anchored in contract.
```

---

## 10.2 CSA STAR / SOC / audit artifacts

錯題包含：

- SOC 2 Type 3 不是實際 report format
- CSA STAR levels 包含 self-assessment、third-party certification、continuous monitoring 等

```text
SOC 1 / SOC 2 / SOC 3 = valid SOC report categories
SOC 2 Type 3 = not a thing
SOC 3 = public report
CSA STAR = cloud provider assurance registry/certification program
```

---

## 10.3 Data processor / controller responsibility

錯題包含：

- data processor in cloud = cloud provider
- ultimate legal responsibility for cloud disclosure/loss = cloud customer / data owner

```text
Cloud provider often acts as data processor
Cloud customer/data owner/controller remains ultimately legally responsible
Outsourcing does not transfer accountability completely
```

---

## 10.4 eDiscovery / forensic phase

錯題包含：

- evidence collection phase = eDiscovery

```text
eDiscovery = identify / preserve / collect / process / review / produce electronic evidence
```

---

## 10.5 Privacy law / jurisdiction

錯題包含：

- U.S. lacks a comprehensive federal privacy law protecting all citizens' personal data

```text
U.S. privacy law = sectoral model, not one comprehensive federal privacy law
GDPR = broad EU privacy regulation
```

---

## 10.6 Cloud actors

錯題包含：

- cloud carrier provides connectivity and transport between cloud providers and cloud customers

```text
Cloud provider = provides cloud service
Cloud consumer/customer = uses cloud service
Cloud broker = intermediary / aggregation / integration
Cloud reseller = buys and resells service
Cloud carrier = connectivity / transport
Cloud auditor = independent assessment
```

---

# 11. 下一階段補強計畫

## 7 天版本

### Day 1：D3 Facility / BC/DR patch

- D3 concept review：30–40 分鐘
- D3 drill：25 題
- 整理 10 條 data center facts

### Day 2：D3 Risk / requirements patch

- Business requirements / BIA / risk treatment：30 分鐘
- D3 drill：25 題
- 目標：D3 ≥75%

### Day 3：D5 Ops patch

- Hardening / baseline / patching / maintenance mode：30 分鐘
- D5 drill：20–25 題
- 目標：D5 ≥75%

### Day 4：D5 Facility standards patch

- Uptime / ASHRAE / fuel / KVM / generator / UPS：30 分鐘
- D5 drill：20–25 題
- 目標：D5 ≥75%

### Day 5：D1 patch

- SaaS/PaaS/IaaS、lock-in/out、oversubscription、virtualization：30 分鐘
- D1 drill：20 題
- 目標：D1 ≥75%

### Day 6：D6 patch

- contract / CSA STAR / SOC / processor-controller / eDiscovery / carrier：40 分鐘
- D6 drill：20 題
- 目標：D6 ≥75%

### Day 7：Mixed weak-domain mini-test

- D1/D3/D5/D6 mixed：40 題
- Gate：≥75%
- 若低於 70%，不要做下一回 full Practice Test

---

# 12. Practice Test 2 前的 Gate

下一回 Practice Test 2 前，建議達到：

| Gate | 目標 |
|---|---:|
| D3 mini-test | ≥75% |
| D5 mini-test | ≥75% |
| D1 mini-test | ≥75% |
| D6 mini-test | ≥75% |
| D1/D3/D5/D6 mixed 40 題 | ≥75% |
| 平均作答時間 | 45–75 秒 / 題 |

目前 28 秒 / 題偏快。建議放慢，尤其是：

- primary / best / most important
- not / except
- customer vs provider
- legal responsibility vs technical control
- business requirement vs best practice

---

# 13. 考前加權策略

由於 CCSP domain weight 並不平均，補強應按照「權重 × 弱點」排序，而不是只看低分。

## 加權後策略

```text
1. D3：54%，weight 17% → 第一優先
2. D1：61%，weight 17% → 第二優先
3. D5：60%，weight 16% → 第二優先
4. D6：67%，weight 13% → 第三優先
5. D2：82%，weight 20% → 高權重，但目前維持即可
6. D4：86%，weight 17% → 維持即可
```

---

# 14. 最終判斷

目前的狀態不是「沒進步」。

真正狀態是：

- D2 明顯補起來
- D6 從極弱變成中等偏弱
- D4 穩
- D1 邊界仍不穩
- D3 / D5 在全局 Practice Test 中被重新暴露為主要弱點
- Overall 65% 還不夠安全，但已經比弱點 Custom Test 的 50% 有明顯改善

## 下一個目標

```text
Practice Test 2 目標：≥72–75%
Practice Test 3 目標：≥75–80%
考前最後兩回：≥80%
```
