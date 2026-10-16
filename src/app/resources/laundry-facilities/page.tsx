import type { Metadata } from 'next';

import { CampusFacility } from '@/features/campus-life/facility-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getLaundryFacilities } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getLaundryFacilities();
  return buildMetadata(site, { ...meta, path: routes.campusLife.laundry });
}

export default async function LaundryFacilitiesRoute() {
  const content = await getLaundryFacilities();

  return (
    <main id="main">
      <CampusFacility content={content} />
    </main>
  );
}
