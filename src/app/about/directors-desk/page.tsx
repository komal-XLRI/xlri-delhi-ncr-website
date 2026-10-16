import type { Metadata } from 'next';

import { DirectorsDeskPage } from '@/features/about/directors-desk';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getDirectorsDesk } from '@/services/directors-desk';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getDirectorsDesk();
  return buildMetadata(site, { ...meta, path: routes.about.directorsDesk });
}

export default async function DirectorsDeskRoute() {
  const content = await getDirectorsDesk();

  return (
    <main id="main">
      <DirectorsDeskPage content={content} />
    </main>
  );
}
