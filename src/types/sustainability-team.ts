/**
 * Sustainability › Team page shape. In `types/` so the feature can describe
 * its props without importing `content/` (§7).
 */

export interface CoreTeamMember {
  readonly id: string;
  readonly name: string;
  readonly designation: string;
  /**
   * The Delhi page labels most faculty by "Functional Area" and one by
   * "Subjects"; the label is kept with the value so neither is relabelled.
   */
  readonly focus: { readonly label: string; readonly items: readonly string[] };
  readonly portrait: { readonly src: string; readonly width: number; readonly height: number };
  readonly profileHref: string;
  /**
   * Set when the person is in the Full Time Faculty directory
   * (`content/faculty/full-time.json`): the card then links to their profile
   * on this site instead of `profileHref`.
   */
  readonly facultyId?: string;
}

export interface CommitteeMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  /** Set when the person is also in the core team, so their photograph is reused. */
  readonly coreTeamId?: string;
  /** Set when the person is in the Full Time Faculty directory: photo and profile come from there. */
  readonly facultyId?: string;
}

/**
 * What the page renders: the content, with each person's photograph and
 * profile link resolved against the faculty directory by the service.
 */
export interface ResolvedCoreTeamMember extends CoreTeamMember {
  /** Profile link — on this site when the person has a faculty profile, else `profileHref`. */
  readonly href: string;
  readonly internal: boolean;
}

export interface ResolvedCommitteeMember extends CommitteeMember {
  readonly photo?: string;
  /** Their profile on this site, when they have one. */
  readonly href?: string;
}

export interface ResolvedSustainabilityTeamPage {
  readonly title: string;
  readonly contactEmail: string;
  readonly coreTeam: {
    readonly heading: string;
    readonly members: readonly ResolvedCoreTeamMember[];
  };
  readonly committee: {
    readonly heading: string;
    readonly members: readonly ResolvedCommitteeMember[];
  };
}

export interface SustainabilityTeamPage {
  readonly title: string;
  readonly contactEmail: string;
  readonly coreTeam: { readonly heading: string; readonly members: readonly CoreTeamMember[] };
  readonly committee: { readonly heading: string; readonly members: readonly CommitteeMember[] };
}
