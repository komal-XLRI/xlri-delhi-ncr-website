import type { PageBreadcrumb, PageMeta } from './page-copy';

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

/**
 * The words around the faculty cards: the filters, the count and the card's
 * labels. `{shown}` and `{total}` in `showing` are filled in by the page.
 */
export interface FacultyDirectoryLabels {
  /** The letter row's first button, which clears the letter. */
  allLetters: string;
  /** "Showing {shown} of {total} faculty". */
  showing: string;
  clearFilters: string;
  searchPlaceholder: string;
  /** The functional-area menu's first option. */
  allAreas: string;
  /** Shown when the filters match no one. */
  noMatch: string;
  /** Above the areas on each card. */
  functionalArea: string;
  /** The card's link to the profile. */
  biography: string;
}

/** The fixed wording of a profile page in this listing. */
export interface FacultyProfileCopy {
  /**
   * The profile's meta description. `{name}`, `{designation}` and `{areas}`
   * are filled in from the person's card.
   */
  metaDescription: string;
  /** The line under the name. */
  campus: string;
  /** Labels for the scholarly links, when the biography has them. */
  links: { linkedin: string; scholar: string; orcid: string };
  briefProfile: {
    heading: string;
    designation: string;
    qualification: string;
    functionalArea: string;
    email: string;
  };
  /** Shown in place of the biography when it has no sections. */
  noBiography: string;
}

/** A faculty listing page: its heading, introduction and people. */
export interface FacultyDirectory {
  meta: PageMeta;
  breadcrumb: PageBreadcrumb;
  title: string;
  intro: readonly string[];
  labels: FacultyDirectoryLabels;
  /** The wording of every profile page under this listing. */
  profile: FacultyProfileCopy;
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
  /** The listing's breadcrumb — the profile's trail runs through it. */
  breadcrumb: PageBreadcrumb;
  copy: FacultyProfileCopy;
}

/**
 * A visiting faculty member — practitioners and academics from elsewhere who
 * teach a course here. The Delhi listing gives only their role and where they
 * are from, and there is no biography page.
 */
export interface VisitingFacultyMember {
  id: string;
  name: string;
  /** Their role where they come from: "Founder", "Assistant Professor" … */
  designation: string;
  /** Where they come from, as the Delhi page gives it, place included. */
  organisation: string;
  /** Path under `public/`. */
  photo: string;
}

export interface VisitingFacultyDirectory {
  meta: PageMeta;
  breadcrumb: PageBreadcrumb;
  title: string;
  /** Paragraphs above the cards; may be empty. */
  intro: readonly string[];
  faculty: readonly VisitingFacultyMember[];
}

/** A member of the Delhi-NCR staff: administration, academic associates, support. */
export interface StaffMember {
  /** Unique — the React key and the card's anchor. */
  id: string;
  name: string;
  designation: string;
  /** Path under `public/`. */
  photo: string;
}

/** The words around the staff cards. `{shown}` and `{total}` are filled in by the page. */
export interface StaffDirectoryLabels {
  /** "Showing {shown} of {total} staff". */
  showing: string;
  clearSearch: string;
  searchPlaceholder: string;
  /** Shown when the search matches no one. */
  noMatch: string;
}

export interface StaffDirectory {
  meta: PageMeta;
  breadcrumb: PageBreadcrumb;
  title: string;
  /** Paragraphs above the cards; may be empty. */
  intro: readonly string[];
  labels: StaffDirectoryLabels;
  /** In the institute's order: the administration first. */
  staff: readonly StaffMember[];
}
