/**
 * The XLRI Centre for Healthcare Management page.
 *
 * Its own shape: the Delhi page is an argument (the ecosystem, the vision and
 * mission, what the Centre does, who it works with) rather than CGEIL's
 * people-and-news page or INDEA's milestones. In `types/` so the feature can
 * describe its props without importing `content/` (§7).
 */

export interface HealthcarePhoto {
  readonly id: string;
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  /** The institution the photograph records — the Delhi page's caption. */
  readonly caption: string;
}

export type HealthcareActivityIcon = 'academic' | 'executive' | 'skills' | 'research';

export interface HealthcareCentre {
  readonly shortName: string;
  readonly title: string;
  readonly lead: string;
  /** Hero mosaic: the first is the large tile. */
  readonly photos: readonly HealthcarePhoto[];
  readonly about: {
    readonly heading: string;
    readonly paragraphs: readonly string[];
    readonly ecosystem: {
      readonly heading: string;
      readonly traditional: { readonly label: string; readonly items: readonly string[] };
      readonly growing: { readonly label: string; readonly items: readonly string[] };
    };
  };
  readonly vision: { readonly heading: string; readonly paragraphs: readonly string[] };
  readonly mission: { readonly heading: string; readonly paragraphs: readonly string[] };
  readonly activities: {
    readonly heading: string;
    readonly intro: string;
    readonly items: readonly {
      readonly id: string;
      readonly icon: HealthcareActivityIcon;
      readonly label: string;
    }[];
  };
  readonly collaborations: {
    readonly heading: string;
    readonly intro: string;
    readonly items: readonly {
      readonly id: string;
      readonly name: string;
      readonly href: string;
    }[];
  };
  readonly upcoming: {
    readonly heading: string;
    readonly paragraphs: readonly string[];
    readonly comingSoon: { readonly label: string; readonly text: string };
  };
}
