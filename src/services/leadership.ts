import leadershipJson from '@/content/leadership.json';
import type { Leadership } from '@/types/leadership';
import { fromJson } from '@/lib/validation/json-content';

const leadership = fromJson<Leadership>(leadershipJson);

/**
 * "Leadership & Administration" repository — the same seam as
 * `services/homepage`. Async now so the Payload query that replaces it is not a
 * signature change.
 */
export async function getLeadership(): Promise<Leadership> {
  return Promise.resolve(leadership);
}
