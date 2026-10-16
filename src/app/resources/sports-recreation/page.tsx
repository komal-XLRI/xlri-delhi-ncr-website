import type { Metadata } from 'next';

import { CampusServices } from '@/features/campus-life/services-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getSportsRecreation } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getSportsRecreation();
  return buildMetadata(site, { ...meta, path: routes.campusLife.sports });
}

export default async function SportsRecreationRoute() {
  const content = await getSportsRecreation();

  return (
    <main id="main">
      <CampusServices content={content} />
    </main>
  );
}
