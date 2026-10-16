import aboutJson from '@/content/about.json';
import type { AboutPage } from '@/types/about';
import { fromJson } from '@/lib/validation/json-content';

const about = fromJson<AboutPage>(aboutJson);

/**
 * "About" landing page repository — the same seam as `services/homepage`.
 * Async now so the Payload query that replaces it is not a signature change.
 */
export async function getAboutPage(): Promise<AboutPage> {
  return Promise.resolve(about);
}
