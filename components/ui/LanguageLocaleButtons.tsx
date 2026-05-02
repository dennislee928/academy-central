'use client';

import { NothingButton } from '@/components/vendor/nthing/NothingButton';
import { useTranslation } from '@/components/TranslationProvider';
import type { UILocale } from '@/lib/ui-locale';
import { UI_LOCALES } from '@/lib/ui-locale';

const LABELS: Record<UILocale, string> = {
  en: 'EN',
  es: 'ES',
  ja: 'JA',
};

export default function LanguageLocaleButtons() {
  const { locale, setLocale } = useTranslation();

  return (
    <div
      className="flex flex-wrap items-center gap-1.5"
      role="group"
      aria-label="Interface language"
    >
      {UI_LOCALES.map((code) => (
        <NothingButton
          key={code}
          variant={locale === code ? 'primary' : 'ghost'}
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
        >
          {LABELS[code]}
        </NothingButton>
      ))}
    </div>
  );
}
