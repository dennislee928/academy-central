# CCSP 模擬測驗資料夾 / simulate-test

本資料夾以 **CCSP 六大 Domain** 為主軸組織。複習時讀 `domainN-*/`；查出處、分數與進度時讀 `by-test/` 與 `daily/`。

---

## 目錄結構

```
simulate-test/
├── README.md                          ← 本檔：歸類索引與維護規則
├── domain1-cloud-concepts/            ← D1 彙整講義（複習主體）
├── domain2-data-security/             ← D2
├── domain3-infrastructure/            ← D3（另含 02-airflow-diagrams.md 圖解補充）
├── domain4-application/               ← D4
├── domain5-operations/                ← D5
├── domain6-legal-compliance/          ← D6
├── by-test/                           ← 原始測驗講義封存（出處與分數紀錄）
│   ├── 01 ~ 13-*-weakness-lecture.md
│   └── learnzapp/01 ~ 05-*-lecture.md
├── daily/                             ← 每日整理（時間軸紀錄）
└── flash card/                        ← Knowt 匯入用閃卡（分域 TSV）
```

---

## 六大 Domain 彙整講義

| Domain | 權重 | 檔案 | 主要內容 |
|---|---:|---|---|
| **D1** Cloud Concepts, Architecture and Design | 17% | [`domain1-cloud-concepts/01-consolidated-lecture.md`](domain1-cloud-concepts/01-consolidated-lecture.md) | service／deployment model、cloud actors、interoperability／portability／lock-out、虛擬化與 hypervisor |
| **D2** Cloud Data Security | 20% | [`domain2-data-security/01-consolidated-lecture.md`](domain2-data-security/01-consolidated-lecture.md) | 資料生命週期、治理工具邊界、儲存模型、加密層級與金鑰管理、資料保護技術、銷毀、密碼學與 PKI、archiving、PCI DSS |
| **D3** Cloud Platform & Infrastructure Security | 17% | [`domain3-infrastructure/01-consolidated-lecture.md`](domain3-infrastructure/01-consolidated-lecture.md) | 機房設施與 Uptime Tier、實體存取分層、網路與儲存架構、虛擬化與容器、責任邊界、BC/DR、監控可視性 |
| **D4** Cloud Application Security | 16% | [`domain4-application/01-consolidated-lecture.md`](domain4-application/01-consolidated-lecture.md) | ISC2 最佳解邏輯、Secure SDLC、應用測試、SOAP/REST/API、身分與 federation、雲端應用風險 |
| **D5** Cloud Security Operations | 17% | [`domain5-operations/01-consolidated-lecture.md`](domain5-operations/01-consolidated-lecture.md) | 維運生命週期、baseline 與組態管理、patch management、maintenance mode、日誌與監控、incident、responsibility vs accountability、cloud sprawl |
| **D6** Legal, Risk and Compliance | 13% | [`domain6-legal-compliance/01-consolidated-lecture.md`](domain6-legal-compliance/01-consolidated-lecture.md) | 法規與標準、SOC 報告、OECD 原則、隱私角色與跨境傳輸、法律流程與鑑識、合約治理、IP、風險管理 |

**域內補充檔：** [`domain3-infrastructure/02-airflow-diagrams.md`](domain3-infrastructure/02-airflow-diagrams.md) — 資料中心氣流的 Mermaid 圖解（server 氣流、cold／hot aisle 配置、錯誤配置、熱風回流後果鏈、完整機列配置）。文字版規則在 D3 §1.1。

**外部速查表：** [`CCSP/domain6-legal-framework-reference.md`](../domain6-legal-framework-reference.md) — Domain 6 法律、法規與框架總表（A–M 分區、Legacy／題庫陷阱表、trigger word 索引）。放在 `CCSP/` 根層而非本資料夾，因為它是跨講義的考前速查表；完整推導與錯題脈絡仍在 D6 彙整講義。

每份彙整講義的固定骨架：

```text
§0 來源對照 / Source Map
§1 核心觀念 / Core Concepts
§2 錯題與修正規則 / Errors & Corrections
§3 一句話規則表 / One-liner Rules
§4 易混淆邊界 / Confusable Boundaries
§5 補強演練 / Drills
```

---

## 來源 → Domain 對應總表

`by-test/` 內每份原始講義的內容分別流向哪些 domain：

| 來源檔 | D1 | D2 | D3 | D4 | D5 | D6 |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| `by-test/01-assessment-test-weakness-lecture.md` | ✅ | ✅ | | | | ✅ |
| `by-test/02-custom-test-1-weakness-lecture.md` | ✅ | ✅ | | | | ✅ |
| `by-test/03-custom-test-2-weakness-lecture.md` | ✅ | ✅ | ✅ | | ✅ | ✅ |
| `by-test/04-practice-test-1-weakness-lecture.md` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `by-test/05-d3-drill-1-weakness-lecture.md` | | | ✅ | | | |
| `by-test/06-d2-drill-1-weakness-lecture.md` | | ✅ | ✅ | | | ✅ |
| `by-test/07-practice-test-2-weakness-lecture.md` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `by-test/08-d4-drill-1-weakness-lecture.md` | | ✅ | | ✅ | | ✅ |
| `by-test/09-practice-test-3-weakness-lecture.md` | ✅ | | ✅ | ✅ | ✅ | ✅ |
| `by-test/10-drill-2026-09-30-weakness-lecture.md` | | ✅ | ✅ | | ✅ | ✅ |
| `by-test/11-drill-2026-10-01-weakness-lecture.md` | ✅ | ✅ | ✅ | | ✅ | ✅ |
| `by-test/12-d5-drill-2026-10-02-weakness-lecture.md` | | ✅ | ✅ | | ✅ | |
| `by-test/13-d2-d6-drill-2026-10-03-weakness-lecture.md` | ✅ | ✅ | | | | ✅ |
| `by-test/learnzapp/01-d3-d4-architecture-and-boundaries-lecture.md` | | | ✅ | ✅ | | |
| `by-test/learnzapp/02-d5-d6-operations-monitoring-compliance-lecture.md` | | | | | ✅ | ✅ |
| `by-test/learnzapp/03-d5-operations-and-d2-data-security-lecture.md` | | ✅ | | | ✅ | |
| `by-test/learnzapp/04-two-day-error-essence-lecture.md` | ✅ | ✅ | ✅ | | ✅ | ✅ |
| `by-test/learnzapp/05-tls-pki-cryptography-lecture.md` | | ✅ | ✅ | | | |
| `daily/2026-09-25-lecture.md` | | ✅ | | ✅ | | |
| `daily/2026-09-26-lecture.md` | | ✅ | | ✅ | | |

每份彙整講義的 §0 有精確到章節的對照表。

---

## Flash card

`flash card/` 內閃卡已全部歸入六大 domain，共 398 張。檔案清單、張數與匯入步驟見 [`flash card/00-KNOWT導入說明.md`](flash%20card/00-KNOWT%E5%B0%8E%E5%85%A5%E8%AA%AA%E6%98%8E.md)。

`knowt-00-study-progress.tsv` 是**非 domain 知識卡**（學習進度與群組決議紀錄），不計入任何 domain。

---

## 維護規則

### 新增一份測驗講義時

1. 檔案放進 `by-test/`，沿用 `NN-<test-name>-weakness-lecture.md` 編號命名。
2. 依內容判斷涉及哪些 domain，把對應章節**併入**各 domain 彙整講義的 §1–§5。
3. 更新該 domain 彙整講義的 **§0 來源對照表**（來源檔 · 原章節 · 併入位置）。
4. 更新本檔的**來源 → Domain 對應總表**。
5. 原檔保持完整，不刪節——分數、進步判定與補強排程只留在 `by-test/`，不併入彙整講義。

> **例外一：** 若新檔不是測驗紀錄，而是**單一 domain 的主題教材**（例如圖解、速查表），放進該 domain 資料夾並沿用 `0N-<topic>.md` 編號，不放 `by-test/`。文字版規則仍要併入該 domain 的 `01-consolidated-lecture.md`，補充檔只保留視覺化或延伸內容，避免兩邊重複。
>
> **例外二：** 若新檔是**recall 缺口分析或補強排程**，且其測驗數據與既有 `by-test/` 檔重複，則**不另建封存檔**——只把可長期沿用的知識點併入彙整講義與閃卡，並在該 domain 的 §0 來源對照標為「<日期> recall 缺口分析（內容已併入，原檔未封存）」。時效性的優先序與觀看清單刻意不保留。

### 新增閃卡時

1. 直接寫進對應的 `flash card/knowt-dN-*.tsv`。
2. 非 domain 知識（進度、決議）寫進 `knowt-00-study-progress.tsv`。
3. 重建 `knowt-import-all.tsv`：依 d1 → d6 → study-progress 順序串接。
4. 更新 `00-KNOWT導入說明.md` 的張數表。

### 錯題複習與 argue 流程

來源：`by-test/09` §10 Review Question Guidelines、`by-test/12` 附錄。

對已具工程實務背景的學習者，以 argue（對題庫敘述提出質疑並辯證）方式處理錯題，效果優於單純背答案，因為它涵蓋三種有效學習行為：

| 行為 | 內容 |
|---|---|
| **Elaborative interrogation** | 問的不是「正解是什麼」，而是「為什麼這個答案成立、反例為什麼不成立」。這會迫使學習者建立 causal model，而不是只記 A／B／C／D。 |
| **Error correction** | 修正被誤認為同一件事的概念（例如 VMware Tools 與 virtualization management plane）。被辯論修正過的錯誤通常比直接看答案更牢。 |
| **Boundary learning** | 多數錯題並非完全不知道，而是邊界模糊：Audit vs Hardening、Personnel vs Physical Access、DLP vs IRM、Metadata vs Content、GRE vs IPsec、DH vs OOB。Argue 最適合修這類問題。 |

**五步流程：**

```text
1. 為何不同意？
2. 這個 argument 是技術上成立，還是只是 edge case？
3. 題目在考：terminology？taxonomy？responsibility？technical mechanism？
4. 題庫答案是否仍有 ambiguity？
5. 寫一句 corrected mental model
```

**要避免的陷阱一：** 不要變成「每一題都努力證明題庫錯」。常見真因是**作答時用的是 workflow／實務邏輯，而題目在考 taxonomy**。

範例：mantrap 控制人員在技術上成立，但題目考分類 → Physical Access ≠ Personnel → corrected model：**作用對象相同，不代表 control category 相同。**

**要避免的陷阱二：不要為了讓答案成立而加入題幹沒說的架構假設。** 這是典型的工程師答題陷阱。

題目問「哪個 control 同時改善 **A 與 B**」時：

```text
不要問：哪個選項經過我的特殊設計後也能做到 A + B？
要問：  哪個選項在正常、標準定義下，本來就直接支援 A + B？
```

範例（見 [Domain 2 §1.8](domain2-data-security/01-consolidated-lecture.md)）：

| 選項 | Operations | Forensics |
|---|:-:|:-:|
| **Full backup** | ✅ | ✅ |
| Secure archive | 視設計而定 | ✅ |

→ 選 **full backup**。「secure archive 也能很快還原 production」在技術上可能成立，但需要 hot storage ＋ 完整 application snapshot ＋ recent data ＋ automated restore ＋ production-compatible format 等**額外假設**，題幹沒說就不能加。

這套流程對 CCSP 特別有效，因為 CCSP 許多題目的難點正是「兩個答案都技術上合理，但考試在問哪個層級／角色／分類」。

### `[Q]` 題的降權處理

有些錯題的真因不是能力不足，而是**題目本身過時、模糊或答案不精確**（標記為 `[Q]`）。這類題要降權，但降權的方式有講究。

**處理流程：**

```text
辨認題目有問題
     ↓
建立現代正確模型
     ↓
知道題庫可能期待什麼
     ↓
不要反覆背錯誤前提
     ↓
降權
```

**成績判讀：raw score 與 remediation workload 要分開看。** 例如 10 題錯 4 題，其中 2 題是真正的 `[K]/[T]/[J]`、2 題是 `[Q]`：

```text
題庫 raw score      = 60%
remediation workload = 只有 2 個真正的知識／判斷缺口
```

**原則：** 這不是「錯題不算」，而是**不能讓過時、模糊或錯誤的題目錯誤診斷能力**。

> **⭐ 反面提醒：`[Q]` 只降權「題目前提」，不降權其中仍然正確的概念。**
>
> 例如以 Privacy Shield 為前提的題目可以降權（制度已失效），但題目考的 **SCC 本身是現行且高價值的概念，不可降權**。同理，write blocker、evidence custodian、HIPAA 分類、SLA 判準這些都算真正的 remediation，不能因為同一批題目裡有 `[Q]` 就一併忽略。

> **D6 專用變體：** 框架／標準／報告類的陌生管理題另有「三層模型 ＋ 四問法」，見 [Domain 6 §5 框架題的答題方法](domain6-legal-compliance/01-consolidated-lecture.md)。

### 撰寫規範

- **中性講義語氣**：不使用第一、第二人稱代名詞，不對讀者直接喊話，不寫個人日誌口吻（例如「本日收穫」式的日記標題、指名個人的待辦）。
- **標註來源**：彙整講義的每個段落標註來自哪一份 `by-test/` 檔案的哪一節。
- **跨域重疊**：同一觀念若兩域都需要，完整寫在主責 domain，另一域放一行交叉連結，不重複整段。
- **爭議標記**：`Disputed`／`Unresolved`／`UNKNOWN` 照實保留，不以經驗法則冒充 ISC2 官方規則。
