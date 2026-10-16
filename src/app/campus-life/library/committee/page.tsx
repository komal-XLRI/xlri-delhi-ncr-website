import type { Metadata } from 'next';

import { LibraryLayout } from '@/features/library/library-layout';
import { LibraryCommittee } from '@/features/library/library-pages';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getLibrary } from '@/services/library';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = (await getLibrary()).pages.committee;
  return buildMetadata(site, { ...meta, path: routes.campusLife.libraryPage('committee') });
}

export default async function LibraryCommitteeRoute() {
  const content = await getLibrary();

  return (
    <main id="main">
      <LibraryLayout
        content={content}
        title={content.pages.committee.title}
        intro={content.pages.committee.intro}
      >
        <LibraryCommittee content={content} />
      </LibraryLayout>
    </main>
  );
}
