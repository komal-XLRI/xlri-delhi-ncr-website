/**
 * "Board of Governors" content shape. In `types/` so the feature can describe
 * its props without importing `content/` (§7).
 */

export interface BoardMember {
  readonly id: string;
  readonly name: string;
  /** Designation, one line per entry — role, organisation, place. */
  readonly lines: readonly string[];
  readonly portrait: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
  };
}

export interface OfficeBearer {
  /** "Chairman", "Secretary", "Vice Chairman", "Treasurer". */
  readonly position: string;
  readonly member: BoardMember;
}

export interface BoardOfGovernors {
  readonly title: string;
  readonly officeBearers: readonly OfficeBearer[];
  readonly members: {
    readonly heading: string;
    readonly people: readonly BoardMember[];
  };
  readonly invitees: {
    readonly heading: string;
    readonly people: readonly BoardMember[];
  };
}
