import type { Metadata } from 'next';

import { MandatoryDisclosurePage } from '@/features/about/mandatory-disclosure';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getMandatoryDisclosure } from '@/services/mandatory-disclosure';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getMandatoryDisclosure();
  return buildMetadata(site, { ...meta, path: routes.about.mandatoryDisclosure });
}

export default async function MandatoryDisclosureRoute() {
  const content = await getMandatoryDisclosure();

  return (
    <main id="main">
      <MandatoryDisclosurePage content={content} />
    </main>
  );
}
