# Vercel 部署說明

本專案使用 `output: 'export'` 靜態匯出。要讓 **NThing-UI 樣式與 Clock/Date/Monitor/Weather 正常顯示**，必須讓 client JS 與 CSS 能正確載入，請依你要的網址結構二選一設定。

---

## 方式 A：網站放在根路徑（推薦，例如 `https://academy.dennisleehappy.org/`）

**適用**：自訂網域要當成首頁、路徑為 `/`、`/CCSP/`、`/physics/` 等。

1. **Vercel 環境變數**
   - 新增 `BASE_PATH`，**值留空**（或 `""`）。
   - 套用到 Production（與需要的 Preview）。

2. **Vercel Build Output Directory**
   - 設為 **`out/academy-central`**（不要用預設的 `out`）。
   - 這樣部署根目錄就是 app 內容，`/_next/`、`/fonts/` 會從根路徑載入。

3. **重新建置並部署**
   - 部署完成後：
     - 首頁：`https://academy.dennisleehappy.org/`
     - CCSP：`https://academy.dennisleehappy.org/CCSP/`（**不要**用 `/academy-central/CCSP/`）

若你設了 `BASE_PATH=""` 但 **沒有** 把 Output Directory 設成 `out/academy-central`，則 HTML 仍會去抓 `/_next/...`，而實際檔案在 `/academy-central/_next/...`，就會 404、頁面無樣式。

---

## 方式 B：網站放在子路徑（例如 `https://xxx.vercel.app/academy-central/`）

**適用**：GitHub Pages 或 Vercel 預設網址要保留 `/academy-central` 前綴。

1. **不要**設定 `BASE_PATH`（或不要設成空）。
   - 建置會使用預設 `basePath: '/academy-central'`。

2. **Vercel Build Output Directory**
   - 使用預設 **`out`**（或留空，由 Next 決定）。

3. 實際網址為：
   - 首頁：`https://academy.dennisleehappy.org/academy-central/`
   - CCSP：`https://academy.dennisleehappy.org/academy-central/CCSP/`

---

## 常見狀況對照

| 現象 | 可能原因 | 處理 |
|------|----------|------|
| 頁面無樣式、白底、預設字型 | JS/CSS 404，client 未載入 | 若用方式 A，確認 `BASE_PATH` 為空且 Output Directory = `out/academy-central` |
| 打開 `/academy-central/CCSP/` 出現 Vercel 404 | 用方式 A 時不應有 `/academy-central` 前綴 | 改開 `https://你的網域/CCSP/` |
| Console 出現 `Failed to load resource: 404` 且路徑為 `CCSP/` | 頁面內有相對路徑指到 `CCSP/` 且該請求失敗 | 檢查該頁 markdown 或連結是否為相對路徑，改為正確絕對路徑或 basePath 前綴 |

---

## 建置與輸出目錄

- 本機：`npm run build` → 輸出在 `out/`。
- 有 `basePath` 時，實際 app 在 `out/academy-central/`。
- Vercel 的 **Build Output Directory** 決定「部署根目錄」對應到哪一層，需與上面的方式 A 或 B 一致。
