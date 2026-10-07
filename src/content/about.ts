import { routes } from '@/constants/routes';
import type { AboutPage } from '@/types/about';

/**
 * "About" landing page content.
 *
 * ## Sources
 *
 * The Delhi-NCR page (xlridelhi.ac.in/about-xlri/) has two short sections —
 * "XLRI" and "Delhi-NCR Campus" — and a gallery of campus photographs. Its text
 * is used verbatim: the founding paragraph leads the hero, the "whole-person"
 * sentence introduces the navy band, and both campus paragraphs sit in the
 * campus section. The photographs are its gallery originals (looked up through
 * the site's media API; the page itself only serves thumbnails), re-encoded
 * and self-hosted under public/media/about/.
 *
 * The Jamshedpur layout this follows also needs short headings and card copy
 * the Delhi page does not have. Those are drawn from Delhi's own published
 * words elsewhere — the navy band's heading is two of its stated values, the
 * intro heading condenses its vision statement, and each card quotes the page
 * it links to — so nothing here is invented.
 *
 * Jesuit names follow the house style, "Fr. Firstname Surname, SJ".
 */
export const about: AboutPage = {
  hero: {
    title: 'About XLRI',
    lead: 'XLRI, the oldest B-school in India, was founded in 1949 by a few visionary Jesuit Fathers to bring a change in the economy and society at large. The institute always strives to be a management school with a difference.',
    banner: {
      src: '/media/about/campus-aerial-wide.jpg',
      width: 2000,
      height: 1125,
      alt: 'Aerial view of the XLRI Delhi-NCR campus at Jhajjar, with its academic blocks around the central lawn',
    },
  },

  intro: {
    // Condensed from the vision statement: "To be an institution of excellence
    // nurturing responsible global leaders for the greater common good and a
    // sustainable future."
    heading: 'Responsible global leaders.. a sustainable future..',
    cards: [
      {
        id: 'heritage',
        icon: 'landmark',
        title: 'Heritage',
        body: 'XLRI was founded in 1949 by Fr. Quinn Enright, SJ in the Steel City of Jamshedpur — the oldest management school in India.',
        href: routes.about.heritage,
      },
      {
        id: 'vision-mission',
        icon: 'compass',
        title: 'Vision & Mission',
        body: 'To be an institution of excellence nurturing responsible global leaders for the greater common good and a sustainable future.',
        href: routes.about.visionMission,
      },
      {
        id: 'accreditation',
        icon: 'seal',
        title: 'Accreditation',
        body: 'AMBA accreditation for the third consecutive time, and BGA accreditation for the first time, each for 2025-2030.',
        href: routes.about.accreditation,
      },
      {
        id: 'founding-fathers',
        icon: 'book',
        title: 'Jesuit Founding Fathers',
        body: 'The visionaries whose commitment and adherence to the Jesuit spirit of Magis shaped this centre of excellence.',
        href: routes.about.foundingFathers,
      },
    ],
  },

  explore: {
    // Two of the seven values on Vision & Mission.
    heading: 'Global Mindset, Sensitive Social Conscience',
    body: 'Pursuit of academic excellence and fostering whole-person integral growth of students has been the hallmark of XLRI for over six decades.',
    cards: [
      {
        id: 'directors-desk',
        label: 'From the Director’s Desk',
        href: routes.about.directorsDesk,
        image: {
          src: '/media/about/main-building.jpg',
          width: 1200,
          height: 800,
          alt: '',
        },
      },
      {
        id: 'leadership',
        label: 'Leadership & Administration',
        href: routes.about.leadership,
        image: {
          src: '/media/about/academic-blocks-sunlit.jpg',
          width: 1200,
          height: 800,
          alt: '',
        },
      },
      {
        id: 'board',
        label: 'Board of Governors',
        href: routes.about.boardOfGovernors,
        image: {
          src: '/media/about/academic-block-angled.jpg',
          width: 1200,
          height: 675,
          alt: '',
        },
      },
    ],
  },

  campus: {
    heading: 'Delhi-NCR Campus',
    paragraphs: [
      'XLRI | Delhi-NCR campus is located in Jhajjar District, at Aurangpur, which is 25 km from Gurugram and is centrally connected to the main districts like Delhi, Gurgaon, and Rewari. The foundation stone for the XLRI Delhi-NCR campus in Jhajjar District was laid on 16 January 2017. Shri Om Prakash Dhankar, Cabinet minister, Government of Haryana unveiled the plaque of the foundation stone, and Rev. Anil Couto, Archbishop of Delhi, blessed the foundation stone.',
      'The new state-of-the-art campus is spread over an area of 47 acres, has been designed to promote an eco-friendly living experience and to foster climate consciousness. The orientation of the campus buildings have been planned using detailed sun studies and applying concepts of solar-passive architecture. The areas that receive harsher sunlight have a second skin in the form of ventilated cladding. The new campus has earned a platinum-level Green Building Certification, and it has been designed using IGBC guidelines.',
    ],
    image: {
      src: '/media/about/campus-aerial-mdp.jpg',
      width: 1400,
      height: 788,
      alt: 'Aerial view of the MDP Block and residential buildings on the XLRI Delhi-NCR campus',
    },
    links: [
      { id: 'campus-life', label: 'Campus Life', href: routes.campusLife.index },
      { id: 'admissions', label: 'Admissions', href: routes.admissions.index },
      {
        id: 'disclosure',
        label: 'Mandatory Disclosure',
        href: routes.about.mandatoryDisclosure,
      },
      { id: 'contact', label: 'Contact Us', href: routes.contact },
    ],
  },
};
