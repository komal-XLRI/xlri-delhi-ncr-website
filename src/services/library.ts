import libraryJson from '@/content/campus-life/library.json';
import { routes } from '@/constants/routes';
import { parseLibrary } from '@/lib/validation/library';
import { getFullTimeFaculty, getStaff } from '@/services/faculty';
import type { LibraryContent, LibraryPerson, StoredLibraryPerson } from '@/types/library';

/**
 * Library repository. Content lives in `content/campus-life/library.json`,
 * validated on load; committee members and librarians are faculty or staff ids,
 * resolved here against those directories so names and photos stay in step.
 */
const stored = parseLibrary(libraryJson, 'content/campus-life/library.json');

export async function getLibrary(): Promise<LibraryContent> {
  const [faculty, staff] = await Promise.all([getFullTimeFaculty(), getStaff()]);
  const resolve = ({ kind, id, role, email }: StoredLibraryPerson): LibraryPerson => {
    const found =
      kind === 'faculty'
        ? faculty.faculty.find((member) => member.id === id)
        : staff.staff.find((member) => member.id === id);
    if (!found) throw new Error(`library.json: no ${kind} member "${id}"`);
    return {
      name: found.name,
      role,
      email,
      photo: found.photo,
      href:
        kind === 'faculty' ? routes.faculty.fullTimeProfile(id) : `${routes.faculty.staff}#${id}`,
    };
  };
  return {
    ...stored,
    committee: stored.committee.map(resolve),
    personnel: stored.personnel.map(resolve),
  };
}

/** The e-resource collection slugs, for `generateStaticParams`. */
export function getLibraryCollectionIds(): readonly string[] {
  return stored.collections.map((collection) => collection.id);
}
