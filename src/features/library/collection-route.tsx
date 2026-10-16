import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { fill } from '@/lib/format/template';
import { buildMetadata } from '@/lib/seo/metadata';
import { getLibrary } from '@/services/library';

import { LibraryLayout } from './library-layout';
import { LibraryCollectionPage } from './library-pages';
import { LibrarySection } from './library-section';

/**
 * One e-resource collection page — eDatabases, eJournals, eBooks … Each has
 * its own route at the live site's address (`/databases-library`,
 * `/ejournals-library` …), and each route is this, given its collection id.
 */
export async function collectionMetadata(id: string): Promise<Metadata> {
  const content = await getLibrary();
  const collection = content.collections.find((item) => item.id === id);
  if (!collection) throw new Error(`library.json: no collection "${id}"`);
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

export async function LibraryCollectionRoute({ id }: { id: string }) {
  const content = await getLibrary();
  const collection = content.collections.find((item) => item.id === id);
  if (!collection) notFound();

  return (
    <LibrarySection content={content}>
      <main id="main">
        <LibraryLayout content={content} title={collection.label} intro={collection.intro}>
          <LibraryCollectionPage collection={collection} copy={content.pages.collection} />
        </LibraryLayout>
      </main>
    </LibrarySection>
  );
}
