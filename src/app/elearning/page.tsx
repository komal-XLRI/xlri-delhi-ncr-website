import { collectionMetadata, LibraryCollectionRoute } from '@/features/library/collection-route';

export function generateMetadata() {
  return collectionMetadata('elearning');
}

export default function ElearningRoute() {
  return <LibraryCollectionRoute id="elearning" />;
}
