/**
 * Sustainability › Research Publications & Cases page shape. In `types/` so
 * the feature can describe its props without importing `content/` (§7).
 */

import type { PageBreadcrumb, PageMeta } from './page-copy';
import type { PublicationListLabels, PublicationPeriod } from './publications';

export type { Publication, PublicationPeriod } from './publications';

export interface TeachingCase {
  readonly id: string;
  readonly author: string;
  readonly title: string;
  /** The case number or volume, as the publisher gives it. */
  readonly reference: string;
  readonly publisher: string;
  readonly date?: string;
  readonly doi?: string;
}

export interface ResearchPublicationsPage {
  readonly meta: PageMeta;
  readonly breadcrumb: PageBreadcrumb;
  /** The kicker above the title. */
  readonly eyebrow: string;
  readonly title: string;
  readonly contactEmail: string;
  /** Before the address on the contact link. */
  readonly contactLabel: string;
  /** Labels for the figures beside the title, which are counted from the lists. */
  readonly facts: {
    readonly publications: string;
    readonly cases: string;
    readonly span: string;
  };
  /** The two halves of the page; each heading is also its jump link in the hero. */
  readonly sections: {
    readonly publications: { readonly heading: string; readonly list: PublicationListLabels };
    readonly cases: {
      readonly heading: string;
      /** The tag on every case card. */
      readonly tag: string;
      readonly doi: string;
    };
  };
  /** Newest period first. */
  readonly periods: readonly PublicationPeriod[];
  readonly cases: readonly TeachingCase[];
}
