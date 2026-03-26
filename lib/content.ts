import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const CWD = process.cwd();

const ROOT_EXCLUDE = new Set([
  'node_modules',
  '.git',
  'target',
  'app',
  'lib',
  '.next',
  'out',
  '.cursor',
  '.github',
  'components',
  'NThing-UI-main', // Rainmeter skin assets only, not content
]);

const RECURSE_EXCLUDE = new Set(['node_modules', '.git', 'target', 'src', 'helper_scripts']);

const MD_EXTENSIONS = ['.md', '.mdx'];

/** 統一使用 NFC，避免 macOS 檔名 (NFD) 與 URL 解碼 (NFC) 不一致導致找不到檔案 */
function toNFC(s: string): string {
  return s.normalize('NFC');
}

export type ContentEntry = { slug: string[]; filePath: string };

function shortHash(input: string): string {
  return crypto.createHash('sha1').update(input).digest('hex').slice(0, 10);
}

/**
 * 將「檔名」轉為短且穩定的 URL segment，避免 output: 'export' 時產物路徑過長（ENAMETOOLONG）。
 * 僅用於檔名（非目錄名），以維持目錄索引頁仍可對應實體資料夾。
 */
function safeFileSlug(fileBaseName: string): string {
  const raw = toNFC(fileBaseName).trim().replace(/^\*+|\*+$/g, ''); // 移除檔名首尾常見的 markdown 強調符號
  const ascii = raw
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const prefix = ascii.slice(0, 48) || 'doc';
  return `${prefix}-${shortHash(raw)}`;
}

/**
 * 取得作為「主 page」的根目錄名稱（第一層目錄，排除非內容目錄）
 * 排除以 "." 開頭之目錄（如 .vercel、.git 等）
 */
export function getContentRoots(): string[] {
  const names = fs.readdirSync(CWD, { withFileTypes: true });
  return names
    .filter((d) => d.isDirectory() && !d.name.startsWith('.') && !ROOT_EXCLUDE.has(d.name))
    .map((d) => d.name)
    .sort();
}

/**
 * 遞迴掃描目錄下所有 .md / .mdx，回傳相對路徑（含檔名）
 */
function walkMdFiles(dirRelative: string): string[] {
  const full = path.join(CWD, dirRelative);
  if (!fs.existsSync(full) || !fs.statSync(full).isDirectory()) return [];
  const results: string[] = [];
  const entries = fs.readdirSync(full, { withFileTypes: true });
  for (const e of entries) {
    const rel = path.join(dirRelative, e.name);
    if (e.isDirectory()) {
      if (RECURSE_EXCLUDE.has(e.name)) continue;
      results.push(...walkMdFiles(rel));
    } else if (e.isFile() && MD_EXTENSIONS.includes(path.extname(e.name).toLowerCase())) {
      results.push(rel);
    }
  }
  return results;
}

/**
 * 相對路徑 → slug（去掉副檔名；readme.md → 上一層目錄名作為 slug 最後一段時可視為 index）
 */
export function pathToSlug(relativePath: string): string[] {
  const normalized = path.normalize(relativePath).replace(/\\/g, '/');
  const withoutExt = normalized.replace(/\.(md|mdx)+$/i, '');
  const segments = withoutExt.split('/').filter(Boolean).map(toNFC);
  if (segments[segments.length - 1]?.toLowerCase() === 'readme') {
    return segments.slice(0, -1);
  }
  if (segments.length === 0) return segments;
  const last = segments[segments.length - 1] ?? '';
  const safeLast = safeFileSlug(last);
  // #region agent log
  fetch('http://127.0.0.1:7621/ingest/eae6f4bd-a35a-4d5f-8987-586828d900ec',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'79be4b'},body:JSON.stringify({sessionId:'79be4b',runId:'pre-fix',hypothesisId:'H2',location:'lib/content.ts:~pathToSlug',message:'pathToSlug last segment sanitized',data:{lastLen:last.length,safeLastLen:safeLast.length,lastPreview:last.slice(0,80),safeLast},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  return [...segments.slice(0, -1), safeLast];
}

/**
 * 取得所有內容條目（slug + 檔案路徑）。同一 slug 只保留一筆（優先 .md，其次 .mdx，支援 a.md 與 a.md.md）
 */
export function getAllEntries(): ContentEntry[] {
  const roots = getContentRoots();
  const bySlug = new Map<string, ContentEntry>();
  for (const root of roots) {
    const files = walkMdFiles(root);
    for (const filePath of files) {
      const slug = pathToSlug(filePath);
      if (slug.length === 0) continue;
      const key = slug.join('/');
      const existing = bySlug.get(key);
      const ext = path.extname(filePath).toLowerCase();
      if (!existing) {
        bySlug.set(key, { slug, filePath });
      } else {
        const existingExt = path.extname(existing.filePath).toLowerCase();
        const preferNew = ext === '.md' && (existingExt === '.mdx' || existing.filePath.endsWith('.md.md'));
        if (preferNew) bySlug.set(key, { slug, filePath });
      }
    }
  }
  return Array.from(bySlug.values());
}

/**
 * 用預先掃描的條目依 slug 取得檔案路徑（與 generateStaticParams 同源，build 時必一致）
 */
export function getFilePathFromEntries(slug: string[], entries: ContentEntry[]): string | null {
  if (slug.length === 0) return null;
  const key = slug.map(toNFC).join('/');
  const entry = entries.find((e) => e.slug.map(toNFC).join('/') === key);
  return entry ? entry.filePath : null;
}

/**
 * 依父目錄實際檔名解析最後一段 slug（避免路徑字串與檔案系統編碼不一致）
 */
function resolveByParentDir(parentDir: string, lastSegment: string): string | null {
  if (!fs.existsSync(parentDir) || !fs.statSync(parentDir).isDirectory()) return null;
  const lastNFC = toNFC(lastSegment);
  const dirEntries = fs.readdirSync(parentDir, { withFileTypes: true });
  for (const e of dirEntries) {
    if (!e.isFile() || !MD_EXTENSIONS.includes(path.extname(e.name).toLowerCase())) continue;
    const baseName = e.name.replace(/\.(md|mdx)+$/i, '');
    if (toNFC(baseName) !== lastNFC) continue;
    const p = path.join(parentDir, e.name);
    return path.relative(CWD, p).replace(/\\/g, '/');
  }
  return null;
}

/**
 * 給定 slug，解析出實際檔案路徑。支援 readme、一般 .md，以及 a.md / a.md.md
 */
export function getFilePath(slug: string[]): string | null {
  if (slug.length === 0) return null;
  const normalizedSlug = slug.map(toNFC);

  // 多段 slug 優先依父目錄實際檔名解析，避免 build/部署環境與本機路徑編碼差異
  if (normalizedSlug.length >= 2) {
    const parentDir = path.join(CWD, ...normalizedSlug.slice(0, -1));
    const last = normalizedSlug[normalizedSlug.length - 1];
    const byParent = resolveByParentDir(parentDir, last);
    if (byParent) return byParent;
  }

  const rel = path.join(...normalizedSlug);
  const base = path.join(CWD, rel);
  for (const ext of ['.md', '.mdx']) {
    const p = base + ext;
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return path.relative(CWD, p).replace(/\\/g, '/');
  }
  const dir = path.join(CWD, ...normalizedSlug);
  if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    for (const name of ['readme.md', 'README.md', 'index.md', 'index.mdx']) {
      const p = path.join(dir, name);
      if (fs.existsSync(p) && fs.statSync(p).isFile()) return path.relative(CWD, p).replace(/\\/g, '/');
    }
  }
  const parentDir = path.join(CWD, ...normalizedSlug.slice(0, -1));
  const last = normalizedSlug[normalizedSlug.length - 1];
  if (last) {
    const byParent = resolveByParentDir(parentDir, last);
    if (byParent) return byParent;
  }
  return null;
}

/**
 * 讀取檔案內容（UTF-8）
 */
export function readFileContent(filePath: string): string {
  const full = path.join(CWD, filePath);
  return fs.readFileSync(full, 'utf-8');
}

/**
 * 取得所有需預渲染的 slug（文件 slug + 僅目錄索引的 slug）
 */
export function getAllSlugsForParams(): string[][] {
  const entries = getAllEntries();
  const seen = new Set<string>();
  const slugs: string[][] = [];
  const roots = getContentRoots();
  for (const r of roots) {
    const key = r;
    if (!seen.has(key)) {
      seen.add(key);
      slugs.push([r]);
    }
  }
  for (const e of entries) {
    for (let i = 1; i < e.slug.length; i++) {
      const prefix = e.slug.slice(0, i);
      const key = prefix.join('/');
      if (!seen.has(key)) {
        seen.add(key);
        slugs.push(prefix);
      }
    }
    const key = e.slug.join('/');
    if (!seen.has(key)) {
      seen.add(key);
      slugs.push(e.slug);
    }
  }
  return slugs;
}

/**
 * 取得目錄下的子項目（用於目錄索引頁）：子目錄與 .md 檔案
 */
export function getDirectoryChildren(relativeDir: string): { name: string; type: 'file' | 'dir'; slug: string[] }[] {
  const full = path.join(CWD, relativeDir);
  if (!fs.existsSync(full) || !fs.statSync(full).isDirectory()) return [];
  const entries = fs.readdirSync(full, { withFileTypes: true });
  const result: { name: string; type: 'file' | 'dir'; slug: string[] }[] = [];
  const prefix = relativeDir ? relativeDir.split(path.sep) : [];
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const nameNFC = toNFC(e.name);
    if (e.isDirectory()) {
      if (RECURSE_EXCLUDE.has(e.name)) continue;
      result.push({ name: nameNFC, type: 'dir', slug: [...prefix, nameNFC] });
    } else if (e.isFile() && MD_EXTENSIONS.includes(path.extname(e.name).toLowerCase())) {
      const base = toNFC(e.name.replace(/\.(md|mdx)$/i, ''));
      if (base.toLowerCase() === 'readme') result.push({ name: nameNFC, type: 'file', slug: prefix });
      else result.push({ name: nameNFC, type: 'file', slug: [...prefix, safeFileSlug(base)] });
    }
  }
  return result.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}
