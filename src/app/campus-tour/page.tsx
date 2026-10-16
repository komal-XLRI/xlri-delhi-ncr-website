import type { Metadata } from 'next';

import { CampusTour } from '@/features/campus-life/campus-tour-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getCampusTour } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getCampusTour();
  return buildMetadata(site, { ...meta, path: routes.campusLife.campusTour });
}

export default async function CampusTourRoute() {
  const content = await getCampusTour();

  return (
    <main id="main">
      <CampusTour content={content} />
    </main>
  );
}
