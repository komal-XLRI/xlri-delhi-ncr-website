import type { Metadata } from 'next';

import { AccreditationPage } from '@/features/about/accreditation';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getAccreditation } from '@/services/accreditation';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getAccreditation();
  return buildMetadata(site, { ...meta, path: routes.about.accreditation });
}

export default async function AccreditationRoute() {
  const content = await getAccreditation();

  return (
    <main id="main">
      <AccreditationPage content={content} />
    </main>
  );
}
