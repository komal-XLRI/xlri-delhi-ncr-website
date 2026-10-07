import { foundingFathers } from '@/content/founding-fathers';
import type { FoundingFathers } from '@/types/founding-fathers';

/**
 * "Jesuit Founding Fathers" repository — the same seam as `services/homepage`.
 * Async now so the Payload query that replaces it is not a signature change.
 */
export async function getFoundingFathers(): Promise<FoundingFathers> {
  return Promise.resolve(foundingFathers);
}
