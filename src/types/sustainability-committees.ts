/**
 * Sustainability › Student Committees page shape. In `types/` so the feature
 * can describe its props without importing `content/` (§7).
 */

import type { PageBreadcrumb, PageMeta } from './page-copy';

export interface CommitteeRepresentative {
  readonly name: string;
  /** "Convenor", "Treasurer", "Sr. Executive Member" — as the committee titles it. */
  readonly role: string;
}

export interface StudentCommittee {
  /** Unique — the React key and the anchor id. */
  readonly id: string;
  readonly name: string;
  /** The year it was set up, four digits. */
  readonly founded: string;
  /** Paragraphs, in order. */
  readonly body: readonly string[];
  /** In the committee's order; the first is shown as its lead. */
  readonly representatives: readonly CommitteeRepresentative[];
}

export interface StudentCommitteesPage {
  readonly meta: PageMeta;
  readonly breadcrumb: PageBreadcrumb;
  /** The kicker above the title. */
  readonly eyebrow: string;
  readonly title: string;
  /** Labels for the figures beside the title, which are counted from the committees. */
  readonly facts: { readonly committees: string; readonly people: string; readonly since: string };
  readonly labels: {
    /** A committee's kicker; `{year}` is its founding year. */
    readonly since: string;
    /** Above the roster. */
    readonly representatives: string;
  };
  readonly committees: readonly StudentCommittee[];
}
