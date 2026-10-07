/**
 * "About" landing page content shape. In `types/` so the feature can describe
 * its props without importing `content/` (§7).
 */

export interface AboutImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

/** The small marks on the intro cards. Names, not components — see `features/`. */
export type AboutIcon = 'landmark' | 'compass' | 'seal' | 'book';

export interface AboutIntroCard {
  readonly id: string;
  readonly icon: AboutIcon;
  readonly title: string;
  readonly body: string;
  readonly href: string;
}

export interface AboutImageCard {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly image: AboutImage;
}

export interface AboutLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export interface AboutPage {
  readonly hero: {
    readonly title: string;
    readonly lead: string;
    readonly banner: AboutImage;
  };
  readonly intro: {
    readonly heading: string;
    readonly cards: readonly AboutIntroCard[];
  };
  readonly explore: {
    readonly heading: string;
    readonly body: string;
    readonly cards: readonly AboutImageCard[];
  };
  readonly campus: {
    readonly heading: string;
    readonly paragraphs: readonly string[];
    readonly image: AboutImage;
    readonly links: readonly AboutLink[];
  };
}
