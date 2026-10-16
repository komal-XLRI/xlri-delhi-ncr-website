/**
 * Sustainability › History page shape. In `types/` so the feature can describe
 * its props without importing `content/` (§7).
 */

import type { PageBreadcrumb, PageMeta } from './page-copy';

export interface SustainabilityMilestone {
  /** Unique — the React key and the anchor id. */
  readonly id: string;
  /** Four digits. Several milestones can share a year; the page groups them. */
  readonly year: string;
  readonly title: string;
  /** Paragraphs, in order. */
  readonly body: readonly string[];
}

export interface SustainabilityFact {
  readonly value: string;
  readonly label: string;
}

export interface SustainabilityHistoryPage {
  readonly meta: PageMeta;
  readonly breadcrumb: PageBreadcrumb;
  /** The kicker above the title. */
  readonly eyebrow: string;
  readonly title: string;
  /** The headline figures beside the title. */
  readonly facts: readonly SustainabilityFact[];
  /** In date order, oldest first. */
  readonly milestones: readonly SustainabilityMilestone[];
  /** The closing line and the link on to the Team page. */
  readonly onward: { readonly text: string; readonly linkLabel: string };
}
