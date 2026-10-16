import type { Metadata } from 'next';

import { CampusFacility } from '@/features/campus-life/facility-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getXavierHall } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getXavierHall();
  return buildMetadata(site, { ...meta, path: routes.campusLife.xavier });
}

export default async function XavierHallRoute() {
  const content = await getXavierHall();

  return (
    <main id="main">
      <CampusFacility content={content} />
    </main>
  );
}
