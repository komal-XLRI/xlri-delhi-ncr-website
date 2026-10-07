import type { Metadata } from 'next';

import { CentreBriefPage } from '@/features/centres/centre-brief-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPublicPolicyCentre } from '@/services/centres';

export const metadata: Metadata = buildMetadata(site, {
  title: 'Centre for Public Policy and Public Affairs (XLCP)',
  description:
    'XLRI’s Centre for Public Policy and Public Affairs, launched on February 25, 2022, brings together scholars and practitioners on corporate governance, conflict management and mediation, public-private partnerships and public leadership.',
  path: routes.research.centre('public-policy'),
  image: '/media/vision-mission/campus-i-love-xlri.jpg',
  imageAlt: 'The XLRI Delhi-NCR campus',
});

export default async function PublicPolicyCentreRoute() {
  const centre = await getPublicPolicyCentre();

  return (
    <main id="main">
      <CentreBriefPage centre={centre} />
    </main>
  );
}
