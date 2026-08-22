# Lecture 9: One Click to Rule Them All: Handcrafted Microsoft Edge Browser RCE
# 第九講：一擊奪魂：純手工打造的 Microsoft Edge 瀏覽器 RCE

---

## 1. Speaker Information & Topic / 講者資訊與演講主題

### English
* **Speaker:** **Orange Tsai (蔡政達)**
  * **Affiliations:** 
    * Principal Security Researcher and Chief Red Teamer at **DEVCORE (戴夫寇爾)**.
    * Multiple-time Pwn2Own Champion, world-renowned web and browser security researcher, and frequent speaker at Black Hat USA, DEF CON, and HITCON.
  * **Role & Background:** A legendary white-hat hacker who excels in logic-driven exploit chains and infrastructure compromises. Known for discovering critical architectural vulnerabilities in major mail servers, VPNs, and global enterprise ecosystems.
* **Topic:** **One Click to Rule Them All: Handcrafted Microsoft Edge Browser RCE** (一擊奪魂：純手工打造的 Microsoft Edge 瀏覽器 RCE)
* **Lecture Duration:** 40-minute keynote presentation at HITCON 2026.

### 繁體中文
* **講者：** **Orange Tsai (蔡政達)**
  * **現職與機構：**
    * **DEVCORE (戴夫寇爾)** 主任資安研究員。
    * 多屆 Pwn2Own 漏洞大賽冠軍、全球頂尖 Web 與瀏覽器安全研究員，Black Hat USA、DEF CON 及 HITCON 的常客講者。
  * **專業背景：** 傳奇級白帽駭客，擅長以精妙的邏輯推理建構漏洞利用鏈，擊穿企業基礎設施。他以發現多個全球主流郵件伺服器、安全防護設備（VPN）和跨國軟體架構的底層邏輯缺陷而聞名。
* **主題：** **One Click to Rule Them All: Handcrafted Microsoft Edge Browser RCE (一擊奪魂：純手工打造的 Microsoft Edge 瀏覽器 RCE)**
* **演講性質：** 於 HITCON 2026 發表之 40 分鐘技術演講與「純手工」瀏覽器沙箱逃逸實證發表。

---

## 2. Quick Summary / 內容簡要

### English
In this groundbreaking and deeply philosophical presentation, Orange Tsai walks through his discovery of a complete, single-click Remote Code Execution (RCE) chain targeting Microsoft Edge. In an era where security companies and technology giants like Google and Microsoft are leveraging artificial intelligence (LLMs) to scan and patch thousands of software bugs automatically, Orange chose a different path: **relying entirely on pure human logical reasoning to discover a brand-new attack surface**. 

By auditing the asynchronous browser navigation model, Orange uncovered a race condition in Microsoft Edge's custom **Cloud Profile Switch** navigation filter. When a navigation is processed asynchronously in the high-privilege **Browser Process**, if no source renderer is specified, Edge defaults to applying the navigation target—including malicious `javascript:` URIs—to the **currently active tab**. This logical flaw yields an incredibly potent, CSP-bypassing **Universal XSS (UXSS) primitive**. By chaining this with three other customized Microsoft logical bugs (including popup blocker whitelists, Windows SSO integration, and MSN credential-leaking CORS misconfigurations) and a privilege escalation path inside Edge’s custom **Reading Mode (`read:` scheme)**, Orange succeeded in writing arbitrary files on disk. Finally, he bypassed JSON-based UTF-8 character restrictions to trigger a completely silent, unprivileged system execution (spawning `calc.exe`) upon restarting Microsoft Edge.

### 繁體中文
在這場極具啟發性、兼具技術深度與資安哲學思辨的演講中，Orange Tsai 完整重現了他如何「純手工」發掘並串聯出一個能完全擊穿 Microsoft Edge 瀏覽器安全防線的單擊遠端程式碼執行（RCE）漏洞鏈。在現今資安巨頭紛紛運用人工智慧（LLM）發動大規模程式碼審計、自動修復數千個漏洞的時代，Orange 選擇了一條背道而馳的道路：**完全依賴人類的邏輯推理，開闢全新的攻擊面**。

藉由審計異步導航（Asynchronous Navigation）模型，Orange 在 Microsoft Edge 特有的 **Cloud Profile 切換導航過濾器（Navigation Sortal）** 中，發現了一個驚人的「當前分頁（Current Tab）」競態條件漏洞（Race Condition）。當高特權的「瀏覽器進程（Browser Process）」在異步處理導航時，若未指定發起的來源「渲染進程（Renderer Process）」，瀏覽器會盲目將導航目標——包括惡意的 `javascript:` 網址——套用至**當前正處於活動狀態（Active）的分頁**。此邏輯漏洞孕育出一個極其強大、能完全無視 CSP（內容安全策略）的 **Universal XSS (UXSS) 元語**。

Orange 進一步串聯了其他四個微軟特有的邏輯缺陷（包括繞過彈出視窗攔截的 about:blank 白名單、Windows SSO 靜默登入機制、MSN 的 CORS 憑證洩漏，以及 Edge 專屬**閱讀模式（Reading Mode, `read:` scheme）** 下的 `edgeFeedbackPrivate` 特權 API），實現了任意檔案寫入。最終，他巧妙地繞過了 JSON 傳輸下的 UTF-8 字元編碼限制，利用自訂協議處理器與 Edge 靜默重啟機制，在無任何使用者警示的狀況下成功執行系統指令（彈出 `calc.exe`）。

---

## 3. Structured Lecture Context (Extremely Detailed) / 結構化演講內容（極致詳細）

### 3.1 The Battle of AI vs. Human: Why Browser Logic Bugs represent the New Frontier / AI 時代的人機大戰：為何邏輯漏洞是瀏覽器的終極防線

#### English
* **The Rapid Rise of LLM Bug Hunting:** Orange Tsai traces the state of modern vulnerability research in early 2026. Security companies and major software vendors have turned to AI agents as primary tools for bulk bug detection. 
  * Google used its own proprietary AI models to audit the Chromium V8 source code in June, automatically identifying and repairing **over 1,000 security CVEs** within a single month [251].
  * Security organizations have built autonomous agents to automate the entire fuzzing-to-patch pipeline, creating a paradigm shift in classical bug hunting.
* **The Exploitability Bottleneck (V8 Sandbox):** Finding memory corruption bugs is trivial for AI, but exploiting them has become an astronomical hurdle [251]. Standard Chromium features like the **V8 Sandbox** isolate memory corruption events. An attacker can achieve arbitrary read/write inside the sandbox but remains entirely trapped within a highly restricted virtual memory pool [251, 252].
* **The Sandbox Escaping Constraint:** Getting code execution inside the renderer process (the browser tab) is only "an entry ticket" (入場券) [252]. The **Browser Sandbox** isolates renderer processes from the host operating system [252]. To achieve full control, the attacker must find a vulnerability in the **Browser Process** (running with high privileges) and attack it via Mojo IPC from the restricted renderer [252, 253].
* **Why Logic Bugs Evade AI:** AI models excel at scanning memory safety bugs because they have clear, universal crash patterns [254]. Conversely, **logic bugs (邏輯漏洞)** have no universal crash signals, require deep contextual reasoning, and require auditing massive source code structures [254]. For example, Chromium's source code contains nearly **1 billion tokens**, which exceeds current LLM context windows, placing multi-layered logic bugs entirely in the domain of human creative intuition [254].

#### 繁體中文
* **LLM 漏洞掃描的崛起：** Orange Tsai 回顧了 2026 年初全球資安研究的現狀：各大軟體廠商和資安公司已全面導入 AI Agent 作為代碼審計的主力。
  * Google 在 6 月整個月中，利用內部 AI 自動掃描並修復了 Chrome V8 引擎中**超過 1,000 個 CVE 漏洞** [251]。
  * 許多資安團隊將挖洞工作全面外包給 AI 智慧體（Agents），透過人類指導 AI 寫出完整的 Exploit，打破了傳統漏洞挖掘的效率天花板 [251]。
* **利用鏈的瓶頸（V8 沙箱）：** 雖然 AI 能輕易找出記憶體破壞漏洞，但「利用」這些漏洞的難度已呈幾何級數上升 [251]。Chromium 近年全面部署了 **V8 Sandbox**，即使攻擊者在渲染進程中拿到了任意讀寫權限，其破壞力也被嚴格限制在虛擬沙箱空間內，無法直接逃逸 [251, 252]。
* **沙箱逃逸的嚴苛限制：** 在現代安全模型中，拿到 Renderer 進程的控制權僅僅是「一張入場券」 [252]。**Browser Sandbox** 將網頁分頁與主機作業系統完全隔離 [252]。若要完成逃逸，攻擊者必須在極為嚴苛的限制下，透過 Mojo IPC 機制跨進程攻擊高特權的 **Browser Process** [252, 253]。
* **為什麼邏輯漏洞是 AI 的盲區：** AI 擅長捕捉有明確崩潰特徵（Crashes）的記憶體安全問題 [254]。然而，**邏輯漏洞（Logic Bugs）** 沒有統一的判斷標準，需要對整個軟體架構進行深度的上下文語義理解 [254]。Chromium 原始碼包含將近 **10 億個 Token**，天生就超出了目前 LLM 的上下文窗口（Context Window）限制，使得跨模組的邏輯漏洞鏈成為人類駭客展現創造力的專屬疆域 [254]。

---

### 3.2 Bug 1: The Asynchronous "Current Tab" Navigation Race (第一重漏洞：異步導航與「當前分頁」的驚天競態)

#### English
* **Understanding Browser Navigation & Filters (Sortals):** When a user enters a URL or triggers a redirect, the **Browser Process** manages the network request, while **Navigation Sortals (Filters)** intercept the navigation at various stages (e.g., assessing Safe Browsing status or rewriting HTTPS upgrades) [255, 256].
* **Microsoft Edge's Customized Cloud Profile Filter:** Microsoft implemented a custom navigation filter to manage user profiles seamlessly (e.g., when a user accesses internal corporate or enterprise Microsoft portals) [256, 257].
* **The Logic Flaw:** This custom sortal intercepts navigations starting from trusted Microsoft identity domains (like `login.live.com`) [257]. After passing initial origin checks, it retrieves a "switch profile" target URL from the context and issues a new navigation command using standard Chromium interfaces [257]. However, the destination URL was completely user-controlled and was not stripped of unsafe URI schemes (such as `javascript:`) [257].
* **The Breakthrough - The "Current Tab" Race Condition:** Orange Tsai investigated how the Browser Process maps the navigation command back to the original initiating Renderer Process [258]. He discovered that if the navigation command does not explicitly specify a source renderer ID, the Browser Process **automatically defaults to applying the target URL to the currently active focused tab** [259].
* **Constructing the UXSS Primitive:**
  1. The attacker's malicious page initiates a navigation command simulating the Cloud Profile Switch filter [259].
  2. The attacker injects a **10-second delay** into the network transit or asynchronous execution thread [259, 260].
  3. During this 10-second delay, the script lures or automatically switches the active tab of the browser to a highly sensitive site (like Google, Gmail, or iCloud) [259, 260].
  4. When the delay expires, the Browser Process blindly evaluates the `javascript:` URL inside the **currently active tab**, resulting in an unmitigated **Universal XSS (UXSS)** [259].
  5. Because this execution is sent as a direct, high-privilege renderer instruction from the Browser Process, it **completely bypasses Content Security Policy (CSP)** and the Same-Origin Policy (SOP) [259].

#### 繁體中文
* **瀏覽器導航與過濾器（Sortal）原理：** 當使用者輸入網址或觸發跳轉時，由 **Browser Process** 負責調度。在此過程中，**導航過濾器（Navigation Sortals/Filters）** 會在各個階段攔截並判定導航行為（例如：檢查 Safe Browsing 惡意網站、自動升級 HTTPS 等） [255, 256]。
* **Microsoft Edge 的自訂 Cloud Profile 過濾器：** 微軟在 Edge 中實作了獨有的導航過濾器，用以處理企業用戶在存取特定 Microsoft 服務時的「設定檔切換（Profile Switch）」 [256, 257]。
* **安全漏洞：** 這個自訂 Sortal 在攔截來自受信任微軟域名（如 `login.live.com`）的導航請求後，會讀取上下文中的目標網址，並重新發起導航 [257]。然而，微軟未對這個目標網址進行安全過濾，使其成為使用者完全可控的參數，甚至能容許 `javascript:` 特權偽協議網址 [257]。
* **突破性發現——「當前分頁」的競態條件：** Orange Tsai 進一步研究高特權的 Browser Process 如何將異步導航指令對應回發起的 Renderer 頁面 [258]。他發現，如果該導航指令**未明確標記發起源的渲染進程 ID**，Browser Process 會盲目地**將導航目標套用至當前處於活動狀態（Active）的活動分頁** [259]。
* **構建 UXSS 原語利用：**
  1. 攻擊者網頁發起一個模擬 Cloud Profile Switch 的導航請求 [259]。
  2. 攻擊者在代碼中注入一個 **10 秒的延遲（Delay）** [259, 260]。
  3. 在這 10 秒的空檔中，網頁程式引導或自動將瀏覽器當前活動分頁切換至目標高敏感網站（例如 Google, Gmail, iCloud 等） [259, 260]。
  4. 延遲結束後，Browser Process 處理該導航，直接在**當前被切換過去的活動分頁**中執行惡意的 `javascript:` 代碼 [259]。
  5. 由於此代碼是由高特權的 Browser Process 跨進程下發給 Renderer，因此它**能完全忽視目標網站的內容安全策略（CSP）與同源策略（SOP）** [259]。

---

### 3.3 Chaining 4 Logic Flaws to bypass Sandbox Constraints / 勢如破竹：連續繞過四大物理限制的邏輯漏洞鏈

#### English
To make the UXSS primitive fully weaponized without user interaction or manual logins, Orange Tsai chained four separate logical bypasses [264]:

```
+----------------------------------------------------------------------------------------+
|                                  ORANGE'S ATTACK CHAIN                                 |
+----------------------------------------------------------------------------------------+
|  [Malicious Site]                                                                      |
|         │                                                                              |
|         ├── 1. Bypass Popup Blocker ──────> window.open("about:blank")whitelisted      |
|         │                                          │                                   |
|         │                                          ▼                                   |
|         ├── 2. SOP Bypass (Write URL) ────> Redirects popup to login.live.com          |
|         │                                          │                                   |
|         │                                          ▼                                   |
|         ├── 3. Windows SSO Auto-Login ────> Silently authenticates active profile      |
|         │                                          │                                   |
|         │                                          ▼                                   |
|         └── 4. MSN CORS Credential Leak ──> Leaks logged-in victim's email             |
|                                                    │                                   |
|                                                    ▼                                   |
|                              Executes Cloud Profile Switch UXSS                        |
+----------------------------------------------------------------------------------------+
```

1. **Bypassing the Navigation Origin Check (SOP Bypass):**
   * *The Obstacle:* The Cloud Profile Switch sortal only executes if the navigation originates from a trusted domain like `login.live.com` [257, 260].
   * *The Logic Bypass:* Orange exploited standard Same-Origin Policy window behaviors [261]. He used `window.open` from his malicious site to spawn a popup window pointing to the trusted Microsoft domain [261]. While SOP prevents reading data from cross-origin popups, SOP **explicitly allows writing to a cross-origin window's location/URL** [261]. By programmatically writing to the popup's URL, he simulated navigation originating from the trusted domain [261, 262].
2. **Bypassing the Popup Blocker (Whitelisted `about:blank` Bypass):**
   * *The Obstacle:* Modern browsers block automatic window popups without active user interaction (clicks) [262].
   * *The Logic Bypass:* Orange reverse-engineered Edge's customized popup blocker logic and uncovered a hidden, hardcoded Microsoft whitelist [262]. If a popup navigates to the virtual page **`about:blank`**, it is considered safe and whitelisted [262]. Once the whitelisted popup is opened, the attacker's script silently redirects it to `login.live.com`, completely evading the popup blocker [262, 263].
3. **Bypassing the Login Requirement (Windows SSO Auto-Login):**
   * *The Obstacle:* If the user is not actively signed into a Microsoft account inside Edge, the sortal stops and prompts a manual login screen [260, 261].
   * *The Logic Bypass:* Orange exploited Windows-native **Single Sign-On (SSO)** integration [263]. When Edge attempts to navigate to `login.live.com` on a Windows operating system, it automatically intercepts the request, reads the active local Windows account profile, and authenticates the session silently in the background [263].
4. **Bypassing the Email Validation Check (MSN CORS Credential Leak):**
   * *The Obstacle:* The sortal validates that the navigation target's email matches the current profile, meaning the attacker must pre-identify the victim's exact logged-in Microsoft email address [261].
   * *The Logic Bypass:* Orange audited Microsoft's web properties for information disclosures. He discovered an official **MSN subdomain** that printed the logged-in user's email address [263]. Crucially, the MSN page had a misconfigured CORS policy: `Access-Control-Allow-Credentials: true` [263]. By issuing a cross-origin fetch request with credentials from the malicious site, Orange extracted the victim's Microsoft email silently in the background to satisfy the sortal check [263].

#### 繁體中文
為了讓這個 UXSS 原語達到完美的「無使用者互動（Zero Interaction）」且無視帳號登入狀態，Orange Tsai 連續串聯了四個各自獨立的邏輯繞過缺陷 [264]：

1. **同源策略導航起源繞過 (SOP Bypass)：**
   * *面臨障礙：* Cloud Profile Switch 過濾器要求導航的發起點必須是微軟受信任的域名（如 `login.live.com`） [257, 260]。
   * *邏輯繞過：* Orange 利用了同源策略（SOP）對窗口操作的底層定義 [261]。他在惡意網站中調用 `window.open` 創件一個彈出視窗（Popup）指向微軟域名 [261]。雖然 SOP 阻止惡意網站讀取跨域彈出視窗的內容，但 SOP **明確允許父視窗直接寫入（Write）跨域視窗的 location/網址** [261]。藉由操作該彈出視窗的導航網址，他成功模擬了由受信任域名發起導航的行為 [261, 262]。
2. **彈出視窗攔截器繞過 (Popup Blocker Bypass)：**
   * *面臨障礙：* 現代瀏覽器在無使用者主動點擊的情況下，會嚴格攔截所有自動彈出的新視窗 [262]。
   * *邏輯繞過：* Orange 逆向工程了 Edge 特有的彈出視窗攔截器邏輯，發現其中內建了一個隱藏的硬體白名單 [262]。若彈出視窗的初始導航目標是 **`about:blank`**，攔截器會判定其無害並予以放行 [262]。利用此邏輯，Orange 先自動彈出白名單的 `about:blank` 頁面，隨後將其重定向至 `login.live.com`，達成無互動開窗 [262, 263]。
3. **登入狀態要求繞過 (Windows SSO Auto-Login)：**
   * *面臨障礙：* 如果使用者在 Edge 中未登入其微軟帳號，Sortal 便會中斷並彈出登入畫面，阻斷自動攻擊 [260, 261]。
   * *邏輯繞過：* Orange 利用了 Windows 系統與 Edge 瀏覽器原生整合的 **單一登入（SSO）** 機制 [263]。當 Edge 訪問微軟官方登入域名時，會靜默讀取當前 Windows 系統登入的微軟帳戶，並在背景自動完成登入，無需任何使用者介入 [263]。
4. **目標信箱比對校驗繞過 (MSN CORS 憑證洩漏)：**
   * *面臨障礙：* 導航過濾器會嚴格檢查目標網址中攜帶的 Email 參數，是否與當前登入的 Microsoft Profile 一致 [261]。
   * *邏輯繞過：* Orange 對微軟龐大的網站資產進行了審計，發現一個官方的 **MSN 子域名**網頁會在 HTML 中直接印出當前登入使用者的 Email [263]。更致命的是，該網頁存在嚴重的 CORS 配置錯誤（允許攜帶憑證的跨域請求） [263]。Orange 藉此在背景發送跨域 Fetch 請求，神不知鬼不覺地偷出受害者的登入信箱，用以通過過濾器的比對校驗 [263]。

---

### 3.4 Privilege Escalation inside Edge's Custom Reading Mode (`read:` scheme) / 權限提升：暗度陳倉！擊穿 Edge 專屬「閱讀模式」特權域

#### English
* **The WebUI Sandbox Protection:** Achieving Universal XSS allows manipulating web pages, but standard Chromium isolates WebUIs (like `chrome://downloads` or `chrome://settings`) from normal sites [264]. Even if an attacker has UXSS, attempting to navigate or inject a `javascript:` URL into a privileged WebUI is blocked by Chromium's safety filters [264, 265].
* **The Custom `read:` Scheme Discovery:** To bypass this, Orange reverse-engineered Microsoft Edge's customized features and discovered **Reading Mode (閱讀模式)**, which is accessed via a custom **`read:`** URL scheme [265]. 
* **The WebUI Filter Omission:** Unlike standard Chromium, Edge built its Reading Mode using a completely custom implementation to support advanced capabilities like real-time translation, text-to-speech, and Copilot AI integration [265]. Crucially, Microsoft **omitted the `read:` scheme from Chromium's hardcoded privileged WebUI safety blocklists** [265].
* **Injecting into Reading Mode:** Using the UXSS redirection primitive, Orange navigated the tab directly to the `read:` scheme and successfully injected JavaScript into the privileged container [265].
* **The Arbitrary File Write Primitive (`edgeFeedbackPrivate`):** Inside this specialized Reading Mode container, Edge exposed a highly privileged C++ custom binding object named **`edgeFeedbackPrivate`** to JavaScript [265]. Orange audited this object and discovered a native function named **`writeFiles`** [265].
* **Abusing `writeFiles` for Arbitrary Disk Writing:** By passing specifically crafted parameters to `writeFiles`, Orange obtained a primitive to write arbitrary files to the local file system (using standard relative path traversal techniques to bypass extension-appending restrictions) [265, 266].

#### 繁體中文
* **WebUI 的沙箱防禦：** 獲得 UXSS 可以任意控制普通網頁，但現代瀏覽器將特權 WebUI（如 `chrome://downloads`、`chrome://settings`）與普通渲染域嚴格隔離 [264]。即使擁有 UXSS，任何企圖將 `javascript:` 網址導入特權 WebUI 的行為都會被 Chromium 內建的安全過濾器直接阻斷 [264, 265]。
* **Edge 獨家 `read:` 特權偽協議：** 為了尋找突破口，Orange 深度逆向了 Edge 的專屬功能，發現了其獨創的「閱讀模式（Reading Mode）」，該功能是透過獨特且非標準的 **`read:`** 偽協議進行加載 [265]。
* **特權黑名單遺漏：** 與標準 Chromium 的簡易閱讀模式不同，微軟對 Edge 的閱讀模式進行了大幅度的客製化，以整合語音朗讀、網頁即時翻譯以及 Copilot AI 聊天功能 [265]。然而，微軟在進行安全過濾時，**遺漏了將 `read:` 協議加入 Chromium 內建的 WebUI 阻斷黑名單中** [265]。
* **注入特權域：** 利用先前取得的 UXSS 導航重定向，Orange 成功將分頁導航至 `read:` 協議，並在該特權容器內執行任意 JavaScript 代碼 [265]。
* **任意檔案寫入元語 (`edgeFeedbackPrivate`)：** 在此特權閱讀模式容器中，Edge 為了支援系統反饋功能，將一個擁有高特權的 C++ 綁定對象 **`edgeFeedbackPrivate`** 暴露給了前端 JavaScript [265]。Orange 審計該對象時，發現了一個名為 **`writeFiles`** 的原生函數 [265]。
* **濫用 `writeFiles` 寫入本地磁碟：** 藉由向 `writeFiles` 傳遞精心設計的參數（並配合路徑截斷與路徑走訪技術），Orange 成功解鎖了在使用者電腦硬碟中寫入任意路徑檔案的致命能力 [265, 266]。

---

### 3.5 Bypassing UTF-8 Restrictions to achieve Zero-Interaction RCE / 終極一擊：繞過 UTF-8 編碼限制，實現完美靜默 RCE

#### English
* **The UTF-8 Serialization Hurdle:** To achieve system execution (RCE), the classical method is writing a malicious 64-bit Dynamic Link Library (DLL) into a directory where Edge loads binaries upon startup [266]. However, the `writeFiles` API processes data serialized via JSON, meaning **it only accepts valid UTF-8 strings** [267].
* **The 64-bit DLL Constraint:** Standard 64-bit executable PE headers contain binary offsets and hardcoded signature fields (such as `0x8664`) that represent invalid UTF-8 bytes [267]. Attempting to write a raw binary 64-bit DLL via the UTF-8 API causes serialization failure or corrupts the binary structure on disk, blocking execution [267].
* **The Logical Workaround - Custom Protocol Hijacking:** 
  1. Orange designed a brilliant, purely logical workaround. Instead of writing a complex binary, he wrote a tiny **32-bit plain-text batch file (`telnet.bat`)** into a writable directory [268].
  2. Because a batch file is composed entirely of plain ASCII text, it cleanly satisfies all UTF-8 serialization requirements and writes to disk successfully without corruption [268].
  3. Next, using his arbitrary file write primitive, Orange modified the user's Edge local **`Preferences` configuration file** (which is also stored as plain-text JSON) [266, 267].
  4. He modified the registry of custom URL protocols inside the Preferences file, **binding the handler for the `telnet://` protocol to his newly written batch file (`telnet.bat`)** [267, 268].
  5. Finally, using his open redirect primitive, he navigated the browser tab directly to **`edge://restart`**, which silently reboots the browser to apply the modified Preferences file [266, 267].
  6. Upon restart, the browser is forced to navigate to a `telnet://` link, which automatically launches the hijacked protocol handler, executing the plain-text batch file and spawning `calc.exe` cleanly and silently [267, 268].

#### 繁體中文
* **UTF-8 序列化的物理屏障：** 為了將任意檔案寫入轉化為系統控制權（RCE），傳統做法是向 Edge 啟動時會載入的目錄寫入一個惡意的 64 位元動態連結庫（DLL） [266]。然而，`writeFiles` 特權 API 是經由 JSON 進行資料傳遞與序列化，這意味著**它僅接受合法的 UTF-8 字串內容** [267]。
* **64位元 DLL 的結構性限制：** 標準的 64 位元 PE 可執行檔結構中，包含許多二進制偏移量與硬編碼簽名欄位（如 `0x8664`），這些欄位的值在 UTF-8 編碼中屬於非法字元 [267]。直接寫入會導致序列化失敗或檔案損壞，無法被系統正常加載 [267]。
* **精妙的代數迂迴——自訂協議劫持：**
  1. Orange Tsai 構想出一個極其精妙且純邏輯的繞過手段。他放棄寫入複雜的二進制檔案，轉而寫入一個體積微小、完全由純文字（ASCII）構成的 **32 位元批次檔（`telnet.bat`）** 至可寫目錄下 [268]。
  2. 由於批次檔完全由純文字組成，它天生百分之百符合 UTF-8 編碼限制，得以完好無損地寫入磁碟 [268]。
  3. 接下來，Orange 利用任意檔案寫入能力，直接修改了使用者電腦中的 **Edge `Preferences` 設定檔**（該設定檔本質上也是純文字的 JSON） [266, 267]。
  4. 他修改了設定檔中的自訂 URL 協議註冊表，**將 `telnet://` 協議的執行處理器（Handler），強行綁定至他剛寫入的批次檔（`telnet.bat`）** [267, 268]。
  5. 隨後，他利用導航重定向，將分頁導向至 **`edge://restart`**，強制 Edge 靜默重啟以加載全新的 Preferences 配置 [266, 267]。
  6. 重啟後，網頁指令立刻調用 `telnet://` 網址，Windows 系統會盲目調用已綁定的 `telnet.bat`，最終靜默且無警告地執行系統命令，彈出 `calc.exe` [267, 268]。

---

## 4. Conclusion / 結論

### English
* **A Triumph of Human Intuition:** Orange Tsai's keynote highlights that while AI models are increasingly dominating the bug hunting space, pure human logical reasoning is still unmatched in discovering and chaining multi-layered logic bugs.
* **The Onsen Hackathon Legend:** Orange shared a memorable story of how the final stability and exploitation blockers were resolved. During a trip to an onsen (hot spring) in Japan with Jaron Bradley (Lecture 4 speaker) and Nicolas (Lecture 3 speaker), the group stayed up all night in a makeshift "hackathon" to analyze the browser assembly code and finalize this epic RCE exploit [270].
* **A Historic Security Achievement:** This exploit represented a masterclass in modern browser auditing, yielding an unprivileged, single-click Sandbox Escape and RCE, earning Orange Tsai a prestigious security award [268].

### 繁體中文
* **人類智慧的終極勝利：** Orange Tsai 的演講強烈昭示，儘管 AI 在自動化掃描和修復領域大放異彩，但在跨越複雜系統模組、極具創造性的「邏輯漏洞鏈」設計上，人類的思維與幾何想像力依微軟和谷歌的頂級防禦體系而言依然無可替代。
* **溫泉黑客松傳奇：** Orange 透露，在漏洞利用的最後攻堅階段，他與 Lecture 4 的講者 Jaron Bradley 以及 Lecture 3 的講者 Nicolas 一同去日本泡溫泉度假。然而，當聊到 RCE 利用鏈還不夠穩定時，泡完溫泉的三人當晚便在日式旅館裡通宵審計代碼，將度假變成了瘋狂的「黑客松」，最終合力攻克了最後的技術難關 [270]。
* **史詩級資安里程碑：** 該 RCE 利用鏈以極其優雅、無記憶體破壞的純邏輯路徑，擊穿了現代瀏覽器最引以為傲的沙箱隔離，成為近年瀏覽器安全領域的經典教科書案例，並為 Orange 贏得了全球殿堂級的資安大獎 [268]。

---

## 5. Possible Implementation & Extension / 延伸防禦與資安實作

### English
1. **Auditing Navigation Filters (Sortals) for Entitlements:** Modern browsers must implement strict origin mapping checks during asynchronous navigation tasks. When a navigation is queued, the initiating context (Renderer ID and Origin) must be structurally cryptographically signed and validated before the Browser Process executes any redirections.
2. **Reading Mode Sandboxing:** Customized reading modes or alternative schemes (like `read:` or custom help views) should run inside a restricted, low-privilege isolated process, entirely separated from administrative WebUI privilege registries.
3. **Registry and Local Preference Security:** Operating systems and browsers should enforce strict Access Control Lists (ACLs) and File Integrity Monitoring (FIM) rules on JSON-based Preferences files to prevent unauthenticated script engines from modifying custom URL scheme bindings.

### 繁體中文
1. **強化異步導航（Sortal）的來源審計：** 瀏覽器開發商必須對異步導航流程實施嚴格的密碼學簽名與校驗。當導航請求進入隊列時，必須強制綁定並驗證發起端 Renderer ID 與原始 Origin 資訊，嚴禁在未指定來源的狀況下將導航套用至當前活動分頁（Active Tab）。
2. **特權閱讀模式隔離：** 瀏覽器客製化的特殊協議域（如 `read:` 協議）必須與核心特權 WebUI（如 `chrome://`）完全隔離，運行在低特權的沙箱渲染進程中，防止其前端 JavaScript 獲得調用底層作業系統特權 API（如任意檔案寫入）的權限。
3. ** Preferences 設定檔的完整性保護：** 瀏覽器應對硬碟中的 Preferences 設定檔實施主動檔案完整性監控（FIM），禁止未經使用者授權的腳本引擎直接修改內部的自訂 URL 協議綁定，從源頭瓦解協議劫持（Protocol Hijacking）的威脅。

---

## 6. Bilingual Precise Transcript / 雙語對照逐字稿

### English / 繁體中文 對照

| English | 繁體中文 |
| :--- | :--- |
| First, is there an attack surface that can independently discover vulnerabilities on the browser? Today, nobody doubts this. | 首先，現在能夠獨立在瀏覽器上面發現漏洞嗎？那這一點，我想現今沒有人會懷疑。 |
| Since the beginning of the year, we saw researchers using LLMs to find hundreds of vulnerabilities, and they even mocked that finding bugs is just a matter of scaling. | 那從年初這個開始跟做，然後用 LLM 找幾百個漏洞，然後甚至他們還發文嗆說現在對他們來說就只是一組規模而已，然後是找得完的。 |
| In June, Google used its own AI to patch over 1,000 CVEs in Chrome. It is true that AI can find vulnerabilities, and in this aspect, it is faster and better than humans. | 然後到今年那個 Google 用自己的 AI 在 6 月整一個月哦，就修了超過 1000 個 CVE。那確實可以找到漏洞，而且在找漏洞這件事情上面，我覺得它做的比自然研究員更快更好。 |
| But finding vulnerabilities does not mean they are exploitable. Those familiar with browser internals know Google deployed V8 Sandbox years ago to mitigate render-stage crashes. | 但是找漏洞不代表說這些漏洞可以被利用。那尤其是熟悉的同學可能會知道說 Chrome 為了防止 V8 memory corruption，他從好幾年前就開始付予了這個 V8 Sandbox 來去緩解在 render 上面的記憶體漏洞。 |
| So even if you have bugs that corrupt memory, you cannot easily escape. | 所以因此就算你們上面的漏洞在記憶體中搞事，但實際上你也做不了什麼事情。 |
| Can we chain a full exploit? Last month, researchers spent three months with three analysts and AI to bypass the V8 sandbox and achieve renderer RCE. | 那下一步來做，那他最有用的是這個能不能在 V8 sandbox 上面完成一個完整的 RCE 嗎？那想像也不是一個什麼大問題，只要你足夠多地抓到漏洞。那研究員在一個月前拿到了。 |
| While we see human involvement, AI's progress has shattered the stereotype that browser exploitation is impossibly difficult. | 雖然說從一部開始看到有人類參與進來，但是 AI 的這個進展確實打破了許多人以前對 Browser Exploit 很難的一個刻板印象。 |
| Writing browser exploits used to be a delicate craft, requiring step-by-step tracing and precision. Now AI is liberating researchers from this repetitive labor. | 那以往在寫 Browser Exploit，它是一門，真的需要開一個一步一步追踪，然後每個 step 缺一不可、一個需要花費精神去精心打磨的一項工藝，但現在 AI 真的解放了這些重複性勞作。 |
| But even so, this only breaks a simple version of Chrome. There is still a long distance to escaping the full Google Chrome that everyday users run. | 但就算如此，這也還是只是突破了 Chrome 的一個簡單版本。那距離打通真正大眾、我們一般人在使用的這個 Google Chrome 其實還有一段距離。 |
| This is because Chrome has a second, much stricter defense layer called the Browser Sandbox. | 那這是因為 Google Chrome 還有第二層、也是一個更嚴格的叫做 browser Sandbox 的一個防禦機制。 |
| Chrome's sandbox has been developed for nearly 20 years, hardening almost every angle. Google even rebuilt mojo IPC communications to ensure safe process communication. | 那整個 Chrome 的這個 Sandbox 發展了差不多快 20 年，那基本上該防禦的地方都防禦得差不多，那甚至 Google 為了能夠去安全地做到 cross-process 溝通這件事情，他們還重新設置了一套叫 mojo IPC。 |
| Even if you compromise the renderer, you only hold an entry ticket. To break the full security model, you must launch an attack against the browser process. | 那你能想像就是就算你現在拿到了 renderer 上面的 code execution，那你也只是拿到一張入場券而已。那你要成功打破整個安全模型，那你還要遠端地去攻擊右上角的這個 browser process。 |
| Attacking the browser process is much harder than the renderer, as the attack surface is smaller and exploitation complexity is much higher. | 那而且攻擊 browser process 其實還不像在 renderer 有 JavaScript 等等豐富的攻擊面可以利用，那在 browser process 上面的攻擊面更少，那利用難度也更高。 |
| It is so difficult that many researchers bypass binary sandbox mitigations entirely and search for logic bugs instead. | 那這個難度甚至高到就是大家直接乾脆跳過 sandbox mitigation，那改打邏輯的漏洞來去繞過才比較簡單。 |
| This is like the weakest link in a chain; attackers will always jump to the weakest point of defense. | 那某種程度我覺得這也是一種木桶理論啦，攻擊者會跳過整個系統防禦最脆弱的一個短板去進行攻擊。 |
| We wanted to challenge the hardest target: Microsoft Edge. Our first bug lies in Microsoft Edge's customized navigation implementation. | 那我們這次的第一個漏洞就是在 Microsoft Edge 的一個 navigation 的實作上面。 |
| This filter was designed by Edge to manage its customized Cloud Profile Switching. | 那這個是 Edge 專門設計給自己的這個 Cloud ID 去做切換使用的。 |
| It extracts the current URL and checks it against a whitelist of trusted Microsoft domains. | 好，它首先會從當前的 context 取出你的網址，然後檢查是不是在它的白名單裡面。那這個白名單是一份受信任的 Microsoft 的登錄來源。 |
| After passing validation, it retrieves the destination "switch profile" URL and issues a new navigation using Chromium's convention. | 那接著通過一些檢查。那通過前面那些檢查之後，Edge 會接著把你要求轉去的那個目的地網址、把它的 switch profile 給抓出來。然後接著透過 Chromium 內建的 coding convention 去發起一個新的 navigation。 |
| The destination URL is completely user-controlled. You would naturally wonder: can I inject a `javascript:` URL into this parameter? | 好，所以這個時候你的這個 URL 是使用者完全可控的。那你一定會手癢說，那這個 URL 我是使用者可控的，那我是不是能放這個 javascript 的偽協議之類的。 |
| We can trigger a popup box, but we first need to execute JavaScript on `login.live.com` to launch the navigation filter, which is basically self-UXSS. | 確實在 console 裡觸發會跳彈窗，但這個前提是我們要先拿到 `login.live.com` 的 JavaScript execution，我們才能觸發這個漏洞。這跟 self-XSS 差不多。 |
| But then came the most exquisite logical turning point. Looking at the logic under Chrome's architecture, the term "current tab" felt extremely out of place. | 然後接下來就是整個漏洞最精妙的一個轉折。有一天我回頭在看、在梳理整個邏輯的時候，我突然覺得這個 current tab 越想越奇怪。那如果照著我對整個 Chromium 架構的理解，那這個 current tab 的概念在這個 context 下面會顯得有點突兀。 |
| Navigation is processed asynchronously in the Browser Process. But the sortal was triggered from JavaScript inside the Renderer Process. | 導航是在 browser process 中被處理的。所以這個 sortal navigation 它本身是由 browser process 去發起的。但我們剛剛在觸發這個 sortal 的時候，我們是在 renderer 裡面的 JavaScript 去觸發。 |
| How does the Browser Process know which specific renderer initiated the navigation? | 所以說這個 browser process 到底怎麼知道這個轉址是從哪個 renderer 去發起的？這個 current 到底指的是哪個 current？ |
| We reverse-engineered the implementation and found that if a navigation does not specify a source renderer ID, the browser process automatically applies the destination URL to the currently active focused tab! | 我們實際跟進去實作後發現，誒，如果一個 navigation 它沒有去指定 renderer 的這個 source 來源的話，那會自動把當前 active 的這個分頁（Tab）當成要被套用轉址的目標對象。 |
| This behavior is incredible! We just add a 10-second delay to our navigation request, and during this delay, we switch the active tab to Google or iCloud. | 所以在了解到這個行為之後，我們只要稍等一下原本的程式碼。我們把原本的導航加上一個 10 秒的 delay。然後接著在這 10 秒的 delay 之間，我們手動切到另外一個分頁。 |
| The `javascript:` URL evaluates inside the newly focused tab, granting us a Universal XSS (UXSS) that completely bypasses Content Security Policy (CSP)! | 就會在新的 active 網站（例如 Google）跳一個 alert。那接下來我們就有辦法在任意的網站上面執行 JavaScript 了。這是一個 universal 的 XSS，而且能完全無視任何網站上的 CSP！ |
| However, we had to bypass four constraints: originating from Microsoft's whitelist, avoiding user interaction to switch tabs, bypassing login states, and obtaining the victim's email. | 只是我們為了要利用這個 primitive，我們也付出了非常大的代價。首先是白名單檢查、如何避免使用者手動切頁、如何繞過登入狀態限制，以及如何預先得知受害者的電子信箱。 |
| We solved them one by one: we bypassed the origin check using `window.open` (since SOP allows writing cross-origin locations). | 那我們就一個一個來繞過吧。第一個限制：我們可以用 `window.open` 開出一個新視窗指向 `login.live.com`。由於 SOP 允許寫入 cross-origin 的 URL，這成功繞過了起源限制。 |
| We bypassed the popup blocker by exploiting Microsoft's customized whitelist for `about:blank`. | 第二個限制：自動開窗會被攔截。但我們逆向 Edge 的攔截器發現其中寫入了一個白名單。如果開窗指向 `about:blank` 就能放行，隨後再轉回 microft，成功擊穿 popup blocker！ |
| We bypassed the profile login using Windows-native SSO auto-authentication. | 第三個限制：需要已登入的 profile。我們利用了 Windows 的 SSO 機制，當 Edge 遇到 microft.com 時會靜默完成帳號自動註冊登入。 |
| We leaked the victim's email by exploiting a CORS misconfiguration on an official MSN page. We successfully chained these four bugs to trigger our click-to-RCE! | 第四個限制：需要比對 Email。我們在一個官方 MSN 網頁發現它會印出 Email，且其 CORS 政策允許跨域攜帶憑證讀取。我們直接利用 credentials fetch 偷走受害者的 Email 通過比對。我們串聯了四個邏輯缺陷，完成了 single-click RCE 的大躍進！ |
| Next, we elevated privileges using Edge's customized Reading Mode (`read:` scheme), which was missing from Chromium's hardcoded blocklists. | 接下來，我們利用了 Edge 專有的「閱讀模式（`read:` scheme）」特權網頁域，微軟在安全黑名單中遺漏了這個協議，讓我們能在其中執行特權 JS 代碼。 |
| We invoked the C++ native binding `edgeFeedbackPrivate`'s function `writeFiles` to write arbitrary files to disk. | 我們直接調用了 C++ 原生綁定的 `edgeFeedbackPrivate` 物件底下的 `writeFiles` 函數，獲取了任意檔案寫入本地硬碟的元語。 |
| Since JSON-based API only accepted valid UTF-8 strings, writing a 64-bit binary DLL failed due to strict architecture signature headers. | 但這遇到了一個障礙：寫入的資料會經由 JSON 序列化，僅能接受合法的 UTF-8 字元。這阻礙了我們直接寫入含有二進制位元組的 64 位元特權 DLL 檔。 |
| We solved this logically: we wrote a 32-bit plain-text batch file, registered it to handle a custom `telnet://` protocol inside Edge's Preference files, and used `edge://restart` to trigger a reboot and silent execution. | 我們改寫入一個純文字的 32 位元批次檔，並修改 Preferences 設定檔，將 `telnet://` 協議綁定至該批次檔。最後調用 `edge://restart` 重啟瀏覽器，自動調用偽協議執行批次檔，彈出計算機！整個 Exploit 不到 100 行！ |
| Why did I choose to bypass AI? AI is excellent at automated repetitive fuzzer sweeps, but thoughts and pure logic-driven leaps belong exclusively to human ingenuity. | 為什麼選擇刻意不用 AI？因為重複性的勞作已經被 AI 取代了，但開闢全新的攻擊面與精妙的邏輯推理，其想法最重要。而且「不用 AI 很秋」，老了還可以跟年輕人吹牛。 |
| This chain was refined during an 'Onsen Hackathon' in Japan where myself, JB (Jaron Bradley), and L (Nicolas) stayed up all night soaking in hot springs and looking at assembly code together. Thank you all! | 這個利用鏈是在日本泡溫泉度假時，我和 JB（Lecture 4 講者）、L（Nicolas, Lecture 3 講者）泡完溫泉、通宵熬夜看程式碼，把度假變成黑客松合力完成的。謝謝大家！ |

---
