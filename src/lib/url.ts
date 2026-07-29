/**
 * URL classification.
 *
 * This exists because of a finding in the legacy audit (architecture §16 F1):
 * admissions, giving, XAT, and alumni all live on *other* XLRI properties. A
 * visitor clicking "Admissions" leaves this site. That is unavoidable — the
 * content is not ours — but it must never be silent, and the distinction has to
 * be computed rather than remembered by whoever writes the link.
 *
 * Three categories, because they warrant different treatment:
 *
 *   internal        — this site. Routed by next/link, prefetched.
 *   sibling         — another XLRI property (xlri.ac.in, alumni portal, XCEED).
 *                     Still "XLRI" to a visitor, but a full page load to a
 *                     different system. Marked, not disguised.
 *   external        — anywhere else. Marked, and given rel="noopener".
 *
 * Pure functions, no framework imports — `lib` layer (§7).
 */

export type LinkKind = 'internal' | 'sibling' | 'external';

/** Hosts that belong to the wider XLRI estate. Sourced from the §16 audit. */
const SIBLING_HOST_SUFFIXES = ['xlri.ac.in', 'xlri.edu'] as const;

/** Anything that is not an absolute http(s) URL is in-app navigation. */
function parse(href: string): URL | null {
  if (!/^[a-z][a-z0-9+.-]*:/i.test(href)) return null; // relative path, hash, or query
  try {
    return new URL(href);
  } catch {
    return null;
  }
}

export function classifyHref(href: string, siteUrl: string): LinkKind {
  const target = parse(href);

  // Relative hrefs, `#anchor`, and `?query` are all internal.
  if (!target) return 'internal';

  // Non-web schemes (mailto:, tel:) are treated as external so they get the
  // same "leaves the page" affordance. They are not http, so they never match a
  // host check.
  if (target.protocol !== 'http:' && target.protocol !== 'https:') return 'external';

  const own = parse(siteUrl);
  if (own && target.host === own.host) return 'internal';

  const host = target.host.toLowerCase();
  const isSibling = SIBLING_HOST_SUFFIXES.some(
    (suffix) => host === suffix || host.endsWith(`.${suffix}`),
  );

  return isSibling ? 'sibling' : 'external';
}

/** Would a visitor leave this site by following the link? */
export function isOffsite(kind: LinkKind): boolean {
  return kind !== 'internal';
}

/**
 * Human-readable destination for the accessible name of an offsite link, e.g.
 * "xlri.ac.in". Screen-reader users get told where they are being sent rather
 * than only that the link is external.
 */
export function destinationLabel(href: string): string | null {
  const target = parse(href);
  if (!target) return null;
  if (target.protocol === 'mailto:') return 'email';
  if (target.protocol === 'tel:') return 'phone';
  return target.host.replace(/^www\./, '');
}
