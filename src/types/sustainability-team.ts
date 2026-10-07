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
}

export interface CommitteeMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  /** Set when the person is also in the core team, so their photograph is reused. */
  readonly coreTeamId?: string;
}

export interface SustainabilityTeamPage {
  readonly title: string;
  readonly contactEmail: string;
  readonly coreTeam: { readonly heading: string; readonly members: readonly CoreTeamMember[] };
  readonly committee: { readonly heading: string; readonly members: readonly CommitteeMember[] };
}
