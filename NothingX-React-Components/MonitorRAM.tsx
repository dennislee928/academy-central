'use client';

import { useEffect, useState } from 'react';
import { nothing } from './theme';

/**
 * NThing-UI Monitor RAM (RAM 3 Dark): dark rounded card, circular progress, RAM label
 * Browser: uses a synthetic "usage" from viewport area for static export compatibility.
 */
export function MonitorRAM() {
  const [info, setInfo] = useState<{ percent: number; label: string }>({ percent: 0, label: '—' });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const area = w * h;
      const maxArea = 2560 * 1440;
      const percent = Math.min(100, Math.round((area / maxArea) * 100));
      setInfo({ percent, label: 'RAM' });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const size = 60;
  const radius = size / 2;
  const stroke = 2 * Math.PI * radius;
  const offset = stroke - (info.percent / 100) * stroke;

  return (
    <div
      style={{
        width: 185 * nothing.scale,
        padding: '12px 16px',
        borderRadius: nothing.radius.card,
        background: nothing.colors.surface,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexShrink: 0,
      }}
      aria-label={`RAM ${info.percent}%`}
    >
      <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={radius}
            cy={radius}
            r={radius - 2}
            fill={nothing.colors.circleBg}
            stroke="none"
          />
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
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontFamily: 'var(--font-headline, system-ui)',
            fontSize: 15,
            fontWeight: 700,
            color: nothing.colors.surfaceLight,
          }}
        >
          {info.percent}%
        </span>
        <span
          style={{
            fontFamily: 'var(--font-headline, system-ui)',
            fontSize: 12,
            color: nothing.colors.red,
          }}
        >
          {info.label}
        </span>
      </div>
    </div>
  );
}
