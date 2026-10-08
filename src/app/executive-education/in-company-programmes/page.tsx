import type { Metadata } from 'next';

import { IcpPage } from '@/features/executive-education/icp-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getIcp } from '@/services/executive-education';

export const metadata: Metadata = buildMetadata(site, {
  title: 'In-Company Programmes (ICP)',
  description:
    'In-Company Programmes XLRI Delhi-NCR has delivered for Mercedes-Benz R&D India, Hyundai Motors, Denso India, the Department of Income Tax and Air Headquarters.',
  path: routes.executiveEducation.programme('in-company-programmes'),
  image: '/media/executive-education/icp/icp-mdp-block.jpg',
  imageAlt: 'The MDP Block at the XLRI Delhi-NCR campus',
});

export default async function IcpRoute() {
  const content = await getIcp();

  return (
    <main id="main">
      <IcpPage content={content} />
    </main>
  );
}
