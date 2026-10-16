import { z } from 'zod';

import {
  breadcrumbSchema,
  doi,
  kebab,
  metaSchema,
  normalisePeriods,
  publicationListLabelsSchema,
  publicationPeriodsSchema,
  uniqueIds,
} from '@/lib/validation/publications';

import type { StudentCommitteesPage } from '@/types/sustainability-committees';
import type { SustainabilityCoursesPage } from '@/types/sustainability-courses';
import type { SustainabilityEventsPage } from '@/types/sustainability-events';
import type { GovernmentCommitteesPage } from '@/types/sustainability-government';
import type { ResearchPublicationsPage } from '@/types/sustainability-publications';
import type { ResearchProjectsPage } from '@/types/sustainability-research';
import type { RuralImmersionPage } from '@/types/sustainability-rural-immersion';
import type { SustainabilityHistoryPage } from '@/types/sustainability-history';

/**
 * Runtime validation for `content/sustainability/history.json`.
 *
 * The file is edited by hand, so a missing field, a duplicate id or a year
 * out of order should fail the build with the milestone named, rather than
 * render a gap in the timeline.
 */
const text = z.string().min(1);

/** What every Sustainability page starts with: meta, breadcrumb, kicker, title. */
const pageHead = {
  meta: metaSchema,
  breadcrumb: breadcrumbSchema,
  eyebrow: text,
  title: text,
};

const milestoneSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'ids must be lowercase kebab-case — they are anchors'),
  year: z.string().regex(/^\d{4}$/, 'year must be four digits'),
  title: z.string().min(1),
  body: z.array(z.string().min(1)).min(1),
});

const historySchema = z.object({
  ...pageHead,
  facts: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).max(4),
  milestones: z.array(milestoneSchema).min(1),
  onward: z.object({ text, linkLabel: text }),
});

export function parseSustainabilityHistory(
  input: unknown,
  source: string,
): SustainabilityHistoryPage {
  const result = historySchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }

  const seen = new Set<string>();
  let previous = '';
  for (const milestone of result.data.milestones) {
    if (seen.has(milestone.id)) throw new Error(`${source}: duplicate id "${milestone.id}"`);
    seen.add(milestone.id);
    if (milestone.year < previous) {
      throw new Error(`${source}: "${milestone.id}" (${milestone.year}) is out of date order`);
    }
    previous = milestone.year;
  }
  return result.data;
}

const committeesSchema = z.object({
  ...pageHead,
  facts: z.object({ committees: text, people: text, since: text }),
  labels: z.object({ since: text, representatives: text }),
  committees: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9-]+$/, 'ids must be lowercase kebab-case — they are anchors'),
        name: z.string().min(1),
        founded: z.string().regex(/^\d{4}$/, 'founded must be four digits'),
        body: z.array(z.string().min(1)).min(1),
        representatives: z
          .array(z.object({ name: z.string().min(1), role: z.string().min(1) }))
          .min(1),
      }),
    )
    .min(1),
});

/** Runtime validation for `content/sustainability/student-committees.json`. */
export function parseStudentCommittees(input: unknown, source: string): StudentCommitteesPage {
  const result = committeesSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }
  const seen = new Set<string>();
  for (const committee of result.data.committees) {
    if (seen.has(committee.id)) throw new Error(`${source}: duplicate id "${committee.id}"`);
    seen.add(committee.id);
  }
  return result.data;
}

const coursesSchema = z.object({
  ...pageHead,
  facts: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).max(4),
  labels: z.object({ coreCourse: text, since: text }),
  courses: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9-]+$/, 'ids must be lowercase kebab-case — they are anchors'),
        name: z.string().min(1),
        since: z
          .string()
          .regex(/^\d{4}$/, 'since must be four digits')
          .optional(),
        core: z.boolean().optional(),
        body: z.array(z.string().min(1)).min(1),
        sdgs: z
          .array(z.object({ goal: z.number().int().min(1).max(17), label: z.string().min(1) }))
          .optional(),
      }),
    )
    .min(1),
});

/** Runtime validation for `content/sustainability/courses.json`. */
export function parseSustainabilityCourses(
  input: unknown,
  source: string,
): SustainabilityCoursesPage {
  const result = coursesSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }
  const seen = new Set<string>();
  const courses = result.data.courses.map(({ since, core, sdgs, ...course }) => {
    if (seen.has(course.id)) throw new Error(`${source}: duplicate id "${course.id}"`);
    seen.add(course.id);
    // Optional keys are left off rather than set to `undefined`
    // (`exactOptionalPropertyTypes`).
    return {
      ...course,
      ...(since === undefined ? {} : { since }),
      ...(core === undefined ? {} : { core }),
      ...(sdgs === undefined ? {} : { sdgs }),
    };
  });
  return { ...result.data, courses };
}

const eventsSchema = z.object({
  ...pageHead,
  facts: z.object({ total: text, series: text, first: text }),
  labels: z.object({ since: text, count: text }),
  series: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9-]+$/, 'ids must be lowercase kebab-case — they are anchors'),
        name: z.string().min(1),
        shortName: z.string().min(1),
        summary: z.string().min(1),
        orations: z
          .array(
            z.object({
              id: z.string().regex(/^[a-z0-9-]+$/, 'ids must be lowercase kebab-case'),
              date: z.iso.date().optional(),
              year: z.string().regex(/^\d{4}$/, 'year must be four digits'),
              title: z.string().min(1).optional(),
              speaker: z.string().min(1),
              bio: z.string().min(1),
            }),
          )
          .min(1),
      }),
    )
    .min(1),
});

/**
 * Runtime validation for `content/sustainability/events.json`: ids unique
 * across the page, a date's year matching `year`, and each series newest first.
 */
export function parseSustainabilityEvents(
  input: unknown,
  source: string,
): SustainabilityEventsPage {
  const result = eventsSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }
  const seen = new Set<string>();
  const series = result.data.series.map((group) => {
    let previous = '9999-99-99';
    const orations = group.orations.map(({ date, title, ...oration }) => {
      if (seen.has(oration.id)) throw new Error(`${source}: duplicate id "${oration.id}"`);
      seen.add(oration.id);
      if (date && !date.startsWith(oration.year)) {
        throw new Error(`${source}: "${oration.id}" has date ${date} but year ${oration.year}`);
      }
      const key = date ?? oration.year;
      if (key > previous) {
        throw new Error(`${source}: "${oration.id}" is out of order — newest first`);
      }
      previous = key;
      // Optional keys are left off rather than set to `undefined`
      // (`exactOptionalPropertyTypes`).
      return {
        ...oration,
        ...(date === undefined ? {} : { date }),
        ...(title === undefined ? {} : { title }),
      };
    });
    return { ...group, orations };
  });
  return { ...result.data, series };
}

const governmentSchema = z.object({
  ...pageHead,
  facts: z.object({ appointments: text, faculty: text, current: text }),
  labels: z.object({ viewProfile: text, current: text, concluded: text }),
  members: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9-]+$/, 'ids must be lowercase kebab-case'),
        name: z.string().min(1),
        teamId: z.string().min(1).optional(),
        appointments: z
          .array(
            z.object({
              id: z.string().regex(/^[a-z0-9-]+$/, 'ids must be lowercase kebab-case'),
              committee: z.string().min(1),
              role: z.string().min(1),
              organisation: z.string().min(1).optional(),
              sector: z.string().min(1),
              detail: z.string().min(1).optional(),
              period: z.string().min(1).optional(),
              current: z.boolean(),
            }),
          )
          .min(1),
      }),
    )
    .min(1),
});

/** Optional keys left off rather than set to `undefined` (`exactOptionalPropertyTypes`). */
const defined = <T extends object>(value: T) =>
  Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined)) as {
    [K in keyof T]: Exclude<T[K], undefined>;
  };

/** Runtime validation for `content/sustainability/government-committees.json`. */
export function parseGovernmentCommittees(
  input: unknown,
  source: string,
): GovernmentCommitteesPage {
  const result = governmentSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }
  const seen = new Set<string>();
  const check = (id: string) => {
    if (seen.has(id)) throw new Error(`${source}: duplicate id "${id}"`);
    seen.add(id);
  };
  const members = result.data.members.map(({ appointments, ...member }) => {
    check(member.id);
    return {
      ...defined(member),
      appointments: appointments.map((appointment) => {
        check(appointment.id);
        return defined(appointment);
      }),
    };
  });
  return { ...result.data, members };
}

const ruralImmersionSchema = z.object({
  ...pageHead,
  facts: z.array(z.object({ value: text, label: text })).max(4),
  programmesLabel: text,
  programmes: z.array(text).min(1),
  about: z.object({ eyebrow: text, heading: text }),
  intro: z.array(text).min(1),
  purpose: z.object({ heading: text, items: z.array(text).min(1) }),
  objectives: z.object({ heading: text, items: z.array(text).min(1) }),
  model: z.object({
    eyebrow: text,
    heading: text,
    name: text,
    summary: text,
    stages: z.array(text).min(2),
  }),
  outcomesHeading: text,
  outcomes: z.array(z.object({ name: text, parts: z.array(text).min(1) })).min(1),
});

/** Runtime validation for `content/sustainability/rural-immersion.json`. */
export function parseRuralImmersion(input: unknown, source: string): RuralImmersionPage {
  const result = ruralImmersionSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

const researchSchema = z.object({
  ...pageHead,
  facts: z.object({ projects: text, researchers: text, partners: text }),
  labels: z.object({ profile: text }),
  projects: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9-]+$/, 'ids must be lowercase kebab-case — they are anchors'),
        title: text,
        theme: text,
        summary: text,
        period: text.optional(),
        partners: z.object({ label: text, names: z.array(text).min(1) }),
        lead: z
          .object({ teamId: text.optional(), name: text.optional(), role: text })
          .refine((lead) => Boolean(lead.teamId) !== Boolean(lead.name), {
            message: 'a lead needs exactly one of teamId or name',
          }),
      }),
    )
    .min(1),
});

/** Runtime validation for `content/sustainability/research-projects.json`. */
export function parseResearchProjects(input: unknown, source: string): ResearchProjectsPage {
  const result = researchSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }
  const seen = new Set<string>();
  const projects = result.data.projects.map(({ lead, ...project }) => {
    if (seen.has(project.id)) throw new Error(`${source}: duplicate id "${project.id}"`);
    seen.add(project.id);
    return { ...defined(project), lead: defined(lead) };
  });
  return { ...result.data, projects };
}

const publicationsSchema = z.object({
  ...pageHead,
  contactEmail: z.email(),
  contactLabel: text,
  facts: z.object({ publications: text, cases: text, span: text }),
  sections: z.object({
    publications: z.object({ heading: text, list: publicationListLabelsSchema }),
    cases: z.object({ heading: text, tag: text, doi: text }),
  }),
  periods: publicationPeriodsSchema,
  cases: z.array(
    z.object({
      id: kebab,
      author: text,
      title: text,
      reference: text,
      publisher: text,
      date: text.optional(),
      doi: doi.optional(),
    }),
  ),
});

/** Runtime validation for `content/sustainability/research-publications.json`. */
export function parseResearchPublications(
  input: unknown,
  source: string,
): ResearchPublicationsPage {
  const result = publicationsSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`${source} is invalid:\n${z.prettifyError(result.error)}`);
  }
  const check = uniqueIds(source);
  return {
    ...result.data,
    periods: normalisePeriods(result.data.periods, check),
    cases: result.data.cases.map((teachingCase) => {
      check(teachingCase.id);
      return defined(teachingCase);
    }),
  };
}
