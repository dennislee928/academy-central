'use client';

/** NThing-style monitor widget (decorative). No real system stats in static export. */
export default function NothingMonitor() {
  return (
    <div
      className="rounded-3xl bg-nothing-surface border border-white/10 px-4 py-3 flex items-center gap-3 flex-shrink-0 min-w-[120px]"
      aria-hidden
    >
      <div className="relative w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
        <svg
          className="w-6 h-6 text-nothing-red"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
          <circle
            cx="12"
            cy="12"
            r="10"
            strokeDasharray="47 47"
            strokeDashoffset="12"
            transform="rotate(-90 12 12)"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-headline text-sm font-bold text-nothing-text">—</span>
        <span className="font-body text-xs text-nothing-muted">Monitor</span>
      </div>
    </div>
  );
}
