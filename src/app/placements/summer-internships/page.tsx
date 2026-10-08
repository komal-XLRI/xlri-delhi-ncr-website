import type { Metadata } from 'next';

import { PlacementReportPage } from '@/features/placements/report-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPlacementsArchive, getSummerInternships } from '@/services/placements';

export const metadata: Metadata = buildMetadata(site, {
  title: 'Summer Internship Placements 2025',
  description:
    'XLRI summer internships for the 2025–27 batch: 583 students, 584 offers from 114 organisations, a median stipend of ₹1.55 LPM and a highest of ₹3.50 LPM.',
  path: routes.placements.summer,
});

export default async function SummerInternshipsRoute() {
  const [report, archive] = await Promise.all([getSummerInternships(), getPlacementsArchive()]);

  return (
    <main id="main">
      <PlacementReportPage report={report} documents={archive.summer} />
    </main>
  );
}
