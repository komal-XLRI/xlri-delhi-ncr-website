/**
 * Dates for Latest News, formatted in UTC from ISO dates so the server and
 * the browser render the same text.
 */

/** "13 April 2026". */
export function newsDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00Z`));
}

/** "2026-04-13" → "2026". */
export const yearOf = (iso: string): string => iso.slice(0, 4);
