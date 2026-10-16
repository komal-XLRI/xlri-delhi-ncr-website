/**
 * The typed route map.
 *
 * Every internal link resolves through here rather than through an inline string
 * literal. Three reasons, all of which pay off later:
 *
 *  1. A URL change is one edit, and TypeScript finds every call site.
 *  2. `docs/architecture.md` §6.1 treats URLs as a public API — this file is
 *     that API, reviewable in a diff.
 *  3. It keeps the single-locale decision (D6) reversible at reasonable cost:
 *     adding a locale prefix later means changing these builders, not grepping
 *     several hundred JSX files.
 *
 * The tree is filled out in Phase 2 alongside the navigation data model, which
 * derives from the same source (§8.1).
 *
 * ## The addresses are the live site's
 *
 * Every page that exists on xlridelhi.ac.in keeps the address it has there —
 * `/about-xlri/vision-mission`, `/resources/medical-facilities`, `/pgdm-bm` —
 * so links, bookmarks and search results pointing at the current site keep
 * working when this one replaces it (2026-10-16). WordPress writes them with a
 * trailing slash; Next redirects `/pgdm-bm/` to `/pgdm-bm`, so both resolve.
 * Where the live site has two addresses for a page, the one its menu links to
 * is used here and the other redirects (`next.config.ts`). Pages the live site
 * does not have keep this site's own addresses.
 */

/** Pages whose address is not a pattern: an id in, the live site's address out. */
const lookup =
  <T extends Record<string, string>>(table: T, what: string) =>
  (id: string): string => {
    const path = (table as Record<string, string | undefined>)[id];
    if (path === undefined) throw new Error(`routes: no ${what} "${id}"`);
    return path;
  };

const PROGRAMMES = {
  'pgdm-business-management': '/pgdm-bm',
  'pgdm-innovation-entrepreneurship':
    '/post-graduate-diploma-in-management-innovation-entrepreneurship-venture-development',
} as const;

const EXECUTIVE_PROGRAMMES = {
  emdp: '/emdp-2',
  'management-development-programmes': '/mdp',
  'in-company-programmes': '/icp',
} as const;

/** EMDP programmes with a page of their own, by their card id in emdp.json. */
const EMDP_PROGRAMMES = {
  'digital-hr-people-analytics-batch-8':
    '/executive-development-program-in-digital-hr-leadership-people-analytics-batch-8',
  'strategy-leadership-batch-4': '/executive-development-program-in-strategy-leadership-batch-4',
  'strategic-hr-leadership-batch-7':
    '/executive-development-programme-in-strategic-hr-leadership-batch-7',
  'global-strategy-healthcare-batch-1':
    '/executive-development-programme-in-global-strategy-leadership-for-healthcare-professionals',
  'dba-ipag': '/doctor-of-business-administration-dba',
  'digital-hr-people-analytics-batch-7':
    '/executive-development-program-in-digital-hr-leadership-people-analytics-batch-7',
  'mba-ipag': '/master-of-business-administration-mba',
  'strategy-leadership-batch-3': '/executive-development-program-in-strategy-leadership-batch-3',
  'strategic-hr-leadership-batch-6':
    '/executive-development-programme-in-strategic-hr-leadership-batch-6',
  'digital-transformation-healthcare-batch-1':
    '/executive-development-program-in-digital-transformation-and-business-models-in-healthcare-batch-1-4',
  'general-management-batch-5': '/executive-program-in-general-management-2',
  'digital-hr-people-analytics-batch-6':
    '/executive-development-program-in-digital-hr-leadership-people-analytics',
  'applied-business-finance': '/executive-development-programme-in-applied-business-finance',
  'strategic-hr-leadership-cohort-5': '/executive-development-program-in-strategic-hr-leadership',
  'strategy-leadership-cohort-2': '/executive-program-in-strategy-leadership',
} as const;

/** Whether an EMDP programme has its own page here. */
export const hasEmdpProgrammePage = (id: string): boolean => id in EMDP_PROGRAMMES;

const CENTRES = {
  'gender-equality': '/centre-for-gender-equality-inclusive-leadership',
  'public-policy': '/center-for-public-policy-and-public-affairs',
  'design-of-automobiles': '/indian-school-for-design-of-automobiles',
  'healthcare-management': '/xlri-center-for-healthcare-management',
} as const;

/** The library's own pages and e-resource collections, by id. */
const LIBRARY_PAGES = {
  services: '/library-services',
  committee: '/committee-and-personnel',
  gallery: '/gallery-library',
  contact: '/contact-library',
  edatabases: '/databases-library',
  ejournals: '/ejournals-library',
  ebooks: '/ebooks-and-elearning',
  elearning: '/elearning',
  enewspapers: '/e-newspaper-magazines',
  etools: '/research-support-tools',
} as const;

export const routes = {
  home: '/',

  about: {
    index: '/about-xlri',
    accreditation: '/about-xlri/accreditation',
    directorsDesk: '/about-xlri/from-the-directors-desk',
    visionMission: '/about-xlri/vision-mission',
    heritage: '/heritage',
    foundingFathers: '/about-xlri/jesuit-founding-fathers',
    boardOfGovernors: '/about-xlri/board-of-governors',
    leadership: '/about-xlri/leadership-administration',
    mandatoryDisclosure: '/about-xlri/mandatory-disclosure',
  },

  academics: {
    index: '/academic-programmes',
    programme: lookup(PROGRAMMES, 'programme'),
  },

  executiveEducation: {
    index: '/executive-education',
    programme: lookup(EXECUTIVE_PROGRAMMES, 'executive programme'),
    emdpProgramme: lookup(EMDP_PROGRAMMES, 'EMDP programme'),
  },

  /** Quick links for current students — the "Students" link in the utility row. */
  students: '/student-life',

  admissions: {
    index: '/admissions',
  },

  faculty: {
    index: '/faculty',
    fullTime: '/core-faculty',
    fullTimeProfile: (slug: string) => `/faculty/${slug}` as const,
    adjunct: '/adjunct-faculty',
    adjunctProfile: (slug: string) => `/adjunct-faculty/${slug}` as const,
    visiting: '/visiting-faculty',
    staff: '/staff-xlri-delhi',
  },

  research: {
    publications: '/publication-research-articles-cases',
    centre: lookup(CENTRES, 'centre'),
  },

  campusLife: {
    index: '/resources',
    campusTour: '/campus-tour',
    library: '/resources/library-home-new',
    libraryPage: lookup(LIBRARY_PAGES, 'library page'),
    mobility: '/resources/mobility-within-campus',
    parking: '/resources/parking-areas',
    medical: '/resources/medical-facilities',
    counselling: '/resources/counselling-services',
    sports: '/resources/sports-recreation',
    gardens: '/resources/gardens-parks',
    hostel: '/resources/students-hostel',
    residences: '/resources/faculty-staff-residences',
    guest: '/resources/guest-accomodations',
    food: '/resources/food-courts',
    store: '/resources/daily-needs-store',
    laundry: '/resources/laundry-facilities',
    classrooms: '/resources/classrooms',
    labs: '/resources/computer-labs',
    it: '/resources/it-infrastructure',
    studio: '/resources/studio',
    conference: '/resources/conference-rooms',
    xavier: '/resources/xavier-hall',
    xceed: '/resources/xceed-facilities',
    societies: '/student-societies',
    internalCommittee: '/internal-complaints-committee',
    studentEvents: '/student-events',
  },

  placements: {
    index: '/placement',
    final: '/placement/final-placements',
    summer: '/placement/summer-internships',
    reports: '/placement/reports',
  },

  sustainability: {
    index: '/sustainability',
    team: '/sustainability-core-team-2',
    history: '/sustainability-history',
    studentCommittees: '/sustainability-student-committees',
    courses: '/sustainability-courses',
    events: '/sustainability-events',
    governmentCommittees: '/sustainability-government-committees',
    ruralImmersion: '/sustainability-rural-immersion',
    researchProjects: '/sustainability-research-projects',
    researchPublications: '/sustainability-research-publications',
  },

  news: {
    index: '/latest-news',
    /** Stories sit at the site root, as on the live site: `/corporate-confluence-2025`. */
    article: (slug: string) => `/${slug}` as const,
  },

  events: {
    index: '/latest-events',
    detail: (slug: string) => `/event/${slug}` as const,
  },

  /** GIGW-mandated pages (§11.2). */
  policies: {
    privacy: '/policies/privacy',
    terms: '/policies/terms',
    copyright: '/policies/copyright',
    hyperlinking: '/policies/hyperlinking',
    disclaimer: '/policies/disclaimer',
    accessibility: '/policies/accessibility',
    screenReaderAccess: '/policies/screen-reader-access',
    help: '/policies/help',
  },

  /** HTML sitemap — a GIGW requirement, and the 7th consumer of the nav tree. */
  sitemap: '/sitemap',
  contact: '/contact',
} as const;

export type Routes = typeof routes;
