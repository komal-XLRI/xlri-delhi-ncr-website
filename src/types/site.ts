/**
 * Site-wide copy — the words in the header, footer, search panel and 404 page
 * that belong to no single page.
 *
 * The data is `content/site.json`; components receive it through
 * `services/site.ts`. Accessibility-only strings (aria-labels, screen-reader
 * text) stay in the components beside the markup they describe.
 */

export interface HeaderCopy {
  /** The label at the start of the notice ticker. */
  readonly noticesHeading: string;
  /** Badge on a notice flagged `isNew` in `config/notices.json`. */
  readonly noticeNewBadge: string;
  /** Link label on the featured card inside a mega-menu panel. */
  readonly megaMenuFeaturedActionLabel: string;
}

export interface FooterCopy {
  /** Link to the parent institute, beneath the legal name. */
  readonly instituteLinkLabel: string;
  /** Heading above the audience links ("For" students, alumni …). */
  readonly audienceHeading: string;
  /** Follows "© {site name}." in the bottom bar. */
  readonly copyright: string;
}

export interface SearchCopy {
  /** Placeholder inside the search box. */
  readonly placeholder: string;
  /** Heading above the result list. */
  readonly keySearchesHeading: string;
  /** Shown when a query matches nothing. */
  readonly noResults: string;
  /**
   * The suggestions shown before anything is typed, in order. Each is a
   * search-index id — `page:` followed by the page's path. An id that matches
   * no page is skipped.
   */
  readonly keySearches: readonly string[];
}

export interface NotFoundCopy {
  readonly eyebrow: string;
  /** The page's `h1`. */
  readonly heading: string;
  readonly intro: string;
  readonly homeActionLabel: string;
  readonly searchActionLabel: string;
  /** Heading above the list of main sections. */
  readonly sectionsHeading: string;
}

export interface SiteCopy {
  readonly header: HeaderCopy;
  readonly footer: FooterCopy;
  readonly search: SearchCopy;
  readonly notFound: NotFoundCopy;
}
