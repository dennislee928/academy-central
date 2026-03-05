'use client';

import { nothing } from './theme';

/**
 * NThing-UI Photos: grid placeholder for images
 */
export function Photos(props: { imageUrls?: string[] }) {
  const urls = props.imageUrls ?? [];
  const placeholders = 4;
  const cells = urls.length >= 4 ? urls.slice(0, 4) : [...urls, ...Array(placeholders - urls.length).fill('')];

  return (
    <div
      style={{
        width: 185,
        padding: 16,
        borderRadius: 25,
        background: nothing.colors.surface,
        flexShrink: 0,
      }}
      aria-label="Photos"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
        }}
      >
        {cells.map((src, i) => (
          <div
            key={i}
            style={{
              aspectRatio: '1',
              borderRadius: 12,
              background: src ? `url(${src}) center/cover` : nothing.colors.circleBg,
            }}
          />
        ))}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-headline, system-ui)',
          fontSize: 12,
          color: nothing.colors.red,
          marginTop: 8,
          textAlign: 'center',
        }}
      >
        Photos
      </div>
    </div>
  );
}
