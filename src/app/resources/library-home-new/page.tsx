import type { Metadata } from 'next';

import { LibraryHome } from '@/features/library/library-home';
import { LibrarySection } from '@/features/library/library-section';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getLibrary } from '@/services/library';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getLibrary();
  return buildMetadata(site, { ...meta, path: routes.campusLife.library });
}

export default async function LibraryRoute() {
  const content = await getLibrary();

  return (
    <LibrarySection content={content}>
      <main id="main">
        <LibraryHome content={content} />
      </main>
    </LibrarySection>
  );
}
