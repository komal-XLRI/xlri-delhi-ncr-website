/**
 * Sustainability › Rural Immersion page shape. In `types/` so the feature can
 * describe its props without importing `content/` (§7).
 */

import type { PageBreadcrumb, PageMeta } from './page-copy';

export interface RuralImmersionList {
  readonly heading: string;
  readonly items: readonly string[];
}

export interface RuralImmersionPage {
  readonly meta: PageMeta;
  readonly breadcrumb: PageBreadcrumb;
  /** The kicker above the title. */
  readonly eyebrow: string;
  readonly title: string;
  /** The headline figures beside the title. */
  readonly facts: readonly { readonly value: string; readonly label: string }[];
  /** The programmes the module is part of, as abbreviations. */
  /** Before the programmes: "Part of". */
  readonly programmesLabel: string;
  readonly programmes: readonly string[];
  /** The introduction's kicker and heading. */
  readonly about: { readonly eyebrow: string; readonly heading: string };
  /** Paragraphs, in order; the first is the lead. */
  readonly intro: readonly string[];
  readonly purpose: RuralImmersionList;
  readonly objectives: RuralImmersionList;
  /** The model of intervention named in the objectives, drawn as a sequence. */
  readonly model: {
    readonly eyebrow: string;
    /** `{name}` is the model's name: "The {name} model". */
    readonly heading: string;
    readonly name: string;
    readonly summary: string;
    readonly stages: readonly string[];
  };
  readonly outcomesHeading: string;
  /** The Program Learning Outcomes the module is assessed against. */
  readonly outcomes: readonly { readonly name: string; readonly parts: readonly string[] }[];
}
