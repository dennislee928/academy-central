import type { UILocale } from './ui-locale';

/**
 * 純函式翻譯：不依賴路由或 per-page locale 檔，適合大量動態 .md 路徑的部落格。
 * Markdown 本文維持原作者語言；此處僅包覆 UI（導覽、麵包屑、錯誤訊息等）。
 */
const uiStrings = {
  'nav.home': {
    en: 'Home',
    es: 'Inicio',
    ja: 'ホーム',
  },
  'home.heroSubtitle': {
    en: 'Browse content by top-level sections (folders).',
    es: 'Explora el contenido por secciones principales (carpetas).',
    ja: 'トップ階層のフォルダごとにコンテンツを閲覧できます。',
  },
  'breadcrumb.home': {
    en: 'Home',
    es: 'Inicio',
    ja: 'ホーム',
  },
  'article.siblingsTitle': {
    en: 'More in this folder',
    es: 'Más en esta carpeta',
    ja: 'このフォルダのその他',
  },
  'empty.noContent': {
    en: 'There is no content at this path.',
    es: 'No hay contenido en esta ruta.',
    ja: 'このパスにはまだコンテンツがありません。',
  },
  'empty.backHome': {
    en: '← Back to home',
    es: '← Volver al inicio',
    ja: '← ホームへ戻る',
  },
  'directory.fallbackTitle': {
    en: 'Directory',
    es: 'Directorio',
    ja: 'ディレクトリ',
  },
  'notFound.message': {
    en: 'This page could not be found.',
    es: 'No se pudo encontrar esta página.',
    ja: 'ページが見つかりませんでした。',
  },
  'notFound.backHome': {
    en: 'Back to home',
    es: 'Volver al inicio',
    ja: 'ホームへ戻る',
  },
} as const;

export type UIStringKey = keyof typeof uiStrings;

export function translateUi(key: UIStringKey, locale: UILocale): string {
  return uiStrings[key][locale];
}
