import { mandatoryDisclosure } from '@/content/mandatory-disclosure';
import type { MandatoryDisclosure } from '@/types/mandatory-disclosure';

/**
 * "Mandatory Disclosure" repository — the same seam as `services/homepage`.
 * Async now so the Payload query that replaces it is not a signature change.
 */
export async function getMandatoryDisclosure(): Promise<MandatoryDisclosure> {
  return Promise.resolve(mandatoryDisclosure);
}
