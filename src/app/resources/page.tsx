import type { Metadata } from 'next';

import { SectionHubPage } from '@/features/sections/section-hub';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getSectionHub } from '@/services/sections';

export async function generateMetadata(): Promise<Metadata> {
  const { meta, image } = await getSectionHub('campus-life');
  return buildMetadata(site, {
    ...meta,
    image: image.src,
    imageAlt: image.alt,
    path: routes.campusLife.index,
  });
}

export default async function CampusLifeHubRoute() {
  const content = await getSectionHub('campus-life');

  return (
    <main id="main">
      <SectionHubPage content={content} />
    </main>
  );
}
