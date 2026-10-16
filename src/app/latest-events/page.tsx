import type { Metadata } from 'next';

import { LatestEvents } from '@/features/events/latest-events-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getLatestEvents } from '@/services/events';

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getLatestEvents();
  return buildMetadata(site, { ...copy.meta, path: routes.events.index });
}

export default async function LatestEventsRoute() {
  const content = await getLatestEvents();

  return (
    <main id="main">
      <LatestEvents content={content} />
    </main>
  );
}
