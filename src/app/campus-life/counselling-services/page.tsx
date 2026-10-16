import type { Metadata } from 'next';

import { Counselling } from '@/features/campus-life/counselling-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getCounsellingServices } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getCounsellingServices();
  return buildMetadata(site, { ...meta, path: routes.campusLife.counselling });
}

export default async function CounsellingServicesRoute() {
  const content = await getCounsellingServices();

  return (
    <main id="main">
      <Counselling content={content} />
    </main>
  );
}
