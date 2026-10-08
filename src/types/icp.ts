/**
 * Executive Education › In-Company Programmes page shape. In `types/` so the
 * feature can describe its props without importing `content/` (§7).
 */

export type IcpSector = 'industry' | 'government';

export interface IcpPage {
  readonly eyebrow: string;
  readonly title: string;
  readonly abbreviation: string;
  readonly summary: string;
  readonly image: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
  };
  readonly clients: readonly {
    readonly id: string;
    readonly name: string;
    readonly sector: IcpSector;
  }[];
  readonly programmes: {
    readonly heading: string;
    readonly items: readonly {
      readonly id: string;
      readonly title: string;
      /** The line under the title on the Delhi page, verbatim. */
      readonly audience: string;
      /** References an entry in `clients`. */
      readonly client: string;
      /** Hours, batches or participants, where the Delhi page gives them. */
      readonly details: readonly string[];
    }[];
  };
  readonly related: readonly {
    readonly id: string;
    readonly label: string;
    readonly text: string;
    readonly href: string;
  }[];
  readonly contact: {
    readonly heading: string;
    readonly text: string;
    readonly phone: string;
    readonly email: string;
  };
}
