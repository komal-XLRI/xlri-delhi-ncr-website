/**
 * Copy templates from the content JSON — "All {count} photos", "In {period}" —
 * filled with values computed in code.
 */

const PLACEHOLDER = /\{(\w+)\}/g;

/**
 * Replaces each `{name}` with that value. A placeholder with no value is left
 * as written, so a typo in the JSON shows on the page rather than vanishing.
 */
export function fill(template: string, values: Readonly<Record<string, string | number>>): string {
  return template.replace(PLACEHOLDER, (match, key: string) => {
    const value = values[key];
    return value === undefined ? match : String(value);
  });
}

/** The singular or plural form of a counted label, with `{count}` filled. */
export function plural(
  count: number,
  forms: { readonly one: string; readonly other: string },
): string {
  return fill(count === 1 ? forms.one : forms.other, { count });
}
