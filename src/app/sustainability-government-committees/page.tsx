import type { Metadata } from 'next';

import { GovernmentCommittees } from '@/features/sustainability/government-committees-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getGovernmentCommittees } from '@/services/sustainability';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getGovernmentCommittees();
  return buildMetadata(site, { ...meta, path: routes.sustainability.governmentCommittees });
}

export default async function GovernmentCommitteesRoute() {
  const content = await getGovernmentCommittees();

  return (
    <main id="main">
      <GovernmentCommittees content={content} />
    </main>
  );
}
