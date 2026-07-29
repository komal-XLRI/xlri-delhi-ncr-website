# Brand assets

## What we have

| File                                                             | What it is                                                                                                                                                                                              |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`public/brand/xlri-logo.svg`](../../public/brand/xlri-logo.svg) | **Usable.** Static full lockup — shield + XLRI wordmark + "Xavier School of Management" + "For the greater good". 25 KB raw, 10.3 KB gzip. Extracted, de-animated, and optimised from the source below. |
| [`source-xlri-75-logo.svg`](source-xlri-75-logo.svg)             | Provenance only. **Do not ship this file.** See below.                                                                                                                                                  |
| `public/brand/accreditations/{AACSB,AMBA,EQUIS}-logo.png`        | **Official artwork**, supplied 2026-07-26. Transparent RGBA PNGs. See "Accreditation marks" below for the sizing constraints they impose.                                                               |

Source: `https://api.xlri.edu/xlri-75-logo.svg`, retrieved 2026-07-26.

## What the source file actually is

It is not a logo asset. It is a **Christmas promotional animation** built around the
logo, exported from CorelDRAW 2021.5 and hand-augmented with CSS. Alongside the
mark it contains:

- 12 animated snowflakes (`snowDown`, 12s infinite) and a `#seasonal-bg` layer
- A flying Santa (`santaFly`, 22s infinite), swaying Christmas trees
  (`treeSway`), and bobbing/drifting gift boxes (`giftBob`, `giftDrift`)
- An 11-piece confetti burst, an `#intro-doodle` layer, and a 5s intro overlay
- Material Design palette colours unrelated to XLRI branding — `#d50000`,
  `#43a047`, `#ffc107`, `#1976d2`, `#6d4c41`, `#81d4fa`
- `feDropShadow` filters and a mask

**The most serious defect: it renders blank when animations do not run.** The
mark's own classes animate from `opacity: 0` (`.fil0 { animation: pop … both }`
with `0% { opacity: 0 }`). A static thumbnail of the source file is an entirely
white image — confirmed by rendering it. That means the logo disappears in
screenshots, PDF exports, print, email clients, Open Graph card renderers, and
any environment that does not execute CSS animation. A logo that is invisible
unless animated is not a logo.

It also runs several **infinite** animations, which would keep the compositor
working on every page for as long as the header is on screen, and which conflict
directly with the brief's "subtle animation, no floating objects, no heavy
motion".

The mark itself was cleanly separable: the source nests it under `#logo-core`
(containing `#shield` and `#wordmark`), distinct from `#seasonal-bg`, `#santa`,
`#trees`, `#gifts`, `#intro-doodle`, and `#confetti-burst`. Extraction was
therefore lossless — we stripped the decoration, removed the animation classes,
kept the five fill classes, added `role="img"` and an accessible name, and ran
SVGO. The result renders identically to the de-animated original.

## Brand colours, as used in the official artwork

| Role         | Brief     | Artwork   | Contrast on white | Verdict                             |
| ------------ | --------- | --------- | ----------------- | ----------------------------------- |
| Primary Blue | `#1c4e9b` | `#1B4E9B` | 8.04 vs 8.05      | Identical verdict (AAA)             |
| Accent Green | `#bccf15` | `#BCCF17` | 1.74 vs 1.74      | Identical verdict (decorative only) |
| Neutral Grey | `#9d9e9e` | `#9D9E9E` | 2.69              | Exact match                         |

The artwork also uses `#D4EDFC` (pale blue, inside the shield) and `#FEFEFE`
(near-white), neither of which is in the brief's palette.

Blue and green differ from the brief by one hex digit each. The difference is
imperceptible and changes no accessibility verdict — but for a brand system meant
to last a decade there should be exactly one canonical value. **Open question
(Q14): which is authoritative — the brief or the artwork?** The token layer
currently uses the brief's values.

## Accreditation marks

Official artwork, supplied 2026-07-26. Three things about these files shape how
they are used, and all three are encoded in `src/config/brand.ts` rather than
left to whoever next writes a logo bar.

| Mark  | Intrinsic | Aspect | Displayed at |
| ----- | --------- | ------ | ------------ |
| AACSB | 177 × 60  | 2.95:1 | 30px tall    |
| AMBA  | 214 × 62  | 3.45:1 | 30px tall    |
| EQUIS | 835 × 497 | 1.68:1 | 52px tall    |

**They are not the same kind of lockup.** AACSB and AMBA are single-line
horizontal marks; EQUIS is stacked — a graphic above two lines of type. Rendered
at a common height, EQUIS's wordmark comes out roughly half the size of the
others, because most of its box is the graphic. Logo bars are aligned optically,
not mechanically, so EQUIS is set taller. That is why `displayHeight` exists per
mark instead of a shared `h-10`.

**Display height is capped by source resolution.** AACSB and AMBA are only 60px
and 62px tall. At a 30px display height the 2× candidate resolves to the full
177px and 214px source widths — 1.99× and 2.06× — which is crisp. Going larger
would upscale and go soft on a retina display. **Higher-resolution or vector
versions are worth requesting** from each body; they would lift this ceiling.

**They carry dark ink** (AMBA is black, EQUIS maroon and grey) on transparency.
They work on the light strip used in the footer and would disappear on the
inverse surface. Reversed versions are on the outstanding list.

Served through `next/image` as AVIF at quality 90 — flat-colour marks band at the
default 75. Non-default quality values must be allowlisted in
`next.config.ts` (`images.qualities`), or Next silently falls back to 75.
Measured result: EQUIS drops from a 53 kB interlaced PNG to 15.9 kB AVIF.

## Usage rules

- **Do not inline the full lockup in the header.** At 10.3 KB gzip it would eat
  roughly 17% of the 60 KB homepage HTML budget on _every_ page. Serve it as
  `<img src="/brand/xlri-logo.svg">` so it is cached once, or use a simplified
  header mark with the full lockup reserved for the footer.
- The lockup has **no clear-space padding baked in** — the wordmark runs flush to
  the right edge of the viewBox. Add clear space in CSS.
- Aspect ratio is 5546.86 × 2300.14 (≈ 2.41:1). Always set both dimensions or an
  `aspect-ratio` box so it contributes no CLS.
- Never re-add animation to the mark.

## Still needed

1. **Higher-resolution or vector AACSB and AMBA marks.** The supplied PNGs cap
   crisp rendering at ~30px tall on a 2× display.
2. **Reversed accreditation marks**, for use on the inverse surface.
3. **A Delhi-NCR campus lockup.** This is the _institute_ mark — it reads "Xavier
   School of Management" with no campus identifier. Under decision D1 this site
   is the Delhi-NCR campus, so we need the campus lockup, or a documented ruling
   that the institute mark is used unmodified.
4. **A monochrome/reversed XLRI variant** for dark surfaces such as the footer.
5. **A square/icon mark** — the shield alone — for favicons, app icons, and
   Open Graph cards.
6. **Brand guidelines**, if they exist: clear space, minimum sizes, permitted
   backgrounds, and misuse rules.

_Resolved: Q15 confirmed the "75" in the source filename carries no meaning —
this is the standing mark, not a time-limited commemorative one._
