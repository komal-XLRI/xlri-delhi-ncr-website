/**
 * "Leadership & Administration" content shape. In `types/` so the feature can
 * describe its props without importing `content/` (§7).
 */

export interface Leader {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly portrait: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
  };
}

/**
 * A committee member. The councils are published as role → holder pairs
 * ("Director — Fr Antony R Uvari, SJ"); every other committee as a plain list,
 * where a line may itself carry a role in parentheses, "(Convenor)" etc.
 */
export type CommitteeMember = string | { readonly role: string; readonly name: string };

export interface Committee {
  /** e.g. "A1". */
  readonly code: string;
  readonly name: string;
  readonly members: readonly CommitteeMember[];
}

export interface CommitteeGroup {
  /** e.g. "A". */
  readonly code: string;
  readonly title: string;
  /** Short label for the tab. */
  readonly tabLabel: string;
  readonly committees: readonly Committee[];
}

export interface Leadership {
  readonly title: string;
  readonly coreTeam: {
    readonly heading: string;
    readonly leaders: readonly Leader[];
  };
  readonly committees: {
    readonly heading: string;
    readonly groups: readonly CommitteeGroup[];
  };
}
