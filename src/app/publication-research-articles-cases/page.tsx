import type { Metadata } from 'next';

import { FacultyPublications } from '@/features/research/publications-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getFacultyPublications } from '@/services/research';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getFacultyPublications();
  return buildMetadata(site, { ...meta, path: routes.research.publications });
}

export default async function PublicationsRoute() {
  const content = await getFacultyPublications();

  return (
    <main id="main">
      <FacultyPublications content={content} />
    </main>
  );
}
