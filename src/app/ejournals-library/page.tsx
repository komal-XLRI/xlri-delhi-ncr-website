import { collectionMetadata, LibraryCollectionRoute } from '@/features/library/collection-route';

export function generateMetadata() {
  return collectionMetadata('ejournals');
}

export default function EjournalsLibraryRoute() {
  return <LibraryCollectionRoute id="ejournals" />;
}
