import type { Metadata } from 'next';

import { CampusServices } from '@/features/campus-life/services-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getFoodCourts } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getFoodCourts();
  return buildMetadata(site, { ...meta, path: routes.campusLife.food });
}

export default async function FoodCourtsRoute() {
  const content = await getFoodCourts();

  return (
    <main id="main">
      <CampusServices content={content} />
    </main>
  );
}
