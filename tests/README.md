# Tests

- `unit/` — Vitest over `lib/` and `services/` contracts. Includes
  `tokens.test.ts`, which holds the colour system to its measured WCAG floors so
  the palette cannot silently regress.
- `e2e/` — Playwright: mega-menu keyboard flows, mobile navigation, forms.
  Added in Phase 2 with the navigation.
- `a11y/` — axe-core sweeps over every page template. Added in Phase 2.
