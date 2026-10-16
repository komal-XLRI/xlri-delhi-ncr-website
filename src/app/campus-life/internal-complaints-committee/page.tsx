import type { Metadata } from 'next';

import { InternalCommittee } from '@/features/campus-life/internal-committee-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getInternalCommittee } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getInternalCommittee();
  return buildMetadata(site, { ...meta, path: routes.campusLife.internalCommittee });
}

export default async function InternalCommitteeRoute() {
  const content = await getInternalCommittee();

  return (
    <main id="main">
      <InternalCommittee content={content} />
    </main>
  );
}
