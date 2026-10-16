import heritageJson from '@/content/heritage.json';
import type { Heritage } from '@/types/heritage';
import { fromJson } from '@/lib/validation/json-content';

const heritage = fromJson<Heritage>(heritageJson);

/**
 * "Heritage" repository — the same seam as `services/homepage`.
 * Async now so the Payload query that replaces it is not a signature change.
 */
export async function getHeritage(): Promise<Heritage> {
  return Promise.resolve(heritage);
}
