#!/usr/bin/env node
/**
 * 把內容資料夾裡的靜態檔（圖片、PDF、字型…）鏡像複製到 public/，
 * 讓 `output: 'export'` 的靜態匯出真的能提供這些檔案。
 *
 * markdown 內的相對路徑會由 lib/markdown-links.ts 改寫成 `/<repo 相對路徑>`，
 * 因此這裡必須在 public/ 底下「原樣」保留同一份路徑結構。
 *
 * 用法：node scripts/copy-content-assets.mjs
 */
import fs from 'fs';
import path from 'path';

const CWD = process.cwd();
const PUBLIC_DIR = path.join(CWD, 'public');

// 與 lib/content.ts 的 ROOT_EXCLUDE / RECURSE_EXCLUDE 對齊
const ROOT_EXCLUDE = new Set([
  'node_modules', '.git', 'target', 'app', 'lib', '.next', 'out',
  '.cursor', '.github', 'components', 'public', 'scripts', 'NThing-UI-main',
]);
const RECURSE_EXCLUDE = new Set(['node_modules', '.git', 'target', 'src', 'helper_scripts', '__pycache__']);

const ASSET_EXT = new Set([
  // 圖片與文件
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif', '.ico',
  '.pdf', '.woff', '.woff2', '.ttf', '.otf', '.mp4', '.webm',
  // 內容中會被連結到的原始碼／資料檔（例如 CTF 的輔助腳本）
  '.sh', '.py', '.js', '.mjs', '.ts', '.rb', '.pl', '.ps1',
  '.txt', '.csv', '.json', '.yml', '.yaml', '.toml', '.conf',
]);

let copied = 0;
let skipped = 0;

function walk(relDir) {
  const full = path.join(CWD, relDir);
  let entries;
  try {
    entries = fs.readdirSync(full, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const rel = path.join(relDir, e.name);
    if (e.isDirectory()) {
      if (RECURSE_EXCLUDE.has(e.name)) continue;
      walk(rel);
    } else if (e.isFile() && ASSET_EXT.has(path.extname(e.name).toLowerCase())) {
      const dest = path.join(PUBLIC_DIR, rel);
      const src = path.join(CWD, rel);
      // 只在來源較新或大小不同時複製，讓重複執行變便宜
      try {
        const s = fs.statSync(src);
        const d = fs.existsSync(dest) ? fs.statSync(dest) : null;
        if (d && d.size === s.size && d.mtimeMs >= s.mtimeMs) {
          skipped += 1;
          continue;
        }
      } catch {
        /* 落到下面照常複製 */
      }
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
      copied += 1;
    }
  }
}

const roots = fs
  .readdirSync(CWD, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('.') && !ROOT_EXCLUDE.has(d.name))
  .map((d) => d.name);

for (const r of roots) walk(r);

console.log(`[copy-content-assets] copied ${copied}, up-to-date ${skipped}`);
