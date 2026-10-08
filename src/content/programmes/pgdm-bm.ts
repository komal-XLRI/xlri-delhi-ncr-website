import type { ProgrammePage } from '@/types/programme';

/**
 * PGDM BM — Postgraduate Diploma in Business Management.
 *
 * ## Sources
 *
 * - **Delhi-NCR page** (xlridelhi.ac.in/pgdm-bm/): the introduction, the
 *   photograph, the "BM Courses" document and the "For more information" link,
 *   verbatim. The document (BM Syllabus 2024–26, 361 pages) is self-hosted
 *   under public/documents/academics/.
 * - **Institute page** (xlri.ac.in/academic-programmes/school-of-business/
 *   pgdbm), which the Delhi page links to for more information: the
 *   curriculum paragraph and the Programme Design and Requirements areas. The
 *   course names were checked against Delhi's own BM syllabus, which contains
 *   them. The institute page lists an "Environment, Society and Governance"
 *   area with no courses under it; it is left out rather than shown empty.
 *   Area names are in title case here; the institute page sets most in
 *   capitals and misspells "Managment".
 *
 * One repair: "on the completion which" → "on the completion of which".
 *
 * The three facts are stated in the introduction.
 */
export const pgdmBm: ProgrammePage = {
  school: 'School of Business',
  shortName: 'PGDM BM',
  title: 'Postgraduate Diploma in Business Management (PGDBM)',
  intro:
    'XLRI offers a two-year full time programme on Business Management, on the completion of which, candidates are conferred with Postgraduate diploma in Business Management (PGDBM). This programme is extremely prestigious and is rated as one of the finest of its kind in the country. The alumni of this programme currently occupy very significant positions in various industries, both in India and abroad.',
  image: {
    src: '/media/academics/pgdm-bm/pgdm-bm-batch.jpg',
    width: 1430,
    height: 648,
    alt: 'A PGDM BM batch at XLRI Delhi-NCR, gathered for a group photograph in formal dress',
  },
  facts: [
    { id: 'duration', value: 'Two years', label: 'Duration' },
    { id: 'format', value: 'Full time', label: 'Format' },
    { id: 'award', value: 'PGDBM', label: 'Postgraduate Diploma in Business Management' },
  ],
  actions: {
    courses: {
      label: 'BM Courses',
      href: '/documents/academics/pgdm-bm-courses-2024-26.pdf',
      meta: 'PDF · 2024–26 · 3.2 MB',
    },
    moreInfo: {
      label: 'For more information',
      href: 'https://xlri.ac.in/academic-programmes/school-of-business/pgdbm',
    },
  },
  curriculum:
    'The curriculum lays the foundation for a conceptual and analytical understanding of Indian and international business. XLRI’s BM programme is designed to closely integrate current management theory and practice. The course imparts knowledge and fosters attitudes essential for the growth of students into competent, responsible managers. The course has an evolving programme content and is constantly updated to be in tune with the emerging trends.',
  design: {
    heading: 'Programme Design and Requirements',
    areas: [
      {
        id: 'economics',
        name: 'Economics',
        courses: ['Macroeconomic Theory and Policy', 'Managerial Economics'],
      },
      {
        id: 'finance',
        name: 'Finance',
        courses: [
          'Financial Management-I',
          'Financial Management-II',
          'Management Accounting-I',
          'Management Accounting-II',
        ],
      },
      {
        id: 'general-management',
        name: 'General Management',
        courses: [
          'Business Law',
          'Business Research Methods',
          'Managerial Communication',
          'Managerial Ethics',
        ],
      },
      {
        id: 'human-resource-management',
        name: 'Human Resource Management',
        courses: ['Human Resource Management'],
      },
      {
        id: 'information-systems',
        name: 'Information Systems',
        courses: ['Management Information Systems'],
      },
      {
        id: 'marketing',
        name: 'Marketing',
        courses: ['Principles of Marketing', 'Marketing Planning and Implementation'],
      },
      {
        id: 'organisational-behaviour',
        name: 'Organisational Behaviour',
        courses: [
          'Individual and Group Behaviour in Organization',
          'Organizational Structure, Design & Change',
        ],
      },
      {
        id: 'operations',
        name: 'Production, Operations & Decision Sciences',
        courses: [
          'Operations Management - I',
          'Operations Management - II',
          'Operations Research',
          'Quantitative Techniques - I',
          'Quantitative Techniques - II',
        ],
      },
      {
        id: 'strategic-management',
        name: 'Strategic Management',
        courses: ['Business and Sustainability', 'Strategic Management'],
      },
    ],
  },
  related: {
    heading: 'Related Programmes',
    items: [
      {
        id: 'pgdm-iev',
        school: 'XLRI – Entrepreneurship',
        name: 'PGDM - IEV',
        href: '/academics/programmes/pgdm-innovation-entrepreneurship',
      },
    ],
  },
};
