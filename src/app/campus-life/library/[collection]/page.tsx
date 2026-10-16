import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { fill } from '@/lib/format/template';
import { LibraryLayout } from '@/features/library/library-layout';
import { LibraryCollectionPage } from '@/features/library/library-pages';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getLibrary, getLibraryCollectionIds } from '@/services/library';

/** One page per e-resource collection: eDatabases, eJournals, eBooks … */
export const dynamicParams = false;

export function generateStaticParams() {
  return getLibraryCollectionIds().map((collection) => ({ collection }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection: id } = await params;
  const content = await getLibrary();
  const collection = content.collections.find((item) => item.id === id);
  // Only known ids are built (`dynamicParams = false`), so this fallback never shows.
  if (!collection) return buildMetadata(site, { path: routes.campusLife.libraryPage(id) });
  // The title and description are templates in `pages.collection.meta`.
  const { meta } = content.pages.collection;
  const values = {
    label: collection.label,
    items: collection.items.map((item) => item.name).join(', '),
  };
  return buildMetadata(site, {
    title: fill(meta.title, values),
    description: fill(meta.description, values),
    path: routes.campusLife.libraryPage(id),
  });
}

export default async function LibraryCollectionRoute({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: id } = await params;
  const content = await getLibrary();
  const collection = content.collections.find((item) => item.id === id);
  if (!collection) notFound();

  return (
    <main id="main">
      <LibraryLayout content={content} title={collection.label} intro={collection.intro}>
        <LibraryCollectionPage collection={collection} copy={content.pages.collection} />
      </LibraryLayout>
    </main>
  );
}
