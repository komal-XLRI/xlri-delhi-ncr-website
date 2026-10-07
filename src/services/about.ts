import { about } from '@/content/about';
import type { AboutPage } from '@/types/about';

/**
 * "About" landing page repository — the same seam as `services/homepage`.
 * Async now so the Payload query that replaces it is not a signature change.
 */
export async function getAboutPage(): Promise<AboutPage> {
  return Promise.resolve(about);
}
