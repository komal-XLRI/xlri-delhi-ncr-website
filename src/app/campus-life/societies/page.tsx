import type { Metadata } from 'next';

import { StudentSocieties } from '@/features/campus-life/societies-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getStudentSocieties } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getStudentSocieties();
  return buildMetadata(site, { ...meta, path: routes.campusLife.societies });
}

export default async function StudentSocietiesRoute() {
  const content = await getStudentSocieties();

  return (
    <main id="main">
      <StudentSocieties content={content} />
    </main>
  );
}
