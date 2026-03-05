type Props = {
  title: string;
  subtitle?: string;
  accentColor?: boolean;
  className?: string;
};

export default function NothingHero({
  title,
  subtitle,
  accentColor,
  className = '',
}: Props) {
  return (
    <header className={`mb-12 ${className}`}>
      <h1
        className={`font-headline text-4xl md:text-6xl font-bold tracking-tight ${
          accentColor ? 'text-nothing-red' : 'text-nothing-text'
        }`}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-lg text-nothing-muted font-body max-w-xl">
          {subtitle}
        </p>
      )}
    </header>
  );
}
