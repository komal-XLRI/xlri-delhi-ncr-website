import type { Metadata } from 'next';

import { SustainabilityTeam } from '@/features/sustainability/team-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getSustainabilityTeam } from '@/services/sustainability';

export const metadata: Metadata = buildMetadata(site, {
  title: 'Sustainability Core Team',
  description:
    'The faculty of XLRI Delhi-NCR’s Sustainability core team and the members of the Campus Sustainability Committee.',
  path: routes.sustainability.team,
});

export default async function SustainabilityTeamRoute() {
  const content = await getSustainabilityTeam();

  return (
    <main id="main">
      <SustainabilityTeam content={content} />
    </main>
  );
}
