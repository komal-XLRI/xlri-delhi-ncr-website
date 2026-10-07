import { directorsDesk } from '@/content/directors-desk';
import type { DirectorsDesk } from '@/types/directors-desk';

/**
 * "From the Director's Desk" repository — the same seam as `services/homepage`.
 * Async now so the Payload query that replaces it is not a signature change.
 */
export async function getDirectorsDesk(): Promise<DirectorsDesk> {
  return Promise.resolve(directorsDesk);
}
