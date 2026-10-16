import type { Metadata } from 'next';

import { PlacementReportPage } from '@/features/placements/report-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPlacementsArchive, getFinalPlacements } from '@/services/placements';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getFinalPlacements();
  return buildMetadata(site, { ...meta, path: routes.placements.final });
}

export default async function FinalPlacementsRoute() {
  const [report, archive] = await Promise.all([getFinalPlacements(), getPlacementsArchive()]);

  return (
    <main id="main">
      <PlacementReportPage report={report} documents={archive.final} />
    </main>
  );
}
