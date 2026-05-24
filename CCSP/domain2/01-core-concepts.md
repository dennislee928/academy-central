# CCSP Domain 2 核心觀念與架構 / Cloud Data Security

> 版本：v1.0 | 更新日期：2024-05-14

## 一、Domain 定位
Domain 2 專注於 **雲端資料安全 (Cloud Data Security)**。考試重點在於理解資料在雲端環境中的完整生命週期、儲存架構、加密與脫敏技術、資料分類與發現，以及法律合規要求（如資料主權與保留）。

## 二、知識架構地圖
1. **資料概念與角色 (Cloud Data Concepts)**
   - CIA 三要素、真實性 (Authenticity)、不可否認性 (Non-repudiation)
   - 資料角色 (Owner, Processor, Custodian, Steward, Subject)
   - 資料生命週期 (Create, Store, Use, Share, Archive, Destroy)
2. **資料發現與分類 (Data Discovery & Classification)**
   - 結構化、半結構化與非結構化資料
   - 標籤 (Labeling) 與標記 (Marking)
   - 中繼資料 (Metadata)
3. **資料安全技術 (Security Technologies)**
   - 加密 (Encryption) 與金鑰管理
   - 遮罩 (Masking)、代碼化 (Tokenization)、匿名化 (Anonymization)
   - 資料外洩防護 (DLP)
4. **資訊權利管理 (IRM/DRM)**
   - 智慧財產權 (IP) 類型
   - 存取控制模型
5. **保留、刪除與封存 (Retention, Deletion & Archiving)**
   - 媒體銷毀等級 (Clear, Purge, Destroy)
   - 加密擦除 (Cryptographic Erasure/Cryptoshredding)
   - 法律保留 (Legal Hold)

## 三、核心概念詳解

### A. 資料生命週期 (Data Life Cycle)
- **Create**: 產生或更新資料。
- **Store**: 將資料存入儲存庫（幾乎與 Create 同步）。
- **Use**: 資料被處理或查看。
- **Share**: 在用戶/系統間交換。
- **Archive**: 移入長期低成本儲存。
- **Destroy**: 徹底銷毀。

### B. 資料角色 (Data Roles)
- **Data Owner (Data Controller)**: 對資料負責，通常是雲端客戶。
- **Data Processor**: 代表 Owner 處理資料，通常是雲端供應商 (CSP)。
- **Data Custodian**: 技術負責人，負責備份、還原、安全控制。
- **Data Steward**: 治理負責人，負責資料品質、中繼資料與合規。

### C. 資料脫敏與隱私保護 (Obfuscation & Privacy)
- **Data Masking**: 隱藏敏感資訊。
  - **Static**: 永久修改副本（用於開發/測試）。
  - **Dynamic**: 存取時即時遮蔽（依權限顯示）。
- **Anonymization**: 移除直接與間接識別碼。
- **Tokenization**: 用非敏感的 Token 取代敏感資料，原始資料存在安全的 Token Vault 中。

### D. 媒體銷毀 (Media Sanitization)
- **Clear**: 基本邏輯擦除（防止簡單復原）。
- **Purge**: 物理或邏輯技術（防止實驗室復原），如 **Cryptoshredding**（刪除金鑰）。
- **Destroy**: 物理破壞媒體（如焚燒、粉碎）。

## 四、高頻盲點整理
- **Labeling vs Marking**: Label 是機器可讀的（Metadata），Marking 是人可讀的（實體標籤）。
- **Steward vs Custodian**: Steward 關心「資料是什麼、合不合規」，Custodian 關心「資料怎麼存、怎麼備份」。
- **Tokenization vs Encryption**: Tokenization 不依賴演算法解密，而是查表（Vault）；Encryption 依賴金鑰。

## 五、考場秒殺口訣
- **Steward = Governance & Quality**
- **Custodian = Technical & Backup**
- **Cryptoshredding = Cloud Deletion (No physical access)**
- **Tokenization = PCI-DSS compliance (Reduce scope)**
- **Clear < Purge < Destroy**
