import Link from 'next/link';
import NothingHero from '@/components/ui/NothingHero';
import NothingCard from '@/components/ui/NothingCard';
import DotGridBackground from '@/components/ui/DotGridBackground';

export default function NotFound() {
  return (
    <>
      <DotGridBackground />
      <div className="relative z-0 min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <NothingHero title="404" accentColor className="mb-6" />
        <p className="text-nothing-muted font-body mb-8">This page could not be found.</p>
        <NothingCard>
          <Link
            href="/"
            className="font-headline font-bold text-nothing-red hover:opacity-90 transition-opacity"
          >
            回首頁
          </Link>
        </NothingCard>
      </div>
    </>
  );
}
