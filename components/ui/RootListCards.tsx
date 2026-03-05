import NothingCard from './NothingCard';
import RedDot from './RedDot';

type Root = string;

function slugHref(segment: string): string {
  return '/' + encodeURIComponent(segment) + '/';
}

type Props = { roots: Root[] };

export default function RootListCards({ roots }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {roots.map((name, index) => (
        <NothingCard
          key={name}
          href={slugHref(name)}
          showRedDot
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-nothing-red/20 text-nothing-red font-headline text-lg font-bold">
              {index + 1}
            </span>
            <span className="font-headline text-xl font-bold text-nothing-text">
              {name}
            </span>
          </div>
        </NothingCard>
      ))}
    </div>
  );
}
