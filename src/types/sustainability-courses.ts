/**
 * Sustainability › Courses page shape. In `types/` so the feature can describe
 * its props without importing `content/` (§7).
 */

import type { PageBreadcrumb, PageMeta } from './page-copy';

export interface SustainabilityGoal {
  /** The UN Sustainable Development Goal's number, 1–17. */
  readonly goal: number;
  readonly label: string;
}

export interface SustainabilityCourse {
  /** Unique — the React key and the anchor id. */
  readonly id: string;
  readonly name: string;
  /** The year it was first offered, when the source gives one. */
  readonly since?: string;
  /** A core (compulsory) course rather than an elective. */
  readonly core?: boolean;
  /** Paragraphs, in order. */
  readonly body: readonly string[];
  /** The SDGs the course addresses, when it lists them. */
  readonly sdgs?: readonly SustainabilityGoal[];
}

export interface SustainabilityCoursesPage {
  readonly meta: PageMeta;
  readonly breadcrumb: PageBreadcrumb;
  /** The kicker above the title. */
  readonly eyebrow: string;
  readonly title: string;
  /** The headline figures beside the title. */
  readonly facts: readonly { readonly value: string; readonly label: string }[];
  /** The tags on a course card; `{year}` in `since` is the course's `since`. */
  readonly labels: { readonly coreCourse: string; readonly since: string };
  readonly courses: readonly SustainabilityCourse[];
}
