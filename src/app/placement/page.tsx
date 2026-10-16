import type { Metadata } from 'next';

import { PlacementsOverviewPage } from '@/features/placements/overview-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  getFinalPlacements,
  getPlacementsArchive,
  getPlacementsOverview,
  getSummerInternships,
} from '@/services/placements';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getPlacementsOverview();
  return buildMetadata(site, { ...meta, path: routes.placements.index });
}

export default async function PlacementsRoute() {
  const [overview, final, summer, archive] = await Promise.all([
    getPlacementsOverview(),
    getFinalPlacements(),
    getSummerInternships(),
    getPlacementsArchive(),
  ]);

  return (
    <main id="main">
      <PlacementsOverviewPage overview={overview} final={final} summer={summer} archive={archive} />
    </main>
  );
}
