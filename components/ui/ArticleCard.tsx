import Link from 'next/link';
import NothingCard from './NothingCard';

type Item = { name: string; type: 'file' | 'dir'; slug: string[] };

type Props = {
  item: Item;
  href: string;
};

function displayName(name: string, type: string): string {
  if (type === 'file') {
    return name.replace(/\.(md|mdx)$/i, '');
  }
  return name;
}

export default function ArticleCard({ item, href }: Props) {
  const label = displayName(item.name, item.type);
  return (
    <NothingCard href={href}>
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg ${
            item.type === 'dir'
              ? 'bg-nothing-red/20 text-nothing-red'
              : 'bg-white/10 text-nothing-muted'
          }`}
        >
          {item.type === 'dir' ? '📁' : '📄'}
        </span>
        <span className="font-headline text-lg font-bold text-nothing-text truncate">
          {label}
        </span>
      </div>
    </NothingCard>
  );
}
