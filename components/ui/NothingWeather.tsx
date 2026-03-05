'use client';

/** NThing-style weather widget (decorative, no API in static export). */
export default function NothingWeather() {
  return (
    <div
      className="rounded-3xl bg-nothing-surface border border-white/10 px-4 py-3 flex items-center gap-3 flex-shrink-0 min-w-[120px]"
      aria-hidden
    >
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl">
        ☀
      </div>
      <div className="flex flex-col">
        <span className="font-headline text-sm font-bold text-nothing-text">— °C</span>
        <span className="font-body text-xs text-nothing-muted">Weather</span>
      </div>
    </div>
  );
}
