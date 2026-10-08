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

export const metadata: Metadata = buildMetadata(site, {
  title: 'Placement Reports & Audits',
  description:
    'Every XLRI final placement and summer internship report and placement audit report since 2014.',
  path: routes.placements.reports,
});

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
