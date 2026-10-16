/**
 * Dates for Student Events. All formatting is in UTC from ISO dates, so the
 * server and the browser render the same text and hydration never differs.
 */

const at = (iso: string) => new Date(`${iso}T00:00:00Z`);
const format = (iso: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', ...options }).format(at(iso));

/** "Wednesday, 25 February 2026"; "16–18 February 2026"; "29 Jan – 1 Feb 2026". */
export function longDate(start: string, end?: string): string {
  if (!end || end === start) {
    return format(start, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
  if (start.slice(0, 7) === end.slice(0, 7)) {
    return `${format(start, { day: 'numeric' })}–${format(end, { day: 'numeric', month: 'long', year: 'numeric' })}`;
  }
  return `${format(start, { day: 'numeric', month: 'short' })} – ${format(end, { day: 'numeric', month: 'short', year: 'numeric' })}`;
}

/** The badge on a card: day (or day range) over a short month. */
export function badge(start: string, end?: string): { day: string; month: string } {
  const day = format(start, { day: 'numeric' });
  const month = format(start, { month: 'short' });
  if (!end || end === start) return { day, month };
  if (start.slice(0, 7) === end.slice(0, 7)) {
    return { day: `${day}–${format(end, { day: 'numeric' })}`, month };
  }
  return { day, month: `${month} –` };
}

/** "2026-02" → "February 2026". */
export function monthLabel(key: string): string {
  return format(`${key}-01`, { month: 'long', year: 'numeric' });
}
