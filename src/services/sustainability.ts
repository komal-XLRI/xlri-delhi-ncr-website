import { sustainabilityTeam } from '@/content/sustainability-team';
import type { SustainabilityTeamPage } from '@/types/sustainability-team';

/**
 * Sustainability repository — the same seam as `services/homepage`. Async so
 * the Payload query that replaces it is not a signature change.
 */
export async function getSustainabilityTeam(): Promise<SustainabilityTeamPage> {
  return Promise.resolve(sustainabilityTeam);
}
