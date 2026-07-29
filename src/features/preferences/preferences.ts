/**
 * Display preferences required by GIGW (architecture §11.2): a text-size control
 * and a high-contrast mode.
 *
 * Both are expressed as data attributes on `<html>`, which `base.css` and
 * `theme.css` already respond to. Nothing about the preference lives in React
 * state that the styling depends on — the DOM attribute *is* the state, which is
 * what lets the pre-paint script below apply it before React exists.
 */

export const TEXT_SIZES = ['default', 'large', 'x-large'] as const;
export const CONTRAST_MODES = ['default', 'high'] as const;

export type TextSize = (typeof TEXT_SIZES)[number];
export type ContrastMode = (typeof CONTRAST_MODES)[number];

export const TEXT_SIZE_ATTR = 'data-text-size';
export const CONTRAST_ATTR = 'data-contrast';

export const TEXT_SIZE_KEY = 'xlri:text-size';
export const CONTRAST_KEY = 'xlri:contrast';

export const TEXT_SIZE_LABELS: Record<TextSize, { short: string; full: string }> = {
  default: { short: 'A', full: 'Default text size' },
  large: { short: 'A+', full: 'Large text size' },
  'x-large': { short: 'A++', full: 'Extra large text size' },
};

/**
 * Script injected before first paint.
 *
 * Restores the stored preference and stamps `data-js` on `<html>`. Two reasons
 * it must be inline and synchronous rather than an effect:
 *
 * 1. **No flash.** If the preference were applied after hydration, a user who
 *    chose high contrast would see the default theme first on every navigation.
 *    For someone who needs high contrast that is not a cosmetic nit.
 *
 * 2. **No layout shift.** `data-js` gates the visibility of the controls
 *    themselves, so they are present from the first paint rather than appearing
 *    once JS loads and pushing the header around. Without JS they never render,
 *    which is correct — a control that cannot work should not be offered.
 *
 * Wrapped in try/catch because `localStorage` throws in Safari private mode and
 * under some enterprise policies. A thrown error here would block the rest of
 * the page, so failing silently to defaults is the right behaviour.
 */
export const PREFERENCES_SCRIPT = `
(function(){
  try {
    var e = document.documentElement;
    e.setAttribute('data-js', '');
    var t = localStorage.getItem('${TEXT_SIZE_KEY}');
    if (t === 'large' || t === 'x-large') e.setAttribute('${TEXT_SIZE_ATTR}', t);
    var c = localStorage.getItem('${CONTRAST_KEY}');
    if (c === 'high') e.setAttribute('${CONTRAST_ATTR}', 'high');
  } catch (_) {}
})();
`.trim();
