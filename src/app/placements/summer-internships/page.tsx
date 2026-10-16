import type { Metadata } from 'next';

import { PlacementReportPage } from '@/features/placements/report-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPlacementsArchive, getSummerInternships } from '@/services/placements';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getSummerInternships();
  return buildMetadata(site, { ...meta, path: routes.placements.summer });
}

export default async function SummerInternshipsRoute() {
  const [report, archive] = await Promise.all([getSummerInternships(), getPlacementsArchive()]);

  return (
    <main id="main">
      <PlacementReportPage report={report} documents={archive.summer} />
    </main>
  );
}
