# CCSP Domain 2 補充參考 / Supplemental Reference

Here is the detailed lecture material for CCSP Domain 2 (Cloud Data Security), formatted in Markdown and provided in both English and Traditional Chinese, based entirely on the provided sources.

---

# CCSP Domain 2: Cloud Data Security / 雲端資料安全

## 2.1 Cloud Data Concepts / 雲端資料概念

**English:**

- **Cloud Secure Data Lifecycle**: The Cloud Security Alliance (CSA) model consists of six phases where security technologies must be applied.
    - **Create**: Data is created by users or systems. Data should be classified as soon as possible after creation to apply appropriate security controls.
    - **Store**: Data should ideally be encrypted at rest, which is doubly important in the cloud.
    - **Use**: Data in use must be protected by adequate security controls based on its classification.
    - **Share**: Refers to anytime data is in use or transit over a network.
    - **Archive**: Archival is often driven by laws or regulations requiring data retention.
    - **Destroy**: When data is no longer needed, it must be destroyed so it is unreadable and unrecoverable. Crypto-shredding is the most secure method for this in the cloud.
- **Data Dispersion**: A core business continuity principle ensuring data is always stored in more than one location. Storage redundancy includes local (single data center), zone (multiple data centers in a region), and global (backed up to a different region).
- **Data Flows**: Data flow diagrams help map the flow of data through infrastructure to apply appropriate security controls at every layer (e.g., at rest, in transit, in use). They decrease development time, reduce security risk, and are crucial for regulatory compliance by showing where data is flowing geographically.

**Traditional Chinese (繁體中文):**

- **雲端安全資料生命週期**：雲端安全聯盟 (CSA) 提出的模型包含六個階段，需在各階段應用安全技術。
    - **建立 (Create)**：資料由使用者或系統生成。資料建立後應盡快進行分類，以套用適當的安全控制措施。
    - **儲存 (Store)**：理想情況下，靜態資料應被加密，這在雲端環境中格外重要。
    - **使用 (Use)**：使用中的資料必須根據其分類受到充分的安全控制保護。
    - **分享 (Share)**：指資料在網路中傳輸或處於使用中的任何情況。
    - **封存 (Archive)**：封存通常是為了遵守法律或法規對資料保留的要求。
    - **銷毀 (Destroy)**：當不再需要資料時，必須以無法讀取且無法復原的方式將其銷毀。「密碼粉碎 (Crypto-shredding)」是雲端中最安全的資料銷毀方法。
- **資料分散 (Data Dispersion)**：這是營運持續的核心原則，確保資料始終儲存在多個位置。儲存備援級別包含：本地 (單一資料中心)、區域 (同一地區內的多個資料中心) 和全球 (備份至其他地區)。
- **資料流程 (Data Flows)**：資料流程圖有助於描繪資料在基礎設施中的流向，以便在每一層 (例如靜態、傳輸中、使用中) 實施適當的安全控制。它能減少開發時間、降低安全風險，並且透過顯示資料的地理流向，成為合規性的關鍵活動。

---

## 2.2 Cloud Data Storage Architectures / 雲端資料儲存架構

**English:**

- **IaaS Storage**: Includes Raw storage (physical media), Volume storage (virtual disks attached to an instance), and Object storage (like AWS S3 or Azure Blob).
- **PaaS Storage**: Structured data (relational databases like SQL, MySQL) and Unstructured/Big data (NoSQL).
- **SaaS Storage**: Information and storage management (data entered via web interfaces), Content/file storage (Box, Dropbox), Ephemeral storage (temporary data like cache/session data), and Content Delivery Networks (CDN for distributed content).
- **Threats to Storage**:
    - _Unauthorized Access_: Threatens confidentiality.
    - _Shadow IT_: Unauthorized provisioning leading to unapproved deployments and unexpected costs.
    - _Jurisdictional Issues_: Transferring data between countries can violate privacy legislation (e.g., GDPR). The cloud customer bears responsibility for compliance.
    - _Malware/Ransomware_: Ransomware encrypts local drives and can crawl into SaaS folders (e.g., OneDrive). Countermeasures include backups, file auto-versioning, patching, and most importantly, user awareness training.
- **Regulatory Compliance**: Non-compliance can lead to fines or suspension of business operations.

**Traditional Chinese (繁體中文):**

- **IaaS 儲存**：包含原始儲存 (實體媒體)、磁碟區儲存 (連接到執行個體的虛擬磁碟) 以及物件儲存 (如 AWS S3 或 Azure Blob)。
- **PaaS 儲存**：結構化資料 (關聯式資料庫如 SQL, MySQL) 和非結構化/大數據 (NoSQL)。
- **SaaS 儲存**：資訊與儲存管理 (透過 Web 介面輸入的資料)、內容/檔案儲存 (Box, Dropbox)、臨時儲存 (快取、工作階段等暫存資料) 以及內容傳遞網路 (CDN，用於分散式內容)。
- **儲存面臨的威脅**：
    - _未經授權的存取_：威脅機密性。
    - _影子 IT (Shadow IT)_：未經授權的配置，導致未經批准的部署和意外成本。
    - _司法管轄權問題_：在國家間轉移資料可能違反隱私法規 (如 GDPR)。雲端客戶須承擔合規責任。
    - _惡意軟體/勒索軟體_：勒索軟體會加密本機磁碟，甚至潛入 SaaS 資料夾 (如 OneDrive)。對策包含備份、檔案自動版本控制、修補更新，最重要的是使用者意識培訓。
- **法規遵循**：不合規可能導致罰款或甚至中止業務營運。

---

## 2.3 Data Security Technologies and Strategies / 資料安全技術與策略

**English:**

- **Encryption**: Symmetric encryption is fast and used for bulk data, but lacks easy key distribution. Asymmetric encryption (public/private key pairs) is scalable and solves key distribution issues, but is slower. The sender encrypts with the recipient's public key; the recipient decrypts with their own private key.
- **Key Management**: Keys should be generated in FIPS 140-2 validated Hardware Security Modules (HSMs). Organizations use "key escrow" to store a copy of the key with a third party to prevent data loss if a key is lost. Regulatory compliance or multi-cloud usage often drives the need for a Bring Your Own Key (BYOK) or self-managed key strategy.
- **Data Obfuscation**:
    - _Anonymization (De-identification)_: Removes all relevant data so identifying the original subject is impossible, eliminating GDPR exposure (cannot be reversed).
    - _Pseudonymization_: Replaces identifiers with aliases/pseudonyms to reduce exposure; can be reversed if you have access to the original data source.
    - _Tokenization_: Replaces meaningful data with a randomly generated token while the original data is held in a vault. It is stronger than encryption.
    - _Masking_: Leaves only partial data visible (e.g., asterisks for credit cards or SSNs).
    - _Hashing_: A one-way function that scrambles plaintext to a fixed-length value to verify data integrity (e.g., file hashes). MD5 is no longer used due to collision problems.
- **Data Loss Prevention (DLP)**: Controls the use of sensitive data, spanning detective, preventative, and corrective controls. A key characteristic is preventing local override of DLP protections.
- **Public Key Infrastructure (PKI)**: Contains Root CAs (kept offline as the ultimate trust anchor), Subordinate/Intermediate CAs (issue certs to Issuing CAs and can revoke them if breached), and Issuing CAs (issue day-to-day certs). Revoked certificates are placed on a Certificate Revocation List (CRL), which can be checked directly or faster via the Online Certificate Status Protocol (OCSP).

**Traditional Chinese (繁體中文):**

- **加密**：對稱加密速度快，用於大量資料加密，但缺乏簡易的金鑰分配機制。非對稱加密 (公鑰/私鑰對) 具擴展性並解決了金鑰分配問題，但速度較慢。發送者使用接收者的公鑰加密；接收者使用自己的私鑰解密。
- **金鑰管理**：金鑰應在經過 FIPS 140-2 驗證的硬體安全模組 (HSM) 中生成。組織常使用「金鑰託管 (Key Escrow)」將金鑰副本存放在第三方，以防金鑰遺失導致資料無法讀取。法規遵循或多雲環境通常會驅使組織採用「自攜金鑰 (BYOK)」或自我管理金鑰策略。
- **資料混淆 (Data Obfuscation)**：
    - _匿名化 (去識別化)_：移除所有相關資料，使其不可能識別出原始主體，進而消除 GDPR 相關風險 (無法還原)。
    - _假名化_：使用化名/別名替換識別碼以降低風險；若能存取原始資料來源則可還原。
    - _權杖化 (Tokenization)_：用隨機生成的權杖取代有意義的資料，原始資料保存在儲存庫中。此方法比加密更強。
    - _遮罩 (Masking)_：僅保留部分可見資料 (例如將信用卡或身分證字號變成星號)。
    - _雜湊 (Hashing)_：將明文轉換為固定長度值的單向函數，用於驗證資料完整性 (如檔案雜湊)。MD5 因存在碰撞 (Collision) 問題已不再被廣泛使用。
- **資料外洩防護 (DLP)**：控制敏感資料的使用，涵蓋偵測性、預防性和糾正性控制。其關鍵特性是防止使用者在本機端覆寫 DLP 保護政策。
- **公開金鑰基礎建設 (PKI)**：包含根憑證授權中心 (Root CA，通常保持離線以作為最終信任錨點)、從屬/中介 CA (發行憑證給發行 CA，並能在外洩時撤銷它們)，以及發行 CA (處理日常憑證發行)。被撤銷的憑證會列入憑證廢止清單 (CRL)，用戶端可直接查詢 CRL 或透過線上憑證狀態協定 (OCSP) 更快速地進行驗證。

---

## 2.4 Data Discovery / 資料發現

**English:**

- **Structured Data**: Exists in rows and columns with a specific schema/data model (e.g., relational databases like Microsoft SQL). Discovery utilizes metadata and semantics.
- **Unstructured Data**: Has no schema or data model (e.g., images, video, free-text). Discovery relies on content analysis, pattern matching, lexical analysis, or hashing.
- **Semi-structured Data**: A combination of both, often unstructured content organized by metadata properties (e.g., JSON, XML, HTML, emails). Requires a combination of discovery tools.
- **Location Impact**: Data location impacts tool choice. Finding data on-premises vs in the cloud might require different tools, and an optimal approach must also inspect data in transit (e.g., catching sensitive emails before they leave the organization).

**Traditional Chinese (繁體中文):**

- **結構化資料**：存在於具有特定綱要/資料模型的行與列中 (如關聯式資料庫 Microsoft SQL)。資料發現主要利用詮釋資料 (Metadata) 與語意。
- **非結構化資料**：沒有綱要或資料模型 (如圖片、影片、自由文字)。資料發現依賴內容分析、特徵比對 (Pattern matching)、詞法分析或雜湊。
- **半結構化資料**：兩者的結合，通常是透過詮釋資料屬性進行組織的非結構化內容 (如 JSON、XML、HTML、電子郵件)。需要結合多種發現工具。
- **位置的影響**：資料位置會影響工具的選擇。探索地端與雲端的資料可能需要不同的工具；最佳的方法還必須能檢查傳輸中的資料 (例如在敏感電子郵件離開組織前攔截)。

---

## 2.5 Data Classification / 資料分類

**English:**

- **Classification Levels**:
    - _Government_: Unclassified (no damage), Confidential (damage), Secret (serious damage), Top Secret (exceptionally grave damage).
    - _Public/Commercial_: Public, Sensitive, Private, Proprietary.
- **Sensitive Data Types**: Personally Identifiable Information (PII), Protected Health Information (PHI, regulated by HIPAA), and Cardholder Data (regulated by PCI DSS).
- **Implementation**: Data classification should happen as soon as possible after creation. It directly drives data protection strategies, appropriate controls, and retention policies.
- **Mapping and Labeling**: Mapping identifies where data resides, while labeling applies consistent markings to sensitive data, often using automated classification tools in DLP policies.

**Traditional Chinese (繁體中文):**

- **分類級別**：
    - _政府機關_：非機密 (無損害)、機密 (造成損害)、極機密 (嚴重損害)、絕對機密 (異常嚴重的損害)。
    - _一般/商業組織_：公開 (Public)、敏感 (Sensitive)、隱私/私人 (Private)、專有/機密 (Proprietary)。
- **敏感資料類型**：個人識別資訊 (PII)、受保護的健康資訊 (PHI，受 HIPAA 規範) 以及持卡人資料 (受 PCI DSS 規範)。
- **實作**：資料建立後應盡快進行分類。分類將直接驅動資料保護策略、適當的控制措施以及資料保留政策。
- **對應與標記 (Mapping and Labeling)**：對應 (Mapping) 可識別資料存放的位置；標記 (Labeling) 則為敏感資料套用一致的標示，通常透過 DLP 政策中的自動化分類工具來實現。

---

## 2.6 Information Rights Management (IRM) / 資訊權限管理

**English:**

- **IRM Objectives**: IRM enforces data rights for shared documents. It limits actions like print, copy, paste, and download. Key objectives include:
    - _Persistence_: Protections must follow the data wherever it travels.
    - _Dynamic Policy Controls_: The ability to update access restrictions even after sharing.
    - _Time-limited access_: Expiring files or requiring the user to check in to retain access.
    - _Continuous Audit Trail_: Generates logs for accountability.
- **IRM Tools**: Rely on centralized services for certificate issuance and access control, along with secure local secret storage. IRM must strictly prevent local modification of access controls to prevent users from extending their rights.
- **Intellectual Property Protections (US)**:
    - _Trademarks_: Protect logos/slogans, last 10 years (renewable).
    - _Patents_: Protect inventions for 20 years but require public disclosure.
    - _Trade Secrets_: Valid as long as secrecy is maintained; lost once discovered.
    - _Copyrights_: Protect creative works, lasting 70 years beyond the creator's death.

**Traditional Chinese (繁體中文):**

- **IRM 目標**：IRM 負責強制執行共享文件的資料權限，限制列印、複製、貼上和下載等動作。關鍵目標包含：
    - _持久性 (Persistence)_：保護措施必須跟隨資料移動到任何地方。
    - _動態政策控制_：即使文件已分享，仍能隨時更新存取限制。
    - _具時間限制的存取_：讓檔案過期，或要求使用者定期連線報到以保留存取權。
    - _連續稽核軌跡_：產生日誌以落實當責性。
- **IRM 工具**：依賴集中式服務進行憑證核發和存取控制，並需要安全的本機端機密儲存。IRM 必須嚴格防止本機端修改存取控制，以免使用者自行擴展權限。
- **智慧財產權保護 (美國)**：
    - _商標 (Trademarks)_：保護標誌/標語，效期 10 年 (可展延)。
    - _專利 (Patents)_：保護發明長達 20 年，但要求公開揭露技術。
    - _營業秘密 (Trade Secrets)_：只要保持機密即有效；一旦被發現即喪失保護。
    - _著作權 (Copyrights)_：保護創作作品，效期為創作者死後 70 年。

---

## 2.7 Data Retention, Deletion, and Archiving / 資料保留、刪除與封存

**English:**

- **Retention**: Often driven by regulatory requirements (e.g., Sarbanes-Oxley requires tax returns kept for 7 years; medical data may need 20-30 years). Retaining data longer than needed increases risk (e.g., in legal discovery).
- **Deletion**: Crypto-shredding (cryptographic erasure) is heavily emphasized. The data is encrypted with a strong engine, and then the encryption keys are destroyed, ensuring data cannot be recovered from any remnant.
- **Archiving**: Key cloud elements include encryption, monitoring, backup/DR, and media type selection. Archives must balance cost with accessibility. Cloud providers offer cool tier storage for low-cost archiving.
- **e-Discovery & Legal Hold**: Archiving platforms must support e-discovery for legal retrieval. A "legal hold" (or litigation hold) protects documents relevant to legal proceedings from alteration or destruction, essentially enforcing permanent retention until a human releases the hold. Immutability flags in cloud storage support this.

**Traditional Chinese (繁體中文):**

- **保留 (Retention)**：通常受法規要求驅動 (例如：沙賓法案要求納稅申報單保留 7 年；醫療資料可能需保留 20 到 30 年)。保留資料的時間超過所需會增加風險 (例如面臨法律蒐證時)。
- **刪除 (Deletion)**：強烈強調「密碼粉碎 (Crypto-shredding)」。先用強大的加密引擎加密資料，接著將加密金鑰徹底銷毀，確保無法從任何殘留資料中復原。
- **封存 (Archiving)**：雲端封存的關鍵要素包含加密、監控、備份/災難復原以及媒體類型選擇。封存必須在成本與存取便利性間取得平衡。雲端供應商提供冷儲存 (Cool tier) 以實現低成本封存。
- **電子蒐證與法定保留 (e-Discovery & Legal Hold)**：封存平台必須支援電子蒐證以利法律調閱。「法定保留」(或訴訟保留) 會保護與法律訴訟相關的文件不被竄改或銷毀，強制執行永久保留，直到人為解除該保留狀態為止。雲端儲存中的「不可變性 (Immutability)」標記功能可支援此要求。

---

## 2.8 Auditability, Traceability, and Accountability / 可稽核性、可追溯性與當責性

**English:**

- **Accountability & Logging**: Auditing logs enforce individual accountability, promoting good behavior. According to OWASP, logs must definitively answer: _Who did what and when_ (and ideally, from where).
- **Event Sources**: Visibility into logs depends on the cloud service model. In IaaS, the customer has the most access to system and infrastructure logs. In PaaS, log visibility is limited to the application level. In SaaS, the customer has the least log visibility, restricted primarily to access control and feature configuration.
- **SIEM Tools**: Security Information and Event Management (SIEM) tools are critical for scaling security ops. Key features include: Log centralization/aggregation (improves context), Data integrity (prevents tampering), Normalization (consistent formats), Correlation (continuous monitoring), Alerting, and Investigative querying.
- **Chain of Custody**: Provides convincing proof that evidence was not tampered with. It logs who handled the evidence, when, and why. Without it, evidence reliability is rejected in legal proceedings.
- **Non-repudiation**: The guarantee that a user cannot deny performing an action. It is enforced through robust logs, digital signatures, and unique accounts. Shared accounts make non-repudiation virtually impossible.

**Traditional Chinese (繁體中文):**

- **當責性與日誌記錄**：稽核日誌能落實個人當責性，促進良好的使用者行為。根據 OWASP 的指導原則，日誌必須明確回答：_誰、在何時、做了什麼_ (理想情況下還應包含「從何處」)。
- **事件來源**：日誌的可見度取決於雲端服務模型。在 IaaS 中，客戶對系統與基礎設施日誌擁有最多的存取權。在 PaaS 中，日誌可見度僅限於應用程式層級。在 SaaS 中，客戶的日誌可見度最低，主要僅限於存取控制和功能設定的日誌。
- **SIEM 工具**：安全資訊與事件管理 (SIEM) 工具對於擴展安全營運至關重要。主要功能包含：日誌集中/聚合 (提升上下文關聯)、資料完整性 (防止竄改)、正規化 (統一格式)、關聯性分析 (持續監控)、警報發布，以及調查查詢功能。
- **監管鏈 (Chain of Custody)**：提供具說服力的證據，證明證據未被竄改。它會記錄誰處理過證據、處理時間及目的。若無監管鏈，證據在法律程序中的可靠性將遭到質疑與拒絕。
- **不可否認性 (Non-repudiation)**：保證使用者無法否認曾執行某項操作。它透過詳盡的日誌、數位簽章和獨立的使用者帳號來實現。若使用共用帳號，將使不可否認性變得幾乎不可能達成。