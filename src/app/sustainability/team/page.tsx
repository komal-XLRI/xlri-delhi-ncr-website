import type { Metadata } from 'next';

import { SustainabilityTeam } from '@/features/sustainability/team-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getSustainabilityTeam } from '@/services/sustainability';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getSustainabilityTeam();
  return buildMetadata(site, { ...meta, path: routes.sustainability.team });
}

export default async function SustainabilityTeamRoute() {
  const content = await getSustainabilityTeam();

  return (
    <main id="main">
      <SustainabilityTeam content={content} />
    </main>
  );
}
