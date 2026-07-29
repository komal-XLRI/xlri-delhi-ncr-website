/**
 * Brand assets, declared as data.
 *
 * Q4 asked that the site ship placeholders and be architected so official
 * artwork could be swapped in without code changes. This file is that seam, and
 * it has already earned itself once: the accreditation marks arrived as PNGs at
 * different sizes and aspect ratios from the placeholder SVGs, and adopting them
 * touched only this file and one style attribute.
 *
 * **Every brand image on the site resolves through this module.** No component
 * hardcodes an asset path. Adopting a new asset is:
 *
 *   1. drop the file into `public/brand/…`
 *   2. update its entry here — `src`, intrinsic `width`/`height`, `placeholder`
 *
 * Dimensions are declared alongside each asset because every one of them is
 * rendered with explicit width and height to hold its space — an unsized logo in
 * a sticky header is a guaranteed layout shift, and the CLS budget is 0.02 (§5).
 */

export interface BrandAsset {
  readonly src: string;
  /** Intrinsic dimensions. Used to reserve space and prevent CLS. */
  readonly width: number;
  readonly height: number;
  /**
   * `true` while this is a stand-in. Surfaced in the design-system page so the
   * outstanding assets are visible rather than quietly forgotten.
   */
  readonly placeholder: boolean;
}

export interface AccreditationMark extends BrandAsset {
  readonly id: string;
  readonly name: string;
  readonly fullName: string;
  /**
   * Rendered height in CSS pixels.
   *
   * Per-mark rather than a shared `h-10`, because these three marks are
   * different *kinds* of lockup and a uniform height makes them look wrong:
   *
   *   • AACSB and AMBA are single-line horizontal marks (2.95:1 and 3.45:1)
   *   • EQUIS is a stacked mark — graphic above two lines of type (1.68:1)
   *
   * At equal height EQUIS's wordmark renders roughly half the size of the other
   * two, because most of its box is the graphic. Logo bars are aligned
   * optically, not mechanically, so EQUIS is set taller to bring its type back
   * into balance.
   *
   * The heights are also bounded by source resolution: AACSB and AMBA are only
   * 60px and 62px tall, so anything above ~30px is upscaled and goes soft on a
   * 2× display. See `docs/brand/README.md` — higher-resolution or vector
   * versions are worth requesting.
   */
  readonly displayHeight: number;
}

/**
 * The institutional lockup: shield, XLRI wordmark, "Xavier School of
 * Management", and the tagline.
 *
 * Real artwork, extracted from the file supplied for Q4 — see
 * `docs/brand/README.md` for what had to be removed. Q15 confirmed the "75" in
 * the source filename carries no meaning, so this is the standing mark.
 *
 * It carries no campus identifier. The masthead renders the mark alone — the
 * campus is conveyed by the domain, page titles, and footer. If an official
 * Delhi-NCR lockup ever arrives, pointing `src` at it is the whole change.
 */
export const wordmark: BrandAsset = {
  src: '/brand/xlri-logo.svg',
  width: 5547,
  height: 2300,
  placeholder: false,
};

/**
 * Triple-crown accreditation. Genuine trust signals for a business school, and
 * the reason for the three-tier treatment in §2.3 — a quiet monochrome lockup in
 * the header, full colour below the hero and in the footer.
 *
 * Official artwork, supplied 2026-07-26. All three are RGBA PNGs with
 * transparent backgrounds, so they sit correctly on the light strip used in the
 * footer. They carry dark ink (AMBA is black, EQUIS maroon and grey) and would
 * disappear on a dark surface — reversed versions are still worth requesting if
 * the marks are ever needed on the inverse background.
 */
export const accreditations: readonly AccreditationMark[] = [
  {
    id: 'aacsb',
    name: 'AACSB',
    fullName: 'Association to Advance Collegiate Schools of Business',
    src: '/brand/accreditations/AACSB-logo.png',
    width: 177,
    height: 60,
    displayHeight: 30,
    placeholder: false,
  },
  {
    id: 'amba',
    name: 'AMBA',
    fullName: 'Association of MBAs',
    src: '/brand/accreditations/AMBA-logo.png',
    width: 214,
    height: 62,
    displayHeight: 30,
    placeholder: false,
  },
  {
    id: 'equis',
    name: 'EQUIS',
    fullName: 'EFMD Quality Improvement System',
    src: '/brand/accreditations/EQUIS-logo.png',
    width: 835,
    height: 497,
    // Stacked mark: taller so its wordmark reads at the same size as the others.
    displayHeight: 52,
    placeholder: false,
  },
];

/**
 * Resolve a mark by id.
 *
 * The seam between editorial copy and artwork. Content stores `markId`
 * (`types/homepage.ts`) because it may not import this module; the feature
 * calls this to get the drawing, the name, and the full name — so those three
 * are spelled once, here, and a card cannot drift from the header lockup.
 *
 * Returns `undefined` rather than throwing. A CMS entry naming a mark that has
 * since been removed should cost that one card, not the page.
 */
export function getAccreditationMark(id: string): AccreditationMark | undefined {
  return accreditations.find((mark) => mark.id === id);
}

/** Assets still awaiting official artwork. Rendered on the design-system page. */
export const outstandingBrandAssets: readonly string[] = [
  ...accreditations.filter((mark) => mark.placeholder).map((mark) => `${mark.name} logo`),
  'Higher-resolution or vector AACSB and AMBA marks — the supplied PNGs are only 60px tall, which caps crisp rendering at ~30px on a 2x display',
  'Reversed accreditation marks for use on dark surfaces',
  'Monochrome / reversed XLRI lockup for dark surfaces',
  'Square shield mark for favicon, app icons, and Open Graph cards',
  'Delhi-NCR campus lockup (or a ruling that the institute mark is used as-is)',
  'Campus photography at full resolution',
];
