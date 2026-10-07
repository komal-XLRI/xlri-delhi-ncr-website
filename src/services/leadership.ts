import { leadership } from '@/content/leadership';
import type { Leadership } from '@/types/leadership';

/**
 * "Leadership & Administration" repository — the same seam as
 * `services/homepage`. Async now so the Payload query that replaces it is not a
 * signature change.
 */
export async function getLeadership(): Promise<Leadership> {
  return Promise.resolve(leadership);
}
