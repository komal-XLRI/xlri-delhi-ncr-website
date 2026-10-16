import type { Metadata } from 'next';

import { CampusFacility } from '@/features/campus-life/facility-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getFacultyStaffResidences } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getFacultyStaffResidences();
  return buildMetadata(site, { ...meta, path: routes.campusLife.residences });
}

export default async function FacultyStaffResidencesRoute() {
  const content = await getFacultyStaffResidences();

  return (
    <main id="main">
      <CampusFacility content={content} />
    </main>
  );
}
