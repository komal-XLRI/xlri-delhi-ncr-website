import type { Metadata } from 'next';

import { FoundingFathersPage } from '@/features/about/founding-fathers';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getFoundingFathers } from '@/services/founding-fathers';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getFoundingFathers();
  return buildMetadata(site, { ...meta, path: routes.about.foundingFathers });
}

export default async function FoundingFathersRoute() {
  const content = await getFoundingFathers();

  return (
    <main id="main">
      <FoundingFathersPage content={content} />
    </main>
  );
}
