import type { Metadata } from 'next';

import { LibraryGallery } from '@/features/library/library-gallery';
import { LibraryLayout } from '@/features/library/library-layout';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getLibrary } from '@/services/library';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = (await getLibrary()).pages.gallery;
  return buildMetadata(site, { ...meta, path: routes.campusLife.libraryPage('gallery') });
}

export default async function LibraryGalleryRoute() {
  const content = await getLibrary();

  return (
    <main id="main">
      <LibraryLayout
        content={content}
        title={content.pages.gallery.title}
        intro={content.pages.gallery.intro}
      >
        <LibraryGallery photos={content.gallery} />
      </LibraryLayout>
    </main>
  );
}
