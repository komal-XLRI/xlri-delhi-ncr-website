import sustainabilityCourses from '@/content/sustainability/courses.json';
import sustainabilityEvents from '@/content/sustainability/events.json';
import governmentCommittees from '@/content/sustainability/government-committees.json';
import sustainabilityHistory from '@/content/sustainability/history.json';
import researchProjects from '@/content/sustainability/research-projects.json';
import researchPublications from '@/content/sustainability/research-publications.json';
import ruralImmersion from '@/content/sustainability/rural-immersion.json';
import studentCommittees from '@/content/sustainability/student-committees.json';
import sustainabilityTeamJson from '@/content/sustainability-team.json';
import { routes } from '@/constants/routes';
import {
  parseGovernmentCommittees,
  parseResearchProjects,
  parseResearchPublications,
  parseRuralImmersion,
  parseStudentCommittees,
  parseSustainabilityCourses,
  parseSustainabilityEvents,
  parseSustainabilityHistory,
} from '@/lib/validation/sustainability';
import { getFullTimeFaculty } from '@/services/faculty';
import type { StudentCommitteesPage } from '@/types/sustainability-committees';
import type { SustainabilityCoursesPage } from '@/types/sustainability-courses';
import type { SustainabilityEventsPage } from '@/types/sustainability-events';
import type { ResolvedGovernmentCommitteesPage } from '@/types/sustainability-government';
import type { ResearchPublicationsPage } from '@/types/sustainability-publications';
import type { ResolvedResearchProjectsPage } from '@/types/sustainability-research';
import type { RuralImmersionPage } from '@/types/sustainability-rural-immersion';
import type { SustainabilityHistoryPage } from '@/types/sustainability-history';
import type {
  ResolvedSustainabilityTeamPage,
  SustainabilityTeamPage,
} from '@/types/sustainability-team';
import { fromJson } from '@/lib/validation/json-content';

const sustainabilityTeam = fromJson<SustainabilityTeamPage>(sustainabilityTeamJson);

/**
 * Sustainability repository — the same seam as `services/homepage`. Async so
 * the Payload query that replaces it is not a signature change.
 *
 * People who are also in the Full Time Faculty directory (`facultyId`) are
 * resolved against it here: their card links to their profile on this site,
 * and committee members get the directory's photograph instead of a monogram.
 * An unknown `facultyId` fails loudly rather than linking to a 404.
 */
export async function getSustainabilityTeam(): Promise<ResolvedSustainabilityTeamPage> {
  const { faculty } = await getFullTimeFaculty();
  const byId = new Map(faculty.map((member) => [member.id, member]));
  const find = (id: string | undefined) => {
    if (!id) return undefined;
    const member = byId.get(id);
    if (!member) throw new Error(`Sustainability team: no faculty profile "${id}"`);
    return member;
  };

  const { coreTeam, committee } = sustainabilityTeam;
  return {
    ...sustainabilityTeam,
    coreTeam: {
      ...coreTeam,
      members: coreTeam.members.map((member) => {
        const profile = find(member.facultyId);
        return {
          ...member,
          href: profile ? routes.faculty.fullTimeProfile(profile.id) : member.profileHref,
          internal: Boolean(profile),
        };
      }),
    },
    committee: {
      ...committee,
      members: committee.members.map((member) => {
        const profile = find(member.facultyId);
        return profile
          ? { ...member, photo: profile.photo, href: routes.faculty.fullTimeProfile(profile.id) }
          : member;
      }),
    },
  };
}

const history = parseSustainabilityHistory(
  sustainabilityHistory,
  'content/sustainability/history.json',
);

/** The History timeline, from JSON so it can be edited without touching code. */
export async function getSustainabilityHistory(): Promise<SustainabilityHistoryPage> {
  return Promise.resolve(history);
}

const committees = parseStudentCommittees(
  studentCommittees,
  'content/sustainability/student-committees.json',
);

/** The student committees and their representatives, from JSON. */
export async function getStudentCommittees(): Promise<StudentCommitteesPage> {
  return Promise.resolve(committees);
}

const courses = parseSustainabilityCourses(
  sustainabilityCourses,
  'content/sustainability/courses.json',
);

/** The sustainability courses, from JSON. */
export async function getSustainabilityCourses(): Promise<SustainabilityCoursesPage> {
  return Promise.resolve(courses);
}

const events = parseSustainabilityEvents(
  sustainabilityEvents,
  'content/sustainability/events.json',
);

/** The oration series and their speakers, from JSON. */
export async function getSustainabilityEvents(): Promise<SustainabilityEventsPage> {
  return Promise.resolve(events);
}

const government = parseGovernmentCommittees(
  governmentCommittees,
  'content/sustainability/government-committees.json',
);

/**
 * Faculty on government and external committees. Anyone with a `teamId` is
 * resolved against the core team, so their portrait, designation and profile
 * link stay in one place; an unknown `teamId` fails loudly.
 */
export async function getGovernmentCommittees(): Promise<ResolvedGovernmentCommitteesPage> {
  const { coreTeam } = await getSustainabilityTeam();
  const byId = new Map(coreTeam.members.map((member) => [member.id, member]));
  return {
    ...government,
    members: government.members.map((member) => {
      if (!member.teamId) return member;
      const core = byId.get(member.teamId);
      if (!core) throw new Error(`Government committees: no core team member "${member.teamId}"`);
      return {
        ...member,
        portrait: core.portrait.src,
        designation: core.designation,
        profile: { href: core.href, internal: core.internal },
      };
    }),
  };
}

const rural = parseRuralImmersion(ruralImmersion, 'content/sustainability/rural-immersion.json');

/** The Rural Immersion Module, from JSON. */
export async function getRuralImmersion(): Promise<RuralImmersionPage> {
  return Promise.resolve(rural);
}

const research = parseResearchProjects(
  researchProjects,
  'content/sustainability/research-projects.json',
);

/**
 * Sustainability research projects. A lead with a `teamId` is resolved
 * against the core team for their name, portrait and profile; an unknown
 * `teamId` fails loudly.
 */
export async function getResearchProjects(): Promise<ResolvedResearchProjectsPage> {
  const { coreTeam } = await getSustainabilityTeam();
  const byId = new Map(coreTeam.members.map((member) => [member.id, member]));
  return {
    ...research,
    projects: research.projects.map(({ lead, ...project }) => {
      if (!lead.teamId) {
        return { ...project, lead: { name: lead.name ?? '', role: lead.role, person: false } };
      }
      const core = byId.get(lead.teamId);
      if (!core) throw new Error(`Research projects: no core team member "${lead.teamId}"`);
      return {
        ...project,
        lead: {
          name: core.name,
          role: lead.role,
          person: true,
          portrait: core.portrait.src,
          profile: { href: core.href, internal: core.internal },
        },
      };
    }),
  };
}

const publications = parseResearchPublications(
  researchPublications,
  'content/sustainability/research-publications.json',
);

/** Sustainability research publications and teaching cases, from JSON. */
export async function getResearchPublications(): Promise<ResearchPublicationsPage> {
  return Promise.resolve(publications);
}
