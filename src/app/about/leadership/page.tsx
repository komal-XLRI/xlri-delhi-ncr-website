import type { Metadata } from 'next';

import { LeadershipPage } from '@/features/about/leadership';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getLeadership } from '@/services/leadership';

export const metadata: Metadata = buildMetadata(site, {
  title: 'Leadership & Administration',
  description:
    'The leadership of XLRI Delhi-NCR — the Director and Deans — and the councils and committees for 2025-2026.',
  path: routes.about.leadership,
  image: '/media/leadership/fr-antony-uvari.jpg',
  imageAlt: 'Fr. Antony R Uvari, SJ, Director of XLRI Delhi-NCR',
});

export default async function LeadershipRoute() {
  const content = await getLeadership();

  return (
    <main id="main">
      <LeadershipPage content={content} />
    </main>
  );
}
