import type { Metadata } from 'next';

import { FoundingFathersPage } from '@/features/about/founding-fathers';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getFoundingFathers } from '@/services/founding-fathers';

export const metadata: Metadata = buildMetadata(site, {
  title: 'Jesuit Founding Fathers',
  description:
    'The Jesuit founding fathers of XLRI — Fr. Quinn Enright, Fr. E.H. McGrath, Fr. Jim Collins, Fr. William N Tome and their companions — whose vision shaped India’s oldest management school.',
  path: routes.about.foundingFathers,
  image: '/media/founding-fathers/fr-quinn-enright.jpg',
  imageAlt: 'Fr. Quinn Enright, SJ, founder of XLRI',
});

export default async function FoundingFathersRoute() {
  const content = await getFoundingFathers();

  return (
    <main id="main">
      <FoundingFathersPage content={content} />
    </main>
  );
}
