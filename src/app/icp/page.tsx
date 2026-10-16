import type { Metadata } from 'next';

import { IcpPage } from '@/features/executive-education/icp-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getIcp } from '@/services/executive-education';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getIcp();
  return buildMetadata(site, {
    ...meta,
    path: routes.executiveEducation.programme('in-company-programmes'),
  });
}

export default async function IcpRoute() {
  const content = await getIcp();

  return (
    <main id="main">
      <IcpPage content={content} />
    </main>
  );
}
