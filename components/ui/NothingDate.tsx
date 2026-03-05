'use client';

import { useEffect, useState } from 'react';

const WEEKDAY = ['日', '一', '二', '三', '四', '五', '六'];
const MONTH = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

export default function NothingDate() {
  const [date, setDate] = useState<{ day: number; month: string; weekday: string } | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setDate({
        day: now.getDate(),
        month: MONTH[now.getMonth()],
        weekday: WEEKDAY[now.getDay()],
      });
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="rounded-3xl bg-nothing-surface border border-white/10 px-4 py-3 flex items-center gap-3 flex-shrink-0 min-w-[140px]"
      aria-label={date ? `今日 ${date.month}${date.day}日 星期${date.weekday}` : '日期'}
    >
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
        <span className="font-headline text-lg font-bold text-nothing-text">
          {date?.day ?? '—'}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-body text-xs text-nothing-muted uppercase tracking-wide">
          {date?.month ?? '—'}
        </span>
        <span className="font-headline text-sm font-bold text-nothing-red">
          {date ? `星期${date.weekday}` : '—'}
        </span>
      </div>
    </div>
  );
}
