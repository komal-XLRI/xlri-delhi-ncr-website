import { assertValidNavTree } from '@/lib/validation/navigation';
import type { NavNode, PrimaryNavItem, UtilityNavItem } from '@/types/navigation';

/**
 * THE navigation tree.
 *
 * Six surfaces render from this one structure (§8.1). It is grounded in the
 * legacy audit (§16): every section below maps to real content found among the
 * 205 URLs on the current site, so this doubles as the migration target map.
 *
 * Decisions encoded here:
 *
 *  • **D4 / Q12** — originally eight primary items. Sustainability sits under
 *    *About*, and *News & Events* took the eighth slot, since events are by far
 *    the more active channel (42 events against 10 posts).
 *
 *  • **D4 revisited** — nine. *Centres* was promoted from a column inside
 *    Faculty & Research to its own primary item, matching the Delhi-NCR site's
 *    menu, at the client's request (2026-10-07).
 *
 *  • **D4 revisited again** — ten. *Sustainability* moved from under About to
 *    its own primary item, after Centres, as on the Delhi-NCR site (same day).
 *    Ten was checked at 1280px; see the test in `tests/unit/navigation.test.ts`.
 *
 *  • **Q11** — Admissions stays primary. Delhi-NCR-specific admissions content
 *    is hosted here; shared institute information (XAT, procedure, eligibility)
 *    deep-links to xlri.ac.in rather than being duplicated. Those links are
 *    marked automatically by the Link primitive, which classifies destinations
 *    itself — see `lib/url.ts`.
 *
 *  • **§16 F2** — Executive Education programmes are listed once each, not once
 *    per cohort. The legacy site mints a new URL per batch
 *    (`…-batch-3`, `…-batch-4`, `…-batch-7`), which fragments its own search
 *    ranking. One programme, one URL; cohorts are data on the record.
 *
 * Adding a link is a one-line change. Restructuring is a data edit. There is no
 * navigation markup anywhere that needs to be kept in sync with this file.
 */

const about: PrimaryNavItem = {
  id: 'about',
  label: 'About',
  href: '/about',
  layout: 'columns-3',
  children: [
    {
      id: 'about-institute',
      label: 'The Institute',
      children: [
        { id: 'about-overview', label: 'Overview', href: '/about' },
        { id: 'about-vision', label: 'Vision & Mission', href: '/about/vision-mission' },
        { id: 'about-heritage', label: 'Heritage', href: '/about/heritage' },
        {
          id: 'about-founders',
          label: 'Jesuit Founding Fathers',
          href: '/about/jesuit-founding-fathers',
        },
        { id: 'about-accreditation', label: 'Accreditation', href: '/about/accreditation' },
      ],
    },
    {
      id: 'about-governance',
      label: 'Leadership & Governance',
      children: [
        { id: 'about-director', label: "From the Director's Desk", href: '/about/directors-desk' },
        {
          id: 'about-leadership',
          label: 'Leadership & Administration',
          href: '/about/leadership',
        },
        { id: 'about-board', label: 'Board of Governors', href: '/about/board-of-governors' },
        {
          id: 'about-committees',
          label: 'Committees & Personnel',
          href: '/about/committees',
        },
        {
          id: 'about-disclosure',
          label: 'Mandatory Disclosure',
          href: '/about/mandatory-disclosure',
          description: 'AICTE regulatory publication',
        },
      ],
    },
  ],
};

/**
 * Academics — the Delhi-NCR site's "Academic Programmes" menu (2026-10-08):
 * its two programmes, each under its school, and the admission process. The
 * admission links go to the institute site (xlri.ac.in), where that
 * information is maintained once for both campuses; the Link primitive marks
 * them external automatically. Library & Resources moved to Campus Life.
 */
const academics: PrimaryNavItem = {
  id: 'academics',
  label: 'Academics',
  href: '/academics',
  layout: 'columns-3',
  children: [
    {
      id: 'academics-business',
      label: 'School of Business',
      children: [
        {
          id: 'programme-pgdm-bm',
          label: 'PGDM BM',
          href: '/academics/programmes/pgdm-business-management',
        },
      ],
    },
    {
      id: 'academics-entrepreneurship',
      label: 'XLRI – Entrepreneurship',
      children: [
        {
          id: 'programme-pgdm-ie',
          label: 'PGDM - IEV',
          href: '/academics/programmes/pgdm-innovation-entrepreneurship',
        },
      ],
    },
    {
      id: 'academics-admission-process',
      label: 'XLRI Admission Process',
      children: [
        {
          id: 'admission-process-overview',
          label: 'Overview',
          href: 'https://xlri.ac.in/academic-programmes/admission-procedure/overview',
        },
        {
          id: 'admission-process-prospectus',
          label: 'Admission Prospectus',
          href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FAdmissions%20e-Prospectus%202026.pdf2025-11-21T06%3A05%3A55.041Z?alt=media&token=7a67a83e-b077-4dd4-a16e-a7fa02df3875',
        },
        {
          id: 'admission-process-xat-bulletin',
          label: 'XAT Bulletin',
          href: 'https://xlri.ac.in/academic-programmes/admission-procedure/xat-bulletin',
        },
        {
          id: 'admission-process-xat-papers',
          label: 'XAT Question Papers',
          href: 'https://xlri.ac.in/academic-programmes/xat-question-papers',
        },
      ],
    },
  ],
};

/**
 * Executive Education — the Delhi-NCR site's menu (2026-10-08): its three
 * offerings under XLEAD. Delhi's panel also carries a photograph of the MDP
 * block; it is left out, as on the other panels.
 */
const executiveEducation: PrimaryNavItem = {
  id: 'executive-education',
  label: 'Executive Education',
  href: '/executive-education',
  layout: 'columns-2',
  children: [
    {
      id: 'exec-xlead',
      label: 'XLEAD – XLRI Leadership Education and Development',
      children: [
        { id: 'exec-emdp', label: 'EMDP', href: '/executive-education/emdp' },
        {
          id: 'exec-mdp',
          label: 'Management Development Programmes',
          href: '/executive-education/management-development-programmes',
        },
        {
          id: 'exec-in-company',
          label: 'In-Company Programmes',
          href: '/executive-education/in-company-programmes',
        },
      ],
    },
  ],
};

/**
 * Q11. Two columns of content we own, one column that leaves for the institute
 * site. The split is explicit in the data so nobody has to remember which is
 * which — and the Link primitive marks the offsite ones automatically.
 */
const admissions: PrimaryNavItem = {
  id: 'admissions',
  label: 'Admissions',
  href: '/admissions',
  layout: 'columns-3',
  children: [
    {
      id: 'admissions-delhi',
      label: 'Delhi-NCR Admissions',
      children: [
        { id: 'admissions-overview', label: 'Overview', href: '/admissions' },
        { id: 'admissions-how-to-apply', label: 'How to Apply', href: '/admissions/how-to-apply' },
        { id: 'admissions-fees', label: 'Fees & Financial Aid', href: '/admissions/fees' },
        { id: 'admissions-faq', label: 'Frequently Asked Questions', href: '/admissions/faq' },
      ],
    },
    {
      id: 'admissions-visit',
      label: 'Visit & Enquire',
      children: [
        { id: 'admissions-campus-tour', label: 'Campus Tour', href: '/campus-life/campus-tour' },
        { id: 'admissions-enquiry', label: 'Admissions Enquiry', href: '/admissions/enquiry' },
        { id: 'admissions-contact', label: 'Contact the Admissions Office', href: '/contact' },
      ],
    },
    {
      id: 'admissions-institute',
      label: 'On the Institute Site',
      children: [
        {
          id: 'admissions-procedure',
          label: 'Admission Procedure',
          href: 'https://xlri.ac.in/academic-programmes/admission-procedure/overview',
        },
        {
          id: 'admissions-xat',
          label: 'XAT Bulletin',
          href: 'https://xlri.ac.in/academic-programmes/admission-procedure/xat-bulletin',
        },
        {
          id: 'admissions-xat-papers',
          label: 'XAT Question Papers',
          href: 'https://xlri.ac.in/academic-programmes/xat-question-papers',
        },
        {
          id: 'admissions-scholarships',
          label: 'Scholarships',
          href: 'https://xlri.ac.in/scholarships',
        },
      ],
    },
  ],
};

const facultyResearch: PrimaryNavItem = {
  id: 'faculty-research',
  label: 'Faculty & Research',
  href: '/faculty',
  layout: 'columns-2',
  children: [
    {
      id: 'faculty-directory-group',
      label: 'Faculty',
      children: [
        { id: 'faculty-directory', label: 'Faculty Directory', href: '/faculty' },
        { id: 'faculty-core', label: 'Core Faculty', href: '/faculty?type=core' },
        { id: 'faculty-adjunct', label: 'Adjunct Faculty', href: '/faculty?type=adjunct' },
        { id: 'faculty-visiting', label: 'Visiting Faculty', href: '/faculty?type=visiting' },
        { id: 'faculty-staff', label: 'Administrative Staff', href: '/about/staff' },
      ],
    },
    {
      id: 'research-group',
      label: 'Research',
      children: [
        { id: 'research-overview', label: 'Research at XLRI', href: '/research' },
        { id: 'research-publications', label: 'Publications', href: '/research/publications' },
        { id: 'research-cases', label: 'Articles & Cases', href: '/research/articles-cases' },
        { id: 'research-conferences', label: 'Conferences', href: '/research/conferences' },
      ],
    },
  ],
};

/**
 * Centres — a primary item of its own, as on the Delhi-NCR site, rather than a
 * column inside Faculty & Research. Lists the five centres in the Delhi menu's
 * own order. XCEED has its own site, so it links out (the Link primitive marks
 * it external automatically).
 *
 * No overview page: the item has no href and no featured "All Centres" card,
 * so it only opens the panel, and the footer heading is plain text.
 */
const centres: PrimaryNavItem = {
  id: 'centres',
  label: 'Centres',
  layout: 'columns-2',
  children: [
    {
      id: 'centres-group',
      label: 'Centres of Excellence',
      children: [
        {
          id: 'centre-gender',
          label: 'Centre for Gender Equality & Inclusive Leadership',
          href: '/research/centres/gender-equality',
        },
        { id: 'centre-xceed', label: 'XCEED – XLRI Incubator', href: 'https://xceed.xlri.ac.in/' },
        {
          id: 'centre-public-policy',
          label: 'Centre for Public Policy & Public Affairs',
          href: '/research/centres/public-policy',
        },
        {
          id: 'centre-automobiles',
          label: 'Indian School for Design of Automobiles',
          href: '/research/centres/design-of-automobiles',
        },
        {
          id: 'centre-healthcare',
          label: 'Centre for Healthcare Management',
          href: '/research/centres/healthcare-management',
        },
      ],
    },
  ],
};

/**
 * Sustainability — a primary item of its own, as on the Delhi-NCR site, at the
 * client's request (2026-10-07). It sat under About (Q12); the nine links are
 * the Delhi menu's, in its order. The column heading links to the overview.
 * Delhi's panel also carries a campus photograph; at the client's request it is
 * left out here.
 */
const sustainability: PrimaryNavItem = {
  id: 'sustainability',
  label: 'Sustainability',
  layout: 'columns-2',
  children: [
    {
      id: 'sustainability-group',
      label: 'Sustainability',
      href: '/sustainability',
      children: [
        { id: 'sustainability-team', label: 'Team', href: '/sustainability/team' },
        { id: 'sustainability-history', label: 'History', href: '/sustainability/history' },
        {
          id: 'sustainability-student-committees',
          label: 'Student Committees',
          href: '/sustainability/student-committees',
        },
        { id: 'sustainability-courses', label: 'Courses', href: '/sustainability/courses' },
        { id: 'sustainability-events', label: 'Events', href: '/sustainability/events' },
        {
          id: 'sustainability-government-committees',
          label: 'Government Committees',
          href: '/sustainability/government-committees',
        },
        {
          id: 'sustainability-rural-immersion',
          label: 'Rural Immersion',
          href: '/sustainability/rural-immersion',
        },
        {
          id: 'sustainability-research-projects',
          label: 'Research Projects',
          href: '/sustainability/research-projects',
        },
        {
          id: 'sustainability-research-publications-cases',
          label: 'Research Publications & Cases',
          href: '/sustainability/research-publications-cases',
        },
      ],
    },
  ],
};

const campusLife: PrimaryNavItem = {
  id: 'campus-life',
  label: 'Campus Life',
  href: '/campus-life',
  layout: 'columns-4',
  children: [
    {
      id: 'campus-experience',
      label: 'Life on Campus',
      children: [
        { id: 'campus-overview', label: 'Overview', href: '/campus-life' },
        { id: 'campus-tour', label: 'Campus Tour', href: '/campus-life/campus-tour' },
        { id: 'campus-gallery', label: 'Gallery', href: '/campus-life/gallery' },
        { id: 'campus-locations', label: 'Getting Here', href: '/campus-life/locations' },
      ],
    },
    {
      id: 'campus-student',
      label: 'Student Life',
      children: [
        { id: 'student-societies', label: 'Student Societies', href: '/campus-life/societies' },
        { id: 'student-events', label: 'Student Events', href: '/campus-life/student-events' },
        {
          id: 'student-complaints',
          label: 'Internal Complaints Committee',
          href: '/campus-life/internal-complaints-committee',
        },
      ],
    },
    {
      // The legacy site had 21 flat `resources/*` pages (§16 F3). Grouped here
      // rather than listed exhaustively — a facilities index page carries the
      // long tail better than a menu column can.
      id: 'campus-facilities',
      label: 'Facilities',
      children: [
        { id: 'facilities-overview', label: 'All Facilities', href: '/campus-life/facilities' },
        {
          id: 'facilities-academic',
          label: 'Classrooms & Computer Labs',
          href: '/campus-life/facilities/academic',
        },
        {
          id: 'facilities-residences',
          label: 'Hostels & Residences',
          href: '/campus-life/facilities/residences',
        },
        {
          id: 'facilities-dining',
          label: 'Dining & Daily Needs',
          href: '/campus-life/facilities/dining',
        },
        {
          id: 'facilities-sport',
          label: 'Sports & Recreation',
          href: '/campus-life/facilities/sports',
        },
        {
          id: 'facilities-health',
          label: 'Medical & Counselling',
          href: '/campus-life/facilities/health',
        },
      ],
    },
    {
      id: 'campus-library',
      label: 'Library & Resources',
      children: [
        { id: 'library-home', label: 'Library', href: '/academics/library' },
        { id: 'library-databases', label: 'Databases', href: '/academics/library/databases' },
        { id: 'library-ejournals', label: 'E-Journals', href: '/academics/library/e-journals' },
        { id: 'library-ebooks', label: 'E-Books & E-Learning', href: '/academics/library/e-books' },
        {
          id: 'library-research-tools',
          label: 'Research Support Tools',
          href: '/academics/library/research-support',
        },
        { id: 'academics-calendar', label: 'Academic Calendar', href: '/academics/calendar' },
      ],
    },
  ],
};

const placements: PrimaryNavItem = {
  id: 'placements',
  label: 'Placements',
  href: '/placements',
  layout: 'columns-2',
  children: [
    {
      id: 'placements-outcomes',
      label: 'Placements',
      children: [
        { id: 'placements-overview', label: 'Overview', href: '/placements' },
        {
          id: 'placements-final',
          label: 'Final Placements 2024–26',
          href: '/placements/final-placements',
        },
        {
          id: 'placements-summer',
          label: 'Summer Internships 2025',
          href: '/placements/summer-internships',
        },
      ],
    },
    {
      id: 'placements-archive',
      label: 'Reports',
      children: [
        {
          id: 'placements-reports',
          label: 'Placement Reports & Audits',
          href: '/placements/reports',
        },
        {
          id: 'placements-recruiters',
          label: 'Our Recruiters',
          href: '/placements#recruiters',
        },
      ],
    },
  ],
};

const newsEvents: PrimaryNavItem = {
  id: 'news-events',
  label: 'News & Events',
  href: '/news',
  layout: 'columns-2',
  children: [
    {
      id: 'news-group',
      label: 'Newsroom',
      children: [
        { id: 'news-index', label: 'Latest News', href: '/news' },
        { id: 'news-announcements', label: 'Announcements', href: '/news/announcements' },
        { id: 'news-media', label: 'XLRI in the Media', href: '/news/media' },
      ],
    },
    {
      id: 'events-group',
      label: 'Events',
      children: [
        { id: 'events-index', label: 'Upcoming Events', href: '/events' },
        { id: 'events-convocation', label: 'Convocation', href: '/events/convocation' },
        { id: 'events-conferences', label: 'Conferences', href: '/research/conferences' },
      ],
    },
  ],
};

export const PRIMARY_NAV: readonly PrimaryNavItem[] = [
  about,
  academics,
  executiveEducation,
  admissions,
  facultyResearch,
  centres,
  sustainability,
  campusLife,
  placements,
  newsEvents,
];

/**
 * Utility row (Layer 1). Audience shortcuts and cross-property destinations —
 * the Stanford / Oxford pattern. Kept short: this row competes with the wordmark
 * for the most valuable pixels on the page.
 */
export const UTILITY_NAV: readonly UtilityNavItem[] = [
  { id: 'utility-students', label: 'Students', href: '/students' },
  { id: 'utility-faculty-staff', label: 'Faculty & Staff', href: '/faculty' },
  { id: 'utility-alumni', label: 'Alumni', href: 'https://xlrialumni.xlri.ac.in/' },
  { id: 'utility-recruiters', label: 'Recruiters', href: '/placements#recruiters' },
  { id: 'utility-giving', label: 'Giving', href: 'https://xlri.ac.in/giving-to-xlri' },
];

/**
 * Policy links rendered in the footer on every page.
 *
 * Note: the Hyperlinking Policy, Disclaimer, Accessibility Statement and Screen
 * Reader Access links were removed from the footer at the institute's request.
 * The pages themselves and their entries in `routes.policies` are untouched, so
 * the destinations still resolve — they are simply no longer surfaced here. If
 * GIGW §11.2 conformance is re-audited, this is the list to restore.
 */
export const POLICY_NAV: readonly UtilityNavItem[] = [
  { id: 'policy-privacy', label: 'Privacy Policy', href: '/policies/privacy' },
  { id: 'policy-terms', label: 'Terms & Conditions', href: '/policies/terms' },
  { id: 'policy-copyright', label: 'Copyright Policy', href: '/policies/copyright' },
  { id: 'policy-sitemap', label: 'Sitemap', href: '/sitemap' },
  { id: 'policy-help', label: 'Help', href: '/policies/help' },
];

// Fails the build rather than shipping a broken menu. Runs once at module load.
assertValidNavTree(PRIMARY_NAV);

/** Flatten the tree to every node that has a destination. */
export function allNavLinks(nodes: readonly NavNode[] = PRIMARY_NAV): NavNode[] {
  return nodes.flatMap((node) => [
    ...(node.href ? [node] : []),
    ...(node.children ? allNavLinks(node.children) : []),
  ]);
}
