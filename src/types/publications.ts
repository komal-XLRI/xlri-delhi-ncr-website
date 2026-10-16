import type { PageBreadcrumb, PageMeta } from './page-copy';

/**
 * A citation list grouped into periods — shared by Faculty & Research ›
 * Publication and Sustainability › Research Publications & Cases.
 */

export interface Publication {
  /** Unique — the React key. */
  readonly id: string;
  /** As cited: "Banerjee, Ameet Kumar; Boubaker, Sabri". */
  readonly authors: string;
  readonly year: string;
  readonly title: string;
  /** Journal or book, with volume and pages, as cited. */
  readonly source?: string;
  /** The bare DOI, e.g. "10.1016/j.frl.2024.105148" — linked through doi.org. */
  readonly doi?: string;
  readonly isbn?: string;
}

export interface PublicationPeriod {
  /** "2024-2025" — the filter's value. */
  readonly id: string;
  /** "2024–2025" — what the filter and heading show. */
  readonly label: string;
  readonly publications: readonly Publication[];
}

/**
 * The words of the shared publication list. `{shown}` and `{total}` in
 * `showing`, and `{isbn}` in `isbn`, are filled in by the list.
 */
export interface PublicationListLabels {
  /** The period filter's first chip. */
  readonly allYears: string;
  readonly searchPlaceholder: string;
  /** "Showing {shown} of {total} publications". */
  readonly showing: string;
  readonly clearFilters: string;
  /** Shown when the filters match nothing. */
  readonly noMatch: string;
  /** The DOI link's label. */
  readonly doi: string;
  /** "ISBN {isbn}", shown when there is no DOI. */
  readonly isbn: string;
}

/** Faculty & Research › Publication – Research Articles & Cases. */
export interface FacultyPublicationsPage {
  readonly meta: PageMeta;
  readonly breadcrumb: PageBreadcrumb;
  /** The kicker above the title. */
  readonly eyebrow: string;
  readonly title: string;
  /** Labels for the figures beside the title; `{period}` in `latest` is the newest period. */
  readonly facts: { readonly total: string; readonly years: string; readonly latest: string };
  readonly list: PublicationListLabels;
  /** Academic years, newest first. */
  readonly periods: readonly PublicationPeriod[];
}
