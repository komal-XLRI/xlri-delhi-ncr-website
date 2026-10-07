import type { Metadata } from 'next';

import { AutomobileDesignPage } from '@/features/centres/automobile-design-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getAutomobileDesignCentre } from '@/services/centres';

export const metadata: Metadata = buildMetadata(site, {
  title: 'Indian School for Design of Automobiles (INDEA)',
  description:
    'INDEA, an XLRI – Avik Chattopadhyay initiative at the Delhi-NCR campus, will be India’s first dedicated finishing school for automobile design. Foundation stone laid 16 June 2025.',
  path: routes.research.centre('design-of-automobiles'),
  image: '/media/centres/design-of-automobiles/param-foundation-pillar.jpg',
  imageAlt: 'Param, the INDEA foundation pillar on the XLRI Delhi-NCR campus',
});

export default async function AutomobileDesignCentreRoute() {
  const centre = await getAutomobileDesignCentre();

  return (
    <main id="main">
      <AutomobileDesignPage centre={centre} />
    </main>
  );
}
