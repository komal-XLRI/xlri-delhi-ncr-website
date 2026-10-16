import accreditationJson from '@/content/accreditation.json';
import type { AccreditationPage } from '@/types/accreditation';
import { fromJson } from '@/lib/validation/json-content';

const accreditation = fromJson<AccreditationPage>(accreditationJson);

/**
 * "Accreditation" repository — the same seam as `services/homepage`.
 * Async now so the Payload query that replaces it is not a signature change.
 */
export async function getAccreditation(): Promise<AccreditationPage> {
  return Promise.resolve(accreditation);
}
