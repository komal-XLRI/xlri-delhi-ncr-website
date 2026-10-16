/**
 * Campus Life › Internal Complaints Committee page shape. In `types/` so the
 * feature can describe its props without importing `content/` (§7).
 */
import type { SectionHeading } from './campus-services';
import type { PageMeta } from './page-copy';

interface Titled {
  readonly title: string;
  readonly text: string;
}

/** The small kicker line over a section's heading. */
interface Eyebrow {
  readonly eyebrow: string;
}

export interface CommitteePhoto {
  /** Path under `public/`. */
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface InquiryProcess {
  readonly eyebrow: string;
  readonly title: string;
  readonly text: string;
  /** The box every route starts from. */
  readonly start: string;
  readonly informal: {
    readonly label: string;
    readonly step: string;
    /** Each outcome of conciliation. */
    readonly outcomes: readonly string[];
  };
  readonly formal: {
    readonly label: string;
    /** Who receives the complaint. */
    readonly routes: readonly string[];
    /** In order, after the complaint is received. */
    readonly steps: readonly string[];
    readonly outcomes: readonly { readonly label: string; readonly text: string }[];
    /** The bold lead-in to `appeal`: "Appeal". */
    readonly appealLabel: string;
    readonly appeal: string;
  };
  /** Where the flowchart comes from. */
  readonly source: string;
  /** The line that cites it: "Source: {source}." */
  readonly sourceLine: string;
  /** The link under the diagram. */
  readonly diagramLink: string;
  /** The link to `handbook`. */
  readonly handbookLink: string;
  /** The original flowchart, for anyone who wants it as drawn. */
  readonly diagram: CommitteePhoto;
  readonly handbook: string;
}

export interface CommitteeFaq {
  readonly question: string;
  readonly answer?: readonly string[];
  readonly list?: readonly string[];
}

export interface CommitteeMember {
  readonly name: string;
  readonly role: string;
  /** Student members' programme and batch, e.g. "BM(F)". */
  readonly programme?: string;
}

export interface InternalCommitteePage {
  readonly meta: PageMeta;
  /** The kicker over the title: "Campus Life". */
  readonly eyebrow: string;
  readonly title: string;
  readonly headline: string;
  readonly standfirst: string;
  readonly intro: string;
  readonly email: string;
  /** The hero's buttons and the address box beside it. */
  readonly hero: {
    readonly contactButton: string;
    /** The link down to the inquiry process. */
    readonly processLink: string;
    /** The address box's heading. */
    readonly writeTitle: string;
    /** Under the Convener's name: "{role}, Internal Committee". */
    readonly convenerRole: string;
  };
  readonly responsibilities: {
    readonly eyebrow: string;
    readonly title: string;
    readonly note: string;
    readonly items: readonly (Titled & { readonly label: string })[];
  };
  readonly harassment: {
    readonly eyebrow: string;
    readonly title: string;
    readonly note: string;
    readonly items: readonly string[];
  };
  readonly process: InquiryProcess;
  readonly sessions: Titled & Eyebrow & { readonly photos: readonly CommitteePhoto[] };
  readonly audiences: SectionHeading & { readonly items: readonly Titled[] };
  readonly filing: SectionHeading & { readonly steps: readonly Titled[] };
  readonly faqs: Titled & Eyebrow & { readonly items: readonly CommitteeFaq[] };
  /** The heading over `members`, and the Convener card's mail button. */
  readonly membersSection: SectionHeading & { readonly convenerLink: string };
  /** In the committee's order; the first is the Convener. */
  readonly members: readonly CommitteeMember[];
  readonly documentsSection: SectionHeading;
  readonly documents: readonly { readonly title: string; readonly href: string }[];
  readonly contact: Titled;
}
