'use client';

import Link from 'next/link';
import { useTranslation } from '@/components/TranslationProvider';

export default function EmptyPathPage() {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text-nothing-muted font-body mb-6">{t('empty.noContent')}</p>
      <Link
        href="/"
        className="text-nothing-red hover:opacity-90 transition-opacity font-headline font-bold inline-block"
      >
        {t('empty.backHome')}
      </Link>
    </div>
  );
}
