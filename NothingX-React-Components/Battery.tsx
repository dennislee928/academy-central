'use client';

import { useEffect, useState } from 'react';
import { nothing } from './theme';

/**
 * NThing-UI Battery (battery 1): rounded card, percent, Charging/Discharging
 * Browser: uses Battery API when available.
 */
export function Battery() {
  const [state, setState] = useState<{
    percent: number;
    charging: boolean;
    supported: boolean;
  }>({ percent: 0, charging: false, supported: false });

  useEffect(() => {
    if (typeof navigator === 'undefined' || !(navigator as any).getBattery) {
      setState((s) => ({ ...s, supported: false, percent: 0 }));
      return;
    }
    (navigator as any).getBattery().then((bat: any) => {
      const update = () => {
        setState({
          percent: Math.round(bat.level * 100),
          charging: bat.charging,
          supported: true,
        });
      };
      update();
      bat.addEventListener('chargingchange', update);
      bat.addEventListener('levelchange', update);
      return () => {
        bat.removeEventListener('chargingchange', update);
        bat.removeEventListener('levelchange', update);
      };
    }).catch(() => setState((s) => ({ ...s, supported: false })));
  }, []);

  return (
    <div
      style={{
        width: 175,
        padding: 16,
        borderRadius: nothing.radius.card,
        background: '#fff',
        flexShrink: 0,
      }}
      aria-label={`Battery ${state.percent}% ${state.charging ? 'Charging' : 'Discharging'}`}
    >
      <div
        style={{
          fontFamily: 'var(--font-headline, system-ui)',
          fontSize: 13,
          color: nothing.colors.textDark,
          marginBottom: 4,
        }}
      >
        {state.supported ? `${state.percent}%` : '—'}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-headline, system-ui)',
          fontSize: 11,
          color: nothing.colors.textDark,
        }}
      >
        {state.supported ? (state.charging ? 'Charging' : 'Discharging') : 'N/A'}
      </div>
    </div>
  );
}
