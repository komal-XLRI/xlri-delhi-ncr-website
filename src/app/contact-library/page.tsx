import type { Metadata } from 'next';

import { LibraryLayout } from '@/features/library/library-layout';
import { LibraryContact } from '@/features/library/library-pages';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getLibrary } from '@/services/library';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = (await getLibrary()).pages.contact;
  return buildMetadata(site, { ...meta, path: routes.campusLife.libraryPage('contact') });
}

export default async function LibraryContactRoute() {
  const content = await getLibrary();

  return (
    <main id="main">
      <LibraryLayout
        content={content}
        title={content.pages.contact.title}
        intro={content.pages.contact.intro}
      >
        <LibraryContact content={content} />
      </LibraryLayout>
    </main>
  );
}
