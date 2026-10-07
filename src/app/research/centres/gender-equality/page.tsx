import type { Metadata } from 'next';

import { CentrePage } from '@/features/centres/centre-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getGenderEqualityCentre } from '@/services/centres';

export const metadata: Metadata = buildMetadata(site, {
  title: 'Centre for Gender Equality & Inclusive Leadership (CGEIL)',
  description:
    'XLRI’s Centre for Gender Equality and Inclusive Leadership, based at the Delhi-NCR campus, works to shape policy, guide actions and support individuals, firms and governments in enabling a more equitable and just society.',
  path: routes.research.centre('gender-equality'),
  image: '/media/centres/gender-equality/news/up-surge-participant-meets.jpg',
  imageAlt: 'Participants of up!SURGE, a CGEIL leadership programme for women',
});

export default async function GenderEqualityCentreRoute() {
  const centre = await getGenderEqualityCentre();

  return (
    <main id="main">
      <CentrePage centre={centre} />
    </main>
  );
}
