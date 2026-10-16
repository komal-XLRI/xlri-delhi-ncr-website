import type { Metadata } from 'next';

import { LibraryLayout } from '@/features/library/library-layout';
import { LibraryServices } from '@/features/library/library-pages';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getLibrary } from '@/services/library';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = (await getLibrary()).pages.services;
  return buildMetadata(site, { ...meta, path: routes.campusLife.libraryPage('services') });
}

export default async function LibraryServicesRoute() {
  const content = await getLibrary();

  return (
    <main id="main">
      <LibraryLayout
        content={content}
        title={content.pages.services.title}
        intro={content.pages.services.intro}
      >
        <LibraryServices content={content} />
      </LibraryLayout>
    </main>
  );
}
