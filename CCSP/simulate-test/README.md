# CCSP 模擬測驗資料夾 / simulate-test

本資料夾以 **CCSP 六大 Domain** 為主軸組織。複習時讀 `domainN-*/`；查出處、分數與進度時讀 `by-test/` 與 `daily/`。

---

## 目錄結構

```
simulate-test/
├── README.md                          ← 本檔：歸類索引與維護規則
├── domain1-cloud-concepts/            ← D1 彙整講義（複習主體）
├── domain2-data-security/             ← D2
├── domain3-infrastructure/            ← D3
├── domain4-application/               ← D4
├── domain5-operations/                ← D5
├── domain6-legal-compliance/          ← D6
├── by-test/                           ← 原始測驗講義封存（出處與分數紀錄）
│   ├── 01 ~ 10-*-weakness-lecture.md
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

`flash card/` 內閃卡已全部歸入六大 domain，共 250 張。檔案清單、張數與匯入步驟見 [`flash card/00-KNOWT導入說明.md`](flash%20card/00-KNOWT%E5%B0%8E%E5%85%A5%E8%AA%AA%E6%98%8E.md)。

`knowt-00-study-progress.tsv` 是**非 domain 知識卡**（學習進度與群組決議紀錄），不計入任何 domain。

---

## 維護規則

### 新增一份測驗講義時

1. 檔案放進 `by-test/`，沿用 `NN-<test-name>-weakness-lecture.md` 編號命名。
2. 依內容判斷涉及哪些 domain，把對應章節**併入**各 domain 彙整講義的 §1–§5。
3. 更新該 domain 彙整講義的 **§0 來源對照表**（來源檔 · 原章節 · 併入位置）。
4. 更新本檔的**來源 → Domain 對應總表**。
5. 原檔保持完整，不刪節——分數、進步判定與補強排程只留在 `by-test/`，不併入彙整講義。

### 新增閃卡時

1. 直接寫進對應的 `flash card/knowt-dN-*.tsv`。
2. 非 domain 知識（進度、決議）寫進 `knowt-00-study-progress.tsv`。
3. 重建 `knowt-import-all.tsv`：依 d1 → d6 → study-progress 順序串接。
4. 更新 `00-KNOWT導入說明.md` 的張數表。

### 撰寫規範

- **中性講義語氣**：不使用 你／妳／您／我／我們，不寫個人日誌口吻（「今天帶走的三件事」「待某人核准」）。
- **標註來源**：彙整講義的每個段落標註來自哪一份 `by-test/` 檔案的哪一節。
- **跨域重疊**：同一觀念若兩域都需要，完整寫在主責 domain，另一域放一行交叉連結，不重複整段。
- **爭議標記**：`Disputed`／`Unresolved`／`UNKNOWN` 照實保留，不以經驗法則冒充 ISC2 官方規則。
