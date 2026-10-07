import { accreditation } from '@/content/accreditation';
import type { AccreditationPage } from '@/types/accreditation';

/**
 * "Accreditation" repository — the same seam as `services/homepage`.
 * Async now so the Payload query that replaces it is not a signature change.
 */
export async function getAccreditation(): Promise<AccreditationPage> {
  return Promise.resolve(accreditation);
}
