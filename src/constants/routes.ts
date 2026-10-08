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
    profile: (slug: string) => `/faculty/${slug}` as const,
  },

  research: {
    index: '/research',
    centre: (slug: string) => `/research/centres/${slug}` as const,
  },

  campusLife: {
    index: '/campus-life',
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
  search: '/search',
  contact: '/contact',
} as const;

export type Routes = typeof routes;
