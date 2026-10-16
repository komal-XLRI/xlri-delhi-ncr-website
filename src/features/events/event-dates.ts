/**
 * Dates for Latest Events, formatted in UTC from ISO dates so the server and
 * the browser render the same text.
 */

const at = (iso: string) => new Date(`${iso}T00:00:00Z`);

/** "Wednesday, 8 April 2026". */
export function longDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(at(iso));
}

/** The card's badge, from the live label "08 Apr": day over month. */
export function badge(dateLabel: string): { day: string; month: string } {
  const [day = '', month = ''] = dateLabel.trim().split(/\s+/);
  return { day, month };
}

/** "2026-04-08" → "2026". */
export const yearOf = (iso: string): string => iso.slice(0, 4);
