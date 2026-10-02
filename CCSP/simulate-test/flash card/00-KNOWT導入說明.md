# Knowt 上傳說明

Knowt 的 **AI PDF Summarizer**（`knowt.com/ai-pdf-summarizer`）只接受 **PDF、PPT、圖片、影片、音訊**，所以 `.tsv` / `.md` 會顯示無法選取或無法使用。

## 一、TSV 閃卡（依 CCSP 六大 Domain 分類）

全部閃卡已按 CCSP 六大 domain 歸類，共 **299 張**：

| 檔案 | Domain | 張數 |
|---|---|---:|
| `knowt-d1-cloud-concepts.tsv` | D1 Cloud Concepts, Architecture and Design | 32 |
| `knowt-d2-data-security.tsv` | D2 Cloud Data Security（含密碼學、金鑰、PKI／憑證） | 101 |
| `knowt-d3-infrastructure.tsv` | D3 Cloud Platform & Infrastructure Security（含 TLS 協定面） | 51 |
| `knowt-d4-application.tsv` | D4 Cloud Application Security | 28 |
| `knowt-d5-operations.tsv` | D5 Cloud Security Operations | 48 |
| `knowt-d6-legal-compliance.tsv` | D6 Legal, Risk and Compliance | 33 |
| `knowt-00-study-progress.tsv` | **非 domain 知識卡**：學習進度與群組決議紀錄 | 6 |
| `knowt-import-all.tsv` | 以上全部串接（匯入單一套件用） | 299 |

### 歷次併入紀錄

**原 `knowt-tls-pki-crypto.tsv` 與 `daily/` 每日卡**（已刪除原檔）：

- 密碼學原理、金鑰、簽章、雜湊、HMAC、X.509／CA／PKI、CRL/OCSP、KMS/HSM → **D2**
- TLS 握手、TLS 1.3、ECDHE／forward secrecy、mTLS、cipher suite、AES-GCM 傳輸面 → **D3**
- 每日卡依 learning objective 歸入 D2／D4；純進度與決議紀錄移入 `knowt-00-study-progress.tsv`

**`by-test/11-drill-2026-10-01` 反駁題講義的 27 張卡**（拆併與去重後淨增 32 張）：

- Private cloud／GDPR／sandbox → **D1**（+7）
- 儲存模型、virtualization vs multitenancy、egress 障礙、TPI 系列 → **D2**（+9）
- Hot／cold aisle 擺法 → **D3**（+2）
- Insider threat、Synthetic vs RUM、DHCP vs NTP、HA failback → **D5**（+9）
- ISO 27001、ARO evidence、NIST RMF → **D6**（+5）

重複主題（private cloud 定義、volume storage、`SLE × ARO`、hot/cold aisle 目的）改為**增補既有卡片的答案**，不新增重複卡。

**`by-test/12-d5-drill-2026-10-02` 講義**（原檔無實際卡片，由講義內容自行產出 15 張）：

- Encryption vs Mirroring（備份情境） → **D2**（+2）
- Virtualization management plane vs VMware Tools、raised floor 承重與冷風路徑、live migration vs snapshot → **D3**（+6）
- ⭐ Audit vs Hardening、⭐ Personnel vs Physical Access、patch vs interoperability → **D5**（+7）

復現主題（GRE vs IPsec、Secure KVM、vendor advises、DH vs OOB）既有卡已覆蓋，不產新卡；raised floor 兩張既有卡改為增補答案。

**`domain3-infrastructure/02-airflow-diagrams.md` 的 5 張卡**（去重後淨增 2 張）：

- Card 3 server airflow 方向、hot-air recirculation 後果鏈 → **D3**（+2）
- Card 1／2／5（F-F = Cold、R-R = Hot、口訣）與 Card 4（exhaust→inlet 為何錯）既有卡已覆蓋，不新增。

### 手動匯入步驟

Knowt 首頁 → Create → **Flashcards** → **Import manually**（不是 AI PDF Summarizer）。

- Between term and definition：**Tab**
- Between rows：**New line**
- 貼上 `knowt-import-all.tsv` 或各域 `.tsv`

## 二、PDF／PPT（AI PDF Summarizer 用）

| 要上傳的檔案 | 用途 |
|---|---|
| **`01-閃卡全部.pdf`** | 直接丟進 AI PDF Summarizer（建議先用這個） |
| **`01-閃卡全部.pptx`** | 若 PDF 失敗，改傳 PPT |
| `KNOWT上傳用/` | 分域 PDF／PPT：D1–D6、TLS |

分域檔在 `KNOWT上傳用/`：

- `02-D1雲端概念.pdf`
- `03-D2資料安全.pdf`
- `04-D3基礎架構.pdf`
- `05-D4應用安全.pdf`
- `06-D5安全維運.pdf`
- `07-D6法律合規.pdf`
- `08-TLS-PKI-密碼學.pdf`

> ⚠️ **PDF／PPTX 尚未同步：** 這些檔案是 2026-09-25 依舊分類（含獨立的 TLS-PKI 檔）匯出的 232 張版本，與現行 TSV 的 299 張分域結果**不一致**。需要分域 PDF 時請依上表的 TSV 重新匯出。

操作：

1. 回到 Knowt 的 Upload 畫面。
2. 選 `01-閃卡全部.pdf`（或進入 `KNOWT上傳用` 選分域 PDF）。
3. 等它產出 notes／flashcards 後再存成套件。
