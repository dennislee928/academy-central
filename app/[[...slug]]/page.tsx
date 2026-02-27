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

const basePath = process.env.NODE_ENV === 'production' ? '/academy-central' : '';

type Props = { params: Promise<{ slug?: string[] }> };

export async function generateStaticParams() {
  const slugs = getAllSlugsForParams();
  const params = slugs.map((s) => ({ slug: s }));
  params.push({ slug: [] });
  return params;
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    const roots = getContentRoots();
    return (
      <div>
        <h1 className="text-2xl font-bold mb-2">Academy Central</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">依主 page（母 folder）瀏覽內容。</p>
        <ul className="space-y-2">
          {roots.map((name) => (
            <li key={name}>
              <Link
                href={`${basePath}/${encodeURIComponent(name)}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
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
      href: `${basePath}/${slug.slice(0, i + 1).map(encodeURIComponent).join('/')}`,
    }));
    return (
      <div>
        <nav className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          <Link href={basePath ? basePath + '/' : '/'} className="hover:underline">
            首頁
          </Link>
          {breadcrumbs.map((b) => (
            <span key={b.href}>
              {' / '}
              <Link href={b.href} className="hover:underline">
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
        <p className="text-gray-600 dark:text-gray-400">此路徑下尚無內容。</p>
        <Link href={basePath ? basePath + '/' : '/'} className="text-blue-600 dark:text-blue-400 mt-4 inline-block">
          ← 回首頁
        </Link>
      </div>
    );
  }

  const breadcrumbs = slug.map((s, i) => ({
    label: s,
    href: `${basePath}/${slug.slice(0, i + 1).map(encodeURIComponent).join('/')}`,
  }));
  return (
    <div>
      <nav className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        <Link href={basePath ? basePath + '/' : '/'} className="hover:underline">
          首頁
        </Link>
        {breadcrumbs.map((b) => (
          <span key={b.href}>
            {' / '}
            <Link href={b.href} className="hover:underline">
              {b.label}
            </Link>
          </span>
        ))}
      </nav>
      <h1 className="text-xl font-bold mb-4">{slug[slug.length - 1] ?? '目錄'}</h1>
      <ul className="space-y-2">
        {children.map((c) => (
          <li key={c.slug.join('/')}>
            <Link
              href={`${basePath}/${c.slug.map(encodeURIComponent).join('/')}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {c.type === 'dir' ? `📁 ${c.name}` : c.name.replace(/\.(md|mdx)$/i, '')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
