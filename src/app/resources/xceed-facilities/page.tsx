import type { Metadata } from 'next';

import { CampusFacility } from '@/features/campus-life/facility-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getXceedFacilities } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getXceedFacilities();
  return buildMetadata(site, { ...meta, path: routes.campusLife.xceed });
}

export default async function XCEEDFacilitiesRoute() {
  const content = await getXceedFacilities();

  return (
    <main id="main">
      <CampusFacility content={content} />
    </main>
  );
}
