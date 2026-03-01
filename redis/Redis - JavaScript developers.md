
### 一、 課程概述與學習目標

本課程的核心目標是教導開發者如何在 Node.js 環境中操作 Redis。課程強調**動手實踐 (Hands-on)**，學員將透過為一個既有的應用程式添加功能，來深入理解 Redis 的各種操作與整合技巧。

在開始課程前，學習者應具備以下基礎：

- **現代 JavaScript 技能**：需熟悉 Node.js 環境、npm 封裝管理，以及 ES6+ 的特性，如 Promises、**async/await** 和箭頭函數。
- **Redis 基礎知識**：需了解 Redis 的基本數據結構，包括 **Strings、Sets、Sorted Sets 和 Hashes**。
- **Web 開發經驗**：應熟悉 **RESTful API** 的概念（如 HTTP 動詞與狀態碼）。雖然課程不強制要求掌握 Express 框架或 Jest 測試框架，但具備相關背景將有助於理解代碼邏輯。

### 二、 實戰專案：Redis Solar 太陽能監控儀表板

課程圍繞著一個名為 **Redis Solar** 的樣本應用程式展開。

- **業務情境**：這是一家位於加州的公用事業公司，負責為家庭和企業安裝屋頂太陽能板。
- **數據來源**：每個安裝點（Site）都配備了**智能電錶**，每分鐘會回傳該場地的能源消耗與發電量數據。
- **功能需求**：應用程式需要攝取這些數據並展示在儀表板上。功能包括在地圖上顯示所有站點、根據經緯度搜尋附近的站點，以及查看特定站點的電力產出與使用趨勢圖表。

### 三、 技術架構與開發環境

Redis Solar 採用前後端分離的架構：

1. **前端 (Frontend)**：使用 **Vue.js** 構建，課程已提供預建版本，開發者無需修改前端代碼，僅需專注於數據的呈現邏輯。
2. **後端 (Backend)**：是一個基於 **Express** 框架的 Node.js 應用程式，負責與 Redis 通訊並提供 API 接口。
3. **開發工具**：推薦使用 **VS Code**，但也支持 Orion IDE、vi 或 Emacs 等編輯器。
4. **環境配置**：啟動專案需編輯 `config.json` 確保指向正確的 Redis 實例，執行 `npm install` 安裝依賴，並透過 `npm test` 運行 **Jest** 測試套件來驗證代碼。

### 四、 Redis 客戶端的選擇與角色

在 Node.js 中，最受推薦的兩個 Redis 客戶端是 **Node Redis** 和 **ioRedis**。本課程選擇使用 **Node Redis**，因為它是目前社群中最廣泛使用的客戶端。

一個 Redis 客戶端在庫（Library）主要承擔三個角色：

- **管理連接**：處理應用程式與 Redis 伺服器之間的 TCP Socket 生命週期（創建、配置與銷毀）。
- **實現協定**：封裝 Redis 的有線協定（**RESP**, Redis Serialization Protocol），讓開發者能與伺服器溝通。
- **提供語言特定的 API**：將 Redis 的數據類型（如 Hash）轉換為 JavaScript 的類型（如 Object），提升開發體驗。

值得注意的是，由於 Node.js 和 Redis 都採用**單線程**編程模型，因此在大多數情況下，Node.js 應用程式不需要像傳統數據庫那樣使用連接池（Connection Pooling），一個客戶端實例即可處理所有請求。

### 五、 非同步編程模型的演進

課程詳細展示了三種與 Redis 交互的非同步風格：

1. **回調函數 (Callbacks)**：這是傳統的 Node.js 模式（Error-first Pattern），但在處理複雜邏輯時容易產生「回調地獄」。
2. **Promises**：透過 Node.js 內建的 `util.promisify` 將客戶端函數包裝成 Promise，使代碼更具序列性。
3. **Async/Await**：這是課程主要採用的風格，配合 **Bluebird** 庫的 `promisifyAll` 功能，可以簡潔地處理非同步操作，使代碼閱讀起來如同同步執行一般。

### 六、 核心架構：DAO 設計模式

為了保持代碼的可維護性，Redis Solar 使用了 **DAO (Data Access Object)** 設計模式。

- **領域對象 (Domain Objects)**：定義數據結構，例如一個 `Site` 對象包含 ID、地址、容量（kWh）及經緯度座標。
- **DAO 接口**：定義操作數據的方法（如 `insert`, `find_by_id`, `find_all`），但不涉及具體的存儲細節。
- **DAO 實現 (Implementations)**：針對 Redis 撰寫具體的數據存取邏輯。例如，`site-dow-redis-impl.js` 會使用 Node Redis 客戶端來執行 HSET 或 SADD 等命令。

這種模式實現了**關注點分離**，如果未來需要更換數據庫（例如改用 Postgres），只需更換 DAO 的實現，而無需更動上層的業務邏輯。

### 七、 數據映射與鍵名管理

在將數據存入 Redis 時，課程介紹了幾個關鍵技術點：

1. **數據類型映射**：Redis 的數據存儲多為字串。Node Redis 會將 Redis Hash 映射為 JS 對象，將 List 或 Set 映射為 JS 數組。對於數值數據，在讀取後通常需要使用 `parseFloat` 或 `parseInt` 進行顯式轉換。
2. **扁平化處理 (Flattening)**：由於 Redis Hash 僅支持一層鍵值對，對於嵌套的 JS 對象（如包含座標的 Site 對象），在存入前需透過 helper 函數進行扁平化，取出時再進行還原（Remap）。
3. **鍵生成器 (Key Generator)**：為了避免鍵名衝突並遵循 **DRY (Don't Repeat Yourself)** 原則，所有 Redis 鍵名都由 `key-generator` 模組統一管理。這些鍵名通常會帶有命空間前綴（例如 `ru102js:`）。

