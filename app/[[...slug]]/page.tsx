import Link from 'next/link';
import path from 'path';
import {
  getContentRoots,
  getFilePath,
  readFileContent,
  getDirectoryChildren,
  getAllSlugsForParams,
} from '@/lib/content';
import MarkdownContent from '@/components/MarkdownContent';

type Props = { params: Promise<{ slug?: string[] }> };

export async function generateStaticParams() {
  const slugs = getAllSlugsForParams();
  const params = slugs.map((s) => ({ slug: s }));
  params.push({ slug: [] });
  return params;
}

function slugHref(segments: string[]) {
  if (segments.length === 0) return '/';
  // 與 next.config 的 trailingSlash: true 一致，靜態匯出後路徑為 .../index.html
  return '/' + segments.map(encodeURIComponent).join('/') + '/';
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    const roots = getContentRoots();
    return (
      <div className="min-h-[60vh] flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          Academy Central
        </h1>
        <p className="text-white/60 text-lg mb-12 max-w-xl">
          依主 page（母 folder）瀏覽內容。
        </p>
        <ul className="space-y-4">
          {roots.map((name) => (
            <li key={name}>
              <Link
                href={slugHref([name])}
                className="block text-xl text-white hover:text-white/90 transition-colors py-2 border-b border-white/10 hover:border-white/30"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const filePath = getFilePath(slug);
  const relativeDir = path.join(...slug);

  if (filePath) {
    const content = readFileContent(filePath);
    const breadcrumbs = slug.map((s, i) => ({
      label: s,
      href: slugHref(slug.slice(0, i + 1)),
    }));
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
      <h1 className="text-3xl font-bold tracking-tight mb-8">{slug[slug.length - 1] ?? '目錄'}</h1>
      <ul className="space-y-3">
        {children.map((c) => (
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
    </div>
  );
}
