/**
 * "Heritage" content shape. In `types/` so the feature can describe its props
 * without importing `content/` (§7).
 */

export interface HeritageImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface TimelineEntry {
  readonly id: string;
  readonly year: string;
  readonly title: string;
  readonly body: string;
  /** Archive photograph. Entries without one render as text only. */
  readonly image?: HeritageImage;
}

export interface Heritage {
  readonly title: string;
  readonly founding: {
    /** The one-line fact, set in the green-ruled callout. */
    readonly lead: string;
    readonly body: string;
  };
  readonly founder: {
    readonly name: string;
    readonly role: string;
    readonly portrait: HeritageImage;
  };
  readonly film: {
    readonly youtubeId: string;
    readonly title: string;
    /** Self-hosted copy of the YouTube thumbnail — no third-party request until play. */
    readonly poster: HeritageImage;
  };
  /** Body copy, split into the two columns below the film. */
  readonly story: {
    readonly left: readonly string[];
    readonly right: readonly string[];
  };
  readonly timeline: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly intro: string;
    readonly entries: readonly TimelineEntry[];
  };
}
