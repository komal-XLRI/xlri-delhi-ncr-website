/**
 * Centre of Excellence page shape. Written for the Centre for Gender Equality
 * & Inclusive Leadership first, but deliberately generic — the other centres in
 * the navigation have the same anatomy (introduction, purpose, activity,
 * people) and should reuse it rather than grow their own types.
 *
 * In `types/` so the feature can describe its props without importing
 * `content/` (§7).
 */

export interface CentreImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

/** A biography is prose, sometimes with a list in it — so it is blocks, not a string. */
export type BiographyBlock =
  | { readonly type: 'p'; readonly text: string }
  | { readonly type: 'list'; readonly items: readonly string[] };

export interface CentrePerson {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly portrait: { readonly src: string; readonly width: number; readonly height: number };
  readonly biography: readonly BiographyBlock[];
}

export interface CentreFact {
  readonly id: string;
  readonly value: string;
  readonly label: string;
}

export type CentreAreaIcon = 'research' | 'teaching' | 'field';

export interface CentreArea {
  readonly id: string;
  readonly icon: CentreAreaIcon;
  readonly title: string;
  readonly points: readonly string[];
}

export interface CentreNewsItem {
  readonly id: string;
  readonly title: string;
  readonly image: { readonly src: string; readonly width: number; readonly height: number };
  /**
   * `contain` for posters and collages, whose text or panels run to the edge
   * and would be cut by a crop. Photographs are cropped to fill (`cover`).
   */
  readonly fit?: 'contain';
}

export interface Centre {
  readonly shortName: string;
  readonly title: string;
  readonly lead: string;
  readonly heroImage: CentreImage;
  readonly about: {
    readonly why: { readonly heading: string; readonly body: string };
    readonly focus: { readonly heading: string; readonly body: string };
    readonly facts: readonly CentreFact[];
  };
  readonly purpose: {
    readonly heading: string;
    readonly intro: string;
    readonly areas: readonly CentreArea[];
  };
  readonly news: {
    readonly heading: string;
    readonly items: readonly CentreNewsItem[];
  };
  readonly structure: {
    readonly heading: string;
    readonly paragraphs: readonly string[];
  };
  readonly chairperson: {
    readonly heading: string;
    readonly person: CentrePerson;
  };
  readonly advisors: {
    readonly heading: string;
    readonly people: readonly CentrePerson[];
  };
}

/**
 * A centre whose Delhi page is an introduction only — no programme, people or
 * news of its own yet (the Centre for Public Policy and Public Affairs). Kept
 * separate from `Centre` rather than making every section of that type
 * optional: a page with nothing to show in five sections is a different page,
 * not the same page with holes in it.
 */
export interface CentreBrief {
  readonly shortName: string;
  readonly title: string;
  readonly image: CentreImage;
  /** CSS `object-position` for the banner crop, e.g. `center 62%`. */
  readonly imagePosition?: string;
  readonly paragraphs: readonly string[];
  /** Facts the paragraphs state, lifted out beside them. */
  readonly facts: readonly CentreFact[];
  readonly related: {
    readonly heading: string;
    readonly items: readonly {
      readonly id: string;
      readonly label: string;
      readonly href: string;
    }[];
  };
}
