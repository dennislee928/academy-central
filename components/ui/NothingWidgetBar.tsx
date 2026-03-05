'use client';

import NothingClock from './NothingClock';
import NothingDate from './NothingDate';
import NothingMonitor from './NothingMonitor';
import NothingWeather from './NothingWeather';

export default function NothingWidgetBar() {
  return (
    <div className="border-b border-white/10 bg-nothing-bg/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap items-center justify-end gap-4">
        <NothingClock />
        <NothingDate />
        <NothingMonitor />
        <NothingWeather />
      </div>
    </div>
  );
}
