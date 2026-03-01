這門課程是由 Redis Labs 的課程工程師 **Simon Prriet** 擔任導師，內容是關於 **JS Redis** 的 JavaScript 開發。本課程專為希望學習如何在 **Node.js** 應用程式中有效地將 Redis 作為數據存儲使用的 JavaScript 開發者所設計。

### 課程要求與環境

若要成功完成課程，學習者需要具備以下背景知識與技能：

- **JavaScript 基礎**：必須能熟練編寫現代 JavaScript（Node.js 環境），並熟悉異步編程模型（包括 Promises、async/await 和箭頭函數）以及使用 npm 管理應用程式。
- **Redis 知識**：需對 Redis 數據結構（如 Strings、Sets、Sorted Sets 和 Hashes）有基本了解。
- **Web 技術**：需熟悉 **RESTful API** 概念、HTTP 動詞與狀態碼。雖然不強制要求，但若具備 **Express** 框架的路由知識以及 **Jest** 單元測試的概念將會很有幫助。
- **開發工具**：課程建議使用 **VS Code**，但也支持 Orion IDE、vi 或 Emacs 等編輯器。

### 應用程式案例：Redis Solar

本課程的核心是圍繞著一個名為 **Redis Solar** 的樣本應用程式進行開發，這是一個**太陽能數據攝取與監控儀表板**。

- **業務場景**：想像我們經營一家在加州（California）安裝屋頂太陽能板的公用事業公司。
- **數據來源**：每個安裝點（稱為 Site）都配備智能電錶，每分鐘會報告該場地的能源消耗量與發電量。
- **功能目標**：開發者將構建應用程式來攝取並顯示這些數據，包括顯示場地地圖、搜索特定經緯度附近的場地、以及查看場地的電能產出與使用圖表。

### 技術架構與開發模式

1. **前後端分離**：前端使用 **Vue.js** 編寫（課程已預建，學習者無需修改），後端則是基於 **Express** 的 Node.js 應用程式，負責實現 API 並與 Redis 通訊。
2. **DAO 設計模式**：課程採用 **數據訪問對象 (Data Access Object)** 模式來組織代碼。這包括定義**領域對象 (Domain Objects)**、**DAO 接口**以及針對 Redis 的**具體實現 (Implementations)**。
3. **鍵名管理**：為了遵循 **DRY (Don't Repeat Yourself)** 原則並避免鍵名衝突，所有 Redis 鍵（Keys）都透過 `key-generator` 模塊集中管理，並帶有命空間前綴（如 `ru102js`）。
4. **異步編程**：課程將展示三種處理 Redis 命令的方式：回調函數（Callbacks）、Promises，以及最終在項目中主要使用的 **async/await** 風格。

### 學習方式

這是一門**動手實踐 (Hands-on)** 的課程。學習者將通過一系列的**編程挑戰**來增強代碼功能，例如實現透過 ID 查找場地（`find_by_id`）或插入數據（`insert`）等方法。每完成一個挑戰，學習者就離構建出完整的太陽能儀表板更近一步。