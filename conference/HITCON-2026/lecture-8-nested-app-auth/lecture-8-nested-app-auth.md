# Lecture 8: CA Bypass Model & Nested App Authentication (NAA)
# 第八講：Conditional Access (CA) 繞過模型與巢狀應用程式認證 (NAA) 全景實戰分析

---

## 1. Speaker Information & Topic / 講者資訊與演講主題

### English
* **Speaker:** **DeCraft**
  * **Affiliations:** Leading cloud security research team specializing in enterprise Identity Providers (IdP), Microsoft Entra ID (Azure AD), and directory-level logic validation models.
  * **Role & Background:** Active vulnerability researchers focused on SaaS trust boundaries, OAuth delegation protocols, and Microsoft 365/Azure active directories. They are the primary discoverers of systemic logic bypass vectors within Microsoft's authorization and Conditional Access engines.
* **Topic:** **CA Bypass Model & Nested App Authentication (NAA)** (Conditional Access 條件式存取繞過模型與巢狀應用程式認證)
* **Lecture Duration:** 40-minute advanced cloud security session presented at HITCON 2026.
* **Grounded Source:** Recorded from the complete, unredacted presentation transcript of **新錄音 43.mp3** (intro) and **新錄音 46.mp3** (full technical session).

### 繁體中文
* **講者：** **DeCraft**
  * **現職與機構：** 頂尖雲端安全研究團隊，專精於企業級身分識別提供者（IdP）、Microsoft Entra ID（原 Azure AD）以及目錄級別邏輯驗證漏洞的深度分析。
  * **專業背景：** 活躍於 SaaS 信任邊界、OAuth 委派協定（Delegation Protocols）及 Microsoft 365/Azure 主動目錄的安全控制研究。他們是微軟授權與條件式存取（CA）評估引擎中多個系統性邏輯繞過漏洞鏈的主要發現者。
* **主題：** **CA Bypass 威脅模型與巢狀應用程式認證 (NAA)** (CA Bypass Model & Nested App Authentication)
* **演講性質：** 於 HITCON 2026 發表之 40 分鐘高階雲端身分安全、條件式存取繞過與雲端委派攻擊實戰演講。
* **內容來源：** 錄音檔案 **新錄音 43.mp3**（開場引言）與 **新錄音 46.mp3**（完整技術演講與問答）之精確 grounding 記錄。

---

## 2. Quick Summary / 內容簡要

### English
In this groundbreaking technical lecture, the DeCraft research team exposes systemic logical vulnerability patterns within Microsoft Entra ID's Conditional Access (CA) evaluation engine. While CA policy is designed to enforce zero-trust walls—verifying the **User** (via MFA) and the **Device** (via Intune compliance/management status) before granting resource access—DeCraft demonstrates how these boundaries can be silently bypassed without user interaction. By abusing **Nested App Authentication (NAA)**, a framework designed to optimize user experience by embedding Single Page Applications (SPAs) inside primary "Broker Clients" (such as Microsoft Teams or Outlook), attackers can inherit parent trust contexts to silently retrieve high-privilege access tokens. DeCraft details **112 combinations of Resource * Scope bypasses** for Microsoft Graph and **221 combinations** targeting sensitive enterprise workloads (including Teams, Exchange Online, and SharePoint Online). They also present an Intune compliance device enrollment bypass via Azure Managed Identities, and an arbitrary identity hijacking vulnerability using a **Path Traversal** logic flaw in User Assigned Identity binding APIs (MSRC-reported as the "Fortune Cookie" exploit).

### 繁體中文
在此次突破性的技術演講中，DeCraft 研究團隊揭露了 Microsoft Entra ID 條件式存取（Conditional Access, CA）評估引擎中一系列系統性的邏輯漏洞模式。雖然條件式存取原則的設計初衷是構建零信任防火牆——在授予資源存取權限之前，必須嚴格驗證**使用者**（透過多重要素驗證 MFA）和**設備**（透過 Intune 合規/受控狀態）；然而，DeCraft 證實了攻擊者可以在完全不與使用者互動的情況下，悄無聲息地繞過這些安全邊界。透過濫用「**巢狀應用程式認證（Nested App Authentication, NAA）**」——一項旨在透過將單頁應用程式（SPA）嵌入「代理客戶端（Broker Clients）」（如 Microsoft Teams 或 Outlook）來優化使用者體驗的框架——攻擊者可以繼承父容器的信任上下文，從而靜默獲取高權限的 Access Token。DeCraft 詳細剖析了針對 Microsoft Graph 的 **112 組資源與權限（Resource * Scope）繞過組合**，以及針對敏感企業工作負載（如 Teams、Exchange Online、SharePoint Online）的 **221 組繞過組合**。此外，他們還展示了利用 Azure 託管身分（Managed Identities）繞過 Intune 合規設備註冊的機制，以及利用使用者指派身分（User Assigned Identity）綁定 API 中的**路徑走訪（Path Traversal）**邏輯缺陷進行任意身分劫持的漏洞（即向 MSRC 通報的「幸運餅乾」漏洞）。

---

## 3. Structured Lecture Context (Extremely Detailed) / 結構化演講內容（極致詳細）

### 3.1 Understanding the CA & NAA Architecture / 條件式存取與巢狀應用程式認證架構解析

#### English
* **The Normal Conditional Access Flow:**
  * To enforce robust security, Entra ID evaluates policies to decide whether a user session requires Multi-Factor Authentication (MFA), compliant devices, or secure locations.
  * If a standard user attempts to authenticate without completing MFA, the CA engine blocks the token request, denying access to the target corporate resources.
* **The Paradigm Shift to Frictionless UX:**
  * To maximize corporate convenience, Microsoft introduced **Nested App Authentication (NAA)**, allowing sub-applications (Single Page Applications / SPAs written in React/Angular) embedded inside native M365 desktop or web containers to authenticate seamlessly without throwing up redundant user login windows or multi-factor prompts.
* **The Nested App Topology:**
  * **Broker Client (BC) [The Container]:** A highly trusted native application, such as **Microsoft Teams** or **Outlook**, running locally or on the web.
  * **Nested App (N-App) [The Guest]:** An HTML/JavaScript/SPA element running *inside* the Broker Client (e.g., a calendar component, a note-taking extension like OneNote, or M365 Copilot).
* **The Dynamic Token Exchange Protocol:**
  1. The nested application initiates a token exchange request, passing intent parameters to the underlying **Broker Client**.
  2. The Broker Client silently constructs a secure request to Entra ID, transmitting **5 critical parameters**:
     * **Broker Client ID:** The highly trusted Application ID of the parent (e.g., Microsoft Teams App ID).
     * **Broker Client Refresh Token (RT):** The parent's persistent cryptographic credential used to exchange for sub-tokens.
     * **Nested App ID:** The identifier of the inner SPA (e.g., OneNote).
     * **Resource ID:** The targeted cloud service API endpoint (e.g., `https://graph.microsoft.com`).
     * **Scope:** The requested API authorization level (e.g., `File.Read`).
  3. Entra ID validates the Broker Client's active trust state and issues an Access Token (AT) for the designated Resource ID and Scope directly to the Nested App, eliminating any human-in-the-loop MFA challenges.

```
+--------------------------------------------------------+
| Broker Client (e.g., Microsoft Teams Container)       |
|                                                        |
|  +--------------------------------------------------+  |
|  | Nested App (e.g., OneNote Single Page App - SPA) |  |
|  |                                                  |  |
|  | 1. Request Token Exchange --------------------+  |  |
|  +-----------------------------------------------|--+  |
|                                                  |     |
|  2. Forward Exchange Request <-------------------+     |
|     - Broker Client ID & Refresh Token (RT)            |
|     - Nested App ID (OneNote)                          |
|     - Target Resource ID (MS Graph)                    |
|     - Scope (File.Read)                                |
|        |                                               |
+--------|-----------------------------------------------+
         |
         | 3. Query Token Exchange
         v
  [ Microsoft Entra ID ] ---- 4. Issue Token (No MFA) ----> [ Issued Access Token ]
```

#### 繁體中文
* **條件式存取（CA）正常防禦機制：**
  * 為了實施零信任安全，Entra ID 會在使用者登入時評估條件式存取原則，以決定該會話是否需要完成多重要素驗證（MFA）、合規設備或受信任的網路邊界。
  * 如果一般使用者在未完成 MFA 的情況下嘗試存取敏感資源，CA 評估引擎將會拒絕發放 Access Token，並中斷存取行為。
* **無痛使用者體驗（Frictionless UX）的典範轉移：**
  * 微軟為了優化企業用戶的流暢度，推出了**巢狀應用程式認證（NAA）**機制。這使得嵌入在 M365 桌面端或網頁端容器（如 Teams 或 Outlook）內部的子應用程式（例如以 React 或 Angular 撰寫的單頁應用程式 SPA），能在不需要彈出重複的登入視窗或 MFA 驗證的情況下，靜默且無感地完成身分驗證。
* **巢狀應用程式（Nested App）的拓撲結構：**
  * **代理客戶端 (Broker Client, BC) [外層容器]：** 獲得高度信任的官方原生應用程式（如 **Microsoft Teams** 或 **Outlook**），運行於本地端或網頁瀏覽器中。
  * **巢狀應用程式 (Nested App, N-App) [內層 Guest]：** 嵌入在代理客戶端內部的 HTML/JS/SPA（例如：一個日曆小工具、OneNote 筆記擴充套件，或 M365 Copilot）。
* **動態 Token 交換協定流程：**
  1. 巢狀應用程式（如 OneNote）向底層的**代理客戶端**（如 Teams）傳送 Token 交換任務。
  2. 代理客戶端在後台向 Entra ID 發起靜默請求，傳送 **5 個關鍵參數**：
     * **代理客戶端 ID (Broker Client ID)：** 父容器的官方 App ID（如 Teams 的官方 ID）。
     * **代理客戶端重新整理 Token (Refresh Token, RT)：** 用於換取新 Token 的父級加密憑證。
     * **巢狀應用程式 ID (Nested App ID)：** 內層單頁應用程式的識別碼（如 OneNote ID）。
     * **資源 ID (Resource ID)：** 目標雲端服務的 API 端點（如 Microsoft Graph）。
     * **權限範圍 (Scope)：** 所需的授權層級（如 `File.Read`）。
  3. Entra ID 驗證代理客戶端的活躍信任狀態後，直接向該巢狀應用程式發放針對目標資源與權限的 Access Token（AT），過程中完全不觸發任何 MFA 驗證。

---

### 3.2 Systemic Logic Bypasses in the NAA Evaluation Engine / NAA 評估引擎之系統性邏輯繞過漏洞

#### English
* **Discovering Undocumented Brokers:**
  * While initial security research suggested only Microsoft's primary Admin Portal served as a broker, DeCraft identified **7 official, highly privileged Microsoft applications** configured as Entra ID Broker Clients that can be manipulated to trigger this flow:
    1. *Microsoft 365 Copilot*
    2. *Microsoft Teams*
    3. *Outlook Mobile*
    4. *Microsoft Outlook*
    5. *Microsoft Teams - T&L*
    6. *Microsoft Teams Web Client*
    7. *M365 Office*
* **The Three Attack Vectors of NAA:**
  DeCraft structured the vulnerability patterns into three core primitives:
  * **Broker Client Bypass (B-Bypass):** Swapping the outer Broker Client ID to inherit the trust level of alternative parent applications.
  * **Nested App Bypass (N-Bypass):** Forging or replacing the internal Nested App ID to requesting scopes on behalf of unauthorized SPAs.
  * **Scope Bypass (S-Bypass):** Manipulating scope strings in transit to escalate privileges.
* **The Exclude Logic Bypass (112 combinations):**
  * Enterprises frequently configure CA rules that enforce strict MFA globally **except** for designated "low-risk" exclusions (such as Office 365 services to avoid employee fatigue).
  * DeCraft discovered that this exclusion engine contains a structural parsing flaw: by requesting specific resource/scope parameters, an attacker with only a victim's basic username and password can completely bypass MFA enforcement across **112 groups of Resource * Scope combinations**.
  * This grants direct access to the **Microsoft Graph API** with `user_impersonation` rights. An attacker can write directly to Exchange Online settings, register backdoor OAuth apps (`Application.ReadWrite.All`), or dump the entire user directory (`Directory.Read.All`) on behalf of the victim.
* **The Include Logic Bypass (221 combinations):**
  * When organizations configure CA to explicitly *include* critical resources (Teams, Exchange Online, SharePoint Online) and require "Compliant Device" policies.
  * DeCraft mapped **221 Resource * Scope combinations** that bypass compliant device evaluation completely. Attackers can execute site-wide SharePoint crawling, intercept Teams chats via user impersonation, or mass-download Exchange mailboxes from unmanaged, untrusted non-compliant devices.

#### 繁體中文
* **發現隱藏的官方代理客戶端（Brokers）：**
  * 過往研究認為僅有微軟的 Azure Portal 充當代理；然而 DeCraft 深入分析後，識別出 **7 款高度特權的微軟官方應用程式**皆已被配置為 Entra ID Broker Clients，均可被惡意操縱以換取 Token：
    1. *Microsoft 365 Copilot*
    2. *Microsoft Teams*
    3. *Outlook Mobile*
    4. *Microsoft Outlook*
    5. *Microsoft Teams - T&L*
    6. *Microsoft Teams Web Client*
    7. *M365 Office*
* **NAA 的三種核心攻擊原語：**
  DeCraft 將此類邏輯缺陷歸納為三種攻擊方式：
  * **代理客戶端繞過 (B-Bypass)：** 更換外層的 Broker Client ID，以繼承其他高權限父應用程式的信任上下文。
  * **巢狀應用程式繞過 (N-Bypass)：** 偽造或替換內層的 Nested App ID，代表未授權的 SPA 申請敏感權限。
  * **權限範圍繞過 (S-Bypass)：** 篡改傳輸中的 Scope 字串以進行權限提升。
* **Exclude（排除）邏輯繞過（112 組組合）：**
  * 企業在部署條件式存取時，常會設定「強制全球啟用 MFA，但排除特定低風險服務（如 Office 365）」的排除規則，以避免員工頻繁收到驗證提示。
  * DeCraft 發現微軟的排除邏輯在語意解析上存在嚴重漏洞：攻擊者在僅持有帳號密碼的情況下，透過指定特定的 Resource/Scope 參數組合，可完全繞過 MFA 原則，波及 **112 組 Resource * Scope 組合**。
  * 最致命的是，這允許直接獲取具有 `user_impersonation` 權限的 **Microsoft Graph API** Token。攻擊者能以使用者身分任意修改 Exchange Online 郵件轉寄設定、註冊惡意 OAuth 應用程式後門（`Application.ReadWrite.All`），或直接導出整份企業目錄（`Directory.Read.All`）。
* **Include（包含）邏輯繞過（221 組組合）：**
  * 當企業設定 CA 原則為「明確 *包含* 敏感資源（如 Teams、SharePoint、Exchange），且要求必須使用『合規設備（Compliant Device）』」時。
  * DeCraft 成功測量出 **221 組 Resource * Scope 組合**能完全繞過設備合規性評估。這意味著攻擊者可以使用任何未受管控、不合規的外部設備，直接對 SharePoint Online 進行全站爬取、竊取 Teams 通訊歷史，或打包下載 Exchange 全文信箱。

---

### 3.3 Infrastructure Escape: Auto-Enrolling \"Compliant\" Devices / 條件式存取基礎設施突圍：自動註冊「合規」設備

#### English
* **The Compliant Device Mirage:**
  * To enforce Device-level trust, organizations require endpoints to be enrolled in Microsoft Intune MDM. Under standard flows, this enrollment is tightly protected by MFA.
* **Managed Identities as the Backdoor:**
  * When an enterprise deploying an Azure Virtual Desktop (AVD) or virtual machine checks the option "Join to Entra ID", the system automatically creates a **Managed Identity** (System Assigned Identity).
  * Within the virtual machine or server's runtime environment, any process can query the local Instance Metadata Service (IMDS) at the link-local IP `169.254.169.254` to fetch the Managed Identity's OAuth token.
  * DeCraft discovered that because this token represents a *resource identity* rather than a *user identity*, **Conditional Access rules are entirely blind to its actions**.
  * By running the registration command line:
    ```bash
    dsregcmd.exe /join
    ```
    the local environment will fetch the token from IMDS, query Entra ID's Device Registration Service (DRS), and automatically register and enroll the system as a fully "Compliant" and "Managed" device in Intune, completely bypassing all MFA enrollment safeguards.
* **Omnipresent Cloud Exploitation:**
  * DeCraft systematic testing proved that this DRS token acquisition is not restricted to virtual machines. They successfully retrieved DRS tokens and enrolled compliant devices from **every major Microsoft runtime service** that supports Managed Identities, including:
    * *Azure Automation Runbooks*
    * *Azure App Services*
    * *Azure Container Apps*
    * *API Management Gateways (APIM)*
  * By gaining code execution on a low-privilege Azure serverless function, an attacker can silently mint "Compliant Device" identities to bypass downstream Zero-Trust corporate firewall boundaries.

#### 繁體中文
* **設備合規性的防禦盲區：**
  * 為了實施設備級信任，企業會要求終端設備必須向 Microsoft Intune MDM 進行註冊。在常規流程中，此註冊行為受 MFA 嚴格保護。
* **託管身分（Managed Identities）成為後門通道：**
  * 當企業在部署 Azure 虛擬桌面（AVD）或常規虛擬機器（VM）時，若勾選「加入至 Entra ID」選項，系統會自動在背景為其創建一個**託管身分**（Managed Identity，如 System Assigned Identity）。
  * 在 VM 的執行環境內，任何行程都可以向本地端 Link-Local IP `169.254.169.254`（即 IMDS 服務）發起查詢，以靜默獲取該託管身分的 OAuth Token。
  * DeCraft 發現，由於此 Token 代表的是「資源身分（Resource Identity）」而非「使用者身分（User Identity）」，**條件式存取引擎對其所有行為完全不予評估與管控**。
  * 攻擊者僅需在虛擬機器或容器內執行以下設備註冊命令：
    ```bash
    dsregcmd.exe /join
    ```
    系統即會向 IMDS 請求專屬 Token，並以此向 Entra ID 的「設備註冊服務（DRS）」進行驗證。隨後，該環境將自動註冊並被 Intune 標記為完全「合規（Compliant）」與「受控（Managed）」的狀態，徹底繞過所有旨在防禦合規設備偽造的 MFA 攔截點。
* **無處不在的雲端特權提取：**
  * DeCraft 的系統性測試證實，這種獲取 DRS 註冊 Token 的能力並不限於虛擬機器。他們在**所有支援託管身分的微軟主流執行時雲端服務**中，皆成功提取出 DRS 註冊 Token 並完成合規設備註冊，包括：
    * *Azure Automation Runbooks*
    * *Azure App Services*
    * *Azure Container Apps*
    * *API Management Gateways (APIM)*
  * 這意味著攻擊者只需在任何低特權的 Azure Serverless 函數或容器中取得程式碼執行權，即可在背景自動「鑄造」出受信任的「合規設備」身分，藉此繞過企業下游所有的零信任防禦。

---

### 3.4 Arbitrary Identity Hijacking via Path Traversal (MSRC-Reported) / 透過路徑走訪進行任意身分劫持 (MSRC 實戰案例)

#### English
* **The "Fortune Cookie" Discovery:**
  * In March, after attending an industry conference, a DeCraft researcher opened a fortune cookie containing the message: *"Everyone has a pass"*. 
  * Prompted by this riddle, the researcher audited the User Assigned Managed Identity binding API gateway and discovered a critical Path Traversal logic vulnerability (referred to internally as the "Pass Traversal").
* **The Path Traversal Primitives:**
  * When a user requests to bind a User Assigned Managed Identity to an Azure resource (such as a VM or an Automation Runbook), the browser triggers a POST request to Microsoft's underlying billing and resource gateway.
  * In standard environments, the API path requires matching ownership verification. However, DeCraft discovered that the gateway fails to sanitize the identity resource URI string.
  * By injecting directory traversal characters (`../`) into the request body, an attacker can bypass the ownership checks of their local environment, forcing Microsoft's **Managed Service Identity** coordinator to bind a high-privilege User Assigned Identity belonging to *another* completely unrelated department or tenant subscription onto their local resource.
* **Finding the Target's Identity ID (The Alternative Names Leak):**
  * To exploit this traversal, the attacker needs to supply the exact Azure Resource ID of the target identity. Under normal conditions, this Resource ID should be confidential and visible only to readers of that billing subscription.
  * However, DeCraft discovered a critical information leak: in Entra ID, every User Assigned Managed Identity maps to a local Service Principal. Inside the publicly readable properties of this Service Principal, the **`alternativeNames`** field explicitly leaks the full Azure Resource ID string.
  * Because the property is readable by **all standard Entra ID users in the directory by default**, any compromised corporate account can immediately query the directory, locate the resource IDs of high-privilege Managed Identities (e.g., domain admins, database controllers), and hijack them via Path Traversal.

```
POST /subscriptions/{MySub}/resourceGroups/{MyRG}/providers/Microsoft.Compute/virtualMachines/{MyVM}
Content-Type: application/json

{
  "identity": {
    "type": "UserAssigned",
    "userAssignedIdentities": {
      "../../targetSubscription/resourceGroups/targetRG/providers/Microsoft.ManagedIdentity/userAssignedIdentities/DomainAdminIdentity": {}
    }
  }
}
```

#### 繁體中文
* **「幸運餅乾」漏洞發現史：**
  * 在 3 月份參加一場安全會議後，DeCraft 研究員打開了一個幸運餅乾，裡面的紙條寫著：*「每個人都持有一張通行證 (Everyone has a pass)」*。
  * 受到這個字條的啟發，研究員著手審計 Azure 的「使用者指派託管身分（User Assigned Managed Identity）」綁定 API，隨即在微軟的網關上發現了一個致命的路徑走訪（Path Traversal）邏輯漏洞（內部命名為「Pass Traversal」）。
* **路徑走訪漏洞原理：**
  * 當使用者嘗試將一個「使用者指派託管身分」綁定至其 Azure 資源（如虛擬機器或自動化 Runbook）時，瀏覽器會向微軟底層的資源管理器網關發送一個 POST 請求。
  * 在常規流程中，網關會驗證發起者是否同時擁有該資源與該託管身分的控制權。然而，DeCraft 發現網關在校驗身分的資源統一資源識別碼（URI）字串時，未進行任何無害化與規範化（Sanitization）過濾。
  * 透過在請求體中注入目錄走訪字元（`../`），攻擊者可以完美繞過自己本機環境的擁有權檢查。這會強迫微軟的 **Managed Service Identity** 協調服務，直接將屬於*其他*完全不相關部門或跨訂閱（Subscription）的「高特權使用者指派身分」，綁定到攻擊者可控的低特權本地資源上。
* **定位目標身分 ID（Alternative Names 資訊洩漏）：**
  * 為了實施此路徑走訪，攻擊者必須精確提供目標身分的 Azure 資源 ID。在一般情況下，此資源 ID 是保密的，僅對該帳單訂閱的讀取者（Readers）可見。
  * 然而，DeCraft 發現了 Entra ID 中一個關鍵的資訊洩漏點：在 Active Directory 中，每個使用者指派的託管身分都會對應一個本地的服務主體（Service Principal）。在該服務主體公開可讀的屬性中，**`alternativeNames`** 欄位會直接、毫無遮蔽地暴露出完整的 Azure 資源 ID 字串。
  * 由於**該屬性預設對目錄中的所有標準企業使用者公開可讀**，任何被入侵的一般員工帳號都可以立即檢索目錄，找出企業內所有高特權託管身分（如：網域管理員、資料庫控制器）的資源 ID，並透過路徑走訪直接將其「偷走」。

---

## 4. Conclusion / 結論

### English
* **The Fragility of Cloud Logic Boundaries:**
  DeCraft's HITCON session underscores that modern cloud platform security is highly sensitive to features being combined without strict boundary checking. When Nest App Authentication interacts with Conditional Access, it creates critical security blind spots that standard zero-trust tools cannot catch.
* **Microsoft's Remediations & Continued Vulnerabilities:**
  * Following DeCraft's reporting, Microsoft initially deemed the NAA bypasses "by design". However, they subsequently scheduled a formal patch release for **May 13, 2026**.
  * The mitigation relies on introducing the **`enable enforcement`** setting (which is disabled by default).
  * However, DeCraft verified that even with this enforcement toggle enabled, **some bypass paths remain fully operational**, proving that Microsoft's semantic parsing repairs are incomplete and require further validation.

### 繁體中文
* **雲端邏輯邊界的脆弱性：**
  DeCraft 在 HITCON 上的演講深刻表明，現代雲端平台的安全邊界在多項複雜功能相互整合時極易崩塌。當「巢狀應用程式認證（NAA）」與「條件式存取（CA）」交織在一起時，會產生致命的安全盲區，這是常規的零信任工具完全無法感知與攔截的。
* **微軟的修補進度與殘留漏洞：**
  * 在收到 DeCraft 的安全通報後，微軟最初認為 NAA 的繞過屬「符合預期設計（By design）」。但隨後他們改變了態度，並承諾在 **2026 年 5 月 13 日**推出正式的漏洞修復程式。
  * 目前的緩解措施依賴於引進名為 **`enable enforcement`**（啟用強制執行）的配置（該選項預設不開啟）。
  * 令人驚訝的是，DeCraft 在現場實測中指出，即使管理員手動啟用了該強制防禦開關，**部分繞過路徑依然暢通無阻**。這證明微軟在語意解析上的邏輯修補並不徹底，企業仍需進行深度的防禦驗證。

---

## 5. Possible Implementation Directions & Defensive Countermeasures / 延伸防禦與資安實作

### English
1. **And-Logic Conditional Access Rule Design:**
   * Do not rely on single signals (such as Compliant Device *or* MFA) in isolation.
   * Redesign Microsoft Entra ID Conditional Access policies to utilize strict **AND logic** (e.g., Session Access = MFA **AND** Compliant Device **AND** Token Protection) to block attackers using nested brokers from sliding through exclusion gaps.
2. **Managed Identity Entitlement Auditing:**
   * Build Azure Sentinel KQL hunting queries to monitor device registration patterns.
   * Generate alerts whenever a DRS token request is issued by non-VM Azure serverless resources (e.g., Automation Runbooks or Container Apps) registering temporary devices under unapproved user domains.
3. **M365 Marketplace & Add-In Restrictions:**
   * Enforce strict administrative consent requirements globally for all Nested App Marketplace items inside Microsoft Teams and Outlook, preventing users from granting unauthenticated permissions to untrusted single-page applications.

### 繁體中文
1. **條件式存取 (CA) 的 AND 邏輯原則優化：**
   * 切勿在策略中單獨依賴單一指標（如僅要求合規設備 *或* 僅要求 MFA）。
   * 重新設計 Microsoft Entra ID 的條件式存取原則，改用嚴格的 **AND 邏輯**（例如：會話存取 = 必須完成 MFA **且** 必須是合規設備 **且** 必須啟用 Token Protection），以防止攻擊者利用巢狀 Broker 在排除名單（Exclude）中鑽漏洞。
2. **託管身分（Managed Identity）特權與註冊行為審計：**
   * 在 Microsoft Sentinel 中撰寫 KQL 威脅狩獵語法，持續監控 DRS（設備註冊服務）的註冊軌跡。
   * 當發現有非虛擬機器（Non-VM）的 Azure 無伺服器資源（如：自動化 Runbook、Container Apps）向 DRS 發起 Token 請求並在目錄中註冊臨時設備時，應立即觸發高風險安全告警。
3. **M365 應用程式商城與增益集管控：**
   * 在全租戶範圍內對 Teams 和 Outlook 內部的所有「巢狀應用程式商城組件」強制執行「管理員同意確認（Administrative Consent）」機制，嚴禁一般使用者自行授權並安裝未受信任的第三方單頁應用程式（SPA）。

---

## 6. Precise Bilingual Transcript / 精確雙語對照對譯逐字稿

### English / 繁體中文 對照

| English | 繁體中文 |
| :--- | :--- |
| Wow, what a smooth user experience. However, as is well known, great power often comes with risks, and smooth experiences are usually the same. | 哇，真是濕華（流暢）的使用者體驗。然而眾所周知，強大的力量往往伴隨著風險，司法的體驗也通常也是旅（伴隨風險的）。 |
| What problems will occur? It is that Conditional Access might be bypassed completely. | 會發生什麼問題呢？就是 Conditional Access 可能會被 P（繞過）死。 |
| Let's first look at what a normal Conditional Access situation looks like. A user performs login verification and requests a token, but there is no MFA, so they cannot pass. | 那我們先來看一個 Conditional Access 正常的狀況是什麼？使用者進行登入驗證，要求 Token 可是沒有 MFA，它沒有辦法通過。 |
| The condition is not met, so the Conditional Access side will refuse this token request. | 條件不通過，那 Conditional Access 那一端就會拒絕這個 Token 的請求。 |
| However, what is the situation with a Conditional Access bypass? The same login verification is performed and passes, even though there is no MFA. | 然而 Conditional Access bypass（條件式存取繞過）是什麼情況呢？同樣地進行登錄驗證要求通過，可是沒有 MFA。 |
| Conditional Access is bypassed anyway, and the issued Access Token is used to access those resources protected by MFA. | 就還是把 Conditional Access 繞過了，那最後拿這個 Access Token 去存取那些被 MFA 所保護的那些資源。 |
| In the past, when searching for this type of bypass vulnerability, the flaws in F or C conversions have already been completely found. | 那在過去在找這種類型 bypass 的漏洞的時候呢，我剛剛說的 F 或者 C 轉換的漏洞已經被找完了。 |
| For example, in the past, some bypasses to evade compliant devices could be found on the Microsoft Authenticator app. | 像過去有在 Microsoft Authenticator app 的這個 APP 上面哦，它可能會找到一些可以繞過合規裝置的 bypass。 |
| There are also some bypasses that can still be used now, which Microsoft probably doesn't want to fix, that can arbitrarily read anyone's email. | 也可能呢可以找到一些現在還可以用的，然後微軟大概沒有要修的 bypass，可以去任意讀取一個人的 email 之類的。 |
| And there is another type that can bypass MFA, which can obtain impersonation rights on relatively low-sensitivity tracking apps. | 那還有一種呢可能是可以 bypass MFA 的，可以在這個相對低敏感度的 tracking（追蹤）的 app 上面拿到 impersonation（模擬）的權限。 |
| Since these past conversion things have already been completely discovered by previous researchers. | 那既然這些過往轉換的東西，其實已經被過去的研究者們都找完了。 |
| For a new researcher like me, is there still some place left to continue exploring and hacking? | 那對於我這種新來的研究者來說，那這個禮物（指漏洞）還有沒有些可以繼續去探索，繼續打的地方？ |
| Yes, indeed, there still is. So I locked my eyes on Microsoft's new feature. | 沒錯，還是有的。所以我把目光鎖定在微軟新的特色。 |
| Just like optimizing user experience, Microsoft felt that optimizing user experience wasn't enough, so they created a new identity verification feature called Nested App Authentication (NAA). | 就像優化使用者體驗一樣嘛，那微軟覺得可能優化學的使用者體驗還不夠多，所以他們又創造了一種新的身分驗證的特性叫做 Nested App Authentication（巢狀應用程式認證）。 |
| What is Nested App Authentication? Microsoft's official documentation has only one page, and this page is actually written quite unclearly. | 什麼是 Nested App Authentication 呢？微軟的官方文件只有一頁，然後這一頁寫的其實不太清楚。 |
| In short, looking at Microsoft's official documentation, this new identity verification feature is designed specifically for SPAs used inside Teams or Office 365 Outlook. | 那簡而言之呢？如果從微軟的官方文件來看，這種新的身分驗證的特性，就是專門為一些 Teams 或是 Office 365 Outlook 內部所使用的 SPA。 |
| The SPA here refers to Single Page Applications, the kind written in React or Angular on the browser front end. | 這邊的 SPA 是 Single Page Application，就那種前端 React、Angular 寫出來的那種。 |
| They run inside, running a JavaScript engine, maybe doing some PDF reading or similar things. | 跟你簽到瀏覽器前端的那種 Single Page Application，就裡面會跑一個 JavaScript，然後可能可以做一些 PDF 閱讀之類的東西。 |
| Anyway, this thing is used by SPAs inside Teams. Saying it this way makes the official document look like it's written for nothing. | 好，那總之它會把這個東西是給 Teams 內部的 SPA 所使用的。好，這樣講好像它的官方文件寫跟沒有寫一樣。 |
| Let's look at how it actually works. First, this is your Teams. | 那我們來看一下到底實際上是怎麼樣呢？首先這是你的 Teams。 |
| If the red box on the outside is Teams, and inside there is something that looks like a calendar, that is Microsoft's calendar app. You can download it on its marketplace. | 如果說外面這個紅色框框是 Teams，然後內部好像有看起來像形式曆的東西，那個是 Microsoft 的 Calendar，你可以在它的 Marketplace 上面下載到。 |
| If you open Teams, find something like this calendar on the marketplace, install it, and open it, then you form this structure. | 那如果說你打開了 Teams，然後你在 Marketplace 上面找了一個類似這種形式曆的東西，安裝了它，並打開了它，那你就構成了這個架構。 |
| The Teams on the outside is the Broker Client, and the calendar inside is the Nested App. | 外面那個 Teams 呢，外面那個 Teams 是 Broker Client，那內部的那個東西就是所謂的 Nested App。 |
| The inner Nested App is actually an HTML page. Microsoft directly embeds it inside Teams, and Teams is essentially a browser. | 就是裡面那個 Nested App，實際上是一個 HTML，微軟直接插到 Teams 裡面的，然後 Teams 本質上是個瀏覽器。 |
| If the inner Nested App, your calendar, wants to operate Excel on the cloud, it will trigger the NAA identity verification flow. | 那如果說今天內部的那個 Nested App 啊，就是你的形式曆想要去操作雲端的 Excel 的時候，那它就會觸發 NAA 的身分驗證流程。 |
| But this identity verification flow is silent. It will not trigger a new SSO, nor will it trigger a new login action. | 但這種身分驗證流程是隱性的，它不會觸發新的 SSO，它不會觸發新的登錄行為。 |
| Through this way, Microsoft allows you to operate cloud Excel inside Teams, wow, without needing to jump to a new identity verification prompt. Extremely smooth. | 所以透過這種方式，微軟就可以讓你在 Teams 裡面操作雲端的 Excel 的時候，哇，不需要再跳一次新的身分驗證，非常的濕華（流暢）。 |
| If you open the Teams Marketplace, there are many Nested Apps available for you to use. | 然後如果你打開 Teams Marketplace 啊，上面有非常多的 Nested App 可以給大家取用。 |
| If mapped to a flow chart: the user performs identity verification; there is an NAA app cluster. The container is the Broker Client, and the inside is the Nested App. | 那如果畫成流程圖的話，可能是說使用者進行身分驗證，那會有一個 NAA 的 APP 的集群，外面是 Broker Client，就說剛剛呈現，然後內部呢會有一個 Nested App。 |
| This cluster will request a token from Entra ID. If verification passes, Entra ID returns the Access Token to this cluster. | 接下來這個集群會去向 Entra ID 要求 Token，如果驗證通過呢，Entra ID 就會把 Access Token 回傳到這個集群當中。 |
| The cluster then uses this Access Token to access back-end resources. This is what NAA is. | 這個集群再用 Access Token 去存取後端的資源，這所謂的 NAA。 |
| To summarize in text format: the internal Nested App first sends a token exchange task to the Broker Client, which is Teams. | 那畫成文字來，因為這樣子聽起來不是那麼的清晰，那如果我把它整理成文字呢，就是內部的 Nested App 會先傳送一個 Token 交換的任務到 Broker Client，也就是 Teams。 |
| Next, the Broker Client forwards the request containing 5 parameters to Entra ID to get a token. | 緊接著呢，Broker Client 會傳送以下五個參數到 Entra ID 拿 Token。 |
| The first parameter is the Broker Client ID, which is Microsoft Teams' ID. | 那第一個參數呢是 Broker Client 的 ID，就是 Microsoft Teams 的 ID。 |
| It also includes its exclusive Broker Client Refresh Token (RT). You must use the Refresh Token to exchange for a new Access Token. | 還有他自己所專屬的 Broker Client 的 Refresh Token（RT），必須要用 Refresh Token 才能去交換新的 Access Token。 |
| The Nested App, as I said, can be a calendar or notes inside Teams. One of the Nested Apps is OneNote. | 那 Nested App 呢，就像我剛剛說的，Teams 內部可能可以開形式曆啊，可能可以記筆記，那其中一個 Nested App 的那就是 OneNote。 |
| You can take notes inside Teams. When you open OneNote and operate cloud resources, it triggers Nested App Authentication in the background. | 你可以在 Teams 裡面做筆記，當你打開 OneNote，然後去操作雲端的東西的時候，它背後其實就觸發了 Nested App Authentication。 |
| It also specifies Microsoft's resource ID on the back end you want to access. | 還在指定說 Microsoft 的 Resource ID，後端你想要存取那個資源是什麼。 |
| And the corresponding permissions for that resource, as I wrote here: File.Read. | 以及你想要這個資源所對應的權限是什麼，像我這邊寫的是 File.Read。 |
| You might want OneNote to read and write your profile information on the cloud, or read your email address and physical address. | 就你可能會希望說 OneNote 可以為你去讀寫你雲端上，去讀取你雲端上面 Profile 的資訊，或是讀到你自己身份上面的，像你的 Email 或居住地址之類的。 |
| Finally, through these steps, the Nested App will obtain an Access Token for Microsoft Graph with File.Read permissions. | 那最後呢，經過了這些東西，第三步驟你就可以最終 Nested App 會取得 Microsoft Graph 有 File.Read 權限的 Access Token。 |
| In the past, during our research on Nested Apps, previous studies claimed that Azure Portal was the only broker. But we found this view is wrong. | 那過去呢，我們在繼續對這個 Nested App 進行研究過程中會發現哦，其實過往研究會發現只有 Azure Portal 是唯一的 Broker，但我們發現這個觀點是有問題的。 |
| We discovered that there are actually 7 distinct Nested App Brokers shipped by Microsoft, as listed above. | 就是我們發現說其實被微軟啟起來的 Nested App 的 Broker 還存在七個，就是上面這七個。 |
| We found it interesting that Copilot is also a possibility. | 我會發現蠻有趣的，就是 Copilot 竟然也是一種可能。 |
| It is included in the package of Windows Automatic Updates. | 就是 Windows 自動更新的，自動更新的那包裡面就包含了這個 Copilot。 |
| And we found new bypass techniques in NAA: Broker Client Bypass (B-Bypass), Nested App Bypass (N-Bypass), and Scope Bypass (S-Bypass). | 並且我們在 NAA 裡面找到了新的繞過手法：Broker Client Bypass、Nested App Bypass，還有 Scope Bypass。 |
| We discovered 3 Conditional Access bypass patterns in NAA. | 並且我們在 NAA 發現了三種 Conditional Access bypass（條件式存取繞過）的 pattern。 |
| We found that MFA can be completely bypassed by the NAA flow. | 我們發現 MFA 是可以被 NAA 的流程 bypass 掉的。 |
| Your compliant device controls can also be bypassed by NAA. | 你的合規裝置也可以被 NAA bypass 掉。 |
| And even Token Protection, a security mechanism that verifies if the current operating system is compliant, can be bypassed. | 還有你的 Token Protection（Token 保護）這種保護驗證你當前作業系統是否合規的一種防護機制也可以被 bypass。 |
| So you design Conditional Access to require MFA, but if I use the NAA flow, I can access MFA-protected resources without having MFA. | 所以就是你 Conditional Access 設計要 MFA，可是如果今天我透過 NAA 的方式，我就可以存取到被 MFA 保護的資源，但是我沒有 MFA。 |
| Here is a diagram. What is B-Bypass? The parameters we send to Entra ID include four items besides RT: Broker Client ID, Nested App ID, Scope, and Resource ID. | 那這邊有個示意圖哦，什麼是 B-Bypass 呢？就是我們剛剛傳送到 Entra ID 的參數可能有四個嘛。就除了 RT 有四個，有 Broker Client ID 啊，Nested App ID，還有 Scope 跟 Resource ID。 |
| What is B-Bypass? We remove the Broker Client and replace it with another one while keeping all other parameters fixed, and then the bypass triggers. | 那 Broker Client 的 B-Bypass 是什麼呢？就是我們今天把 Broker Client 抽掉，抽成別的東西，然後其他的參數都固定，它就會觸發 Bypass。 |
| N-Bypass is also simple: we fix the Broker Client, Scope, and Resource ID, and swap out the Nested App ID, and the bypass occurs. | 那 Nested App 的 N-Bypass 也很單純，就是 Broker Client 固定，Scope 固定，Resource 也固定，我 Nested App 換掉之後 Bypass 就發生了。 |
| Scope-based Bypass is also intuitive: we manipulate the Scope, and the bypass will appear. | 那 Scope-based 的 Bypass 也很直觀，就是 Scope 變化，那最後 Bypass 就會出現。 |
| Since bypasses appeared, we should analyze what design flaws in Microsoft caused these issues. Let's analyze the patterns. | 那我們接下來可能要對於 Bypass 都出現了嘛，那我們可能要分析一下說這些 Bypass 可能是基於微軟的某一些設計所產生的什麼問題之類的，我們可以來分析一下它的 Pattern。 |
| First, in the first design, we found MFA and device compliant bypasses. | 首先我們在第一種設計裡面發現了 MFA 跟裝置的 Bypass。 |
| For Conditional Access, we designed everything to require MFA except for Office 365. | 首先我們在 Conditional Access 上面設計所有東西都要 MFA 除了 Office 365。 |
| As a result, we found that Microsoft's exclusion logic is flawed. | 結果呢，我們發現微軟的排除（Exclude）邏輯是有問題的。 |
| This flaw results in 112 groups of Resource * Scope bypasses. | 它的排除邏輯會造成 112 組 Resource * Scope 組合的 Bypass。 |
| An attacker holding only the username and password can bypass MFA to access 112 resources. | 就攻擊者可以在拿到你帳號密碼的情況底下，繞過 MFA 得到 112 組的 Resource 存取。 |
| Among these, 5 highly sensitive resources are included. What is the most critical one? | 其中包含五個高敏感的資源，其中一個最重大的東西是什麼？ |
| It is Microsoft Graph API, which allows obtaining user_impersonation. | Microsoft Graph 這個 API 竟然可以拿到 `user_impersonation` 權限。 |
| What can user_impersonation do? In Microsoft's OS architecture, it represents the user's identity entirely. | 因為 `user_impersonation` 可以幹嘛呢？在微軟的 OS 設計裡面完全代表使用者的身分。 |
| Specifically, it can directly modify the user's Exchange Online settings. | 具體來說呢，它可以直接去改你 Exchange Online 上面的使用者設定。 |
| If the user has permission to modify settings, or if they are a Microsoft or SharePoint Administrator, the attacker can do anything on behalf of the administrator. | 就是如果說你使用者有改使用者設定的權限或是你的使用者是微軟的或 SharePoint 的管理員，它就有可以去代表管理員的權限做任何事件。 |
| For applications, it can modify all registered devices on Entra ID as long as the user has this permission. | 那 Application 呢，它可以去改你 Entra ID 上面所有註冊裝置，只要使用者有這個權限。 |
| This includes modifying the registered apps and domains to point to attacker-controlled second-level domains. | 那它就能更改上面註冊的 APP 跟 Domain，可以指向駭客所控制的二級 Domain 之類的。 |
| Alright, we've discussed the Exclude logic, which seems quite flawed. | OK，Exclude 的邏輯講完了，Exclude 聽起來蠻有問題的。 |
| Since the Exclude logic is flawed, could the Include logic in Microsoft also have issues? | 那我們 Exclude 講完之後呢，我們就會覺得說，誒會不會微軟在 Include 的邏輯上面也可能部分也可能存在問題呢？ |
| So we conducted deeper testing on the Include part. | 所以我們對 Include 的部分也進行了更深度的測試。 |
| In Conditional Access, we included three resources: Microsoft Teams Services, Exchange Online, and SharePoint Online. | 我們在 Conditional Access 裡面 Include 這三個 Resource：Microsoft Teams Services、Exchange Online 跟 SharePoint Online。 |
| And accessing these three resources must require compliant device protection. | 並且這三個東西的存取資源必須要 Compliant Device 的保護才可以被存取。 |
| The final result was that the Include logic is also flawed. | 那最後結果呢，我們發現 Include 的邏輯也是有問題的。 |
| It allows bypassing compliant device checks for 221 groups of Resource * Scope combinations, exposing 6 highly sensitive resources. | 它有 221 組 Resource 跟 Scope 會被 Bypass，並且過程當中存在六個敏感的 Resource。 |
| Most importantly, you can obtain the highest privilege levels on Microsoft Teams and other services. | 其中最重要的東西是什麼？Teams 和其他服務你都可以拿到最高等級的權限。 |
| What does this mean? Remember what we added to the Include logic in Conditional Access? | 這代表什麼呢？還記得我們剛剛 Conditional Access 加了什麼嗎？ |
| Yes, these three resources included in the Include logic are completely unprotected. | 沒錯，這三個東西被包含在 Include 邏輯裡面是完全沒有受到保護的。 |
| It seems Microsoft's Include logic contains giant flaws. | 好像微軟這個 Include 邏輯衝（充斥）了一些很巨大的缺陷的。 |
| Finally, we reported these vulnerabilities. What happened in the end? | 那最後我們回報這些漏洞，這些漏洞最後怎麼呢？ |
| We found many bypass paths. Interesting enough, Microsoft initially claimed these were "by design". | 我們找到非常非常多 Bypass 的路徑。然而有趣的事情是 Microsoft 認為這些東西都是 By design（符合設計）的漏洞。 |
| Although they claimed it was "by design", they later told us they would patch all these vulnerabilities on May 13, 2026. | 雖然是 By design，但後來他跟我們說他們 2026 年 5 月 13 號會把這些漏洞都修掉。 |
| How did Microsoft patch it afterwards? They introduced a setting called "enable enforcement". | 可是好像沒有要給我們 Bug Bounty 的意思。所以後續微軟怎麼修？他們推出了一個叫做 `enable enforcement` 的設定。 |
| This setting is disabled by default. If you enable it, the Broker Client bypass scenario won't happen, or so they claimed. | 這個東西是預設不會打開，如果你打開的話，那我們剛剛所謂的 B-Bypass 的情況就不會發生，至少我是這麼說的。 |
| Today is HITCON. Can these vulnerabilities still be exploited? We decided to test it. | 那今天是 HITCON 嘛，那這些漏洞還可以利用嗎？我想說那我們還是測試一下吧。 |
| As a result, we found that even after enabling this setting, we could still exploit them. | 結果我們打開了這個設置之後發現，誒，測了一組還是可以動啊。 |
| We tested another combination, and it was the same. | 那我們再測一組還是一樣啊。 |
| "No more than three tests." We tested another one, and found that this vulnerability was not fully fixed. It seems it wasn't patched correctly. | 那事不過三嘛，我們再測一組，發現啊這個這個漏洞其實沒有要修好，好像沒有修好的狀況。 |
| But that's Microsoft. We re-tested all the previous bypass scenarios, and found they all remained fully functional. | 但畢竟是微軟嘛。全部都測了一遍，我們把過去所有找到那些 Bypass 的情況重新再測了一遍，發現全部都還是一樣。 |
| Everything is still exploitable today. After all, it's Microsoft, as everyone knows. | 現在這些東西都還是可以（利用）。畢竟已經是微軟嘛，大家也知道的。 |

---
