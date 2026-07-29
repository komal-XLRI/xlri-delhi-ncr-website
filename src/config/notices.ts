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

export const notices: readonly Notice[] = [
  {
    id: 'notice-admissions-2027',
    label: 'Admissions open for the 2027–29 postgraduate cohort',
    href: '/admissions',
    date: '2026-07-20',
    isNew: true,
  },
  {
    id: 'notice-placement-report',
    label: 'Final Placement Report 2024–26 published',
    href: '/placements/reports',
    date: '2026-07-12',
  },
  {
    id: 'notice-convocation',
    label: '6th Annual Convocation — registration now open',
    href: '/events/convocation',
    date: '2026-07-05',
  },
  {
    id: 'notice-mandatory-disclosure',
    label: 'AICTE Mandatory Disclosure updated',
    href: '/about/mandatory-disclosure',
    date: '2026-06-28',
  },
  {
    id: 'notice-edp-healthcare',
    label: 'Executive Development Programme in Healthcare Strategy — applications close 30 August',
    href: '/executive-education/healthcare-strategy-leadership',
    date: '2026-06-15',
  },
];
