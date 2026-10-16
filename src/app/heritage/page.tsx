import type { Metadata } from 'next';

import { HeritagePage } from '@/features/about/heritage';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getHeritage } from '@/services/heritage';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getHeritage();
  return buildMetadata(site, { ...meta, path: routes.about.heritage });
}

export default async function HeritageRoute() {
  const content = await getHeritage();

  return (
    <main id="main">
      <HeritagePage content={content} />
    </main>
  );
}
