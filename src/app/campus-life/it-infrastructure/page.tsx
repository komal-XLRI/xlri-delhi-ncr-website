import type { Metadata } from 'next';

import { CampusFacility } from '@/features/campus-life/facility-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getItInfrastructure } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getItInfrastructure();
  return buildMetadata(site, { ...meta, path: routes.campusLife.it });
}

export default async function ITInfrastructureRoute() {
  const content = await getItInfrastructure();

  return (
    <main id="main">
      <CampusFacility content={content} />
    </main>
  );
}
