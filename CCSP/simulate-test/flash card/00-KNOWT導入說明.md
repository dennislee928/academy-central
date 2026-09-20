# Knowt.com Flash Card 導入說明

本資料夾的卡片是依 `CCSP/simulate-test` 重新命名、改寫後的講義整理而成。  
格式對齊 Knowt 的 **Import manually**（手動貼上匯入）。

## 建議分隔符號

| 項目 | 設定 |
|---|---|
| Between term and definition（題目與答案） | **Tab**（製表符） |
| Between rows（卡片與卡片） | **New line**（換行） |

因為卡片含逗號與中文，**不要用逗號當分隔符**。

## 匯入步驟

1. 開啟 [Knowt](https://knowt.com) → Create → **Flashcards** → **Import manually**。
2. 用文字編輯器開啟對應的 `.tsv` 檔，全選複製。
3. 貼到 Knowt 匯入框。
4. 將分隔設定為：term/definition = Tab；rows = New line。
5. 按 Import，檢查前 5 張卡片後存檔。

## 檔案對照

| 檔案 | 建議 Knowt 套件名稱 | 張數 |
|---|---|---:|
| `knowt-d1-cloud-concepts.tsv` | CCSP D1 雲端概念與角色 | 25 |
| `knowt-d2-data-security.tsv` | CCSP D2 資料安全 | 55 |
| `knowt-d3-infrastructure.tsv` | CCSP D3 基礎架構與 BC/DR | 30 |
| `knowt-d4-application.tsv` | CCSP D4 應用安全 | 22 |
| `knowt-d5-operations.tsv` | CCSP D5 安全維運 | 32 |
| `knowt-d6-legal-compliance.tsv` | CCSP D6 法律風險與合規 | 28 |
| `knowt-tls-pki-crypto.tsv` | CCSP TLS／PKI／密碼學 | 40 |
| `knowt-import-all.tsv` | CCSP 模擬測驗總卡 | 232 |

先分域導入較好記；考前再導入 `knowt-import-all.tsv` 做混合複習。

## 卡片寫法

- 正面：問句或「X 與 Y 差在哪」。
- 背面：先給答案，再補一句考場規則。
- 單行、無 Tab、無換行，避免 Knowt 切錯欄。
