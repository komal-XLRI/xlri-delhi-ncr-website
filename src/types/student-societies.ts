/**
 * Campus Life › Student Societies page shape. In `types/` so the feature can
 * describe its props without importing `content/` (§7).
 */
import type { SectionHeading } from './campus-services';
import type { PageMeta } from './page-copy';

export interface SocietyPhoto {
  /** Path under `public/`. */
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface SocietyLead {
  readonly name: string;
  /** "Joint Secretary", "Convenor" — as the committee titles it. */
  readonly role: string;
  /** A head-and-shoulders crop, 4:5. */
  readonly photo: string;
}

export interface Society {
  /** Kebab-case; the React key and the anchor that opens it. */
  readonly id: string;
  /** As the committee writes it: "MAXI", "SIGMA-oikos". */
  readonly name: string;
  /** The name spelled out, where the source gives one. */
  readonly fullName?: string;
  /** Two or three words for the card: "Consulting", "Sports". */
  readonly focus: string;
  /** A `SocietyCategory` id. */
  readonly category: string;
  readonly lead?: SocietyLead;
  readonly email?: string;
  readonly motto?: string;
  /** Paragraphs, in order. */
  readonly body: readonly string[];
  readonly listTitle?: string;
  readonly list?: readonly string[];
  readonly photo?: SocietyPhoto;
}

export interface SocietyCategory {
  readonly id: string;
  readonly label: string;
}

/** The Student Affairs Council, shown on its own above the committees. */
export interface StudentCouncil {
  readonly id: string;
  readonly name: string;
  readonly short: string;
  readonly lead: SocietyLead;
  readonly email: string;
  readonly body: readonly string[];
  /** The areas its committees cover. */
  readonly areas: readonly string[];
  readonly photo: SocietyPhoto;
}

export interface StudentSocietiesPage {
  readonly meta: PageMeta;
  /** The kicker over the title: "Campus Life". */
  readonly eyebrow: string;
  readonly title: string;
  readonly lead: string;
  readonly hero: SocietyPhoto;
  readonly facts: readonly { readonly value: string; readonly label: string }[];
  /** "Life at XL" — the Delhi page's introduction. */
  readonly life: readonly string[];
  /** Headings and lines for the page's sections. */
  readonly sections: {
    /** Over `life`. */
    readonly life: SectionHeading;
    /** The annual events `life` names, in a box beside it. */
    readonly annualEvents: {
      readonly title: string;
      readonly items: readonly { readonly name: string; readonly what: string }[];
    };
    /** The kicker over the council's name. */
    readonly council: { readonly eyebrow: string };
    readonly committees: SectionHeading & { readonly intro: string };
  };
  /** The committee grid's own words. */
  readonly directory: {
    /** The filter chip that shows every committee. */
    readonly filterAll: string;
    /** A card's footer when the committee names no lead or email. */
    readonly readMore: string;
    /** In the dialog: "{index} of {total}". */
    readonly position: string;
  };
  readonly council: StudentCouncil;
  /** In display order; every committee's `category` names one. */
  readonly categories: readonly SocietyCategory[];
  readonly committees: readonly Society[];
}
