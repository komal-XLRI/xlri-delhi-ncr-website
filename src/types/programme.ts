/**
 * Academic programme page shape. Written for PGDM BM; PGDM IEV and later
 * programmes reuse it. In `types/` so the feature can describe its props
 * without importing `content/` (§7).
 */

export interface ProgrammeArea {
  readonly id: string;
  readonly name: string;
  readonly courses: readonly string[];
}

export interface ProgrammePage {
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
    readonly courses: { readonly label: string; readonly href: string; readonly meta: string };
    readonly moreInfo: { readonly label: string; readonly href: string };
  };
  readonly curriculum: string;
  readonly design: { readonly heading: string; readonly areas: readonly ProgrammeArea[] };
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
