/**
 * Campus Life › Counselling Services page shape. In `types/` so the feature
 * can describe its props without importing `content/` (§7).
 */
import type { CampusFacilityPage, SectionHeading } from './campus-services';
import type { PageMeta } from './page-copy';

export interface CounsellingChannel {
  readonly id: string;
  readonly icon: 'users' | 'chat';
  /** A short line over the title: "On campus, in person". */
  readonly label: string;
  readonly title: string;
  readonly text: string;
  readonly pointsTitle: string;
  /** What the channel covers, drawn from its text. */
  readonly points: readonly string[];
  readonly link?: { readonly label: string; readonly href: string };
}

/** The counsellor, resolved from the full-time faculty directory. */
export interface Counsellor {
  readonly name: string;
  /** As the Counselling page titles them. */
  readonly role: string;
  readonly designation: string;
  readonly email: string;
  readonly photo: string;
  /** Their faculty profile. */
  readonly href: string;
}

export interface CounsellingPage {
  readonly meta: PageMeta;
  /** The kicker over the title: "Campus Life". */
  readonly eyebrow: string;
  readonly title: string;
  readonly headline: string;
  readonly intro: string;
  /** The counsellor's card in the hero. */
  readonly counsellorCard: {
    /** Over the name: "Your counsellor". */
    readonly label: string;
    /** The link to their faculty profile. */
    readonly profileLink: string;
  };
  /** The heading over `channels`. */
  readonly channelsHeading: SectionHeading;
  readonly channels: readonly CounsellingChannel[];
  readonly closing: string;
  /** A line from `closing`, set large. */
  readonly quote: string;
  /** Under the quote; `emphasis` is set in italics between the two. */
  readonly quoteCaption: {
    readonly before: string;
    readonly emphasis: string;
    readonly after: string;
  };
  readonly counsellor: Counsellor;
  readonly notice?: CampusFacilityPage['notice'];
  readonly relatedHeading: SectionHeading;
  readonly related: CampusFacilityPage['related'];
}
