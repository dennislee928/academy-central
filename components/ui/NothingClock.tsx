'use client';

import { useEffect, useState } from 'react';

export default function NothingClock() {
  const [time, setTime] = useState<{ hour: string; minute: string }>({ hour: '--', minute: '--' });

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
      className="flex flex-col items-center justify-center rounded-full bg-nothing-surface-light w-24 h-24 flex-shrink-0"
      aria-label={`目前時間 ${time.hour}:${time.minute}`}
    >
      <div className="rounded-full bg-white/95 w-20 h-20 flex flex-col items-center justify-center">
        <span className="font-headline text-2xl font-bold text-nothing-surface leading-none">
          {time.hour}
        </span>
        <span className="font-headline text-2xl font-bold text-nothing-red leading-none">
          {time.minute}
        </span>
      </div>
    </div>
  );
}
