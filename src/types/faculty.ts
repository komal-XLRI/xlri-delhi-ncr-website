/** One member of faculty, as listed in the faculty directory. */
export interface FacultyMember {
  /** URL slug for the profile page — the Delhi-NCR site's own; also the React key. */
  id: string;
  /** House style: "Dr. Firstname Surname", "Fr. Firstname Surname, SJ". */
  name: string;
  designation: string;
  /** The highest degree only — the card's one line. The full list is on the biography. */
  qualification: string;
  /** Functional areas, by their canonical names — these drive the area filter. */
  areas: readonly string[];
  email: string;
  /** Path under `public/`. */
  photo: string;
}

/** A faculty listing page: its heading, introduction and people. */
export interface FacultyDirectory {
  title: string;
  intro: readonly string[];
  faculty: readonly FacultyMember[];
}

/** One piece of a biography section, in reading order. */
export type BiographyBlock =
  | { type: 'subheading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: readonly string[] };

export interface BiographySection {
  heading: string;
  blocks: readonly BiographyBlock[];
}

/** The long-form profile behind a faculty card. Keyed by `FacultyMember.id`. */
export interface FacultyBiography {
  /** Every degree, in full — the card shows only the highest. */
  qualification: string;
  /**
   * Extra rows for the Brief Profile table, after designation, qualification
   * and functional area — e.g. Courses Teaching, Research Interests. Optional.
   */
  facts?: readonly { label: string; value: string }[];
  links: {
    linkedin?: string;
    scholar?: string;
    orcid?: string;
  };
  sections: readonly BiographySection[];
}

/** A profile page: the person's card data and their biography. */
export interface FacultyProfile {
  member: FacultyMember;
  biography: FacultyBiography;
}
