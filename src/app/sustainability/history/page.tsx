import type { Metadata } from 'next';

import { SustainabilityHistory } from '@/features/sustainability/history-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getSustainabilityHistory } from '@/services/sustainability';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getSustainabilityHistory();
  return buildMetadata(site, { ...meta, path: routes.sustainability.history });
}

export default async function SustainabilityHistoryRoute() {
  const content = await getSustainabilityHistory();

  return (
    <main id="main">
      <SustainabilityHistory content={content} />
    </main>
  );
}
