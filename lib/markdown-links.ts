import fs from 'fs';
import path from 'path';
import { pathToSlug } from './content';

const CWD = process.cwd();

/** 與 next.config.js 的 basePath 規則保持一致 */
const BASE_PATH =
  process.env.NODE_ENV === 'production'
    ? process.env.BASE_PATH !== undefined
      ? process.env.BASE_PATH
      : '/academy-central'
    : '';

function withBase(absolutePath: string): string {
  const base = BASE_PATH.replace(/\/$/, '');
  return `${base}${absolutePath}`;
}

/** 這些前綴不是 repo 內的相對路徑，原樣保留 */
function isExternal(target: string): boolean {
  return (
    target.startsWith('#') ||
    target.startsWith('/') ||
    /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(target)
  );
}

const MD_RE = /\.(md|mdx)$/i;

/**
 * markdown 連結／圖片語法。第 4 組是連結目標，第 6 組是可選的 title。
 * 目標若含空白，作者需以 %20 或 <...> 包住 —— 兩種都支援。
 */
const LINK_RE = /(!?)\[([^\]]*)\]\(\s*(<)?([^)<>\s]+)(>)?((?:\s+"[^"]*")?)\s*\)/g;

function encodePath(segments: string[]): string {
  return segments.map((s) => encodeURIComponent(s)).join('/');
}

/**
 * 將 markdown 內的「相對連結」改寫為本站實際可用的絕對網址。
 *
 * 需要改寫的原因有兩個：
 *  1. 檔案頁的 slug 末段會被 `safeFileSlug()` 加上雜湊（例如 `foo.md` →
 *     `foo-1a2b3c4d5e`），所以原始的 `./foo.md` 會 404。
 *  2. 同一份文件可能同時出現在目錄網址與檔案網址底下，相對的圖片路徑只會在
 *     其中一種情境正確，因此一律轉為絕對路徑。
 *
 * @param content       markdown 原始內容
 * @param filePath      該 markdown 相對於 repo 根目錄的路徑
 */
export function rewriteMarkdownLinks(content: string, filePath: string): string {
  const fromDir = path.posix.dirname(filePath.replace(/\\/g, '/'));

  return content.replace(
    LINK_RE,
    (match, bang: string, text: string, lt: string | undefined, rawTarget: string, gt: string | undefined, title: string) => {
      if (isExternal(rawTarget)) return match;

      // 分離錨點，並還原百分比編碼以便對應到實體檔案
      const hashIndex = rawTarget.indexOf('#');
      const anchor = hashIndex >= 0 ? rawTarget.slice(hashIndex) : '';
      const rawPath = hashIndex >= 0 ? rawTarget.slice(0, hashIndex) : rawTarget;
      if (!rawPath) return match;

      let decoded: string;
      try {
        decoded = decodeURIComponent(rawPath);
      } catch {
        decoded = rawPath;
      }

      // 解析為 repo 相對路徑；若超出 repo 根目錄則不動它
      const resolved = path.posix.normalize(path.posix.join(fromDir, decoded));
      if (resolved.startsWith('..')) return match;

      const onDisk = path.join(CWD, resolved);
      const exists = fs.existsSync(onDisk);
      const isDir = exists && fs.statSync(onDisk).isDirectory();

      let href: string;
      if (MD_RE.test(resolved)) {
        // markdown → 轉成本站 slug（末段含雜湊），結尾加斜線以符合 trailingSlash
        href = withBase(`/${encodePath(pathToSlug(resolved))}/`);
      } else if (isDir) {
        // 目錄索引頁
        href = withBase(`/${encodePath(resolved.split('/').filter(Boolean))}/`);
      } else {
        // 圖片或其他靜態檔：指向 public/ 中的同名路徑（見 scripts/copy-content-assets.mjs）
        href = withBase(`/${encodePath(resolved.split('/').filter(Boolean))}`);
      }

      return `${bang}[${text}](${href}${anchor}${title})`;
    },
  );
}
