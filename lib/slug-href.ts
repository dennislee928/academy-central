/** 與 next.config trailingSlash: true 一致，產出靜態匯出用的 href。 */
export function slugHref(segments: string[]): string {
  if (segments.length === 0) return '/';
  return `/${segments.map(encodeURIComponent).join('/')}/`;
}
