import type { Metadata } from 'next';

import { EmdpPage } from '@/features/executive-education/emdp-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getEmdp } from '@/services/executive-education';

export const metadata: Metadata = buildMetadata(site, {
  title: 'EMDP — Executive Management Development Programmes',
  description:
    'XLRI Delhi-NCR’s executive development programmes: upcoming and on-going batches in Digital HR, Strategy & Leadership, Strategic HR, Healthcare, Finance, and the IPAG DBA and MBA.',
  path: routes.executiveEducation.programme('emdp'),
  image: '/media/executive-education/emdp/digital-hr-people-analytics-batch-8.jpg',
  imageAlt: 'Executive Development Program in Digital HR Leadership & People Analytics, Batch 8',
});

export default async function EmdpRoute() {
  const content = await getEmdp();

  return (
    <main id="main">
      <EmdpPage content={content} />
    </main>
  );
}
