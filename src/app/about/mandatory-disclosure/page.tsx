import type { Metadata } from 'next';

import { MandatoryDisclosurePage } from '@/features/about/mandatory-disclosure';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getMandatoryDisclosure } from '@/services/mandatory-disclosure';

export const metadata: Metadata = buildMetadata(site, {
  title: 'Mandatory Disclosure',
  description:
    'The mandatory disclosure for XLRI Delhi-NCR (November 2025) — view online or download the PDF.',
  path: routes.about.mandatoryDisclosure,
});

export default async function MandatoryDisclosureRoute() {
  const content = await getMandatoryDisclosure();

  return (
    <main id="main">
      <MandatoryDisclosurePage content={content} />
    </main>
  );
}
