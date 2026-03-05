type Props = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
};

const sizeMap = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export default function RedDot({ className = '', size = 'md', children }: Props) {
  const dotClass = `rounded-full bg-nothing-red flex-shrink-0 ${sizeMap[size]} ${className}`;
  if (children) {
    return (
      <span className="inline-flex items-center gap-2">
        <span className={dotClass} aria-hidden />
        {children}
      </span>
    );
  }
  return <span className={dotClass} role="presentation" />;
}
