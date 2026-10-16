import type { Metadata } from 'next';

import { SustainabilityEvents } from '@/features/sustainability/events-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getSustainabilityEvents } from '@/services/sustainability';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getSustainabilityEvents();
  return buildMetadata(site, { ...meta, path: routes.sustainability.events });
}

export default async function SustainabilityEventsRoute() {
  const content = await getSustainabilityEvents();

  return (
    <main id="main">
      <SustainabilityEvents content={content} />
    </main>
  );
}
