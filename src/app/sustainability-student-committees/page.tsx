import type { Metadata } from 'next';

import { StudentCommittees } from '@/features/sustainability/student-committees-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getStudentCommittees } from '@/services/sustainability';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getStudentCommittees();
  return buildMetadata(site, { ...meta, path: routes.sustainability.studentCommittees });
}

export default async function StudentCommitteesRoute() {
  const content = await getStudentCommittees();

  return (
    <main id="main">
      <StudentCommittees content={content} />
    </main>
  );
}
