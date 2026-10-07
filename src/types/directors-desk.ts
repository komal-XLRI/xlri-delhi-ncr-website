/**
 * "From the Director's Desk" content shape.
 *
 * Lives in `types/` for the same reason the homepage shapes do: the feature that
 * renders it may not import `content/`, so the shape has to sit below both.
 */

export interface DirectorPortrait {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  /** The portrait is the subject of the page, so it is never decorative. */
  readonly alt: string;
}

/**
 * One of the four hallmarks of Jesuit education.
 *
 * Kept as data rather than as bold runs inside an HTML string, so the CMS can
 * hold it as fields and the page decides how the title is set.
 */
export interface DirectorHallmark {
  readonly id: string;
  readonly title: string;
  /** Text after the dash in the source title, e.g. "The Spirit of Magis". */
  readonly subtitle?: string;
  readonly body: string;
}

export interface DirectorsDesk {
  readonly title: string;
  readonly director: {
    readonly name: string;
    readonly designation: string;
    readonly portrait: DirectorPortrait;
  };
  readonly message: {
    readonly heading: string;
    /** Paragraphs before the hallmarks. */
    readonly opening: readonly string[];
    readonly hallmarks: readonly DirectorHallmark[];
    /** Paragraphs after the hallmarks. */
    readonly closing: readonly string[];
    /** The final call to the reader, set apart as a pull line. */
    readonly invitation: string;
    readonly signOff: string;
  };
  readonly biography: {
    readonly heading: string;
    readonly paragraphs: readonly string[];
  };
}
