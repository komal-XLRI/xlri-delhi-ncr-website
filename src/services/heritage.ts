import { heritage } from '@/content/heritage';
import type { Heritage } from '@/types/heritage';

/**
 * "Heritage" repository — the same seam as `services/homepage`.
 * Async now so the Payload query that replaces it is not a signature change.
 */
export async function getHeritage(): Promise<Heritage> {
  return Promise.resolve(heritage);
}
