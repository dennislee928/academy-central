import Link from 'next/link';
import RedDot from './RedDot';

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  showRedDot?: boolean;
  rounded?: 'default' | 'full';
};

export default function NothingCard({
  children,
  className = '',
  href,
  showRedDot,
  rounded = 'default',
}: Props) {
  const roundedClass = rounded === 'full' ? 'rounded-full' : 'rounded-3xl';
  const baseClass = `${roundedClass} bg-nothing-surface border border-white/10 p-6 transition-all duration-300 hover:border-nothing-red/50 hover:bg-nothing-surface/90`;

  const content = (
    <>
      {showRedDot && (
        <span className="absolute top-4 right-4">
          <RedDot size="sm" />
        </span>
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`relative block ${baseClass} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={`relative ${baseClass} ${className}`}>
      {content}
    </div>
  );
}
