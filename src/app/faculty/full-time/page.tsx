import type { Metadata } from 'next';

import { FacultyDirectoryPage } from '@/features/faculty/faculty-directory-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getFullTimeFaculty } from '@/services/faculty';

export const metadata: Metadata = buildMetadata(site, {
  title: 'Full Time Faculty',
  description:
    'The full-time faculty of XLRI Delhi-NCR — designations, qualifications and functional areas, with links to each biography.',
  path: routes.faculty.fullTime,
});

export default async function FullTimeFacultyRoute() {
  const directory = await getFullTimeFaculty();

  return (
    <main id="main">
      <FacultyDirectoryPage directory={directory} />
    </main>
  );
}
