import type { PageMeta } from './page-copy';

/**
 * One EMDP programme's own page — the "Know More" page behind its card on
 * the EMDP page. Content is `content/executive-education/emdp-programmes.json`,
 * one entry per programme, keyed by the card's id in `emdp.json`.
 *
 * The live pages are not built alike — one has a syllabus, another a
 * certificate in two languages, another its faculty with biographies — so a
 * programme is an ordered list of sections, each of a kind the page knows how
 * to set, in the live page's order.
 */

export interface EmdpImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface EmdpPerson {
  /** Their Full Time Faculty id, for the photograph and profile link. */
  readonly facultyId?: string;
  readonly name: string;
  readonly designation?: string;
  readonly qualification?: string;
  readonly functionalArea?: string;
  /** For someone not on the Full Time Faculty list; `facultyId` supplies it otherwise. */
  readonly photo?: string;
  /** A short biography, where the live page gives one. */
  readonly bio?: readonly string[];
}

export type EmdpSection<Person = EmdpPerson> =
  /** Prose; `features` are titled points beneath it ("Holistic new-age curriculum"). */
  | {
      readonly kind: 'text';
      readonly heading: string;
      readonly paragraphs: readonly string[];
      readonly features?: readonly { readonly title: string; readonly text: string }[];
    }
  /** Points as ticked cards: why XLRI, who the programme is for. */
  | { readonly kind: 'checklist'; readonly heading: string; readonly points: readonly string[] }
  /** A plain list in one card: pedagogy, eligibility, technical requirements. */
  | { readonly kind: 'bullets'; readonly heading: string; readonly points: readonly string[] }
  /** The blue grid; `value` is the figure set large ("120+"), a highlight without one is a line. */
  | {
      readonly kind: 'highlights';
      readonly heading: string;
      readonly items: readonly { readonly value?: string; readonly label: string }[];
    }
  /** Fee cards, or the fee as a sentence or a list where the live page gives it so. */
  | {
      readonly kind: 'fees';
      readonly heading: string;
      readonly items?: readonly { readonly label: string; readonly value: string }[];
      readonly text?: string;
      readonly points?: readonly string[];
    }
  | {
      readonly kind: 'immersion';
      readonly heading: string;
      readonly lead?: string;
      readonly paragraphs?: readonly string[];
      readonly points?: readonly string[];
    }
  | {
      readonly kind: 'certificate';
      readonly heading: string;
      readonly text?: string;
      readonly images?: readonly EmdpImage[];
    }
  /** A blue panel: alumni status and the like. */
  | {
      readonly kind: 'panel';
      readonly heading: string;
      readonly text?: string;
      readonly points?: readonly string[];
    }
  /** A syllabus, one module to a row, opened one at a time. */
  | {
      readonly kind: 'modules';
      readonly heading: string;
      readonly modules: readonly { readonly title: string; readonly points: readonly string[] }[];
    }
  | { readonly kind: 'people'; readonly heading: string; readonly members: readonly Person[] };

/** One card in the facts column — duration, dates, class timings. */
export interface EmdpFact {
  readonly icon: 'clock' | 'calendar' | 'online';
  readonly label: string;
  /** One line each, as on the live page. */
  readonly lines: readonly string[];
  /** Shown in the hero as well, as this one line; at most two facts have one. */
  readonly headline?: string;
}

export interface StoredEmdpProgramme {
  readonly meta: PageMeta;
  readonly title: string;
  readonly batch?: string;
  /** A line under the title — "In collaboration with Sorbonne Business School, Paris". */
  readonly note?: string;
  readonly poster: EmdpImage;
  readonly sections: readonly EmdpSection[];
  readonly facts: readonly EmdpFact[];
  readonly brochure?: { readonly label: string; readonly href: string };
  /** Without `href` the application is closed, and `label` says so ("Application Closed"). */
  readonly apply?: { readonly label: string; readonly href?: string };
}

export interface EmdpProgrammeLabels {
  readonly eyebrow: string;
  readonly brochure: string;
  readonly qualification: string;
  readonly functionalArea: string;
  readonly profileLink: string;
  readonly backToEmdp: string;
}

export interface StoredEmdpProgrammes {
  readonly labels: EmdpProgrammeLabels;
  readonly programmes: Readonly<Record<string, StoredEmdpProgramme>>;
}

/** A person as the page gets them: with a profile link when they are Full Time Faculty. */
export type EmdpResolvedPerson = EmdpPerson & { readonly href?: string };

/** A programme as the page gets it. */
export interface EmdpProgramme extends Omit<StoredEmdpProgramme, 'sections'> {
  readonly id: string;
  readonly labels: EmdpProgrammeLabels;
  /** The EMDP page's breadcrumb, which this page continues. */
  readonly breadcrumb: { readonly section: string; readonly page: string };
  readonly sections: readonly EmdpSection<EmdpResolvedPerson>[];
}
