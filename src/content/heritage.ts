import type { Heritage } from '@/types/heritage';

/**
 * "Heritage" content.
 *
 * ## Sources
 *
 * Text is the Delhi-NCR site's own (xlridelhi.ac.in/heritage/), verbatim, with
 * two exceptions noted inline. Photographs and the film come from the
 * Jamshedpur page (xlri.ac.in/about/heritage), which holds the institution's
 * archive — it is one XLRI history — except the 2020 entry, which uses the
 * Delhi site's own photograph of the Jhajjar campus.
 *
 * The timeline entry titles are Jamshedpur's: the Delhi timeline has a year and
 * a sentence but no title, and the design sets one per slide.
 *
 * All images self-hosted under public/media/heritage/.
 */
export const heritage: Heritage = {
  title: 'Heritage',

  founding: {
    lead: 'XLRI was founded in 1949 by Fr. Quinn Enright, S.J. in the Steel City of Jamshedpur.',
    body: 'Fr. Enright visualized XLRI to be a partner in the liberation and development journey of the independent India with a vision of “renewing the face of the earth”. Fr. Bill Tome joined hands with him to bring that vision to fruition. Both, together with the other Jesuit companions, worked tirelessly towards translating the Vision “Renewing the face of the earth” into action.',
  },

  founder: {
    name: 'Fr. Quinn Enright, S.J.',
    role: 'Founder Director of XLRI',
    portrait: {
      src: '/media/heritage/fr-quinn-enright.jpg',
      width: 902,
      height: 450,
      alt: 'Black-and-white portrait of Fr. Quinn Enright, S.J., founder of XLRI',
    },
  },

  film: {
    youtubeId: '8s2KnMctF1o',
    title: 'XLRI’s 75 years | Ad Maius Bonum',
    poster: {
      src: '/media/heritage/heritage-film-poster.jpg',
      width: 1280,
      height: 720,
      alt: '',
    },
  },

  story: {
    left: [
      'Over the years XLRI has developed its own distinct identity. Established in 1949, XLRI is the oldest management school in India. The hallmark of this identity is, not to walk on the beaten path, but to strike new routes; not to benchmark, but to be benchmarked; to be second to none, but to be the first to respond to the needs of the people and the nation; taking up tasks that are bold, but necessary, that which nobody has hitherto taken up. This enterprising and pioneering spirit can be witnessed throughout the history of XLRI.',
      'XLRI has always had and maintains a global outlook. We were the first among management schools in India to internationalise our academic programmes. Renowned personalities, distinguished industrialists, academicians and stewards of Jamshedpur Jesuit Society have been part of the institute as Board of Governors, leaders and administrators, teachers and guides. True to its vision, XLRI strives to offer an education which just does not culminate in a mere degree, but one that inspires future business leaders to respond to the unmet needs of the society.',
      'A key characteristic that sets apart XLRI students from other management schools is MAGIS - a quest for the best, never to settle down for mediocrity and always aspire to excel. They relentlessly strive for more, for something better than the best. Instead of wishing circumstances to change and become different, MAGIS-driven persons either make them happen or make the most of them; instead of waiting for golden opportunities, they turn all that they touch into gold.',
    ],
    right: [
      'XLRI, one of the best management schools in India, at its inception, started several management-centric courses for trade unions. In 1953, a two-year, day programme in Industrial Relations and Welfare was started, which was later re-christened as Human Resource Management. Since then, XLRI has added many management-centred academic programmes to its portfolio and has expanded its infrastructure to meet the growing demand of students and establish itself as a premier management school in India. A three-year, evening programme in Business Management was started in 1965, and in 1968 a two-year full-time programme in Business Management was launched.',
      'Over the years, XLRI has launched quite a few short and long-term programmes for working executives to help upgrade their management-centric knowledgebase and become more competent business leaders.',
    ],
  },

  timeline: {
    eyebrow: 'Over 75 years',
    heading: 'XL Journey',
    intro:
      'The XL journey that began with the Vision of a few Jesuit fathers has nurtured many business leaders, industrialists and changemakers in its course of translating dreams into reality. As we look back, we are reminded of the undeterred pursuit of the founding fathers to bring change in society and the nation at large.',
    entries: [
      {
        id: '1949',
        year: '1949',
        title: 'Core committee formation',
        body: 'In 1949, Fr Quinn Enright, S.J. with the help of the then General Manager of TISCO NJ Haley, formed a core committee comprising Michael John (union leader), MD Madan, Dr Sukhatme, and GV Apte and started operating from the Boulevard Hotel in Bistupur.',
        image: {
          src: '/media/heritage/1949-fr-enright.jpg',
          width: 300,
          height: 450,
          alt: 'Fr. Quinn Enright, S.J., around the time of XLRI’s founding',
        },
      },
      {
        id: '1956',
        year: '1956',
        title: 'Two year day programme commenced',
        body: 'On 8 December, 1956, the ground breaking ceremony for the present XLRI campus was held. In 1956, the classes shifted to a room in Loyola School and a two year day programme commenced here leading to a post-graduate diploma in Industrial Relations.',
        image: {
          src: '/media/heritage/1956-loyola-school.jpg',
          width: 715,
          height: 658,
          alt: 'Group photograph at Loyola School. Seated, third from left: Fr. Eugene Power, S.J., Fr. Jim Collins, S.J., Fr. E.H. McGrath, S.J., Fr. William N. Tome, S.J., with students',
        },
      },
      {
        id: '1958',
        year: '1958',
        title: 'First batch graduated',
        body: 'In 1958, the first batch of XLRI graduated from the premises of Loyola School.',
        image: {
          src: '/media/heritage/1958-first-convocation.jpg',
          width: 565,
          height: 379,
          alt: 'Graduates in gowns at XLRI’s first convocation, 1958',
        },
      },
      {
        id: '1959',
        year: '1959',
        title: 'Fr. E.H. McGrath took over the charge',
        body: 'In 1959 Fr. Enright left for the US handing over the charge of construction of the campus to Fr. EH McGrath.',
      },
      {
        // The Delhi site labels this entry 1969, but its own text — and the
        // Jamshedpur timeline — date the inauguration to 1962.
        id: '1962',
        year: '1962',
        title: 'XLRI heritage campus inaugurated',
        body: 'In 1962, the present XLRI heritage campus was inaugurated.',
        image: {
          src: '/media/heritage/1962-campus-inauguration.jpg',
          width: 576,
          height: 463,
          alt: 'The Governor of Kerala formally dedicating the new XLRI building, 24 March 1962',
        },
      },
      {
        id: '2015',
        year: '2015',
        title: 'Campus extension inaugurated',
        body: 'The contiguous extension of the existing XLRI, Jamshedpur campus was inaugurated by Cyrus Mistry, the then Chairman, Tata Sons, on 17 Nov, 2015',
        image: {
          src: '/media/heritage/2015-campus-extension.jpg',
          width: 800,
          height: 626,
          alt: 'Speakers on stage at the inauguration of the XLRI Jamshedpur campus extension, 2015',
        },
      },
      {
        id: '2017',
        year: '2017',
        title: 'Foundation for Delhi campus laid',
        body: 'The foundation stone for the Jhajjar campus in Delhi-NCR was laid on 16 January, 2017 by Om Prakash Dhankar, Cabinet Minister, Government of Haryana',
      },
      {
        id: '2020',
        year: '2020',
        title: 'XLRI Delhi campus commenced',
        body: 'XLRI | Delhi-NCR commenced its academic year in August 2020',
        image: {
          src: '/media/heritage/delhi-campus-2020.jpg',
          width: 680,
          height: 296,
          alt: 'The XLRI Delhi-NCR campus at Jhajjar at dusk',
        },
      },
    ],
  },
};
