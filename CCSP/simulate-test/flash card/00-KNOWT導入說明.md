# Knowt 上傳說明

Knowt 的 **AI PDF Summarizer**（`knowt.com/ai-pdf-summarizer`）只接受 **PDF、PPT、圖片、影片、音訊**，所以 `.tsv` / `.md` 會顯示無法選取或無法使用。

## 一、TSV 閃卡（依 CCSP 六大 Domain 分類）

全部閃卡已按 CCSP 六大 domain 歸類，共 **472 張**：

| 檔案 | Domain | 張數 |
|---|---|---:|
| `knowt-d1-cloud-concepts.tsv` | D1 Cloud Concepts, Architecture and Design（含新興技術） | 40 |
| `knowt-d2-data-security.tsv` | D2 Cloud Data Security（含密碼學、金鑰、PKI／憑證、masking 技術分類） | 138 |
| `knowt-d3-infrastructure.tsv` | D3 Cloud Platform & Infrastructure Security（含 TLS 協定面、OSI、BC/DR 指標） | 80 |
| `knowt-d4-application.tsv` | D4 Cloud Application Security | 34 |
| `knowt-d5-operations.tsv` | D5 Cloud Security Operations | 48 |
| `knowt-d6-legal-compliance.tsv` | D6 Legal, Risk and Compliance | 126 |
| `knowt-00-study-progress.tsv` | **非 domain 知識卡**：學習進度與群組決議紀錄 | 6 |
| `knowt-import-all.tsv` | 以上全部串接（匯入單一套件用） | 472 |

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

**`by-test/13-d2-d6-drill-2026-10-03` 講義**（原檔兩個閃卡區段皆為空的 widget 佔位，由講義內容自行產出 43 張）：

- Quantum computing 關鍵字 → **D1**（+1）
- Key protection 原則、vault blast radius、encryption 粒度四選一、masking 九技術、bit-splitting／RAID／AONT-RS、hash vs backup → **D2**（+19）
- 框架兩秒歸類（COBIT／SAS 70／Hex GBL）、ISO 27002 93 controls、SOC 2 TSC、SSAE 版本、鄰近切法、OECD 八原則 trigger、due care/diligence/liability、鑑識流程與可採性、preponderance vs comparative negligence、seizure、四問法 → **D6**（+23）

`ISO 31000 與 NIST 800-37 各偏什麼？`既有卡改為增補答案（補上 2018 版與非認證）。

**2026-10-04 recall 缺口分析**（原檔未封存，知識點已併入彙整講義，由其內容產出 14 張）：

- Object storage 判準、multitenancy 共享層級、SoD 分離對象 → **D2**（+3）
- RMF 中文口訣與因果鏈、Authorize 的意義、COBIT/800-37/31000 三行定位、OECD scenario 反推 ×2、ARO/SLE/ALE 單位定位、ALE worked example、ARO 常見誤認、Liability vs Reliability、鑑識五要素 → **D6**（+11）

`NIST RMF 的七個步驟？`、`鑑識證據的標準處理流程？`、`SLE 與 ALE 公式？` 三張既有卡改為增補答案。

**2026-10-04 D6 補強講義**（同日第二份；原檔未封存，知識點已併入彙整講義，由其內容產出 8 張）：

- Carrier vs Broker 助記、Broker 三種行為 → **D1**（+2）
- CSA 三件事串接、CCM ≠ enforcement tool、STAR L1/L2、GAAP distractor、Jurisdiction vs Choice of Law、Restatement (Second) → **D6**（+6）

`CSA CCM 是什麼？`、`CAIQ 是什麼？`、`CSA STAR 用來做什麼？`、`GLBA 與 PCI DSS 再次對照？` 四張既有卡改為增補答案。

**2026-10-05 D6 新錯題補強講義**（原檔未封存，知識點已併入彙整講義，由其內容產出 12 張）：

- STAR 三層 mnemonic、highest/third-party 秒答、L1 與 CAIQ 的關係、法庭作證的 alternative explanations、帳號 ≠ 本人的假設排除、professional vs personal opinion、examiner 的獨立性 → **D6**（+7）
- Backup = Recover／Archive = Retain、archive 不保證快速還原、full backup 的 forensic readiness、backup ≠ 自動可採證據、secure archive 的 evidence preservation → **D2**（+5）

**既有卡修正：** `STAR Level 1 與 Level 2 各是什麼？` 改名為 `CSA STAR 的三個層級各是什麼？` 並補 Level 3 與「沒有 Level 4」；`CSA STAR 用來做什麼？` 與 `CSA 的 CCM、CAIQ、STAR 怎麼串成一條線？` 兩張答案補 Level 3。

**2026-10-06 D6 新錯題 ＋ 法律總表**（原檔未封存；總表另存為 [`CCSP/domain6-legal-framework-reference.md`](../../domain6-legal-framework-reference.md)，知識點併入彙整講義，由其內容產出 22 張）：

- write blocker vs TCB、PCI merchant tier ×2、Privacy Shield→DPF ×2、FISMA vs FedRAMP residency ×2、MSA/SOW/SLA ×2、EU 傳輸機制 ×2、ISO 27037 vs 27050、ISO 27036、NIST 800-53A/800-88、FIPS 199/200、COSO/CIS/20000-1、HITECH/NERC CIP、DPDP、PIPEDA、版本 legacy → **D6**（+21）
- PCI DSS 適用範圍與 merchant tier → **D2**（+1）

**2026-10-07 D3 ＋ D6 錯題補強與本輪 recall**（原檔未封存，知識點已併入彙整講義，由其內容產出 23 張）：

- 資源三機制、contention → Shares、BC/DR 測試變數、Baseline 穩 vs 測試變 → **D3**（+4）
- 供應商鎖定雙層模型、技術手段、合約條款、media 精確分類、private cloud plane 區分 → **D1**（+5）
- 外部協作 ≠ 公開揭露、NAS/SMB → File、TPI threat model → **D2**（+3）
- SCA vs SAST、Shift Left ＋ Security Throughout → **D4**（+2）
- eDiscovery 流程與三組邊界、Evidence Custodian 保管鏈、Data steward、FTC vs HHS、HIPAA 分類、技術 vs 法務分工 → **D6**（+9）

**2026-10-09 D1-D4 防守成果 ＋ D3 BC/DR 與 25 題錯題補強**（原檔未封存，知識點已併入彙整講義，由其內容產出 29 張）：

- BC/DR 四指標（WRT、MAO、`RTO+WRT≤MTD` 與算例、WRT 陷阱、口訣）、OSI L1–L4 與 fiber=L1、FC vs FCP、storage taxonomy 二分、Converged/SDN/HCI、VM vs Container 架構、WSL2、三類 controls 與四選一、vendor guidance 層級 → **D3**（+17）
- TDE 的透明性判準、「同一 host」不是判準、`PCI=true` 的 representation ≠ source → **D2**（+3）
- IAST=測／RASP=擋、SCA vs IaC scanning、CI/CD 階段對應、DAST 的位置 → **D4**（+4）
- CISO、DPO 與 DPIA、Compliance、CISO vs DPO、Legal vs Compliance → **D6**（+5）

`MAD 是什麼？` 既有卡改為增補答案（補上 `RTO + WRT ≤ MTD／MAO`）。

**2026-10-09 D6 測驗補強**（原檔未封存，知識點已併入彙整講義；「名稱 → 類別」歸位地圖另存為 `CCSP/domain6/Framework_Law_Standard_Map.md`，由其內容產出 11 張）：

- ⭐ Argentina Law 25.326 是 comprehensive、美國 `sectoral federal ＋ state patchwork`、COPPA、各國隱私法速答 → **D6**（+4）
- ⭐ `NIST SP 800-92 = Logs` 不是 risk framework、ISO 31000 的範圍與三個「不是」、ISO 27017 建立在 27002 之上、四選一 mapping 實戰、六大歸位類別 → **D6**（+5）
- ⭐ public domain 的兩層細化（現代版本可能另有著作權）、DMCA notice 是 procedural issue → **D6**（+2）

**2026-10-10 D3 錯題補強**（原檔未封存，知識點已併入彙整講義，原有 13 張卡去重後淨增 11 張）：

- ⭐ Hot／Cold aisle containment 特徵、Thermo-optimized 與 HVAC modulated 干擾選項、BIA 四輸出與 BIA informs BC/DR（含 Secure Acquisition EXCEPT）、BC/DR kit 無 universal 清單 `[Q]`、LPG／propane 長期儲存穩定 → **D3**（+8）
- 遺失／遭竊裝置 → remote lock／disable／wipe（不是 Dual Control）、entropy source ＋ CSPRNG／DRBG、social factors 與 effective entropy `[Q]` → **D2**（+3）

Front ↔ Front = Cold、Rear ↔ Rear = Hot 兩張卡既有卡已覆蓋，不新增。

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

> ⚠️ **PDF／PPTX 尚未同步：** 這些檔案是 2026-09-25 依舊分類（含獨立的 TLS-PKI 檔）匯出的 232 張版本，與現行 TSV 的 472 張分域結果**不一致**。需要分域 PDF 時請依上表的 TSV 重新匯出。

操作：

1. 回到 Knowt 的 Upload 畫面。
2. 選 `01-閃卡全部.pdf`（或進入 `KNOWT上傳用` 選分域 PDF）。
3. 等它產出 notes／flashcards 後再存成套件。
