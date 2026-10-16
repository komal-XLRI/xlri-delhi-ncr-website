import type { Metadata } from 'next';

import { MdpPage } from '@/features/executive-education/mdp-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getMdp } from '@/services/executive-education';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getMdp();
  return buildMetadata(site, {
    ...meta,
    path: routes.executiveEducation.programme('management-development-programmes'),
  });
}

export default async function MdpRoute() {
  const content = await getMdp();

  return (
    <main id="main">
      <MdpPage content={content} />
    </main>
  );
}
