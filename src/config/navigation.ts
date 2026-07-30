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
 *  • **D4 / Q12** — eight primary items. Sustainability sits under *About*, and
 *    *News & Events* takes the eighth slot, since events are by far the more
 *    active channel (42 events against 10 posts). Moving Sustainability back to
 *    top level later is a data edit in this file: cut the node, paste it into
 *    `PRIMARY_NAV`. Nothing else changes.
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
    {
      // Q12: Sustainability lives here for now. Fifteen legacy pages sat at the
      // root of the old site with no section to belong to (§16 F4).
      id: 'about-sustainability',
      label: 'Sustainability',
      children: [
        { id: 'sustainability-overview', label: 'Overview', href: '/about/sustainability' },
        { id: 'sustainability-courses', label: 'Courses', href: '/about/sustainability/courses' },
        {
          id: 'sustainability-research',
          label: 'Research & Publications',
          href: '/about/sustainability/research',
        },
        {
          id: 'sustainability-immersion',
          label: 'Rural Immersion',
          href: '/about/sustainability/rural-immersion',
        },
        {
          id: 'sustainability-committees',
          label: 'Committees',
          href: '/about/sustainability/committees',
        },
      ],
    },
  ],
};

const academics: PrimaryNavItem = {
  id: 'academics',
  label: 'Academics',
  href: '/academics',
  layout: 'columns-3',
  children: [
    {
      id: 'academics-postgraduate',
      label: 'Postgraduate Programmes',
      children: [
        { id: 'academics-overview', label: 'All Programmes', href: '/academics' },
        {
          id: 'programme-pgdm-bm',
          label: 'PGDM (Business Management)',
          href: '/academics/programmes/pgdm-business-management',
        },
        { id: 'programme-mba', label: 'MBA', href: '/academics/programmes/mba' },
        {
          id: 'programme-pgdm-wp',
          label: 'PGDM for Working Professionals',
          href: '/academics/programmes/pgdm-working-professionals',
        },
        {
          id: 'programme-pgdm-ie',
          label: 'PGDM (Innovation & Entrepreneurship)',
          href: '/academics/programmes/pgdm-innovation-entrepreneurship',
        },
        {
          id: 'programme-pgp-hr',
          label: 'PGP (Digital HR & People Analytics)',
          href: '/academics/programmes/pgp-digital-hr-people-analytics',
        },
      ],
    },
    {
      id: 'academics-doctoral',
      label: 'Doctoral',
      children: [
        {
          id: 'programme-dba',
          label: 'Doctor of Business Administration',
          href: '/academics/programmes/dba',
        },
        { id: 'programme-fpm', label: 'Fellow Programme (FPM)', href: '/academics/programmes/fpm' },
      ],
    },
    {
      id: 'academics-library',
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

const executiveEducation: PrimaryNavItem = {
  id: 'executive-education',
  label: 'Executive Education',
  href: '/executive-education',
  layout: 'columns-3',
  featured: {
    eyebrow: 'For organisations',
    title: 'Custom programmes',
    description: 'Programmes designed around a single organisation’s needs.',
    href: '/executive-education/custom',
  },
  children: [
    {
      id: 'exec-leadership',
      label: 'Leadership & Strategy',
      children: [
        { id: 'exec-overview', label: 'All Programmes', href: '/executive-education' },
        {
          id: 'exec-strategy-leadership',
          label: 'Strategy & Leadership',
          href: '/executive-education/strategy-leadership',
        },
        {
          id: 'exec-general-management',
          label: 'General Management',
          href: '/executive-education/general-management',
        },
      ],
    },
    {
      id: 'exec-people',
      label: 'People & Analytics',
      children: [
        {
          id: 'exec-strategic-hr',
          label: 'Strategic HR Leadership',
          href: '/executive-education/strategic-hr-leadership',
        },
        {
          id: 'exec-digital-hr',
          label: 'Digital HR & People Analytics',
          href: '/executive-education/digital-hr-people-analytics',
        },
      ],
    },
    {
      id: 'exec-sector',
      label: 'Finance & Healthcare',
      children: [
        {
          id: 'exec-applied-finance',
          label: 'Applied Business Finance',
          href: '/executive-education/applied-business-finance',
        },
        {
          id: 'exec-financial-analytics',
          label: 'Financial Data Analytics & ML',
          href: '/executive-education/financial-data-analytics',
        },
        {
          id: 'exec-healthcare-strategy',
          label: 'Global Strategy & Leadership for Healthcare',
          href: '/executive-education/healthcare-strategy-leadership',
        },
        {
          id: 'exec-healthcare-digital',
          label: 'Digital Transformation in Healthcare',
          href: '/executive-education/healthcare-digital-transformation',
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
  layout: 'columns-3',
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
    {
      id: 'centres-group',
      label: 'Centres of Excellence',
      children: [
        { id: 'centres-overview', label: 'All Centres', href: '/research/centres' },
        {
          id: 'centre-healthcare',
          label: 'Centre for Healthcare Management',
          href: '/research/centres/healthcare-management',
        },
        {
          id: 'centre-public-policy',
          label: 'Centre for Public Policy & Public Affairs',
          href: '/research/centres/public-policy',
        },
        {
          id: 'centre-gender',
          label: 'Centre for Gender Equality & Inclusive Leadership',
          href: '/research/centres/gender-equality',
        },
      ],
    },
  ],
};

const campusLife: PrimaryNavItem = {
  id: 'campus-life',
  label: 'Campus Life',
  href: '/campus-life',
  layout: 'columns-3',
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
      label: 'Outcomes',
      children: [
        { id: 'placements-overview', label: 'Overview', href: '/placements' },
        { id: 'placements-reports', label: 'Placement Reports', href: '/placements/reports' },
        { id: 'placements-record', label: 'Student Placement Record', href: '/placements/record' },
      ],
    },
    {
      id: 'placements-recruiters',
      label: 'For Recruiters',
      children: [
        {
          id: 'placements-recruit',
          label: 'Recruit at XLRI Delhi-NCR',
          href: '/placements/recruit',
        },
        { id: 'placements-contact', label: 'Placement Office', href: '/placements/contact' },
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
  { id: 'utility-recruiters', label: 'Recruiters', href: '/placements/recruit' },
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
