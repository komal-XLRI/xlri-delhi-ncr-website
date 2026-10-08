import type { EmdpPage, EmdpProgramme } from '@/types/emdp';

const poster = (id: string) => ({
  src: `/media/executive-education/emdp/${id}.jpg`,
  width: 861,
  height: 520,
});

const DELHI = 'https://xlridelhi.ac.in';

const programme = (p: Omit<EmdpProgramme, 'poster'>): EmdpProgramme => ({
  ...p,
  poster: poster(p.id),
});

/**
 * Executive Education › EMDP.
 *
 * ## Sources
 *
 * The Delhi-NCR page (xlridelhi.ac.in/emdp-2/): the introduction and every
 * programme in its Upcoming and On-going lists, in its order, with their
 * dates, durations, hours, notes and links. Posters are the page's own,
 * self-hosted under public/media/executive-education/emdp/.
 *
 * The three "offerings" restate the introduction's three sentences as
 * headings over its own words; nothing is added.
 *
 * ## Repairs to the source
 *
 *  - Titles set in capitals on the Delhi page are in title case here, so the
 *    list reads as one list.
 *  - "Know More" links that pointed into a trashed folder (`/emdp-2__trashed/…`)
 *    or that redirect are written as the address they resolve to.
 *  - Most "Apply Now" and "Pay Now" buttons on the Delhi page link to `#respond`
 *    — the comment form, not a payment or application. Those are left out;
 *    only working destinations are kept.
 *  - Tracking parameters are stripped from the IPAG links.
 *
 * Two upcoming programmes (Strategy & Leadership batch 4, Strategic HR
 * Leadership batch 7) have posters that say "Ongoing"; the Delhi page lists
 * them as upcoming, and so does this file.
 */
export const emdp: EmdpPage = {
  eyebrow: 'XLEAD – XLRI Leadership Education and Development',
  title: 'EMDP',
  expansion: 'Executive Management Development Programmes',
  intro:
    'Each year XLRI reviews the programmes offered in the previous years and identifies programmes suited for the executives. The programmes offered range from fundamentals, helping executives shifting from one functional area to another to programmes focusing on specific topics to help executives take up specific higher responsibilities. In addition, there are programmes which help executives develop their personality and leadership skills.',
  offerings: [
    {
      id: 'fundamentals',
      title: 'Fundamentals',
      text: 'Helping executives shifting from one functional area to another.',
    },
    {
      id: 'specialist',
      title: 'Specific topics',
      text: 'Programmes focusing on specific topics to help executives take up specific higher responsibilities.',
    },
    {
      id: 'leadership',
      title: 'Personality & leadership',
      text: 'Programmes which help executives develop their personality and leadership skills.',
    },
  ],
  programmes: [
    // ---------------- upcoming ----------------
    programme({
      id: 'digital-hr-people-analytics-batch-8',
      status: 'upcoming',
      title: 'Executive Development Program in Digital HR Leadership & People Analytics',
      batch: 'Batch 8',
      details: [
        { label: 'Batch commencement', value: 'Sept 2026' },
        { label: 'Course Duration', value: '10 Months' },
      ],
      knowMore: `${DELHI}/executive-development-program-in-digital-hr-leadership-people-analytics-batch-8/`,
      apply: 'https://vilcorpadmissions.xlri.ac.in/lp/edphrpa.html',
    }),
    programme({
      id: 'strategy-leadership-batch-4',
      status: 'upcoming',
      title: 'Executive Development Program in Strategy & Leadership',
      batch: 'Batch 4',
      details: [
        { label: 'Tech Orientation', value: '5th July 2026' },
        { label: 'Course Duration', value: '11 Months' },
      ],
      knowMore: `${DELHI}/executive-development-program-in-strategy-leadership-batch-4/`,
      apply: 'https://vilcorpadmissions.xlri.ac.in/lp/edpshl.html',
    }),
    programme({
      id: 'strategic-hr-leadership-batch-7',
      status: 'upcoming',
      title: 'Executive Development Programme in Strategic HR Leadership',
      batch: 'Batch 7',
      details: [
        { label: 'Tech Orientation', value: 'June 2026' },
        { label: 'Course Duration', value: '10 Months' },
      ],
      knowMore: `${DELHI}/executive-development-programme-in-strategic-hr-leadership-batch-7/`,
      apply: 'https://vilcorpadmissions.xlri.ac.in/lp/edpshrl.html',
    }),
    programme({
      id: 'global-strategy-healthcare-batch-1',
      status: 'upcoming',
      title:
        'Executive Development Programme in Global Strategy & Leadership for Healthcare Professionals',
      batch: 'Batch 1',
      note: 'In collaboration with Sorbonne Business School, Paris',
      details: [
        { label: 'Batch commencement', value: 'July 2026' },
        { label: 'Course Duration', value: '10 Months' },
      ],
      knowMore: `${DELHI}/executive-development-programme-in-global-strategy-leadership-for-healthcare-professionals/`,
      apply: 'https://vilcorpadmissions.xlri.ac.in/lp/gslhp.html',
    }),

    // ---------------- on-going ----------------
    programme({
      id: 'dba-ipag',
      status: 'ongoing',
      title: 'Doctor of Business Administration (DBA)',
      note: 'Earn a DBA from IPAG Business School (AACSB-accredited) and a certificate from XLRI',
      details: [
        { label: 'Start Date', value: 'April 2026' },
        { label: 'Course Duration', value: '3 years' },
      ],
      knowMore: `${DELHI}/doctor-of-business-administration-dba/`,
      apply: 'https://ipagbusinessschool.emeritus.org/ipag-doctor-of-business-administration',
    }),
    programme({
      id: 'digital-hr-people-analytics-batch-7',
      status: 'ongoing',
      title: 'Executive Development Program in Digital HR Leadership & People Analytics',
      batch: 'Batch 7',
      details: [
        { label: 'Batch commencement', value: 'February 2026' },
        { label: 'Course Duration', value: '10 Months' },
      ],
      knowMore: `${DELHI}/executive-development-program-in-digital-hr-leadership-people-analytics-batch-7/`,
    }),
    programme({
      id: 'mba-ipag',
      status: 'ongoing',
      title: 'Master of Business Administration (MBA)',
      note: 'IPAG MBA with XLRI Certification Programme',
      details: [
        { label: 'Start Date', value: '29 March 2026' },
        { label: 'Course Duration', value: '15 Months' },
      ],
      knowMore: `${DELHI}/master-of-business-administration-mba/`,
      apply: 'https://ipagbusinessschool.emeritus.org/ipag-mba-with-xlri-certification-programme',
    }),
    programme({
      id: 'strategy-leadership-batch-3',
      status: 'ongoing',
      title: 'Executive Development Program in Strategy & Leadership',
      batch: 'Batch 3',
      details: [
        { label: 'Tech Orientation', value: '23rd November 2025' },
        { label: 'Course Duration', value: '11 Months' },
      ],
      knowMore: `${DELHI}/executive-development-program-in-strategy-leadership-batch-3/`,
    }),
    programme({
      id: 'strategic-hr-leadership-batch-6',
      status: 'ongoing',
      title: 'Executive Development Programme in Strategic HR Leadership',
      batch: 'Batch 6',
      details: [
        { label: 'Tech Orientation', value: '26th October 2025' },
        { label: 'Course Duration', value: '10 Months' },
      ],
      knowMore: `${DELHI}/executive-development-programme-in-strategic-hr-leadership-batch-6/`,
    }),
    programme({
      id: 'digital-transformation-healthcare-batch-1',
      status: 'ongoing',
      title:
        'Executive Development Program in Digital Transformation and Business Models in Healthcare',
      batch: 'Batch 1',
      details: [
        { label: 'Tech Orientation', value: '26 Aug 2025' },
        { label: 'Course Duration', value: '09 Months' },
      ],
      knowMore: `${DELHI}/executive-development-program-in-digital-transformation-and-business-models-in-healthcare-batch-1-4/`,
      apply:
        'https://forms.zohopublic.in/tech17/form/DigitalTransformationandBusinessModelsforHealthcar1/formperma/-E9ZzH9h0GvIpa413rd0NuOKz7OPQ675_kQI1sb2bwU',
      pay: 'https://eazypay.icicibank.com/eazypayLink?P1=SIdT29mmX+1j6CxgCvsNnA==',
    }),
    programme({
      id: 'general-management-batch-5',
      status: 'ongoing',
      title: 'Executive Development Program in General Management',
      details: [
        { label: 'Tech Orientation', value: '27 July 2025' },
        { label: 'Course Duration', value: '11 Months' },
        { label: 'No. of hours', value: '132 hours' },
      ],
      knowMore: `${DELHI}/executive-program-in-general-management-2/`,
      apply:
        'https://erp.xlri.ac.in/applicantLogins.htm?link=175aafbed0c4a8e84b14c615ab33b99d&bscId=473',
    }),
    programme({
      id: 'digital-hr-people-analytics-batch-6',
      status: 'ongoing',
      title: 'Executive Development Program in Digital HR Leadership & People Analytics',
      details: [
        { label: 'Tech Orientation', value: 'July 2025' },
        { label: 'Course Duration', value: '10 Months' },
        { label: 'No. of hours', value: '120+ hours' },
      ],
      knowMore: `${DELHI}/executive-development-program-in-digital-hr-leadership-people-analytics/`,
      apply:
        'https://erp.xlri.ac.in/applicantLogins.htm?link=751659d900ee3d7fe82846ab987238fd&bscId=485',
    }),
    programme({
      id: 'applied-business-finance',
      status: 'ongoing',
      title: 'Executive Development Programme in Applied Business Finance',
      details: [
        { label: 'Batch commencement', value: 'May 2025' },
        { label: 'Course Duration', value: '11 Months' },
        { label: 'No. of hours', value: '170+ hours' },
      ],
      knowMore: `${DELHI}/executive-development-programme-in-applied-business-finance/`,
      apply:
        'https://kpmg.com/in/en/services/advisory/consulting/business-consulting/human-capital-solutions/learning-academy/executive-development-programme-in-applied-business-finance.html',
    }),
    programme({
      id: 'strategic-hr-leadership-cohort-5',
      status: 'ongoing',
      title: 'Executive Development Program in Strategic HR Leadership',
      details: [
        { label: 'Batch commencement', value: '27 Apr 2025' },
        { label: 'Course Duration', value: '10 Months' },
        { label: 'No. of hours', value: '120 hours' },
      ],
      knowMore: `${DELHI}/executive-development-program-in-strategic-hr-leadership/`,
      apply: 'https://accredian.com/programs/executive-development-program-strategic-hr-leadership',
    }),
    programme({
      id: 'strategy-leadership-cohort-2',
      status: 'ongoing',
      title: 'Executive Program in Strategy & Leadership',
      details: [
        { label: 'Batch commencement', value: '27 Apr 2025' },
        { label: 'Course Duration', value: '11 Months' },
        { label: 'No. of hours', value: '132+ hours' },
      ],
      knowMore: `${DELHI}/executive-program-in-strategy-leadership/`,
      apply: 'https://accredian.com/programs/executive-program-in-strategy-leadership',
    }),
  ],
};
