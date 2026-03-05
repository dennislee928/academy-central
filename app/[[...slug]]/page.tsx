/// <reference types="react" />
import Link from 'next/link';
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
import MarkdownContent from '@/components/MarkdownContent';
import NothingHero from '@/components/ui/NothingHero';
import RootListCards from '@/components/ui/RootListCards';
import ArticleCard from '@/components/ui/ArticleCard';

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

function slugHref(segments: string[]) {
  if (segments.length === 0) return '/';
  // 與 next.config 的 trailingSlash: true 一致，靜態匯出後路徑為 .../index.html
  return '/' + segments.map(encodeURIComponent).join('/') + '/';
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
    return (
      <div className="min-h-[60vh] flex flex-col justify-center">
        <NothingHero
          title="Academy Central"
          subtitle="依主 page（母 folder）瀏覽內容。"
        />
        <RootListCards roots={roots} />
      </div>
    );
  }

  // 優先依預先條目解析（與 generateStaticParams 同源），避免 build 環境與本機路徑差異
  const entries = getAllEntries();
  const fromEntries = getFilePathFromEntries(slug, entries);
  const fromFs = getFilePath(slug);
  const filePath = fromEntries ?? fromFs;
  const relativeDir = path.join(...slug);

  if (filePath) {
    const content = readFileContent(filePath);
    const breadcrumbs = slug.map((s, i) => ({
      label: s,
      href: slugHref(slug.slice(0, i + 1)),
    }));
    // 若此頁是目錄的 readme，同目錄下其他 .md 也要列出，否則無法從此頁點進其他文章
    const isDirReadme =
      slug.length >= 1 &&
      (filePath.endsWith('readme.md') || filePath.endsWith('README.md') || filePath.endsWith('index.md') || filePath.endsWith('index.mdx'));
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
      <div>
        <nav className="mb-8 text-sm text-white/60 flex flex-wrap items-center gap-1">
          <Link href="/" className="hover:text-white transition-colors">首頁</Link>
          {breadcrumbs.map((b) => (
            <span key={b.href}>
              <span className="mx-1">/</span>
              <Link href={b.href} className="hover:text-white transition-colors">
                {b.label}
              </Link>
            </span>
          ))}
        </nav>
        <MarkdownContent content={content} />
        {siblings.length > 0 && (
          <section className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-xl font-bold tracking-tight mb-4 text-white/90">本目錄其他內容</h2>
            <ul className="space-y-3">
              {siblings.map((c) => (
                <li key={c.slug.join('/')}>
                  <Link
                    href={slugHref(c.slug)}
                    className="block text-lg text-white/90 hover:text-white py-2 border-b border-white/10 hover:border-white/30 transition-colors"
                  >
                    {c.type === 'dir' ? `📁 ${c.name}` : c.name.replace(/\.(md|mdx)$/i, '')}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  const children = getDirectoryChildren(relativeDir);
  if (children.length === 0) {
    return (
      <div>
        <p className="text-white/60 mb-6">此路徑下尚無內容。</p>
        <Link href="/" className="text-white hover:opacity-80 transition-opacity inline-block">
          ← 回首頁
        </Link>
      </div>
    );
  }

  const breadcrumbs = slug.map((s, i) => ({
    label: s,
    href: slugHref(slug.slice(0, i + 1)),
  }));
  return (
    <div>
      <nav className="mb-8 text-sm text-nothing-muted flex flex-wrap items-center gap-1 font-body">
          <Link href="/" className="hover:text-nothing-red transition-colors">首頁</Link>
          {breadcrumbs.map((b) => (
            <span key={b.href}>
              <span className="mx-1">/</span>
              <Link href={b.href} className="hover:text-nothing-red transition-colors">
                {b.label}
              </Link>
            </span>
          ))}
        </nav>
      <NothingHero title={slug[slug.length - 1] ?? '目錄'} className="mb-8" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {children.map((c) => (
          <ArticleCard
            key={c.slug.join('/')}
            item={c}
            href={slugHref(c.slug)}
          />
        ))}
      </div>
    </div>
  );
}
