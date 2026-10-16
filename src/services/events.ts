import eventsJson from '@/content/events.json';
import { routes } from '@/constants/routes';
import { fromJson } from '@/lib/validation/json-content';
import type { EventDetailPage, LatestEvent, LatestEventsPage, StoredEvents } from '@/types/events';

const stored = fromJson<StoredEvents>(eventsJson);

/** Newest first, as the live listing orders them. */
const events: readonly LatestEvent[] = stored.items.map((event) => ({
  ...event,
  id: `event-${event.slug}`,
  href: routes.events.detail(event.slug),
}));

/**
 * Events repository — the same seam as `services/homepage`. Async so the
 * Payload query that replaces it is not a signature change.
 */
export async function getLatestEvents(): Promise<LatestEventsPage> {
  return Promise.resolve({ copy: stored.page, events });
}

/** The newest `count` events, for the homepage strip. */
export async function getRecentEvents(count: number): Promise<readonly LatestEvent[]> {
  return Promise.resolve(events.slice(0, count));
}

export async function getEventSlugs(): Promise<readonly string[]> {
  return Promise.resolve(events.map((event) => event.slug));
}

/** One event's page, or `undefined` for an unknown slug. */
export async function getEvent(slug: string): Promise<EventDetailPage | undefined> {
  const index = events.findIndex((event) => event.slug === slug);
  const event = events[index];
  if (!event) return Promise.resolve(undefined);
  // Three neighbours: the ones after it, then before it near the list's end.
  const more = [...events.slice(index + 1), ...events.slice(0, index).reverse()].slice(0, 3);
  return Promise.resolve({
    copy: stored.detail,
    listing: {
      section: stored.page.section,
      title: stored.page.title,
      moreDetails: stored.page.moreDetails,
    },
    event,
    more,
  });
}
