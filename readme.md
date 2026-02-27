# Academy Central

本 repo 為 **Academy Central** 前端部落格，以 Next.js 靜態匯出並透過 GitHub Pages 呈現。

## 結構說明

- **主 page（母 folder）**：每個頂層目錄對應一個主 page，例如 `CCSP`、`Free_Google_Workspace_Essentials_Zoho-Mail_Cloudflare_Integration`，之後可再新增其他主 page。
- **Sub page**：主 page 下的子資料夾或同層 `.md` 檔案，對應一層或多層 URL。
- **Sub-sub page**：再下一層的 `.md`，例如 `CCSP/domain2/quiz-result/a.md` 對應 `/CCSP/domain2/quiz-result/a`。

## URL 對應

| 路徑 | 說明 |
|------|------|
| `/` | 首頁，列出所有主 page |
| `/{主 folder}` | 該主 page（若有 `readme.md` 則顯示其內容，否則顯示目錄清單） |
| `/{主 folder}/.../檔名` | 對應的 `.md` 文章（副檔名省略） |

## 如何新增內容

在對應的主 folder 下新增或編輯 `.md`（或 `.mdx`）檔案，推送到預設分支後由 CI 建置並部署，無需改動程式碼。

- 新增主 page：在 repo 根目錄新增一個資料夾（勿使用 `app`、`lib`、`node_modules`、`.git`、`target`、`src` 等保留名稱），該資料夾會自動出現在首頁並可被掃描。
- 掃描時會排除：`node_modules`、`.git`、`target`、`src`、`app`、`lib`、`.next`、`out`、`.cursor`、`.github`、`components`。

## 本地開發

```bash
npm install
npm run dev
```

開發時 `basePath` 為空，本機網址為 `http://localhost:3000/`。建置後產出在 `out/`，適合搭配 `npx serve out` 預覽靜態結果。

## 部署與預覽

- 部署由 **GitHub Actions** 自動執行：推送到 `main` 分支後會執行 `npm run build` 並將 `out/` 部署至 GitHub Pages。若預設分支為其他名稱（例如 `master`），請修改 [.github/workflows/deploy-gh-pages.yml](.github/workflows/deploy-gh-pages.yml) 中的 `branches`。
- 請在 repo **Settings → Pages** 中將 Source 設為 **GitHub Actions**（非 "Deploy from a branch"），部署完成後站點網址為：
  - `https://<org 或 username>.github.io/academy-central/`

## 其他

- 部分主 folder（例如 `Free_Google_Workspace_Essentials_Zoho-Mail_Cloudflare_Integration`）內含 Rust 等程式專案；部落格僅會讀取其中的 `.md` / `.mdx`，不會將 `target/`、`src/` 當作內容來源。
