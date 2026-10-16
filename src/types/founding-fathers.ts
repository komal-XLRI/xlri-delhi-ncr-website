import type { PageMeta } from './page-copy';

/**
 * "Jesuit Founding Fathers" content shape. In `types/` so the feature can
 * describe its props without importing `content/` (§7).
 */

export interface FoundingFather {
  readonly id: string;
  readonly name: string;
  /** Shown under the name on the card, e.g. "SJ (Founding Father of XLRI)". */
  readonly cardLabel: string;
  readonly portrait: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
  };
  /** Shown in the dialog. */
  readonly biography: string;
}

export interface FoundingFathers {
  readonly meta: PageMeta;
  readonly title: string;
  readonly subtitle: string;
  readonly intro: string;
  /** The link under each card, e.g. "Know More". */
  readonly cardLinkLabel: string;
  /** The line under the name in the dialog, e.g. "SJ". */
  readonly dialogSubtitle: string;
  readonly fathers: readonly FoundingFather[];
}
