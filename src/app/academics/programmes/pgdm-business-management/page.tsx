import type { Metadata } from 'next';

import { ProgrammePage } from '@/features/academics/programme-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPgdmBm } from '@/services/programmes';

export const metadata: Metadata = buildMetadata(site, {
  title: 'PGDM BM — Postgraduate Diploma in Business Management',
  description:
    'XLRI’s two-year, full-time programme in Business Management, leading to the Postgraduate Diploma in Business Management (PGDBM). Curriculum, programme design and course outlines.',
  path: routes.academics.programme('pgdm-business-management'),
  image: '/media/academics/pgdm-bm/pgdm-bm-batch.jpg',
  imageAlt: 'A PGDM BM batch at XLRI Delhi-NCR',
});

export default async function PgdmBmRoute() {
  const content = await getPgdmBm();

  return (
    <main id="main">
      <ProgrammePage content={content} />
    </main>
  );
}
