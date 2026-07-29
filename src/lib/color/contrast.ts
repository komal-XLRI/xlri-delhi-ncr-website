/**
 * WCAG 2.x contrast utilities.
 *
 * These exist as real code rather than a spreadsheet because the colour
 * decisions in `docs/architecture.md` §2.5 are load-bearing: the accent green
 * fails against white by a wide margin, and the neutral grey fails for text.
 * Encoding the thresholds here lets `tests/unit/tokens.test.ts` fail the build
 * if a token is ever moved into a role it cannot legally occupy.
 *
 * Pure functions, no framework imports — see the layering rule in §7.
 */

/** WCAG minimum contrast ratios. */
export const WCAG = {
  /** Body text, AA. */
  AA_TEXT: 4.5,
  /** Large text (>=24px, or >=18.66px bold) and UI components/graphics, AA. */
  AA_LARGE: 3,
  /** Body text, AAA — the floor for the high-contrast theme. */
  AAA_TEXT: 7,
} as const;

export type Rgb = readonly [r: number, g: number, b: number];

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/** Parse `#rgb` or `#rrggbb` into channels normalised to 0–1. */
export function hexToRgb(hex: string): Rgb {
  const match = HEX_PATTERN.exec(hex.trim());
  if (!match?.[1]) {
    throw new Error(`Invalid hex colour: ${hex}`);
  }

  const digits = match[1];
  const full =
    digits.length === 3
      ? digits
          .split('')
          .map((d) => d + d)
          .join('')
      : digits;

  // Non-null assertions are safe: `full` is exactly 6 hex digits by construction,
  // but `noUncheckedIndexedAccess` cannot know that.
  const value = Number.parseInt(full, 16);
  return [((value >> 16) & 0xff) / 255, ((value >> 8) & 0xff) / 255, (value & 0xff) / 255];
}

/** Undo the sRGB transfer function for one channel. */
function toLinear(channel: number): number {
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

/** Relative luminance per WCAG 2.x. */
export function relativeLuminance(color: string | Rgb): number {
  const [r, g, b] = typeof color === 'string' ? hexToRgb(color) : color;
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Contrast ratio between two colours, from 1 (identical) to 21 (black on white).
 * Order-independent.
 */
export function contrastRatio(foreground: string | Rgb, background: string | Rgb): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Round a ratio the way contrast checkers report it, e.g. `8.04`. */
export function formatRatio(ratio: number): string {
  return `${(Math.floor(ratio * 100) / 100).toFixed(2)}:1`;
}

/** Does this pairing clear the given WCAG threshold? */
export function meetsContrast(
  foreground: string,
  background: string,
  threshold: number = WCAG.AA_TEXT,
): boolean {
  return contrastRatio(foreground, background) >= threshold;
}
