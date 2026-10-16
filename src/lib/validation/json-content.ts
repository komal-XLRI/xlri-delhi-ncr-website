/**
 * Typing for content kept in JSON files.
 *
 * A JSON import has the right structure but loses literal types: an icon
 * name `"book"` arrives as `string`, so it will not assign to a union such as
 * `'book' | 'compass'`. `JsonShape<T>` is `T` with every string literal
 * widened back to `string`, so the compiler still checks the whole file —
 * every field present, every field the right kind of value — against the type
 * the page expects.
 */
export type JsonShape<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly JsonShape<Item>[]
    : T extends object
      ? { readonly [K in keyof T]: JsonShape<T[K]> }
      : T;

/**
 * Content from a JSON file as its page type. The structure is checked at
 * compile time; the fixed-choice values (icon names, kinds) are taken as
 * written, and a misspelt one shows when the page renders at build.
 */
export function fromJson<T>(json: JsonShape<T>): T {
  return json as T;
}
