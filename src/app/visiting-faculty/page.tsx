import type { Metadata } from 'next';

import { VisitingFacultyPage } from '@/features/faculty/visiting-faculty-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getVisitingFaculty } from '@/services/faculty';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getVisitingFaculty();
  return buildMetadata(site, { ...meta, path: routes.faculty.visiting });
}

export default async function VisitingFacultyRoute() {
  const directory = await getVisitingFaculty();

  return (
    <main id="main">
      <VisitingFacultyPage directory={directory} />
    </main>
  );
}
