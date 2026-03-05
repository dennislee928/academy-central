'use client';

import { useEffect, useState } from 'react';
import { nothing } from './theme';

const OPEN_METEO = 'https://api.open-meteo.com/v1/forecast';
const DEFAULT_LAT = 25.033;
const DEFAULT_LON = 121.5654;

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

/**
 * NThing-UI Weather (Weather 2 Dark): rounded dark card, icon, temp, description
 */
export function Weather() {
  const [state, setState] = useState<{
    temp: number | null;
    code: number | null;
    desc: string | null;
    loading: boolean;
    error: boolean;
  }>({ temp: null, code: null, desc: null, loading: true, error: false });

  useEffect(() => {
    let cancelled = false;
    const fetchWeather = (lat: number, lon: number) => {
      const url = `${OPEN_METEO}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,weather_code&timezone=auto`;
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          if (cancelled) return;
          const cur = data?.current;
          if (cur?.temperature_2m != null && cur?.weather_code != null) {
            setState({
              temp: Math.round(cur.temperature_2m),
              code: cur.weather_code,
              desc: cur.weather_code ? String(cur.weather_code) : null,
              loading: false,
              error: false,
            });
          } else setState((s) => ({ ...s, loading: false, error: true }));
        })
        .catch(() => {
          if (!cancelled) setState((s) => ({ ...s, loading: false, error: true }));
        });
    };
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => { if (!cancelled) fetchWeather(p.coords.latitude, p.coords.longitude); },
        () => { if (!cancelled) fetchWeather(DEFAULT_LAT, DEFAULT_LON); },
        { maximumAge: 600000, timeout: 8000 }
      );
    } else fetchWeather(DEFAULT_LAT, DEFAULT_LON);
    return () => { cancelled = true; };
  }, []);

  const emoji = state.code != null ? wmoEmoji(state.code) : '☀';
  const tempStr = state.loading ? '…' : state.error || state.temp == null ? '—' : `${state.temp} °C`;

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
      aria-label={state.loading ? 'Loading weather' : `Weather ${tempStr}`}
    >
      <div
        style={{
          width: 45,
          height: 45,
          borderRadius: '50%',
          background: nothing.colors.circleBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
        }}
      >
        {emoji}
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
          {tempStr}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-headline, system-ui)',
            fontSize: 8,
            fontWeight: 600,
            color: nothing.colors.red,
            textTransform: 'uppercase',
          }}
        >
          Weather
        </span>
      </div>
    </div>
  );
}
