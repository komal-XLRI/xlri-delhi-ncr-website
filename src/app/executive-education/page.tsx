import type { Metadata } from 'next';

import { SectionHubPage } from '@/features/sections/section-hub';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getSectionHub } from '@/services/sections';

export async function generateMetadata(): Promise<Metadata> {
  const { meta, image } = await getSectionHub('executive-education');
  return buildMetadata(site, {
    ...meta,
    image: image.src,
    imageAlt: image.alt,
    path: routes.executiveEducation.index,
  });
}

export default async function ExecutiveEducationHubRoute() {
  const content = await getSectionHub('executive-education');

  return (
    <main id="main">
      <SectionHubPage content={content} />
    </main>
  );
}
