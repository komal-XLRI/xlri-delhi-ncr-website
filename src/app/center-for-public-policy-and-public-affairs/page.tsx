import type { Metadata } from 'next';

import { CentreBriefPage } from '@/features/centres/centre-brief-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPublicPolicyCentre } from '@/services/centres';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getPublicPolicyCentre();
  return buildMetadata(site, { ...meta, path: routes.research.centre('public-policy') });
}

export default async function PublicPolicyCentreRoute() {
  const centre = await getPublicPolicyCentre();

  return (
    <main id="main">
      <CentreBriefPage centre={centre} />
    </main>
  );
}
