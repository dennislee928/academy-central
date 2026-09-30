# CCSP 模擬測驗講義：2026-09-30 D5／D2 錯題分析與補強

> **講義編號：** 10
> **講義類型：** 弱點分析與概念補正
> **Test Source / 題庫來源:** LearnZapp Domain 5 drill ＋ Domain 6 drill（同日）
> **日期：** 2026-09-30
> **涵蓋 Domain：** 主 D5；另涉 D2（密碼學／備份／discovery／DLP）、D3（實體與網路）
> **分類標記：** `[K]` 知識缺口 ／ `[T]` 用語混淆 ／ `[J]` 判斷失誤 ／ `[Q]` 題庫品質存疑

---

# 上篇：D5 維運與實體／網路邊界

## 1. 今日錯題總表

| 主題 | 題庫答案 | 分類 | 優先度 | 對應 Domain |
|---|---|:-:|---|:-:|
| Secure KVM | Keystroke logging 不是 feature | `[K]` | 中 | D3 |
| Symmetric encryption | OOB key distribution | `[Q]` | 高：修正概念 | D2 |
| ASHRAE temperature | 93°F 不可接受 | `[K]` | 低 | D3 |
| Underfloor plenum | Tight gaskets | `[Q]` | 低 | D3 |
| E-commerce backup | Encryption | `[Q]` | 中 | D2 |
| Incident definition | Unscheduled | `[Q]` | 低 | D5 |
| GRE vs IPsec | GRE | `[T]` | 高：Recurring | D3 |
| Patch advice | Vendor | `[J]` | 高：Recurring | D5 |

---

## A. Secure KVM（D3）

### 核心目的

Secure KVM 不是普通的 Keyboard / Video / Mouse switch，而是要避免**不同 security domains 透過 peripherals 發生 cross-domain leakage**。

### Mental model

```
Secure KVM
│
├─ Isolated data paths
├─ Explicit physical port selection
├─ Clear active-port indication
├─ Clear keyboard/mouse buffers
├─ Reject unauthorized peripherals
├─ Tamper resistance/evidence
└─ NO keystroke logging
```

### 題目與答案

**題目：** 哪一項不是 Secure KVM feature？

**答案：** Keystroke logging。因為 keystroke logging 本身就是 leakage threat。

### 不要死背

`Welded chipsets` 理解成 **hardware tamper resistance／components difficult to modify** 即可。

---

## B. Symmetric encryption / DH / OOB（D2）

本日最重要的 crypto concept。

### Symmetric cryptography

核心是：**雙方必須安全取得適當的 shared secret keying material**。

而不是：永遠只有整個 session 一把 key。現代 protocol 可以有 Client → Server key 與 Server → Client key，兩把都仍然是 symmetric keys。

### OOB Key Distribution

一方先有 secret：

```
Alice creates K
      │
      │ trusted separate channel
      ▼
     Bob
```

K 本身有被傳送。例：physical handoff、secure management channel、pre-provisioning、hardware token。

### Diffie-Hellman

DH 是 **Key Agreement**，不是 symmetric encryption algorithm。

```
Alice private a             Bob private b
      │                           │
A = g^a                     B = g^b
      │                           │
      └──── public exchange ──────┘
                 │
                 ▼
       Same shared secret
```

Shared secret 本身沒有直接傳過 network。

### 最重要差別

| | DH | OOB |
|---|---|---|
| 類型 | Key agreement | Key distribution／provisioning |
| Secret 本身傳送？ | No | Yes |
| Public network 可用？ | Yes | 通常另一可信 channel |
| 可提供 forward secrecy？ | DHE／ECDHE 可 | 通常沒有 |
| 本身 authentication？ | No | 視 OOB channel |

### LearnZapp 原題

> Symmetric encryption involves ______

題庫答案：`Passing keys out of band`。

這不是 universal truth。正確知識應是：Symmetric cryptography requires secure establishment／distribution of shared secret keying material。OOB 是一種方法；DH／ECDH 是另一種建立方法。

---

## C. GRE vs IPsec（D3，Recurring `[T]`）

### GRE

Generic Routing Encapsulation。核心是 **Encapsulation／Tunneling**，不提供 encryption。

### IPsec

核心是 **Protect IP communication**，可以有 Transport mode 與 Tunnel mode，所以 IPsec 也能 tunnel。

但如果題目問 `most associated with tunneling`，答 **GRE**。

### Mental model

```
GRE   = Tunnel
IPsec = Secure

GRE over IPsec = Tunnel + Security
```

---

## D. Production Patch：Vendor vs Internal Compliance（D5，Recurring `[J]`）

**題目：** Whose advice should receive most weight about patching a production system?

**答案：** Vendor。因為 vendor 最知道 prerequisites、compatibility、supported versions、known issues、rollback、reboot requirement。

但注意：**Vendor ≠ final decision maker**。

### 正確 governance model

```
Vendor            → technical advice
Security          → vulnerability risk
Compliance        → obligation/deadline
Change Management → controlled approval
Business/System Owner → operational risk/accountability
```

**一句記：** Vendor advises; organization decides.

---

## E. E-commerce Backup / Encryption（D2）

### 題庫 mental model

```
E-commerce
   ↓
Cardholder data
   ↓
Backup/archive
   ↓
Data at rest
   ↓
Confidentiality
   ↓
Encryption
```

| 控制 | 回答什麼問題 |
|---|---|
| Mirroring | Availability／aggressive RPO |
| Encryption | Confidentiality of recoverable stored data |
| Hashing | One-way integrity／non-recoverable representation |

所以題庫四選一時選 **Encryption**。

---

## F. ASHRAE Temperature（D3）

**題目大意：** 哪個 temperature setting 已經超過合理 data-center operational range？

**題庫答案：** 93°F。

這種題不用花太多時間，只要知道 server inlet temperature 應保持在合理 equipment operating range；93°F（約 34°C）顯然過高。

這類 physical／environmental trivia 優先度低於 patching、HA、management plane、monitoring、crypto concepts。

---

## G. Underfloor Plenum / Cable Penetrations（D3）

**題庫答案：** Tight gaskets。

Raised-floor cable opening 如果完全裸露：

```
Cold plenum air
     ↑
     │ uncontrolled leakage
Cable hole
```

會破壞 airflow management／cooling efficiency。Grommet／gasket 封住 cable opening 周圍空隙。

這是合理 engineering concept，但屬低 ROI trivia。

---

## H. Incident 定義（D5）

**題庫：** Incident = unscheduled event。

這是過度寬鬆的 legacy operational wording。Security incident 更好的理解：**對 CIA、系統、安全政策造成實際或潛在危害／違反的事件**。

NIST 現行定義也是以 confidentiality、integrity、availability 或 security-policy violation 為核心，而不是「只要 unscheduled 就叫 incident」。

所以不要背：`Every unscheduled event = security incident.`

---

## 上篇必記六句

1. GRE tunnels; IPsec protects.
2. Vendor advises on patches; the organization decides.
3. DH agrees on a secret; OOB distributes a secret.
4. Symmetric crypto needs securely shared keying material—not necessarily OOB delivery.
5. Backup does not imply continuous mirroring; mirroring is driven by RPO／availability.
6. Recoverable sensitive backups generally need confidentiality protection; encryption is a natural fit.

---

# 下篇：D2 資料安全

本次 D2 不需要整章重讀。真正值得補強的是兩個核心：

1. Content ／ Metadata ／ Context-based discovery 的邊界
2. DLP ／ Egress Monitoring 與 Access Control 的邊界

另外三題主要是 `[Q]` 題庫品質／trivia，不應投入太多時間。

## 1. 今日錯題總表

| 主題 | 題庫答案 | 分類 | 優先度 |
|---|---|:-:|---|
| Tokenization requires two distinct ___ | Databases | `[Q]` | 低 |
| Egress monitoring EXCEPT | Access control | `[T]` | 高 |
| Reclassification EXCEPT | Color change | `[Q]` | 極低 |
| Content-analysis discovery EXCEPT | Inheritance | `[K]` | 高 |
| Secure Data Life Cycle 不精確原因 | Not actually a cycle | `[Q]` | 極低 |
| USDA / USPTO / OSHA / SEC | USPTO = patents | 補充 `[T]` | 中 |

---

## 2. Content Analysis vs Metadata Analysis vs Context Analysis

本日最重要的部分。

### Content Analysis

回答：**「資料裡面寫了什麼？」**

直接讀取 payload／content：

```
File Content
    ↓
Keywords
Regex / Pattern Matching
Frequency
Entity detection
Exact-data matching
    ↓
Classification / Discovery result
```

例如 `"SSN: 123-45-6789"` 可以使用 `\d{3}-\d{2}-\d{4}` 判斷可能包含 SSN。

典型 characteristic：Keywords、Pattern matching、Frequency、Entity recognition、Data fingerprinting。

### Metadata Analysis

回答：**「這份資料被怎麼描述？」**

```json
{
  "filename": "payroll.xlsx",
  "owner": "HR",
  "mime_type": "application/xlsx",
  "classification": "Confidential",
  "created_at": "2026-09-30"
}
```

完全可以不打開 payload，只看 `owner = HR`、`filename = payroll.xlsx`、`classification = Confidential`。

因此：**Metadata = data about data**。

### Context Analysis

回答：**「這份資料在哪裡、屬於誰、處於什麼環境？」**

```
Object B
│
├─ Parent folder = CONFIDENTIAL
├─ Repository = HR
├─ User = Finance Admin
├─ Device = unmanaged
├─ Tenant = Production
└─ Geographic location = US
```

這些資訊未必是 object payload，也未必全部直接儲存在 object metadata 裡。

---

## 3. Inheritance 為什麼不是 Content Analysis？

常見反駁是：inheritance 很常會把結果存成 metadata。

```
Object A
metadata.is_xx_tier = true
        ↓ inheritance
Object B
metadata.is_xx_tier = true
```

這個觀察正確，但要分清：**「結果存在哪裡」≠「判斷是怎麼做出來的」**。

### Case A：Content-derived metadata

```
Object B payload
    ↓
找到 SSN regex
    ↓
metadata.is_xx_tier = true
```

這是 **Content Analysis**。

### Case B：Inherited metadata

```
Parent metadata.is_xx_tier = true
              ↓
          inheritance
              ↓
Child metadata.is_xx_tier = true
```

這是 **Context／metadata propagation**，甚至完全不用讀 `Child.Payload`。

### 最精準的切法

| 分析型態 | 訊號來源 |
|---|---|
| Content Analysis | payload-derived signal |
| Metadata Analysis | metadata-derived signal |
| Context Analysis | environment／relationship-derived signal |
| Inheritance | context-based property propagation |

### LearnZapp 題目

題幹明確寫 `Content-analysis-based discovery`：

| 選項 | 是否符合 |
|---|:-:|
| Keywords | ✅ |
| Pattern matching | ✅ |
| Frequency | ✅ |
| Inheritance | ❌ |

所以這題本身其實可以成立。錯誤點不是不知道 metadata，而是當時沒有抓到題幹的 `content-analysis-based` 這個限定詞。

---

## 4. Frequency 為什麼算 Content Analysis？

Frequency 容易被誤排除。但例如同一 dataset 中：

```
PAN-like pattern × 50,000
vs
PAN-like pattern × 1
```

兩者對 classification 的意義可以不同。所以 content analyzer 可以利用「特定詞、entity、pattern 出現頻率」作為 signal。

**記：** Frequency = payload-derived statistic → 可以屬 content analysis。

---

## 5. DLP / Egress Monitoring vs Access Control

### Access Control

回答：**Who is allowed to access what?**

典型：IAM、RBAC、ABAC、ACL、Authorization policy。

```
Alice → payroll.csv → ALLOW
Bob   → payroll.csv → DENY
```

### Egress Monitoring / DLP

回答：**Sensitive data 正在做什麼、去哪裡？**

```
Credit-card data
       ↓
User tries to:
├─ email externally
├─ upload Dropbox
├─ copy USB
└─ print
       ↓
DLP
→ inspect / alert / block
```

所以它可以幫助 sensitive-data discovery、classification／categorization、exfiltration detection、investigation／forensics。但 **access-control policy 本身不是 DLP 的核心職責**。

### 快速切法

```
Access Control → May Alice access File X?
DLP            → What is Alice doing with sensitive File X?
```

注意這只是 CCSP taxonomy 的主要區分。現代 DLP 當然會使用 identity、user group、device、context 做 enforcement，所以不要背「DLP 與 access control 完全沒有關係」。

---

## 6. Tokenization

LearnZapp：`Tokenization requires two distinct databases.` 仍標為 `[Q] 過度絕對`。

它描述的是傳統 vault-based tokenization：

```
Sensitive Value
      ↓
Tokenization
      ↓
Token

Token Vault
Token ↔ Original Value
```

例如 `4111111111111111 → TKN-XF39A12`。Token 本身通常沒有可逆的數學關係。

### Tokenization vs Encryption

| | Tokenization | Encryption |
|---|---|---|
| Output | Token | Ciphertext |
| 還原依據 | Mapping／vault | Cryptographic key |
| 數學 reversible | 通常不是 | 是 |
| 典型用途 | PAN replacement | Confidentiality |

**真正該記：** Vault-based tokenization 需要安全保存 token ↔ original mapping。不要背「一定需要兩個 physical databases」。

---

## 7. Reclassification / Color change

Color change 沒有特殊 CCSP 定義，就是顏色改變。題目只是拿它當明顯 distractor。

真正值得記的是資料可能因為下列因素需要 reclassification：

- Time
- Purpose／Repurposing
- Ownership／Controller change
- Legal／regulatory change
- Business context change

例如：

```
Pre-release financial results
        ↓ publication
Public information
```

或：

```
Production PII
        ↓
Repurposed as development/test data
        ↓
Need masking / new classification review
```

**不要做 Color change flashcard**，它只是低品質 distractor。

---

## 8. Cloud Secure Data Life Cycle

```
Create → Store → Use → Share → Archive → Destroy
```

簡稱 **C-S-U-S-A-D**。

LearnZapp 問：為什麼叫 Life Cycle 有點不精確？答案：Destroy 後同一份資料不會 loop 回 Create。這是 `[Q]` trivia。

### 考試真正該會的

| Phase | 核心 |
|---|---|
| Create | Classification |
| Store | Storage + protection |
| Use | Authorized processing |
| Share | Transfer／recipient controls |
| Archive | Retention／long-term preservation |
| Destroy | Secure deletion／sanitization |

---

## 9. USDA / USPTO / OSHA / SEC（D6 補充）

| 縮寫 | 全名 | 秒答 |
|---|---|---|
| USDA | U.S. Department of Agriculture | Agriculture |
| USPTO | U.S. Patent and Trademark Office | Patent／Trademark |
| OSHA | Occupational Safety and Health Administration | Workplace safety |
| SEC | Securities and Exchange Commission | Securities／public companies |

快速 association：

```
Farm   → USDA
Patent → USPTO
Worker → OSHA
Stocks → SEC
```

本次 patent 題選 USPTO 為正解。

---

## 10. 下篇 D2 四條必記

1. **Content** = 裡面寫什麼。
2. **Metadata** = 它被怎麼描述。
3. **Context** = 它在哪裡、屬於誰、跟誰有關。
4. **Inheritance** = context／property propagation，不是 payload inspection。

再加一句：Access Control 決定能不能存取；DLP 監控敏感資料被怎麼處理／移動。
