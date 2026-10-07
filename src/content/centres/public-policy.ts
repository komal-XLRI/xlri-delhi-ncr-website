import type { CentreBrief } from '@/types/centre';

/**
 * XLRI Centre for Public Policy and Public Affairs (XLCP).
 *
 * ## Sources
 *
 * The text is the Delhi-NCR page
 * (xlridelhi.ac.in/center-for-public-policy-and-public-affairs/), verbatim but
 * for one typo ("a hub ofgf cutting-edge ideas" → "of"). The Delhi heading
 * spells it "Center"; the page's own paragraph, and the rest of this site,
 * spell it "Centre", so the title does too.
 *
 * The photograph is the one the Delhi page uses as its banner — the "I ♥ XLRI"
 * lawn in front of the academic blocks — already self-hosted for Vision &
 * Mission, so it is reused rather than copied.
 *
 * The facts beside the text are each stated in the paragraphs; nothing is
 * added.
 */
export const publicPolicyCentre: CentreBrief = {
  shortName: 'XLCP',
  title: 'Centre for Public Policy and Public Affairs',
  image: {
    src: '/media/vision-mission/campus-i-love-xlri.jpg',
    width: 1537,
    height: 1023,
    alt: 'The XLRI Delhi-NCR campus — the “I ♥ XLRI” sign on the lawn before the academic and administrative blocks',
  },
  imagePosition: 'center 62%',
  paragraphs: [
    'XLRI launched its Centre for Public Policy and Public Affairs on February 25, 2022. It was inaugurated with a lecture by Professor Benjamin Friedman, the William Joseph Maier Professor of Political Economy at Harvard University.',
    'XLCP will aspire to be a hub of cutting-edge ideas in areas as vast as corporate governance, conflict management and mediation, building effective public-private partnerships and public leadership. It will bring together scholars and practitioners to engage in dialogue that impacts our world and helps in creating workable solutions to the policy questions of our current times.',
  ],
  facts: [
    { id: 'launched', value: '25 February 2022', label: 'Launched' },
    {
      id: 'inaugural-lecture',
      value: 'Professor Benjamin Friedman',
      label:
        'Inaugural lecture — William Joseph Maier Professor of Political Economy, Harvard University',
    },
  ],
  related: {
    heading: 'Other Centres of Excellence',
    items: [
      {
        id: 'gender-equality',
        label: 'Centre for Gender Equality & Inclusive Leadership',
        href: '/research/centres/gender-equality',
      },
      { id: 'xceed', label: 'XCEED – XLRI Incubator', href: 'https://xceed.xlri.ac.in/' },
      {
        id: 'design-of-automobiles',
        label: 'Indian School for Design of Automobiles',
        href: '/research/centres/design-of-automobiles',
      },
      {
        id: 'healthcare-management',
        label: 'Centre for Healthcare Management',
        href: '/research/centres/healthcare-management',
      },
    ],
  },
};
