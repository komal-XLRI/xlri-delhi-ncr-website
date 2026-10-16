/**
 * Executive Education › Management Development Programmes page shape. In
 * `types/` so the feature can describe its props without importing
 * `content/` (§7).
 */

import type { PageBreadcrumb, PageMeta } from './page-copy';

export interface MdpPage {
  /** The page's `<title>`, description and share image. */
  readonly meta: PageMeta;
  /** The trail after “Home”: the section, then this page. */
  readonly breadcrumb: PageBreadcrumb;
  readonly eyebrow: string;
  readonly title: string;
  readonly abbreviation: string;
  readonly tagline: string;
  readonly refresh: string;
  /** The hero's second button, which jumps to the contact block. */
  readonly contactLinkLabel: string;
  readonly image: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
  };
  readonly overview: {
    readonly heading: string;
    readonly text: string;
    readonly pillars: readonly {
      readonly id: string;
      readonly title: string;
      readonly text: string;
    }[];
  };
  readonly calendar: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly label: string;
    readonly href: string;
    readonly meta: string;
    readonly downloadLabel: string;
    readonly note: string;
    readonly facts: readonly {
      readonly id: string;
      readonly value: string;
      readonly label: string;
    }[];
    readonly venuesHeading: string;
    /** The word after each venue's programme count. */
    readonly venueCountLabels: { readonly one: string; readonly other: string };
    readonly venues: readonly {
      readonly id: string;
      readonly name: string;
      readonly count: number;
    }[];
  };
  readonly stay: {
    readonly heading: string;
    readonly intro: string;
    readonly rates: readonly {
      readonly id: string;
      readonly label: string;
      readonly value: string;
      readonly note: string;
    }[];
    readonly rules: readonly string[];
    readonly taxNoteLabel: string;
    readonly taxNote: string;
  };
  readonly discounts: {
    readonly heading: string;
    /** Between each tier's discount and its participant count. */
    readonly tierText: string;
    readonly tiers: readonly {
      readonly id: string;
      readonly participants: string;
      readonly discount: string;
    }[];
  };
  readonly contact: {
    readonly heading: string;
    readonly phoneLabel: string;
    readonly phone: string;
    readonly emailLabel: string;
    readonly email: string;
    readonly websiteLabel: string;
    readonly website: string;
  };
}
