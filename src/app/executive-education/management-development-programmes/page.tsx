import type { Metadata } from 'next';

import { MdpPage } from '@/features/executive-education/mdp-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getMdp } from '@/services/executive-education';

export const metadata: Metadata = buildMetadata(site, {
  title: 'Management Development Programmes (MDPs)',
  description:
    'XLRI’s short, intensive, on-campus Management Development Programmes for working professionals. The MDP calendar, residential facility, group discounts and contacts.',
  path: routes.executiveEducation.programme('management-development-programmes'),
  image: '/media/executive-education/mdp/mdp-block-delhi-ncr.jpg',
  imageAlt: 'The MDP Block at the XLRI Delhi-NCR campus',
});

export default async function MdpRoute() {
  const content = await getMdp();

  return (
    <main id="main">
      <MdpPage content={content} />
    </main>
  );
}
