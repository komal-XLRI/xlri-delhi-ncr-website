# XLRI Delhi-NCR

The official website for the XLRI Delhi-NCR campus. Next.js App Router,
TypeScript, Tailwind CSS v4, React Server Components by default.

> **Status: Phase 2 — navigation complete.** Tokens, architectural boundaries,
> quality gates, the primitive library, and the full site navigation are in
> place. The homepage lands in Phase 3.

## Start here

| Document                                       | What it covers                                                                                                 |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [`docs/architecture.md`](docs/architecture.md) | The full architecture: rendering, performance, SEO, navigation, accessibility, and the legacy-site audit (§16) |
| [`docs/adr/`](docs/adr/)                       | Why things are the way they are                                                                                |
| [`docs/migration/`](docs/migration/)           | Inventory of the 205 URLs and 1,410 media items on the current WordPress site                                  |
| `/design-system`                               | Live token reference (dev only) — every contrast figure computed at render time                                |

## Requirements

Node 22.14.0 (see `.nvmrc`). npm is the package manager; `package-lock.json` is
committed and `save-exact` is on, so installs are reproducible.

## Commands

```bash
npm install
npm run dev            # Turbopack dev server
npm run build          # production build
npm run verify         # typecheck + lint + format + tests — what CI runs
npm run test           # unit tests
npm run test:watch
npm run lint:fix
npm run format
node scripts/generate-ramps.mjs   # regenerate colour ramps from the brand seeds
```

`SITE_URL` must be set for builds. It is validated at boot by
`src/config/env.ts`, and every canonical URL, Open Graph tag, and sitemap entry
derives from it.

## Architecture in one screen

```
src/
├─ app/          Routing, layouts, metadata. Pages orchestrate; they hold no markup of their own.
├─ components/   The design system. Domain-free by rule — a Card must not know what a faculty member is.
├─ features/     Domain slices (navigation, homepage, faculty…). Composes components/.
├─ content/      Typed content source. Reachable only from services/.
├─ services/     The data boundary. The only layer that knows where data comes from.
├─ actions/      Server Actions — mutations, kept separate from reads so the RPC surface is auditable.
├─ lib/          Pure, framework-agnostic utilities. No React, no Next.
├─ hooks/        Client-only hooks. Growth here means the RSC-by-default policy is slipping.
├─ config/       Environment, site facts, navigation tree.
├─ constants/    Typed route map, breakpoints, enums.
├─ types/        Cross-layer types.
└─ styles/       Design tokens (theme.css + tokens.ts) and base layer.
```

The dependency direction is `app → features → components → lib`, enforced at
**error** severity by `eslint-plugin-boundaries` — see
[ADR-0003](docs/adr/0003-machine-enforced-architectural-boundaries.md). Rules
that are not machine-checked stop being true within about six months.

## Three things that will surprise you

**Colour is a tested contract.** Two of the three official brand colours fail
WCAG in the roles you would naturally reach for: the neutral grey `#9d9e9e`
measures 2.69:1 on white, and the accent green `#bccf15` measures 1.74:1. Both
are therefore restricted by construction — green is a background behind dark ink,
grey is a hairline. `tests/unit/tokens.test.ts` fails the build if a token is
moved into a role it cannot legally occupy. See
[ADR-0002](docs/adr/0002-colour-tokens-as-a-tested-contract.md).

**Font variables live on `<html>`, not `<body>`.** Moving them silently breaks
every heading — a custom property is substituted where it is _declared_, so
`--font-serif: var(--font-source-serif), …` on `:root` resolves to nothing if the
font variable is only defined further down. No error, no warning, just the wrong
typeface. See [ADR-0004](docs/adr/0004-font-variables-belong-on-the-html-element.md).

**Components consume semantic tokens only.** `text-ink`, `bg-surface`,
`border-border`, `text-brand` — never a ramp step, never a raw hex. Lint blocks
raw hex outside `src/styles/`. This is what makes the GIGW high-contrast theme a
one-file value swap rather than a redesign.

## Accessibility and compliance

WCAG 2.2 AA, plus GIGW obligations (architecture §11.2). Consequences already
baked in: a `reviewedAt` field planned on every content type, text-size and
high-contrast preference hooks in the base layer, an HTML sitemap route, and an
HTML-first policy for notices with PDF as a secondary download.

The CI accessibility gate is a compliance control, not a quality nicety. It does
not get skipped to unblock a release.

## Deployment

Self-hosted (campus/cloud VM + CDN). The infrastructure we own — image cache,
shared ISR cache, CDN rules, object storage for media — is set out in
architecture §13.1. Each item there is a way the performance budgets fail
silently in production if it is missed.
