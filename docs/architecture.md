# XLRI Website — Architecture Proposal

**Status:** Key decisions confirmed; awaiting go-ahead for Phase 0 · **Date:** 2026-07-26 · **Author:** Engineering
**Scope:** Architecture, rendering, performance, SEO, component + navigation design, accessibility. No implementation until approved.

---

## Decision log (confirmed 2026-07-26)

| #   | Decision                                                                                       | Consequence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | **Site scope: XLRI Delhi-NCR campus only**                                                     | Navigation tree scoped to Delhi-NCR programmes, faculty, and facilities. Structured data models this as a campus of the parent institute (`CollegeOrUniversity` with `parentOrganization`), not as the institute itself. Cross-links to the Jamshedpur/institute site are a defined pattern, not an afterthought.                                                                                                                                                                                                                                                                                                                                                                                     |
| D2  | **Content: Payload CMS, self-hosted**                                                          | Postgres-backed, schema-as-code in this repo, deployed alongside the app. Phases 1–5 still build on typed local content behind `services/`; Phase 6 is a swap, not a rewrite.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| D3  | **Hosting: self-hosted (campus/cloud VM + CDN)**                                               | Next standalone output. We own image optimisation, the ISR cache, CDN configuration, and deploy automation. See §13.1 — this adds real infrastructure scope.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| D4  | **Navigation: 8 primary + utility row, approved**                                              | §2.2 IA adopted.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| D5  | ~~Accreditation logos: three-tier treatment~~ **superseded by D13**                            | Monochrome lockup in header ≥1280px; full-colour strip below hero; full-colour bar in footer. §2.3.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| D6  | **English only — no Hindi, no i18n seam**                                                      | Single-locale routing. No `[locale]` segment, no dictionary layer, no `hreflang`. Simpler routes and links; adding a second language later would be a substantial refactor, accepted knowingly. §2.8.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| D7  | **Legacy site is WordPress**                                                                   | Migration becomes tractable and largely automatable: URL inventory from `wp-sitemap.xml`, content and media extraction via the WP REST API. Raises specific hazards around `/wp-content/uploads/` PDFs and dated permalinks. §6.5.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| D8  | **Campus photography and video already exist**                                                 | Removes the largest design risk (§2.9). Converts to an asset-audit task: originals at full resolution, crop headroom per breakpoint, consent/rights check. Video is explicitly **not** used as a hero background.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| D9  | **GIGW / accessibility compliance applies**                                                    | Materially structural. Adds mandatory policy pages, a per-page "last reviewed" field in the content model, user-facing text-size and contrast controls, an HTML sitemap, and an accessible-document policy. Must be designed in from Phase 0. §11.2.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| D10 | **Accreditation logos available as SVG; remaining brand assets pending**                       | Unblocks the header lockup and footer logo bar (D5). The XLRI wordmark, brand guideline, and typeface licensing are still outstanding — Phase 1 proceeds with the wordmark treated as a swappable asset behind a single `<Wordmark>` component.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| D14 | **Coloured navigation field; high-contrast button removed; ticker control reduced to an icon** | Layer 2 becomes a deep brand field (`brand-900`, white labels at 11.23:1) with an accent-green active indicator — the one place the accent is legal as an interactive colour, at 6.45:1 on the dark field against 1.74:1 on white. The ticker sits on a `brand-50` tint with an `accent-700` label. The high-contrast **button** is gone from the masthead; the theme, tokens, pre-paint restore and AAA tests all remain, so re-enabling is a button rather than a rebuild. The ticker's pause control is icon-only — it cannot be removed outright without dropping the auto-scroll, because WCAG 2.2.2 requires a pause mechanism for content that moves automatically for more than five seconds. |
| D13 | **Accreditation marks go in the header masthead; removed from the footer**                     | Reverts to the original brief: XLRI wordmark left, accreditation logos right. My §2.3 concern was that colour marks at small size read as noise beside the wordmark — handled by sizing and spacing rather than by hiding them. The audience shortcuts (Students, Faculty & Staff, Alumni, Recruiters, Giving) leave the masthead for the footer, where they remain listed.                                                                                                                                                                                                                                                                                                                           |
| D12 | **Logo received; extracted from a Christmas animation**                                        | The supplied `xlri-75-logo.svg` is a seasonal promo (Santa, snowflakes, gifts, confetti) that **renders blank when animations do not run**, because the mark animates from `opacity: 0`. The mark was cleanly separable under `#logo-core`; a static, de-animated, SVGO'd lockup now lives at `public/brand/xlri-logo.svg` (10.3 kB gzip). Full analysis and remaining gaps in `docs/brand/README.md`.                                                                                                                                                                                                                                                                                                |
| D11 | **Legacy site confirmed: `https://xlridelhi.ac.in`**                                           | Audited 2026-07-26. WordPress + Elementor, 205 URLs, 1,410 media items. Full findings and their architectural consequences in **§16** — including one that revises the navigation proposal.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

Still open and _not_ blocking Phases 0–2: remaining brand assets (Q4), analytics (Q6), editorial workflow (Q7), plus two IA decisions raised by the audit (Q11, Q12). See §15.

---

## 0. Verified baseline

| Item         | Value                       | Note                                                      |
| ------------ | --------------------------- | --------------------------------------------------------- |
| Next.js      | `16.2.12`                   | App Router, RSC default, Turbopack is the default bundler |
| Tailwind CSS | `4.3.3`                     | CSS-first config via `@theme`, no `tailwind.config.js`    |
| Node         | `22.14.0` (local)           | Pin via `.nvmrc` + `engines`                              |
| React        | 19.x (bundled with Next 16) | Server Components, Server Actions, `useOptimistic`        |

Exact minor versions get pinned at scaffold time and locked (`package-lock.json` committed, `save-exact=true`). Version-specific API surface (e.g. the `use cache` / `cacheComponents` model) will be verified against the installed release's docs before adoption rather than assumed — we adopt caching primitives only once they're stable in the pinned version.

---

## 1. Requirements analysis

The brief describes this as a website. It is more accurately **three systems sharing one shell**:

| System                                                                        | Nature                               | Volume             | Change rate |
| ----------------------------------------------------------------------------- | ------------------------------------ | ------------------ | ----------- |
| **Institutional content** — About, Admissions, Campus Life, Centres, policies | Static, editorial                    | ~120–250 pages     | Weekly      |
| **Structured directories** — Faculty, Programmes, Centres, Placements         | Record-driven, filterable, templated | 300–600 records    | Monthly     |
| **Publishing streams** — News, Events, Announcements, Notices                 | Time-ordered, high churn             | Unbounded, growing | Daily       |

Consequences that must shape the architecture from day one:

1. **Almost nothing here is truly dynamic per-request.** The brief says "SSR wherever possible." For this content profile, SSR is the _wrong_ default — see §4. Static generation with incremental revalidation is strictly faster, cheaper, and more resilient.
2. **Hardcoding content into TSX will kill this project in year two.** 250 pages of JSX maintained by developers means every typo fix is a pull request and a deploy. The content layer is the single most important 8–10 year decision — see §3.
3. **The faculty directory is an application, not a page.** Search, filter by department/research area, sort, deep-linkable state, 300+ profile pages with publications. It needs a real data model, not a table in a component.
4. **The mega menu is a data structure, not a UI.** One navigation tree must drive the desktop mega menu, the mobile nav, the footer sitemap, breadcrumbs, in-section side navigation, and sitemap generation. Six consumers, one source — see §8.
5. **This is a replacement, not a greenfield launch.** An existing site holds all the search equity for "XLRI", "XLRI admissions", "XLRI PGDM". Launching without a URL-level redirect map is the highest-severity risk in the project — see §6.5.

---

## 2. Suggested improvements (before any code)

These are the changes I recommend to the brief. Each is a deliberate deviation, with reasoning.

### 2.1 Static-first, not SSR-first

**Brief:** "Server Side Rendered wherever possible."
**Recommend:** Static generation + ISR by default; SSR only where a response genuinely depends on the request.
**Why:** SSR pays a rendering cost on every hit and puts a server in the critical path of TTFB. For content that changes weekly, that cost buys nothing. Prerendered HTML served from a CDN edge gives ~20–50ms TTFB versus 200–600ms for SSR, and it survives a backend outage. Both are equally SEO-friendly — Google indexes the HTML it receives and does not care how it was produced. Content freshness is solved with on-demand revalidation (publish → webhook → `revalidateTag`), which gives near-instant updates _and_ static delivery. This is the single largest lever on the Lighthouse 95+ / green CWV target.

### 2.2 Restructure the navigation — 12 primary items is too many

**Brief:** 12 top-level links in Layer 2.
**Recommend:** 7–8 primary items + a utility row.

At 1280px with premium (larger) type, 12 items either wrap, shrink below comfortable size, or squeeze horizontal padding until the bar looks cramped — the opposite of "clean and balanced." It also flattens the information hierarchy: _Contact_ and _Academics_ are not peers.

**Revised after the legacy audit (§16)** — the original proposal was written before I could see the actual content inventory, and two sections it omitted turned out to be substantial:

- **Utility row (Layer 1, right side):** Students · Faculty & Staff · Alumni ↗ · Recruiters · News & Events · Giving ↗ · Search — small, quiet, high-frequency audience shortcuts, with `↗` marking cross-property destinations. This is the Stanford / Oxford / Harvard pattern.
- **Primary row (Layer 2), 8 items:**

  | Item                    | Absorbs (from the 205 legacy URLs)                                                                                                               |
  | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
  | **About**               | `about-xlri/*`, heritage, leadership, board of governors, vision & mission, accreditation, mandatory disclosure, careers, locations, contact     |
  | **Academics**           | PGDM-BM, MBA, DBA, PGDM for working professionals, PGP Digital HR, PGDM Innovation & Entrepreneurship, academic programmes, **Library** (§16 F4) |
  | **Executive Education** | the ~20 EDP / EMDP / MDP programmes — the single largest content mass on the site (§16 F2)                                                       |
  | **Admissions**          | Delhi-NCR specifics + clearly-marked deep links to `xlri.ac.in` (§16 F1)                                                                         |
  | **Faculty & Research**  | faculty directory (core · adjunct · visiting), the three research centres, publications, conferences, ICP                                        |
  | **Campus Life**         | the 21 `resources/*` facility pages, student life, societies, student events, gallery, campus tour                                               |
  | **Placements**          | placement, student placement record, placement reports                                                                                           |
  | **Sustainability**      | the 15 orphaned `sustainability-*` pages (§16 F4)                                                                                                |

- **In the utility row rather than primary:** Alumni (separate portal), Giving (lives on `xlri.ac.in`), News & Events, Contact (also in footer).

**One judgement call to confirm (Q12):** _Sustainability_ occupies a primary slot on the strength of its content volume — fifteen pages covering courses, research, government committees, and rural immersion. If it is not a strategic priority for the campus, it belongs under About, which frees the eighth slot for **News & Events** as a primary item. Events are the more active channel by a wide margin (42 events versus 10 posts), so that is a defensible alternative. This is an institutional-priority decision, not a technical one.

Every demoted link stays one interaction away and remains in the footer sitemap and the HTML sitemap. Nothing becomes less reachable; the bar becomes legible.

### 2.3 Accreditation logos in the masthead — as originally briefed (D13)

Layer 1 is the XLRI wordmark on the left and the AACSB, AMBA, and EQUIS marks on
the right, exactly as the brief specified.

I had proposed moving them out, on the grounds that four multicolour logos at
24px beside the wordmark read as noise in the most valuable pixels on the site.
That concern was real but the remedy was wrong: it is solved by **sizing and
spacing**, not by relocation. The marks are small, generously spaced, and hidden
below the medium breakpoint where there is genuinely no room. Triple-crown
accreditation is a real differentiator for a business school, and stating it in
the masthead is worth more than stating it in the footer.

What did leave Layer 1 were the audience shortcuts — Students, Faculty & Staff,
Alumni, Recruiters, Giving. Eight small links competing with the wordmark spent
the masthead badly; they now live in the footer and in the mobile sheet.

Consequences worth recording:

- The marks are **not** in the footer. One prominent placement beats two
  half-hearted ones.
- They carry dark ink on transparency, so they work on light surfaces only.
  Reversed versions are on the outstanding-assets list.
- Per-mark display heights, because AACSB and AMBA are single-line horizontal
  lockups while EQUIS is stacked — at equal height its wordmark comes out half
  the size. See `docs/brand/README.md`.

### 2.4 No hero carousel

Institutional sites reach for a rotating hero. It is the single worst pattern available here: it is the LCP element and it loads 3–5 large images, it causes CLS, it adds client JS above the fold, users interact with slides 2+ at roughly 1% rates, and it forces content owners to fight over slots. **Recommend:** one art-directed hero image or a static editorial composition, one headline, one primary action. If multiple messages must appear, use a "Spotlight" section below the fold with 3 static cards.

### 2.5 Fix the palette before it enters the codebase

Measured WCAG contrast for the three brand colours (sRGB relative luminance, against white `#ffffff`):

| Colour                 | Ratio on white | Verdict                                                                         |
| ---------------------- | -------------- | ------------------------------------------------------------------------------- |
| Primary Blue `#1c4e9b` | **8.04:1**     | Excellent. Body text, links, headings, focus rings — all pass AA and AAA-large. |
| Neutral Grey `#9d9e9e` | **2.69:1**     | **Fails.** Below AA text (4.5:1) and below the 3:1 UI-component minimum.        |
| Accent Green `#bccf15` | **1.74:1**     | **Fails badly.** Effectively invisible on white.                                |

Implications, which are not negotiable if we want a real WCAG AA claim:

- **`#9d9e9e` is a border and divider colour only.** It cannot be used for secondary text, placeholders, captions, disabled-but-readable labels, or icon strokes. We need a proper 11-step neutral ramp; the body-secondary text step needs to be around `#6b6d6d` (**5.33:1**) or darker.
- **`#bccf15` can never be text on white, never a link colour, never a focus ring, never an icon on a light surface.** Its contrast against _black_ is 12.1:1, so it is excellent as a **background** with near-black text, and fine as a non-informational 2–4px rule, an underline-on-dark, a chart mark, or a small key-figure block. Used that way it reads as a deliberate, confident accent — which is exactly the brief's "green only as accent."
- Focus rings use blue, not green.

We will generate full 50–950 ramps from the two brand hues plus a warm-neutral grey, and expose only _semantic_ tokens to components (`--color-ink`, `--color-ink-muted`, `--color-surface`, `--color-border`, `--color-brand`, `--color-accent`). Components never reference a raw hex or a numeric step. This is what makes a future palette adjustment a one-file change instead of a 400-file grep.

### 2.6 Folder structure corrections

- **Drop top-level `layouts/`.** The App Router already owns layouts via nested `layout.tsx`. A parallel `layouts/` folder creates two competing answers to "where does page chrome live." Structural layout _primitives_ (`Container`, `Section`, `Grid`, `Stack`) belong in `components/layout/`.
- **Merge `utils/` into `lib/`.** Two folders that mean the same thing is how a codebase rots — within a year nobody can predict which one holds `formatDate`. One `lib/`, organised by domain (`lib/seo/`, `lib/format/`, `lib/schema/`).
- **Add `content/`** — the typed content layer (see §3).
- **Add `docs/adr/`** — architecture decision records. For a 10-year, multi-developer codebase, the _reasons_ are the asset that decays fastest.

### 2.7 Make quality gates automated, not aspirational

"Lighthouse 95+" as a written goal degrades silently. As a CI gate that fails a PR, it holds for a decade. Same for accessibility and bundle size. See §11.

### 2.8 i18n — decided: English only (D6)

No `[locale]` segment, no dictionary boundary, no `hreflang`. Routes, links, canonicals, and sitemap entries all stay single-locale, which is meaningfully simpler.

The tradeoff is recorded rather than hidden: adding Hindi later would mean touching every route file, every internal link, every canonical URL, and every sitemap entry — weeks, not days. We are choosing simplicity now with that understood. Two cheap habits keep the door from locking entirely, and cost nothing today: user-facing strings live in components rather than being assembled from fragments, and internal links go through the typed route map (`constants/routes.ts`) rather than being written as inline string literals. Both are good practice regardless.

### 2.9 Asset strategy — assets exist (D8)

Campus photography and video are already available, which removes the single largest risk to the design landing as academic rather than templated. It converts into an audit task, and three specifics matter:

**1. We need the originals, not the web copies.** Images already published on the WordPress site have been resized (typically ~1200px) and lossily compressed. Re-encoding those produces visible mush at hero sizes and leaves no headroom for per-breakpoint crops. Source files should be ≥3000px on the long edge.

**2. Crop headroom, not just resolution.** Art direction means a distinct crop per breakpoint — a wide, calm 21:9 band on desktop and a tighter 4:5 on mobile are genuinely different photographs of the same scene, not one image squeezed. That requires subject placement with room around it. The audit should confirm coverage across: wide campus architecture, interiors with real light, faculty environmental portraits on a consistent setup, candid classroom and library work, and convocation.

**3. Video is not a hero background.** A looping hero video is the LCP element, ships megabytes on mobile data, and cannot be made to hit the §5 budgets. Video instead lives in a dedicated section or a campus gallery, behind a **facade**: a poster image plus a play button, with the player (or YouTube iframe) loaded only on click. For an embedded player this pattern avoids roughly 500 kB–1 MB of third-party JavaScript on initial load. Self-hosted video needs `preload="none"`, a poster, captions, and no autoplay.

**Rights and consent** need checking on any image with identifiable students or staff — this is ordinary practice, and it also intersects with the compliance obligations in §11.2.

---

## 3. Content architecture — the decision that matters most

### Recommendation: Headless CMS, with a typed content layer as the seam

**Phase 1 (now):** All content lives in `src/content/` as typed TypeScript modules and MDX, validated by Zod schemas at build time. Access is _only_ through `src/services/` repository functions:

```
getFacultyBySlug(slug) → Faculty
listProgrammes({ level }) → Programme[]
listNews({ page, tag }) → Paginated<NewsItem>
```

**Phase 2 (before handover to the comms team):** Swap the repository implementations to call a CMS. Pages, components, types, and tests do not change — the seam absorbs it.

This means we can start building today without blocking on a CMS procurement decision, and we do not pay a rewrite later. The critical discipline: **no page component ever imports from `content/` directly.** Enforced by lint rule, not by convention.

### CMS candidates

| Option                        | Fit            | Notes                                                                                                                                                                                                                                    |
| ----------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Payload CMS** (recommended) | Strong         | TypeScript-native, schema-as-code (versioned in git, reviewable in PRs), self-hostable on campus infrastructure with Postgres, can run inside the same Next app, generates types automatically, excellent editorial UX, no per-seat cost |
| **Sanity**                    | Strong         | Best-in-class editing and real-time collaboration; hosted (data leaves campus); cost scales with usage                                                                                                                                   |
| **Strapi / Directus**         | Adequate       | Self-hostable, larger admin surface, weaker TypeScript story                                                                                                                                                                             |
| **Git-based (MDX only)**      | Poor long-term | Zero cost, perfect DX, but requires non-technical staff to use git — realistically unworkable for a comms team publishing daily                                                                                                          |

Payload is recommended primarily because **self-hosting is likely to matter** for an Indian institution's IT and data-residency posture, and because schema-in-git means content model changes go through code review like everything else.

### Content model sketch

`Page` · `Programme` · `FacultyMember` · `Department` · `Centre` · `NewsArticle` · `Event` · `Announcement` · `Ranking` · `Testimonial` · `NavigationTree` · `SiteSettings` · `Redirect`

Cross-cutting fields on **every** content type:

```
slug
seo { title, description, ogImage, noindex }
status        draft | in-review | published | archived
publishedAt
updatedAt
reviewedAt    ← GIGW: displayed on the page as "Reviewed on"; distinct from updatedAt
reviewCycle   ← months; drives an editorial "due for review" queue
owner         ← responsible department/person (GIGW content ownership)
legacyUrls[]  ← source URLs from the WordPress site, feeding the redirect table (§6.5)
```

`reviewedAt`, `owner`, and `legacyUrls` exist from the first schema commit. Each is cheap now and expensive to backfill across 250 pages later — `reviewedAt` in particular cannot be honestly reconstructed after the fact.

---

## 4. Rendering strategy

**Default: static generation. Revalidate on publish. SSR only when the response depends on the request.**

| Route                                        | Strategy                              | Revalidation                                                         |
| -------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------- |
| `/`                                          | Static                                | On-demand (tag: `homepage`, `news`, `events`) + 15-min safety window |
| `/about/**`, `/campus-life/**`, policy pages | Static                                | On-demand (tag: `page:{slug}`)                                       |
| `/academics/programmes/[slug]`               | Static via `generateStaticParams`     | On-demand (tag: `programme:{slug}`)                                  |
| `/faculty` (directory)                       | Static shell + prebuilt index         | On-demand (tag: `faculty`)                                           |
| `/faculty/[slug]`                            | Static via `generateStaticParams`     | On-demand + 24h                                                      |
| `/news`, `/news/page/[n]`                    | Static, first 5 pages prebuilt        | ISR 300s + on-demand                                                 |
| `/news/[slug]`                               | Static, on-demand for new slugs       | On-demand                                                            |
| `/events`                                    | Static                                | ISR 300s (date-sensitive ordering)                                   |
| `/search`                                    | Static page, client-side index        | Rebuilt at build time                                                |
| `/admissions/apply` etc.                     | Static + Server Action for submission | —                                                                    |
| `/api/revalidate`                            | Route handler                         | —                                                                    |
| Preview mode                                 | Dynamic (draft mode)                  | —                                                                    |

**Why on-demand revalidation over short ISR windows:** an editor publishing a notice wants it live _now_, not in five minutes; and a 60s ISR window on a high-traffic page means constant background regeneration for no benefit. The webhook path gives both instant freshness and fully static delivery. The time-based window stays only as a safety net for missed webhooks.

**Streaming:** used sparingly. `loading.tsx` + Suspense boundaries around genuinely slow, below-the-fold, non-LCP regions (e.g. a live events feed). We do not stream the hero — a streamed LCP is a slower LCP.

**Draft preview:** Next's draft mode, gated behind a CMS-issued token, so editors see unpublished content at real URLs.

---

## 5. Performance strategy

### Budgets (enforced in CI — see §11)

| Metric                             | Budget       |
| ---------------------------------- | ------------ |
| First-load JS, homepage route      | ≤ 90 kB gzip |
| First-load JS, content routes      | ≤ 75 kB gzip |
| HTML document, homepage            | ≤ 60 kB gzip |
| LCP (mobile, throttled 4G)         | ≤ 2.0 s      |
| CLS                                | ≤ 0.02       |
| INP                                | ≤ 150 ms     |
| Client components above the fold   | ≤ 3          |
| Third-party scripts above the fold | 0            |

### How we hold them

**JavaScript.** Server Components are the default; `'use client'` requires justification in review. Client boundaries are pushed to leaves — a client `<MegaMenuController>` receives server-rendered panel content as `children`, so panel markup never enters the client bundle. No global state library. No animation library on the critical path (CSS transitions and `@keyframes` cover everything the brief describes — the "avoid heavy motion" constraint makes this easy). Icons are inlined SVG from a curated local set, never an icon _package_.

**Images.** `next/image` everywhere with mandatory `sizes` (lint-enforced). AVIF + WebP. Hero gets `priority` and a `fetchPriority="high"` preload; everything else lazy. Explicit `width`/`height` or a fixed `aspect-ratio` container on every image — this alone is most of the CLS budget. Art direction via `<picture>` where the mobile crop should differ from desktop. Blur placeholders generated at build, not at runtime.

**Fonts.** Two families maximum: one serif for display, one neutral sans for UI and body. Self-hosted variable fonts via `next/font/local` — no Google Fonts network request, no privacy question, no third-party origin in the critical path. Subset to `latin` + `latin-ext` (add `devanagari` only if Hindi ships). Preload the display face only. `font-display: swap` with a metric-adjusted fallback (`size-adjust`, `ascent-override`) so the swap costs ~0 CLS.

**Caching.** Immutable, content-hashed static assets (1 year). HTML at the CDN with `stale-while-revalidate`. `revalidateTag` for surgical invalidation — publishing one news item must not invalidate the programme pages.

**Third parties.** Default answer is no. Analytics: self-hosted Plausible or Umami — ~1 kB, no cookie banner, no consent-management vendor, no CWV impact. If GA4 is mandated by marketing, it loads `afterInteractive` and we accept a measurable INP cost. Any chat widget, tag manager, or embed gets a documented performance review before it is added.

**What actually breaks institutional sites** (the failure modes we are pre-empting): a rotating hero video, Google Fonts with five weights, a jQuery-era third-party events widget, unoptimised 4 MB JPEGs from the comms team, and a tag manager containing eleven forgotten scripts. Four of the five are content-governance problems, not code problems — which is why §12 exists.

---

## 6. SEO strategy

### 6.1 URL taxonomy

Human-readable, shallow, permanent. `/academics/programmes/pgdm-business-management`, `/faculty/rohit-sharma`, `/news/2026/xlri-signs-mou-with-...`. No IDs, no query-string routing for canonical content. **URLs are a public API** — once published, they change only with a 301.

### 6.2 Metadata

A single factory in `lib/seo/metadata.ts` produces every page's `Metadata` object, guaranteeing that canonical, Open Graph, and Twitter Card are always present and mutually consistent. Pages supply intent (`title`, `description`, `path`, `image`), never raw meta tags. Dynamic routes use `generateMetadata` reading from the same repository layer as the page — no duplicate fetches (React `cache()` dedupes).

OG images: static per-section defaults, plus a templated `opengraph-image.tsx` for faculty and news where a generated card (name, title, XLRI mark) beats a generic fallback.

### 6.3 Structured data

Typed JSON-LD builders (`schema-dts` for compile-time validation), injected via a `<JsonLd>` server component:

| Schema                                                                           | Where                                                 |
| -------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `CollegeOrUniversity` (+ `address`, `logo`, `sameAs`, `founder`, `foundingDate`) | Root layout                                           |
| `WebSite` + `SearchAction`                                                       | Root layout — enables sitelinks search box            |
| `BreadcrumbList`                                                                 | Every page below depth 1, generated from the nav tree |
| `EducationalOccupationalProgram`                                                 | Programme pages                                       |
| `Person` (+ `affiliation`, `jobTitle`, `knowsAbout`)                             | Faculty profiles                                      |
| `NewsArticle`                                                                    | News                                                  |
| `Event`                                                                          | Events                                                |
| `FAQPage`                                                                        | Admissions FAQ                                        |

### 6.4 Crawl infrastructure

- **Sitemap index** with per-section sitemaps (`sitemap-pages.xml`, `sitemap-faculty.xml`, `sitemap-news.xml`), generated from the repository layer with real `lastModified`. Split from day one so the news sitemap can carry a different change frequency and never hits the 50k limit.
- **`robots.ts`:** allow all; disallow `/api/`, `/preview`, `/draft`.
- **Semantic HTML:** one `<h1>` per page, no level skips, `<nav>`/`<main>`/`<article>`/`<aside>` landmarks, descriptive link text.

### 6.5 Legacy migration from WordPress (D7) — highest-risk item

The current site being WordPress is good news: the migration is largely automatable rather than a manual re-typing exercise.

**Sources of truth for the URL inventory**

- `wp-sitemap.xml` (WordPress core sitemaps, 5.5+) or `sitemap_index.xml` (Yoast / RankMath, if installed) — the complete published URL set.
- **WP REST API** at `/wp-json/wp/v2/` — `pages`, `posts`, `media`, `categories`, `tags`. Gives titles, slugs, body HTML, publish/modified dates, and media references as structured JSON. This is what makes a scripted content migration into Payload realistic for 250 pages.
- A full crawl (Screaming Frog) to catch what neither of the above knows about: orphaned pages, hand-uploaded files, hardcoded links.
- Search Console: top 1,000 URLs by impressions — this is what tells us which redirects actually _matter_.
- Analytics: top landing pages, to cross-check.

**WordPress-specific hazards to handle explicitly**

| Pattern                                           | Risk                                                                                                                                                                                                                                                                                   | Handling                                                                                                                                               |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/wp-content/uploads/**` (PDFs)                   | **Highest.** Institutional sites accumulate heavily-linked, bookmarked, and externally-cited PDFs — admission notices, brochures, results, tenders, NIRF submissions. These are frequently linked from other sites and rank on their own. Breaking them is worse than breaking a page. | Preserve the exact paths where possible (serve from the CDN at the same URL), or 301 each file to its new object-storage URL. Never let these 404.     |
| `/?p=123`, `/?page_id=45`                         | Old-style permalinks still live in external links and emails                                                                                                                                                                                                                           | Redirect rules mapping query-string IDs → new paths                                                                                                    |
| `/YYYY/MM/slug/` dated permalinks                 | Common WP default; our news URLs may differ                                                                                                                                                                                                                                            | Map to `/news/[slug]`, decide whether to keep the year segment (recommend keeping `/news/2026/slug` if the current site uses dates, to minimise churn) |
| `/category/*`, `/tag/*`, `/author/*`              | WP auto-generates these; many are thin or empty                                                                                                                                                                                                                                        | Map the ones with real traffic; `410 Gone` for genuinely dead ones rather than 301-to-home                                                             |
| `/feed/`, `/comments/feed/`                       | RSS consumers exist                                                                                                                                                                                                                                                                    | Provide a real feed at `/news/feed.xml` and redirect                                                                                                   |
| Uppercase / trailing-slash / `index.php` variants | WP is permissive; duplicates exist in the index                                                                                                                                                                                                                                        | Normalise with a single canonical form + redirect rule                                                                                                 |
| Attachment pages (`/slug/attachment/image`)       | WP generates a page per uploaded image                                                                                                                                                                                                                                                 | `410` or redirect to the parent                                                                                                                        |

**Process**

1. Build the URL inventory from all five sources; deduplicate; classify each URL as _migrate_, _merge_, _retire_, or _preserve-verbatim_.
2. Record the mapping as a `Redirect` collection in Payload (editable without a deploy) — with `next.config.ts` `redirects()` used only for the small set of static, structural rules. At a few thousand URLs, a config-file redirect list becomes a build-time and matching cost; a data-backed lookup does not.
3. **301, never 302.** Never bulk-redirect to `/` — Google treats that as a soft 404 and the equity is lost entirely. A retired page with no successor gets a `410` or a real "this has moved / see instead" page, not a redirect to the homepage.
4. Preserve `lastmod` fidelity: carry the WP `modified` dates into the new content so sitemap `lastModified` is truthful rather than "everything changed on launch day."
5. Post-launch: Search Console coverage and origin 404 logs reviewed **daily for the first month**, weekly thereafter.

**Content migration script** (Phase 6): WP REST API → normalise HTML → Payload collections, with media pulled into object storage. Body HTML from WordPress carries a decade of inline styles, `<font>` tags, nested tables, and editor cruft — it needs a sanitising pass to a constrained rich-text schema rather than being trusted verbatim. Budget real time for this; it is usually underestimated, and it is where "the migration is nearly done" projects stall.

Skipping any of this loses years of accumulated ranking for "XLRI admissions" and similar. It is the most consequential SEO work in the project and none of it is glamorous.

### 6.6 Site search

**Pagefind** — builds a static, chunked search index at build time from the rendered HTML. Zero server cost, works on static hosting, index chunks load on demand (~20 kB for a typical query), and it indexes what users actually see. If search analytics later justify typo tolerance, synonyms, and faceting, we upgrade to Typesense behind the same `services/search.ts` interface.

---

## 7. Folder structure

```
xlri-delhi/
├─ src/
│  ├─ app/                          # Routing, layouts, and route-level data loading ONLY.
│  │  ├─ (site)/                    #   Public site route group — shares header/footer chrome.
│  │  │  ├─ layout.tsx              #   Header + Footer + skip link + landmarks
│  │  │  ├─ page.tsx                #   Homepage — composes feature sections, holds no markup of its own
│  │  │  ├─ about/…
│  │  │  ├─ academics/programmes/[slug]/page.tsx
│  │  │  ├─ admissions/…
│  │  │  ├─ faculty/page.tsx
│  │  │  ├─ faculty/[slug]/page.tsx
│  │  │  ├─ research/… centres/… campus-life/…
│  │  │  ├─ executive-education/… placements/… alumni/…
│  │  │  ├─ news/[slug]/page.tsx   news/page/[page]/page.tsx
│  │  │  └─ events/[slug]/page.tsx
│  │  ├─ (policies)/                #   GIGW-mandated pages, minimal chrome: privacy, terms,
│  │  │                             #   copyright, hyperlinking, disclaimer, accessibility
│  │  │                             #   statement, screen-reader access, help, feedback
│  │  ├─ sitemap/page.tsx           #   HTML sitemap (GIGW) — 7th consumer of the nav tree
│  │  ├─ api/revalidate/route.ts    #   CMS publish webhook
│  │  ├─ sitemap.ts  robots.ts  manifest.ts
│  │  ├─ opengraph-image.tsx
│  │  ├─ not-found.tsx  error.tsx  global-error.tsx
│  │  └─ globals.css
│  │
│  ├─ components/                   # Generic, DOMAIN-FREE, reusable. Knows nothing about XLRI.
│  │  ├─ ui/                        #   Button, Link, Heading, Text, Badge, Card, Accordion,
│  │  │                             #   Tabs, Dialog, Breadcrumbs, Pagination, Stat, Quote
│  │  ├─ layout/                    #   Container, Section, Grid, Stack, Cluster, Divider, Spacer
│  │  └─ media/                     #   Figure, ResponsiveImage, VideoEmbed, LogoBar
│  │
│  ├─ features/                     # Domain slices. Composes components/. Owns XLRI meaning.
│  │  ├─ navigation/                #   SiteHeader, UtilityBar, PrimaryNav, MegaMenuPanel,
│  │  │                             #   MegaMenuController (client), MobileNav, SiteFooter
│  │  ├─ homepage/                  #   HeroSection, HighlightsSection, RankingsSection,
│  │  │                             #   ProgrammesSection, ResearchSection, FacultySection,
│  │  │                             #   CampusSection, EventsSection, NewsSection
│  │  ├─ faculty/  programmes/  news/  events/  admissions/  search/
│  │
│  ├─ content/                      # Typed content source (Phase 1). Reached only via services/.
│  ├─ services/                     # THE data boundary. Only place that talks to CMS/DB/HTTP.
│  ├─ actions/                      # 'use server' — form submissions, subscriptions, enquiries
│  ├─ lib/                          # Framework-agnostic, pure, unit-testable
│  │  ├─ seo/                       #   metadata factory, canonical helpers
│  │  ├─ schema/                    #   JSON-LD builders
│  │  ├─ format/                    #   dates, numbers, names, text truncation
│  │  ├─ validation/                #   shared Zod schemas
│  │  └─ cn.ts                      #   class merge
│  ├─ hooks/                        # Client-only React hooks
│  ├─ config/                       # site.ts, navigation.ts, seo.ts, env.ts (Zod-validated env)
│  ├─ constants/                    # Route map, breakpoints, enums, feature flags
│  ├─ types/                        # Shared/global types
│  └─ styles/                       # theme.css (@theme tokens), typography.css, base.css
│
├─ public/                          # Static, path-stable assets only (favicons, logos, robots assets)
├─ tests/
│  ├─ unit/                         # Vitest — lib/, services/ contracts
│  ├─ e2e/                          # Playwright — nav, keyboard flows, forms
│  └─ a11y/                         # axe-core sweeps over key templates
├─ docs/
│  ├─ architecture.md               # this file
│  ├─ adr/                          # decision records
│  ├─ content-model.md
│  └─ design-system.md
├─ .github/workflows/               # CI: typecheck, lint, test, a11y, Lighthouse, size-limit
└─ …tooling configs
```

### Why each folder exists

- **`app/`** — routing and nothing else. Pages orchestrate: fetch via `services/`, compose `features/`, export metadata. A page component should read like a table of contents. This keeps route files small and makes sections reusable across routes.
- **`components/`** — the design system. Domain-free by rule: a `Card` must not know what a faculty member is. This is what makes it survive a redesign; the primitives outlive the pages.
- **`features/`** — vertical slices that carry domain meaning. Colocation by feature (not by technical type) means "everything about the faculty directory" is in one folder — the single strongest predictor of whether a new developer can move quickly in year four.
- **`content/`** — the Phase 1 content source, isolated so it can be deleted when the CMS lands.
- **`services/`** — the only module allowed to know _where_ data comes from. Swapping local content for Payload touches this folder alone.
- **`actions/`** — mutations, separated from reads. Explicit `'use server'` files make the RPC surface auditable, which matters for security review.
- **`lib/`** — pure functions, no React, no Next imports. Trivially unit-testable and portable.
- **`hooks/`** — client-only, keeps the `'use client'` blast radius visible.
- **`config/`** — the values that change per environment or per year (nav tree, site metadata, env). Validated at boot so a missing env var fails the build, not a user's request.
- **`constants/`** — values that never change and must not be duplicated (route paths, breakpoints).
- **`styles/`** — Tailwind v4 `@theme` token definitions and base layer. The design system's source of truth.
- **`docs/adr/`** — why we chose things. In year five, the reasoning is worth more than the code.

### The dependency rule (enforced, not suggested)

```
app  →  features  →  components  →  lib
 ↓         ↓
services  ─┘
```

- `components/` **must never** import from `features/`, `services/`, or `content/`.
- `features/` **must never** import from another feature's internals (only its public `index.ts`).
- `content/` is importable **only** by `services/`.
- `app/` never imports from `content/`.

Enforced by `eslint-plugin-boundaries` with `error` severity. Architectural rules that are not machine-checked stop being true within about six months of multi-developer work.

---

## 8. Navigation architecture (the centrepiece)

### 8.1 One tree, six consumers

```ts
type NavNode = {
  id: string;
  label: string;
  href?: string;
  description?: string; // optional supporting line in mega panels
  icon?: IconName; // reserved for future use
  children?: NavNode[];
  featured?: FeaturedPanelCard; // optional right-rail promo within a panel
  layout?: 'columns-2' | 'columns-3' | 'columns-4' | 'split-feature';
  audience?: Audience[]; // enables audience-filtered views later
};
```

Defined once in `config/navigation.ts` (later: a CMS `NavigationTree` collection), validated by Zod at build so a malformed tree fails CI rather than rendering a broken menu. From that one tree we derive:

1. Desktop mega menu · 2. Mobile navigation · 3. Footer sitemap · 4. Breadcrumb trails · 5. In-section side navigation · 6. Sitemap candidate URLs

Adding a programme becomes a one-line data change that correctly updates six surfaces. This is the "data-driven rather than hardcoded" requirement taken to its logical end.

### 8.2 Rendering model — server-rendered panels, thin client shell

`<SiteHeader>` is a **Server Component** that renders the _entire_ navigation tree into the HTML — every mega panel, every link, present in the DOM from the first byte and hidden with `hidden`/CSS until opened.

- **SEO:** every navigation link is a real crawlable `<a>` in the initial HTML.
- **No-JS / slow-JS:** the site is fully navigable before hydration.
- **Zero CLS:** panels are absolutely positioned; opening one never reflows the page.
- **Instant open:** no fetch, no spinner, no loading state on hover.
- **Cost:** roughly 15–25 kB gzipped of extra HTML. This is the correct trade and it is what Harvard, Stanford, and Oxford all do.

Only _behaviour_ is client-side: a small `<MegaMenuController>` (`'use client'`, target ≤ 4 kB) that receives the server-rendered panels as `children`. Panel content therefore never enters the JS bundle.

### 8.3 Interaction and ARIA specification

**Use the WAI-ARIA APG "disclosure navigation menu" pattern — not `role="menubar"`/`role="menuitem"`.** This is the most common and most damaging mistake in mega-menu implementations. Menubar semantics are for application menus; applying them to site navigation removes the links from screen readers' link lists, hijacks arrow keys, and makes the menu _harder_ to use with assistive technology than plain links. Correct semantics:

- Trigger: `<button aria-expanded="true|false" aria-controls="panel-academics">`
- Panel: `<div id="panel-academics" role="group" aria-labelledby="trigger-academics">` containing ordinary `<ul><li><a>` markup
- Section headings inside the panel: real `<h2>`/`<h3>` elements

**Desktop behaviour**

| Input                                | Behaviour                                                                                   |
| ------------------------------------ | ------------------------------------------------------------------------------------------- |
| Hover onto trigger                   | Open after **100 ms** intent delay (kills accidental opens while travelling across the bar) |
| Hover off panel/trigger              | Close after **200 ms** grace (allows diagonal mouse travel into the panel)                  |
| Click trigger                        | Toggle immediately; cancel any pending timer                                                |
| Hover a different trigger while open | Switch instantly, no re-delay                                                               |
| `Escape`                             | Close, return focus to the trigger                                                          |
| `Tab` past the panel's last link     | Close, continue natural tab order                                                           |
| Click outside                        | Close                                                                                       |
| Route change                         | Close                                                                                       |
| Only one panel open at a time        | Enforced                                                                                    |

**Motion:** opacity 0→1 plus `translateY(-4px)→0` over **180 ms** `ease-out`. Transform and opacity only — never animate `height`, which forces layout on every frame. Fully suppressed under `prefers-reduced-motion: reduce`.

**Mobile / touch**

- Full-height sheet, sections as accordions built from the same tree.
- Background content receives `inert`; body scroll locked; focus returns to the toggle on close.
- Hybrid touch-capable laptops: first tap opens (no navigation), second tap follows the link — detected via `pointerType`, not viewport width.

**Sticky header:** `position: sticky` with a reserved fixed height so no layout jump on scroll. Optional condensed state (Layer 1 collapses) — a class toggle driven by a passive `IntersectionObserver` sentinel, never a scroll listener.

### 8.4 Component inventory for navigation

```
features/navigation/
├─ site-header.tsx            (server) composes the three layers
├─ utility-bar.tsx            (server) Layer 1: wordmark, audience links, search, accreditation lockup
├─ primary-nav.tsx            (server) Layer 2: triggers
├─ mega-menu-panel.tsx        (server) Layer 3: renders one NavNode's panel per its layout
├─ mega-menu-controller.tsx   (client) the ONLY client boundary — open/close/focus/keyboard
├─ dropdown-column.tsx        (server) section title + child links
├─ featured-card.tsx          (server) optional promo rail
├─ mobile-nav.tsx             (client) sheet + accordions
├─ site-footer.tsx            (server) derived from the same tree
└─ nav.types.ts / nav.schema.ts
```

---

## 9. Component architecture

**Three tiers, strictly separated:**

1. **Primitives** (`components/ui`, `components/layout`) — Button, Link, Heading, Text, Card, Badge, Stat, Accordion, Tabs, Dialog, Breadcrumbs, Pagination, Container, Section, Grid, Stack, Divider. Domain-free, prop-driven, exhaustively typed. Variants via `cva`-style maps so `<Button variant="primary" size="lg">` is type-checked and the class strings live in one place.
2. **Composites** (`features/*/components`) — ProgrammeCard, FacultyCard, NewsCard, RankingStat, EventListItem. These know the domain and compose tier 1.
3. **Sections** (`features/*/sections`) — full-width homepage and landing-page blocks. Each takes data as props and renders a `<Section>` with heading, content, and optional action. Reusable across routes: `RankingsSection` appears on the homepage _and_ on `/about`.

**Principles applied concretely**

- _Small and focused:_ a component that needs more than ~7 props or renders more than ~120 lines is a composition problem; split it.
- _Composition over configuration:_ `<Card><Card.Media/><Card.Body/><Card.Action/></Card>` rather than a `Card` with 14 boolean flags.
- _No prop drilling:_ server components fetch at the level that needs the data — RSC removes most drilling by construction. Context only where genuinely cross-cutting and client-side (currently: nothing, possibly a theme toggle if ever required).
- _Strong typing:_ `strict` + `noUncheckedIndexedAccess`. No `any`. Props extend the correct intrinsic element types so `className`, `aria-*`, and `ref` pass through. Route paths come from a typed route map, not string literals.
- _Polymorphism where it earns its keep:_ `<Heading level={2} visual="display-lg">` decouples semantic level from visual size — essential for correct heading hierarchy without design compromise.

**Design-system workbench:** a dev-only `/design-system` route rendering every primitive in every variant and state. Chosen over Storybook deliberately — zero extra dependencies, zero separate build to keep green, and it exercises the components in the real app's CSS context. Revisit if the team grows past ~6 developers.

---

## 10. Design language

**Reference points:** Oxford, Stanford, MIT, ETH Zürich. What those sites share is _editorial confidence_: strong typographic hierarchy, generous whitespace, real photography, hairline rules, restrained colour, asymmetric layouts, and near-zero decoration.

**Tokens** (Tailwind v4 `@theme`, in `styles/theme.css`)

- **Spacing:** 4px base — `4 8 12 16 24 32 48 64 96 128 160`. Section rhythm uses only the top half of the scale.
- **Radius:** `2px` / `4px` / `6px`. Nothing larger. `rounded-2xl` everywhere is a strong AI tell.
- **Elevation:** one shadow, used rarely — `0 1px 2px rgb(0 0 0/.06), 0 8px 24px -12px rgb(0 0 0/.12)`. Prefer a 1px hairline border over a shadow in almost every case.
- **Type:** serif display family + neutral sans for UI/body. Minor-third scale on mobile, major-third on desktop. Display 48–64px, body 17–18px, measure 65–75ch. Tight tracking on large display sizes, normal on body.
- **Grid:** 12 columns, 1280px content max-width (1440px for full-bleed media), gutters 24/32/48 by breakpoint.
- **Colour:** semantic tokens only (§2.5). Blue carries structure and interaction; green appears perhaps three times per page as a deliberate mark; grey does hairlines and surfaces.

**Explicitly avoided** (the "never looks AI-generated" requirement, made concrete): gradient meshes, glassmorphism, purple/violet anything, emoji as icons, the three-card feature grid with circled icons, everything centre-aligned, oversized border radii, floating decorative blobs, parallax, count-up number animations, generic stock photography, and drop shadows on text.

---

## 11. Accessibility and compliance

### 11.1 Baseline

**Target: WCAG 2.2 Level AA**, verified rather than claimed. GIGW aligns to WCAG 2.1 AA, so 2.2 AA is a superset and satisfies it on the technical criteria — the additional GIGW obligations are structural rather than technical, and are covered in §11.2.

- Semantic landmarks (`header`/`nav`/`main`/`aside`/`footer`), skip-to-content link, one `<h1>` per page, no heading-level skips.
- Full keyboard operability, including the mega menu (§8.3). Visible focus indicators at ≥3:1 against adjacent colours, using blue — never green (§2.5).
- Contrast: all text ≥4.5:1, large text and UI components ≥3:1. Enforced by keeping the failing tokens out of text roles by construction.
- Forms: real `<label>`s, `aria-describedby` for hints, errors announced via a live region and linked to fields, never colour-only error signalling.
- `prefers-reduced-motion: reduce` disables all transitions and reveals.
- 200% zoom and 320px reflow without horizontal scroll; touch targets ≥24×24px (44px for primary actions).
- Images: meaningful `alt`, decorative images `alt=""`, complex figures get long descriptions.
- A published accessibility statement with a contact route for issues.

**Automation:** `eslint-plugin-jsx-a11y` (error), axe-core sweeps in Playwright over every page template, plus manual keyboard and screen-reader passes (NVDA + VoiceOver) on navigation, forms, and the faculty directory before launch. Automated tooling catches roughly 30–40% of real issues; the manual pass is not optional. With D9 in force, the CI accessibility gate is a compliance control, not a quality nicety — it does not get skipped to unblock a release.

### 11.2 GIGW compliance (D9) — structural implications

> **Method note:** the obligations below are the ones GIGW 3.0 conventionally imposes, and they are listed here because each one has an architectural consequence that is expensive to retrofit. Before Phase 1 we should obtain the actual GIGW 3.0 document and produce a clause-by-clause compliance matrix in `docs/compliance-gigw.md`. We should not certify compliance against a checklist written from memory.

Also relevant regardless of GIGW: the **RPwD Act 2016** places accessibility obligations on establishments generally, which is the underlying legal reason this work matters rather than a procurement checkbox.

**What this changes in the architecture — all of it needs to be in from the start:**

| Obligation                                                                                                                                                          | Architectural consequence                                                                                                                                                                                                                                                                        | Cost if retrofitted                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mandatory policy pages** — Terms & Conditions, Privacy Policy, Copyright Policy, Hyperlinking Policy, Accessibility Statement, Disclaimer, Help, Feedback/Contact | A `(policies)` route group with its own minimal-chrome layout, plus a standard footer policy block linked site-wide                                                                                                                                                                              | Low — but the IA and footer design must account for ~8 extra links now                                                                                                                                                     |
| **"Last updated" / "Reviewed on" displayed per page**                                                                                                               | A `reviewedAt` field (distinct from `updatedAt`) on **every** content type in Payload, surfaced in every page template, with a review-cadence workflow for editors                                                                                                                               | **High.** Adding a date field across 250 existing pages and backfilling truthful values is genuinely painful. This must be in the schema from day one.                                                                     |
| **Text-size controls (A− A A+) and high-contrast mode**                                                                                                             | A small client preference component in the utility bar, persisting to `localStorage`, applied via a `data-*` attribute on `<html>`. Requires the semantic token layer to carry a **high-contrast variant** — every `--color-ink` / `--color-surface` / `--color-border` needs an alternate value | **Moderate to high** if tokens were built without it. We already use semantic tokens (§2.5/§10), so this is cheap _if_ the contrast variant is defined alongside the base ramp rather than bolted on.                      |
| **HTML sitemap page**                                                                                                                                               | `/sitemap` rendered from the same navigation tree as everything else (§8.1) — a seventh consumer of that one data structure                                                                                                                                                                      | Trivial, given the tree                                                                                                                                                                                                    |
| **Screen-reader access page**                                                                                                                                       | A content page listing compatible screen readers and access guidance                                                                                                                                                                                                                             | Trivial                                                                                                                                                                                                                    |
| **Accessible documents**                                                                                                                                            | PDFs must be tagged/accessible, or carry an accessible HTML equivalent. Given how many PDFs an institute publishes (§6.5), this is a real editorial burden                                                                                                                                       | **High if ignored.** Policy: notices and announcements are **HTML-first**, with PDF as a secondary download — not the other way round. Enforce in the CMS by making body content required and the PDF attachment optional. |
| **Metadata standards**                                                                                                                                              | Already satisfied by the §6.2 metadata factory                                                                                                                                                                                                                                                   | None                                                                                                                                                                                                                       |
| **Content ownership and review cycle**                                                                                                                              | Per-section owner and review cadence recorded in the CMS, not in a spreadsheet                                                                                                                                                                                                                   | Low, if `reviewedAt` exists                                                                                                                                                                                                |

**Two things I would push back on** if they come up during compliance review: a visitor counter (meaningless, and a request on every page load), and a "text-only version" of the site (a second codebase that always rots — a properly accessible single site is both the modern interpretation and genuinely better for users).

**Note on the contrast requirement and the brand palette:** a high-contrast mode makes the §2.5 findings unavoidable rather than merely advisable. The accent green at 1.74:1 on white cannot appear in a high-contrast theme in any text or interactive role at all. Defining the contrast variant at the same time as the base token ramp — Phase 0 — is what keeps this from becoming a redesign later.

---

## 12. Engineering standards, tooling, CI

**Language & lint**

- TypeScript `strict`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`, `exactOptionalPropertyTypes`.
- ESLint flat config: `next/core-web-vitals`, `@typescript-eslint` (type-aware), `jsx-a11y`, `boundaries` (§7), custom rules — no raw hex colours outside `styles/`, `next/image` requires `sizes`, no `<img>`, no `<a>` for internal routes.
- Prettier + `prettier-plugin-tailwindcss` for deterministic class ordering.
- Absolute imports via `@/*`.

**Gates (Husky + lint-staged locally; GitHub Actions on PR)**

| Gate          | Tool                                                          | Fails PR |
| ------------- | ------------------------------------------------------------- | -------- |
| Types         | `tsc --noEmit`                                                | Yes      |
| Lint / format | ESLint, Prettier                                              | Yes      |
| Unit          | Vitest (`lib/`, `services/` contracts)                        | Yes      |
| E2E           | Playwright (nav keyboard flows, mega menu, mobile nav, forms) | Yes      |
| Accessibility | axe-core over page templates                                  | Yes      |
| Performance   | Lighthouse CI with asserted budgets (§5)                      | Yes      |
| Bundle size   | `size-limit` per route                                        | Yes      |
| Commits       | Conventional Commits + commitlint                             | Yes      |

**Runtime observability:** `web-vitals` reporting field CWV to our own endpoint (or Vercel Analytics), Sentry for errors with source maps, structured logs on the revalidation webhook, and Search Console + Bing Webmaster monitored weekly post-launch.

**Governance** — the part that determines whether the site is still fast in 2030:

- Content ownership per section, with a named owner and a review cadence.
- Image upload rules enforced at the CMS layer (max dimensions, automatic conversion) — do not rely on editors.
- A written performance review requirement for any new third-party script.
- ADRs for every structural decision.

---

## 13. Hosting and infrastructure — self-hosted (D3)

Next 16 fully supports self-hosting via `output: 'standalone'`, but the platform conveniences that Vercel provides for free become **our** responsibility. Naming them explicitly, because each one is a way the CWV targets in §5 quietly fail in production.

### 13.1 What we now own

| Concern                    | Requirement                                                                                                                                                                    | Failure mode if skipped                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **Image optimisation**     | `sharp` installed in the runtime image; `images.cacheHandler` or a persistent, backed-up cache volume mounted outside the container layer                                      | Every deploy cold-starts the image cache — first visitor after each release pays multi-second LCP on every image |
| **ISR / data cache**       | A shared cache handler (Redis) as soon as we run more than one instance                                                                                                        | Instances hold divergent versions of the same page; revalidation appears to "not work" intermittently            |
| **On-demand revalidation** | Webhook must fan out to _all_ instances, or write to the shared cache                                                                                                          | Publishing updates one pod out of three                                                                          |
| **CDN**                    | Cloudflare or equivalent in front of origin. Correct cache rules: immutable for `/_next/static/*` (1 yr), `stale-while-revalidate` for HTML, **bypass for draft-mode cookies** | Either no edge caching (slow TTFB, defeats the static strategy) or draft content leaking into the public cache   |
| **TLS / HTTP2+**           | HTTP/2 minimum, HTTP/3 preferred; HSTS, correct security headers via `next.config.ts`                                                                                          | Measurable LCP penalty on HTTP/1.1; failed security review                                                       |
| **Postgres (Payload)**     | Managed or campus-hosted, with automated backups and a tested restore                                                                                                          | —                                                                                                                |
| **Media storage**          | Payload uploads to S3-compatible object storage (not the app filesystem)                                                                                                       | Uploads vanish on redeploy; horizontal scaling impossible                                                        |
| **Deploy**                 | Docker image built in CI, zero-downtime rollout, health check, one-command rollback                                                                                            | —                                                                                                                |
| **Runtime**                | Node 22 LTS pinned; process manager or orchestrator with restart policy                                                                                                        | —                                                                                                                |
| **Monitoring**             | Uptime check, origin latency, error rate, disk usage on the cache volume                                                                                                       | Silent cache-volume exhaustion degrades everything at once                                                       |

**Scope impact:** roughly 1–2 weeks of infrastructure work plus ongoing operational ownership, added as a parallel track from Phase 0 so it is ready — and load-tested — before Phase 7. Application code is unaffected by this choice; only deployment configuration and the cache handler differ.

### 13.2 Environments

`local` → `staging` (password-protected, `noindex`, production-shaped: same CDN rules, same cache handler) → `production`. Staging existing early matters here: with self-hosting, most of the risk lives in configuration, and configuration bugs only appear in a production-shaped environment.

### 13.3 Deployment topology

```
Cloudflare CDN  →  Nginx / ingress (TLS)  →  Next standalone (N instances)
                                                 ├─ Redis        (ISR + data cache, shared)
                                                 ├─ Postgres     (Payload content)
                                                 └─ S3-compatible (media)
```

Payload runs inside the same Next application (its admin UI mounted under `/admin`), which keeps deployment to a single artefact. If the comms team's editing load ever justifies isolating it, it can be split out later without touching the `services/` layer.

---

## 14. Roadmap

| Phase  | Deliverable                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Depends on                                                   |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **0**  | ✅ **Complete (2026-07-26).** Next 16.2.12 + Tailwind 4.3.3 scaffold · TypeScript strict+ · ESLint with machine-enforced layering, self-tested in CI · Prettier/Husky/lint-staged · OKLCH token layer with high-contrast variant · 44 colour-contrast assertions · `/design-system` route · ADRs 0001–0003. _Remaining:_ infrastructure track (§13.1)                                                                                                       | —                                                            |
| **0b** | ✅ **WordPress inventory complete** — 205 URLs, 1,410 media, 75 PDFs enumerated; platform, performance baseline, and nine architectural findings recorded in **§16**. _Remaining:_ classify each URL as migrate/merge/retire/preserve; asset audit of originals; GIGW compliance matrix (`docs/compliance-gigw.md`)                                                                                                                                         | Search Console (Q13), asset access (Q10), GIGW document (Q9) |
| **1**  | ✅ **Complete (2026-07-26).** Layout primitives (Container, Section, Grid, Stack, Cluster, Divider) · typography (Heading with semantic level decoupled from visual size, Text, Eyebrow) · Link with cross-property classification (§16 F1) · Button, Badge, Card, Stat, Accordion (zero-JS `<details>`), Breadcrumbs · GIGW text-size and high-contrast controls · 71 unit tests · ADR-0004. _Remaining:_ brand assets (Q4)                                | —                                                            |
| **2**  | ✅ **Complete (2026-07-26).** One Zod-validated tree in `config/navigation.ts` driving header, mega menu, mobile sheet and footer · three-layer header · 8 server-rendered panels (233 anchors, 17.5 kB gzip HTML) · APG disclosure pattern verified via DevTools, no menubar roles · mobile nav on native `<details>` so it works with JS disabled · 85 unit tests · ADR-0005. _Remaining:_ Playwright keyboard suite, per-route JS budget instrumentation | —                                                            |
| **3**  | 🔨 **In progress.** Hero complete — editorial split (no carousel, no text-over-photo), content/services seam established, LCP preload + `sizes` verified. _Next:_ Highlights, Rankings, Programmes, Research, Faculty, Campus, Events, News                                                                                                                                                                                                                 | Campus photography (Q10)                                     |
| **4**  | Inner-page templates: section landing, article, programme detail, faculty profile, generic content page                                                                                                                                                                                                                                                                                                                                                     | Phase 3                                                      |
| **5**  | Faculty directory (filter/search), news + events listings with pagination, site search (Pagefind)                                                                                                                                                                                                                                                                                                                                                           | Phase 4, content data                                        |
| **6**  | Payload integration behind the `services/` seam · **WordPress → Payload content migration script** (REST API → sanitised rich text → collections, media to object storage) · draft preview · editor training                                                                                                                                                                                                                                                | Phase 5, Phase 0b manifest                                   |
| **7**  | Launch hardening: redirect table populated and tested (including every `/wp-content/uploads/` PDF), Lighthouse/axe sweep across all templates, structured-data validation, GIGW matrix signed off, load test against the self-hosted stack, Search Console setup                                                                                                                                                                                            | All                                                          |

Phases 1–5 deliver a fully working site on typed local content — nothing is blocked on Payload. Phase 0b runs in parallel from day one because the WordPress inventory and the GIGW matrix both feed decisions in later phases, and both take calendar time rather than effort.

---

## 15. Open questions

**Resolved (see Decision log):** site scope (D1) · content source (D2) · hosting (D3) · navigation IA (D4) · accreditation treatment (D5) · i18n (D6) · legacy platform (D7) · assets (D8) · compliance (D9).

**Outstanding:**

| #   | Question                                                                                                                                                                                                                                                                                                       | Blocks                       | Needed by             |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | --------------------- |
| Q11 | **Admissions ownership (§16 F1).** All admissions content currently lives on `xlri.ac.in`. Confirm the recommendation: keep _Admissions_ in primary navigation, mixing Delhi-NCR-specific content we own with clearly-marked cross-property deep links — rather than duplicating XAT dates and procedure here. | Navigation tree              | **Phase 2**           |
| Q12 | **Sustainability vs News & Events (§2.2).** Does Sustainability warrant a primary navigation slot, or does it fold under About so that News & Events takes the eighth slot? Institutional-priority call.                                                                                                       | Navigation tree              | **Phase 2**           |
| Q4  | **Remaining brand assets.** XLRI wordmark as vector, brand guideline document, licensed typefaces. _(Accreditation SVGs received — D10.)_                                                                                                                                                                      | Header, footer, type pairing | **Phase 1**           |
| Q14 | **Canonical brand colour values.** The official artwork uses `#1B4E9B` and `#BCCF17`; the brief specifies `#1c4e9b` and `#bccf15`. Imperceptible, and no accessibility verdict changes — but a decade-long brand system needs one answer. Tokens currently use the brief's values.                             | Nothing                      | Phase 1               |
| Q15 | **Which lockup is standing, and is there a Delhi-NCR campus version?** The supplied file is named for the 75th anniversary (1949 + 75 = 2024; it is now 2026), and the mark reads "Xavier School of Management" with no campus identifier. Under D1 this site is the campus.                                   | Header, footer, JSON-LD      | **Phase 2**           |
| Q9  | **GIGW 3.0 document.** Which edition applies, and is there an existing institutional compliance assessment to build on?                                                                                                                                                                                        | Compliance matrix            | Phase 1               |
| Q10 | **Asset delivery.** Where do the original full-resolution photos and videos live, and who can provide them? (Originals, not the WordPress-resized copies — §2.9.) Also: access to the Firebase `CMS_MediaLibrary` store identified in §16 F7.                                                                  | Hero and section design      | Phase 3               |
| Q13 | **Search Console access** for `xlridelhi.ac.in`, to rank the 205 URLs by real impressions before finalising the redirect map.                                                                                                                                                                                  | Redirect prioritisation      | Phase 7 — request now |
| Q6  | **Analytics.** Self-hosted Plausible/Umami (recommended — ~1 kB, no cookie banner, no consent vendor), or is GA4 mandated?                                                                                                                                                                                     | Nothing                      | Phase 7               |
| Q7  | **Editorial team.** Who publishes, how many editors, what approval workflow? Determines Payload roles, permissions, and whether we need a review state machine.                                                                                                                                                | Nothing                      | Phase 6               |

---

---

## 16. Legacy site audit — `xlridelhi.ac.in` (measured 2026-07-26)

Phase 0b reconnaissance, run against the live site. All figures measured, not estimated.

### 16.1 Platform and scale

|                         |                                                                                                                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stack                   | WordPress + **Elementor** + Elementor Pro, PHP 8.2, LiteSpeed on Hostinger shared hosting                                                                                          |
| SEO plugin              | Yoast (`sitemap_index.xml`)                                                                                                                                                        |
| REST API                | Open and unauthenticated for content — migration is scriptable                                                                                                                     |
| **Total indexed URLs**  | **205**                                                                                                                                                                            |
| Pages                   | 115 · Posts **10** · Faculty **29** · Adjunct faculty 3 · Events **42** · taxonomy/archive 6                                                                                       |
| Media library           | **1,410 items** — 928 raster images, 274 WebP, **75 PDFs**, 8 MP4, plus stray `.ppt`/`.docx`/`.zip`                                                                                |
| Plugins on the homepage | **21**, of which **eight are competing Elementor addon packs** (essential-addons, premium-addons, master-addons, xpro, ooohboi-steroids, widgetkit, jblog-elements, ultimate-post) |

### 16.2 Performance baseline (the "before" number)

| Metric                  | Current homepage                                                                    | Our budget (§5)  | Factor |
| ----------------------- | ----------------------------------------------------------------------------------- | ---------------- | ------ |
| HTML document           | **398 kB** uncompressed                                                             | 60 kB gzip       | ~20×   |
| `<script src>` tags     | **83**                                                                              | —                | —      |
| Stylesheet links        | **89**                                                                              | —                | —      |
| Inline `<style>` blocks | 18                                                                                  | —                | —      |
| TTFB                    | **1.38 s**                                                                          | < 200 ms         | ~7×    |
| Full document load      | 2.61 s                                                                              | —                | —      |
| External origins        | Google Fonts, GTM, Facebook, YouTube, Firebase, LinkedIn, Instagram, X, Google Maps | 0 above the fold | —      |

There is also a `the-preloader` plugin installed — a spinner overlay that _deliberately delays_ first paint. 172 CSS + JS requests is the direct, predictable consequence of eight overlapping Elementor addon packs, each shipping its own stylesheet and bundle whether or not its widgets are used on the page.

This baseline is worth keeping: it makes the §5 budgets concrete for stakeholders, and it is the evidence that the rebuild is a performance project and not a reskin.

### 16.3 Findings that change the architecture

**F1 — Admissions is not on this site.** This contradicts §2.2, where I proposed _Admissions_ as a primary nav item. Every admissions path currently leaves for `xlri.ac.in`: admission procedure, XAT bulletin, XAT question papers, scholarships. Giving/donation likewise. Alumni is a separate portal (`xlrialumni.xlri.ac.in`). The ecosystem is at least six properties — `xlri.ac.in`, `acad.xlri.ac.in` (NIRF), `xceed.xlri.ac.in`, `xplore.xlri.ac.in`, `xlrialumni.xlri.ac.in`, and this site.

This needs a decision (Q11). My recommendation: **keep Admissions in the primary navigation anyway.** It is the highest-intent journey on any business-school site, and demoting it to a footer link because we do not own the content would be an own-goal. The panel should mix Delhi-NCR-specific admissions content that we _do_ own with clearly-marked deep links to `xlri.ac.in` — with cross-property links visually and programmatically signalled (an external-link affordance plus accessible text), never disguised as internal navigation. The alternative — building full admissions content here — creates two competing sources of truth for XAT dates, which is worse.

**F2 — Executive Education is versioned by URL, and it is the largest content mass.** Around twenty EDP/EMDP/MDP pages exist, many as per-batch duplicates: `...strategy-leadership-batch-3/`, `...batch-4/`, `...strategic-hr-leadership-batch-6/`, `...batch-7/`, `...digital-hr-leadership-people-analytics-batch-7/`, `...batch-8/`. Each new cohort creates a new page and a new URL.

This is a content-model defect with SEO consequences: near-duplicate pages compete with each other for the same query, dead batch pages accumulate permanently, and there is no canonical URL for "the Strategic HR Leadership programme." **Correct model: one `Programme` with a `Cohort[]` relationship.** One stable URL per programme; batch dates, fees, and brochures are data on the cohort. Past cohorts stay queryable without minting URLs. Migration folds the batch pages into their parent programme with 301s.

**F3 — The URL structure is flat, so the redirect map is near-total.** Only `about-xlri/*` and `resources/*` are nested; everything else sits at the root — `pgdm-bm/`, `placement/`, `mdp/`, `student-life/`. Posts use `/%postname%/` with no date segment. Since the new IA is hierarchical (`/academics/programmes/pgdm-bm`), **essentially all 205 URLs need redirects**, not a subset. Good news: 205 is small and fully enumerable, so this is a tractable, finishable task rather than an open-ended one.

**F4 — Two orphan sections have no home in the proposed IA.**

- **Sustainability** — fifteen root-level pages (`sustainability-history`, `-courses`, `-events`, `-mdp`, `-research-projects`, `-research-publications`, `-rural-immersion`, `-government-committees`, `-student-committees`, `-core-team`, …). This is plainly a significant institutional initiative rendered as flat pages. It needs a real `/sustainability/*` section and a nav home.
- **Library** — about ten scattered pages (`databases-library`, `ejournals-library`, `e-newspaper-magazines`, `ebooks-and-elearning`, `elearning`, `library-services`, `research-support-tools`, `contact-library`, `gallery-library`, `resources/library-home-new`). Needs a coherent `/library/*` section.

Both are addressed in the revised IA (§2.2).

**F5 — Faculty is fragmented across three post types and four pages.** `faculty` (29), `adjunct-faculty` (3), plus `core-faculty/`, `visiting-faculty/`, `faculty-index-2/`, `staff-xlri-delhi/` pages. **Correct model: one `FacultyMember` collection with a `type` field** (core · adjunct · visiting · emeritus) and a separate `StaffMember` collection. One directory, filtered — which is exactly the §1 point about the directory being an application.

**F6 — Roughly a dozen URLs are duplicates or artefacts currently being submitted to Google.** `elementor-15383/`, `home-old-2/`, `home-xlri/`, `emdp-2/`, `executive-program-in-general-management-2/`, `sustainability-core-team-2/`, `faculty-index-2/`, `5th-annual-convocation-brochure-2/`, `my-bookings/`, `categories/`, `tags/`, `tag/`, `resources/library-home-new/`. The `-2` suffix is WordPress's duplicate-slug behaviour, and `home-old-2` / `home-xlri` are abandoned homepage drafts.

These are in the Yoast sitemap, meaning the current site is actively asking Google to index duplicate and staging content. They classify as _retire_ (410, not 301). **This is also a quick win available before the rebuild ships** — excluding them from the sitemap and `noindex`-ing them would improve the current site's crawl efficiency today.

**F7 — Media is split across two stores, and one of them is fragile.** Most assets live in `/wp-content/uploads/`, but the Admission Prospectus is served from **Firebase Storage** under a signed-token URL:

```
firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/
  CMS_MediaLibrary%2FAdmissions%20e-Prospectus%202026.pdf2025-11-21T06%3A05%3A55.041Z?alt=media&token=…
```

Three problems: the access token can be rotated or revoked, breaking a top-of-funnel document; the filename is malformed (`.pdf` followed by a timestamp, then `.pdf` again — the same corruption appears in the WP library); and it is unbrandable and uncacheable by us. The `CMS_MediaLibrary` path implies **a third content system elsewhere in the ecosystem**. Migration must cover both stores, and all documents should land at clean, stable, self-hosted paths (`/documents/admissions-prospectus-2026.pdf`).

**F8 — The 75 PDFs are exactly the high-value set predicted in §6.5.** AICTE **Mandatory Disclosure**, **Final Placement Report 2024–26**, Admissions e-Prospectus, convocation brochures, and per-programme brochures. Mandatory Disclosure in particular is a regulatory publication with its own compliance expectations. Every one of these needs a preserved or redirected URL, and under §11.2 they need accessible formats or HTML equivalents.

**F9 — Elementor makes content migration harder than a normal WordPress migration.** Page bodies are Elementor layout structures, not clean rich text. The REST API's `content.rendered` returns div-soup carrying Elementor class names and inline styles from eight addon packs. It cannot be mapped cleanly into a constrained rich-text schema.

Realistic approach: script the migration of **structured** records — faculty, events, programmes, media, metadata — where the fields are well-defined, and accept **manual editorial re-entry for the layout-heavy landing pages**. With only 115 pages (of which perhaps 25 are junk or batch duplicates), that is a manageable, bounded editorial task rather than a blocker — but it must be planned and staffed, not discovered during Phase 6.

### 16.4 Artefacts produced

Held in the session scratchpad, to be committed to `docs/migration/` at Phase 0: `urls.txt` (all 205 URLs), `media_urls.txt` (1,290 enumerated media), `pdf_urls.txt` (75 PDFs), per-type sitemaps, and the homepage HTML baseline.

---

**Next step:** on your go-ahead I will begin **Phase 0** — repo scaffold, TypeScript/ESLint/Prettier/Husky with the boundary rules, Tailwind v4 token layer including the corrected colour ramps from §2.5 _and_ the high-contrast variant required by §11.2, CI gates, and the `/design-system` route — then **Phase 1** primitives and **Phase 2** navigation. Q4 (brand assets) is the only outstanding item that gates Phase 1; Phase 0 can start without it. Architectural reasoning will be recorded as ADRs in `docs/adr/` alongside the code, per §12.
