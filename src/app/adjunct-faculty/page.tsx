import type { Metadata } from 'next';

import { FacultyDirectoryPage } from '@/features/faculty/faculty-directory-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getAdjunctFaculty } from '@/services/faculty';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getAdjunctFaculty();
  return buildMetadata(site, { ...meta, path: routes.faculty.adjunct });
}

export default async function AdjunctFacultyRoute() {
  const directory = await getAdjunctFaculty();

  return (
    <main id="main">
      <FacultyDirectoryPage directory={directory} profileBase={routes.faculty.adjunct} />
    </main>
  );
}
