import { collectionMetadata, LibraryCollectionRoute } from '@/features/library/collection-route';

export function generateMetadata() {
  return collectionMetadata('enewspapers');
}

export default function ENewspaperMagazinesRoute() {
  return <LibraryCollectionRoute id="enewspapers" />;
}
