/**
 * Academic programme page shape. Written for PGDM BM; PGDM IEV and later
 * programmes reuse it. In `types/` so the feature can describe its props
 * without importing `content/` (§7).
 */

import type { PageBreadcrumb, PageMeta } from './page-copy';

export interface ProgrammeArea {
  readonly id: string;
  readonly name: string;
  readonly courses: readonly string[];
}

export interface ProgrammePage {
  readonly meta: PageMeta;
  /** The trail after “Home”: the section, then this page. */
  readonly breadcrumb: PageBreadcrumb;
  readonly school: string;
  readonly shortName: string;
  readonly title: string;
  readonly intro: string;
  readonly image: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
  };
  readonly facts: readonly {
    readonly id: string;
    readonly value: string;
    readonly label: string;
  }[];
  readonly actions: {
    readonly courses: {
      readonly label: string;
      readonly href: string;
      readonly meta: string;
      /** Link text where the notes point to the document. */
      readonly documentLabel: string;
    };
    readonly moreInfo: { readonly label: string; readonly href: string };
  };
  readonly curriculum: { readonly eyebrow: string; readonly text: string };
  readonly design: {
    readonly heading: string;
    readonly areas: readonly ProgrammeArea[];
    /** Shown on an area with no courses listed, before the document link. */
    readonly emptyAreaNote: string;
    /** Under the grid, before the document link. */
    readonly outlinesNote: string;
  };
  readonly related: {
    readonly heading: string;
    readonly items: readonly {
      readonly id: string;
      readonly school: string;
      readonly name: string;
      readonly href: string;
    }[];
  };
}
