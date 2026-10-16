import type { Metadata } from 'next';

import { LeadershipPage } from '@/features/about/leadership';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getLeadership } from '@/services/leadership';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getLeadership();
  return buildMetadata(site, { ...meta, path: routes.about.leadership });
}

export default async function LeadershipRoute() {
  const content = await getLeadership();

  return (
    <main id="main">
      <LeadershipPage content={content} />
    </main>
  );
}
