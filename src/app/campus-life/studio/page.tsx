import type { Metadata } from 'next';

import { CampusFacility } from '@/features/campus-life/facility-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getStudio } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getStudio();
  return buildMetadata(site, { ...meta, path: routes.campusLife.studio });
}

export default async function StudioRoute() {
  const content = await getStudio();

  return (
    <main id="main">
      <CampusFacility content={content} />
    </main>
  );
}
