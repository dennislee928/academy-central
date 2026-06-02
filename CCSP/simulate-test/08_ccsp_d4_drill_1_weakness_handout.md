# CCSP LearnZApp D4 Custom Test 弱點分析與補強講義

## 0. 測驗來源與判讀範圍

本講義依據本次 `zapp_7.zip` 解壓縮後的 LearnZApp / isc2.learnzapp.com 截圖內容整理。  
本次測驗是 **Custom Test：Cloud Application Security / Domain 4 單域 drill**，不是全域 Practice Test。

---

## 1. 本次 D4 Drill 結果摘要

| 指標 | 結果 |
|---|---:|
| 測驗來源 | LearnZApp Custom Test |
| Domain | D4 Cloud Application Security |
| 題數 | 25 |
| 答對 | 14 |
| 答錯 | 11 |
| 分數 | **56%** |
| 平均作答時間 | **31 秒 / 題** |
| Readiness Score | 46% → 47% |
| Test History 顯示總平均 | 62% |
| Best Score | 77% |
| Total Correct / Total Attempted | 329 / 504 |

### 判斷

這次 **D4 targeted drill 只有 56%**，代表 D4 不是「已經穩定」，而是：

> 在全域 Practice Test 中 D4 能靠其他 domain 平衡，但一旦集中考 D4 細節與 best-answer 題，錯誤率仍偏高。

---

## 2. 與近期成績比較：是否有進步？

### 2.1 全局表現有進步

近期全局 Practice Test：

| 測驗 | 分數 |
|---|---:|
| Practice Test 1 | 65% |
| Practice Test 2 | **77%** |

Practice Test 2 的 domain 表現：

| Domain | 分數 |
|---|---:|
| D1 | 79% |
| D2 | 78% |
| D3 | 80% |
| D4 | 71% |
| D5 | 79% |
| D6 | 86% |

這表示整體模考能力確實有提升，尤其 D3 / D6 / D2 明顯修起來。

### 2.2 但 D4 targeted drill 顯示退回弱點區

| 測驗 | D4 表現 |
|---|---:|
| Practice Test 2 D4 | 71% |
| 本次 D4 Drill | **56%** |

### 2.3 精準結論

> **整體有進步，但 D4 沒有真正穩。**  
> Practice Test 2 的 77% 是有效進步；但 D4 單域 drill 56% 說明目前 D4 是下一個主要破口，尤其是 SDLC、data masking/tokenization、sandbox/legal boundary、SOAP/XML、ISO 27034、MFA factor 分類、developer training 題型。

---

## 3. 本次錯題總表

| # | 題型 / 主題 | 錯選 | 正解 | 錯因 |
|---:|---|---|---|---|
| 1 | Data masking 定義 | Hide PII | Similar inauthentic dataset for testing/training | 選到局部描述，未選最完整定義 |
| 2 | SDLC 最重要 input | Legislation/regulation | Business requirements | 把合規誤認為主驅動；忽略 business requirements 包含其他輸入 |
| 3 | Cloud sandbox 不應用於 | Application security testing | Malware analysis | 忽略 cloud 中執行 malware 的法律/供應商風險 |
| 4 | PCI DSS tokenization outsourcing | Data owner | Third party | 誤解 tokenization 可由第三方代管以降低 merchant scope |
| 5 | SOAP 優於 DCOM/CORBA 的原因 | Lightweight | Replaces binary messaging with XML | 把「新/輕量/安全」誤當原因；真正重點是 XML over Internet |
| 6 | Tokenization 用途 | User experience | PCI DSS compliance | 誤把 tokenization 當 UX；真正用途是保護 cardholder data |
| 7 | ISO 27034 framework | ONF + SAS | ONF + ANF | 不熟 ISO 27034 的 ONF / ANF 架構 |
| 8 | Data masking 定義 | Protect prying eyes | Similar but inauthentic datasets | 再次選到局部答案，未抓最 general / best answer |
| 9 | MFA process | Birth certificate + credit card | ATM card + PIN | 沒有判斷 factor 類別；兩個 possession 不等於 MFA |
| 10 | Cloud security training for developers | Security must be included from first steps | Developers may not understand libraries/components/security risks | 選到一般 Secure SDLC 原則，但非題目最佳理由 |
| 11 | Security personnel first involved in SDLC | Design | Define | 沒抓「first involved」= earliest phase |

---

## 4. 核心弱點分群

## P0-1：Best-answer 判斷偏弱

### 代表錯題

- Data masking 題兩次都選到「hide PII / protect prying eyes」這種局部正確答案。
- SDLC input 題選 legislation/regulation，但 best answer 是 business requirements。
- Developer training 題選 Secure SDLC 原則，但題目問的是為什麼 cloud training 對 developer 特別重要。

### 問題本質

CCSP 不只問「哪個選項正確」，常問：

- best
- most important
- most comprehensive
- particularly important
- should first be involved
- not be used for

因此，某些選項「也對」，但不是最廣、最上位或最貼題的答案。

### 修正規則

```text
看到 best / most / particularly / first：
先判斷題目問的是「最高層原則、最早階段、最完整定義、最貼近情境」哪一種。
不要只選第一個看起來正確的控制或名詞。
```

---

## P0-2：Data masking / tokenization / PCI DSS 邊界不穩

### 錯題

1. Data masking best definition  
2. Data masking best definition again  
3. PCI DSS tokenization outsourcing  
4. Tokenization used for PCI DSS compliance  

### 必背觀念

| 技術 | 用途 | CCSP 秒殺判斷 |
|---|---|---|
| Data masking | 產生遮蔽/不真實但類似的資料，用於測試、訓練、展示 | 若題目問 best describes，選最 general 的「similar but inauthentic dataset」 |
| Dynamic masking | 根據角色即時遮蔽顯示結果，不改原資料 | production 查詢 / role-based display |
| Static masking | 產生已遮蔽資料副本 | non-production / testing |
| Tokenization | 用 token 替代敏感值，真值在 token vault | PCI DSS / cardholder data |
| Encryption | 用 key 將資料轉成不可讀 | confidentiality / crypto controls |
| Redaction | 文件中移除或塗黑敏感資訊 | unstructured docs / reports |

### 易錯陷阱

```text
Masking 不只是 hide PII；那只是其中一種效果。
Tokenization 不是 encryption；沒有 encryption engine，也不一定有 key。
PCI DSS 場景看到 tokenization，通常是降低 cardholder data exposure / compliance scope。
第三方 tokenization provider 可以協助 merchant 減少 PCI DSS burden，但 merchant 不等於完全沒有責任。
```

---

## P0-3：Secure SDLC 階段與 business requirement 判斷不穩

### 錯題

- SDLC 最重要 input：Business requirements
- Security personnel first involved：Define phase
- Developer cloud security training reason：library/component/security risk awareness

### 必背觀念

| 題型 | 正確思路 |
|---|---|
| Most important SDLC input | Business requirements |
| Security first involved in SDLC | Define / earliest phase |
| Security controls in SDLC | 越早越有效、越便宜 |
| Developer training | 現代開發高度依賴 libraries / frameworks / components，開發者可能不了解底層安全風險 |
| Legislation/regulation | 重要，但通常是 requirement 的一部分，不是最上位 input |

### 陷阱

```text
Legislation/regulation 是重要限制，但通常被 business requirements 吸收。
Design 不是最早階段；Define 才是最早。
Secure SDLC 原則正確，不代表是每題最佳答案。
```

---

## P0-4：Cloud sandbox / malware analysis 法律邊界不穩

### 錯題

- Cloud-based sandbox should not be used for malware analysis.

### 必背觀念

| 使用情境 | Cloud sandbox 是否適合 |
|---|---|
| Application security testing | 可以 |
| Interoperability testing | 可以 |
| Processing sensitive data | 視控制而定，不是本題最佳否定 |
| Malware analysis | 通常不適合在第三方 cloud 上做，可能違反法律、合約或供應商政策 |

### 修正規則

```text
Cloud sandbox 不等於所有 sandbox 用途都可搬到 cloud。
Malware analysis 涉及惡意程式執行、第三方基礎設施、法律與供應商條款風險。
若題目問 should not be used for，malware analysis 通常是高風險答案。
```

---

## P1-1：Legacy web service / SOAP / XML 知識缺口

### 錯題

- SOAP 為什麼用於 web services 而不是 DCOM / CORBA？

正解：

```text
SOAP replaces binary messaging with XML.
```

### 必背對照

| 技術 | 特徵 |
|---|---|
| DCOM / CORBA | 舊式分散式物件模型，較依賴 binary / tightly-coupled messaging |
| SOAP | XML-based messaging，用於 web services |
| XML | 跨平台、文字格式、較適合 Internet/web context |
| REST | 輕量、resource-oriented，常用 HTTP verbs |

### 陷阱

```text
SOAP 不是特別 lightweight。
SOAP 不是因為比較新而成為正解。
SOAP 不是天生比 DCOM/CORBA 更安全。
本題核心是 XML replacing binary messaging。
```

---

## P1-2：ISO 27034 / application security framework 名詞不熟

### 錯題

- ISO 27034 mandates each organization should have an ONF and each application should have its own ANF.

### 必背

| 名詞 | 意義 |
|---|---|
| ISO/IEC 27034 | Application security framework |
| ONF | Organizational Normative Framework：組織層級的 application security controls / processes / standards |
| ANF | Application Normative Framework：特定 application 的 controls |
| SAS | Standard Application Security，不是本題正確框架名詞 |

### 修正規則

```text
ISO 27034：
Organization level = ONF
Application level = ANF
```

---

## P1-3：MFA factor 分類不穩

### 錯題

- MFA process: ATM card + PIN

### 必背因子

| Factor | Example |
|---|---|
| Something you know | password, PIN |
| Something you have | card, token, phone, smart card |
| Something you are | fingerprint, iris, face, voice biometric |
| Somewhere you are | location |
| Something you do | behavior / gesture / typing pattern |

### 陷阱

```text
Password + PIN = same factor: something you know，不是 MFA。
Voice + fingerprint = same factor: something you are，不是 MFA。
Birth certificate + credit card = mostly possession/document evidence，不是典型 MFA process。
ATM card + PIN = have + know，是 MFA。
```

---

## 5. 這次最需要修的 15 條規則

```text
1. Data masking best definition = similar but inauthentic dataset for testing/training.
2. Hide PII / protect prying eyes 是 masking 的效果，不一定是 best definition.
3. Tokenization is not encryption.
4. Tokenization is common for PCI DSS / cardholder data compliance.
5. Third-party tokenization can reduce merchant PCI DSS compliance burden.
6. Business requirements are the most important SDLC input.
7. Legislation/regulation can be part of requirements, but not always the top answer.
8. Security should be involved from the Define phase.
9. Cloud-based sandbox should not normally be used for malware analysis.
10. SOAP replaced binary messaging with XML.
11. SOAP is not lightweight and not primarily preferred because it is newer.
12. ISO 27034: organization = ONF; application = ANF.
13. MFA requires different factor categories, not merely two items.
14. ATM card + PIN = something you have + something you know.
15. Cloud developer security training matters because developers assemble libraries/components whose security implications they may not fully understand.
```

---

## 6. 60 分鐘補弱排程

### 0–10 min：Data masking / tokenization / PCI DSS

任務：

- 背 masking vs tokenization vs encryption vs redaction 對照表
- 重點放在「best definition」與「PCI DSS tokenization」

自測：

```text
Masking 是什麼？
Tokenization 和 encryption 差在哪？
PCI DSS 場景為什麼常見 tokenization？
```

---

### 10–25 min：Secure SDLC / developer training

任務：

- 背 SDLC early involvement、business requirements、developer training rationale

自測：

```text
SDLC 最重要 input 是什麼？
Security personnel 應最早在哪個 phase involved？
為什麼 cloud security training 對 developer 特別重要？
```

---

### 25–35 min：Sandbox / malware analysis / cloud legal boundary

任務：

- 背「cloud sandbox 不等於 malware analysis sandbox」
- 記住第三方 cloud / provider policy / legal exposure

自測：

```text
Cloud-based sandbox 可以做 application testing 嗎？
Cloud-based sandbox 為什麼不適合 malware analysis？
```

---

### 35–45 min：SOAP / XML / legacy distributed objects

任務：

- 背 SOAP vs DCOM/CORBA
- 只需掌握考試級別，不需要深挖實作

自測：

```text
SOAP 比 DCOM/CORBA 更適合 web services 的核心理由是什麼？
SOAP 是 lightweight 嗎？
```

---

### 45–53 min：ISO 27034

任務：

- 背 ONF / ANF 層級

自測：

```text
ISO 27034 組織層級是什麼？
ISO 27034 每個 application 對應什麼 framework？
```

---

### 53–60 min：MFA factor drill

任務：

- 判斷 5 組 authentication examples 是否 MFA

自測：

```text
Password + PIN 是 MFA 嗎？
Voice + fingerprint 是 MFA 嗎？
ATM card + PIN 是 MFA 嗎？
```

---

## 7. 下一步建議

### 不建議立刻做 Practice Test 3

原因：

- Practice Test 2 雖然 77%，但 D4 是最低 domain：71%
- 本次 D4 targeted drill 又掉到 56%
- D4 是 17% 官方權重，不是低權重 domain
- 若不先修，Practice Test 3 很可能被 D4 拉低

### 建議下一步

1. 先做本講義的 60 分鐘 patch
2. 再做 **D4 targeted drill 25 題**
3. Gate：

| 指標 | 目標 |
|---|---:|
| D4 targeted drill | **≥75%** |
| 若 70–74% | 小補後再做 15 題 |
| 若 <70% | 不進 Practice Test 3，繼續 D4 patch |
| 若 ≥75% | 可進 D4/D2 mixed 或 Practice Test 3 |

---

## 8. 最終判斷

這次 D4 drill 分數不高，但診斷價值很高。

### 目前狀態

```text
Overall Practice Test progress = good
D4 targeted stability = weak
Current bottleneck = D4 application security best-answer + SDLC + masking/tokenization taxonomy
```

### 一句話結論

> **整體模考能力已進步，但 D4 單域仍不穩；目前最大風險不是 D3/D6，而是 D4 在細節題與 best-answer 題下會掉分。**
