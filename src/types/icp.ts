/**
 * Executive Education › In-Company Programmes page shape. In `types/` so the
 * feature can describe its props without importing `content/` (§7).
 */

import type { PageBreadcrumb, PageMeta } from './page-copy';

export type IcpSector = 'industry' | 'government';

export interface IcpPage {
  /** The page's `<title>`, description and share image. */
  readonly meta: PageMeta;
  /** The trail after “Home”: the section, then this page. */
  readonly breadcrumb: PageBreadcrumb;
  readonly eyebrow: string;
  readonly title: string;
  readonly abbreviation: string;
  readonly summary: string;
  /** Labels under the three figures counted from the content. */
  readonly factLabels: {
    readonly programmes: string;
    readonly clients: string;
    readonly sectors: string;
  };
  readonly image: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
  };
  readonly clientsHeading: string;
  readonly sectorLabels: Readonly<Record<IcpSector, string>>;
  /** The word after each organisation's programme count. */
  readonly programmeCountLabels: { readonly one: string; readonly other: string };
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
  readonly relatedHeading: string;
  readonly related: readonly {
    readonly id: string;
    readonly label: string;
    readonly text: string;
    readonly href: string;
  }[];
  readonly contact: {
    readonly heading: string;
    readonly text: string;
    readonly phoneLabel: string;
    readonly phone: string;
    readonly emailLabel: string;
    readonly email: string;
  };
}
