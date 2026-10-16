import type { Metadata } from 'next';

import { CampusFacility } from '@/features/campus-life/facility-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getGuestAccommodation } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getGuestAccommodation();
  return buildMetadata(site, { ...meta, path: routes.campusLife.guest });
}

export default async function GuestAccommodationRoute() {
  const content = await getGuestAccommodation();

  return (
    <main id="main">
      <CampusFacility content={content} />
    </main>
  );
}
