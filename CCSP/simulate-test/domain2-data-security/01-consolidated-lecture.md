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

**Processing vs Viewing（PII 題）：** Processing 包含 storing、printing、destroying、using；**Viewing 是被動接收**，在考題用語中常是 processing 的例外。

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

**Discovery 的三種分析型態（`by-test/10` 下篇最完整）：**

| 分析型態 | 訊號來源 | 典型特徵 |
|---|---|---|
| **Content Analysis** | payload-derived | Keywords、Pattern matching／regex、**Frequency**、Entity recognition、Data fingerprinting |
| **Metadata Analysis** | metadata-derived | filename、owner、mime type、classification 欄位 |
| **Context Analysis** | environment／relationship-derived | parent folder、repository、user、device、tenant、geo location |
| **Inheritance** | context-based property propagation | **不是** content analysis |

**關鍵切法：** 「結果存在哪裡」≠「判斷是怎麼做出來的」。Inheritance 常把結果寫進 metadata，但判斷來源是父物件關係，不是讀 payload。

**Frequency 為何算 content analysis：** 同一 pattern 出現 50,000 次與 1 次，對 classification 的意義不同 → payload-derived statistic。

### 1.3 儲存模型

| 類型 | 本質 | 不是什麼 |
|---|---|---|
| **Volume／Block** | 對 VM／主機呈現為 disk／volume；邏輯掛載，實體位置可遠離 compute node | 不是 CDN |
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

### 1.4 加密層級與金鑰管理

| Encryption Type | 引擎位置 | 主要邏輯 |
|---|---|---|
| **Application-level encryption** | 存取資料庫的 application | App 在資料進 DB 前就加密 |
| **TDE**（Transparent Database Encryption） | **Database／DBMS 層** | DB 透明加密 |
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

### 1.8 Archiving

| 關注點 | 說明 |
|---|---|
| **Data format／type** | 最關鍵：格式錯誤等同資料遺失 |
| **Key availability** | 加密封存必須保留可用金鑰 |
| **Media usability** | 媒體未來仍須可讀 |
| 實體埋深等物理條件 | **不是**核心資安考量 |

> **Patch rule：** Archive value depends on future recoverability. Wrong format can equal data loss.

### 1.9 PCI DSS 資料處理

| 資料 | 規則 |
|---|---|
| **PAN** | 符合保護要求下**可以**儲存 |
| **CVV／CVC** | Sensitive authentication data，**授權後不可保留** |

PCI DSS 是 **industry security standard**，不是政府 statute／regulation 本身。

> 智慧財產權（copyright／patent／trademark／trade secret）雖在部分測驗講義中被歸到 D2，完整整理見 [Domain 6 彙整講義](../domain6-legal-compliance/01-consolidated-lecture.md)。

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

### Drill D：維持節奏

每週 15–25 題 D2 mixed drill，**重點看錯題，而不是追新題量**。D2 權重最高，不可視為已補完。
