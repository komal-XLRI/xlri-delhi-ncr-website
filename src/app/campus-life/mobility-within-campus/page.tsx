import type { Metadata } from 'next';

import { CampusServices } from '@/features/campus-life/services-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getMobilityWithinCampus } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getMobilityWithinCampus();
  return buildMetadata(site, { ...meta, path: routes.campusLife.mobility });
}

export default async function MobilityWithinCampusRoute() {
  const content = await getMobilityWithinCampus();

  return (
    <main id="main">
      <CampusServices content={content} />
    </main>
  );
}
