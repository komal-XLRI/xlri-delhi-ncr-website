import adjunctBiographiesJson from '@/content/faculty/adjunct-biographies.json';
import adjunctJson from '@/content/faculty/adjunct.json';
import fullTimeBiographiesJson from '@/content/faculty/full-time-biographies.json';
import fullTimeJson from '@/content/faculty/full-time.json';
import staffJson from '@/content/faculty/staff.json';
import visitingJson from '@/content/faculty/visiting.json';
import {
  parseFacultyBiographies,
  parseFacultyDirectory,
  parseStaff,
  parseVisitingFaculty,
} from '@/lib/validation/faculty';
import type {
  FacultyDirectory,
  FacultyProfile,
  StaffDirectory,
  VisitingFacultyDirectory,
} from '@/types/faculty';

/**
 * Faculty repository. Each listing — Full Time, Adjunct — is a pair of JSON
 * files in `content/faculty/`: the cards with the page's copy (`<listing>.json`
 * — its meta, labels and the profile pages' wording) and the long-form
 * biographies (`<listing>-biographies.json`), so they can be edited without
 * touching code. Each pair is validated on load, the biographies against the
 * cards. Async so the CMS query that replaces it is not a signature change.
 */
function listing(cards: unknown, bios: unknown, name: string) {
  const directory = parseFacultyDirectory(cards, `content/faculty/${name}.json`);
  const biographies = parseFacultyBiographies(
    bios,
    directory,
    `content/faculty/${name}-biographies.json`,
  );
  return {
    directory: async (): Promise<FacultyDirectory> => Promise.resolve(directory),
    ids: async (): Promise<readonly string[]> =>
      Promise.resolve(directory.faculty.map((m) => m.id)),
    profile: async (id: string): Promise<FacultyProfile | null> => {
      const member = directory.faculty.find((m) => m.id === id);
      const biography = biographies.get(id);
      return Promise.resolve(
        member && biography
          ? { member, biography, breadcrumb: directory.breadcrumb, copy: directory.profile }
          : null,
      );
    },
  };
}

const fullTime = listing(fullTimeJson, fullTimeBiographiesJson, 'full-time');
const adjunct = listing(adjunctJson, adjunctBiographiesJson, 'adjunct');

export const getFullTimeFaculty = fullTime.directory;
/** Every full-time profile slug, for static generation. */
export const getFullTimeFacultyIds = fullTime.ids;
export const getFullTimeProfile = fullTime.profile;

export const getAdjunctFaculty = adjunct.directory;
/** Every adjunct profile slug, for static generation. */
export const getAdjunctFacultyIds = adjunct.ids;
export const getAdjunctProfile = adjunct.profile;

const visiting = parseVisitingFaculty(visitingJson, 'content/faculty/visiting.json');

/** Visiting faculty: cards only — the Delhi listing has no biographies for them. */
export async function getVisitingFaculty(): Promise<VisitingFacultyDirectory> {
  return Promise.resolve(visiting);
}

const staff = parseStaff(staffJson, 'content/faculty/staff.json');

/** The Delhi-NCR staff: cards only. */
export async function getStaff(): Promise<StaffDirectory> {
  return Promise.resolve(staff);
}
