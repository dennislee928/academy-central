'use client';

import Link from 'next/link';
import ArticleCard from '@/components/ui/ArticleCard';
import NothingHero from '@/components/ui/NothingHero';
import { useTranslation } from '@/components/TranslationProvider';
import { slugHref } from '@/lib/slug-href';

type Child = { name: string; type: 'file' | 'dir'; slug: string[] };

type Props = {
  slug: string[];
  childrenItems: Child[];
};

export default function FolderListingPage({ slug, childrenItems }: Props) {
  const { t } = useTranslation();

  const breadcrumbs = slug.map((s, i) => ({
    label: s,
    href: slugHref(slug.slice(0, i + 1)),
  }));

  const title = slug[slug.length - 1] ?? t('directory.fallbackTitle');

  return (
    <div>
      <nav className="mb-8 text-sm text-nothing-muted flex flex-wrap items-center gap-1 font-body">
        <Link href="/" className="hover:text-nothing-red transition-colors">
          {t('breadcrumb.home')}
        </Link>
        {breadcrumbs.map((b) => (
          <span key={b.href}>
            <span className="mx-1">/</span>
            <Link href={b.href} className="hover:text-nothing-red transition-colors">
              {b.label}
            </Link>
          </span>
        ))}
      </nav>
      <NothingHero title={title} className="mb-8" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {childrenItems.map((c) => (
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
