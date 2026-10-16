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

export interface FooterLink {
  readonly label: string;
  readonly href: string;
}

export interface FooterLinkGroup {
  readonly heading: string;
  readonly links: readonly FooterLink[];
}

export type SocialNetwork = 'linkedin' | 'instagram' | 'youtube' | 'facebook' | 'x';

export interface FooterCopy {
  /** Under the logo, which carries no campus of its own: "Delhi-NCR Campus". */
  readonly campusLabel: string;
  /** Under the name, beside the "Visit the campus" panel. */
  readonly description: string;
  /** Link to the parent institute, in the bottom bar. */
  readonly instituteLinkLabel: string;
  /** The "Visit the campus" panel at the top of the footer. */
  readonly visit: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly tourLabel: string;
    readonly tourHref: string;
    /** Uses `contact.directionsHref`. */
    readonly directionsLabel: string;
  };
  readonly quickLinks: FooterLinkGroup;
  readonly usefulLinks: FooterLinkGroup;
  /** Heading above the audience links ("For" students, alumni …), from `config/navigation.json`. */
  readonly audienceHeading: string;
  readonly contact: {
    readonly heading: string;
    readonly phone: string;
    readonly email: string;
    /** One line each. */
    readonly address: readonly string[];
    /** A map link to the campus. */
    readonly directionsHref: string;
    readonly followHeading: string;
    readonly social: readonly {
      readonly network: SocialNetwork;
      /** The network's name, read out by screen readers. */
      readonly label: string;
      readonly href: string;
    }[];
  };
  /** The bottom bar's notice: "Copyright @ {year}, XLRI. All rights reserved." */
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
