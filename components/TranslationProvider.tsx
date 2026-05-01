'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_UI_LOCALE,
  HTML_LANG,
  LOCALE_STORAGE_KEY,
  type UILocale,
  isUILocale,
} from '@/lib/ui-locale';
import { translateUi, type UIStringKey } from '@/lib/translate-ui';

type TranslationContextValue = {
  locale: UILocale;
  setLocale: (locale: UILocale) => void;
  t: (key: UIStringKey) => string;
};

const TranslationContext = createContext<TranslationContextValue | null>(null);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<UILocale>(DEFAULT_UI_LOCALE);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isUILocale(raw)) setLocaleState(raw);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = HTML_LANG[locale];
    }
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const setLocale = useCallback((next: UILocale) => {
    setLocaleState(next);
  }, []);

  const t = useCallback(
    (key: UIStringKey) => translateUi(key, locale),
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation(): TranslationContextValue {
  const ctx = useContext(TranslationContext);
  if (!ctx) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return ctx;
}
