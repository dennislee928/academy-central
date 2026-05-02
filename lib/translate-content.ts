const CACHE_VERSION = 'act-v1';

function makeCacheKey(content: string, locale: string): string {
  const snippet = content.slice(0, 80).trim().replace(/\s+/g, ' ');
  return `${CACHE_VERSION}:${locale}:${content.length}:${snippet}`;
}

async function translateChunk(text: string, targetLang: string): Promise<string> {
  const params = new URLSearchParams({
    client: 'gtx',
    sl: 'auto',
    tl: targetLang,
    dt: 't',
    q: text,
  });
  const res = await fetch(
    `https://translate.googleapis.com/translate_a/single?${params.toString()}`
  );
  if (!res.ok) throw new Error(`translate error ${res.status}`);
  const data: [[string, string][], ...unknown[]] = await res.json();
  return data[0].map((pair) => pair[0]).join('');
}

function splitContent(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    let end = Math.min(i + maxLen, text.length);
    if (end < text.length) {
      const paraBreak = text.lastIndexOf('\n\n', end);
      if (paraBreak > i) {
        end = paraBreak + 2;
      } else {
        const lineBreak = text.lastIndexOf('\n', end);
        if (lineBreak > i) end = lineBreak + 1;
      }
    }
    chunks.push(text.slice(i, end));
    i = end;
  }
  return chunks;
}

export async function translateMarkdown(
  content: string,
  locale: string
): Promise<string> {
  const key = makeCacheKey(content, locale);
  try {
    const cached = localStorage.getItem(key);
    if (cached) return cached;
  } catch {
    /* ignore */
  }

  const chunks = splitContent(content, 3000);
  const parts = await Promise.all(
    chunks.map((chunk) => translateChunk(chunk, locale))
  );
  const result = parts.join('\n\n');

  try {
    localStorage.setItem(key, result);
  } catch {
    /* ignore */
  }

  return result;
}
