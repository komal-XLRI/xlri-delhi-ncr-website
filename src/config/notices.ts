import noticesJson from '@/config/notices.json';
import { fromJson } from '@/lib/validation/json-content';

/**
 * Notices for the header ticker.
 *
 * Short, time-sensitive announcements: admission deadlines, exam schedules,
 * tender notices, results. On Indian institutional sites this is a genuinely
 * load-bearing channel rather than decoration — it is where visitors expect
 * urgent information to appear.
 *
 * Phase 6 moves this to a Payload `Notice` collection with `publishedAt` and
 * `expiresAt`; the shape below is deliberately the shape that collection will
 * have, so `services/` can swap the source without touching the component.
 *
 * The notices themselves are in `config/notices.json` — newest first; add,
 * edit or remove entries there.
 *
 * Editorial guidance, worth enforcing in the CMS later:
 *   • keep labels under ~90 characters — a ticker is a headline, not a paragraph
 *   • every notice links somewhere; a notice with no destination is a dead end
 *   • expire them. A ticker showing last year's deadline is worse than no ticker
 */

export interface Notice {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  /** ISO date. Rendered as a visible qualifier and in the accessible name. */
  readonly date?: string;
  /** Draws a small "New" badge. Use sparingly or it stops meaning anything. */
  readonly isNew?: boolean;
}

export const notices = fromJson<readonly Notice[]>(noticesJson);
