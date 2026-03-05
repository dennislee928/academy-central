'use client';

import { useEffect, useState } from 'react';

const DEFAULT_LAT = 25.033;
const DEFAULT_LON = 121.5654;
const OPEN_METEO = 'https://api.open-meteo.com/v1/forecast';

/** WMO weather code → emoji (Open-Meteo subset) */
function wmoEmoji(code: number): string {
  if (code === 0) return '☀';
  if (code <= 2) return '⛅';
  if (code <= 3) return '☁';
  if (code === 45 || code === 48) return '🌫';
  if (code >= 51 && code <= 67) return '🌧';
  if (code >= 71 && code <= 77) return '🌨';
  if (code >= 80 && code <= 99) return '⛈';
  return '☀';
}

type WeatherState = {
  temp: number | null;
  code: number | null;
  loading: boolean;
  error: string | null;
};

export default function NothingWeather() {
  const [weather, setWeather] = useState<WeatherState>({
    temp: null,
    code: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchWeather = (lat: number, lon: number) => {
      const url = `${OPEN_METEO}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (cancelled) return;
          const cur = data?.current;
          if (cur?.temperature_2m != null && cur?.weather_code != null) {
            setWeather({
              temp: Math.round(cur.temperature_2m),
              code: cur.weather_code,
              loading: false,
              error: null,
            });
          } else {
            setWeather((w) => ({ ...w, loading: false, error: 'no data' }));
          }
        })
        .catch(() => {
          if (!cancelled) {
            setWeather((w) => ({ ...w, loading: false, error: 'fetch' }));
          }
        });
    };

    if (!navigator.geolocation) {
      fetchWeather(DEFAULT_LAT, DEFAULT_LON);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!cancelled) {
          fetchWeather(pos.coords.latitude, pos.coords.longitude);
        }
      },
      () => {
        if (!cancelled) {
          fetchWeather(DEFAULT_LAT, DEFAULT_LON);
        }
      },
      { maximumAge: 600000, timeout: 8000 }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  const emoji = weather.code != null ? wmoEmoji(weather.code) : '☀';
  const tempStr =
    weather.loading ? '…' : weather.error ? '—' : weather.temp != null ? `${weather.temp} °C` : '—';

  return (
    <div
      className="rounded-3xl bg-nothing-surface border border-white/10 px-4 py-3 flex items-center gap-3 flex-shrink-0 min-w-[120px]"
      aria-label={weather.loading ? '載入天氣中' : `天氣 ${tempStr}`}
    >
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl flex-shrink-0">
        {emoji}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="font-headline text-sm font-bold text-nothing-text">{tempStr}</span>
        <span className="font-body text-xs text-nothing-muted">Weather</span>
      </div>
    </div>
  );
}
