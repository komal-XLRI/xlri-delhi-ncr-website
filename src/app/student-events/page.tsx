import type { Metadata } from 'next';

import { StudentEvents } from '@/features/campus-life/student-events-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getStudentEvents } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getStudentEvents();
  return buildMetadata(site, { ...meta, path: routes.campusLife.studentEvents });
}

export default async function StudentEventsRoute() {
  const content = await getStudentEvents();

  return (
    <main id="main">
      <StudentEvents content={content} />
    </main>
  );
}
