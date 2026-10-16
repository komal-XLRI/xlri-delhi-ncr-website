import { collectionMetadata, LibraryCollectionRoute } from '@/features/library/collection-route';

export function generateMetadata() {
  return collectionMetadata('etools');
}

export default function ResearchSupportToolsRoute() {
  return <LibraryCollectionRoute id="etools" />;
}
