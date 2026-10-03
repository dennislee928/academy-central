# CCSP 模擬測驗講義：2026-10-03 D2／D6 錯題講義

> **講義編號：** 13
> **講義類型：** 錯題概念釐清（雙 domain），含兩個特別標記的 ⭐ 重點
> **日期：** 2026-10-03
> **涵蓋 Domain：** **D2 Cloud Data Security**（Part 1）與 **D6 Legal, Risk and Compliance**（Part 2），另涉 D1（quantum computing 屬 related technologies）
> **⭐ 重點：** Part 1 §2 encryption 粒度四選一、Part 1 §3 data masking 九種技術
> **正式化註記：** 原檔含 20 處外部查證標記（`chatgpt-content-reference`）與 2 個空的閃卡 widget 佔位，正式化時移除標記與佔位、保留其所標註的事實陳述；兩段 LaTeX 公式改為 code fence。

## 本檔內容在彙整講義中的落點

| 本檔章節 | 主題 | 彙整講義落點 | 狀態 |
|---|---|---|:-:|
| Part 1 §A、§1 | Cryptographic key protection ＋ vault blast radius | [D2 §1.4](../domain2-data-security/01-consolidated-lecture.md) | 新增 |
| Part 1 §2 ⭐ | Encryption 粒度四選一（file／TDE／application／object-level） | D2 §1.4 | 新增 |
| Part 1 §3 ⭐ | Data masking 九種技術 ＋ `Conflation` 反例 | [D2 §1.5](../domain2-data-security/01-consolidated-lecture.md) | 新增 |
| Part 1 §4、§5 | Bit-splitting／data dispersion、跨 jurisdiction | D2 §1.5 | 擴寫 |
| Part 1 §6 | Object vs Volume vs File storage | [D2 §1.3](../domain2-data-security/01-consolidated-lecture.md) | 增補 |
| Part 1 §7 | AONT-RS | D2 §1.5 | 新增 |
| Part 1 §8 | Quantum computing 關鍵字 | [D1 §1.8](../domain1-cloud-concepts/01-consolidated-lecture.md) | 新增 |
| Part 2 §1 | OECD 八原則逐條深入 | [D6 §1.3](../domain6-legal-compliance/01-consolidated-lecture.md) | 大幅擴寫 |
| Part 2 §2 | D6 備考三層模型、四問法、時間配置 | [D6 §5](../domain6-legal-compliance/01-consolidated-lecture.md) | 方法論 |
| Part 2 §3 A | Due Care／Due Diligence／Liability | [D6 §1.6](../domain6-legal-compliance/01-consolidated-lecture.md) | **調和**（見註） |
| Part 2 §3 B | Hash vs Backup | [D2 §1.7](../domain2-data-security/01-consolidated-lecture.md) | 新增 |
| Part 2 §3 D、E、F | ISO 27001/27002、SOC 2/SSAE/SAS 70、COBIT／RMF／ISO 31000／Hex GBL | [D6 §1.2](../domain6-legal-compliance/01-consolidated-lecture.md) | 新增／擴寫 |
| Part 2 §3 G、H、I | Forensic evidence、comparative negligence、seizure | [D6 §1.5](../domain6-legal-compliance/01-consolidated-lecture.md) | 新增／擴寫 |

> **調和註記：** 既有 D6 §1.6 原寫「due care = 持續合理注意／due diligence = 事前盡職調查」，與本檔的「Due Care = DO／Due Diligence = CHECK」在「diligence 是事前還是持續」上不一致。彙整講義改採合併表述：**Due Diligence = 調查與驗證（事前盡職調查，並持續確認 safeguards 有效）**、**Due Care = 實際採取並維持 reasonable safeguards**。作答時抓 `investigate／verify → diligence`、`implement／maintain → care`。

> **原檔的兩個閃卡區段**為對話工具的互動元件佔位，不含實際卡片內容。本次閃卡改由本檔內容自行產出並併入 `flash card/knowt-d{1,2,6}-*.tsv`。

---

# Part 1 — Domain 2：Cloud Data Security

## A. 題外話：實務上 Key Vault 真的可能比 DB 弱嗎？

**正常、成熟、正確部署的 Key Vault / KMS，通常就應該比一般 DB 的保護強。** 前述例子並非主張「Key Vault 通常比 DB 弱」，而是在說：

> **`放在 vault` 是 implementation choice；`Key 的 protection ≥ Data` 才是 security requirement。**

以 HashiCorp Vault 為準的直覺是對的。正常架構本來就會長這樣：

```text
              Higher-trust boundary
┌─────────────────────────────────────┐
│ HashiCorp Vault / KMS / HSM         │
│                                     │
│ • Strong authentication             │
│ • Fine-grained authorization        │
│ • Audit logging                     │
│ • Key rotation / lifecycle          │
│ • Secret isolation                  │
│ • Limited key export                │
└─────────────────────────────────────┘
                  │
                  │ encrypt/decrypt operation
                  ▼
┌─────────────────────────────────────┐
│ Application / Database              │
│                                     │
│ Ciphertext / encrypted data         │
└─────────────────────────────────────┘
```

實務上真正危險的不是「用了 Vault」，而是 **Vault 被部署成和 DB 相同甚至更大的 blast radius**。例如：

```text
DB compromise
+
同一組 admin credentials 可直接讀 Vault
+
Vault policy = allow secret/*
+
長效 root/admin token
=
Encryption 幾乎失去隔離價值
```

或者：

- Vault Dev Mode 上 production
- root token 到處共用
- application 可以 export 所有 keys
- DB admin 同時也是 Vault admin
- audit logging 未啟用
- unseal/recovery material 管理很差
- Vault 與 DB 完全共用相同 privileged account / trust boundary

這時不是 Vault 技術本身比較弱，而是：

> **key-management control plane 被配置得太弱。**

所以 LearnZapp 那題真正想問的是：

```text
Protection(Key) ≥ Protection(Data)
```

`at least as high` 就是：

> **等於或高於，絕對不是低於。**

而在合理的 production design 中，更理想的是：

```text
Protection(Key) > Protection(Data)
```

尤其是 KEK / root-of-trust / master key。

---


## 1. Cryptographic Key Protection

### 核心原則

> **Cryptographic keys must be protected at least as strongly as the data they can decrypt.**

不是：

> Keys 必須存在某一種特定產品裡。

因此：

```text
Vault / KMS / HSM
= implementation mechanisms

Protection(Key) ≥ Protection(Data)
= security principle
```

### 為什麼？

假設：

```text
Database
→ AES-256 encrypted
→ extremely well protected ciphertext

AES key
→ plaintext config file
→ world-readable
```

那 AES-256 幾乎沒有意義。

攻擊者只要偷 key：

```text
Ciphertext + Key
       ↓
    Plaintext
```

### CCSP 秒答

如果選項是：

- In vaults
- By armed guards
- With two-person integrity
- **At least as securely as the data they decrypt**

選最後一個。

因為其他三者都是：

> context-dependent implementation

---

# 2. ⭐ 特定 Table 要用哪種 Encryption？

這是今天要特別固定的。

假設 DB：

```text
users
├── id
├── username
└── email

payments
├── id
├── PAN
├── expiry
└── token
```

要求：

> **只保護 `payments` table，甚至只保護 PAN column。**

在這四種 CCSP 選項中：

- File-level encryption
- Transparent encryption
- Application-level encryption
- Object-level encryption

最優先選：

> ## **Application-level encryption**

---

## 為什麼？

Application 可以精確決定：

```text
哪個 table
哪個 column
哪個 field
```

要 encrypt。

```text
Application
     │
     │ encrypt(PAN)
     ▼
Ciphertext
     │
     ▼
Database
```

例如：

```text
Before:
PAN = 4111111111111111

Application encrypts

Database stores:
PAN = Aq2Fs9xZ...
```

DB 從一開始拿到的就是 ciphertext。

---

## 四種 encryption 邊界

### File-level Encryption

加密：

> **一個完整 file**

例如：

```text
payroll.xlsx
backup.sql
report.pdf
```

```text
report.pdf
    ↓
File encryption
    ↓
report.enc
```

不是針對 DB schema。

---

### Transparent Encryption / TDE

Transparent 的關鍵：

> **Application 不需要知道 encryption 發生。**

```text
Application
     │
     │ plaintext SQL
     ▼
Database Engine
     │
     │ Transparent Encryption
     ▼
Encrypted DB files / tablespaces
```

典型保護：

- DB data files
- tablespaces
- transaction logs
- backups

主要解決：

> **Data at Rest**

---

### Application-level Encryption

```text
Application
    ↓ encrypt
Ciphertext
    ↓
Database
```

優點：

- granular
- table/column/field selective
- DB admin 可能也看不到 plaintext

缺點：

- application complexity
- key management
- indexing/search/query 困難

---

### Object-level Encryption

針對：

> individual cloud-storage object

例如：

```text
Bucket
├── A.pdf → encrypted
├── B.jpg → encrypted
└── C.json → encrypted
```

典型是 S3/object storage，不是 relational DB table。

---

## ⭐ 必背表

| 題目看到 | 優先想到 |
|---|---|
| One particular **file** | **File-level** |
| DB/storage encryption 對 app transparent | **Transparent / TDE** |
| Specific **table / column / field** | **Application-level** |
| One cloud-storage **object** | **Object-level** |

### Nuance

真實世界某些 DB 可以：

> 特定 table → dedicated encrypted tablespace

因此 TDE 也可能做到 selective protection。

但是 **CCSP 四選一**若題幹強調：

> application only needs to encrypt specific sensitive fields/tables

就優先：

> **Application-level encryption**

---

# 3. ⭐ Data Masking Techniques

這一組建議直接背 terminology。

## 3.1 Substitution

把真實資料換成另一個合理值。

```text
Alice Wang
    ↓
Mary Chen
```

保持：

- format
- realism
- application usability

但失去真實 identity。

---

## 3.2 Random Substitution

從候選資料中隨機取值：

```text
Original:
Alice / Taipei

Masked:
David / Kaohsiung
```

目標：

> realistic but unrelated substitute.

---

## 3.3 Algorithmic Substitution

用演算法產生替代值。

```text
Original:
123-45-6789

Algorithm
    ↓
673-82-4107
```

優點可能是：

> deterministic consistency

例如同一 customer ID 每次 masking 後得到相同假 ID。

---

## 3.4 Shuffling

把同一欄的真實值重新排列：

```text
Before

Alice → 70000
Bob   → 90000
Carol → 80000
```

shuffle 後：

```text
Alice → 90000
Bob   → 80000
Carol → 70000
```

所有 salary 都是真的：

> 但 person ↔ salary mapping 被破壞。

---

## 3.5 Deletion / Nulling

直接拿掉敏感值：

```text
SSN = 123-45-6789
```

變：

```text
SSN = NULL
```

或：

```text
SSN = ""
```

優點：

> confidentiality 很直接。

缺點：

> data utility 低。

「Deletion 怎麼算 masking？」這個疑問很合理。

但在廣義 test-data masking taxonomy：

> **Nulling / deletion 確實常被算成 masking technique。**

---

## 3.6 Character Scrambling

把字元順序或值打亂：

```text
ABCDE12345
    ↓
D4A1E32BC5
```

保留：

- length
- 某些格式 characteristic

但移除原值。

---

## 3.7 Number Variance

對數值加上合理範圍 variation：

```text
Salary = 100000

±10% variance

→ 94,215
```

可以保持：

> distribution / statistical usefulness

同時避免 exact original value。

---

## 3.8 Masking-out

只顯示部分字元：

```text
4111111111111111
        ↓
************1111
```

常見：

- PAN
- account number
- SSN
- phone number

---

## 3.9 Algorithmic Transformation

把原值經 deterministic transformation 轉換：

```text
Original
   ↓
Transformation
   ↓
Masked but structurally valid value
```

和 algorithmic substitution 有重疊。

---

# ⭐ Masking Techniques 必背清單

```text
Substitution
Shuffling
Deletion / Nulling
Character scrambling
Number variance
Masking-out
Algorithmic transformation
```

### 不是 masking technique

> **Conflation**

`conflation` 一般英文只是：

> 把兩個不同概念混為一談。

例如：

> conflating authentication with authorization

在 LearnZapp 那題只是 distractor。

---

# 4. Bit-Splitting / Data Dispersion

核心：

> **將資料轉換/切成多個 fragments，分散保存；單一 fragment 不足以重建完整資料。**

```text
Original Data
      ↓
Split / Transform
      ↓
 ┌────┼────┬────┐
 F1   F2   F3   F4
 ↓    ↓    ↓    ↓
A     B    C     D
```

可能跨：

- storage nodes
- providers
- geographic regions

---

## 為什麼題庫說像 RAID？

共同概念：

> **資料分散在多個 storage components。**

```text
RAID
Disk1 Disk2 Disk3 Disk4

Data dispersion
Site1 Site2 Site3 Site4
```

但不要理解成：

> bit-splitting = RAID。

### RAID 主要：

- availability
- resilience
- sometimes performance

### Secure data dispersion 可另外提供：

- confidentiality benefit
- compromise isolation
- provider/site diversity

---

# 5. Bit-Splitting Across Jurisdictions

LearnZapp 題目認為：

> 分散多 jurisdictions 會讓單一 jurisdiction 執法 seizure 更複雜。

這可以理解其邏輯：

```text
Fragment A → Jurisdiction A
Fragment B → Jurisdiction B
Fragment C → Jurisdiction C
```

只取得：

```text
Fragment A
```

可能無法 reconstruct 原資料。

但**不要把「阻撓 law enforcement」當 security objective 背。**

較好的 security model：

> **Compromise/seizure of one location does not yield the full dataset.**

---

# 6. Object vs Volume vs File Storage

這是另一個要固定的 boundary。

## Volume / Block Storage

對 VM 看起來像：

> disk

```text
VM
 ↓
/dev/sdb
 ↓
Block storage
```

典型：

- virtual disk
- SAN LUN
- cloud block volume

適合：

- OS disk
- DB storage
- high-performance block I/O

---

## Object Storage

資料模型：

```text
Object
+
Metadata
+
Object Key
```

例如：

```text
bucket:
  finance/2026/report.pdf
```

注意：

> `finance/2026/` 可以看起來像 hierarchy，但很多 object stores 本質是 flat key namespace + prefixes。

適合：

- S3-style storage
- images
- backups
- data lake
- massive unstructured data

---

## File Storage

真正的：

```text
directory
 ├── HR
 │   └── payroll.xlsx
 └── Finance
     └── report.xlsx
```

典型：

- NFS
- SMB
- NAS

適合：

> shared hierarchical filesystems。

### 必背

```text
Volume = Disk
File   = Filesystem hierarchy
Object = Key + Metadata + Object
```

---

# 7. AONT-RS

AONT-RS：

> **All-or-Nothing Transform + Reed-Solomon**

高層理解：

```text
Data
 ↓
AONT transform
 ↓
Reed-Solomon encoding
 ↓
Multiple fragments
 ↓
Distributed storage
```

沒有足夠 fragments：

> 無法有效 recovery。

它屬於：

> data transformation / dispersion

不是 quantum computing。

---

# 8. Quantum Computing

看到：

- superposition
- qubit
- entanglement
- quantum interference

CCSP 題目基本上先想：

> **Quantum Computing**

常見提問：

> 題幹看到 superposition 就優先 Quantum？

### 是。

尤其像：

> superposition of physical states

幾乎是直接送分 keyword。

---

# 9. 今日 D2 最終速記表

| Keyword | 秒答 |
|---|---|
| Specific table/column encryption | **Application-level** |
| DB encryption transparent to app | **TDE** |
| Individual object | **Object-level** |
| Individual file | **File-level** |
| Token substituted values | Data masking/tokenization context |
| `NULL` sensitive field | **Deletion / Nulling masking** |
| Rearranged column values | **Shuffling** |
| `****1234` | **Masking-out** |
| Split data across sites | **Bit-splitting / data dispersion** |
| RAID-like cloud concept | **Data dispersion** |
| VM disk | **Volume storage** |
| Hierarchical NFS/SMB | **File storage** |
| Key + metadata | **Object storage** |
| Superposition | **Quantum computing** |
| Protect crypto key | **At least as strongly as protected data** |

---

## CCSP D2 閃卡
__
---

# Part 2 — Domain 6：Legal, Risk and Compliance

D6 此階段最需要的不是「把管理標準全文讀完」，而是先建立一張 **framework / legal / audit taxonomy map**。對工程背景的學習者，最有效的方法是把這些管理術語轉成熟悉的「介面、責任、輸入輸出、用途」。

# 1. OECD Privacy Guidelines：八原則完整理解

OECD Privacy Guidelines 是一組 **privacy/data-governance principles**，不是像 ISO 27001 那樣的認證標準。OECD 官方目前仍列出這八個基本原則，而且強調它們應視為一個整體。

最好的理解方式不是背八個英文，而是把它看成 personal data 的 lifecycle：

```text
Collect
  ↓
Keep good data
  ↓
State why you need it
  ↓
Don't use it for something else
  ↓
Protect it
  ↓
Tell people what you're doing
  ↓
Let the person inspect/challenge it
  ↓
Organization remains accountable
```

## 1. Collection Limitation

> **不要無限制地收資料。**

核心是：

- collection 要有限制
- lawful
- fair
- 適當時需 knowledge / consent

例如 SaaS 註冊情境：

```text
真正需要：
email
password

卻要求：
passport number
religion
home address
family income
```

如果這些跟服務無關，就是 collection 過度。

### 工程師 mental model

很像：

> **API input 最小化 / allow only required fields**

不要：

```json
{
  "email": "...",
  "password": "...",
  "everything_we_might_need_someday": "..."
}
```

### 關鍵字

> **What should we collect?**

→ Collection Limitation

---

# 2. Data Quality

> **收進來的 personal data 要跟用途相關，而且必要時準確、完整、保持更新。**

例如：

```text
Customer address:
台北市...

Customer 搬家了
但 DB 仍保留五年前地址
```

這會影響：

- shipping
- credit decision
- medical decision
- identity verification

### 工程師 mental model

像：

> **data validation + integrity + freshness**

```text
Relevant?
Accurate?
Complete?
Up-to-date?
```

### 關鍵字

> incorrect / obsolete / incomplete personal data

→ Data Quality

---

# 3. Purpose Specification

> **收資料時就要說清楚「為什麼收」。**

例如：

> 蒐集 email 的目的是：
> - order confirmation
> - account recovery

而不是：

> 先全部收起來，以後想幹嘛再說。

OECD 要求用途最遲在 collection 時指定，後續用途原則上應限於該目的或相容目的。

### 工程師 mental model

像：

> **Declare the API contract before processing**

```text
Input:
email

Declared purpose:
account recovery
```

### 關鍵字

> **Why are we collecting this?**

→ Purpose Specification

---

# 4. Use Limitation

這個和 Purpose Specification 最容易混。

### Purpose Specification

> **先定義用途。**

### Use Limitation

> **之後不要拿去做別的。**

例如：

```text
收 email：
"For delivery notification"

後來：
把 email list 賣給廣告商
```

這就是 Use Limitation 問題。

除非例如：

- data subject consent
- lawful authority

等情況成立。

### 最短切法

> **Purpose = Declare why**
>
> **Use = Stay within why**

---

# 5. Security Safeguards

本次的錯題即落在這一條。

> Personal data 應受到合理 safeguards，防止 loss、unauthorized access、destruction、use、modification、disclosure。

這是工程師最熟的一條：

```text
Encryption
IAM
MFA
RBAC
Logging
DLP
Backup
Network controls
Physical security
```

### 關鍵字

> Protect PII against unauthorized access/modification/disclosure

→ **Security Safeguards**

---

# 6. Openness

> **組織不能神秘地處理 personal data。**

應讓人知道：

- 有沒有收資料
- 大概收什麼
- 怎麼用
- 為什麼用
- 誰是 controller

OECD 明確要求對 personal-data practices/policies 有一般性的 openness。

例如：

> Privacy Notice / Privacy Policy

### 工程師類比

很像：

> **documentation / transparency**

---

# 7. Individual Participation

這不是「員工參與資安」。

這裡的 individual 是：

> **data subject**

原則上本人應能：

- 確認 organization 是否持有自己的資料
- 取得自己的資料
- challenge incorrect data
- 要求 rectification / amendment 等適當處理

OECD 原文就包括 access、challenge、rectification 等權利。

### 例子

```text
Alice:
"貴公司保存了本人的哪些資料？"

Company:
→ provide appropriate access

Alice:
"生日錯了。"

→ correction process
```

### 關鍵字

> access / correct / challenge one's own data

→ Individual Participation

---

# 8. Accountability

最後一條：

> **資料治理的責任最後要有人承擔。**

不是：

> outsource 給 CSP → 組織就沒責任了。

這正好對應 CCSP 的 recurring 考點：

> responsibility can be delegated, accountability remains

非常接近。

### 工程師 mental model

```text
Controller / organization
        ↓
Policies
Controls
Processors
CSP
Subprocessors
        ↓
仍然要能證明 privacy principles 被遵守
```

---

## 八原則最好這樣背

不要背英文首字母，背一條故事：

> **少收 → 收對 → 說明目的 → 不亂用 → 保護 → 透明 → 本人能查改 → 公司負責**

對應：

| 中文 mental model | OECD |
|---|---|
| 少收 | Collection Limitation |
| 收對 | Data Quality |
| 說明目的 | Purpose Specification |
| 不亂用 | Use Limitation |
| 保護 | Security Safeguards |
| 透明 | Openness |
| 本人能參與 | Individual Participation |
| 公司負責 | Accountability |

這比硬背 8 個名詞有效得多。

---

# 2. 工程師怎麼準備 D6 / 法規框架？

## 不建議的做法

不要把備考策略變成：

> 去讀完整 ISO 27001、27002、31000、SSAE、OECD 原文。

CCSP 的準備目標不是 ISO Lead Auditor。

ISO 27002:2022 本身就有 **93 controls**；全文硬讀的 ROI 對 CCSP 很低。它的定位主要是提供 controls implementation guidance，而 ISO 27001 才是 ISMS requirements。

---

# 建議的三層模型

## Layer 1 — 先認「它到底是什麼東西」

先做到看到名稱 2 秒內能歸類：

| 名稱 | 兩秒內該想到的第一個詞 |
|---|---|
| OECD Privacy Guidelines | **Privacy principles** |
| ISO 27001 | **ISMS requirements / certification** |
| ISO 27002 | **Security controls guidance** |
| ISO 31000 | **General risk management** |
| NIST SP 800-37 | **RMF process** |
| COBIT | **IT governance** |
| SOC 2 | **Service-provider assurance report** |
| SSAE | **Auditor attestation standard** |
| SAS 70 | **Legacy** |

這層最重要。

---

# Layer 2 — 再學「它和旁邊那個差在哪」

不需要背 ISO 條號。

但一定要會：

## ISO 27001 vs 27002

```text
ISO 27001
= What an ISMS MUST satisfy
= Requirements
= Certifiable

ISO 27002
= HOW / guidance for security controls
= Best-practice control guidance
= Not the ISMS certification standard
```

ISO 官方目前的定位正是如此：27001 定義 ISMS requirements；27002 提供 controls guidance。

### 工程師類比

> **27001 = interface/specification**
>
> **27002 = implementation guidance/reference implementation ideas**

---

## ISO 27001 vs SOC 2

```text
ISO 27001
→ organization has an ISMS

SOC 2
→ auditor reports on scoped service controls
```

SOC 2 使用 Trust Services Criteria，涵蓋 Security、Availability、Processing Integrity、Confidentiality、Privacy。

所以：

> **holistic security management program**

→ ISO 27001

> **cloud/SaaS provider controls operating effectively**

→ SOC 2 Type 2

---

## SOC 2 vs SSAE

```text
SSAE
= rules/standards the auditor operates under

SOC 2
= assurance examination/report delivered to stakeholders
```

這是：

> compiler vs binary

的關係比較接近，而不是兩個競爭 certification。

而且不要過度死背 `SSAE 18` 版本號。AICPA 現行 SOC 2 Type 2 illustrative report 已引用 SSAE 21，SOC 2 guidance 也反映 SSAE 20/21 更新。

LearnZapp 出 `SSAE 18` 時：

> 認得「attestation standard」即可。

---

# Layer 3 — 只背 exam trigger words

例如：

```text
Holistic ISMS
→ ISO 27001

Security control guidance
→ ISO 27002

Enterprise IT governance
→ COBIT

General risk management
→ ISO 31000

Categorize → Select → Implement → Assess → Authorize → Monitor
→ NIST RMF / SP 800-37

Service organization assurance
→ SOC

Privacy principles
→ OECD
```

這就是 D6 所需的 vocabulary compiler。

---

# argue 方法在 D6 更重要

每道陌生管理題都固定問四件事：

> **① 這是 standard、framework、report、law 還是 principle？**  
> **② 誰使用它？organization、auditor、regulator 還是 customer？**  
> **③ 它產出的東西是什麼？certification、report、controls、process？**  
> **④ 題目到底在問 governance、audit、risk 還是 privacy？**

例如：

```text
SOC 2
What is it?
→ report/examination

Who?
→ service organization + independent auditor

Output?
→ assurance report

Purpose?
→ customer/vendor assurance
```

對比：

```text
ISO 27001
What?
→ management-system requirements standard

Who?
→ organization

Output?
→ ISMS + possible certification

Purpose?
→ systematic information-security governance
```

這樣就不需要把全文背進腦袋。

---

# 建議的 D6 備考比例

建議的時間配置：

| 時間 | 工作 |
|---|---|
| 40% | LearnZapp fresh questions |
| 25% | 錯題 argue + boundary 修正 |
| 20% | Framework comparison flashcards |
| 10% | Udemy/DestCert targeted review |
| 5% | 官方 summary 查證陌生術語 |

不要：

> 一看到陌生 OECD 名詞，就跑去讀 30 頁 PDF。

先建立：

> name → category → purpose → neighboring distinction

足以應付大部分 CCSP 題。

---

# 3. 今日 D6 講義

## A. Due Care / Due Diligence / Liability

### Due Care

> **應該採取什麼 reasonable safeguards？**

例如：

```text
Encrypt sensitive data
Patch systems
Use access controls
Protect PII
```

### Due Diligence

> **是否持續確認 safeguards 真的存在、有效？**

例如：

```text
Risk assessment
Audit
Vendor review
SOC review
Continuous monitoring
```

### Liability

> 最後可能承擔的法律責任。

Mental model：

```text
Due Care
= DO

Due Diligence
= CHECK

Liability
= consequence/responsibility
```

---

# B. File Hashes vs Backups

### Hash

回答：

> **Has this file/config changed?**

```text
Approved config
   ↓ SHA-256
HASH-A

Current config
   ↓ SHA-256
HASH-B

A != B
→ modification/drift
```

所以適合：

- integrity verification
- baseline validation
- configuration drift
- forensic evidence checking

### Backup

回答：

> **Can I recover the data/system?**

所以：

> **Hash = Integrity**
>
> **Backup = Availability / Recovery**

---

# C. OECD Privacy Principles

今日需要直接帶走：

```text
Collect less
Keep it accurate
State the purpose
Don't exceed the purpose
Protect it
Be transparent
Let the person participate
Remain accountable
```

---

# D. ISO 27001 / ISO 27002

## ISO/IEC 27001:2022

> **ISMS requirements**

可用於 certification。

核心：

```text
Risk-based management system
+
Policies
+
Processes
+
Controls
+
Monitoring
+
Continual improvement
```

ISO 官方目前仍將 27001:2022 定位為 ISMS requirements standard。

## ISO/IEC 27002:2022

> **Information-security controls guidance**

現行 2022 版有 93 controls，分成 organizational、people、physical、technological 四大主題。

### 秒答

> 27001 = **Requirements / ISMS**
>
> 27002 = **Controls guidance**

---

# E. SOC 2 / SSAE / SAS 70

## SOC 2

服務組織 controls assurance。

TSC：

```text
Security
Availability
Processing Integrity
Confidentiality
Privacy
```

### Type 1

> controls design at a point in time

### Type 2

> design + operating effectiveness over a period

---

## SSAE

> Auditor attestation standards。

不是 security framework。

---

## SAS 70

> 舊的 service-organization reporting standard。

AICPA 現在直接把現代 SOC 1 report 描述成以前被稱為 SAS 70 reports 的後繼體系。

CCSP：

> `SAS 70` → **legacy**

---

# F. Risk Frameworks

## COBIT

> **Enterprise IT governance + management**

不是只做 security，也不是純 risk framework。

---

## NIST SP 800-37 Rev.2

> **Risk Management Framework**

目前流程：

```text
Prepare
↓
Categorize
↓
Select
↓
Implement
↓
Assess
↓
Authorize
↓
Monitor
```

NIST 官方目前仍以這套 disciplined process 描述 RMF。

---

## ISO 31000:2018

> **General enterprise risk management guidelines**

不是只做 cyber，也不是 certification standard。

ISO 官方確認目前仍是 2018 版。

因此 LearnZapp 若出：

> ISO 31000:2009

把它視為：

> **legacy version wording**

即可。

---

## Hex GBL

> fictional Discworld reference。

純 distractor。

不用背。

---

# G. Forensic Evidence

最佳 practice：

```text
Original Evidence
      ↓
Forensic image
      ↓
Hash verification
      ↓
Working copy
      ↓
Analysis
```

原本的選擇是：

> modified data = automatically inadmissible

太絕對。

考試應理解：

> **Unexplained / undocumented modifications damage evidence credibility and integrity.**

但：

> modification 本身不必然自動造成 inadmissibility。

重點：

- chain of custody
- hashes
- documentation
- repeatability
- original preservation

---

# H. 25% / 75% Fault 題

這題不要背 LearnZapp 的：

> 75% fault > 51% → pay 100%

它混淆了：

### Preponderance of evidence

> 某個 factual claim 是否 more likely than not。

它是一種 **burden of proof**。

### Comparative negligence

才是：

> fault percentage 怎麼影響 damages。

例如 pure comparative model：

```text
Defendant = 75% fault
Damage = $125,000

→ $93,750
```

Cornell 也以 proportional fault reduction 解釋 comparative negligence。

不同 jurisdiction 可能有不同規則，所以：

> **[Q] 題庫品質**

---

# I. Seizure 題

不要背：

> court order 一定拿 electronic data + hardware。

真正模型：

> 法律權限、warrant/order scope、jurisdiction 決定可取得什麼。

Cloud 特別可能：

```text
Customer Data
     ↓
Multi-tenant CSP hardware
```

所以執法也可能要求 CSP production/disclosure，而不是搬走整台 physical server。

這題只要知道：

> digital evidence 與 physical media **都可能**成為 seizure 對象。

---

# 今天 D6 最重要的速查表

| 題目 keyword | 秒答 |
|---|---|
| Reasonable protection expected | **Due Care** |
| Ongoing investigation/verification | **Due Diligence** |
| ISMS / holistic security program | **ISO 27001** |
| Security-control implementation guidance | **ISO 27002** |
| SaaS/CSP assurance report | **SOC 2** |
| Controls operating over time | **SOC 2 Type 2** |
| Auditor attestation standard | **SSAE** |
| Legacy service-org report | **SAS 70** |
| IT governance | **COBIT** |
| RMF lifecycle | **NIST 800-37** |
| General enterprise risk | **ISO 31000** |
| Privacy principles | **OECD** |
| Config changed? | **Hash** |
| Recover after failure? | **Backup** |

這張表的 ROI 遠高於通讀任何一份 ISO 全文。
