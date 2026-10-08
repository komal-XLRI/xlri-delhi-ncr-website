import type { Metadata } from 'next';

import { PgdmIevPage } from '@/features/academics/pgdm-iev-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPgdmIev } from '@/services/programmes';

export const metadata: Metadata = buildMetadata(site, {
  title: 'PGDM - IEV — Innovation, Entrepreneurship & Venture Development',
  description:
    'A two-year, full-time, AICTE-approved PGDM in entrepreneurship at XLRI Delhi-NCR, combining management education with incubation at XCEED. Eligibility, selection, dates, startups and FAQs.',
  path: routes.academics.programme('pgdm-innovation-entrepreneurship'),
  image: '/media/academics/pgdm-iev/xceed-cohort.jpg',
  imageAlt: 'A PGDM - IEV cohort at the XCEED incubator',
});

export default async function PgdmIevRoute() {
  const content = await getPgdmIev();

  return (
    <main id="main">
      <PgdmIevPage content={content} />
    </main>
  );
}
