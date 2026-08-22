# Lecture 7: Handcrafted Microsoft Edge Browser RCE
# 第七講：純手工打造的 Microsoft Edge 瀏覽器遠端程式碼執行

---

## 1. Speaker Information & Topic / 講者資訊與演講主題

### English
* **Speaker:** **Orange Tsai (蔡政達)**
  * **Affiliations:** 
    * Principal Security Researcher at **DEVCORE** (DEVCORE 首席資安研究員)
    * Renowned global hacker, Pwn2Own champion, and multiple Black Hat USA speaker.
  * **Role & Background:** Orange Tsai is globally recognized for his groundbreaking research in web application security, server-side exploits, and modern browser vulnerability chaining. He is known for discovering critical exploit chains in major software systems, including Exchange Server (ProxyLogon) and popular web frameworks. This talk was recently presented at Black Hat USA 2026.
* **Topic:** **One Click to Rule Them All: Handcrafted Microsoft Edge Browser RCE** (一擊奪權：純手工打造的 Microsoft Edge 瀏覽器遠端程式碼執行)
* **Lecture Duration:** 40-minute presentation at HITCON 2026.

### 繁體中文
* **講者：** **Orange Tsai (蔡政達)**
  * **現職與機構：**
    * **DEVCORE** 首席資安研究員。
    * 全球知名白帽駭客、Pwn2Own 冠軍，多次受邀於 Black Hat USA 等頂尖國際安全會議發表研究。
  * **專業背景：** Orange Tsai 以其在 Web 應用程式安全、伺服器端漏洞利用與現代瀏覽器漏洞串聯鏈的開創性研究聞名於世。他曾發掘微軟 Exchange Server (ProxyLogon) 等重大系統的致命漏洞。本演講為其在 Black Hat USA 2026 發表之最新瀏覽器安全研究的精華分享。
* **主題：** **一擊奪權：純手工打造的 Microsoft Edge 瀏覽器遠端程式碼執行** (One Click to Rule Them All: Handcrafted Microsoft Edge Browser RCE)
* **演講性質：** 於 HITCON 2026 發表之 40 分鐘深度技術演講與漏洞鏈實證。

---

## 2. Quick Summary / 內容簡要

### English
In this highly anticipated lecture, Orange Tsai outlines his latest research on bypassing Chromium's multi-layered sandbox defenses inside **Microsoft Edge** to achieve Remote Code Execution (RCE) with a single click. In an era where AI agents are automating vulnerability discovery (e.g., Google patching over 1,000 CVEs using AI within a month), Orange deliberately chooses a **"handcrafted" logic-driven approach** to prove that human ingenuity still dominates in complex exploit chaining. The presentation details a sophisticated **Universal XSS (UXSS) and Content Security Policy (CSP) bypass** in Edge's customized "Cloud Profile Switch" navigation portal. By chain-linking four separate vulnerabilities—an Same-Origin Policy (SOP) origin validation bypass, an Edge-customized popup blocker bypass, automated Windows SSO credentials login, and a CORS configuration leak on MSN—Orange gains arbitrary JavaScript execution on any domain. He then escalates this UXSS to RCE by abusing a privileged WebUI associated with Edge's custom Reading Mode, leveraging a C++ binding to execute an arbitrary file write. Orange details how he overcame UTF-8 binary constraints to write a 32-bit payload and register a protocol handler to spawn a calculator (`calc.exe`) using `edge://restart`.

### 繁體中文
在這場備受矚目的演講中，蔡政達（Orange Tsai）分享了他如何繞過 Chromium 內建的多層沙箱防禦，在 **Microsoft Edge** 瀏覽器中實現「一鍵奪權」（單擊即可執行惡意代碼 RCE）的最新研究。在 AI 代理自動化挖洞日益盛行的時代（例如 Google 在單月中利用 AI 修復了超過 1000 個 CVE），Orange 刻意選擇了**「純手工打造」的邏輯型漏洞挖掘路徑**，證明人類在複雜漏洞鏈串聯上的思備優勢。演講詳細剖析了 Edge 特有的「雲端設定檔切換」（Cloud Profile Switch）導航入口中存在的 **通用跨站腳本攻擊（UXSS）與內容安全政策（CSP）繞過**。Orange 藉由串聯四個獨立漏洞：同源政策（SOP）源驗證繞過、Edge 特製彈出視窗攔截器繞過、Windows 系統級自動登入（SSO）特徵，以及 MSN 網站的 CORS 漏洞，在任意網域上獲取了任意 JavaScript 執行權限。隨後，他將此 UXSS 轉化為 RCE：利用 Edge 自製閱讀模式下的特權 WebUI 及其綁定的 C++ 函數進行任意檔案寫入，並巧妙克服了 UTF-8 二進位寫入限制，透過註冊自訂協定與 Edge 重新啟動（`edge://restart`）機制，最終成功彈出小算盤。

---

## 3. Structured Lecture Context (Extremely Detailed) / 結構化演講內容（極致詳細）

### 3.1 AI Vulnerability Hunting vs. Exploitation / AI 漏洞挖掘與漏洞利用的現實瓶頸

#### English
* **The Rise of AI in Bug Hunting:** The year 2026 marked a massive shift in vulnerability discovery. Security teams and tech giants are outsourcing large-scale bug hunting to automated AI agents. For example, Google used its own LLMs to discover and patch over **1,000 CVEs** in Chrome inside a single month.
* **The "Finding vs. Exploiting" Gap:** While AI excels at scanning source code and locating logical discrepancies at high speeds, Orange emphasizes that **finding a bug is fundamentally different from exploiting it**. 
* **Chrome's Heavy Mitigations:** Modern browsers have implemented extremely robust exploit mitigations. For instance, Chrome's Javascript engine (V8) uses symmetric heap isolation, pointer compression, and specialized memory cages (V8 Sandbox) to prevent memory corruption bugs from doing anything meaningful. 
* **The Browser Sandbox Barrier:** Even if a renderer process is fully compromised via code execution, the attacker is still trapped inside Chrome's multi-layered Browser Sandbox, which has been hardened over 20 years. Escaping the sandbox requires exploiting the Browser Process (which has a minimal attack surface) or pivoting to OS-level vulnerabilities. Orange's goal was to bypass these massive defensive structures using a purely logic-based, hand-crafted approach.

#### 繁體中文
* **AI 挖洞的崛起：** 2026 年是自動化漏洞挖掘大爆發的一年。各大科技巨頭全面啟用 AI Agent 進行源碼掃描與動態測試，例如 Google 在 6 月整個月中，利用內部 AI 自動定位並修復了高達 **1000 個以上的漏洞**。
* **「發現」與「利用」的鴻溝：** 儘管 AI 在程式碼邏輯矛盾定位上速度驚人，但 Orange 指出，**「找出漏洞」與「成功將其串聯成武器化的 Exploits」是兩回事**。
* **V8 引擎的重重防禦：** 現代瀏覽器針對記憶體破壞漏洞實施了極為嚴苛的緩解機制（如 V8 Sandbox 的記憶體隔離、指針壓縮與 Heap 強化），使得即便在 JavaScript 引擎中找到記憶體漏洞，也難以在記憶體中搞事。
* **瀏覽器沙箱（Sandbox）的高牆：** 即便攻擊者在 Renderer 執行程序中拿到了 Code Execution 權限，依然會被 Chromium 發展近 20 年的瀏覽器沙箱牢牢困住。要實現真正的遠端代碼執行，必須攻破 Browser Process（其攻擊面極小，難度極高）或轉向系統漏洞。這促使 Orange 轉向尋求完全基於邏輯的、不需要記憶體破壞的「純手工」沙箱逃逸路徑。

---

### 3.2 The Core Exploit Layer: Universal XSS via Profile Switch / 核心攻擊面：設定檔切換導致的通用 XSS (UXSS)

#### English
* **Browser Navigation Portals (Navigation Portals):** Browser navigation is a complex state machine managed in the Browser Process. Navigation portals act as filters that inspect requests at different stages (e.g., verifying safe browsing lists, HTTPS redirection). Over 5 years, Chrome fixed 3,000 CVEs, but fewer than 20 were related to the navigation module.
* **The Microsoft Edge Custom Feature:** Edge customized Chromium's navigation module to support Microsoft's Enterprise Cloud Profile Switching. When a navigation is triggered, the browser checks if the URL matches a hardcoded Microsoft whitelist (e.g., `login.live.com`).
* **The Logic Vulnerability:** If the whitelist check passes, the portal extracts the `switch profile` parameters from the current context and launches a new navigation using Chromium's internal APIs. However, **the destination URL in this profile switch was fully user-controllable**.
* **The "Current Tab" Race Condition:** Orange analyzed Chromium's architecture and discovered a critical logical mismatch:
  1. Navigation is handled asynchronously in the browser process.
  2. If a navigation command does not explicitly specify its **source Render Frame Host (RFH)**, Chromium automatically falls back to applying the action to the **currently active/active tab**!
* **Universal XSS (UXSS) Primitive:** This allowed Orange to trigger a profile-switch navigation, inject a delay (e.g., 10 seconds), and trick the user into switching to another high-privilege tab (e.g., Gmail or iCloud). When the delayed navigation executed, it would run arbitrary JavaScript in the context of the active tab, completely bypassing the Content Security Policy (CSP).

```
   [ Attack Site ] ---- 1. Trigger Delayed Edge Switch Portal Navigation ----> [ Browser Process ]
          |                                                                           |
          |-- 2. User/Script switches tab to [ Gmail / Target Site ]                  | (Targets Active Tab
          |                                                                           |  by default due to
          |<================= 3. Executes UXSS Payload in Active Tab ===============|  missing RFH check)
```

#### 繁體中文
* **瀏覽器導航（Navigation）與過濾器：** 導航是由主處理程序（Browser Process）協調渲染程序（Renderer）進行的複雜狀態機。過濾器（Navigation Portals）會在各導航階段進行審查（如安全瀏覽、HTTPS 重導向）。Chromium 過去五年修復了 3000 個 CVE，但其中與導航模組相關的少於 20 個。
* **Microsoft Edge 的獨家功能：** Edge 修改了導航模組，以支援企業級的「雲端設定檔切換（Cloud Profile Switch）」。當觸發跳轉時，過濾器會審查當前網址是否在 Microsoft 的信任白名單中（例如 `login.live.com`）。
* **邏輯缺陷：** 當白名單審查通過後，過濾器會抓出 `switch profile` 參數並發起新的導航。然而，**跳轉的目的地網址完全是由使用者（JavaScript）所控制的**。
* **「當前分頁（Current Tab）」的競爭條件：** Orange 深入逆向了 Chromium 的實作，發現了一個關鍵的設計邏輯漏洞：
  1. 導航由 Browser Process 遠端異步處理。
  2. 如果發起導航時**沒有明確綁定來源渲染程序（RFH）**，Chromium 就會自作聰明地將「當前 active 的分頁」當作導航的目標。
* **UXSS 攻擊原語：** 藉此，Orange 設計了延遲攻擊鏈：在惡意分頁中發起一個帶有 10 秒延遲（Delay）的 Profile Switch 導航，並在延遲期間引導使用者切換到其他敏感分頁（如 Gmail、iCloud 或 Azure）。當 10 秒時間到，Browser Process 發送的 Profile Switch 跳轉會在當前處於 Active 狀態的敏感分頁中執行，將惡意 JavaScript 直接注入該網域，完全無視該網站的 CSP 內容安全政策。

---

### 3.3 The SOP and Popup Blocker Bypass Chain / 跨越同源政策與彈窗阻擋器的四重繞過鏈

#### English
* **The Whitelist Restriction:** To trigger the profile switch, the origin navigation must start from a trusted Microsoft domain (e.g., `login.live.com`). Orange had to find a way to execute JavaScript in a Microsoft-trusted origin without having an XSS there.
* **Bypassing Whitelists via SOP Race:** When a website opens a new window using `window.open('https://login.live.com')`, the Same-Origin Policy (SOP) blocks the parent window from reading or writing into the child window. However, there is a tiny, historic SOP exception: **a parent window is allowed to write a new URL to the child window before the navigation completes**. By racing the navigation, Orange could inject the malicious navigation query directly.
* **Bypassing the Edge Popup Blocker:** Modern browsers block automated `window.open` calls unless triggered by a direct user click (interaction). Orange reversed Microsoft Edge's customized popup blocker and discovered a privileged, hardcoded internal whitelist. By opening `about:blank` first (which was whitelisted) and then navigating it to `login.live.com`, the popup blocker was completely bypassed.
* **Automated SSO Credentials Authentication:** To execute successfully, the profile switch portal required the user to have an active Microsoft account profile logged into Edge. Orange leveraged a Windows-native SSO feature: when Edge hits Microsoft.com or live.com, it automatically logs in the active Windows account in the background without user prompts.
* **msn.com CORS Configuration Leak:** To construct the precise profile-switch request, Orange needed to leak the victim's logged-in Microsoft email address. He discovered a CORS configuration leak on an official Microsoft MSN sub-domain that exposed the user's active session email in JSON format, allowing his malicious site to harvest it silently via an automated `fetch` request.

#### 繁體中文
* **白名單限制：** 要觸發該導航切換過濾器，跳轉必須由受信任的 Microsoft 網域（如 `login.live.com`）發起。Orange 必須在沒有 XSS 漏洞的前提下，讓這段請求看起來是由微軟官方網域發起的。
* **透過同源政策（SOP）競爭繞過白名單：** 當惡意網站使用 `window.open('https://login.live.com')` 開啟新視窗時，SOP 會阻止父視窗讀寫子視窗的內容。然而，SOP 存在一個歷史遺留的例外：**父視窗在導航完全載入前，被允許對子視窗進行寫入網址操作**。藉由極速競爭（Racing），Orange 成功將精心構造的導航請求直接寫入子視窗。
* **繞過 Edge 彈出式廣告視窗攔截器（Popup Blocker）：** 現代瀏覽器會阻止未經使用者點擊（Interaction）而自動開啟的 `window.open`。Orange 逆向了 Edge 的彈出視窗攔截器，發現其內部包含一個微軟自製的白名單。如果先將視窗開往 `about:blank`（在白名單中），隨後再跳轉至 `login.live.com`，攔截器便會完全失效。
* **Windows 系統級自動登入（SSO）：** 漏洞利用的前提是瀏覽器必須載入一個已登入的微軟設定檔。Orange 巧妙利用了微軟 Windows 內建的 SSO 特性：當 Edge 瀏覽器接觸到 Microsoft.com 或 live.com 時，會自動在背景將當前 Windows 帳號登入，無需任何使用者確認。
* **msn.com CORS 漏洞外洩 Session：** 為了構造設定檔切換，Orange 需要知道受害者的電子郵件地址。他在一個官方的 MSN 子網域上發現了 CORS 配置漏洞，該網域會將當前登入使用者的 Email 以 JSON 格式印出。惡意網站透過發送帶有憑證的跨域請求，便能自動在背景抓取受害者的登入信箱，完成攻擊拼圖。

---

### 3.4 UXSS to RCE: Privilege Escalation via Reading Mode / UXSS 轉化為 RCE：閱讀模式與自製特權 WebUI

#### English
* **WebUI Sandbox Escape Vector:** Chromium restricts standard web origins from accessing high-privilege system APIs. However, browsers use specialized internal pages called **WebUI** (e.g., `chrome://settings`) written in HTML/JS that communicate directly with C++ backend controllers. Orange needed to pivot his UXSS from a standard web origin into a privileged WebUI.
* **Abusing Edge's Customized Reading Mode:** While standard WebUIs block JavaScript injection, Orange discovered that Microsoft Edge implemented a custom Reading Mode running under a unique scheme (`read:` or similar) that was **omitted from Chromium's internal URL scheme blacklist**. 
* **The Feedback Private C++ Binding:** By using his open redirector to jump to this customized Reading Mode WebUI, Orange could execute arbitrary JavaScript within its privileged context. This WebUI exposed a highly privileged private API called **`edgeFeedbackPrivate`** containing native C++ functions.
* **The Arbitrary File Write Vulnerability:** Among these private functions was an undocumented capability named **`writeFiles`** (or similar). By calling this API with specific parameters, Orange successfully achieved **arbitrary file write** capabilities on the user's local operating system.

#### 繁體中文
* **WebUI 沙箱逃逸路徑：** Chromium 嚴格限制一般網頁接觸系統敏感 API。然而，瀏覽器內部有一類特殊的網頁叫 **WebUI**（如 `chrome://settings`），它們由 HTML/JS 寫成，但能與 C++ 後端直接通訊。Orange 的目標是將其 UXSS 權限，從一般網頁網域提升到擁有特權的 WebUI 之中。
* **利用 Edge 的自製閱讀模式：** 一般的 WebUI 有極強的 JS 注入限制。但 Orange 在逆向中發現，Edge 自行開發的「閱讀模式」運行於自訂的 `read:`（或相關）協定下，**微軟在客製化時，忘記將此 Scheme 加入 Chromium 內部的特權黑名單中**。
* **`edgeFeedbackPrivate` C++ 綁定：** 透過他的跨域跳轉，Orange 成功在該特權閱讀模式 WebUI 中執行了 JavaScript。該 WebUI 暴露了一個名為 **`edgeFeedbackPrivate`** 的私有 C++ 綁定對象，含有許多底層的原生 C++ 函數。
* **任意檔案寫入漏洞：** 在這些私有 API 中，包含一個未公開的、名為 **`writeFiles`** 的函數。Orange 藉由傳遞惡意參數調用此 API，成功在受害者的 Windows 本地硬碟中取得了**任意檔案寫入**權限。

---

### 3.5 Bypassing UTF-8 Encoding Constraints to Achieve Execution / 突破 UTF-8 編碼限制與自訂協定遠端執行

#### English
* **The UTF-8 Constraint:** The `writeFiles` API had a major limitation: it processed all inputs inside a JSON structure as UTF-8 strings. Any raw binary data outside the valid UTF-8 range (such as the binary byte `0x8664` required inside the headers of 64-bit Windows DLLs) would corrupt the write operation.
* **The Path Traversal & File Renaming Bypasses:** The API initially saved written files as `.json` files. Orange bypassed this by injecting null-bytes or standard path traversals to truncate and overwrite file extensions, renaming the output to executable formats.
* **The URL Protocol Handler Exploit:** Since a 64-bit DLL was unwriteable due to UTF-8 constraints, Orange devised a brilliant alternative to execute native code without writing a binary DLL:
  1. He wrote a 32-bit plain-text batch script payload and saved it to a writable directory on Windows.
  2. He abused the Windows registry via Edge settings to register a custom URL Protocol Handler for **`telnet`**.
  3. Windows' default handling of the `telnet` protocol seeks a local `telnet.exe` binary. Orange placed his custom 32-bit executable payload under that name in the writable directory.
* **Restarting Edge silently (`edge://restart`):** To trigger the payload without waiting for a machine reboot, Orange utilized his open redirect/UXSS to navigate the browser to **`edge://restart`**. This instantly killed and restarted the Edge process, loading the written configurations, triggering the registered protocol handler, and executing his payload to spawn a calculator (`calc.exe`).

#### 繁體中文
* **UTF-8 編碼限制：** 雖然擁有了任意檔案寫入，但該 `writeFiles` API 存在一個致命瓶頸：它在內部使用 JSON 格式解析，這要求所有寫入內容必須為合法的 UTF-8 字串。像 64 位元 Windows DLL 或 EXE 檔頭中必備的二進位字節（如 `0x8664`），並非合法的 UTF-8 編碼，直接寫入會導致解析失敗。
* **路徑穿越與後綴繞過：** 該 API 預設會將寫入的檔案儲存為 `.json` 格式。Orange 透過在檔名中注入 NULL 字節與路徑穿越字元，成功截斷了擴充副檔名，實現了任意格式的命名。
* **利用 URL 協定處理器（Protocol Handler）繞過二進位限制：** 由於無法寫入 64 位元二進位 DLL，Orange 想出了一個避開二進位、純文字即可執行的精妙方案：
  1. 寫入一個純文字的 32 位元批次處理指令檔（Batch Script），將其儲存於 Windows 系統的特定可寫目錄中。
  2. 透過修改 Edge 配置，註冊或竄改 Windows 註冊表中的 **`telnet`** 自訂協定（URL Protocol）。
  3. Windows 在處理 `telnet` 協定時，預設會尋找本地的 `telnet.exe`。Orange 將其 32 位元的自製 Executable（其編碼不含 UTF-8 衝突字元）命名為 `telnet.exe` 並放入該可寫目錄中。
* **無痛重啟 Edge（`edge://restart`）：** 為了不讓攻擊被動等待使用者重開機，Orange 利用 UXSS 導航跳轉至 Edge 內建的 **`edge://restart`**。這會使瀏覽器瞬間結束程序並重新啟動，載入惡意設定檔，並自動戳發該註冊協定，最終成功彈出小算盤（`calc.exe`）。

---

## 4. Conclusion / 結論

### English
* **A Masterpiece of Logic Chaining:** Orange's research demonstrates that even when memory corruption bugs are completely mitigated by security boundaries like sandboxes and cages, **logical discrepancies across complex feature integrations remain a devastating attack vector**.
* **The Power of Human Intuition:** In a market saturated with AI-fueled scanning tools, this exploit chain stands as a testament to the irreplaceable value of human logic, reverse-engineering, and deep architecture understanding.
* **A Legendary Collaboration:** Orange Tsai concludes his talk by revealing that the final breakthrough on turning his UTF-8 constrained file-write into native RCE occurred during an impromptu hot-spring hackathon (Onsen Hackathon) in Japan with Jaron Bradley (Lecture 4) and Nicolas (Lecture 3).

### 繁體中文
* **邏輯串聯的極致藝術：** Orange 的研究向安全界證實，即便是記憶體破壞漏洞已被沙箱、硬體緩解等機制封鎖得密不透風，**跨功能、跨模組整合中產生的邏輯衝突，依然是撕開安全防線的致命利刃**。
* **人類思維的無可替代性：** 在 AI 自動化挖洞席捲產業的當下，這條完美的手工漏洞鏈證明了人類在「架構理解、逆向推理與多漏洞精巧串聯」上，仍擁有不可動搖的統治地位。
* **學術技術火花的傳奇誕生：** Orange 透露，該漏洞利用最後的突破口——將受限的 UTF-8 檔案寫入轉化為全功能 RCE 的精妙思維，是他與 Jaron Bradley（第四講講者）以及 Nicholas（第三講講者）在日本泡溫泉、熬夜看程式碼時，共同展開的「溫泉駭客松」中靈光一閃產生的結晶。

---

## 5. Possible Implementation & Extension / 延伸實作與未來方向

### English
1. **Remediation Strategy: Strict Navigation Context Mapping:** Implement mandatory validation inside Chromium's navigation module to guarantee that every profile-switch request is cryptographically bound to its originating render process frame (explicit RFH verification). This prevents the "current tab fallback" race condition.
2. **Reading Mode Isolation Policies:** Enforce strict sandboxing and separate process boundaries for all Reading Mode schemes (`read:`), ensuring they are explicitly included in Chrome's internal privileged URL scheme blacklist. Disable any native private C++ bindings like `edgeFeedbackPrivate` on non-system origins.
3. **Application Whitelisting and Custom Protocol Audits:** Set up system-level Group Policy Objects (GPOs) to restrict unregistered URL protocol handlers (such as overriding `telnet` or `mailto` execution targets) and block browser-initiated local binary execution outside signed Windows directories.

### 繁體中文
1. **防禦對策：嚴格導航上下文綁定：** 在 Chromium 的導航模組中引入強制驗證，確保任何 Profile Switch 請求都必須在加密層面上與發起的渲染幀（Render Frame Host, RFH）進行顯式綁定。此舉可徹底消除在「無綁定」情況下自作聰明指向 Active 標籤的競爭缺陷。
2. **閱讀模式進程隔離政策：** 將所有自訂閱讀模式協定（`read:`）納入嚴格的沙箱與獨立程序邊界中，並將其顯式加入 Chromium 特權 URL Scheme 黑名單中。在非系統級網域中，一律禁用 `edgeFeedbackPrivate` 等原生 C++ 敏感 API 綁定。
3. **系統註冊表與協定稽核：** 企業應透過群組原則（GPO）加強本地主機的自訂協定審查（如防範 `telnet`、`mailto` 等調用目標被重定向至非簽名 Windows 目錄），並限制瀏覽器 Process 發起未授權的本地二進位檔案運行。

---

## 6. Bilingual Precise Transcript / 雙語對照逐字稿

### English / 繁體中文 對照

| English | 繁體中文 |
| :--- | :--- |
| First, let us talk about the attack surface. Can AI find vulnerabilities inside web browsers and write exploits on its own? Today, no one doubts this. | 首先，我們來談談攻擊面。現在 AI 真的能獨立在瀏覽器中發現漏洞並自己寫出 exploits 嗎？這一點我想到了現在，沒有人會懷疑。 |
| Since the beginning of the year, researchers have used LLMs to find hundreds of vulnerabilities, bragging that security teams are just one step behind. | 從新年年初開始，就有安全研究人員用大模型（LLM）找出了幾百個漏洞，甚至發文嗆說安全防禦對他們來說只是小事一樁。 |
| In June, Google used its own AI to patch over 1,000 CVEs in a single month. AI is incredibly fast at finding vulnerabilities—arguably faster and better than human researchers. | 到今年 6 月整整一個月，Google 用自己的 AI 就修復了超過 1000 個 CVE。確實在找漏洞這件事情上面，AI 做得比人類研究員更快、更好。 |
| However, finding a vulnerability does not mean it can be exploited. Modern browsers have added V8 sandbox mitigations to prevent heap-based exploits from doing anything. | 但是，找到漏洞並不代表這些漏洞真的可以被順利利用。特別是大家可能知道，現代 V8 引擎引入了 Sandbox 緩解機制，即使你的代碼在渲染引擎中搞事，實際你也做不了什麼。 |
| Last month, OpenAI researchers and specialized security teams bypassed the Chrome Browser Sandbox. By guiding the AI step-by-step, they achieved a full RCE. | 上個月，OpenAI 的研究員與專業資安團隊成功突破了 8-box，透過人類去指引 AI、幫 AI 指明方向並教它寫代碼，最後成功突破沙箱完成了 Renderer RCE。 |
| This shattered the stereotype that browser exploitation is too hard for machines. Traditionally, writing a browser exploit is a craft requiring step-by-step debugger tracing and painstaking polish. | 這確實打破了以前大家認為 Browser RCE 極其困難的刻板印象。以往寫瀏覽器利用是一門手藝，需要你一步一步用調試器追蹤、精雕細琢，但現在 AI 真的解放了這些繁瑣的工作。 |
| But even so, this only bypassed a simplified version of Chrome. Escaping the production Google Chrome used by billions is much harder due to the 20-year-old browser sandbox. | 但就算如此，這也只是突破了 Chrome 的一個簡單版本。距離我們一般人使用的 Google Chrome 其實還有一段很大的距離，因為 Chrome 還有一層更嚴格、發展了近 20 年的主程序沙箱（Browser Sandbox）。 |
| To avoid this sandbox entirely, attackers often pivot to logical bypasses in customized vendor features. This is where my research begins. | 為了完全避開這個硬核沙箱，攻擊者通常會轉向軟體商自己客製化功能中的邏輯漏洞。這也是我們這次研究的起點。 |
| I focused on Microsoft Edge's customized Enterprise Cloud Profile Switching. Edge altered Chromium's navigation module to inspect requests and switch user profiles. | 我把焦點放在 Microsoft Edge 獨有的「企業設定檔切換（Cloud Profile Switch）」功能上。Edge 客製化了 Chromium 的導航模組來審查請求並切換使用者設定檔。 |
| The navigation portal checks if the URL matches a Microsoft whitelist. If it does, it initiates a new navigation using switch profile parameters. The destination URL is completely user-controllable. | 導航過濾器會審查網址是否在微軟白名單中。如果通過，它會調用設定檔切換參數並發起新的導航。這個跳轉目的地網址完全是由使用者控制的。 |
| But how does the Browser Process know which Render Process initiated the navigation? If no source RFH is specified, Chromium automatically targets the active/active tab! | 但是，Browser Process 到底怎麼知道這個跳轉是從哪個 Renderer 發起的？如果發起導航時沒有指定來源，Chromium 就會預設套用到當前處於 Active 狀態的分頁！ |
| By adding a 10-second delay, I could force UXSS on any site (e.g., Google or iCloud) when the user switched tabs, bypassing CSP completely! | 通過加上一個 10 秒的延遲，只要使用者在這段時間切換分頁，我就能在任何網頁（如 Google、iCloud）中強制執行 JavaScript，完全無視 CSP 的限制！ |
| To bypass the whitelist, I used window.open targeting login.live.com, leveraging an SOP race exception. To bypass the popup blocker, I opened about:blank first. | 為了繞過白名單限制，我利用 SOP 導航競爭在 window.open 中指向 login.live.com。為了繞過彈出式廣告視窗攔截器，我先將視窗開往 about:blank。 |
| I then leveraged Windows SSO to auto-login the profile and leaked the victim's email address via an MSN domain CORS configuration flaw. | 隨後，我利用 Windows 系統內建的 SSO 自動登入設定檔，並利用 msn.com 的 CORS 配置洩漏漏洞在背景偷走受害者的 Email 帳號。 |
| Now with UXSS, how do we get RCE? Standard pages block high-privilege C++ APIs. But I found Edge's customized Reading Mode (read: scheme) was missing from the blacklist! | 有了 UXSS 之後，我們怎麼拿到 RCE？一般網域無法調用特權 API，但我發現 Edge 獨家的「閱讀模式（read:）」竟然不在微軟的特權黑名單中！ |
| This WebUI exposed edgeFeedbackPrivate, containing a C++ function called writeFiles. I could write arbitrary files on Windows, but they were constrained to UTF-8. | 這個 WebUI 暴露了 edgeFeedbackPrivate API，包含一個原生 C++ 函數 writeFiles。這讓我可以寫入任意檔案，但內容被限制在 UTF-8 編碼範圍內。 |
| Since 64-bit DLLs require binary headers with invalid UTF-8 bytes like 0x8664, I wrote a 32-bit plain-text batch payload and registered a custom URL protocol handler for telnet. | 由於 64 位元 DLL 的檔頭包含 0x8664 等非合法 UTF-8 的二進位字節，我改為寫入 32 位元的純文字批次指令檔，並在註冊表中註冊了自訂的 telnet URL 協定。 |
| Finally, I triggered edge://restart using my open redirector, restarting the browser silently to load the payload and pop calc.exe with zero user interaction. | 最後，我利用跨域跳轉戳發了 Edge 內建的 edge://restart。這會自動、無痛地重啟瀏覽器，自動加載我們寫入的惡意設定，最終彈出小算盤。 |
| Why did I choose not to use AI? I wanted to prove that repetition is cheap, but deep logic and architectural intuition remain a uniquely human domain. | 為什麼我這次刻意不碰 AI？因為在重複性勞作變得一文不值的年代，深度邏輯、架構逆向與創新的攻擊面，依然是人類白帽駭客無可替代的專屬優勢。 |

---
