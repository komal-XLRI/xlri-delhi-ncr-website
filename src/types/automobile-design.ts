/**
 * The Indian School for Design of Automobiles (INDEA) page.
 *
 * Its own shape rather than `Centre`: INDEA is a school under construction, so
 * its page is a story of milestones (announcement, foundation stone, debate,
 * expo), an academic framework and a roll of mentors — not CGEIL's purpose,
 * board and news. In `types/` so the feature can describe its props without
 * importing `content/` (§7).
 */

export interface IndeaImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface IndeaFact {
  readonly id: string;
  readonly value: string;
  readonly label: string;
}

export interface IndeaMentor {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly href: string;
  readonly portrait: { readonly src: string; readonly width: number; readonly height: number };
}

export interface IndeaMilestone {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly image: IndeaImage;
}

export interface IndeaPressItem {
  readonly id: string;
  readonly outlet: string;
  readonly title: string;
  readonly href: string;
  /** BCP 47 tag when the headline is not in English. */
  readonly lang?: string;
}

export interface AutomobileDesignCentre {
  readonly shortName: string;
  readonly title: string;
  readonly statement: string;
  readonly logo: IndeaImage;
  readonly facts: readonly IndeaFact[];
  readonly intro: {
    readonly heading: string;
    readonly paragraphs: readonly string[];
    readonly image: IndeaImage;
  };
  readonly campus: {
    readonly heading: string;
    readonly ceremony: string;
    readonly ceremonyImage: IndeaImage;
    readonly pillar: { readonly caption: string; readonly image: IndeaImage };
    readonly paragraphs: readonly string[];
    readonly studio: { readonly text: string; readonly activities: readonly string[] };
  };
  readonly academics: {
    readonly heading: string;
    readonly intro: string;
    readonly pillars: readonly string[];
    readonly paragraphs: readonly string[];
    readonly flagship: { readonly label: string; readonly paragraphs: readonly string[] };
  };
  readonly mentors: {
    readonly heading: string;
    readonly paragraphs: readonly string[];
    readonly people: readonly IndeaMentor[];
  };
  readonly milestones: {
    readonly heading: string;
    readonly items: readonly IndeaMilestone[];
  };
  readonly press: {
    readonly heading: string;
    readonly intro: string;
    readonly items: readonly IndeaPressItem[];
  };
  readonly quote: {
    readonly paragraphs: readonly string[];
    readonly name: string;
    readonly date: string;
    readonly portrait: IndeaImage;
  };
}
