import type { Metadata } from 'next';

import { AboutLanding } from '@/features/about/about-landing';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getAboutPage } from '@/services/about';

export const metadata: Metadata = buildMetadata(site, {
  title: 'About XLRI',
  description:
    'XLRI, the oldest B-school in India, was founded in 1949 by visionary Jesuit Fathers. Its 47-acre Delhi-NCR campus at Jhajjar holds a platinum-level green building certification.',
  path: routes.about.index,
  image: '/media/about/campus-aerial-wide.jpg',
  imageAlt: 'Aerial view of the XLRI Delhi-NCR campus',
});

export default async function AboutRoute() {
  const content = await getAboutPage();

  return (
    <main id="main">
      <AboutLanding content={content} />
    </main>
  );
}
