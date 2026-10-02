# CCSP 模擬測驗講義：2026-10-02 D5 錯題考前講義版

> **講義編號：** 12
> **講義類型：** 錯題概念釐清（考前講義版），含兩個特別標記的爭點
> **日期：** 2026-10-02
> **原檔標示 Domain：** Domain 5
> **實際涵蓋：** D5 為主，另涉 D2（備份機密性、密碼學）與 D3（虛擬化管理平面、機房設施、網路封裝）
> **⭐ 爭點：** §3 Audit 是不是 hardening 本身、§5 Physical Access Control 與 Personnel Control 的分類邊界

## 本檔內容在彙整講義中的落點

| 本檔章節 | 主題 | 彙整講義落點 | 狀態 |
|---|---|---|:-:|
| §1 | Virtualization Management Plane（VMware Tools ≠ management plane） | [D3 §1.4](../domain3-infrastructure/01-consolidated-lecture.md) | 新增 |
| §2 | Host Hardening 動作清單 | [D5 §1.2](../domain5-operations/01-consolidated-lecture.md) | 增補 |
| §3 ⭐ | **Audit ≠ Hardening** | D5 §1.2 | 新增 |
| §4 | Personnel Controls 清單 | [D5 §1.6](../domain5-operations/01-consolidated-lecture.md) | 增補 |
| §5 ⭐ | **Physical Access Control ≠ Personnel Control** | D5 §1.6（physical 清單見 [D3 §1.2](../domain3-infrastructure/01-consolidated-lecture.md)） | 新增 |
| §6 | Patch 不解決 interoperability | [D5 §1.3](../domain5-operations/01-consolidated-lecture.md) | 新增 |
| §7 | Vendor advises; organization decides | D5 §1.3 | **復現**（by-test/10） |
| §8 | Maintenance Mode／Live Migration ≠ snapshot | D3 §1.4、D5 §1.4 | 增補 |
| §9 | GRE vs IPsec | [D3 §1.3](../domain3-infrastructure/01-consolidated-lecture.md) | **復現**（by-test/10） |
| §10 | Secure KVM | D3 §1.4 | **復現**（by-test/10） |
| §11 | Raised Floor 用途與承重 | [D3 §1.1](../domain3-infrastructure/01-consolidated-lecture.md) | 增補 |
| §12 | Symmetric／DH／OOB | [D2 §1.7](../domain2-data-security/01-consolidated-lecture.md) | **復現**（by-test/10） |
| §13 | Encryption vs Mirroring（備份情境） | [D2 §1.8](../domain2-data-security/01-consolidated-lecture.md) | 新增 |
| §14 | 今日最值得記的 10 句 | 分散至各域 §3 | — |
| 附錄 | 錯題 argue 流程的有效性 | [README 維護規則](../README.md) | 方法論 |

> **原檔的「閃卡」區段**為對話工具的互動元件佔位，不含實際卡片內容，正式化時移除。本次閃卡改由本檔內容自行產出並併入 `flash card/knowt-d{2,3,5}-*.tsv`。

---

## 1. Virtualization Management Plane

### 核心

Virtualization management toolset 指的是：

- ESXi management interface
- vCenter
- Hypervisor management API
- orchestration／admin plane

**不是 VMware Tools。**

```text
VMware Tools
→ 裝在 Guest OS
→ drivers / time sync / graceful shutdown / guest integration

Management Plane
→ 管 Hypervisor / VM / Host
→ vCenter / ESXi mgmt / APIs
```

### 安全原則

Management plane 應：

- 與 workload network 分離
- 避免 public-facing
- 透過 dedicated management VLAN／subnet／VRF／admin zone
- 僅允許管理員與管理工具存取
- MFA／bastion／logging

### 考試版

> **Management plane should be isolated／segmented from production and public networks.**

不要死背「一定只能用 VLAN」。

---

## 2. Host Hardening

Hardening 的目的：**降低 attack surface，直接改變系統安全狀態。**

典型動作：

- 移除不必要軟體
- 關閉不必要 service／ports
- patch／update
- secure configuration
- least privilege
- host firewall
- HIDS／endpoint protection
- disable weak protocols
- secure logging configuration

---

## 3. ⭐ 爭點：Audit 是不是 Hardening 本身？

> ## **不是。**
>
> **Audit = assessment／verification**
>
> **Hardening = implementation／remediation**

反駁論點：

> 不 Audit，怎麼知道 baseline／policy／control 哪裡有缺口？

這個在 **workflow** 上是對的。完整流程：

```text
Baseline / Policy
      ↓
Hardening
      ↓
Audit / Assessment
      ↓
Find drift / gaps
      ↓
Remediation
      ↓
Re-audit
```

所以 **audit 可以驅動下一輪 hardening，甚至是 hardening loop 的重要 feedback mechanism**。

但 taxonomy 上：

```text
Audit     → 找問題 / 驗證
Hardening → 改系統 / 修問題
```

### 工程類比

```text
Unit test ≠ Feature implementation
Test discovers defect → developer modifies code
```

同樣：

```text
Audit discovers:  SSH root login enabled
Hardening:        disable root SSH
```

### 考試判斷（動詞判斷法）

| 題幹動詞 | 分類 |
|---|---|
| `check`、`verify`、`assess`、`review` | **Audit／Assessment** |
| `disable`、`remove`、`configure`、`restrict`、`patch` | **Hardening** |

---

## 4. Personnel Controls

Personnel controls 主要治理：**人的可信度、行為與 employment lifecycle。**

- Background checks
- Reference checks
- Security awareness／training
- Job rotation
- Separation of duties
- Termination procedures
- Exit process

---

## 5. ⭐ 爭點：Physical Access Control 不包含 Personnel Control？

更精確的說法是：

> ## **Physical Access Controls 會作用在人身上，但 taxonomy 上不等於 Personnel Controls。**

### Personnel Control

```text
Background check
Security training
Reference check
Termination procedure
```

控制的是：**人員風險／trust／lifecycle**

### Physical Access Control

```text
Mantrap
Turnstile
Badge reader
Door lock
Security guard
```

控制的是：**人能不能進入特定實體區域**

所以：

```text
Mantrap
→ controls people
→ but category = Physical Access Control
```

不是 Personnel Control。

### 最短記法

> **Personnel = govern the person**
>
> **Physical Access = govern entry／movement**

反駁論點：

> Mantrap／turnstile 比 training 更有用吧？

這是在比較 **effectiveness**，但題目是在考 **classification**。**這兩個維度要分開。**

---

## 6. Patch Management

Patch 主要可以：修 vulnerability、修 bug、改善 performance，有時帶入功能／compatibility fix。

但 generic cloud interoperability 通常是 **architecture／standards／APIs／formats** 的問題。

```text
Patch           → software defect / vulnerability / performance
Interoperability → architecture / API / format / standard
```

---

## 7. Vendor Advice vs Organizational Decision

> **復現主題**（by-test/10 上篇 D）：本次再度出現，屬高頻考點。

題目：誰的 advice 對 production patch 應給最多權重？**答案：Vendor。**

因為 vendor 最了解 prerequisites、compatibility、known issues、rollback、reboot、supported version。

但 **Vendor ≠ final decision maker**：

```text
Vendor                → technical advice
Security              → vulnerability/risk
Compliance            → policy / regulatory deadline
Change Management     → approval
Business/System Owner → operational risk
```

> **Vendor advises; organization decides.**

---

## 8. Maintenance Mode / Live Migration

Host 要進 maintenance：

```text
Host A
  └─ VM running
       ↓ live migration
Host B
  └─ VM continues running
```

所以要 **move VM as a live instance**，不是存 snapshot image。

| 機制 | 用途 |
|---|---|
| **Snapshot** | point-in-time state／rollback／reference |
| **Live Migration** | 把正在執行的 VM 搬到另一台 host |

---

## 9. GRE vs IPsec

> **復現主題**（by-test/10 上篇 C）：recurring terminology，已連續出現。

```text
GRE   → tunneling / encapsulation
IPsec → secure IP communication
```

IPsec 也有 tunnel mode，但題目問 `most associated with tunneling` 時通常答 **GRE**。

> **GRE tunnels; IPsec protects.**

---

## 10. Secure KVM

> **復現主題**（by-test/10 上篇 A）。

核心：防止不同 security domains 間透過 keyboard／video／mouse 發生 cross-domain leakage。

應具備：isolated channels、explicit physical selection、clear selected-port indication、anti-tamper、buffer clearing、reject unauthorized peripherals。

不應具備：**Keystroke logging**。

---

## 11. Raised Floor

傳統 raised floor 的兩個主要用途：

### 1. Cold-air distribution

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

### 2. Infrastructure routing

下面可跑：power、network cable、fiber、piping。

所以題目問 `Raised floor serves what purposes?` 時答 **cold air feed ＋ place to run wires／cables**。

**不是 `increases structural soundness`**——raised floor 自己反而需要被設計成能承受 racks 的重量。

---

## 12. Symmetric Encryption / DH / OOB

> **復現主題**（by-test/10 上篇 B）。

- **Symmetric crypto** 需要 securely shared secret keying material。
- **Diffie-Hellman** 是 **key agreement**：雙方共同算出 shared secret，最終 secret 不直接傳送。
- **OOB** 是 **key distribution／provisioning**：secret 本身透過另一可信 channel 傳送或預先灌入。

```text
DH  → agree on secret
OOB → distribute secret
```

---

## 13. E-commerce Backup：Encryption vs Mirroring

題幹出現 `e-commerce + backup/archive` 時的推理鏈：

```text
Payment-card data
→ Stored backup
→ Data at rest
→ Confidentiality
→ Encryption
```

而 Mirroring 回答的是 **Availability／aggressive RPO**。

```text
Need recoverable protected backup?        → Encryption
Need near-zero RPO / continuous replication? → Mirroring
```

---

## 14. 今日最值得記的 10 句

1. **Hardening changes the system; Audit checks the system.**
2. **Audit may drive hardening, but it is not hardening itself.**
3. **Personnel controls govern people; physical access controls govern entry/movement.**
4. **Management plane should be isolated from workload/public networks.**
5. **VMware Tools ≠ virtualization management plane.**
6. **Live migration moves a running VM; snapshot does not.**
7. **GRE tunnels; IPsec protects.**
8. **Vendor advises; organization decides.**
9. **DH agrees on a secret; OOB distributes a secret.**
10. **Raised floor = cooling plenum + cabling/infrastructure space.**

---

# 附錄：錯題 argue 流程的有效性

> **方法論落點：** 精簡版已併入 [README 維護規則](../README.md) 的「錯題複習與 argue 流程」一節。

對已具工程實務背景的學習者，以 argue 方式處理錯題的效果會比單純背答案好。此做法涵蓋三種有效學習行為。

## 1. Elaborative interrogation

問的不是「正解是什麼」，而是：

> **為什麼這個答案成立？反例為什麼不成立？**

這會迫使學習者建立 causal model，而不是只記 A／B／C／D。

## 2. Error correction

例如針對「VMware Tools 的管理網路」提出「實務上未見 isolated network」的反駁，辯論後釐清：

> VMware Tools 與 virtualization management plane 根本不是同一個東西。

這種被修正過的錯誤，通常比直接看答案更牢。

## 3. Boundary learning

多數錯題並非完全不知道，而是邊界模糊：

```text
Audit vs Hardening
Personnel vs Physical Access
DLP vs IRM
Metadata vs Content
GRE vs IPsec
DH vs OOB
```

Argue 最適合修這種 boundary problem。

## 要避免的陷阱

不要變成「每一題都努力證明題庫錯」。因為有些題只是：

> **作答時用的是 workflow／實務邏輯，而題目在考 taxonomy。**

建議的固定流程：

```text
1. 為何不同意？
2. 這個 argument 是技術上成立，還是只是 edge case？
3. 題目在考：
   - terminology？
   - taxonomy？
   - responsibility？
   - technical mechanism？
4. 題庫答案是否仍有 ambiguity？
5. 最後寫一句 corrected mental model
```

本次範例：

> Mantrap 明明控制人員
> → 技術上成立
> → 但題目考 taxonomy
> → Physical Access ≠ Personnel
> → corrected model：**作用對象相同，不代表 control category 相同。**

這套流程對 CCSP 特別有效，因為 CCSP 很多題目的難點正是**「兩個答案都技術上合理，但考試在問哪個層級／角色／分類」**。
