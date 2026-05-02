'use client';

import type { ReactNode } from 'react';
import { nothing } from './theme';

/**
 * NThing-UI 點陣邊框按鈕（與 @dennislee928/nothingx-react-components 之 NothingButton 一致）
 */
export function NothingButton(props: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  disabled?: boolean;
  'aria-pressed'?: boolean;
  'aria-label'?: string;
}) {
  const variant = props.variant ?? 'primary';
  const isPrimary = variant === 'primary';

  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      aria-pressed={props['aria-pressed']}
      aria-label={props['aria-label']}
      style={{
        padding: '10px 20px',
        borderRadius: nothing.radius.card,
        border: `2px solid ${isPrimary ? nothing.colors.red : nothing.colors.circleBg}`,
        background: isPrimary ? nothing.colors.red : 'transparent',
        color: isPrimary ? nothing.colors.surfaceLight : nothing.colors.surfaceLight,
        fontFamily: 'var(--font-headline, system-ui)',
        fontSize: 13,
        fontWeight: 600,
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        opacity: props.disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        boxShadow: 'none',
      }}
      onMouseEnter={(e) => {
        if (props.disabled) return;
        e.currentTarget.style.background = isPrimary
          ? nothing.colors.surfaceLight
          : nothing.colors.circleBg;
        e.currentTarget.style.color = isPrimary ? nothing.colors.red : nothing.colors.surfaceLight;
        e.currentTarget.style.borderColor = nothing.colors.surfaceLight;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isPrimary ? nothing.colors.red : 'transparent';
        e.currentTarget.style.color = isPrimary
          ? nothing.colors.surfaceLight
          : nothing.colors.surfaceLight;
        e.currentTarget.style.borderColor = isPrimary ? nothing.colors.red : nothing.colors.circleBg;
      }}
    >
      {props.children}
    </button>
  );
}
