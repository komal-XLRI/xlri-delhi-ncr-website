import type { Metadata } from 'next';

import { CampusFacility } from '@/features/campus-life/facility-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getClassrooms } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getClassrooms();
  return buildMetadata(site, { ...meta, path: routes.campusLife.classrooms });
}

export default async function ClassroomsRoute() {
  const content = await getClassrooms();

  return (
    <main id="main">
      <CampusFacility content={content} />
    </main>
  );
}
