# 4. Font variables belong on `<html>`, and visual checks are part of verification

**Status:** Accepted · **Date:** 2026-07-26

## Context

The design language rests on a serif display face paired with a neutral sans —
per architecture §10, the single strongest signal separating an academic
institution from a SaaS landing page.

During Phase 1 the site rendered every heading in the default sans-serif. The
serif was configured, loaded, and self-hosted correctly; it simply never applied.
`npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` were all
green. The bug was found by taking a screenshot and looking at it.

## Cause

A custom property's value is substituted at the element where it is **declared**,
not where it is used.

Tailwind's `@theme` emits `--font-serif: var(--font-source-serif), ui-serif,
Georgia, …` onto `:root`. `next/font` exposes `--font-source-serif` through a
generated class, which was applied to `<body>`.

So at `:root`, `var(--font-source-serif)` referenced an undefined property. That
makes the whole declaration **invalid at computed-value time** — and CSS does not
fall through to the next family in the list. The property is dropped entirely, so
headings inherited the default sans.

Both the `@layer base` heading rule and the `.font-serif` utility failed for the
same reason, which is why nothing anywhere looked serif.

## Decision

1. The `next/font` variable classes go on `<html>`, so the font variables are
   declared on the same element as the `@theme` tokens that reference them. This
   is enforced by a prominent comment in `src/app/layout.tsx`.
2. **Visual verification is part of finishing a UI task.** A green pipeline is
   evidence that the code compiles and the rules pass — not that the page looks
   the way it is supposed to.

## Consequences

- Do not move the font classes to `<body>`, and do not "simplify" the fallback
  chain in `theme.css` on the assumption that it provides safety. It does not:
  `font-family: var(--undefined), Georgia` yields no font at all, not Georgia.
  Writing `var(--font-source-serif, Georgia)` _would_ provide a real fallback,
  and is worth considering if this ever needs to be defensive.
- Phase 2 adds Playwright. A computed-style assertion —
  `getComputedStyle(h1).fontFamily` contains `Source Serif` — belongs in that
  suite, since this class of failure is invisible to every other gate we have.
- More generally: for anything with a visual outcome, render it and look before
  calling it done.
