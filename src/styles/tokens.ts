/**
 * The single source of truth for colour.
 *
 * `theme.css` mirrors these values as CSS custom properties. This module exists
 * so the ramps can be (a) asserted against WCAG thresholds in CI and (b) rendered
 * on the `/design-system` page with live measurements. If the two ever drift,
 * `tests/unit/tokens.test.ts` fails.
 *
 * Ramps were generated in OKLCH for perceptual evenness — see
 * `scripts/generate-ramps.mjs`. Each brand seed is pinned exactly at the step
 * where its own lightness naturally falls, so the official colours survive
 * untouched: blue at 800, accent at 300, neutral at 400.
 */

export const RAMP_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
export type RampStep = (typeof RAMP_STEPS)[number];
export type Ramp = Record<RampStep, string>;

/** Primary Blue — official seed `#1c4e9b` at step 800. Carries structure and interaction. */
export const brand: Ramp = {
  50: '#f2f7ff',
  100: '#e3eeff',
  200: '#c3dbff',
  300: '#9ec4ff',
  400: '#73aaff',
  500: '#4d8ef5',
  600: '#3575d9',
  700: '#235fbb',
  800: '#1c4e9b', // seed
  900: '#113976',
  950: '#08234d',
};

/**
 * Accent Green — official seed `#bccf15` at step 300.
 *
 * The seed measures 1.74:1 against white: it is legal as a *background* with
 * dark text (8.67:1 against neutral-950) and as a non-informational rule, and
 * illegal as text, link, icon, or focus colour on a light surface. Steps 700+
 * are the text-safe greens. This constraint is enforced in tests, not trusted.
 */
export const accent: Ramp = {
  50: '#f5fae4',
  100: '#eaf2c8',
  200: '#d4e387',
  300: '#bccf15', // seed
  400: '#a4b500',
  500: '#8c9b00',
  600: '#758200',
  700: '#606b00',
  800: '#4c5400',
  900: '#3a4100',
  950: '#242900',
};

/**
 * Neutral Grey — official seed `#9d9e9e` at step 400.
 *
 * The seed measures 2.69:1 against white, so it is a hairline/divider colour
 * only. Text roles start at step 700 (6.03:1).
 */
export const neutral: Ramp = {
  50: '#f7f7f7',
  100: '#eceded',
  200: '#d9d9d9',
  300: '#c2c3c3',
  400: '#9d9e9e', // seed
  500: '#909191',
  600: '#787979',
  700: '#626363',
  800: '#4e4f4f',
  900: '#3b3c3c',
  950: '#252525',
};

export const ramps = { brand, accent, neutral } as const;
export type RampName = keyof typeof ramps;

/** The official brand colours, for the design-system page and regression tests. */
export const BRAND_SEEDS = {
  'Primary Blue': { hex: brand[800], ramp: 'brand', step: 800 },
  'Accent Green': { hex: accent[300], ramp: 'accent', step: 300 },
  'Neutral Grey': { hex: neutral[400], ramp: 'neutral', step: 400 },
} as const;

export const surfaceWhite = '#ffffff';

/*
 * A `showcase` group of supplementary colours (an olive, a deeper blue, an
 * ivory) briefly lived here for the accreditation section. It has been removed:
 * the section now draws on the same accent green and brand blue as the hero and
 * the credentials strip, which is what makes it read as part of the homepage
 * rather than as a visitor from another palette.
 *
 * Worth keeping the reasoning, because it is the argument against the next
 * addition too: three extra colours bought nothing the ramps did not already
 * cover, and every one of them was a second thing to keep in sync through a
 * rebrand. The palette is small on purpose (§2.5).
 */

/**
 * Semantic tokens — what components actually consume.
 *
 * Components never reference a ramp step directly (enforced by the `no raw hex`
 * lint rule and by review). Every value below was selected by measuring against
 * its contrast floor rather than by eye; `minContrast` records the floor that
 * the test suite holds it to.
 */
export interface SemanticToken {
  readonly value: string;
  /** Background this token is measured against. */
  readonly on: string;
  /** WCAG floor this token must clear. `null` for purely decorative roles. */
  readonly minContrast: number | null;
  readonly role: string;
}

export const semanticBase = {
  surface: { value: surfaceWhite, on: surfaceWhite, minContrast: null, role: 'Page background' },
  'surface-subtle': {
    value: neutral[50],
    on: surfaceWhite,
    minContrast: null,
    role: 'Alternating section background',
  },
  'surface-inverse': {
    value: brand[950],
    on: surfaceWhite,
    minContrast: null,
    role: 'Dark sections, footer',
  },

  ink: { value: neutral[900], on: surfaceWhite, minContrast: 4.5, role: 'Body text' },
  'ink-strong': { value: neutral[950], on: surfaceWhite, minContrast: 4.5, role: 'Headings' },
  'ink-muted': {
    value: neutral[700],
    on: surfaceWhite,
    minContrast: 4.5,
    role: 'Secondary text, captions — lightest grey still legal for text',
  },
  'ink-inverse': {
    value: surfaceWhite,
    on: brand[950],
    minContrast: 4.5,
    role: 'Text on dark surfaces',
  },

  border: {
    value: neutral[200],
    on: surfaceWhite,
    minContrast: null,
    role: 'Hairline dividers — decorative, never the sole signal',
  },
  'border-strong': {
    value: neutral[500],
    on: surfaceWhite,
    minContrast: 3,
    role: 'Input borders and other UI boundaries carrying meaning',
  },

  brand: {
    value: brand[700],
    on: surfaceWhite,
    minContrast: 4.5,
    role: 'Links and primary action',
  },
  'brand-hover': { value: brand[800], on: surfaceWhite, minContrast: 4.5, role: 'Hover/active' },
  'brand-surface': {
    value: brand[50],
    on: surfaceWhite,
    minContrast: null,
    role: 'Tinted callout background',
  },

  focus: {
    value: brand[700],
    on: surfaceWhite,
    minContrast: 3,
    role: 'Focus ring — blue, never green',
  },

  'accent-surface': {
    value: accent[300],
    on: surfaceWhite,
    minContrast: null,
    role: 'Accent block background — pairs with ink-strong, never used as text',
  },
  'accent-ink': {
    value: accent[700],
    on: surfaceWhite,
    minContrast: 4.5,
    role: 'The only green legal as text on a light surface',
  },

  /* Primary navigation bar — a deep brand field, the classic institutional
     treatment. Measured white-on-brand-900 at 11.23:1. */
  'nav-surface': {
    value: brand[900],
    on: surfaceWhite,
    minContrast: null,
    role: 'Primary navigation bar background',
  },
  'nav-ink': { value: surfaceWhite, on: brand[900], minContrast: 4.5, role: 'Navigation label' },
  'nav-ink-hover': {
    value: brand[200],
    on: brand[900],
    minContrast: 4.5,
    role: 'Navigation label on hover',
  },
  'nav-indicator': {
    value: accent[300],
    on: brand[900],
    minContrast: 3,
    role: 'Active/open navigation indicator — the accent is legal here at 6.45:1 because the field is dark',
  },

  /* Notices ticker. */
  'notice-surface': {
    value: brand[50],
    on: surfaceWhite,
    minContrast: null,
    role: 'Notices ticker background',
  },
  'notice-label': {
    value: accent[700],
    on: brand[50],
    minContrast: 4.5,
    role: 'Notices heading — the darkened accent, legal as text',
  },
} as const satisfies Record<string, SemanticToken>;

/**
 * High-contrast theme (GIGW toggle — see architecture §11.2).
 *
 * Every text role is lifted to AAA (7:1). The accent green is absent from all
 * text and interactive roles here by construction: at 1.74:1 the seed cannot
 * participate in a high-contrast theme in any legible capacity.
 */
export const semanticHighContrast = {
  surface: { value: surfaceWhite, on: surfaceWhite, minContrast: null, role: 'Page background' },
  'surface-subtle': {
    value: surfaceWhite,
    on: surfaceWhite,
    minContrast: null,
    role: 'Flattened — tinted sections lose their distinction at high contrast',
  },
  'surface-inverse': {
    value: '#000000',
    on: surfaceWhite,
    minContrast: null,
    role: 'Dark sections',
  },

  ink: { value: '#000000', on: surfaceWhite, minContrast: 7, role: 'Body text' },
  'ink-strong': { value: '#000000', on: surfaceWhite, minContrast: 7, role: 'Headings' },
  'ink-muted': {
    value: neutral[950],
    on: surfaceWhite,
    minContrast: 7,
    role: 'Secondary text — still AAA',
  },
  'ink-inverse': { value: surfaceWhite, on: '#000000', minContrast: 7, role: 'Text on dark' },

  border: {
    value: neutral[700],
    on: surfaceWhite,
    minContrast: 3,
    role: 'Dividers become visible',
  },
  'border-strong': { value: neutral[900], on: surfaceWhite, minContrast: 3, role: 'UI boundaries' },

  brand: { value: brand[800], on: surfaceWhite, minContrast: 7, role: 'Links at AAA' },
  'brand-hover': { value: brand[900], on: surfaceWhite, minContrast: 7, role: 'Hover/active' },
  'brand-surface': {
    value: surfaceWhite,
    on: surfaceWhite,
    minContrast: null,
    role: 'Flattened to white',
  },

  focus: { value: brand[900], on: surfaceWhite, minContrast: 3, role: 'Focus ring' },

  'accent-surface': {
    value: accent[900],
    on: surfaceWhite,
    minContrast: null,
    role: 'Accent survives only as a dark block with white text',
  },

  'nav-surface': {
    value: '#000000',
    on: surfaceWhite,
    minContrast: null,
    role: 'Navigation bar flattens to black',
  },
  'nav-ink': { value: surfaceWhite, on: '#000000', minContrast: 7, role: 'Navigation label' },
  'nav-ink-hover': { value: surfaceWhite, on: '#000000', minContrast: 7, role: 'Hover' },
  'nav-indicator': {
    value: surfaceWhite,
    on: '#000000',
    minContrast: 3,
    role: 'Indicator — white, not green: the accent cannot participate at high contrast',
  },
  'notice-surface': {
    value: surfaceWhite,
    on: surfaceWhite,
    minContrast: null,
    role: 'Ticker flattens to white',
  },
  'notice-label': {
    value: neutral[950],
    on: surfaceWhite,
    minContrast: 7,
    role: 'Notices heading',
  },
  'accent-ink': {
    value: accent[900],
    on: surfaceWhite,
    minContrast: 7,
    role: 'Green lifted to AAA or not used at all',
  },
} as const satisfies Record<keyof typeof semanticBase, SemanticToken>;

export type SemanticTokenName = keyof typeof semanticBase;
