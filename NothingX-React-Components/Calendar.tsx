'use client';

import { nothing } from './theme';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * NThing-UI Calendar (Calendar 1): rounded card, month/year header, grid, today dot
 */
export function Calendar(props: { year?: number; month?: number }) {
  const now = new Date();
  const year = props.year ?? now.getFullYear();
  const month = props.month ?? now.getMonth();
  const today = now.getDate();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = first.getDay();
  const daysInMonth = last.getDate();
  const monthName = first.toLocaleString('default', { month: 'long' });

  const cells: (number | null)[] = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div
      style={{
        width: 185,
        padding: 16,
        borderRadius: 25,
        background: nothing.colors.surfaceLight,
        flexShrink: 0,
      }}
      aria-label={`Calendar ${monthName} ${year}`}
    >
      <div
        style={{
          fontFamily: 'var(--font-headline, system-ui)',
          fontSize: 12,
          color: nothing.colors.textDark,
          textAlign: 'center',
          marginBottom: 10,
        }}
      >
        {monthName} {year}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            style={{
              width: 20,
              textAlign: 'center',
              fontFamily: 'var(--font-headline, system-ui)',
              fontSize: 9,
              color: nothing.colors.textDark,
            }}
          >
            {d}
          </div>
        ))}
        {cells.map((d, i) => (
          <div
            key={i}
            style={{
              width: 20,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-headline, system-ui)',
              fontSize: 9,
              color: d != null ? nothing.colors.textDark : 'transparent',
              position: 'relative',
            }}
          >
            {d ?? ''}
            {d === today && (
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: nothing.colors.red,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
