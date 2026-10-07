import type { Metadata } from 'next';

import { VisionMissionPage } from '@/features/about/vision-mission';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getVisionMission } from '@/services/vision-mission';

export const metadata: Metadata = buildMetadata(site, {
  title: 'Vision & Mission',
  description:
    'The vision, mission, values and Program Education Objectives of XLRI Delhi-NCR — nurturing responsible global leaders for the greater common good and a sustainable future.',
  path: routes.about.visionMission,
  image: '/media/vision-mission/campus-lawn.jpg',
  imageAlt: 'The XLRI Delhi-NCR campus',
});

export default async function VisionMissionRoute() {
  const content = await getVisionMission();

  return (
    <main id="main">
      <VisionMissionPage content={content} />
    </main>
  );
}
