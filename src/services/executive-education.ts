import emdpJson from '@/content/executive-education/emdp.json';
import emdpProgrammesJson from '@/content/executive-education/emdp-programmes.json';
import icpJson from '@/content/executive-education/icp.json';
import mdpJson from '@/content/executive-education/mdp.json';
import { hasEmdpProgrammePage, routes } from '@/constants/routes';
import { getFullTimeFaculty } from '@/services/faculty';
import type { EmdpPage } from '@/types/emdp';
import type {
  EmdpPerson,
  EmdpProgramme,
  EmdpResolvedPerson,
  StoredEmdpProgrammes,
} from '@/types/emdp-programme';
import type { IcpPage } from '@/types/icp';
import type { MdpPage } from '@/types/mdp';
import { fromJson } from '@/lib/validation/json-content';

const emdp = fromJson<EmdpPage>(emdpJson);
const icp = fromJson<IcpPage>(icpJson);
const mdp = fromJson<MdpPage>(mdpJson);
const emdpProgrammes = fromJson<StoredEmdpProgrammes>(emdpProgrammesJson);

/**
 * Executive Education repository — the same seam as `services/homepage`.
 * Async so the Payload query that replaces it is not a signature change.
 */
export async function getEmdp(): Promise<EmdpPage> {
  // A card whose programme has a page here links to it rather than out to the
  // live site's copy.
  return Promise.resolve({
    ...emdp,
    programmes: emdp.programmes.map((programme) =>
      hasEmdpProgrammePage(programme.id)
        ? { ...programme, knowMore: routes.executiveEducation.emdpProgramme(programme.id) }
        : programme,
    ),
  });
}

/**
 * One EMDP programme's page. People who are Full Time Faculty get the
 * directory's photograph and a link to their profile; an unknown `facultyId`
 * fails the build rather than showing a broken card.
 */
export async function getEmdpProgramme(id: string): Promise<EmdpProgramme> {
  const stored = emdpProgrammes.programmes[id];
  if (!stored) throw new Error(`emdp-programmes.json: no programme "${id}"`);
  const { faculty } = await getFullTimeFaculty();
  const resolve = (person: EmdpPerson): EmdpResolvedPerson => {
    if (person.facultyId === undefined) return person;
    const member = faculty.find((candidate) => candidate.id === person.facultyId);
    if (!member) throw new Error(`emdp-programmes.json: no faculty "${person.facultyId}"`);
    return { ...person, photo: member.photo, href: routes.faculty.fullTimeProfile(member.id) };
  };
  return {
    ...stored,
    id,
    labels: emdpProgrammes.labels,
    breadcrumb: emdp.breadcrumb,
    sections: stored.sections.map((section) =>
      section.kind === 'people' ? { ...section, members: section.members.map(resolve) } : section,
    ),
  };
}

export async function getMdp(): Promise<MdpPage> {
  return Promise.resolve(mdp);
}

export async function getIcp(): Promise<IcpPage> {
  return Promise.resolve(icp);
}
