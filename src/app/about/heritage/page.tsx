import type { Metadata } from 'next';

import { HeritagePage } from '@/features/about/heritage';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getHeritage } from '@/services/heritage';

export const metadata: Metadata = buildMetadata(site, {
  title: 'Heritage',
  description:
    'Founded in 1949 by Fr. Quinn Enright, S.J., XLRI is India’s oldest management school. The story of XLRI and its journey to the Delhi-NCR campus.',
  path: routes.about.heritage,
  image: '/media/heritage/fr-quinn-enright.jpg',
  imageAlt: 'Fr. Quinn Enright, S.J., founder of XLRI',
});

export default async function HeritageRoute() {
  const content = await getHeritage();

  return (
    <main id="main">
      <HeritagePage content={content} />
    </main>
  );
}
