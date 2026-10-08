/**
 * Placements page shapes. In `types/` so the features can describe their
 * props without importing `content/` (§7).
 */

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
  readonly final: readonly PlacementDocument[];
  readonly summer: readonly PlacementDocument[];
}

export interface PlacementsOverview {
  readonly title: string;
  readonly intro: string;
  readonly recruitersIntro: string;
  readonly image: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
  };
}
