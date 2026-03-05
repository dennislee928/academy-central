type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function NothingQuote({ children, className = '' }: Props) {
  return (
    <blockquote
      className={`border-l-4 border-nothing-red rounded-r-2xl bg-nothing-surface/80 py-4 pl-6 pr-6 my-6 font-body text-nothing-muted italic ${className}`}
    >
      {children}
    </blockquote>
  );
}
