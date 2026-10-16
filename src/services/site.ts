import siteJson from '@/content/site.json';
import type { FooterCopy, HeaderCopy, NotFoundCopy, SearchCopy, SiteCopy } from '@/types/site';
import { fromJson } from '@/lib/validation/json-content';

const copy = fromJson<SiteCopy>(siteJson);

/**
 * Site-wide copy repository — header, footer, search panel and 404 page.
 *
 * `async` for the same reason as the homepage repository: the CMS version will
 * be, and callers awaiting now means that swap is not a signature change.
 */
export async function getHeaderCopy(): Promise<HeaderCopy> {
  return Promise.resolve(copy.header);
}

export async function getFooterCopy(): Promise<FooterCopy> {
  return Promise.resolve(copy.footer);
}

export async function getSearchCopy(): Promise<SearchCopy> {
  return Promise.resolve(copy.search);
}

export async function getNotFoundCopy(): Promise<NotFoundCopy> {
  return Promise.resolve(copy.notFound);
}
