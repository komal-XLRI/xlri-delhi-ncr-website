import { collectionMetadata, LibraryCollectionRoute } from '@/features/library/collection-route';

export function generateMetadata() {
  return collectionMetadata('edatabases');
}

export default function DatabasesLibraryRoute() {
  return <LibraryCollectionRoute id="edatabases" />;
}
