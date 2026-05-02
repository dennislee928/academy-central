/** 介面語系（非路由 i18n）：僅 en / es / ja，適合動態部落格內容外的 UI 字串。 */

export type UILocale = 'en' | 'es' | 'ja';

export const UI_LOCALES: UILocale[] = ['en', 'es', 'ja'];

export const DEFAULT_UI_LOCALE: UILocale = 'en';

export const LOCALE_STORAGE_KEY = 'academy-central-ui-locale';

export const HTML_LANG: Record<UILocale, string> = {
  en: 'en',
  es: 'es',
  ja: 'ja',
};

export function isUILocale(value: string | null): value is UILocale {
  return value === 'en' || value === 'es' || value === 'ja';
}
