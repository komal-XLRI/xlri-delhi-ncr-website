import { describe, expect, it } from 'vitest';

import { contrastRatio, formatRatio, WCAG } from '@/lib/color/contrast';
import {
  BRAND_SEEDS,
  RAMP_STEPS,
  accent,
  brand,
  neutral,
  ramps,
  semanticBase,
  semanticHighContrast,
  surfaceWhite,
  type SemanticToken,
} from '@/styles/tokens';

/**
 * The colour system as an executable contract.
 *
 * `docs/architecture.md` §2.5 found that two of the three official brand colours
 * fail WCAG in the roles a designer would reach for first. Writing that down is
 * not enough — documented rules decay. These tests make the palette a CI gate,
 * so a token cannot be quietly moved into a role it cannot legally occupy.
 */

function assertToken(name: string, token: SemanticToken) {
  if (token.minContrast === null) return;
  const ratio = contrastRatio(token.value, token.on);
  expect(
    ratio,
    `${name} (${token.value} on ${token.on}) measured ${formatRatio(ratio)} but must clear ${token.minContrast}:1 — ${token.role}`,
  ).toBeGreaterThanOrEqual(token.minContrast);
}

describe('brand seeds are preserved exactly', () => {
  it.each(Object.entries(BRAND_SEEDS))('%s is untouched at its ramp step', (_name, seed) => {
    expect(ramps[seed.ramp][seed.step]).toBe(seed.hex);
  });

  it('the three official colours are the values the brief specified', () => {
    expect(brand[800]).toBe('#1c4e9b');
    expect(accent[300]).toBe('#bccf15');
    expect(neutral[400]).toBe('#9d9e9e');
  });
});

describe('ramps are well-formed', () => {
  it.each(Object.entries(ramps))(
    '%s has every step and is monotonically darkening',
    (_name, ramp) => {
      let previous = 0;
      for (const step of RAMP_STEPS) {
        const hex = ramp[step];
        expect(hex, `missing step ${step}`).toMatch(/^#[0-9a-f]{6}$/);

        // Contrast against white rises monotonically as the step darkens. A ramp
        // that reverses anywhere produces unpredictable pairings downstream.
        const ratio = contrastRatio(hex, surfaceWhite);
        expect(ratio, `step ${step} is not darker than the step before it`).toBeGreaterThan(
          previous,
        );
        previous = ratio;
      }
    },
  );
});

describe('base theme semantic tokens meet their contrast floors', () => {
  it.each(Object.entries(semanticBase))('%s', (name, token) => {
    assertToken(name, token);
  });
});

describe('high-contrast theme lifts every text role to AAA', () => {
  it.each(Object.entries(semanticHighContrast))('%s', (name, token) => {
    assertToken(name, token);
  });

  it('every text role clears 7:1', () => {
    for (const name of ['ink', 'ink-strong', 'ink-muted', 'brand', 'brand-hover'] as const) {
      const token = semanticHighContrast[name];
      expect(contrastRatio(token.value, token.on), `${name} must be AAA`).toBeGreaterThanOrEqual(
        WCAG.AAA_TEXT,
      );
    }
  });
});

/**
 * The findings from §2.5, pinned. If someone "fixes" the palette by lightening
 * the brand blue or brightening the accent, these fail and explain why.
 */
describe('documented palette constraints still hold', () => {
  it('primary blue clears AAA on white', () => {
    expect(contrastRatio(brand[800], surfaceWhite)).toBeGreaterThanOrEqual(WCAG.AAA_TEXT);
  });

  it('the accent green seed is illegal as text on white', () => {
    // Guarding the constraint, not the colour: this asserts the seed is unusable
    // for text so nobody reintroduces it as a link or icon colour.
    expect(contrastRatio(accent[300], surfaceWhite)).toBeLessThan(WCAG.AA_LARGE);
  });

  it('the accent green seed is legal as a background behind strong ink', () => {
    expect(contrastRatio(semanticBase['ink-strong'].value, accent[300])).toBeGreaterThanOrEqual(
      WCAG.AA_TEXT,
    );
  });

  it('the neutral grey seed is illegal as text on white', () => {
    expect(contrastRatio(neutral[400], surfaceWhite)).toBeLessThan(WCAG.AA_TEXT);
  });

  it('no semantic token uses the accent green seed in a text role', () => {
    const textRoles = ['ink', 'ink-strong', 'ink-muted', 'brand', 'brand-hover', 'focus'] as const;
    for (const role of textRoles) {
      expect(semanticBase[role].value, `${role} must not use the accent seed`).not.toBe(
        accent[300],
      );
      expect(semanticHighContrast[role].value).not.toBe(accent[300]);
    }
  });

  it('the focus ring is blue, never green', () => {
    expect(Object.values(accent)).not.toContain(semanticBase.focus.value);
    expect(Object.values(accent)).not.toContain(semanticHighContrast.focus.value);
  });
});
