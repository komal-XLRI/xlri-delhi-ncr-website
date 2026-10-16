import navigationJson from '@/config/navigation.json';
import { fromJson } from '@/lib/validation/json-content';
import { assertValidNavTree } from '@/lib/validation/navigation';
import type { NavNode, PrimaryNavItem, UtilityNavItem } from '@/types/navigation';

/**
 * THE navigation tree.
 *
 * Six surfaces render from this one structure (§8.1). It is grounded in the
 * legacy audit (§16): every section below maps to real content found among the
 * 205 URLs on the current site, so this doubles as the migration target map.
 *
 * Decisions encoded here:
 *
 *  • **D4 / Q12** — originally eight primary items. Sustainability sits under
 *    *About*, and *News & Events* took the eighth slot, since events are by far
 *    the more active channel (42 events against 10 posts).
 *
 *  • **D4 revisited** — nine. *Centres* was promoted from a column inside
 *    Faculty & Research to its own primary item, matching the Delhi-NCR site's
 *    menu, at the client's request (2026-10-07).
 *
 *  • **D4 revisited again** — ten. *Sustainability* moved from under About to
 *    its own primary item, after Centres, as on the Delhi-NCR site (same day).
 *    Ten was checked at 1280px; see the test in `tests/unit/navigation.test.ts`.
 *
 *  • **Q12, superseded (2026-10-09)** — News & Events was removed from the
 *    bar at the client's request; it had no pages built yet.
 *
 *  • **Q11, superseded (2026-10-09)** — Admissions was a primary item; the
 *    client replaced it with *Giving to XLRI*, last in the bar as on the
 *    Delhi-NCR site. The admission-process links still live under Academics.
 *    Giving's links all leave for xlri.ac.in; the Link primitive marks them
 *    external automatically — see `lib/url.ts`.
 *
 *  • **§16 F2** — Executive Education programmes are listed once each, not once
 *    per cohort. The legacy site mints a new URL per batch
 *    (`…-batch-3`, `…-batch-4`, `…-batch-7`), which fragments its own search
 *    ranking. One programme, one URL; cohorts are data on the record.
 *
 * Adding a link is a one-line change. Restructuring is a data edit. There is no
 * navigation markup anywhere that needs to be kept in sync with this file.
 *
 * The menus themselves are data, in `config/navigation.json`: `primary` (the
 * main bar and its panels), `utility` (the audience row) and `policy` (the
 * footer links). Notes on individual menus are in `content/NOTES.md`.
 */

export const PRIMARY_NAV = fromJson<readonly PrimaryNavItem[]>(navigationJson.primary);

/** Utility row (Layer 1): audience shortcuts and cross-property destinations. */
export const UTILITY_NAV = fromJson<readonly UtilityNavItem[]>(navigationJson.utility);

/** Policy links rendered in the footer on every page. */
export const POLICY_NAV = fromJson<readonly UtilityNavItem[]>(navigationJson.policy);

// Fails the build rather than shipping a broken menu. Runs once at module load.
assertValidNavTree(PRIMARY_NAV);

/** Flatten the tree to every node that has a destination. */
export function allNavLinks(nodes: readonly NavNode[] = PRIMARY_NAV): NavNode[] {
  return nodes.flatMap((node) => [
    ...(node.href ? [node] : []),
    ...(node.children ? allNavLinks(node.children) : []),
  ]);
}
