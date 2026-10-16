/**
 * Executive Education › EMDP page shape. In `types/` so the feature can
 * describe its props without importing `content/` (§7).
 */

import type { PageBreadcrumb, PageMeta } from './page-copy';

export type EmdpStatus = 'upcoming' | 'ongoing';

export interface EmdpProgramme {
  readonly id: string;
  readonly status: EmdpStatus;
  readonly title: string;
  /** "Batch 8", "Cohort 5" — set apart from the title so titles stay comparable. */
  readonly batch?: string;
  /** A line under the title, where the Delhi page gives one (partner degrees). */
  readonly note?: string;
  readonly details: readonly { readonly label: string; readonly value: string }[];
  readonly poster: { readonly src: string; readonly width: number; readonly height: number };
  readonly knowMore: string;
  readonly apply?: string;
  readonly pay?: string;
}

/** Labels on each programme card. */
export interface EmdpCardLabels {
  /** The badge on an upcoming programme. */
  readonly admissionsOpen: string;
  readonly apply: string;
  readonly pay: string;
  readonly knowMore: string;
}

export interface EmdpPage {
  /** The page's `<title>`, description and share image. */
  readonly meta: PageMeta;
  /** The trail after “Home”: the section, then this page. */
  readonly breadcrumb: PageBreadcrumb;
  readonly eyebrow: string;
  readonly title: string;
  readonly expansion: string;
  readonly intro: string;
  /** The button that jumps to the programme list. */
  readonly exploreLabel: string;
  /** Words after the live counts under the introduction. */
  readonly countLabels: Readonly<Record<EmdpStatus, string>>;
  readonly offeringsHeading: string;
  readonly offerings: readonly {
    readonly id: string;
    readonly title: string;
    readonly text: string;
  }[];
  readonly programmesHeading: string;
  /** Tab labels for the programme list. */
  readonly tabs: Readonly<Record<EmdpStatus, string>>;
  readonly cardLabels: EmdpCardLabels;
  readonly programmes: readonly EmdpProgramme[];
}
