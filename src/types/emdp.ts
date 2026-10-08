/**
 * Executive Education › EMDP page shape. In `types/` so the feature can
 * describe its props without importing `content/` (§7).
 */

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

export interface EmdpPage {
  readonly eyebrow: string;
  readonly title: string;
  readonly expansion: string;
  readonly intro: string;
  readonly offerings: readonly {
    readonly id: string;
    readonly title: string;
    readonly text: string;
  }[];
  readonly programmes: readonly EmdpProgramme[];
}
