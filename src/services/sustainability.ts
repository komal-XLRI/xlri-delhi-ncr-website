import { sustainabilityTeam } from '@/content/sustainability-team';
import { routes } from '@/constants/routes';
import { getFullTimeFaculty } from '@/services/faculty';
import type { ResolvedSustainabilityTeamPage } from '@/types/sustainability-team';

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
