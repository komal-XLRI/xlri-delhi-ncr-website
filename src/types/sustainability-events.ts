/**
 * Sustainability › Events page shape. In `types/` so the feature can describe
 * its props without importing `content/` (§7).
 */

import type { PageBreadcrumb, PageMeta } from './page-copy';

export interface Oration {
  /** Unique within the page — the React key and the anchor id. */
  readonly id: string;
  /** ISO date (YYYY-MM-DD) when the source gives the day; otherwise only `year` is known. */
  readonly date?: string;
  readonly year: string;
  /** The oration's title, without quotation marks. Absent when it was not recorded. */
  readonly title?: string;
  readonly speaker: string;
  /** One or two sentences on the speaker. */
  readonly bio: string;
}

export interface OrationSeries {
  readonly id: string;
  readonly name: string;
  /** For the jump links in the hero. */
  readonly shortName: string;
  readonly summary: string;
  /** Newest first. */
  readonly orations: readonly Oration[];
}

export interface SustainabilityEventsPage {
  readonly meta: PageMeta;
  readonly breadcrumb: PageBreadcrumb;
  /** The kicker above the title. */
  readonly eyebrow: string;
  readonly title: string;
  /**
   * Labels for the figures beside the title, which are counted from the
   * series; `{speaker}` in `first` is the first oration's speaker.
   */
  readonly facts: { readonly total: string; readonly series: string; readonly first: string };
  /** A series' kicker: "Since {year} · {count} orations". */
  readonly labels: { readonly since: string; readonly count: string };
  readonly series: readonly OrationSeries[];
}
