'use client';

import { nothing } from './theme';

/**
 * NThing-UI Quotes: double circle, quote text, author in red
 */
export function Quotes(props: { quote?: string; author?: string }) {
  const { quote = 'Nothing is impossible.', author = 'Unknown' } = props;

  return (
    <div
      style={{
        width: 95 * nothing.scale,
        height: 95 * nothing.scale,
        borderRadius: nothing.radius.card,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        flexShrink: 0,
      }}
      aria-label="Quote"
    >
      <div
        style={{
          width: 85,
          height: 85,
          borderRadius: '50%',
          background: nothing.colors.surfaceLight,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-headline, system-ui)',
            fontSize: 10,
            color: nothing.colors.textDark,
            textAlign: 'center',
            margin: 0,
            maxHeight: 60,
            overflow: 'hidden',
          }}
        >
          {quote}
        </p>
        <span
          style={{
            fontFamily: 'var(--font-headline, system-ui)',
            fontSize: 10,
            fontWeight: 600,
            color: nothing.colors.red,
            textTransform: 'uppercase',
            marginTop: 6,
          }}
        >
          {author}
        </span>
      </div>
    </div>
  );
}
