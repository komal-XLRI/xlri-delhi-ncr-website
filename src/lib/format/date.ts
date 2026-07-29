/**
 * Date formatting for display.
 *
 * ## Why this is a shared function and not `toLocaleDateString()` at the call site
 *
 * Both are needed, and they must agree exactly.
 *
 * Dates are rendered on the server and again on the client during hydration.
 * `toLocaleDateString()` with no arguments resolves the locale and time zone
 * from the *environment*, which on the server is the container's and on the
 * client is the visitor's. A build in UTC and a reader in IST disagree about
 * both the wording and — for anything near midnight — the day itself, and React
 * reports the mismatch as a hydration error on a page that looked fine locally.
 *
 * So the formatter is constructed once with the locale and time zone pinned.
 * Same input, same output, on both sides, everywhere in the world.
 *
 * ## Why UTC specifically
 *
 * The content layer stores plain `YYYY-MM-DD` — a calendar date an editor typed,
 * not an instant. `new Date('2026-01-30')` parses that as UTC midnight, so
 * formatting it in UTC returns the day the editor meant. Formatting it in any
 * zone behind UTC returns the day before.
 */

const DISPLAY = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** `2026-01-30` → `30 Jan 2026`. Returns the input unchanged if unparseable. */
export function formatDate(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return DISPLAY.format(parsed);
}
