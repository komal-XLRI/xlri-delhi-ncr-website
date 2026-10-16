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
 */

export const routes = {
  home: '/',

  about: {
    index: '/about',
    accreditation: '/about/accreditation',
    directorsDesk: '/about/directors-desk',
    visionMission: '/about/vision-mission',
    heritage: '/about/heritage',
    foundingFathers: '/about/jesuit-founding-fathers',
    boardOfGovernors: '/about/board-of-governors',
    leadership: '/about/leadership',
    mandatoryDisclosure: '/about/mandatory-disclosure',
  },

  academics: {
    index: '/academics',
    programme: (slug: string) => `/academics/programmes/${slug}` as const,
    library: '/academics/library',
  },

  executiveEducation: {
    index: '/executive-education',
    programme: (slug: string) => `/executive-education/${slug}` as const,
  },

  admissions: {
    index: '/admissions',
  },

  faculty: {
    index: '/faculty',
    fullTime: '/faculty/full-time',
    fullTimeProfile: (slug: string) => `/faculty/full-time/${slug}` as const,
    adjunct: '/faculty/adjunct',
    adjunctProfile: (slug: string) => `/faculty/adjunct/${slug}` as const,
    visiting: '/faculty/visiting',
    staff: '/faculty/staff',
    profile: (slug: string) => `/faculty/${slug}` as const,
  },

  research: {
    index: '/research',
    publications: '/research/publications',
    centre: (slug: string) => `/research/centres/${slug}` as const,
  },

  campusLife: {
    index: '/campus-life',
    campusTour: '/campus-life/campus-tour',
    library: '/campus-life/library',
    libraryPage: (slug: string) => `/campus-life/library/${slug}` as const,
    mobility: '/campus-life/mobility-within-campus',
    parking: '/campus-life/parking-areas',
    medical: '/campus-life/medical-facilities',
    counselling: '/campus-life/counselling-services',
    sports: '/campus-life/sports-recreation',
    gardens: '/campus-life/gardens-parks',
    hostel: '/campus-life/students-hostel',
    residences: '/campus-life/faculty-staff-residences',
    guest: '/campus-life/guest-accommodation',
    food: '/campus-life/food-courts',
    store: '/campus-life/daily-needs-store',
    laundry: '/campus-life/laundry-facilities',
    classrooms: '/campus-life/classrooms',
    labs: '/campus-life/computer-labs',
    it: '/campus-life/it-infrastructure',
    studio: '/campus-life/studio',
    conference: '/campus-life/conference-rooms',
    xavier: '/campus-life/xavier-hall',
    xceed: '/campus-life/xceed-facilities',
    societies: '/campus-life/societies',
    internalCommittee: '/campus-life/internal-complaints-committee',
    studentEvents: '/campus-life/student-events',
  },

  placements: {
    index: '/placements',
    final: '/placements/final-placements',
    summer: '/placements/summer-internships',
    reports: '/placements/reports',
  },

  sustainability: {
    index: '/sustainability',
    team: '/sustainability/team',
    history: '/sustainability/history',
    studentCommittees: '/sustainability/student-committees',
    courses: '/sustainability/courses',
    events: '/sustainability/events',
    governmentCommittees: '/sustainability/government-committees',
    ruralImmersion: '/sustainability/rural-immersion',
    researchProjects: '/sustainability/research-projects',
    researchPublications: '/sustainability/research-publications-cases',
  },

  news: {
    index: '/news',
    article: (slug: string) => `/news/${slug}` as const,
  },

  events: {
    index: '/events',
    detail: (slug: string) => `/events/${slug}` as const,
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
