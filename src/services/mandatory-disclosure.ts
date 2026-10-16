import mandatoryDisclosureJson from '@/content/mandatory-disclosure.json';
import type { MandatoryDisclosure } from '@/types/mandatory-disclosure';
import { fromJson } from '@/lib/validation/json-content';

const mandatoryDisclosure = fromJson<MandatoryDisclosure>(mandatoryDisclosureJson);

/**
 * "Mandatory Disclosure" repository — the same seam as `services/homepage`.
 * Async now so the Payload query that replaces it is not a signature change.
 */
export async function getMandatoryDisclosure(): Promise<MandatoryDisclosure> {
  return Promise.resolve(mandatoryDisclosure);
}
