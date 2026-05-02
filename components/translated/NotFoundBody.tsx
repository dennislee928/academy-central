'use client';

import Link from 'next/link';
import NothingHero from '@/components/ui/NothingHero';
import NothingCard from '@/components/ui/NothingCard';
import { useTranslation } from '@/components/TranslationProvider';

export default function NotFoundBody() {
  const { t } = useTranslation();

  return (
    <div className="relative z-0 min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <NothingHero title="404" accentColor className="mb-6" />
      <p className="text-nothing-muted font-body mb-8">{t('notFound.message')}</p>
      <NothingCard>
        <Link
          href="/"
          className="font-headline font-bold text-nothing-red hover:opacity-90 transition-opacity"
        >
          {t('notFound.backHome')}
        </Link>
      </NothingCard>
    </div>
  );
}
