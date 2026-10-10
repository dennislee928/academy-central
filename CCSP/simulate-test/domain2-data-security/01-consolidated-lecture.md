# CCSP Domain 2：Cloud Data Security 彙整講義

> **範圍：** `simulate-test/` 內所有測驗講義中屬於 Domain 2 的內容，跨場次合併後依主題重組。
> **考試權重：** 20%（六域最高）
> **來源：** `by-test/01`、`02`、`03`、`04`、`06`、`07`、`08`、`10`、`by-test/learnzapp/03`、`04`、`05`、`daily/`
> **維護：** 新增測驗講義後，將該檔的 D2 章節併入本檔，並更新 §0 來源對照。
> **註：** 各場次分數、進步判定與補強排程留在 `by-test/` 原檔，不併入本檔。

---

## 0. 來源對照 / Source Map

| 來源檔 | 原章節 | 併入本檔位置 |
|---|---|---|
| `by-test/01-assessment-test-weakness-lecture.md` | §4.5 銷毀、§4.6 加密架構、§4.7 DRM／IRM、D 段名詞表 | §1.4、§1.5、§1.6 |
| `by-test/02-custom-test-1-weakness-lecture.md` | §5.1 Q1／Q2／Q12／Q14／Q15、P0-2 | §2.1–§2.5 |
| `by-test/03-custom-test-2-weakness-lecture.md` | Q4／Q5／Q6／Q12／Q13／Q25 | §1.7、§1.8、§2.6 |
| `by-test/04-practice-test-1-weakness-lecture.md` | §6.1 masking、§6.2 tokenization | §1.5、§2.7 |
| `by-test/06-d2-drill-1-weakness-lecture.md` | P0-1 生命週期、P0-2 加密層、P0-3 DLP／discovery／masking、P0-5 EXCEPT | §1.1、§1.4、§1.2、§2.8、§5 |
| `by-test/07-practice-test-2-weakness-lecture.md` | §7.1 volume storage、§7.2 PKI、§7.3 ECC、§7.4 TDE、§7.5 anonymization、§7.6 degaussing | §1.3、§1.5、§1.7 |
| `by-test/08-d4-drill-1-weakness-lecture.md` | P0-2 masking／tokenization／PCI DSS | §1.5、§2.7 |
| `by-test/10-drill-2026-09-30-weakness-lecture.md` | 上篇 B、E；下篇全部 | §1.2、§1.7、§2.9 |
| `by-test/learnzapp/03-...-lecture.md` | 下篇 §4–§10 | §1.1–§1.3、§1.6、§3 |
| `by-test/learnzapp/04-two-day-error-essence-lecture.md` | §1–§5 | §1.1、§1.2、§1.3、§1.6、§1.9 |
| `by-test/learnzapp/05-tls-pki-cryptography-lecture.md` | 密碼學原理、金鑰、簽章、雜湊、PKI／憑證 | §1.7 |
| `daily/2026-09-25`、`daily/2026-09-26` | §3 LO `2.2` 儲存型態、`2.4` dashboard | §1.3、§2.10 |
| `by-test/11-drill-2026-10-01-weakness-lecture.md` | D2 §1 volume、§2 virtualization/multitenancy、§3 egress 障礙、§4 TPI 系列 | §1.3、§1.10、§1.11、§2.11 |
| `by-test/12-d5-drill-2026-10-02-weakness-lecture.md` | §13 encryption vs mirroring、§12 DH／OOB（復現） | §1.8、§1.7 |
| `by-test/13-d2-d6-drill-2026-10-03-weakness-lecture.md` | Part 1 §1–§7 key protection／encryption 粒度／masking／dispersion／AONT-RS；Part 2 §3B hash vs backup | §1.3–§1.5、§1.7 |
| 2026-10-04 recall 缺口分析（內容已併入，原檔未封存） | object storage 判準、multitenancy 共享層級、SoD 分離對象 | §1.3、§1.10、§1.11 |
| 2026-10-05 D6 新錯題補強講義（內容已併入，原檔未封存） | §7–§16 Backup vs Archive、forensic readiness | §1.1、§1.8 |
| 2026-10-06 D6 新錯題 ＋ 法律總表（內容已併入，原檔未封存） | §1 PCI merchant tiers | §1.9 |
| 2026-10-07 D3 ＋ D6 錯題補強與本輪 recall（內容已併入，原檔未封存） | 外部協作邊界、NAS/SMB 歸類、TPI threat model | §1.1、§1.3、§1.11 |
| 2026-10-09 D1-D4 防守成果 ＋ D3 補強（內容已併入，原檔未封存） | TDE 的透明性判準、`PCI=true` 的 representation ≠ source | §1.2、§1.4 |
| 2026-10-10 D3 錯題補強（內容已併入，原檔未封存） | Cryptographic entropy／CSPRNG 與 `social factors` `[Q]`、遺失／遭竊裝置 vs Dual Control | §1.7、§1.11、§2.11、§2.12 |

---

## 1. 核心觀念 / Core Concepts

### 1.1 Cloud Secure Data Lifecycle

```text
Create → Store → Use → Share → Archive → Destroy
```

口訣：**C-S-U-S-A-D**

| 階段 | 核心活動 |
|---|---|
| **Create** | **Classification**（分類與標籤應在此階段完成） |
| **Store** | 儲存 + 加密 + 備份 + 存取控制 |
| **Use** | 授權處理、使用控制 |
| **Share** | 傳輸、共享、第三方揭露、接收方控制 |
| **Archive** | 保存、長期保護、retention |
| **Destroy** | 安全刪除／crypto-erasure／sanitization |

**致命陷阱：** Encryption、Tokenization、DLP、Protect、Validate 都是 **control**，不是 lifecycle phase。題目問「Share 的前一個 phase」時答 **Use**，不是 Encrypt。

**不是真正的循環：** Destroy 之後同一份資料不會 loop 回 Create。

**Archive / Backup / Retention 三者不同：**

```text
Archive     = retention + compliance + recovery/BCDR support
Backup      = recoverability（還原）
Retention   = 資料必須保存多久
Destruction = secure disposal / crypto-erasure / sanitization
```

> **限定：** archive 可以支援 BCDR，但它的 **primary purpose 是 retention，不保證快速還原 production**。完整的 Backup vs Archive 對照見 §1.8。

**Processing vs Viewing（PII 題）：** Processing 包含 storing、printing、destroying、using；**Viewing 是被動接收**，在考題用語中常是 processing 的例外。

**Share 階段的邊界：外部協作 ≠ 公開揭露**

```text
Controlled sharing              Public disclosure
External partner                Anyone
→ authenticated                 → can access data
→ authorized
→ limited dataset
```

> **第三方存取 ≠ 公開存取。** 評估雲端協作風險時，要對準「**把資料送出傳統環境邊界交給外部協作方**」，不要直接升級成 public disclosure——常見錯選就是把 controlled sharing 的風險答成公開揭露。

**Reclassification 觸發因素：** 時間、用途改變（repurposing）、所有權／controller 移轉、法規狀態改變、business context 改變。**Color change 與敏感度分類無關**，只是低品質 distractor。

**Virtualization 的影響：** 資料可能在 raw object、VM instance、snapshot、image、storage layer 之間轉形，**這會影響 data classification 與控制落地方式**。

### 1.2 資料治理工具邊界（最高頻弱點）

| 技術 | 核心問題 | 核心功能 |
|---|---|---|
| **Metadata** | 關於這份資料有哪些描述資訊？ | data about data；常自動產生（creation time、author、file type、owner、schema） |
| **Label／Tag** | 這份資料被標記成什麼？ | 刻意附加的分類或治理標誌（Confidential、PII、Restricted） |
| **Classification** | 這份資料有多敏感？ | 敏感度／類別決策 |
| **Discovery** | 資料在哪裡？內容是什麼？ | 找出、盤點、內容檢視 |
| **DLP** | 敏感資料正在去哪裡？ | 偵測、監控、阻擋外流 |
| **IRM／DRM** | 授權使用者可以做什麼？ | 持久使用權限：view／copy／print／forward／expiration |
| **Encryption** | 未授權者能否讀懂？ | 機密性 |
| **Tokenization** | 能否用替代值降低暴露？ | 以 token 取代真值 |

```text
Discovery      = find
Classification = decide sensitivity
Label          = mark
DLP            = movement
IRM            = usage rights
```

**DLP 典型流程：** Discover → Inspect → Match／Classify → Monitor → Alert／Block。可部署於 endpoint、network 或 cloud／SaaS／CASB。**不要背「DLP 一定有 endpoint agent」**；stateful inspection 是防火牆思路，不是 DLP 核心。

**DLP 的法律邊界：**

```text
DLP 可以   → 協助 evidence collection / eDiscovery
DLP 不能   → 提供法庭 testimony、進行刑事起訴、直接執行 IP 權利
```

**Egress monitoring 在雲端的實際障礙（`by-test/11` D2 §3）：**

```text
Cloud workload
      |
      | egress
      v
Internet / external service
```

監控用途：exfiltration、C2、malicious upload、DLP、unauthorized outbound access。

| 障礙 | 說明 |
|---|---|
| limited visibility | 看不到底層封包或完整流量 |
| limited privileges | 客戶在共享環境中權限有限 |
| dynamic workloads | 執行個體會自動增減 |
| encryption | 內容被加密後無法檢查（見 §1.4 末段） |
| changing topology | 網路拓樸持續變動 |
| performance overhead | 全流量檢查的成本 |

> **EXCEPT 陷阱：redundancy／resilience 本身不是 egress monitoring 的主要障礙。**

**Discovery 的三種分析型態（`by-test/10` 下篇最完整）：**

| 分析型態 | 訊號來源 | 典型特徵 |
|---|---|---|
| **Content Analysis** | payload-derived | Keywords、Pattern matching／regex、**Frequency**、Entity recognition、Data fingerprinting |
| **Metadata Analysis** | metadata-derived | filename、owner、mime type、classification 欄位 |
| **Context Analysis** | environment／relationship-derived | parent folder、repository、user、device、tenant、geo location |
| **Inheritance** | context-based property propagation | **不是** content analysis |

**關鍵切法：** 「結果存在哪裡」≠「判斷是怎麼做出來的」。Inheritance 常把結果寫進 metadata，但判斷來源是父物件關係，不是讀 payload。

**同一原則的另一個案例：`PCI=true`（Representation ≠ Source）**

```text
Scanner → 讀取文件 payload → 找到大量信用卡號 → 設定 PCI=true
```

最終的 `PCI=true` **是一個 metadata 標籤**，但做出這個 classification 判斷的**來源是 content analysis**（讀了 payload）。

> **最短記：標籤是 Metadata；來源可能是 Content。**
>
> 題目問「這個分類是用哪種分析做出來的」→ 答 **content analysis**；問「`PCI=true` 本身是什麼」→ 答 **metadata**。兩個問法不要混。

**Frequency 為何算 content analysis：** 同一 pattern 出現 50,000 次與 1 次，對 classification 的意義不同 → payload-derived statistic。

### 1.3 儲存模型

| 類型 | 本質 | 不是什麼 |
|---|---|---|
| **Volume／Block** | **virtual block device presented like a physical disk**；邏輯掛載，實體位置可遠離 compute node | 不是 CDN |
| **Object** | object + metadata + identifier，多經 API 存取 | 不是區塊磁碟 |
| **File** | 共享 filesystem | |
| **CDN** | 把內容快取／派發到靠近使用者的位置 | 不是通用附加儲存區 |
| **Ephemeral** | 隨執行個體生命週期存在 | 不是長期保存 |
| **Raw** | 未格式化／直接磁碟存取 | 不要當萬用答案 |
| **Long-term** | 歸檔與長期保存 | 不是高效能區塊盤 |

**答題關鍵字（`daily/2026-09-25` LO `2.2`）：** 題幹出現 file、hierarchy、metadata → object；出現 attached drive、block → volume。

> **註（`daily/2026-09-26` 決議）：** 題庫寫法（hierarchy／filesystem ↔ object）與技術實況（object 多為 flat namespace）不一致，此關鍵字規則標記為 **Unresolved／待對照 OSG 與 CBK 確認**，不可當成絕對規則。

**題幹若描述「配置給使用者的邏輯儲存區，實體上不一定接在 compute node」，答案通常是 Volume storage。**

**PaaS 儲存：** 常為 provider 管理、customer application 存取的 database storage。

```text
Volume = Disk
File   = Filesystem hierarchy
Object = Key + Metadata + Object
```

| 類型 | 典型用途 |
|---|---|
| **Volume／Block** | OS disk、DB storage、高效能 block I/O（virtual disk、SAN LUN、cloud block volume） |
| **Object** | S3-style storage、images、backups、data lake、大量非結構化資料 |
| **File** | NFS／SMB／NAS 等共享階層式 filesystem。**注意：NAS／SMB 屬 File Storage，不是 Volume** |

> **note：** object store 的 key 如 `finance/2026/report.pdf` 看起來像階層，但多數 object store 本質是 **flat key namespace + prefixes**（與 §1.3 下方的 Unresolved 標記併讀）。有些產品能模擬 folder UX，但底層模型仍不同——**不是「特別設定之後就變成 traditional filesystem hierarchy」**。

**Object storage 的判準是模型，不是產品名：**

```text
判準 = object + metadata + key 的 flat namespace 模型
```

- **S3／MinIO** → object store。
- **MongoDB／GridFS** → 能存 binary／file，但**不等於被分類成 object storage**。「能放檔案」不是 object storage 的判準。

> 作答時先問「它的資料模型是 object + metadata + key 嗎？」，不要用產品是否能存檔案來判斷。

#### Block / File / Object 三者對照（`by-test/11` D2 §1）

| Type | Looks like | Access |
|---|---|---|
| **Block／Volume** | Disk | block device |
| **File** | Folder／share | NFS／SMB |
| **Object** | Object + metadata | API／HTTP |

Volume 在 guest OS 內的呈現：

```text
Physical storage pool
        |
Virtual volume
        |
      VM
        |
Guest OS sees:  /dev/sda   E:   disk
```

```text
Volume = virtual block device behaving like a disk
```

### 1.4 加密層級與金鑰管理

| Encryption Type | 引擎位置 | 主要邏輯 |
|---|---|---|
| **Application-level encryption** | 存取資料庫的 application | App 在資料進 DB 前就加密 |
| **TDE**（Transparent Database Encryption） | **Database／DBMS 層** | **由 DB／儲存層自動加密靜態資料，對 application 透明**（見下方判準） |
| **Volume／disk encryption** | Storage／volume 層 | 保護媒體／儲存 |
| **Transport encryption** | Network／session 層 | 保護傳輸中資料 |
| **KMS** | 金鑰生命週期管理 | 管 key，**不等於** encryption engine |
| **HSM** | 硬體金鑰保護 | 安全金鑰儲存與密碼運算 |

```text
Application → DBMS (TDE Engine) → Encrypted Data
                    ↕
            KMS (Key Management)
                    ↕
            HSM (Secure Storage)
```

| 名詞 | 判斷 |
|---|---|
| **BYOK** | Bring Your Own Key：客戶帶自己的 key 給 CSP 使用 |
| **HYOK** | Hold Your Own Key：客戶自己持有 key，CSP 不持有 |
| **Key rotation** | 定期換 key 降低暴露風險 |
| **Key escrow** | 第三方或受控方式保存 key |
| **Envelope encryption** | data key 加密資料，master key 加密 data key |

#### ⭐ TDE 的判準是「對 Application 透明」

```text
Application
    ↓  正常 SQL / Data（不呼叫 encrypt()）
Database Engine
    ↓  TDE
Encrypted Data Files
```

**判準：** 由**資料庫／儲存層自動加密靜態資料**，application 不需自己呼叫 `encrypt()`。

> **常見誤解：以「加密引擎與 DB 在同一個 host」作為 TDE 的判準——這不是 TDE 的核心。** 金鑰完全可以放在**外部 KMS／HSM**，所以「同一 host」不是判斷條件。
>
> 對照 §1.4 的粒度四選一：**「對 app 透明」→ TDE；「只加密特定 table／column／field」→ Application-level。**

#### Cryptographic key protection 原則（`by-test/13` Part 1 §1）

> **Cryptographic keys must be protected at least as strongly as the data they can decrypt.**

```text
Vault / KMS / HSM          = implementation mechanisms
Protection(Key) ≥ Protection(Data) = security principle
```

**為什麼：** 若 DB 是 AES-256 加密的 ciphertext，但 AES key 放在 world-readable 的 plaintext config file，AES-256 幾乎沒有意義——攻擊者取得 `Ciphertext + Key` 就能還原 plaintext。

**四選一秒答：** 選項若為 `In vaults`／`By armed guards`／`With two-person integrity`／**`At least as securely as the data they decrypt`**，選最後一個——其餘三者都是 context-dependent implementation。

**Key vault 的 blast radius：** 正確部署的 vault／KMS 本就應該比一般 DB 強。真正的風險是 **vault 被配置成與 DB 同一 trust boundary**：

```text
DB compromise
+ 同一組 admin credentials 可直接讀 Vault
+ Vault policy = allow secret/*
+ 長效 root/admin token
= Encryption 幾乎失去隔離價值
```

其他常見反模式：dev mode 上 production、root token 共用、application 可 export 所有 key、DB admin 兼 vault admin、未啟用 audit logging、unseal／recovery material 管理不良。

> 弱的不是 vault 技術本身，而是 **key-management control plane 被配置得太弱**。KEK／root-of-trust／master key 更應該做到 `Protection(Key) > Protection(Data)`。

#### Encryption 粒度四選一（`by-test/13` Part 1 §2 ⭐）

上表的 application-level／TDE／volume／transport 是**引擎位置**的切法；考試另有一組**保護範圍**的四選一：

| 題目看到 | 優先想到 |
|---|---|
| One particular **file** | **File-level encryption** |
| DB／storage encryption 對 app **transparent** | **Transparent／TDE** |
| Specific **table／column／field** | **Application-level encryption** |
| One cloud-storage **object** | **Object-level encryption** |

| 型態 | 範圍 | 說明 |
|---|---|---|
| **File-level** | 一個完整檔案 | `report.pdf → report.enc`；不是針對 DB schema |
| **TDE** | DB data files、tablespaces、transaction logs、backups | Application 不需知道 encryption 發生；主要解決 **data at rest** |
| **Application-level** | table／column／field | App 加密後才寫入 DB，DB 從頭拿到的就是 ciphertext；DB admin 可能也看不到 plaintext |
| **Object-level** | 單一 cloud-storage object | 典型是 S3／object storage bucket 內的個別物件，不是 relational table |

**Application-level 的代價：** application complexity、key management、indexing／search／query 困難。

> **Nuance：** 真實世界某些 DB 可把特定 table 放進 dedicated encrypted tablespace，因此 TDE 也能做到部分 selective protection。但 **CCSP 四選一**若題幹強調「application only needs to encrypt specific sensitive fields／tables」，仍優先 **Application-level encryption**。

**金鑰管理原則：**

```text
Key management separated from encrypted data = separation of duties
```

不要誤選：least privilege（限制存取但沒特別分離金鑰管理與資料使用）、two-person integrity（關鍵動作需兩人）、compartmentalization（分艙，非此題最佳標籤）。

**加密對 egress monitoring 的影響：** Egress monitoring 需要看到 outbound content；**加密會讓 egress inspection 困難或失效**，除非事先設計解密／檢查點。

### 1.5 資料保護技術

| 技術 | 用途 | 秒殺判斷 |
|---|---|---|
| **Data masking** | 產生遮蔽／不真實但類似的資料，用於測試、訓練、展示 | 問 best describes 時選最 general 的「similar but inauthentic dataset」 |
| **Dynamic masking** | 依角色即時遮蔽顯示，不改原資料 | production 查詢／role-based display |
| **Static masking** | 產生已遮蔽的資料副本 | non-production／testing |
| **Tokenization** | 用 token 替代真值，真值在 token vault | PCI DSS／cardholder data |
| **Encryption** | 用 key 轉成不可讀，**可逆** | confidentiality |
| **FPE** | Format-Preserving Encryption：保留格式的加密 | 仍像信用卡號 |
| **Redaction** | 文件中移除或塗黑敏感資訊 | 非結構化文件 |
| **Anonymization** | **永久**移除個人識別資訊 | 不可逆 |
| **Pseudonymization** | 替換識別資訊，**可能藉額外資訊還原** | 可逆 |
| **DRM** | 防止未授權複製、限制內容分發給付費／授權使用者 | 廣義 |
| **Enterprise DRM／IRM** | 企業文件與資訊權限控管 | DRM 的 B2B 子集 |
| **Bit splitting** | 資料分散，橫跨多地理位置 | **不是**權限管理 |

```text
Encryption   = reversible with key
Masking      = substitute / hide values
Tokenization = replace with token and map through vault
FPE          = encryption but preserves format
```

**DRM 的 trait：**

| Trait | 判斷 |
|---|---|
| **Persistence** | 權限跟著 object 走，不因複製、移動、改格式而消失 |
| Automatic expiration | 權限到期自動失效 |
| Limiting printing output | 限制列印，是**控制能力**，不是 persistence |
| Continuous audit trail | 持續記錄使用行為 |

> **一句話規則：** Rights follow the object = **Persistence**。

**Masking 最佳商業情境：** 使用者只需要**部分驗證**、不需要完整敏感值時最強。例：客服只需部分 SSN 驗證客戶身分。反例：出貨需要完整地址、HR 需要完整駕照資料。

**Tokenization 必要條件：** 需要保存 token ↔ original value 的 **mapping／token vault**。

#### ⭐ Data masking 的九種技術（`by-test/13` Part 1 §3）

上表是「masking vs 其他保護技術」的區分；這一組是 **masking 內部的 technique taxonomy**，建議直接背 terminology。

| 技術 | 做什麼 | 範例 |
|---|---|---|
| **Substitution** | 換成另一個合理值，保持 format／realism／可用性，但失去真實 identity | `Alice Wang → Mary Chen` |
| **Random substitution** | 從候選資料中隨機取值 | `Alice／Taipei → David／Kaohsiung` |
| **Algorithmic substitution** | 用演算法產生替代值，可做到 **deterministic consistency**（同一來源每次得到相同假值） | `123-45-6789 → 673-82-4107` |
| **Shuffling** | 把**同一欄**的真實值重新排列——值全是真的，但 person ↔ value 的對應被打破 | `Alice→70000, Bob→90000` 洗成 `Alice→90000, Bob→80000` |
| **Deletion／Nulling** | 直接拿掉敏感值 | `SSN = NULL` 或 `SSN = ""` |
| **Character scrambling** | 打亂字元順序或值，保留 length 與部分格式特徵 | `ABCDE12345 → D4A1E32BC5` |
| **Number variance** | 在合理範圍內加減，保留 distribution／統計可用性 | `Salary 100000 ±10% → 94,215` |
| **Masking-out** | 只顯示部分字元 | `4111111111111111 → ************1111` |
| **Algorithmic transformation** | deterministic 轉換成結構仍有效的值（與 algorithmic substitution 重疊） | — |

**必背清單（七項）：**

```text
Substitution
Shuffling
Deletion / Nulling
Character scrambling
Number variance
Masking-out
Algorithmic transformation
```

> **常見疑問：** 「Deletion 怎麼算 masking？」——在廣義的 test-data masking taxonomy 中，**nulling／deletion 確實被算成 masking technique**（confidentiality 最直接，但 data utility 最低）。

> **❌ 不是 masking technique：`Conflation`。** 它只是一般英文的「把兩個不同概念混為一談」（例如 conflating authentication with authorization），在題目中純屬 distractor。

#### Bit-splitting／Data dispersion（`by-test/13` Part 1 §4–§5）

核心：**將資料轉換／切成多個 fragment 分散保存，單一 fragment 不足以重建完整資料。**

```text
Original Data
      ↓
Split / Transform
      ↓
 ┌────┼────┬────┐
 F1   F2   F3   F4
 ↓    ↓    ↓    ↓
 A    B    C    D
```

可跨 storage nodes、providers、geographic regions。

**為什麼題庫說它像 RAID？** 共同概念是「資料分散在多個 storage component」，但目的不同：

| | **RAID** | **Secure data dispersion** |
|---|---|---|
| 主要目的 | availability、resilience、有時 performance | 另提供 **confidentiality benefit**、compromise isolation、provider／site diversity |

**不要理解成 `bit-splitting = RAID`。**

**跨 jurisdiction 的正確說法：** 題庫常說分散多 jurisdiction 會讓單一 jurisdiction 的執法 seizure 更複雜。其邏輯可以理解（只取得 Fragment A 無法 reconstruct），但**不要把「阻撓 law enforcement」當成 security objective 去背**。較好的 security model 是：

> **Compromise／seizure of one location does not yield the full dataset.**

#### AONT-RS（`by-test/13` Part 1 §7）

**All-or-Nothing Transform + Reed-Solomon：**

```text
Data → AONT transform → Reed-Solomon encoding → Multiple fragments → Distributed storage
```

沒有足夠 fragment 就無法有效 recovery。它屬於 **data transformation／dispersion**，**不是 quantum computing**（quantum 關鍵字見 [Domain 1 §1.8](../domain1-cloud-concepts/01-consolidated-lecture.md)）。

```text
Tokenization 不是 encryption；沒有 encryption engine，也不一定有 key。
PCI DSS 場景看到 tokenization → 降低 cardholder data exposure / compliance scope。
第三方 tokenization provider 可減少 merchant 的 PCI DSS burden，但 merchant 不等於完全沒有責任。
```

### 1.6 資料銷毀與殘餘資料

**先問一句話：Who controls the physical media?**

```text
自己控制實體媒體 + media retirement
        → Clear / Purge / Destroy（含 overwrite、物理銷毀）可行

雲端抽象 / 多租戶 / CSP 控制媒體
        → 無法保證實體 sector overwrite
        → cryptographic erasure（銷毀金鑰）+ provider process
        → 仍須考慮 replica、snapshot、backup
```

| 方法 | 說明 | 雲端可行性 |
|---|---|---|
| **Crypto-erasure** | 銷毀金鑰使資料不可讀 | ✅ 普遍可行 |
| **Overwriting** | 以新資料覆蓋 | ❌ 多租戶環境難保證 |
| **Physical destruction** | 破壞儲存媒體 | ❌ 客戶通常無法執行 |
| **Degaussing** | 磁場清除磁性媒體 | ❌ 客戶無法保證；對 SSD 不適用 |
| **Sanitization** | 泛稱，包含多種方法 | — |

**雲端難以覆寫的真正原因：邏輯資料位置難以確定（抽象化、多租戶、複製），不是「缺乏實體存取」也不是「主管機關不喜歡 overwrite」。**

**不要背：** physical destruction 永遠最好；crypto-shredding 永遠最好。兩者都要看 scenario。

### 1.7 密碼學基礎（含 PKI 與憑證）

完整推導見 `by-test/learnzapp/05-tls-pki-cryptography-lecture.md`；TLS 協定層面見 [Domain 3 彙整講義](../domain3-infrastructure/01-consolidated-lecture.md)。

#### 對稱 vs 非對稱

| | Symmetric | Asymmetric |
|---|---|---|
| 金鑰 | 同一把 shared secret | public／private key pair |
| 適用 | 大量資料、bulk encryption | 身分認證、金鑰建立、簽章 |
| 最大問題 | **Key distribution／establishment** | 運算成本高 |

**核心正確說法：** Symmetric cryptography requires **secure establishment／distribution of shared secret keying material**。OOB 是其中一種方法，DH／ECDH 是另一種建立方法——不要把「Passing keys out of band」當成 universal truth。

#### Key agreement vs key distribution

> **復現標記：** DH vs OOB 已在 `by-test/10` 上篇 B 與 `by-test/12` §12 連續出現，屬高頻考點。

| | **DH／ECDHE** | **OOB** |
|---|---|---|
| 類型 | Key **agreement** | Key **distribution／provisioning** |
| Secret 本身傳送？ | No | Yes |
| Public network 可用？ | Yes | 通常需另一可信 channel |
| Forward secrecy | DHE／ECDHE 可 | 通常沒有 |
| 本身提供 authentication？ | No | 視 OOB channel |

> **Patch rule：** Diffie-Hellman = key exchange／shared secret；RSA = encryption／signature scheme。

#### 簽章、雜湊、HMAC

| 機制 | 提供 | 不提供 |
|---|---|---|
| **Digital signature** | integrity、authenticity、non-repudiation | confidentiality |
| **Hash** | 偵測修改 | 無法證明是誰產生（任何人改完可重算） |
| **HMAC** | integrity + shared-secret authentication | 真正的 non-repudiation（雙方共享同一 secret） |

用語提醒：不要說「用 private key 加密」來形容簽章；CCSP 較安全的說法是 **sign with the private key、verify with the public key**。

**Hash vs Backup（`by-test/13` Part 2 §3B）：**

| | **Hash** | **Backup** |
|---|---|---|
| 回答什麼 | **Has this file／config changed?** | **Can I recover the data／system?** |
| 提供 | **Integrity** | **Availability／Recovery** |
| 典型用途 | integrity verification、baseline validation、configuration drift 偵測、forensic evidence checking | 還原資料與系統 |

```text
Approved config → SHA-256 → HASH-A
Current  config → SHA-256 → HASH-B
A != B → modification / drift
```

Baseline 與組態偏離的維運面見 [Domain 5 §1.2](../domain5-operations/01-consolidated-lecture.md)；鑑識面見 [Domain 6 §1.5](../domain6-legal-compliance/01-consolidated-lecture.md)。

> **Quantum computing** 關鍵字（superposition／qubit／entanglement）歸 [Domain 1 §1.8](../domain1-cloud-concepts/01-consolidated-lecture.md)。

#### PKI 與 X.509

```text
PKI = framework of policies, procedures, people, software, hardware, and cryptographic mechanisms
Purpose = secure communication and trust using public key cryptography
```

不要把 PKI 縮小成「只有 encryption algorithm」。

| 項目 | 重點 |
|---|---|
| **X.509 certificate** | 把 identity／subject 與 **public key** 綁在一起 |
| Certificate 裡有 private key 嗎？ | **不應有**；private key 絕不外洩 |
| **CA** | 依程序驗證 subject，並用 **CA private key** 簽署憑證 |
| 誰驗證 CA 簽章？ | Client 用 **CA public key** |
| **Chain of trust** | Root CA → Intermediate CA → server certificate |
| **憑證驗證要看** | 簽章／鏈、有效期、subject／hostname（SAN）、key usage、撤銷（CRL／OCSP） |
| **CRL vs OCSP** | CRL 下載撤銷清單；OCSP 詢問特定憑證狀態 |
| **Root CA 為何可信** | trust anchor，預先放在 OS／browser trust store |
| **Self-signed** | Subject = Issuer，密碼學上可驗簽，但缺外部第三方保證 |
| 憑證過期 | public key 數學上不會壞，但 PKI 驗證應拒絕（trust 與流程問題） |
| 只偷到公開憑證 | **無法**冒充伺服器，關鍵秘密是 private key |

**ECC：** Elliptic Curve Cryptography，以較小金鑰提供與傳統公鑰密碼相當的安全強度。

**Certificate ≠ KMS ≠ HSM：** Certificate 做身分與 public key 綁定；KMS 管金鑰生命週期；HSM 是硬體保護容器。

#### Cryptographic Entropy 與金鑰產生（來源：2026-10-10 D3 錯題補強）

**Entropy（熵）= 不可預測性。** 金鑰品質取決於產生鏈：

```text
Reliable entropy source
        ↓
CSPRNG / DRBG
        ↓
Unpredictable cryptographic keys
```

理想的 entropy 來源：hardware noise、processor RNG、jitter、operating-system entropy pool、validated entropy source，再經 CSPRNG／DRBG 產生金鑰。

**雲端／VM 的歷史問題與現代修正：**

| 題庫常見選項 | 歷史上的真實問題 | 現代判讀 |
|---|---|---|
| Virtualization | entropy starvation、cloned RNG state、identical startup state | **Virtualization 本身 ≠ weak entropy** |
| Uniform build | clone／identical initial state 可能造成 RNG state 重複 | 不是所有 uniform build 必然低 entropy |
| Lack of direct input devices | 舊 VM 缺 keyboard／mouse timing 與 device events | 現代 cloud 有更可靠的 entropy source |
| Social factors | 若人類行為（生日、`1234`、`0000` PIN、命名慣例、可預測排程）成為 input，分布高度偏斜 → effective entropy 降低 | 健全的 cryptographic RNG 不應主要依賴此類 input |

```text
User chooses PIN → 1234 / birthday / 0000 → distribution highly biased → effective entropy lower
```

> **規則：** Cloud／VM 不是天生低 entropy；真正的問題是 **entropy source 與 RNG design**。題庫把 `social factors` 當「不影響 entropy」的答案，本意大概是「social factors 不是典型 cloud RNG 技術限制」，但措辭過寬（見 §2.11）。

### 1.8 Archiving

| 關注點 | 說明 |
|---|---|
| **Data format／type** | 最關鍵：格式錯誤等同資料遺失 |
| **Key availability** | 加密封存必須保留可用金鑰 |
| **Media usability** | 媒體未來仍須可讀 |
| 實體埋深等物理條件 | **不是**核心資安考量 |

> **Patch rule：** Archive value depends on future recoverability. Wrong format can equal data loss.

#### ⭐ Backup vs Archive：primary purpose 的切法

> ## **Backup = Recover ／ Archive = Retain**

**Backup 的核心目的是 Recovery**——回答「資料或系統壞掉之後能不能恢復」，因此直接支援 availability、DR、operational recovery、RPO、RTO。

```text
Production → Backup → Failure → Restore → Production resumes
```

**Archive 的核心目的是 Long-term retention／preservation**——回答「這些資料現在不用，但未來為 legal／compliance／history 需要時能不能保留」。典型對象：old logs、historical records、legal records、compliance data。主要用途是 retention、compliance、historical preservation、evidence preservation。

**⭐ Archive ≠ restorable production environment。** 「archive」這個詞**完全沒有保證**：

```text
hot storage
fast retrieval
production-compatible format
完整 OS / app state
recent recovery point
automated restoration
```

因為 archive 可能是 tape、cold storage、Glacier-style storage、WORM archive 或 immutable log repository——這些甚至可能需要很久才能 retrieve。

| | **Backup** | **Archive** |
|---|---|---|
| Primary purpose | **Recovery** | **Retention** |
| Availability／DR | **強** | 不一定 |
| Historical records | 有 | **強** |
| Forensic usefulness | 有 | 有 |
| Fast production restore | 預期用途 | **不保證** |
| Long-term compliance retention | 次要 | **核心** |

#### Backup 與 Forensic Readiness

**Full backup 同時支援 operations 與 forensics。** 它保存了歷史 system state：

```text
Day 1 backup → Day 2 backup → Day 3 compromise → Day 4 backup
```

Investigator 可以比較 **known-good state vs compromised state**，進而 recover deleted artifacts、inspect 舊組態、比對 file states、建立 timeline、reconstruct environment。

```text
Regular Full Backup
├── Operations → Recovery
└── Forensics  → Historical state / data
```

**但 Backup ≠ 自動成為法庭證據。** Backup 是 **potential forensic source**，不是 automatically trustworthy／admissible evidence。仍需：

```text
Original / source preservation
+ Integrity verification / hashes
+ Chain of custody
+ Documentation
+ Access control
+ Timestamps
```

> **一句話：** Backup helps forensic readiness; **forensic process** establishes evidentiary integrity.（鑑識五要素見 [Domain 6 §1.5](../domain6-legal-compliance/01-consolidated-lecture.md)）

**反向情形：secure archive 對 forensics 可能比 backup 更強。** 若 archive 具備 immutable／WORM、hashes、timestamping、access control、audit logs、retention lock，它對 **evidence preservation** 可以非常好。所以題目若改問 `best for long-term preservation of forensic records?` → **secure archive** 可能優於 regular backup。

> **解題要點：** 題目問「同時改善 operations 與 forensic readiness」時選 **full backup**（兩者都是其標準用途）；問「long-term preservation of forensic records」時選 **secure archive**。不要為了讓 archive 也能快速還原而自行加入題幹沒說的架構假設——詳見 [README 的 argue 流程](../README.md)。

#### Encryption vs Mirroring：備份／封存的控制選擇（`by-test/10` 上篇 E、`by-test/12` §13）

題幹出現 `e-commerce + backup／archive` 時的推理鏈：

```text
Payment-card data
→ Stored backup
→ Data at rest
→ Confidentiality
→ Encryption
```

| 控制 | 回答什麼問題 |
|---|---|
| **Encryption** | Confidentiality of recoverable stored data |
| **Mirroring** | **Availability／aggressive RPO**（持續複製） |
| **Hashing** | One-way integrity／non-recoverable representation |

```text
Need recoverable protected backup?            → Encryption
Need near-zero RPO / continuous replication?  → Mirroring
```

**易錯點：** 看到「備份」就選 mirroring。Backup 不等於 continuous mirroring——mirroring 是由 RPO／availability 需求驅動的；若題幹強調的是**可回復且受保護的敏感資料**，正解是 encryption。

### 1.9 PCI DSS 資料處理

| 資料 | 規則 |
|---|---|
| **PAN** | 符合保護要求下**可以**儲存 |
| **CVV／CVC** | Sensitive authentication data，**授權後不可保留** |

PCI DSS 是 **industry security standard**，不是政府 statute／regulation 本身。

**Merchant tiers：** 所有適用的 merchant 都必須符合 PCI DSS；**merchant level 影響的是 validation／reporting 的方法與 rigor**（Level 1 的 ROC by QSA＋AOC vs Level 2–4 的 SAQ），而且 level 由 payment brands／acquirers 定義。不要背「不同 tier 有不同 control sets」或「tier 越高只是 audit 數量較多」——完整說明見 [Domain 6 §1.1](../domain6-legal-compliance/01-consolidated-lecture.md)。

> 智慧財產權（copyright／patent／trademark／trade secret）雖在部分測驗講義中被歸到 D2，完整整理見 [Domain 6 彙整講義](../domain6-legal-compliance/01-consolidated-lecture.md)。

### 1.10 Virtualization vs Multitenancy

兩者常被混用，但回答的是**不同問題**。

| | **Virtualization** | **Multitenancy** |
|---|---|---|
| 回答什麼 | How resources／data are **abstracted** | **Who shares** infrastructure |
| 本質 | abstraction／transformation | shared infrastructure |
| 主要影響 | 資料改變 representation／container，**classification 必須跟著資料走** | isolation、co-residency、leakage、shared resource |

**Virtualization 造成的資料轉形鏈：**

```text
file → VM disk → snapshot → image → backup → object
```

每一次轉形都換了容器與呈現方式，但敏感度不變——所以 classification 與對應控制必須一路跟著。

**Multitenancy 的結構：**

```text
Host
├ Tenant A
├ Tenant B
└ Tenant C
```

> **共享層級的邊界：** multitenancy 指多個 tenant 共用**同一個 logical platform／infrastructure**，**不要求一定落在同一台 physical host**。上圖只是最常見的一種實作，不是定義。

```text
Virtualization = abstraction / transformation
Multitenancy   = shared infrastructure
```

### 1.11 Two-Person Integrity 與相關控制

**TPI（Two-Person Integrity）：** 敏感操作不能由單一人員完成，至少兩位 authorized individuals 共同參與。

**TPI 的 threat model（容易答錯的部分）：** 它防的是

```text
叛變 / rogue insider
帳號被攻陷
被脅迫
單人誤操作
unilateral control
```

> **更精確的說法不是一般 availability 的「SPOF」，而是 `single point of control／single-person compromise`。** 把 TPI 答成「避免單點故障」會落在錯誤的維度上——TPI 處理的是**控制權集中**，不是可用性。

```text
Admin A ----\
             > HSM key operation
Admin B ----/
```

四個容易混用的控制必須一次切清：

| 控制 | 機制 | 範例 |
|---|---|---|
| **Separation of Duties（SoD）** | 不同 duties 給不同人 | `Alice requests → Bob approves → Carol executes` |
| **TPI／Dual Control** | **同一**敏感操作需要兩人 | `Alice + Bob → key export` |
| **Split Knowledge** | 每個人只知道 secret 的一部分 | `Alice → share A`；`Bob → share B`；`A + B → complete key` |
| **M-of-N** | 門檻式控制 | 3-of-5 custodians required |

```text
SoD                = divide responsibilities
TPI / Dual Control = two people required
Split Knowledge    = nobody knows full secret
M-of-N             = threshold control
```

> 對照：`by-test/06` P0-2 的金鑰管理題中，**separation of duties** 是「金鑰管理與被加密資料分離」的正解標籤；two-person integrity 則是「關鍵動作需兩人」的標籤。兩者不可互換（見 §1.4 的誤選對照表）。

**SoD 分離的對象是 authority／functions，不是元件：**

```text
SoD                              = 分離職權與職能
單純把元件／系統拆開             = segmentation / compartmentalization
```

把資料庫與應用拆成兩台機器並不構成 SoD；要看的是**誰有權做什麼**是否被拆開。這與 §1.4 誤選對照表中「compartmentalization 不是金鑰／資料職責分離的最佳標籤」是同一個邊界。

**Dual Control 不是 lost-device control（來源：2026-10-10 D3 錯題補強）：** 遠端存取裝置已遺失、遭竊、無法實體取回時，優先控制是**遠端鎖定／停用／清除**：

```text
remote disable / remote lock / remote wipe
revoke device certificate
revoke session / token
```

```text
Lost / stolen endpoint             → remote disable / wipe
Sensitive action requires two people → Dual Control / TPI
```

TPI／Dual Control 回答的是「某個敏感操作（例如 HSM master-key operation）是否需要兩名 custodian 共同參與」，與「laptop 被偷」不是同一個問題。

---

## 2. 錯題與修正規則 / Errors & Corrections

### 2.1 DRM trait 混淆（`by-test/02` Q1）

題意：DRM access rights follow the object, regardless of form／location。正解 **Persistence**，誤選 Limiting printing output。錯因：把 DRM 的一般功能與特定 trait 混在一起。

### 2.2 Data discovery 場景誤選 Big data（`by-test/02` Q2）

電商依顧客當下與過去行為預測需求 → 正解 **Real-time analytics**，誤選 Big data。錯因：看到大量資料分析就選 Big data，但題目強調 reactive／predictive／current behavior。

> Big data = 大量、多樣、高速的資料集合與處理框架；Real-time analytics = 依當下行為即時反應。

### 2.3 雲端資料銷毀困難的原因（`by-test/02` Q12）

正解 **Cloud is often a multitenant environment**，誤選「vendor 禁止客戶銷毀資料」。錯因：把架構問題誤解為 vendor policy。

### 2.4 Egress monitoring EXCEPT（`by-test/02` Q14）

正解 **Access control**，誤選 data categorization／classification。

| 功能 | Egress monitoring 是否支援 |
|---|---|
| Data loss detection | 支援 |
| eDiscovery／forensics | 可支援 |
| Data categorization／classification | 可輔助 |
| **Access control** | **不支援** |

> Egress monitoring observes outbound flow; it does not grant or deny access。

**另一個 EXCEPT 變體（`by-test/11` D2 §3）：** 問「雲端 egress monitoring 的主要障礙，except」時，正解是 **redundancy／resilience**——它不是監控障礙。其餘六項障礙見 §1.2。

### 2.5 Classification 的 lifecycle phase（`by-test/02` Q15、`lz04` Q1）

正解 **Create**，誤選 Store。錯因：把分類標籤視為儲存時治理。後續 encryption、access control、DLP、retention、sharing restriction、destruction 都可能依賴 classification。

### 2.6 TDE 引擎位置（`by-test/03` Q25、`by-test/07` §7.4）

正解：引擎位於 **database／DBMS 層**。KMS 管金鑰、HSM 保護金鑰，**兩者都不是 TDE 引擎**。

### 2.7 Masking 與 Tokenization 定義不穩（`by-test/04` §6.1–6.2、`by-test/08` P0-2）

- 「哪個不是 encryption 的例子」→ **data masking 不是 encryption**。
- Tokenization 正常運作需要 **token mapping／token vault**。
- Masking 不只是 hide PII，那只是其中一種效果。

### 2.8 EXCEPT／NOT 題型失分（`by-test/06` P0-5）

多題錯在選了「正確敘述」而不是「例外項」。

**強制流程：**

```text
NORMAL  = 選正確／最佳答案
EXCEPT  = 選不屬於該類別的項目
NOT     = 選否定情形
PRIMARY = 選主要驅動因素
BEST    = 選最完整／最適當的答案
```

處理 EXCEPT：① 先辨識類別 → ② 刪去所有符合類別者 → ③ 剩下的就是答案。看到 `EXCEPT／NOT／LEAST／BEST／PRIMARY` 時**強制停頓兩秒**再作答。

### 2.9 Symmetric encryption 題庫用語過度絕對（`by-test/10` 上篇 B）

題庫：`Symmetric encryption involves passing keys out of band`。標記 `[Q]`——OOB 只是一種方法。正確知識見 §1.7。

### 2.10 Dashboard 在 data discovery 脈絡的風險（`daily/2026-09-25` LO `2.4`）

此處 dashboard 指給管理層看的內部圖表，把 discovery 結果整理成圖形供決策。**風險是底下的人為了讓數字好看而美化畫面（例如 no red），主管因此下錯決策**，不是把 dashboard 當成對外公告欄＝disclosure。

> 標記為 **Disputed**，只記用語對應，不當成已結案知識。

### 2.11 Cloud key-generation entropy（2026-10-10 D3 錯題補強，`[Q]` 中高降權）

題庫：`No social factors` 不影響 entropy，其餘 virtualization、uniform build、lack of direct input devices 皆為 cloud 環境的 entropy 問題。題目問題：`social factors` 定義過廣（人類選擇的 input 確實會降低 effective entropy）；virtualization 與 uniform build 的暗示過於絕對，帶有較舊的 VM entropy mental model。處理：知道題庫期待的答案，但保留現代模型——**key quality 依賴 reliable entropy source ＋ strong CSPRNG／DRBG**。詳見 §1.7。

### 2.12 遺失／遭竊 remote device 的控制（2026-10-10 D3 錯題補強，`[Q]` 中度降權）

題幹 `technique used to attenuate risks ... resulting in loss or theft of a device` 文法上把因果寫反（讀起來像「技術導致裝置遺失」）；應為 `mitigate risks resulting from the loss or theft of a remote-access device`。題目措辭差，但**底層概念照學**：lost／stolen → remote lock／disable／wipe、revoke certificate／session；Dual Control 是干擾選項。詳見 §1.11。

---

## 3. 一句話規則表 / One-liner Rules

| # | 規則 |
|---|---|
| 1 | Create → Store → Use → Share → Archive → Destroy；Share 的前一階段是 **Use**。 |
| 2 | Control ≠ lifecycle phase（Encrypt／Protect／Validate 都是 control）。 |
| 3 | Classification 從 **Create** 開始，並驅動後續所有控制。 |
| 4 | Archive 支援 retention、compliance 與 recovery／BCDR；Backup 是為了還原。 |
| 5 | Processing 包含 storing、printing、destroying、using；**Viewing 是被動**，常是例外選項。 |
| 6 | Virtualization 會轉形資料的型態與位置，可能影響 classification。 |
| 7 | 雲端 overwrite 不可靠的主因是**邏輯資料位置難以確定**。 |
| 8 | Crypto-erasure 在雲端通常比 physical destruction 或 overwrite 可行。 |
| 9 | 銷毀題先問 **Who controls the physical media?** |
| 10 | Application-level 加密引擎在 application；**TDE 引擎在 DB／DBMS 層**。 |
| 11 | KMS 管金鑰，不是加密引擎；HSM 以硬體保護金鑰。 |
| 12 | 金鑰管理與被加密資料分離 = **separation of duties**。 |
| 13 | Egress monitoring 需要看得到內容；**加密會擋住內容檢查**。 |
| 14 | DLP = movement；IRM = usage rights；Discovery = find；Classification = decide sensitivity。 |
| 15 | DLP 支援 evidence collection，但不提供 testimony、不做起訴。 |
| 16 | Keywords、pattern matching、**frequency** 屬 content analysis；**inheritance 不屬於**。 |
| 17 | Masking 用於只需部分驗證的情境（客服看部分 SSN 是經典案例）。 |
| 18 | Tokenization 需要 token vault／mapping，且不是 encryption。 |
| 19 | Anonymization 永久不可逆；Pseudonymization 可藉額外資訊還原。 |
| 20 | Rights follow the object = DRM 的 **Persistence**。 |
| 21 | Volume ≠ Object ≠ CDN；CDN 不是通用附加儲存區。 |
| 22 | Archive 的最關鍵要素是 **format／type**，其次是金鑰可用性與媒體可讀性。 |
| 23 | Symmetric 需要安全建立 shared secret；OOB 只是方法之一。 |
| 24 | DH 是 key agreement（secret 不上網路）；OOB 是 key distribution（secret 本身被傳送）。 |
| 25 | Certificate 綁 identity 與 **public key**；憑證裡不放 private key。 |
| 26 | CA 用 **private key** 簽憑證，client 用 **CA public key** 驗證。 |
| 27 | Digital signature 提供 integrity／authenticity／non-repudiation，**不提供 confidentiality**。 |
| 28 | HMAC 因雙方共享 secret，通常不提供真正的 non-repudiation。 |
| 29 | PAN 可在保護下儲存；**CVV／CVC 授權後不得保留**。 |
| 30 | 看到 EXCEPT／NOT／LEAST／BEST／PRIMARY 先停兩秒，再用刪去法。 |
| 31 | Volume = virtual block device behaving like a disk；Block 看 disk、File 看 share、Object 看 API。 |
| 32 | Virtualization 回答「如何被抽象」；Multitenancy 回答「誰共用基礎架構」。 |
| 33 | 資料經 file→snapshot→image→backup 轉形後，classification 必須跟著走。 |
| 34 | Multitenancy 的核心風險是 isolation、co-residency、leakage、shared resource。 |
| 35 | 雲端 egress monitoring 的障礙是可視性／權限／動態負載／加密／拓樸／效能，**不是** redundancy。 |
| 36 | SoD 分責任；TPI／Dual Control 同一動作要兩人；Split Knowledge 沒人知道完整 secret；M-of-N 是門檻。 |
| 37 | **可回復且受保護的敏感備份 → Encryption；近零 RPO／持續複製 → Mirroring。** |
| 38 | Backup 不等於 continuous mirroring；mirroring 由 RPO／availability 驅動。 |
| 39 | **Cryptographic keys 必須被保護得至少和它們能解密的資料一樣強。** |
| 40 | Vault／KMS／HSM 是 implementation；`Protection(Key) ≥ Protection(Data)` 才是原則。 |
| 41 | Vault 的真正風險是被配置成與 DB 同一 trust boundary，不是技術本身弱。 |
| 42 | 保護範圍四選一：file → File-level；transparent → TDE；table/column/field → **Application-level**；cloud object → Object-level。 |
| 43 | Masking 技術七項：substitution、shuffling、deletion/nulling、character scrambling、number variance、masking-out、algorithmic transformation。 |
| 44 | Shuffling 的值都是真的，被打破的是 person ↔ value 的對應。 |
| 45 | Nulling／deletion 算 masking；**Conflation 不是** masking technique。 |
| 46 | Bit-splitting：單一 fragment 不足以重建；正確 security model 是「單一地點被取得不會洩漏完整資料集」。 |
| 47 | RAID 偏 availability；secure dispersion 另有 confidentiality 與 compromise isolation。 |
| 48 | AONT-RS = All-or-Nothing Transform + Reed-Solomon，屬 dispersion，不是 quantum。 |
| 49 | **Hash 回答 has this changed（integrity）；Backup 回答 can I recover（availability）。** |
| 50 | Volume = Disk；File = Filesystem hierarchy；Object = Key + Metadata + Object。 |
| 51 | **Object storage 的判準是 object + metadata + key 的 flat namespace 模型，不是「能不能存檔案」。** |
| 52 | S3／MinIO 是 object store；MongoDB／GridFS 能存 binary 但不被分類為 object storage。 |
| 53 | Multitenancy 共用的是 **logical platform／infrastructure**，不要求同一台 physical host。 |
| 54 | **SoD 分離的是 authority／functions**；單純拆開元件只是 segmentation／compartmentalization。 |
| 55 | **Backup = Recover；Archive = Retain。** |
| 56 | Archive 不保證 hot storage、fast retrieval 或 production-compatible format——它可能是 tape／cold／WORM。 |
| 57 | **Archive ≠ restorable production environment。** |
| 58 | Full backup 同時支援 operations（recovery）與 forensics（歷史 system state 比對）。 |
| 59 | **Backup 是 potential forensic source，不是自動可採的證據**——仍需 hash、chain of custody、documentation。 |
| 60 | 問「long-term preservation of forensic records」時，具 WORM／hash／retention lock 的 **secure archive** 可能優於 backup。 |
| 61 | 所有適用 merchant 都須符合 PCI DSS；**merchant tier 影響 validation／reporting rigor，不是 control sets**。 |
| 62 | **Controlled sharing（authenticated／authorized／limited dataset）≠ public disclosure（anyone can access）。** |
| 63 | 第三方存取不等於公開存取；雲端協作風險要對準「送出傳統環境邊界」。 |
| 64 | **NAS／SMB 屬 File Storage，不是 Volume。** |
| 65 | **TPI 防的是 single point of control／single-person compromise**，不是 availability 的 SPOF。 |
| 66 | TPI 可防叛變、帳號被攻陷、被脅迫、單人誤操作與 unilateral control。 |
| 67 | **TDE 的判準是「對 application 透明」，不是「加密引擎與 DB 同一 host」。** |
| 68 | TDE 的金鑰可以放在外部 KMS／HSM——host 位置不是判斷條件。 |
| 69 | **`PCI=true` 標籤是 metadata，但判斷來源是 content analysis**——標籤是 Metadata；來源可能是 Content。 |
| 70 | **Key quality = reliable entropy source ＋ strong CSPRNG／DRBG**；VM 不是天生低 entropy。 |
| 71 | 人類選擇的 input（生日、`1234`）會降低 effective entropy；健全 RNG 不依賴這類 input。 |
| 72 | **Lost／stolen device → remote lock／disable／wipe ＋ revoke certificate／session**；不是 Dual Control。 |

---

## 4. 易混淆邊界 / Confusable Boundaries

| A | B | 切法 |
|---|---|---|
| Metadata | Label | 自動描述 vs 刻意標記 |
| Classification | Discovery | 決定敏感度 vs 找出資料 |
| DLP | IRM／DRM | 資料往哪去 vs 授權者能做什麼 |
| DLP | Access control | 監控移動 vs 允許／拒絕存取 |
| Content analysis | Inheritance | 讀 payload vs 物件關係傳播 |
| Encryption | Masking | 可逆帶 key vs 替換／隱藏 |
| Encryption | Tokenization | 密碼運算 vs vault 映射 |
| Anonymization | Pseudonymization | 永久不可逆 vs 可還原 |
| TDE | KMS／HSM | 加密引擎 vs 金鑰管理／硬體保護 |
| BYOK | HYOK | 帶 key 給 CSP vs 自己持有 CSP 不持有 |
| Volume storage | Object storage | attached disk／block vs object + metadata + API |
| Volume storage | CDN | 通用儲存 vs 內容快取派送 |
| Archive | Backup | 長期保存與合規 vs 還原能力 |
| DH／ECDHE | OOB | key agreement vs key distribution |
| ECDSA | ECDHE | 數位簽章 vs 金鑰建立 |
| Digital signature | HMAC | 非對稱、可不可否認 vs 對稱、雙方共享 |
| Hash | Encryption | 單向偵測修改 vs 可逆機密性 |
| DRM | Bit splitting | 權限管理 vs 資料分散儲存 |
| Virtualization | Multitenancy | 抽象與轉形 vs 共用基礎架構 |
| SoD | TPI／Dual Control | 不同人做不同事 vs 同一件事要兩人 |
| TPI | Split Knowledge | 多人共同執行 vs 每人只有部分 secret |
| Split Knowledge | M-of-N | 需全部拼齊 vs 達到門檻即可 |
| Block storage | File storage | block device vs NFS／SMB 共享 |
| Encryption（備份） | Mirroring | 機密性 vs 可用性與 RPO |
| Backup | Archive | Recovery（primary） vs Retention（primary） |
| Backup 的 forensic 價值 | 可採證據 | potential forensic source vs 需經鑑識流程建立完整性 |
| Controlled sharing | Public disclosure | 已驗證授權的有限資料集 vs 任何人皆可存取 |
| NAS／SMB | Volume／Block | File storage（共享檔案系統） vs 區塊裝置 |
| TPI 的 single point of control | Availability 的 SPOF | 控制權集中 vs 可用性單點故障 |
| TDE（對 app 透明） | Application-level（選欄位） | 誰負責呼叫加密 vs 加密粒度 |
| 分類結果的載體 | 分類判斷的來源 | metadata 標籤 vs content／metadata／context 分析 |
| File-level | Object-level | 檔案系統中的檔案 vs 物件儲存中的物件 |
| TDE | Application-level | 對 app 透明、保護 DB 檔案 vs app 先加密、可選欄位 |
| Substitution | Shuffling | 換成不存在的假值 vs 重排既有真值 |
| Algorithmic substitution | Random substitution | deterministic 一致 vs 每次隨機 |
| Masking-out | Character scrambling | 遮住部分字元 vs 打亂全部字元 |
| Number variance | Nulling | 保留統計分布 vs 完全移除 |
| Bit-splitting | RAID | 另含機密性與 compromise isolation vs 偏可用性 |
| AONT-RS | Quantum computing | 資料轉換與分散 vs superposition／qubit |
| Hash | Backup | 完整性驗證 vs 可回復性 |
| Object storage | 能存檔案的資料庫 | flat key + metadata 模型 vs 僅具備存 binary 的能力 |
| Multitenancy | 同一 physical host | 共用邏輯平台 vs 共用實體主機（非定義） |
| SoD | Segmentation／Compartmentalization | 分離職權與職能 vs 分離元件或資訊分艙 |
| Remote wipe／disable | Dual Control | 裝置遺失後保護其上資料 vs 同一敏感操作需兩人 |
| Entropy source | CSPRNG／DRBG | 提供不可預測的原始輸入 vs 由種子產生密碼學強度的亂數 |

---

## 5. 補強演練 / Drills

### Drill A：60 分鐘急救補弱

| 時間 | 任務 |
|---|---|
| 0–8 min | 讀完 §3 的 30 條一句話規則 |
| 8–20 min | 生命週期：archive／processing／overwriting／virtualization |
| 20–32 min | 加密層級：app-level、TDE、KMS、HSM、金鑰分離 |
| 32–44 min | DLP／discovery／masking |
| 44–52 min | 加密與銷毀方法對照 |
| 52–60 min | 10 題口頭自測 |

### Drill B：2 小時完整補弱

| 時間 | 任務 |
|---|---|
| 0–20 min | 生命週期與銷毀複習 |
| 20–40 min | 加密層級比較 |
| 40–60 min | DLP／masking／discovery |
| 60–75 min | 密碼學與 PKI（§1.7） |
| 75–105 min | D2 drill 25 題 |
| 105–120 min | 錯題規則萃取 |

### Drill C：閉卷自測（10 題）

1. 除了法規遵循外，archiving 常與哪個業務職能綁在一起？
2. Application-level encryption 的引擎在哪裡？
3. 哪個原則要求金鑰管理與被加密資料分離？
4. DLP 可以協助哪一項法律任務？
5. Masking 的最佳商業案例是什麼？
6. 為什麼雲端儲存難以 overwrite？
7. 下列哪個不是 content analysis：keyword、pattern matching、frequency、inheritance？
8. PII 情境中，哪一項最不算 processing：storing、viewing、destroying、printing？
9. 哪個雲端特性會因資料轉形而影響 classification？
10. TLS application traffic 用哪種加密保護？

**參考答案：** ① BC/DR ② 存取資料庫的 application ③ Separation of duties ④ Evidence collection ⑤ 客服看部分 SSN ⑥ 邏輯資料位置難以確定 ⑦ Inheritance ⑧ Viewing ⑨ Virtualization ⑩ Symmetric AEAD（不是憑證直接加密）

### Drill D：閉卷 KPI（terminology precision）

下列三題只要能用**定義**而非舉例回答，就算這一塊補完：

1. Object storage 的判準是什麼？（答模型，不要答產品名）
2. Multitenancy 共用的是哪一層？物理主機是必要條件嗎？
3. SoD 分離的對象是什麼？把元件拆開算不算 SoD？

### Drill E：維持節奏

每週 15–25 題 D2 mixed drill，**重點看錯題，而不是追新題量**。D2 權重最高，不可視為已補完。
