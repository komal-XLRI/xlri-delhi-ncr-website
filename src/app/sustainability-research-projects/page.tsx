import type { Metadata } from 'next';

import { ResearchProjects } from '@/features/sustainability/research-projects-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getResearchProjects } from '@/services/sustainability';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getResearchProjects();
  return buildMetadata(site, { ...meta, path: routes.sustainability.researchProjects });
}

export default async function ResearchProjectsRoute() {
  const content = await getResearchProjects();

  return (
    <main id="main">
      <ResearchProjects content={content} />
    </main>
  );
}
