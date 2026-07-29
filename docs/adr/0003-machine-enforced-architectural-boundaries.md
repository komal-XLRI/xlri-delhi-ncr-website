# 3. Architectural boundaries are machine-enforced

**Status:** Accepted · **Date:** 2026-07-26

## Context

The brief assumes this codebase is maintained by multiple developers for 8–10
years. The layering in architecture §7 — `app → features → components → lib`,
with `services` as the sole data boundary and `content` reachable only from
`services` — is what keeps the design system reusable and the CMS migration a
swap rather than a rewrite.

Layering rules that live only in a document stop being true within roughly six
months of multi-developer work. Nobody violates them deliberately; they erode
one convenient import at a time, and each individual violation looks reasonable.

## Decision

Encode the dependency matrix in `eslint-plugin-boundaries` at **error** severity,
in `eslint.config.mjs`, and run it in CI.

The rule that matters most: `components/` may not import from `features/`,
`services/`, or `content/`.

## Rationale

The design system stays reusable across a future redesign only if it never learns
what a faculty member is. That is a property no code review reliably preserves at
scale, and a linter preserves perfectly.

Encoding it also makes the architecture legible: `eslint.config.mjs` is a
runnable statement of the intended structure, and it cannot silently disagree
with reality.

## The failure mode this rule has, and how we guard it

`eslint-plugin-boundaries` fails **silently** when its element patterns stop
matching. It reports nothing, `npm run lint` exits 0, and the codebase appears
compliant while enforcing nothing. A green check that means nothing is worse
than no check at all.

This is not hypothetical — it happened while writing this config. The natural
pattern `src/config/**/*` matches `src/config/oauth/client.ts` but **not**
`src/config/env.ts`: files sitting directly in the layer folder fell through, so
`app`, `config`, `lib`, `styles`, `constants`, and `services` were all
unguarded. Lint passed the whole time. The fix is `src/config/**`.

Two probes exposed it, and neither was obvious from reading the config:

```bash
# 1. Are files matching an element at all?
npx eslint --rule '{"boundaries/no-unknown-files":"error"}' "src/**/*.{ts,tsx}"

# 2. Does a deliberate violation actually get rejected?
npm run check:boundaries
```

`scripts/check-boundaries.mjs` runs in CI. It writes deliberate violations into
`src/`, asserts ESLint rejects each one, asserts a legal import is still
accepted, and cleans up. **Any rule whose job is to reject things should be
tested against something it must reject.** A linter passing on a codebase with
no violations is not evidence that it works.

## Consequences

- A new layer requires an entry in `ELEMENTS`, a policy in the matrix, and
  ideally a case in the self-test.
- Element patterns use the `src/<layer>/**` form. Do not "tidy" them to
  `src/<layer>/**/*` — that silently unguards every top-level file in the layer.
- Cross-feature imports are currently permitted (a homepage section reusing
  `NewsCard` is legitimate). Restricting them to each feature's public `index.ts`
  is deferred to Phase 2, when there are real features to verify against.
- Module resolution goes through `settings['import/resolver']` with the
  TypeScript resolver, so the `@/` alias resolves. Without it every cross-layer
  import is classified "unknown" and skipped — the same silent pass.
