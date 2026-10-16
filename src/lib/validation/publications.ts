import { z } from 'zod';

import type { FacultyPublicationsPage, PublicationPeriod } from '@/types/publications';

/**
 * Validation for citation lists grouped into periods — the shape behind both
 * publication pages. Ids must be unique across the page; a DOI is stored bare.
 */
const text = z.string().min(1);

/**
 * Page copy every Faculty, Research and Sustainability page carries: its
 * `meta` (tab title and description) and its breadcrumb (`types/page-copy`).
 */
export const metaSchema = z.object({ title: text, description: text });
export const breadcrumbSchema = z.object({ section: text, page: text });

export const kebab = z.string().regex(/^[a-z0-9-]+$/, 'ids must be lowercase kebab-case');
export const doi = z
  .string()
  .regex(/^10\.\S+$/, 'a DOI starts with "10." and has no doi.org prefix');

export const publicationPeriodsSchema = z
  .array(
    z.object({
      id: kebab,
      label: text,
      publications: z
        .array(
          z.object({
            id: kebab,
            authors: text,
            year: z.string().regex(/^\d{4}$/, 'year must be four digits'),
            title: text,
            source: text.optional(),
            doi: doi.optional(),
            isbn: text.optional(),
          }),
        )
        .min(1),
    }),
  )
  .min(1);

/**
 * Checks ids are unique (through `check`, which the caller shares with any
 * other ids on the page) and leaves optional keys off rather than set to
 * `undefined` (`exactOptionalPropertyTypes`).
 */
export function normalisePeriods(
  periods: z.infer<typeof publicationPeriodsSchema>,
  check: (id: string) => void,
): PublicationPeriod[] {
  return periods.map((period) => {
    check(period.id);
    return {
      ...period,
      publications: period.publications.map(({ source, doi: d, isbn, ...publication }) => {
        check(publication.id);
        return {
          ...publication,
          ...(source === undefined ? {} : { source }),
          ...(d === undefined ? {} : { doi: d }),
          ...(isbn === undefined ? {} : { isbn }),
        };
      }),
    };
  });
}

/** A checker for unique ids within one file. */
export function uniqueIds(source: string) {
  const seen = new Set<string>();
  return (id: string) => {
    if (seen.has(id)) throw new Error(`${source}: duplicate id "${id}"`);
    seen.add(id);
  };
}

/** The shared list's filter, count and row labels (`PublicationListLabels`). */
export const publicationListLabelsSchema = z.object({
  allYears: text,
  searchPlaceholder: text,
  showing: text,
  clearFilters: text,
  noMatch: text,
  doi: text,
  isbn: text,
});

const facultyPublicationsSchema = z.object({
  meta: metaSchema,
  breadcrumb: breadcrumbSchema,
  eyebrow: text,
  title: text,
  facts: z.object({ total: text, years: text, latest: text }),
  list: publicationListLabelsSchema,
  periods: publicationPeriodsSchema,
});

/** Runtime validation for `content/research/publications.json`. */
export function parseFacultyPublications(input: unknown, source: string): FacultyPublicationsPage {
  const result = facultyPublicationsSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }
  return { ...result.data, periods: normalisePeriods(result.data.periods, uniqueIds(source)) };
}
