import type { Metadata } from 'next';

import { SustainabilityCourses } from '@/features/sustainability/courses-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getSustainabilityCourses } from '@/services/sustainability';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getSustainabilityCourses();
  return buildMetadata(site, { ...meta, path: routes.sustainability.courses });
}

export default async function SustainabilityCoursesRoute() {
  const content = await getSustainabilityCourses();

  return (
    <main id="main">
      <SustainabilityCourses content={content} />
    </main>
  );
}
