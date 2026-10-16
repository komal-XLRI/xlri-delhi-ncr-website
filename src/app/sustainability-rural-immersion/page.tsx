import type { Metadata } from 'next';

import { RuralImmersion } from '@/features/sustainability/rural-immersion-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getRuralImmersion } from '@/services/sustainability';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getRuralImmersion();
  return buildMetadata(site, { ...meta, path: routes.sustainability.ruralImmersion });
}

export default async function RuralImmersionRoute() {
  const content = await getRuralImmersion();

  return (
    <main id="main">
      <RuralImmersion content={content} />
    </main>
  );
}
