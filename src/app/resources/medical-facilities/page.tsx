import type { Metadata } from 'next';

import { CampusFacility } from '@/features/campus-life/facility-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getMedicalFacilities } from '@/services/campus-life';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getMedicalFacilities();
  return buildMetadata(site, { ...meta, path: routes.campusLife.medical });
}

export default async function MedicalFacilitiesRoute() {
  const content = await getMedicalFacilities();

  return (
    <main id="main">
      <CampusFacility content={content} />
    </main>
  );
}
