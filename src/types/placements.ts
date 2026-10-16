/**
 * Placements page shapes. In `types/` so the features can describe their
 * props without importing `content/` (§7).
 */

import type { PageBreadcrumb, PageMeta } from './page-copy';

export type PlacementSeason = 'final' | 'summer';

export interface PlacementStat {
  readonly id: string;
  /** The figure as displayed, currency sign included: "₹29". */
  readonly value: string;
  /** The unit after the figure: "LPA", "LPM", "%". */
  readonly unit?: string;
  readonly label: string;
}

export interface PlacementReport {
  readonly meta: PageMeta;
  /** The trail after “Home”: the section, then this page. */
  readonly breadcrumb: PageBreadcrumb;
  readonly season: PlacementSeason;
  readonly eyebrow: string;
  readonly title: string;
  readonly batch: string;
  /** Verbatim; `**…**` marks text set in bold. */
  readonly intro: readonly string[];
  readonly quote: {
    readonly text: string;
    readonly name: string;
    readonly role: string;
  };
  /** Four figures from the text, for the stats strip and the overview. */
  readonly headline: readonly PlacementStat[];
  /** Verbatim; `**…**` marks text set in bold. */
  readonly highlights: {
    readonly heading: string;
    readonly items: readonly string[];
  };
  readonly recruiters: {
    readonly heading: string;
    readonly names: readonly string[];
  };
  readonly sectors: {
    readonly heading: string;
    readonly intro?: string;
    readonly items: readonly {
      readonly id: string;
      readonly name: string;
      readonly text: string;
    }[];
  };
  readonly image?: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
  };
  readonly document?: {
    readonly label: string;
    readonly href: string;
    readonly meta: string;
    /** The tile's short mark. */
    readonly badge: string;
    /** The small line above the action. */
    readonly kicker: string;
    readonly action: string;
  };
  /** The closing band: this season's PDFs and the links under them. */
  readonly documentsSection: {
    readonly heading: string;
    /** The action on each PDF tile. */
    readonly viewPdfLabel: string;
    /** Link to the other season's report. */
    readonly otherSeasonLabel: string;
    /** Link to `more`. */
    readonly moreLabel: string;
  };
  /** The same season's page on the Jamshedpur site. */
  readonly more: string;
}

export interface PlacementDocument {
  readonly id: string;
  readonly title: string;
  readonly kind: 'report' | 'audit';
  /** The last year the document covers, for sorting. */
  readonly year: number;
  readonly href: string;
  /** Hosted on this site rather than XLRI's media library. */
  readonly local?: boolean;
}

export interface PlacementsArchive {
  readonly meta: PageMeta;
  /** The trail after “Home”: the section, then this page. */
  readonly breadcrumb: PageBreadcrumb;
  readonly eyebrow: string;
  readonly title: string;
  /** `{count}` becomes the number of documents. */
  readonly intro: string;
  readonly seasonHeadings: Readonly<Record<PlacementSeason, string>>;
  /** Link to each season's page on the Jamshedpur site. */
  readonly moreLabel: string;
  /** The action on each PDF tile. */
  readonly viewPdfLabel: string;
  readonly final: readonly PlacementDocument[];
  readonly summer: readonly PlacementDocument[];
}

export interface PlacementsOverview {
  readonly meta: PageMeta;
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly image: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
  };
  readonly reportsHeading: string;
  /** The action on each season's card. */
  readonly readReportLabel: string;
  readonly recruitersHeading: string;
  readonly recruitersIntro: string;
  readonly documentsHeading: string;
  /** Link to the archive; `{count}` becomes the number of documents. */
  readonly allDocumentsLabel: string;
  /** The action on each PDF tile. */
  readonly viewPdfLabel: string;
}
