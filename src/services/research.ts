import publicationsJson from '@/content/research/publications.json';
import { parseFacultyPublications } from '@/lib/validation/publications';
import type { FacultyPublicationsPage } from '@/types/publications';

/**
 * Research repository. The faculty publication list lives as JSON in
 * `content/research/`, validated on load. Async so the CMS query that
 * replaces it is not a signature change.
 */
const publications = parseFacultyPublications(
  publicationsJson,
  'content/research/publications.json',
);

/** Faculty research articles and cases, by academic year. */
export async function getFacultyPublications(): Promise<FacultyPublicationsPage> {
  return Promise.resolve(publications);
}
