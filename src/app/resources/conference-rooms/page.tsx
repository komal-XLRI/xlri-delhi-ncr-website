import type { Metadata } from 'next';

import { CampusFacility } from '@/features/campus-life/facility-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getConferenceRooms } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getConferenceRooms();
  return buildMetadata(site, { ...meta, path: routes.campusLife.conference });
}

export default async function ConferenceRoomsRoute() {
  const content = await getConferenceRooms();

  return (
    <main id="main">
      <CampusFacility content={content} />
    </main>
  );
}
