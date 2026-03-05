'use client';

import { useEffect, useState } from 'react';

type BrowserInfo = {
  viewport: string;
  cores: number | null;
  language: string;
  /** 0–100 for circular progress (viewport area vs 2560×1440) */
  gauge: number;
};

const PLACEHOLDER: BrowserInfo = {
  viewport: '—',
  cores: null,
  language: '—',
  gauge: 0,
};

function getBrowserInfo(): BrowserInfo {
  if (typeof window === 'undefined') return PLACEHOLDER;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const area = w * h;
  const maxArea = 2560 * 1440;
  const gauge = Math.min(100, Math.round((area / maxArea) * 100));
  return {
    viewport: `${w}×${h}`,
    cores: navigator.hardwareConcurrency ?? null,
    language: navigator.language?.split('-')[0] ?? '—',
    gauge,
  };
}

export default function NothingMonitor() {
  const [info, setInfo] = useState<BrowserInfo>(PLACEHOLDER);

  useEffect(() => {
    const update = () => setInfo(getBrowserInfo());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const strokeDashoffset = info.gauge > 0 ? 47 - (47 * info.gauge) / 100 : 47;

  return (
    <div
      className="rounded-3xl bg-nothing-surface border border-white/10 px-4 py-3 flex items-center gap-3 flex-shrink-0 min-w-[120px]"
      aria-label={`Viewport ${info.viewport}, ${info.cores ?? '?'} cores, ${info.language}`}
    >
      <div className="relative w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
        <svg
          className="w-8 h-8 -rotate-90 text-nothing-red"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <circle
            cx="12"
            cy="12"
            r="10"
            strokeDasharray="47 47"
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>
      </div>
      <div className="flex flex-col min-w-0">
        <span className="font-headline text-sm font-bold text-nothing-text truncate">
          {info.viewport}
        </span>
        <span className="font-body text-xs text-nothing-muted">
          {info.cores != null ? `${info.cores} cores · ${info.language}` : info.language}
        </span>
      </div>
    </div>
  );
}
