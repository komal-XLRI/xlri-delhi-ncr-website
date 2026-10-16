import type { Metadata } from 'next';

import { EmdpPage } from '@/features/executive-education/emdp-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getEmdp } from '@/services/executive-education';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getEmdp();
  return buildMetadata(site, { ...meta, path: routes.executiveEducation.programme('emdp') });
}

export default async function EmdpRoute() {
  const content = await getEmdp();

  return (
    <main id="main">
      <EmdpPage content={content} />
    </main>
  );
}
