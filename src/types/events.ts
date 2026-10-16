import type { EventItem } from './homepage';
import type { PageMeta } from './page-copy';

/**
 * Latest Events — the listing at `/latest-events` and each event's page at
 * `/event/<slug>`, both the live site's addresses. Content is
 * `content/events.json`; the homepage's Latest Events strip shows the first
 * few of the same list.
 */

/** An event as stored: its address is built from `slug`. */
export interface StoredEvent extends Omit<EventItem, 'id' | 'href' | 'dateLabel' | 'dateTime'> {
  readonly slug: string;
  /** "08 Apr", as the live listing prints it. */
  readonly dateLabel: string;
  /** ISO date; the year is from the live event page's publication date. */
  readonly dateTime: string;
}

/** An event as pages get it. */
export interface LatestEvent extends StoredEvent {
  readonly id: string;
  readonly href: string;
}

export interface LatestEventsCopy {
  readonly meta: PageMeta;
  /** The breadcrumb's middle step: the menu that holds the page. */
  readonly section: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly facts: { readonly events: string; readonly years: string; readonly latest: string };
  readonly spotlightBadge: string;
  /** Accessible name of the year jump links. */
  readonly yearsNav: string;
  /** "{count} event" / "{count} events", beside each year. */
  readonly yearCount: { readonly one: string; readonly other: string };
  readonly moreDetails: string;
}

export interface EventDetailCopy {
  /** "{title} — an event at XLRI Delhi-NCR, {date}." */
  readonly metaDescription: string;
  readonly eyebrow: string;
  readonly back: string;
  readonly more: string;
  readonly posterLabel: string;
}

export interface StoredEvents {
  readonly page: LatestEventsCopy;
  readonly detail: EventDetailCopy;
  readonly items: readonly StoredEvent[];
}

export interface LatestEventsPage {
  readonly copy: LatestEventsCopy;
  readonly events: readonly LatestEvent[];
}

export interface EventDetailPage {
  readonly copy: EventDetailCopy;
  /** The listing's breadcrumb step, title, and card action, reused here. */
  readonly listing: {
    readonly section: string;
    readonly title: string;
    readonly moreDetails: string;
  };
  readonly event: LatestEvent;
  /** The events either side of it in the list, for "More events". */
  readonly more: readonly LatestEvent[];
}
