/**
 * "Accreditation" content shape. In `types/` so the feature can describe its
 * props without importing `content/` (§7).
 */

export interface AccreditationImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface Accreditation {
  readonly id: string;
  /** Short name, e.g. "AMBA". */
  readonly name: string;
  /** The body's full name. */
  readonly body: string;
  /** What was accredited, as the certificate words it. */
  readonly scope: string;
  readonly awarded: string;
  /** The awarding body's own description, from the certificate. */
  readonly statement: string;
  readonly mark: AccreditationImage;
  readonly certificate: AccreditationImage;
}

export interface AccreditationPage {
  readonly title: string;
  readonly banner: AccreditationImage;
  readonly intro: string;
  readonly international: {
    readonly heading: string;
    readonly items: readonly Accreditation[];
  };
}
