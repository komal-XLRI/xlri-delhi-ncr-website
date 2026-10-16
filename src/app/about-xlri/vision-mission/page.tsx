import type { Metadata } from 'next';

import { VisionMissionPage } from '@/features/about/vision-mission';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getVisionMission } from '@/services/vision-mission';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getVisionMission();
  return buildMetadata(site, { ...meta, path: routes.about.visionMission });
}

export default async function VisionMissionRoute() {
  const content = await getVisionMission();

  return (
    <main id="main">
      <VisionMissionPage content={content} />
    </main>
  );
}
