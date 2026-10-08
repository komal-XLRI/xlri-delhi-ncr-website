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

export const metadata: Metadata = buildMetadata(site, {
  title: 'Placements',
  description:
    'Final placement and summer internship outcomes for XLRI’s two-year PGDM programmes: median salaries and stipends, recruiters, sectors, and every report and audit since 2014.',
  path: routes.placements.index,
  image: '/media/placements/batch-2024-26.jpg',
  imageAlt: 'Students of the 2024–26 batch at XLRI',
});

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
