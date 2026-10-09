import fullTimeBiographies from '@/content/faculty/full-time-biographies.json';
import fullTime from '@/content/faculty/full-time.json';
import { parseFacultyBiographies, parseFacultyDirectory } from '@/lib/validation/faculty';
import type { FacultyDirectory, FacultyProfile } from '@/types/faculty';

/**
 * Faculty repository. The listings and biographies live as JSON in
 * `content/faculty/` so they can be edited without touching code; each file is
 * validated on load. Async so the CMS query that replaces it is not a
 * signature change.
 */
const fullTimeFaculty = parseFacultyDirectory(fullTime, 'content/faculty/full-time.json');
const biographies = parseFacultyBiographies(
  fullTimeBiographies,
  fullTimeFaculty,
  'content/faculty/full-time-biographies.json',
);

export async function getFullTimeFaculty(): Promise<FacultyDirectory> {
  return Promise.resolve(fullTimeFaculty);
}

/** Every full-time profile slug, for static generation. */
export async function getFullTimeFacultyIds(): Promise<readonly string[]> {
  return Promise.resolve(fullTimeFaculty.faculty.map((m) => m.id));
}

export async function getFullTimeProfile(id: string): Promise<FacultyProfile | null> {
  const member = fullTimeFaculty.faculty.find((m) => m.id === id);
  const biography = biographies.get(id);
  if (!member || !biography) return Promise.resolve(null);
  return Promise.resolve({ member, biography });
}
