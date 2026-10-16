import type { Metadata } from 'next';

import { CentrePage } from '@/features/centres/centre-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getGenderEqualityCentre } from '@/services/centres';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getGenderEqualityCentre();
  return buildMetadata(site, { ...meta, path: routes.research.centre('gender-equality') });
}

export default async function GenderEqualityCentreRoute() {
  const centre = await getGenderEqualityCentre();

  return (
    <main id="main">
      <CentrePage centre={centre} />
    </main>
  );
}
