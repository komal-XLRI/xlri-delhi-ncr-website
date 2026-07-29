/**
 * The navigation data model.
 *
 * One tree, defined once in `config/navigation.ts`, feeds every navigational
 * surface on the site (architecture §8.1):
 *
 *   1. the desktop mega menu        4. breadcrumb trails
 *   2. the mobile navigation sheet  5. in-section side navigation
 *   3. the footer sitemap           6. the HTML sitemap page (GIGW)
 *
 * Adding a programme becomes a one-line data change that correctly updates six
 * surfaces. This is what "data-driven rather than hardcoded" has to mean to be
 * worth anything — and it is why the Sustainability placement (Q12) is a data
 * edit rather than a refactor if the institution later changes its mind.
 *
 * Types live here rather than with the feature so `config/` can reference them
 * without violating the layering rule (§7): config may import from `types`, but
 * never from `features`.
 */

/** Layout hint for a mega-menu panel. Panels choose a shape, not pixel values. */
export type PanelLayout = 'columns-2' | 'columns-3' | 'columns-4' | 'split-feature';

/** Audience tags, reserved for audience-filtered views. Unused in Phase 2. */
export type Audience = 'prospective' | 'student' | 'faculty' | 'alumni' | 'recruiter';

/** A promoted item in the right-hand rail of a panel. */
export interface FeaturedPanelCard {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly href: string;
}

/**
 * A single navigation node.
 *
 * The tree is intentionally shallow — three levels at most (primary → section →
 * link). A fourth level in a mega menu is unusable with a mouse and impossible
 * to present coherently on mobile.
 */
export interface NavNode {
  /** Stable identifier. Used for ARIA wiring, so it must be unique tree-wide. */
  readonly id: string;
  readonly label: string;
  /**
   * Destination. Absent on nodes that exist purely to group children — a column
   * heading inside a panel, for instance.
   */
  readonly href?: string;
  /** Supporting line, shown in panels where the label alone is ambiguous. */
  readonly description?: string;
  readonly children?: readonly NavNode[];
  /** Panel shape. Only meaningful on top-level nodes. */
  readonly layout?: PanelLayout;
  readonly featured?: FeaturedPanelCard;
  readonly audience?: readonly Audience[];
}

/** A top-level entry in the primary navigation bar. */
export interface PrimaryNavItem extends NavNode {
  readonly children?: readonly NavNode[];
}

/** An entry in the utility row (Layer 1). */
export interface UtilityNavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}
