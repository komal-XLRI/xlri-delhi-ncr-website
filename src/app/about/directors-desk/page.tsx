import type { Metadata } from 'next';

import { DirectorsDeskPage } from '@/features/about/directors-desk';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getDirectorsDesk } from '@/services/directors-desk';

export const metadata: Metadata = buildMetadata(site, {
  title: 'From the Director’s Desk',
  description:
    'A message from Fr. Antony R Uvari, SJ, Director of XLRI Delhi-NCR, on the four hallmarks of Jesuit education that guide the school.',
  path: routes.about.directorsDesk,
  image: '/media/leadership/fr-antony-uvari.jpg',
  imageAlt: 'Fr. Antony R Uvari, SJ, Director of XLRI Delhi-NCR',
});

export default async function DirectorsDeskRoute() {
  const content = await getDirectorsDesk();

  return (
    <main id="main">
      <DirectorsDeskPage content={content} />
    </main>
  );
}
