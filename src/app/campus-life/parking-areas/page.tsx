import type { Metadata } from 'next';

import { CampusFacility } from '@/features/campus-life/facility-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getParkingAreas } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getParkingAreas();
  return buildMetadata(site, { ...meta, path: routes.campusLife.parking });
}

export default async function ParkingAreasRoute() {
  const content = await getParkingAreas();

  return (
    <main id="main">
      <CampusFacility content={content} />
    </main>
  );
}
