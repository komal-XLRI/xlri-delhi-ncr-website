import type { Metadata } from 'next';

import { CampusFacility } from '@/features/campus-life/facility-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getStudentHostel } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getStudentHostel();
  return buildMetadata(site, { ...meta, path: routes.campusLife.hostel });
}

export default async function StudentHostelRoute() {
  const content = await getStudentHostel();

  return (
    <main id="main">
      <CampusFacility content={content} />
    </main>
  );
}
