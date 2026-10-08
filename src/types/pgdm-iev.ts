/**
 * PGDM - IEV (Innovation, Entrepreneurship & Venture Development) page shape.
 * Its own type: the Delhi page is an admissions page and an incubator
 * showcase at once, far beyond the generic `ProgrammePage`. In `types/` so the
 * feature can describe its props without importing `content/` (§7).
 */

export interface IevImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export type IevIcon =
  | 'graduate'
  | 'switch'
  | 'family'
  | 'professional'
  | 'training'
  | 'funding'
  | 'partners'
  | 'office'
  | 'mentorship'
  | 'network';

export interface IevPerson {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly portrait: IevImage;
}

export interface IevStudentRep {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly linkedin: string;
}

export interface IevStartup {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly logo: string;
  readonly links: readonly {
    readonly kind: 'LinkedIn' | 'Instagram' | 'Website';
    readonly href: string;
  }[];
}

export interface IevContact {
  readonly id: string;
  readonly name: string;
  readonly department: string;
  readonly phone: string;
  readonly email: string;
}

export interface IevVideo {
  readonly title: string;
  readonly src: string;
  readonly poster: string;
  readonly size: string;
}

export interface PgdmIevPage {
  readonly school: string;
  readonly shortName: string;
  readonly title: string;
  readonly subtitle: string;
  readonly heroImage: IevImage;
  readonly apply: { readonly label: string; readonly href: string };
  readonly brochure: { readonly label: string; readonly href: string; readonly meta: string };
  readonly intro: string;
  readonly facts: readonly {
    readonly id: string;
    readonly value: string;
    readonly label: string;
  }[];
  readonly introVideo: IevVideo;
  readonly whyApply: {
    readonly heading: string;
    readonly lead: string;
    readonly note: string;
    readonly audiences: readonly {
      readonly id: string;
      readonly icon: IevIcon;
      readonly text: string;
    }[];
  };
  readonly eligibility: {
    readonly heading: string;
    readonly paragraphs: readonly string[];
    readonly tests: readonly string[];
  };
  readonly selection: {
    readonly heading: string;
    readonly rounds: readonly {
      readonly id: string;
      readonly title: string;
      readonly detail?: string;
    }[];
    readonly deadline: string;
    readonly note: string;
  };
  readonly dates: {
    readonly heading: string;
    readonly items: readonly {
      readonly id: string;
      readonly label: string;
      readonly value: string;
      readonly tentative?: boolean;
    }[];
  };
  readonly team: {
    readonly heading: string;
    readonly people: readonly IevPerson[];
    readonly studentsHeading: string;
    readonly students: readonly IevStudentRep[];
  };
  readonly xceed: {
    readonly heading: string;
    readonly intro: string;
    readonly benefitsLead: string;
    readonly benefits: readonly {
      readonly id: string;
      readonly icon: IevIcon;
      readonly title: string;
      readonly text: string;
    }[];
    readonly partnerships: { readonly heading: string; readonly text: string };
    readonly visits: { readonly heading: string; readonly text: string };
    readonly partnersHeading: string;
    readonly partners: readonly {
      readonly id: string;
      readonly name: string;
      readonly logo: IevImage;
    }[];
  };
  readonly events: {
    readonly heading: string;
    readonly items: readonly {
      readonly id: string;
      readonly title: string;
      readonly paragraphs: readonly string[];
      readonly image: IevImage;
    }[];
    readonly recap: IevVideo;
  };
  readonly activities: {
    readonly heading: string;
    readonly items: readonly {
      readonly id: string;
      readonly title: string;
      readonly text: string;
      readonly image: IevImage;
    }[];
  };
  readonly startups: { readonly heading: string; readonly items: readonly IevStartup[] };
  readonly alumni: {
    readonly heading: string;
    readonly lead: string;
    readonly benefits: readonly string[];
  };
  readonly contacts: { readonly heading: string; readonly people: readonly IevContact[] };
  readonly faq: {
    readonly heading: string;
    readonly items: readonly {
      readonly id: string;
      readonly question: string;
      readonly answer: string;
    }[];
  };
}
