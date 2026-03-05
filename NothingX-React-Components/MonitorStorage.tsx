'use client';

import { nothing } from './theme';

/**
 * NThing-UI Monitor Storage (Storage 1): light rounded card, vertical bar, drive label
 * Web: placeholder percent (no disk access in browser).
 */
export function MonitorStorage(props: { percent?: number; label?: string }) {
  const percent = Math.min(100, Math.max(0, props.percent ?? 0));
  const label = props.label ?? 'C Drive';

  return (
    <div
      style={{
        width: 175,
        padding: 16,
        borderRadius: nothing.radius.card,
        background: nothing.colors.surfaceLight,
        flexShrink: 0,
      }}
      aria-label={`Storage ${label} ${percent}%`}
    >
      <div
        style={{
          fontFamily: 'var(--font-headline, system-ui)',
          fontSize: 15,
          color: nothing.colors.red,
          marginBottom: 4,
        }}
      >
        {percent}%
      </div>
      <div
        style={{
          fontFamily: 'var(--font-headline, system-ui)',
          fontSize: 12,
          color: nothing.colors.textDark,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          width: 155,
          height: 90,
          borderRadius: 20,
          background: nothing.colors.muted,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: `${percent}%`,
            background: nothing.colors.red,
            transition: 'height 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}
