/**
 * Executive Education › Management Development Programmes page shape. In
 * `types/` so the feature can describe its props without importing
 * `content/` (§7).
 */

export interface MdpPage {
  readonly eyebrow: string;
  readonly title: string;
  readonly abbreviation: string;
  readonly tagline: string;
  readonly refresh: string;
  readonly image: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
  };
  readonly overview: {
    readonly heading: string;
    readonly text: string;
    readonly pillars: readonly {
      readonly id: string;
      readonly title: string;
      readonly text: string;
    }[];
  };
  readonly calendar: {
    readonly heading: string;
    readonly label: string;
    readonly href: string;
    readonly meta: string;
    readonly note: string;
    readonly facts: readonly {
      readonly id: string;
      readonly value: string;
      readonly label: string;
    }[];
    readonly venues: readonly {
      readonly id: string;
      readonly name: string;
      readonly count: number;
    }[];
  };
  readonly stay: {
    readonly heading: string;
    readonly intro: string;
    readonly rates: readonly {
      readonly id: string;
      readonly label: string;
      readonly value: string;
      readonly note: string;
    }[];
    readonly rules: readonly string[];
    readonly taxNote: string;
  };
  readonly discounts: {
    readonly heading: string;
    readonly tiers: readonly {
      readonly id: string;
      readonly participants: string;
      readonly discount: string;
    }[];
  };
  readonly contact: {
    readonly heading: string;
    readonly phone: string;
    readonly email: string;
    readonly website: string;
  };
}
