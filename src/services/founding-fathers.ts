import foundingFathersJson from '@/content/founding-fathers.json';
import type { FoundingFathers } from '@/types/founding-fathers';
import { fromJson } from '@/lib/validation/json-content';

const foundingFathers = fromJson<FoundingFathers>(foundingFathersJson);

/**
 * "Jesuit Founding Fathers" repository — the same seam as `services/homepage`.
 * Async now so the Payload query that replaces it is not a signature change.
 */
export async function getFoundingFathers(): Promise<FoundingFathers> {
  return Promise.resolve(foundingFathers);
}
