import type { Metadata } from 'next';

import { AutomobileDesignPage } from '@/features/centres/automobile-design-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getAutomobileDesignCentre } from '@/services/centres';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getAutomobileDesignCentre();
  return buildMetadata(site, { ...meta, path: routes.research.centre('design-of-automobiles') });
}

export default async function AutomobileDesignCentreRoute() {
  const centre = await getAutomobileDesignCentre();

  return (
    <main id="main">
      <AutomobileDesignPage centre={centre} />
    </main>
  );
}
