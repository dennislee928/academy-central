'use client';

import { nothing } from './theme';

/**
 * NThing-UI Next event: single upcoming event line
 */
export function CalendarEvent(props: {
  title?: string;
  dateTime?: string;
}) {
  const { title = 'No upcoming events', dateTime = '' } = props;

  return (
    <div
      style={{
        width: 185,
        padding: 14,
        borderRadius: nothing.radius.card,
        background: nothing.colors.surfaceLight,
        flexShrink: 0,
      }}
      aria-label="Next event"
    >
      <div
        style={{
          fontFamily: 'var(--font-headline, system-ui)',
          fontSize: 11,
          color: nothing.colors.red,
          textTransform: 'uppercase',
          marginBottom: 4,
        }}
      >
        Next event
      </div>
      <div
        style={{
          fontFamily: 'var(--font-headline, system-ui)',
          fontSize: 13,
          color: nothing.colors.textDark,
        }}
      >
        {title}
      </div>
      {dateTime && (
        <div
          style={{
            fontFamily: 'var(--font-body, system-ui)',
            fontSize: 10,
            color: nothing.colors.textDark,
            opacity: 0.8,
            marginTop: 2,
          }}
        >
          {dateTime}
        </div>
      )}
    </div>
  );
}
