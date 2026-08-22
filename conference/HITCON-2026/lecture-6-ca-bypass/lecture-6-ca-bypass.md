# Lecture 6: CA Bypass Model & Nested App Authentication (NAA)
# 第六講：Conditional Access (CA) 繞過模型與巢狀應用程式認證 (NAA)

---

## 1. Speaker Information & Topic / 講者資訊與演講主題

### English
* **Speaker:** **DeCraft**
  * **Affiliations:** Distinguished cloud security research team specializing in enterprise identity providers (IdP), Microsoft Entra ID (Azure AD), and tenant-level logic validation research.
  * **Role & Background:** Active vulnerability researchers focused on identity boundaries, delegation protocols, and Microsoft 365/Azure security controls. They are the discoverers of multiple logic bypass vectors within Microsoft's authentication engines.
* **Topic:** **CA Bypass Model & Nested App Authentication (NAA)** (Conditional Access 繞過模型與巢狀應用程式認證)
* **Lecture Duration:** Presented at HITCON 2026.

### 繁體中文
* **講者：** **DeCraft**
  * **現職與機構：** 傑出的雲端安全研究團隊，專精於企業級身分識別提供者（IdP）、Microsoft Entra ID（原 Azure AD）以及租戶級別邏輯驗證漏洞的深度分析。
  * **專業背景：** 活躍於身分邊界、委派協議（Delegation Protocols）及 Microsoft 365/Azure 安全控制機制的漏洞研究員。他們在微軟的認證引擎中發現了多個邏輯繞過（Logic Bypass）漏洞鏈。
* **主題：** **CA Bypass 威脅模型與巢狀應用程式認證 (NAA)** (CA Bypass Model & Nested App Authentication)
* **演講性質：** 於 HITCON 2026 發表之深度雲端身分安全與實戰邏輯繞過演講。

---

## 2. Quick Summary / 內容簡要

### English
In this lecture, DeCraft exposes a critical class of logical vulnerabilities inside Microsoft Entra ID and its Conditional Access (CA) evaluation engine. While Conditional Access is designed to enforce rigid trust boundaries—verifying the **User** (via MFA) and the **Device** (via compliance and managed state) before granting access—DeCraft demonstrates how these boundaries can be silently bypassed by abusing **Nested App Authentication (NAA)**. By targeting legitimate "Broker Clients" (such as Microsoft Teams or Outlook), an attacker can leverage the underlying trust relationships to request high-privilege Microsoft Graph and Azure Resource tokens on behalf of nested apps. DeCraft identified **112 groups of Resource * Scope bypasses** for Microsoft Graph and **221 groups** across other sensitive services (including Teams, Exchange Online, and SharePoint Online) affecting **7 distinct enterprise broker applications**, completely nullifying Conditional Access constraints.

### 繁體中文
在本演講中，DeCraft 揭露了 Microsoft Entra ID 及其條件式存取（Conditional Access, CA）評估引擎中一類極具威脅的邏輯漏洞。儘管條件式存取的初衷是建立嚴格的信任邊界——在授予存取權限前，必須對**使用者**（透過多重要素驗證 MFA）和**設備**（透過合規性與受控狀態）進行全面驗證；然而，DeCraft 證實了攻擊者可以透過濫用**「巢狀應用程式認證（Nested App Authentication, NAA）」**來無聲無息地繞過這些物理限制。透過鎖定合法的「代理客戶端（Broker Clients）」（例如 Microsoft Teams 或 Outlook），攻擊者可利用其既有的信任關係，代表巢狀應用程式申請高權限的 Microsoft Graph 和 Azure 資源 Token。DeCraft 共發現了 **112 組 Microsoft Graph 的資源與權限（Resource * Scope）繞過組合**，以及針對其他敏感服務（包括 Teams, Exchange Online, SharePoint Online）的 **221 組繞過組合**，波及 **7 款微軟官方代理程式**，使企業精心部署的條件式存取原則形同虛設。

---

## 3. Structured Lecture Context (Extremely Detailed) / 結構化演講內容（極致詳細）

### 3.1 The Entra ID Conditional Access (CA) Evaluation Model / Microsoft Entra ID 條件式存取 (CA) 評估模型

#### English
* **The Normal Authentication Paradigm:** Entra ID uses the **CA Evaluation Engine** to continuously assess authorization requests. Access is granted only when the engine validates:
  * **User Signals:** Successful completion of Multi-Factor Authentication (MFA).
  * **Device Signals:** Verifying that the endpoint is "Compliant" (fully patched and managed under MDM) and "Managed" (active corporate joining status).
* **The Logic Bypass Threat Vectors:** 
  1. **Abusing Built-in CA Behaviors:** Exploiting undocumented pathways where Microsoft allows built-in or legacy services to bypass standard evaluation logic.
  2. **Abusing Entra ID & Azure Features:** Misusing trust delegation models where secondary applications inherit the security classification of their parent container.
* **Impacted Endpoints:** Successful bypass grants unauthorized, un-MFA'd access to highly sensitive Microsoft endpoints, including:
  * **MS Graph** (Microsoft Graph API).
  * **AAD Graph** (Azure Active Directory Graph).
  * **Azure Resource** (Azure Resource Manager/ARM APIs).

#### 繁體中文
* **常規認證典範：** Entra ID 依靠 **條件式存取（CA）評估引擎** 對每一次授權請求進行即時評估。只有在引擎確認以下兩大訊號時才會授予存取權：
  * **使用者訊號：** 成功通過多重要素驗證（MFA）。
  * **設備訊號：** 驗證端點是否「合規（Compliant）」（已完整修補並受 MDM 管理）與「受控（Managed）」（處於活躍的企業加入狀態）。
* **邏輯繞過威脅向量：** 
  1. **濫用內建 CA 行為：** 利用微軟為內建或舊版服務保留的、未公開的特殊路徑，繞過標準評估邏輯。
  2. **濫用 Entra ID 與 Azure 功能：** 惡意利用「信任委派（Trust Delegation）」模型，使次級應用程式直接繼承其父容器（Container）的安全評級。
* **受波及的端點：** 成功繞過後，攻擊者可在無需 MFA 或合規設備的情況下，獲取對極度敏感微軟端點的未授權存取：
  * **MS Graph** (Microsoft Graph API)。
  * **AAD Graph** (Azure Active Directory Graph)。
  * **Azure Resource** (Azure 資源管理器/ARM APIs)。

---

### 3.2 Mechanics of Nested App Authentication (NAA) / 巢狀應用程式認證 (NAA) 運作機制

#### English
* **Core Concept of NAA:** NAA is an authentication protocol designed to allow web-based add-ins or secondary "Nested Apps" (like custom panels inside Word, Excel, Teams, or Outlook) to acquire security tokens from the host "Broker Client" without forcing the user to re-authenticate or face intrusive prompts.
* **The Token Acquisition Loop:**
  * **Step 1: Nested APP to Broker:** The Nested App sends a token generation task/request to the local Broker Client container.
  * **Step 2: Broker to Entra ID:** The Broker Client acts as a proxy and sends a token request to Microsoft Entra ID, forwarding five critical parameters to establish trust and state:
    1. `Broker Client ID` (e.g., Microsoft Teams client ID).
    2. `Broker Client Refresh Token (RT)` (the long-lived token obtained during the initial broker login, which already satisfied CA compliance checks).
    3. `Nested APP ID` (e.g., OneNote ID or the specific add-in application registration ID).
    4. `Resource ID` (e.g., MS Graph target resource URI).
    5. `Scope` (the explicit permission boundary requested, e.g., `File.Read`).
  * **Step 3: Access Token Issuance:** Entra ID validates the parent broker's Refresh Token, approves the nested delegation relationship, and returns the requested **Access Token (AT)** and **Refresh Token (RT)** for MS Graph directly to the Nested App. The nested app can use this AT to fetch resources silently, and the RT can be utilized to persistently acquire new ATs.

```
  [ User ] ====> Logs In (MFA / Device Compliance Verified)
     |
     v
+-----------------------------------------------------------+
| [ Broker Client ] (e.g., Microsoft Teams)                 |
|   - Holds Refresh Token (RT)                              |
|                                                           |
|   +---------------------------------------------------+   |
|   | [ Nested APP ] (e.g., OneNote / Add-In)           |   |
|   |   1. Requests Token ---------------------------> |   |
|   +---|-----------------------------------------------+   |
|       |                                                   |
|       | 2. Forwards RT, Broker ID, Nested ID,             |
|       |    Resource (MS Graph), and Scope (File.Read)     |
|       v                                                   |
+-------|---------------------------------------------------+
        |
        +=========> [ Microsoft Entra ID ]
                        |
                        | 3. Validates and returns Access Token (AT)
                        v
                  [ Nested APP ] (Silently accesses target resources)
```

#### 繁體中文
* **NAA 的核心概念：** NAA 是一種現代認證協定，旨在允許基於網頁的載入增益集或次級「巢狀應用程式（Nested App）」（如 Word、Excel、Teams 或 Outlook 內部的自訂面板）直接從主機端的「代理客戶端（Broker Client）」獲取安全 Token，而無需強迫使用者重新登入或面對干擾性的驗證提示。
* **Token 獲取閉環：**
  * **步驟 1：巢狀應用向代理端發起請求：** 巢狀應用程式向本地代理客戶端（Broker Client）容器發送 Token 生成任務/請求。
  * **步驟 2：代理端轉發至 Entra ID：** 代理客戶端充當代理人，將 Token 請求轉發至 Microsoft Entra ID，並攜帶以下五大關鍵參數以確立信任與狀態：
    1. `Broker Client ID`（代理客戶端 ID，例如 Microsoft Teams 的應用程式 ID）。
    2. `Broker Client Refresh Token (RT)`（代理端重新整理 Token，即主程式首次登入時獲取的長效憑證，該憑證已通過 CA 合規性檢查）。
    3. `Nested APP ID`（巢狀應用程式 ID，例如 OneNote ID 或特定增益集的註冊 ID）。
    4. `Resource ID`（目標資源 ID，例如 MS Graph 的目標資源網址）。
    5. `Scope`（明確要求的權限範圍，例如 `File.Read`）。
  * **步驟 3：簽發存取 Token：** Entra ID 驗證父代代理端的 Refresh Token，核准此巢狀委派關係，並直接向該巢狀應用程式簽發針對 MS Graph 的**存取 Token (AT)** 與**重新整理 Token (RT)**。巢狀應用程式可使用此 AT 在背景靜默存取資源，並可在未來使用 RT 持續獲取新的 AT。

---

### 3.3 The Logic Bypass Flaws: Exclude & Include Exploits / 邏輯繞過漏洞詳解：排除與包含規則濫用

#### English
* **The Exclude Logic Bypass (Microsoft Graph API):**
  * DeCraft identified **112 distinct combinations of Resource * Scope** that were mistakenly excluded from Conditional Access checks when requested via NAA brokers.
  * Most alarmingly, this included **5 high-severity administrative scopes** inside Microsoft Graph, enabling complete tenant-level takeovers without MFA or compliant devices:
    1. `user_impersonation`: Allows full, active impersonation of the target user.
    2. `Application.ReadWrite.All`: Permits the nested app to create, delete, and modify application registrations in the Entra ID tenant (used to plant backdoors or credential keys).
    3. `GroupMember.ReadWrite.All`: Permits manipulation of Active Directory security and utility groups, bypassing role-based access control (RBAC).
    4. `Directory.Read.All`: Allows complete dumping of user directories, metadata, and corporate hierarchy trees.
    5. `Files.ReadWrite.All`: Grants unrestricted read/write control over all files stored in corporate OneDrive and SharePoint document libraries.
* **The Include Logic Bypass (M365 Sensitive Services):**
  * DeCraft mapped **221 distinct Resource * Scope combinations** that bypassed CA rules across **6 highly sensitive enterprise resources**:
    * **Microsoft Teams Services** (`user_impersonation` scope): Enabling silent injection of chat messages, espionage, and lateral social engineering directly inside corporate MS Teams sessions.
    * **Office 365 Exchange Online** (`AdminApi.AccessAsUser.All` scope): Allowing full email harvesting, inbox modifications, and routing rule creations.
    * **Office 365 SharePoint Online** (`user_impersonation` scope): Allowing complete document library scanning.

#### 繁體中文
* **排除邏輯繞過（Exclude Logic Bypass - 鎖定 Microsoft Graph API）：**
  * DeCraft 發現了 **112 組獨特的「資源 * 權限（Resource * Scope）」組合**，當透過 NAA 代理端發起請求時，這些組合會被條件式存取檢查錯誤地「排除」在外。
  * 最駭人聽聞的是，這其中包含了 Microsoft Graph 的 **5 個高敏感/高風險權限範圍**，這意味著攻擊者可在不滿足 MFA 或合規設備的情況下，直接接管租戶權限：
    1. `user_impersonation`：允許完全、主動地模擬目標使用者。
    2. `Application.ReadWrite.All`：允許巢狀應用程式在 Entra ID 租戶中創建、刪除和修改應用程式註冊（可用於植入後門或金鑰）。
    3. `GroupMember.ReadWrite.All`：允許任意修改 Active Directory 安全性與公用群組，繞過角色型存取控制（RBAC）。
    4. `Directory.Read.All`：允許完整匯出使用者目錄、中繼資料（Metadata）以及企業架構樹。
    5. `Files.ReadWrite.All`：授權對企業 OneDrive 與 SharePoint 文件庫中所有檔案的無限制讀寫控制權。
* **包含邏輯繞過（Include Logic Bypass - 鎖定 M365 敏感服務）：**
  * DeCraft 整理出 **221 組獨特的 Resource * Scope 組合**，成功繞過條件式存取規則，波及 **6 個極度敏感的企業核心資源**：
    * **Microsoft Teams Services**（`user_impersonation` 權限）：允許無聲無息地注入聊天訊息、實施通訊監聽，以及在企業內部的 MS Teams 會話中進行橫向社交工程攻擊。
    * **Office 365 Exchange Online**（`AdminApi.AccessAsUser.All` 權限）：允許完全獲取與導出電子郵件、修改收件匣、以及創建轉寄路由規則。
    * **Office 365 SharePoint Online**（`user_impersonation` 權限）：允許全面爬取與下載企業文件庫。

---

### 3.4 Discovered NAA Broker Candidates / 已識別的 NAA 代理程式

#### English
* DeCraft's analysis shattered Microsoft's assumption that the Azure Portal is the sole authorized broker. They discovered **7 distinct Microsoft applications** configured inside Entra ID that act as functional NAA Brokers:
  1. **Microsoft 365 Copilot** (App ID: `0ec893e0-5785-4da6-89da-4ed124e5296c`)
  2. **Microsoft Teams** (App ID: `1fec8e78-bce4-4aaf-ab1b-5451ce387264`)
  3. **Outlook Mobile** (App ID: `27922004-5231-4030-b22d-81ea89a37ea4`)
  4. **Microsoft Outlook** (App ID: `5df081950-3475-41cd-a2c3-d571a3162bc1`)
  5. **Microsoft Teams - TFL** (App ID: `6ec1bc03-4bc8-4302-8bc8-b3c95000b232`)
  6. **Microsoft Teams Web Client** (App ID: `8e050bc0-2b1f-4283-8d4b-75ee78787348`)
  7. **Microsoft Office** (App ID: `d3000dd8-52b3-4102-ac6f-aad22d2ab01c`)

#### 繁體中文
* DeCraft 的分析打破了微軟先前「僅有 Azure Portal 才能充當授權代理端」的假設。他們在 Entra ID 內部發現了 **7 款不同的微軟官方應用程式**，皆被配置為具備完整功能的 NAA 代理端：
  1. **Microsoft 365 Copilot** (App ID: `0ec893e0-5785-4da6-89da-4ed124e5296c`)
  2. **Microsoft Teams** (App ID: `1fec8e78-bce4-4aaf-ab1b-5451ce387264`)
  3. **Outlook Mobile** (App ID: `27922004-5231-4030-b22d-81ea89a37ea4`)
  4. **Microsoft Outlook** (App ID: `5df081950-3475-41cd-a2c3-d571a3162bc1`)
  5. **Microsoft Teams - TFL** (App ID: `6ec1bc03-4bc8-4302-8bc8-b3c95000b232`)
  6. **Microsoft Teams Web Client** (App ID: `8e050bc0-2b1f-4283-8d4b-75ee78787348`)
  7. **Microsoft Office** (App ID: `d3000dd8-52b3-4102-ac6f-aad22d2ab01c`)

---

## 4. Conclusion / 結論

### English
* **Interdependencies Breed Vulnerabilities:** The intricate integration and complex dependency mesh between Azure/Entra resource pools and M365 collaboration tools introduces silent, devastating identity validation flaws.
* **The Fallacy of Single CA Trust:** A single Conditional Access rule is no longer sufficient to guarantee tenant boundary security. Organizations must construct robust **AND gate architectures** that require multiple independent trust signals and strict token validation.
* **Cloud Platforms Can Be Audited:** Cloud identity ecosystems are not completely opaque black boxes. Systematic hypothesis testing and targeted API request analysis remain highly effective methods for mapping out underlying logic and discovering critical logical vulnerabilities.

### 繁體中文
* **複雜相依性催生漏洞：** Azure/Entra 資源池與 M365 協作工具之間錯綜複雜的整合與相依關係，極易引入難以察覺但具毀滅性的身分驗證邏輯漏洞。
* **單一 CA 信任的謬誤：** 依靠單一條件式存取規則已不足以保障租戶邊界的安全。企業必須構建強韌的 **AND 邏輯閘門（AND gate architectures）**，結合多個獨立的信任訊號以及嚴格的 Token 驗證機制。
* **雲端平台絕非不可審計：** 雲端身分識別生態系統並非完全不透明的黑盒子。透過系統化的「合理假設（Hypothesis）」與針對性的 API 請求矩陣測試，依然能極其高效地還原內部運作機制，並挖掘出關鍵的邏輯漏洞。

---

## 5. Possible Implementation & Extension / 延伸防禦與威脅獵捕方向

### English
1. **Sentinel Detection Rule for NAA Token Abuse:** Write a Kusto Query Language (KQL) detection rule in Microsoft Sentinel targeting Entra ID `SignInLogs`. Monitor for instances where high-privilege Microsoft Graph scopes (such as `Application.ReadWrite.All` or `GroupMember.ReadWrite.All`) are requested by nested applications using Teams or Outlook as their executing Client Broker ID.
2. **Entra ID Application Manifest Audit:** Develop an enterprise-wide automated PowerShell script utilizing the `Microsoft.Graph` module to recursively scan all custom and multi-tenant applications registered in the tenant. Flag any application configured with explicit delegation permissions that might act as an unauthorized NAA target.
3. **M365 Add-in Consent Restriction Policies:** Implement tenant-wide policies that disable user-consent for applications requesting high-privilege scopes. Enforce administrative consent requirements for any nested web-panel add-in requesting access inside Outlook or Microsoft Teams.

### 繁體中文
1. **針對 NAA Token 濫用的 Sentinel 偵測規則：** 在 Microsoft Sentinel 中編寫 Kusto 查詢語言（KQL）偵測規則，對帳租戶的 Entra ID `SignInLogs` 實施監控。重點稽核以下行為：當巢狀應用程式（Nested App）透過 Teams 或 Outlook（充當 Client Broker ID）向 Microsoft Graph 申請高敏感權限（如 `Application.ReadWrite.All` 或 `GroupMember.ReadWrite.All`）時，立即發出高風險告警。
2. **Entra ID 應用程式資訊清單（Manifest）自動化審計：** 使用 `Microsoft.Graph` 模組開發企業級 PowerShell 腳本，遞迴掃描租戶內所有已註冊的自訂與多租戶應用程式。針對配置了特定「委派權限」且可能被用作 NAA 巢狀攻擊目標的應用程式進行重點標記。
3. **M365 增益集同意權限收緊原則（Consent Policies）：** 在租戶層級實施全面限制，禁止一般使用者對申請高權限 Scope 的應用程式進行自主授權（User Consent）。強制要求所有在 Outlook 或 Teams 中運行的巢狀網頁面板增益集（Add-ins）在啟用前必須經過全域管理員審查與授權。

---

## 6. Precise Bilingual Transcript / 雙語對照逐字稿

> **Technical Note:** Unlike other presentations at HITCON 2026, the audio file **新錄音 45.mp3** captures only the opening welcome remarks and title announcement by the track moderator. The complete technical presentation was delivered silently through visual slides and live console demonstrations. To ensure absolute grounding, the precise bilingual transcript of the moderator's introductory segment is provided below.
> 
> **技術備註：** 與 HITCON 2026 的其他議程不同，與第六講對應的音訊檔案 **新錄音 45.mp3** 僅記錄了該場次主持人/助理主持人的開場致詞與主題介紹。後半段的技術簡報與主控台展示是以無聲投影片和現場操作完成。為確保內容的絕對真實性，以下提供主持人開場部分的精確雙語對照逐字稿。

| English | 繁體中文 |
| :--- | :--- |
| The assistant moderator spent nearly an hour practicing just to pronounce this title correctly. Alright, now the next session... | 那個助理主持為了唸好這個標題，他們花了快一個小時練這個這個。好，那下一場... |
| ...was presented just two weeks ago at USA, and the speaker has a small request. | ...是由我們的這場兩個禮拜前在 USA 上面發表，然後那個講者有一個小要求。 |
| He said since there are resource police present, the entire room should be even more... so everyone, let's welcome him with a round of applause. | 他說竟然有資源警察，那現在那整場就更...那大家可以，那我們就掌聲歡迎。 |

---
