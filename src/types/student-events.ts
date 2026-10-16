/**
 * Campus Life › Student Events page shape. In `types/` so the feature can
 * describe its props without importing `content/` (§7).
 */
import type { SectionHeading } from './campus-services';
import type { PageMeta } from './page-copy';

export interface EventKind {
  readonly id: string;
  readonly label: string;
}

export interface EventPoster {
  /** Path under `public/`. */
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

/** A committee that ran the event, resolved against Student Societies. */
export interface EventOrganiser {
  readonly id: string;
  readonly name: string;
}

export interface StudentEvent {
  /** The Delhi page's slug, kebab-case; the React key and the anchor. */
  readonly id: string;
  readonly title: string;
  /** An `EventKind` id. */
  readonly kind: string;
  readonly organisers: readonly EventOrganiser[];
  /** ISO dates, as printed on the poster; absent when the poster gives none. */
  readonly start?: string;
  readonly end?: string;
  readonly time?: string;
  readonly venue?: string;
  /** One or two lines, from what the poster says. */
  readonly summary: string;
  readonly poster: EventPoster;
}

/** The board's own words; `{count}`, `{index}` and `{total}` are filled in. */
export interface EventsBoardLabels {
  /** The filter chip that shows every event. */
  readonly filterAll: string;
  /** The month heading for events the posters give no date for. */
  readonly undated: string;
  /** Beside a month heading: "{count} event" / "{count} events". */
  readonly count: { readonly one: string; readonly other: string };
  readonly date: string;
  readonly time: string;
  readonly venue: string;
  readonly organisedBy: string;
  /** In the dialog: "{index} of {total}". */
  readonly position: string;
}

export interface StudentEventsPage {
  readonly meta: PageMeta;
  /** The kicker over the title: "Campus Life". */
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  /** The hero's three figures; the first two are counted from `events`. */
  readonly facts: {
    readonly events: string;
    readonly committees: string;
    readonly year: { readonly value: string; readonly label: string };
  };
  /** The most recent event, in the hero. */
  readonly spotlight: {
    readonly badge: string;
    /** "By {names}". */
    readonly organisers: string;
    readonly link: string;
  };
  /** The section that holds the board: its heading, a line, and the board's words. */
  readonly board: SectionHeading & { readonly intro: string; readonly labels: EventsBoardLabels };
  readonly kinds: readonly EventKind[];
  /** Newest first, as on the Delhi page. */
  readonly events: readonly StudentEvent[];
}
