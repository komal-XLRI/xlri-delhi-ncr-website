# 2. Colour tokens are a tested contract, not documentation

**Status:** Accepted · **Date:** 2026-07-26

## Context

Measuring the three official brand colours against white found:

| Colour                 | Ratio on white | Verdict                              |
| ---------------------- | -------------- | ------------------------------------ |
| Primary Blue `#1c4e9b` | 8.04:1         | Excellent — AAA body text            |
| Neutral Grey `#9d9e9e` | 2.69:1         | Fails AA text _and_ the 3:1 UI floor |
| Accent Green `#bccf15` | 1.74:1         | Fails badly — effectively invisible  |

Two of the three fail in exactly the roles a designer reaches for first: grey for
secondary text, green for links, highlights, and focus rings.

GIGW compliance (architecture D9) makes this a legal obligation rather than a
quality preference, and adds a high-contrast theme that the palette must also
satisfy.

## Decision

1. Generate 11-step ramps in OKLCH from each seed, pinning each official colour
   at the step where its own lightness naturally falls, so the brand is preserved
   exactly rather than approximated (`scripts/generate-ramps.mjs`).
2. Expose only **semantic** tokens to components — `ink`, `ink-muted`, `surface`,
   `border`, `brand`, `focus`, `accent-surface`. Ramp steps and raw hex are
   blocked by lint outside `src/styles/`.
3. Record each token's required contrast floor as data in `src/styles/tokens.ts`
   and assert it in `tests/unit/tokens.test.ts`, which runs in CI.

## Rationale

A documented rule that green must never be a link colour survives about as long
as the memory of the person who wrote it. An assertion that fails the build
survives indefinitely and explains itself at the moment of violation.

The semantic indirection is what makes the GIGW high-contrast theme a value swap
in one file rather than a redesign — which is the whole argument for tokens.

## Consequences

- Accent green is legal as a _background_ behind strong ink (8.67:1) and as a
  non-informational rule. It is never text, link, icon, or focus colour on a
  light surface. Steps 700+ are the text-safe greens.
- Neutral grey `#9d9e9e` is a hairline colour. Secondary text uses step 700
  (`#626363`, 6.03:1).
- Focus rings are blue.
- Changing a brand colour means regenerating the ramps and re-running the tests;
  a change that breaks accessibility fails loudly.
