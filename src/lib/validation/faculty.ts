import { z } from 'zod';

import type { FacultyBiography, FacultyDirectory } from '@/types/faculty';

/**
 * Runtime validation for the faculty JSON files in `content/faculty/`.
 *
 * Those files are edited by hand, so a missing field or a mistyped key should
 * fail the build with the person's name and the field, rather than render a
 * card with a blank line in it. Ids must also be unique: they are React keys
 * and URL slugs.
 */
const memberSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'ids must be lowercase kebab-case — they are URL slugs'),
  name: z.string().min(1),
  designation: z.string().min(1),
  qualification: z.string().min(1),
  areas: z.array(z.string().min(1)).min(1),
  email: z.email(),
  photo: z.string().startsWith('/', 'photo must be a path under public/, starting with /'),
});

const directorySchema = z.object({
  title: z.string().min(1),
  intro: z.array(z.string().min(1)),
  faculty: z.array(memberSchema).min(1),
});

const blockSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('subheading'), text: z.string().min(1) }),
  z.object({ type: z.literal('paragraph'), text: z.string().min(1) }),
  z.object({ type: z.literal('list'), items: z.array(z.string().min(1)).min(1) }),
]);

const biographySchema = z.object({
  qualification: z.string().min(1),
  facts: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).optional(),
  links: z.object({
    linkedin: z.url().optional(),
    scholar: z.url().optional(),
    orcid: z.url().optional(),
  }),
  sections: z.array(
    z.object({
      heading: z.string().min(1),
      blocks: z.array(blockSchema).min(1),
    }),
  ),
});

const fail = (source: string, error: z.ZodError) =>
  new Error(`Invalid faculty data in ${source}:\n${z.prettifyError(error)}`);

export function parseFacultyDirectory(input: unknown, source: string): FacultyDirectory {
  const result = directorySchema.safeParse(input);
  if (!result.success) throw fail(source, result.error);
  const seen = new Set<string>();
  for (const member of result.data.faculty) {
    if (seen.has(member.id)) {
      throw new Error(`Duplicate faculty id "${member.id}" in ${source}`);
    }
    seen.add(member.id);
  }
  return result.data;
}

/**
 * Validates a biographies file against the directory it belongs to: every
 * person listed must have a biography, and every biography must belong to
 * someone listed — a renamed id otherwise orphans a profile silently.
 */
export function parseFacultyBiographies(
  input: unknown,
  directory: FacultyDirectory,
  source: string,
): ReadonlyMap<string, FacultyBiography> {
  const result = z.record(z.string(), biographySchema).safeParse(input);
  if (!result.success) throw fail(source, result.error);
  const ids = new Set(directory.faculty.map((m) => m.id));
  for (const id of Object.keys(result.data)) {
    if (!ids.has(id)) throw new Error(`Biography "${id}" in ${source} matches no listed faculty`);
  }
  for (const id of ids) {
    if (!(id in result.data)) throw new Error(`No biography for "${id}" in ${source}`);
  }
  // `links` keys and `facts` are optional; normalise them so the shape
  // satisfies `exactOptionalPropertyTypes`.
  return new Map(
    Object.entries(result.data).map(([id, bio]) => [
      id,
      {
        qualification: bio.qualification,
        facts: bio.facts ?? [],
        links: Object.fromEntries(Object.entries(bio.links).filter(([, v]) => v !== undefined)),
        sections: bio.sections,
      },
    ]),
  );
}
