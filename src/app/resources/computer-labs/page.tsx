import type { Metadata } from 'next';

import { CampusFacility } from '@/features/campus-life/facility-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getComputerLabs } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getComputerLabs();
  return buildMetadata(site, { ...meta, path: routes.campusLife.labs });
}

export default async function ComputerLabsRoute() {
  const content = await getComputerLabs();

  return (
    <main id="main">
      <CampusFacility content={content} />
    </main>
  );
}
