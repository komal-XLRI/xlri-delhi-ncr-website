import type { Metadata } from 'next';

import { FacultyDirectoryPage } from '@/features/faculty/faculty-directory-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getFullTimeFaculty } from '@/services/faculty';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getFullTimeFaculty();
  return buildMetadata(site, { ...meta, path: routes.faculty.fullTime });
}

export default async function FullTimeFacultyRoute() {
  const directory = await getFullTimeFaculty();

  return (
    <main id="main">
      <FacultyDirectoryPage directory={directory} profileBase={routes.faculty.index} />
    </main>
  );
}
