# Redis 與 Node.js 開發者實戰講義

## 一、課程概述與學習目標

本課程旨在教導開發者在 **Node.js** 環境中操作 Redis，以**實作導向（hands-on）**方式，透過為既有應用程式擴充功能，熟悉 Redis 的常用操作與整合方式。

**前置能力建議：**

- **現代 JavaScript**：熟悉 Node.js 環境、npm 套件管理，以及 ES6+ 語法（Promises、**async/await**、箭頭函式）。
- **Redis 基礎**：了解 Redis 基本資料結構，包括 **Strings、Sets、Sorted Sets、Hashes**。
- **Web 開發**：熟悉 **RESTful API** 概念（HTTP 動詞與狀態碼）。具備 Express 或 Jest 經驗有助於理解範例程式，但非必要。

---

## 二、實戰專案：Redis Solar 太陽能監控儀表板

課程以 **Redis Solar** 範例應用為主軸。

- **情境**：加州某公用事業公司，為家庭與企業安裝屋頂太陽能板。
- **資料來源**：每個安裝點（Site）配備**智慧電錶**，每分鐘回傳該站點的用電與發電資料。
- **需求**：應用需擷取上述資料並呈現在儀表板上，包含地圖顯示所有站點、依經緯度搜尋鄰近站點、以及單一站點的用電/發電趨勢圖表。

---

## 三、技術架構與開發環境

Redis Solar 採前後端分離架構：

1. **前端**：以 **Vue.js** 建置，課程提供預建版本，學員可專注於後端與資料呈現邏輯。
2. **後端**：以 **Express** 為基礎的 Node.js 應用，負責與 Redis 通訊並提供 API。
3. **開發工具**：建議使用 **VS Code**，亦可使用 Orion IDE、vi 或 Emacs。
4. **環境**：編輯 `config.json` 指向正確的 Redis 實例，執行 `npm install` 安裝依賴，並以 `npm test` 執行 **Jest** 測試驗證實作。

---

## 四、Redis 用戶端選擇與職責

Node.js 中常見的 Redis **客戶端**為 **Node Redis** 與 **ioredis**。本課程採用 **Node Redis**，因其為目前社群最廣泛使用的用戶端。

Redis 客戶端函式庫主要負責三項職責：

- **連線管理**：處理應用程式與 Redis 伺服器之間的 TCP 連線生命週期（建立、設定與關閉）。
- **協定實作**：實作 Redis 有線協定（**RESP**, Redis Serialization Protocol），使開發者能與伺服器通訊。
- **語言 API**：將 Redis 資料型別（如 Hash）對應為 JavaScript 型別（如 Object），提升開發效率。

**注意**：Node.js 與 Redis 皆採**單執行緒**模型，多數情境下不需像傳統關聯式資料庫般使用連線池，單一客戶端實例即可處理請求。

---

## 五、非同步程式設計的演進

課程示範三種與 Redis 互動的非同步寫法：

1. **回呼（Callbacks）**：傳統 Node.js 的 Error-first 風格，邏輯複雜時易形成巢狀回呼。
2. **Promises**：以 Node.js 內建 `util.promisify` 將客戶端方法包裝為 Promise，使流程更線性。
3. **Async/Await**：課程主要採用此風格，搭配 **Bluebird** 的 `promisifyAll`，以近似同步的寫法處理非同步操作。

---

## 六、核心架構：DAO 設計模式

為維持程式可維護性，Redis Solar 採用 **DAO (Data Access Object)** 模式。

- **領域物件（Domain Objects）**：定義資料結構，例如 `Site` 含 ID、地址、容量（kWh）與經緯度。
- **DAO 介面**：定義資料操作（如 `insert`、`find_by_id`、`find_all`），不涉及實際儲存實作。
- **DAO 實作**：針對 Redis 撰寫具體存取邏輯，例如 `site-dao-redis-impl.js` 使用 Node Redis 執行 HSET、SADD 等指令。

此模式達成**關注點分離**：若日後改為其他儲存（如 PostgreSQL），僅需替換 DAO 實作，無須更動上層業務邏輯。

---

## 七、資料對應與鍵名管理

將資料寫入 Redis 時，需注意以下要點：

1. **型別對應**：Redis 底層多為字串。Node Redis 會將 Redis Hash 對應為 JavaScript 物件，List/Set 對應為陣列。數值讀出後通常需以 `parseFloat` 或 `parseInt` 轉型。
2. **扁平化（Flattening）**：Redis Hash 僅支援單層鍵值對。巢狀物件（如含經緯度的 Site）寫入前需以 helper 扁平化，讀出後再還原（remap）。
3. **鍵名產生器（Key Generator）**：為避免鍵名衝突並符合 **DRY** 原則，所有 Redis 鍵名由 `key-generator` 模組統一產生，通常帶有命名空間前綴（例如 `ru102js:`）。
