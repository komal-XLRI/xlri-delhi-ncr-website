import type { Metadata } from 'next';

import { HealthcareCentrePage } from '@/features/centres/healthcare-centre-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getHealthcareCentre } from '@/services/centres';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getHealthcareCentre();
  return buildMetadata(site, { ...meta, path: routes.research.centre('healthcare-management') });
}

export default async function HealthcareCentreRoute() {
  const centre = await getHealthcareCentre();

  return (
    <main id="main">
      <HealthcareCentrePage centre={centre} />
    </main>
  );
}
