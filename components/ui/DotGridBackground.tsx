'use client';

type Props = {
  className?: string;
  dotSize?: number;
  gap?: number;
  opacity?: number;
};

export default function DotGridBackground({
  className = '',
  dotSize = 2,
  gap = 24,
  opacity = 0.15,
}: Props) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, var(--nothing-text) ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${gap}px ${gap}px`,
          opacity,
        }}
      />
    </div>
  );
}
