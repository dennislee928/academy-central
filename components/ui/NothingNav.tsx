'use client';

import Link from 'next/link';
import { useTranslation } from '@/components/TranslationProvider';
import LanguageLocaleButtons from '@/components/ui/LanguageLocaleButtons';
import RedDot from './RedDot';

export default function NothingNav() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-nothing-bg/95 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="font-headline font-bold text-lg tracking-tight text-nothing-text hover:text-nothing-red transition-colors duration-200 flex items-center gap-2"
        >
          <RedDot size="sm" />
          Academy Central
        </Link>
        <div className="flex flex-wrap items-center gap-4">
          <LanguageLocaleButtons />
          <nav className="text-sm text-nothing-muted font-body">
            <Link
              href="/"
              className="hover:text-nothing-red transition-colors duration-200"
            >
              {t('nav.home')}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
