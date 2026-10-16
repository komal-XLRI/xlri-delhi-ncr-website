import policiesJson from '@/content/policies.json';
import { fromJson } from '@/lib/validation/json-content';
import type { Policies, PolicyId, ResolvedPolicyPage } from '@/types/policies';

const stored = fromJson<Policies>(policiesJson);

/**
 * Website policies repository — Privacy, Terms & Conditions, Help
 * and the Sitemap's copy, from `content/policies.json`.
 */
export async function getPolicy(id: PolicyId): Promise<ResolvedPolicyPage> {
  const { eyebrow, updatedLabel, tocHeading, emptyNote, contact, pages } = stored;
  return Promise.resolve({ ...pages[id], eyebrow, updatedLabel, tocHeading, emptyNote, contact });
}

export async function getSitemapCopy(): Promise<Policies['sitemap']> {
  return Promise.resolve(stored.sitemap);
}
