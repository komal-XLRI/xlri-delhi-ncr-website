/**
 * Page-level copy shared by every page: what the browser tab, search results
 * and share cards show, and the breadcrumb trail above the title. Each page's
 * JSON in `content/` carries these alongside its own copy; the canonical path
 * stays in code (`routes`).
 */

/** A route's `<title>` (without the site suffix), description and share image. */
export interface PageMeta {
  readonly title: string;
  readonly description: string;
  /** Root-relative share image for Open Graph and Twitter cards; the site default without one. */
  readonly image?: string;
  readonly imageAlt?: string;
}

/** The trail after "Home": the section, then the page itself. */
export interface PageBreadcrumb {
  /** "Faculty & Research", "Sustainability" — not a link. */
  readonly section: string;
  /** The current page's crumb, e.g. "History". */
  readonly page: string;
}
