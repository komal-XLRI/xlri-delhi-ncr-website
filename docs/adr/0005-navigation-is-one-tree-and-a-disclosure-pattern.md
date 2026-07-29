# 5. Navigation is one tree, rendered server-side, using disclosure semantics

**Status:** Accepted · **Date:** 2026-07-26

## Context

The brief asked for a three-layer header with a data-driven mega menu that is
keyboard accessible, animates smoothly, and avoids layout shift. The legacy
audit (§16) then supplied the actual content: 205 URLs, two orphaned sections,
and a set of high-intent journeys that leave for other XLRI properties.

## Decisions

### One tree, six consumers

`config/navigation.ts` holds the only navigation structure in the codebase. The
desktop mega menu, mobile sheet, footer sitemap, breadcrumbs, in-section
navigation, and the GIGW HTML sitemap all derive from it. Adding a programme is
a one-line data change; the surfaces cannot drift apart because there is nothing
to keep in sync.

It is validated with Zod at module load, so a malformed tree fails the build.
Two invariants that types cannot express are enforced there: **ids are unique
tree-wide** (they drive `aria-controls`, so a duplicate silently breaks ARIA
wiring in a way no automated check would catch) and **every node is reachable**
(a node with neither `href` nor `children` renders as unclickable text).

### Panels are server-rendered into the HTML

All eight panels ship in the initial HTML and are hidden with the `hidden`
attribute until opened. Measured cost: **17.5 kB gzipped for the whole page**,
including 233 anchors — comfortably inside the 60 kB budget.

What that buys: every navigation link is a crawlable `<a>`; the site is navigable
before hydration and with JS disabled; opening a panel is instant with no fetch;
and because panels are absolutely positioned, opening one contributes exactly
zero CLS.

The client controller receives each panel as a `ReactNode` prop, so panel markup
never enters the JavaScript bundle.

### Disclosure navigation, not a menubar

The menu uses `<button aria-expanded aria-controls>` triggers and labelled
`role="group"` panels containing ordinary lists of links. It does **not** use
`role="menubar"` / `role="menuitem"`.

This is the most common and most damaging mistake in mega-menu implementations.
Menubar semantics are for application menus. Applied to site navigation they
remove the links from a screen reader's links list, hijack the arrow keys away
from normal browsing, and make the menu harder to use with assistive technology
than plain markup would have been.

Verified against the running page via the DevTools protocol: no `menubar`,
`menuitem`, or `menu` role appears anywhere in the document.

### Triggers are buttons; the section landing page lives inside the panel

A primary item with children opens its panel; its overview page is the first
link _inside_ it. This removes the touch ambiguity where one tap must mean both
"open" and "navigate" — which otherwise requires pointer-type sniffing and a
tap-twice convention that nothing on the web teaches users.

### The mobile navigation is a native `<details>`

An earlier version rendered the sheet only when React state said it was open.
That meant a visitor with JavaScript disabled had **no navigation at all on a
phone**, while the code claimed the site was navigable without JS.

It is now a server-rendered `<details>` element: it opens, closes, and is
keyboard operable with no JavaScript. `MobileNavEnhancer` adds scroll locking,
`inert` on the rest of the page, focus return, and Escape-to-close. If that
script never loads, nothing is broken.

## Consequences

- Restructuring the IA is a data edit. Moving Sustainability back to top level
  (Q12) means cutting one node and pasting it into `PRIMARY_NAV`.
- Cross-property links are classified at render time by `lib/url.ts` rather than
  annotated by hand, so a link to `xlri.ac.in` cannot be added without being
  marked.
- Keyboard behaviour — Escape, tab-out, click-outside, hover intent — is
  implemented and manually exercised, but **not yet automated**. The Playwright
  suite in the next phase should assert it, along with the computed-font check
  from ADR-0004.
- Per-route JS budgets are still not instrumented. A crude measurement put
  first-load JS well above the 90 kB target, but the chunk lists are identical
  across routes, which points at coarse shared chunking rather than
  homepage-specific code. This needs `size-limit` or the bundle analyzer before
  it can be treated as a real number, and before Phase 3 adds real pages.
