import type { Metadata } from 'next';

import { PlacementsArchivePage } from '@/features/placements/archive-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  getFinalPlacements,
  getPlacementsArchive,
  getSummerInternships,
} from '@/services/placements';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getPlacementsArchive();
  return buildMetadata(site, { ...meta, path: routes.placements.reports });
}

export default async function PlacementReportsRoute() {
  const [archive, final, summer] = await Promise.all([
    getPlacementsArchive(),
    getFinalPlacements(),
    getSummerInternships(),
  ]);

  return (
    <main id="main">
      <PlacementsArchivePage archive={archive} final={final} summer={summer} />
    </main>
  );
}
