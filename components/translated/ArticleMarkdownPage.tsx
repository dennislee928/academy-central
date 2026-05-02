'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import ArticleCard from '@/components/ui/ArticleCard';
import { useTranslation } from '@/components/TranslationProvider';
import { slugHref } from '@/lib/slug-href';
import { translateMarkdown } from '@/lib/translate-content';

type Sibling = { name: string; type: 'file' | 'dir'; slug: string[] };

type Props = {
  slug: string[];
  content: string;
  siblings: Sibling[];
};

export default function ArticleMarkdownPage({
  slug,
  content,
  siblings,
}: Props) {
  const { locale, t } = useTranslation();
  const [displayContent, setDisplayContent] = useState(content);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    setDisplayContent(content);
  }, [content]);

  useEffect(() => {
    let cancelled = false;
    async function doTranslate() {
      setIsTranslating(true);
      try {
        const translated = await translateMarkdown(content, locale);
        if (!cancelled) setDisplayContent(translated);
      } catch {
        if (!cancelled) setDisplayContent(content);
      } finally {
        if (!cancelled) setIsTranslating(false);
      }
    }
    doTranslate();
    return () => {
      cancelled = true;
    };
  }, [content, locale]);

  const breadcrumbs = slug.map((s, i) => ({
    label: s,
    href: slugHref(slug.slice(0, i + 1)),
  }));

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
      {isTranslating && (
        <p className="text-nothing-muted text-xs font-body mb-4 animate-pulse">
          Translating…
        </p>
      )}
      <MarkdownContent content={displayContent} />
      {siblings.length > 0 && (
        <section className="mt-12 pt-8 border-t border-white/10">
          <h2 className="font-headline text-xl font-bold tracking-tight mb-4 text-nothing-text">
            {t('article.siblingsTitle')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {siblings.map((c) => (
              <ArticleCard
                key={c.slug.join('/')}
                item={c}
                href={slugHref(c.slug)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
