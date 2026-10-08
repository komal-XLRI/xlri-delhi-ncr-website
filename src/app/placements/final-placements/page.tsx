import type { Metadata } from 'next';

import { PlacementReportPage } from '@/features/placements/report-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPlacementsArchive, getFinalPlacements } from '@/services/placements';

export const metadata: Metadata = buildMetadata(site, {
  title: 'Final Placement Report 2024–26',
  description:
    'XLRI final placements for PGDM (BM) and PGDM (HRM), batch 2024–26: 576 students, 145 recruiters, a median salary of ₹29 LPA and 42.5% Pre-Placement Offers.',
  path: routes.placements.final,
  image: '/media/placements/batch-2024-26.jpg',
  imageAlt: 'Students of the 2024–26 batch at XLRI',
});

export default async function FinalPlacementsRoute() {
  const [report, archive] = await Promise.all([getFinalPlacements(), getPlacementsArchive()]);

  return (
    <main id="main">
      <PlacementReportPage report={report} documents={archive.final} />
    </main>
  );
}
