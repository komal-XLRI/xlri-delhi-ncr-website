import type { Metadata } from 'next';

import { CampusFacility } from '@/features/campus-life/facility-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getDailyNeedsStore } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getDailyNeedsStore();
  return buildMetadata(site, { ...meta, path: routes.campusLife.store });
}

export default async function DailyNeedsStoreRoute() {
  const content = await getDailyNeedsStore();

  return (
    <main id="main">
      <CampusFacility content={content} />
    </main>
  );
}
