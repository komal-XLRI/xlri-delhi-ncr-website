import type { VisionMission, VisionMissionImage } from '@/types/vision-mission';

/**
 * "Vision & Mission" content.
 *
 * Copied verbatim from the current site (xlridelhi.ac.in/about-xlri/vision-mission/).
 * These are adopted institutional statements — the PEOs in particular are
 * accreditation text — so the wording, including "Program", is left exactly as
 * published rather than brought into house style.
 *
 * Photographs: the three campus images that page uses as section backgrounds
 * (wp-content/uploads/2026/05/campus-img-{1,2,3}.png), converted from 2–3 MB
 * PNGs to ~250 kB JPEGs and self-hosted under public/media/vision-mission/.
 */

/**
 * Alt text is empty on all three: as value photographs they are decorative —
 * the value's name is set beside them. The hero gives its own alt below.
 */
const lawn: VisionMissionImage = {
  src: '/media/vision-mission/campus-lawn.jpg',
  width: 1536,
  height: 1024,
  alt: '',
};

const iLoveXlri: VisionMissionImage = {
  src: '/media/vision-mission/campus-i-love-xlri.jpg',
  width: 1537,
  height: 1023,
  alt: '',
};

const dusk: VisionMissionImage = {
  src: '/media/vision-mission/campus-dusk-blocks.jpg',
  width: 1448,
  height: 1086,
  alt: '',
};

export const visionMission: VisionMission = {
  title: 'Vision & Mission',
  // The XLRI tagline, shared with the Jamshedpur page this design follows.
  headline: 'Nurturing responsible global leaders for a better tomorrow.',
  // The dusk photograph leads, so the page does not open on the same picture
  // the first value (Ethical Conduct) shows directly below it.
  heroImage: {
    ...dusk,
    alt: 'The Academic and Administrative Blocks of the XLRI Delhi-NCR campus at dusk',
  },

  vision: {
    heading: 'Vision',
    body: 'To be an institution of excellence nurturing responsible global leaders for the greater common good and a sustainable future.',
  },

  mission: {
    heading: 'Mission',
    points: [
      'To disseminate knowledge in management through a portfolio of educational programs and publications',
      'To extend frontiers of knowledge through relevant and contextual research',
      'To nurture responsive ethical leaders sensitive to environment and society',
      'To encourage critical thinking and continuous improvement',
      'To inculcate a culture of innovation and entrepreneurship',
    ],
  },

  values: {
    heading: 'Our Values',
    intro: 'Inspired by the Jesuit spirit of “Magis”, XLRI will be guided by the following values:',
    items: [
      { id: 'ethical-conduct', title: 'Ethical Conduct', image: lawn },
      { id: 'integrity-trust', title: 'Integrity and Trust', image: iLoveXlri },
      { id: 'passion-excellence', title: 'Passion for Excellence', image: dusk },
      { id: 'social-conscience', title: 'Sensitive Social Conscience', image: lawn },
      { id: 'inclusiveness', title: 'Inclusiveness and Tolerance', image: iLoveXlri },
      { id: 'creativity', title: 'Creativity and Innovation', image: dusk },
      { id: 'global-mindset', title: 'Global Mindset', image: lawn },
    ],
  },

  objectives: {
    heading: 'Program Education Objectives (PEOs)',
    items: [
      {
        id: 'peo-1',
        label: 'PEO 1',
        body: 'Graduates shall apply rigorous, contextual management to deliver results with integrity and inclusion.',
      },
      {
        id: 'peo-2',
        label: 'PEO 2',
        body: 'Graduates shall create data-driven/evidence-based solutions that solve real business and social challenges.',
      },
      {
        id: 'peo-3',
        label: 'PEO 3',
        body: 'Graduates shall champion innovative and ethical solutions to generate sustainable, stakeholder value.',
      },
    ],
  },
};
