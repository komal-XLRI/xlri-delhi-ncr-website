import type { Metadata } from 'next';

import { ResearchPublications } from '@/features/sustainability/research-publications-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getResearchPublications } from '@/services/sustainability';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getResearchPublications();
  return buildMetadata(site, { ...meta, path: routes.sustainability.researchPublications });
}

export default async function ResearchPublicationsRoute() {
  const content = await getResearchPublications();

  return (
    <main id="main">
      <ResearchPublications content={content} />
    </main>
  );
}
