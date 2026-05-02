'use client';

import NothingHero from '@/components/ui/NothingHero';
import RootListCards from '@/components/ui/RootListCards';
import { useTranslation } from '@/components/TranslationProvider';

type Props = { roots: string[] };

export default function HomeSection({ roots }: Props) {
  const { t } = useTranslation();

  return (
    <div className="min-h-[60vh] flex flex-col justify-center">
      <NothingHero
        title="Academy Central"
        subtitle={t('home.heroSubtitle')}
      />
      <RootListCards roots={roots} />
    </div>
  );
}
