import type { Metadata } from 'next';

import { CampusFacility } from '@/features/campus-life/facility-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getGardensParks } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getGardensParks();
  return buildMetadata(site, { ...meta, path: routes.campusLife.gardens });
}

export default async function GardensParksRoute() {
  const content = await getGardensParks();

  return (
    <main id="main">
      <CampusFacility content={content} />
    </main>
  );
}
