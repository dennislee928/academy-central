/// <reference types="react" />
import path from 'path';
import {
  getContentRoots,
  getFilePath,
  getFilePathFromEntries,
  getAllEntries,
  readFileContent,
  getDirectoryChildren,
  getAllSlugsForParams,
} from '@/lib/content';
import { rewriteMarkdownLinks } from '@/lib/markdown-links';
import HomeSection from '@/components/translated/HomeSection';
import ArticleMarkdownPage from '@/components/translated/ArticleMarkdownPage';
import FolderListingPage from '@/components/translated/FolderListingPage';
import EmptyPathPage from '@/components/translated/EmptyPathPage';

type Props = { params: { slug?: string[] } | Promise<{ slug?: string[] }> };

/** 允許 dev 時造訪未列在 generateStaticParams 的路徑（含編碼字元如 %20），build 仍會為回傳的 params 預渲染 */
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = getAllSlugsForParams();
  // Next.js 在 output: 'export' 下，對 optional catch-all 的參數比對在不同情境可能使用「原字串」或「已編碼字串」。
  // 這裡同時回傳兩種版本，避免因空白等字元（%20）導致 missing param。
  const pairs = slugs.flatMap((s) => {
    const encoded = s.map((seg) => encodeURIComponent(seg));
    return [s, encoded];
  });
  const unique = new Map<string, string[]>();
  for (const s of pairs) unique.set(s.join('/'), s);
  unique.set('', []);
  const params = Array.from(unique.values()).map((s) => ({ slug: s }));
  return params;
}

export default async function SlugPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params as any);
  const rawSlug: string[] | undefined = resolvedParams?.slug;
  const slug =
    rawSlug?.map((s) => {
      try {
        return decodeURIComponent(s);
      } catch {
        return s;
      }
    }) ?? [];
  if (!slug.length) {
    const roots = getContentRoots();
    return <HomeSection roots={roots} />;
  }

  // 優先依預先條目解析（與 generateStaticParams 同源），避免 build 環境與本機路徑差異
  const entries = getAllEntries();
  const fromEntries = getFilePathFromEntries(slug, entries);
  const fromFs = getFilePath(slug);
  const filePath = fromEntries ?? fromFs;
  const relativeDir = path.join(...slug);

  if (filePath) {
    // 相對連結（.md 與圖片）在本站的 slug 規則下無法直接使用，需改寫為絕對網址
    const content = rewriteMarkdownLinks(readFileContent(filePath), filePath);
    // 若此頁是目錄的 readme，同目錄下其他 .md 也要列出，否則無法從此頁點進其他文章
    const isDirReadme =
      slug.length >= 1 &&
      (filePath.endsWith('readme.md') ||
        filePath.endsWith('README.md') ||
        filePath.endsWith('index.md') ||
        filePath.endsWith('index.mdx'));
    const siblingDir = isDirReadme ? slug[0] ?? '' : '';
    const siblings =
      siblingDir !== ''
        ? getDirectoryChildren(siblingDir).filter((c) => {
            const key = c.slug.join('/');
            const currentKey = slug.join('/');
            return key !== currentKey; // 不重複列出「本頁」(readme)
          })
        : [];

    return (
      <ArticleMarkdownPage slug={slug} content={content} siblings={siblings} />
    );
  }

  const children = getDirectoryChildren(relativeDir);
  if (children.length === 0) {
    return <EmptyPathPage />;
  }

  return <FolderListingPage slug={slug} childrenItems={children} />;
}
