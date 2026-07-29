/**
 * Regenerate the colour ramps in `src/styles/tokens.ts` from the three official
 * brand seeds, and report measured WCAG contrast for every step.
 *
 *   node scripts/generate-ramps.mjs
 *
 * Ramps are built in OKLCH so the perceived lightness steps evenly — an sRGB
 * interpolation produces ramps that look muddy in the middle and wash out at the
 * ends. Each seed is pinned at whichever step its own lightness naturally falls
 * on, so the official colours are never approximated.
 *
 * This prints; it does not write. Paste the output into tokens.ts and theme.css
 * deliberately, so a palette change always appears in a diff.
 */

const SEEDS = {
  brand: { hex: '#1c4e9b', label: 'Primary Blue' },
  accent: { hex: '#bccf15', label: 'Accent Green' },
  neutral: { hex: '#9d9e9e', label: 'Neutral Grey' },
};

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const L_TARGETS = [0.975, 0.945, 0.885, 0.815, 0.735, 0.655, 0.575, 0.5, 0.425, 0.355, 0.265];
/** Chroma envelope: muted at the ends, full through the middle. */
const C_SCALE = [0.1, 0.2, 0.42, 0.65, 0.85, 1.0, 1.0, 0.95, 0.82, 0.68, 0.5];

const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

const hexToRgb = (hex) => {
  const v = Number.parseInt(hex.replace('#', ''), 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
};

const rgbToHex = (r, g, b) =>
  '#' +
  [r, g, b]
    .map((c) =>
      Math.max(0, Math.min(255, Math.round(c * 255)))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('');

function rgbToOklab(r, g, b) {
  const [lr, lg, lb] = [toLinear(r), toLinear(g), toLinear(b)];
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function oklabToRgb(L, a, bb) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * bb) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * bb) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * bb) ** 3;
  return [
    toGamma(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    toGamma(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    toGamma(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

const oklchToRgb = (L, C, H) =>
  oklabToRgb(L, C * Math.cos((H * Math.PI) / 180), C * Math.sin((H * Math.PI) / 180));

const inGamut = ([r, g, b]) => [r, g, b].every((c) => c >= -1e-4 && c <= 1 + 1e-4);

/** Binary-search chroma down until the colour fits inside sRGB. */
function fitToGamut(L, C, H) {
  if (inGamut(oklchToRgb(L, C, H))) return oklchToRgb(L, C, H);
  let lo = 0;
  let hi = C;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut(oklchToRgb(L, mid, H))) lo = mid;
    else hi = mid;
  }
  return oklchToRgb(L, lo, H);
}

const luminance = (hex) => {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
};

const contrast = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

function buildRamp(seedHex) {
  const [L, a, b] = rgbToOklab(...hexToRgb(seedHex));
  const seedC = Math.hypot(a, b);
  const seedH = ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;

  const anchor = L_TARGETS.reduce(
    (best, target, i) => (Math.abs(target - L) < Math.abs(L_TARGETS[best] - L) ? i : best),
    0,
  );
  const peakC = seedC / C_SCALE[anchor];

  return STEPS.map((step, i) => ({
    step,
    hex:
      i === anchor
        ? seedHex.toLowerCase()
        : rgbToHex(...fitToGamut(L_TARGETS[i], peakC * C_SCALE[i], seedH)),
    isSeed: i === anchor,
  }));
}

const verdict = (ratio) =>
  ratio >= 7 ? 'AAA text' : ratio >= 4.5 ? 'AA text' : ratio >= 3 ? 'large/UI only' : 'decorative';

for (const seed of Object.values(SEEDS)) {
  const ramp = buildRamp(seed.hex);
  const anchored = ramp.find((s) => s.isSeed);
  console.log(`\n### ${seed.label} — seed ${seed.hex} pinned at step ${anchored.step}`);
  console.log('step    hex        vs #fff   verdict');
  for (const { step, hex, isSeed } of ramp) {
    const ratio = contrast(hex, '#ffffff');
    console.log(
      `${String(step).padEnd(5)} ${hex}  ${ratio.toFixed(2).padStart(6)}:1  ${verdict(ratio)}${isSeed ? '   <- SEED' : ''}`,
    );
  }
  console.log('\n// tokens.ts');
  for (const { step, hex } of ramp) console.log(`  ${step}: '${hex}',`);
}
