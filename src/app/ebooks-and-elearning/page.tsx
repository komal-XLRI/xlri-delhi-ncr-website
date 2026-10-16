import { collectionMetadata, LibraryCollectionRoute } from '@/features/library/collection-route';

export function generateMetadata() {
  return collectionMetadata('ebooks');
}

export default function EbooksAndElearningRoute() {
  return <LibraryCollectionRoute id="ebooks" />;
}
