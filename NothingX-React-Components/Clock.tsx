'use client';

import { useEffect, useState } from 'react';
import { nothing } from './theme';

/**
 * NThing-UI Clock (Clock 2 style): double circle, hour (dark) / minute (red)
 */
export function Clock() {
  const [time, setTime] = useState({ hour: '--', minute: '--' });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime({
        hour: now.getHours().toString().padStart(2, '0'),
        minute: now.getMinutes().toString().padStart(2, '0'),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 95 * nothing.scale,
        height: 95 * nothing.scale,
        borderRadius: nothing.radius.card,
        background: nothing.colors.surfaceLight,
        flexShrink: 0,
      }}
      aria-label={`Time ${time.hour}:${time.minute}`}
    >
      <div
        style={{
          width: 85 * nothing.scale,
          height: 85 * nothing.scale,
          borderRadius: '50%',
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-headline, system-ui)',
            fontSize: 40,
            fontWeight: 700,
            color: nothing.colors.textDark,
            lineHeight: 1,
          }}
        >
          {time.hour}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-headline, system-ui)',
            fontSize: 40,
            fontWeight: 700,
            color: nothing.colors.red,
            lineHeight: 1,
          }}
        >
          {time.minute}
        </span>
      </div>
    </div>
  );
}
