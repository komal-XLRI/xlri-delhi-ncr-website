import type { MdpPage } from '@/types/mdp';

/**
 * Executive Education › Management Development Programmes (MDPs).
 *
 * ## Sources
 *
 * - **Delhi-NCR page** (xlridelhi.ac.in/mdp/): the heading, tagline, the
 *   annual-refresh line, the overview and the calendar document, verbatim.
 *   The calendar (XLRI MDP Calendar 2025–26, 8 pages) is self-hosted under
 *   public/documents/executive-education/.
 * - **That calendar**: the at-a-glance figures, the venue split, the
 *   residential rates, the discount policy and the MDP office contacts. The
 *   figures were counted from its programme table (84 programmes, May 2025 to
 *   March 2026), not estimated.
 * - **Photograph**: the MDP Block on the Delhi-NCR campus, from the Delhi
 *   site's own Executive Education menu. The media library holds it only at
 *   500×300; replace it with a larger photograph when one is available.
 *
 * The four overview pillars are phrases from the overview paragraph, lifted
 * out as headings over its own words.
 *
 * Every programme in the 2025–26 calendar has now run. The page says so and
 * offers the document, rather than listing dates that have passed; replace
 * the document and the figures when the 2026–27 calendar is published.
 */
export const mdp: MdpPage = {
  eyebrow: 'XLRI Leadership Education and Development',
  title: 'Management Development Programmes',
  abbreviation: 'MDPs',
  tagline:
    'Transforming Executives into Visionary Leaders: Building Tomorrow’s Business Excellence Today',
  refresh:
    'XLRI reviews and refreshes its Management Development Programmes each year to ensure executives gain the most relevant, industry-aligned, and high-impact learning experience.',
  image: {
    src: '/media/executive-education/mdp/mdp-block-delhi-ncr.jpg',
    width: 500,
    height: 300,
    alt: 'The MDP Block at the XLRI Delhi-NCR campus, a pale concrete building with tall vertical fins',
  },
  overview: {
    heading: 'Overview',
    text: 'XLRI’s Management Development Programmes (MDPs) deliver an immersive, high-impact learning experience designed for working professionals who want to upskill quickly and effectively. Conducted on campus in an intensive short-term format, these programmes enable participants to step away from daily routines and engage deeply with a rich, academically rigorous learning environment. With expert XLRI faculty, hands-on pedagogy, and a future-ready curriculum aligned with today’s evolving business landscape, MDPs equip professionals with practical insights, sharper leadership capabilities, and renewed confidence to excel in a competitive world.',
    pillars: [
      {
        id: 'format',
        title: 'Intensive, on campus',
        text: 'Conducted on campus in an intensive short-term format.',
      },
      { id: 'faculty', title: 'Expert XLRI faculty', text: 'Academically rigorous learning.' },
      { id: 'pedagogy', title: 'Hands-on pedagogy', text: 'Practical insights to apply at work.' },
      {
        id: 'curriculum',
        title: 'Future-ready curriculum',
        text: 'Aligned with today’s evolving business landscape.',
      },
    ],
  },
  calendar: {
    heading: 'MDP Calendar 2025–26',
    label: 'XLRI - MDP Calendar 2025-26',
    href: '/documents/executive-education/xlri-mdp-calendar-2025-26.pdf',
    meta: 'PDF · 8 pages · 320 KB',
    note: 'The 2025–26 calendar ran from May 2025 to March 2026. Every programme’s dates, programme directors, venue, fees and level are in the document.',
    facts: [
      { id: 'programmes', value: '84', label: 'Programmes in the year' },
      { id: 'delhi', value: '43', label: 'At the Delhi-NCR campus' },
      { id: 'duration', value: '2–5', label: 'Days each' },
      { id: 'span', value: '11', label: 'Months, May to March' },
    ],
    venues: [
      { id: 'delhi', name: 'XLRI Delhi-NCR Campus', count: 43 },
      { id: 'jamshedpur', name: 'XLRI Jamshedpur Campus', count: 35 },
      { id: 'bengaluru', name: 'Bengaluru', count: 5 },
      { id: 'mumbai', name: 'Mumbai', count: 1 },
    ],
  },
  stay: {
    heading: 'Residential Facility',
    intro:
      'Accommodation is available for all programs at XLRI Jamshedpur and XLRI NCR Delhi at the following rates:',
    rates: [
      {
        id: 'twin',
        label: 'Twin Sharing',
        value: '₹2,400',
        note: 'per person per day, including all meals',
      },
      {
        id: 'single',
        label: 'Single Accommodation',
        value: '₹4,000',
        note: 'per person per day, including all meals',
      },
    ],
    rules: [
      'Check-in: On the 0th day (a day before the program starts)',
      'Check-out: Includes the night of the last day of the program',
    ],
    taxNote:
      'All applicable taxes (GST) will be charged in addition to the Professional Fee and Accommodation costs.',
  },
  discounts: {
    heading: 'Discount Policy for MDPs',
    tiers: [
      { id: 'five', participants: '5 to 9 confirmed participants', discount: '5%' },
      { id: 'ten', participants: '10 and above confirmed participants', discount: '10%' },
    ],
  },
  contact: {
    heading: 'Contact the MDP office',
    phone: '0657 6653329/30/38',
    email: 'mdpoffice@xlri.ac.in',
    website: 'https://mdp.xlri.ac.in',
  },
};
