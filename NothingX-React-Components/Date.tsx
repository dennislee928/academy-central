'use client';

import { useEffect, useState } from 'react';
import { nothing } from './theme';

const WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * NThing-UI Date (Date 2 style): rounded card, day circle, day-progress arc, month/weekday
 */
export function DateWidget() {
  const [state, setState] = useState<{
    day: number;
    month: string;
    weekday: string;
    dayPercent: number;
  } | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      setState({
        day: now.getDate(),
        month: MONTHS[now.getMonth()],
        weekday: WEEKDAY[now.getDay()],
        dayPercent: ((hour * 60 + minute) / (24 * 60)) * 100,
      });
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  const size = 60;
  const radius = size / 2;
  const stroke = 2 * Math.PI * radius;
  const offset = stroke - (state ? (state.dayPercent / 100) * stroke : 0);

  return (
    <div
      style={{
        width: 185 * nothing.scale,
        padding: '12px 16px',
        borderRadius: nothing.radius.card,
        background: nothing.colors.surfaceLight,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexShrink: 0,
      }}
      aria-label={state ? `${state.month} ${state.day}, ${state.weekday}` : 'Date'}
    >
      <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={radius}
            cy={radius}
            r={radius - 2}
            fill={nothing.colors.muted}
            stroke="none"
          />
          {state != null && (
            <circle
              cx={radius}
              cy={radius}
              r={radius - 2}
              fill="none"
              stroke={nothing.colors.red}
              strokeWidth={4}
              strokeDasharray={stroke}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          )}
        </svg>
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-body, system-ui)',
            fontSize: 20,
            fontWeight: 400,
            color: nothing.colors.textDark,
          }}
        >
          {state?.day ?? '—'}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontFamily: 'var(--font-headline, system-ui)',
            fontSize: 13,
            color: nothing.colors.textDark,
            textTransform: 'uppercase',
          }}
        >
          {state?.month ?? '—'}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-headline, system-ui)',
            fontSize: 10,
            fontWeight: 800,
            color: nothing.colors.red,
          }}
        >
          {state?.weekday ?? '—'}
        </span>
      </div>
    </div>
  );
}
