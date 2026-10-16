import type { Metadata } from 'next';

import { AboutLanding } from '@/features/about/about-landing';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getAboutPage } from '@/services/about';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getAboutPage();
  return buildMetadata(site, { ...meta, path: routes.about.index });
}

export default async function AboutRoute() {
  const content = await getAboutPage();

  return (
    <main id="main">
      <AboutLanding content={content} />
    </main>
  );
}
