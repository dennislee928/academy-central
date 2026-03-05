'use client';

import { nothing } from './theme';

/**
 * NThing-UI Music (music 1): rounded card, cover area, play controls
 * Web: placeholder; can be wired to Web Playback API or external player state.
 */
export function Music(props: {
  title?: string;
  artist?: string;
  coverUrl?: string;
  isPlaying?: boolean;
}) {
  const { title = '—', artist = '—', coverUrl, isPlaying = false } = props;

  return (
    <div
      style={{
        width: 185,
        padding: 15,
        borderRadius: 25,
        background: '#fff',
        flexShrink: 0,
      }}
      aria-label="Music"
    >
      <div
        style={{
          width: 155,
          height: 115,
          borderRadius: 20,
          background: coverUrl ? `url(${coverUrl}) center/cover` : nothing.colors.muted,
          marginBottom: 12,
        }}
      />
      <div
        style={{
          fontFamily: 'var(--font-headline, system-ui)',
          fontSize: 12,
          color: nothing.colors.textDark,
          marginBottom: 2,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-headline, system-ui)',
          fontSize: 10,
          color: nothing.colors.red,
          marginBottom: 10,
        }}
      >
        {artist}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <button
          type="button"
          aria-label="Previous"
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: nothing.colors.muted,
            border: 'none',
            cursor: 'pointer',
          }}
        />
        <button
          type="button"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: nothing.colors.red,
            border: 'none',
            cursor: 'pointer',
          }}
        />
        <button
          type="button"
          aria-label="Next"
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: nothing.colors.muted,
            border: 'none',
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
}
