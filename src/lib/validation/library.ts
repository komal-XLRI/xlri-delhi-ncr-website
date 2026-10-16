import { z } from 'zod';

import type { StoredLibraryContent } from '@/types/library';

/**
 * Runtime validation for `content/campus-life/library.json`. Collection ids
 * become URLs, so they are kebab-case and unique; a resource with no link must
 * be one used on campus.
 */
const text = z.string().min(1);
const photo = z.object({
  src: z.string().startsWith('/', 'photo must be a path under public/'),
  alt: text,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});
const person = z.object({
  kind: z.enum(['faculty', 'staff']),
  id: z.string().regex(/^[a-z0-9-]+$/),
  role: text,
  email: z.email(),
});
const external = z.object({ label: text, href: z.url(), note: text });

/** The browser-tab title (without the site suffix) and meta description. */
const meta = z.object({ title: text, description: text });
const heading = z.object({ eyebrow: text, title: text });
/** A line the page fills in: it must keep every placeholder the code supplies. */
const template = (...keys: string[]) =>
  text.refine((value) => keys.every((key) => value.includes(`{${key}}`)), {
    message: `must contain ${keys.map((key) => `{${key}}`).join(', ')}`,
  });
const subpage = z.object({ meta, title: text, intro: text });
const navGroup = z.object({ label: text, note: text });

const nav = z.object({
  searchCatalogue: text,
  menuButton: text,
  menuCounter: text,
  linkCount: z.object({ one: text, other: text }),
  groups: z.object({
    about: navGroup.extend({ links: z.object({ services: text, committee: text }) }),
    eresources: navGroup,
    access: navGroup.extend({ links: z.object({ catalogue: text, remote: text }) }),
    more: navGroup.extend({ links: z.object({ gallery: text, contact: text }) }),
  }),
});

const home = z.object({
  hero: z.object({
    catalogueButton: text,
    remoteButton: text,
    accessNote: template('remote'),
  }),
  glance: z.object({ title: text }),
  floors: heading,
  hours: z.object({ badge: text, title: text }),
  arrangements: heading,
  print: heading.extend({ newspapers: text, magazines: text, perYear: template('issues') }),
  newArrivals: heading.extend({ countLabel: text, note: text, badge: text }),
  gallery: heading.extend({ allLink: template('count') }),
});

const pages = z.object({
  services: subpage.extend({
    borrowing: z.object({ title: text, perLoan: template('period'), note: text }),
    servicesTitle: text,
    otherTitle: text,
  }),
  committee: subpage.extend({ committeeTitle: text, personnelTitle: text }),
  gallery: subpage,
  contact: subpage.extend({
    email: text,
    phone: text,
    phoneNote: text,
    hours: text,
    remoteLink: template('remote'),
  }),
  collection: z.object({
    meta: z.object({ title: template('label'), description: template('label', 'items') }),
    countLabel: text,
    signInNote: text,
    access: z.object({ open: text, 'sign-in': text, 'on-campus': text }),
    installed: text,
  }),
});

const librarySchema = z.object({
  meta,
  title: text,
  subtitle: text,
  intro: text,
  photos: z.array(photo).min(1),
  facts: z.array(z.object({ value: text, label: text })).min(1),
  floors: z.array(z.object({ badge: text, level: text, title: text, text })).min(1),
  hours: z.object({ always: text, week: z.array(z.object({ days: text, time: text })).min(1) }),
  arrangements: z.array(text).min(1),
  newspapers: z.array(text),
  magazines: z.array(
    z.object({ title: text, frequency: text, issues: z.number().int().positive() }),
  ),
  newArrivals: z.array(z.object({ title: text, author: text, cover: photo })),
  services: z
    .array(
      z
        .object({ title: text, text: text.optional(), points: z.array(text).min(1).optional() })
        .refine((service) => service.text ?? service.points, 'a service needs text or points'),
    )
    .min(1),
  otherServices: z.array(text),
  circulation: z.array(z.object({ who: text, books: text, period: text })),
  committee: z.array(person).min(1),
  personnel: z.array(person),
  collections: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9-]+$/, 'collection ids are URL slugs'),
        label: text,
        intro: text,
        items: z
          .array(
            z
              .object({
                name: text,
                description: text,
                access: z.enum(['open', 'sign-in', 'on-campus']),
                href: z.url().optional(),
              })
              .refine(
                (item) => item.href !== undefined || item.access === 'on-campus',
                'only on-campus software may have no link',
              ),
          )
          .min(1),
      }),
    )
    .min(1),
  catalogue: external,
  remote: external,
  gallery: z.array(photo).min(1),
  contact: z.object({ email: z.email(), extensions: z.array(text) }),
  nav,
  home,
  pages,
});

/** Drops keys whose value is `undefined` (exactOptionalPropertyTypes). */
const defined = <T extends object>(value: T) =>
  Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined)) as {
    [K in keyof T]: Exclude<T[K], undefined>;
  };

export function parseLibrary(input: unknown, source: string): StoredLibraryContent {
  const result = librarySchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }
  const ids = result.data.collections.map((collection) => collection.id);
  const reserved = new Set(['services', 'committee', 'gallery', 'contact']);
  for (const id of ids) {
    if (reserved.has(id)) throw new Error(`${source}: collection id "${id}" clashes with a page`);
  }
  if (new Set(ids).size !== ids.length) throw new Error(`${source}: collection ids repeat`);
  return {
    ...result.data,
    services: result.data.services.map((service) => defined(service)),
    collections: result.data.collections.map((collection) => ({
      ...collection,
      items: collection.items.map((item) => defined(item)),
    })),
  };
}
