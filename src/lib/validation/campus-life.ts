import { z } from 'zod';

import type { CampusFacilityPage, CampusServicesPage } from '@/types/campus-services';
import type { CampusTourPage } from '@/types/campus-tour';
import type { CounsellingPage } from '@/types/counselling';
import type { InternalCommitteePage } from '@/types/internal-committee';
import type { StudentEvent, StudentEventsPage } from '@/types/student-events';
import type { StudentSocietiesPage } from '@/types/student-societies';

const kebab = z.string().regex(/^[a-z0-9-]+$/, 'ids must be lowercase kebab-case');
const line = z.string().min(1);

/** The browser-tab title (without the site suffix) and meta description. */
const metaSchema = z.object({ title: line, description: line });

/** A section's kicker and heading. */
const headingSchema = z.object({ eyebrow: line, title: line });

/**
 * A line the page fills in, e.g. "Stop {number} of {total}": it must keep
 * every placeholder the code supplies a value for.
 */
const template = (...keys: string[]) =>
  line.refine((value) => keys.every((key) => value.includes(`{${key}}`)), {
    message: `must contain ${keys.map((key) => `{${key}}`).join(', ')}`,
  });

/** "{count} event" / "{count} events". */
const pluralSchema = z.object({ one: template('count'), other: template('count') });

/**
 * Runtime validation for `content/campus-life/campus-tour.json`: every stop
 * needs a YouTube id, a title and a poster path, and no video may appear twice.
 */
const tourSchema = z.object({
  meta: metaSchema,
  eyebrow: line,
  title: z.string().min(1),
  intro: z.string().min(1),
  channel: z.url(),
  labels: z.object({
    stopCaption: template('number', 'area'),
    stopCount: template('number', 'total'),
    youtube: line,
    upNext: line,
    allStops: line,
    filterAll: line,
    nowShowing: line,
    channelLink: line,
  }),
  areas: z
    .array(
      z.object({
        id: kebab,
        label: z.string().min(1),
        stops: z
          .array(
            z.object({
              youtubeId: z.string().regex(/^[\w-]{11}$/, 'a YouTube id is 11 characters'),
              title: z.string().min(1),
              poster: z.string().startsWith('/', 'poster must be a path under public/'),
            }),
          )
          .min(1),
      }),
    )
    .min(1),
});

export function parseCampusTour(input: unknown, source: string): CampusTourPage {
  const result = tourSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }
  const seen = new Set<string>();
  for (const stop of result.data.areas.flatMap((area) => area.stops)) {
    if (seen.has(stop.youtubeId)) {
      throw new Error(`${source}: video "${stop.youtubeId}" appears twice`);
    }
    seen.add(stop.youtubeId);
  }
  return result.data;
}

const photoSchema = z.object({
  src: z.string().startsWith('/', 'photo must be a path under public/'),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

/**
 * Runtime validation for a services page (`mobility-within-campus.json`,
 * `sports-recreation.json`):
 * each service needs at least one photo with alt text and its pixel size, and
 * service ids, which are the sections' anchors, must be unique.
 */
const servicesSchema = z.object({
  meta: metaSchema,
  eyebrow: line,
  title: z.string().min(1),
  intro: z.string().min(1),
  facts: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).max(3),
  services: z
    .array(
      z.object({
        id: kebab,
        title: z.string().min(1),
        category: z.string().min(1),
        icon: z.enum([
          'dumbbell',
          'bank',
          'bus',
          'scissors',
          'gamepad',
          'ball',
          'users',
          'utensils',
          'coffee',
        ]),
        description: z.string().min(1),
        location: z.string().min(1).optional(),
        photos: z.array(photoSchema).min(1),
      }),
    )
    .min(1),
  tourLink: headingSchema,
  relatedHeading: headingSchema.optional(),
  related: z
    .array(
      z.object({
        label: z.string().min(1),
        description: z.string().min(1),
        href: z.string().startsWith('/', 'related links are internal paths'),
      }),
    )
    .optional(),
});

export function parseCampusServices(input: unknown, source: string): CampusServicesPage {
  const result = servicesSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }
  if (result.data.related && !result.data.relatedHeading) {
    throw new Error(`${source}: "related" needs a "relatedHeading"`);
  }
  const seen = new Set<string>();
  for (const service of result.data.services) {
    if (seen.has(service.id)) throw new Error(`${source}: service "${service.id}" appears twice`);
    seen.add(service.id);
  }
  return defined({
    ...result.data,
    services: result.data.services.map((service) => defined(service)),
  });
}

/**
 * Runtime validation for a facility page (`parking-areas.json`,
 * `medical-facilities.json`, `gardens-parks.json`). Notice contacts must be phone or mail links.
 */
const relatedSchema = z.array(
  z.object({
    label: z.string().min(1),
    description: z.string().min(1),
    href: z.string().startsWith('/', 'related links are internal paths'),
  }),
);
const noticeSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  contacts: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
        href: z.string().regex(/^(tel|mailto):/, 'contacts are tel: or mailto: links'),
      }),
    )
    .min(1),
});

const facilitySchema = z.object({
  meta: metaSchema,
  eyebrow: line,
  title: z.string().min(1),
  intro: z.string().min(1),
  photos: z.array(photoSchema).min(1),
  highlightsEyebrow: line,
  highlightsTitle: z.string().min(1),
  highlights: z
    .array(
      z.object({
        icon: z.enum([
          'sun',
          'car',
          'leaf',
          'stethoscope',
          'pill',
          'users',
          'tree',
          'path',
          'dumbbell',
          'bed',
          'home',
          'basket',
          'utensils',
          'sparkle',
          'shirt',
          'briefcase',
        ]),
        title: z.string().min(1),
        text: z.string().min(1),
      }),
    )
    .max(4),
  about: z
    .object({
      eyebrow: line,
      title: z.string().min(1),
      paragraphs: z.array(z.string().min(1)).min(1),
    })
    .optional(),
  documentsTitle: line.optional(),
  documents: z
    .array(z.object({ title: z.string().min(1), href: z.url({ protocol: /^https$/ }) }))
    .min(1)
    .optional(),
  gallery: z
    .object({ eyebrow: line, title: z.string().min(1), photos: z.array(photoSchema).min(2) })
    .optional(),
  relatedHeading: headingSchema,
  related: relatedSchema,
  notice: noticeSchema.optional(),
});

export function parseCampusFacility(input: unknown, source: string): CampusFacilityPage {
  const result = facilitySchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }
  if (result.data.documents && !result.data.documentsTitle) {
    throw new Error(`${source}: "documents" needs a "documentsTitle"`);
  }
  return defined(result.data);
}

/**
 * Runtime validation for `content/campus-life/student-societies.json`: every
 * committee names a known category, ids (which are anchors) are unique, and
 * every email is an address.
 */
const societyPhoto = photoSchema;
const societyLead = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  photo: z.string().startsWith('/', 'photo must be a path under public/'),
});
const societiesSchema = z.object({
  meta: metaSchema,
  eyebrow: line,
  title: z.string().min(1),
  lead: z.string().min(1),
  hero: societyPhoto,
  facts: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).max(3),
  life: z.array(z.string().min(1)).min(1),
  sections: z.object({
    life: headingSchema,
    annualEvents: z.object({
      title: line,
      items: z.array(z.object({ name: line, what: line })).min(1),
    }),
    council: z.object({ eyebrow: line }),
    committees: headingSchema.extend({ intro: line }),
  }),
  directory: z.object({
    filterAll: line,
    readMore: line,
    position: template('index', 'total'),
  }),
  council: z.object({
    id: kebab,
    name: z.string().min(1),
    short: z.string().min(1),
    lead: societyLead,
    email: z.email(),
    body: z.array(z.string().min(1)).min(1),
    areas: z.array(z.string().min(1)),
    photo: societyPhoto,
  }),
  categories: z.array(z.object({ id: kebab, label: z.string().min(1) })).min(1),
  committees: z
    .array(
      z.object({
        id: kebab,
        name: z.string().min(1),
        fullName: z.string().min(1).optional(),
        focus: z.string().min(1),
        category: kebab,
        lead: societyLead.optional(),
        email: z.email().optional(),
        motto: z.string().min(1).optional(),
        body: z.array(z.string().min(1)).min(1),
        listTitle: z.string().min(1).optional(),
        list: z.array(z.string().min(1)).optional(),
        photo: societyPhoto.optional(),
      }),
    )
    .min(1),
});

export function parseStudentSocieties(input: unknown, source: string): StudentSocietiesPage {
  const result = societiesSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }
  const { categories, committees, council } = result.data;
  const known = new Set(categories.map((category) => category.id));
  const seen = new Set<string>([council.id]);
  for (const committee of committees) {
    if (!known.has(committee.category)) {
      throw new Error(
        `${source}: "${committee.id}" names unknown category "${committee.category}"`,
      );
    }
    if (seen.has(committee.id)) throw new Error(`${source}: id "${committee.id}" appears twice`);
    seen.add(committee.id);
  }
  // exactOptionalPropertyTypes: zod gives absent optionals as missing keys, but
  // the inferred type says `| undefined`; drop them explicitly.
  return {
    ...result.data,
    committees: committees.map((committee) => defined(committee)),
  };
}

/** Drops keys whose value is `undefined`. */
function defined<T extends object>(value: T): { [K in keyof T]: Exclude<T[K], undefined> } {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined)) as {
    [K in keyof T]: Exclude<T[K], undefined>;
  };
}

/**
 * Runtime validation for `content/campus-life/internal-complaints-committee.json`.
 * Every FAQ needs an answer or a list, and documents must be https links.
 */
const titled = z.object({ title: z.string().min(1), text: z.string().min(1) });
const httpsUrl = z.url({ protocol: /^https$/ });
const committeeSchema = z.object({
  meta: metaSchema,
  eyebrow: line,
  title: z.string().min(1),
  headline: z.string().min(1),
  standfirst: z.string().min(1),
  intro: z.string().min(1),
  email: z.email(),
  hero: z.object({
    contactButton: line,
    processLink: line,
    writeTitle: line,
    convenerRole: template('role'),
  }),
  responsibilities: z.object({
    eyebrow: line,
    title: z.string().min(1),
    note: z.string().min(1),
    items: z.array(titled.extend({ label: z.string().min(1) })).min(1),
  }),
  harassment: z.object({
    eyebrow: line,
    title: z.string().min(1),
    note: z.string().min(1),
    items: z.array(z.string().min(1)).min(1),
  }),
  process: z.object({
    eyebrow: line,
    title: z.string().min(1),
    text: z.string().min(1),
    start: z.string().min(1),
    informal: z.object({
      label: z.string().min(1),
      step: z.string().min(1),
      outcomes: z.array(z.string().min(1)).min(1),
    }),
    formal: z.object({
      label: z.string().min(1),
      routes: z.array(z.string().min(1)).min(1),
      steps: z.array(z.string().min(1)).min(1),
      outcomes: z.array(z.object({ label: z.string().min(1), text: z.string().min(1) })).min(1),
      appealLabel: line,
      appeal: z.string().min(1),
    }),
    source: z.string().min(1),
    sourceLine: template('source'),
    diagram: photoSchema,
    diagramLink: line,
    handbook: httpsUrl,
    handbookLink: line,
  }),
  sessions: titled.extend({ eyebrow: line, photos: z.array(photoSchema) }),
  audiences: headingSchema.extend({ items: z.array(titled).min(1) }),
  filing: headingSchema.extend({ steps: z.array(titled).min(1) }),
  faqs: titled.extend({
    eyebrow: line,
    items: z
      .array(
        z
          .object({
            question: z.string().min(1),
            answer: z.array(z.string().min(1)).min(1).optional(),
            list: z.array(z.string().min(1)).min(1).optional(),
          })
          .refine((faq) => faq.answer ?? faq.list, 'each FAQ needs an answer or a list'),
      )
      .min(1),
  }),
  membersSection: headingSchema.extend({ convenerLink: line }),
  members: z
    .array(
      z.object({
        name: z.string().min(1),
        role: z.string().min(1),
        programme: z.string().min(1).optional(),
      }),
    )
    .min(1),
  documentsSection: headingSchema,
  documents: z.array(z.object({ title: z.string().min(1), href: httpsUrl })),
  contact: titled,
});

export function parseInternalCommittee(input: unknown, source: string): InternalCommitteePage {
  const result = committeeSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }
  const { faqs, members } = result.data;
  return {
    ...result.data,
    faqs: { ...faqs, items: faqs.items.map((faq) => defined(faq)) },
    members: members.map((member) => defined(member)),
  };
}

/** One event as stored: organisers are Student Societies ids, resolved by the service. */
export interface StoredStudentEvent extends Omit<StudentEvent, 'organisers'> {
  readonly organisers?: readonly string[];
}

/**
 * Runtime validation for `content/campus-life/student-events.json`: dates are
 * ISO, an end never precedes its start, every event names a known kind, and
 * ids (anchors) are unique.
 */
const eventsSchema = z.object({
  meta: metaSchema,
  eyebrow: line,
  title: z.string().min(1),
  intro: z.string().min(1),
  facts: z.object({
    events: line,
    committees: line,
    year: z.object({ value: line, label: line }),
  }),
  spotlight: z.object({ badge: line, organisers: template('names'), link: line }),
  board: headingSchema.extend({
    intro: line,
    labels: z.object({
      filterAll: line,
      undated: line,
      count: pluralSchema,
      date: line,
      time: line,
      venue: line,
      organisedBy: line,
      position: template('index', 'total'),
    }),
  }),
  kinds: z.array(z.object({ id: kebab, label: z.string().min(1) })).min(1),
  events: z
    .array(
      z.object({
        id: kebab,
        title: z.string().min(1),
        kind: kebab,
        organisers: z.array(kebab).min(1).optional(),
        start: z.iso.date().optional(),
        end: z.iso.date().optional(),
        time: z.string().min(1).optional(),
        venue: z.string().min(1).optional(),
        summary: z.string().min(1),
        poster: photoSchema,
      }),
    )
    .min(1),
});

export function parseStudentEvents(
  input: unknown,
  source: string,
): Omit<StudentEventsPage, 'events'> & { readonly events: readonly StoredStudentEvent[] } {
  const result = eventsSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }
  const kinds = new Set(result.data.kinds.map((kind) => kind.id));
  const seen = new Set<string>();
  for (const event of result.data.events) {
    if (!kinds.has(event.kind))
      throw new Error(`${source}: "${event.id}" has unknown kind "${event.kind}"`);
    if (seen.has(event.id)) throw new Error(`${source}: event "${event.id}" appears twice`);
    if (event.end && (!event.start || event.end < event.start)) {
      throw new Error(`${source}: "${event.id}" ends before it starts`);
    }
    seen.add(event.id);
  }
  return { ...result.data, events: result.data.events.map((event) => defined(event)) };
}

/** The counselling page as stored: the counsellor is a faculty id, resolved by the service. */
export type StoredCounsellingPage = Omit<CounsellingPage, 'counsellor'> & {
  readonly counsellor: { readonly facultyId: string; readonly role: string };
};

/** Runtime validation for `content/campus-life/counselling-services.json`. */
const counsellingSchema = z.object({
  meta: metaSchema,
  eyebrow: line,
  title: z.string().min(1),
  headline: z.string().min(1),
  intro: z.string().min(1),
  counsellorCard: z.object({ label: line, profileLink: line }),
  channelsHeading: headingSchema,
  channels: z
    .array(
      z.object({
        id: kebab,
        icon: z.enum(['users', 'chat']),
        label: z.string().min(1),
        title: z.string().min(1),
        text: z.string().min(1),
        pointsTitle: z.string().min(1),
        points: z.array(z.string().min(1)).min(1),
        link: z
          .object({ label: z.string().min(1), href: z.url({ protocol: /^https$/ }) })
          .optional(),
      }),
    )
    .min(1),
  closing: z.string().min(1),
  quote: z.string().min(1),
  // `before` and `after` keep their edge spaces: they sit either side of the italics.
  quoteCaption: z.object({ before: z.string(), emphasis: line, after: z.string() }),
  counsellor: z.object({ facultyId: kebab, role: z.string().min(1) }),
  notice: noticeSchema.optional(),
  relatedHeading: headingSchema,
  related: relatedSchema,
});

export function parseCounselling(input: unknown, source: string): StoredCounsellingPage {
  const result = counsellingSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }
  if (!result.data.closing.includes(result.data.quote.replace(/\.$/, ''))) {
    throw new Error(`${source}: the quote must come from the closing paragraph`);
  }
  return defined({
    ...result.data,
    channels: result.data.channels.map((channel) => defined(channel)),
  });
}
