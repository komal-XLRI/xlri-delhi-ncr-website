import type { BoardOfGovernors } from '@/types/board-of-governors';

/**
 * "Board of Governors" content.
 *
 * From the XLRI Jamshedpur page (xlri.ac.in/about/board-of-governors) — one
 * board governs both campuses. That page fills itself at runtime from XLRI's
 * CMS (xlri-live.xlri.edu/xlri-cms/template/xlri/board-of-governor); this file
 * was generated from the same feed, so the people, order and designations match
 * it exactly. Portraits are the feed's 270×315 originals, self-hosted under
 * public/media/board-of-governors/.
 *
 * Two edits to the feed: designations, which arrive as HTML with <br> breaks,
 * are split into lines; and Jesuit names follow the house style used across
 * these pages, "Fr. Firstname Surname, SJ", where the feed has "Fr … S.J.".
 *
 * Membership changes. When it does, update this file from the feed rather than
 * by hand — or, once Payload lands, from the CMS directly.
 */
export const boardOfGovernors: BoardOfGovernors = {
  title: 'Board of Governors',
  officeBearers: [
    {
      position: 'Chairman',
      member: {
        id: 't-v-narendran',
        name: 'T V Narendran',
        lines: ['CEO & Managing Director', 'Tata Steel Ltd.', 'Jamshedpur'],
        portrait: {
          src: '/media/board-of-governors/t-v-narendran.jpg',
          width: 270,
          height: 315,
        },
      },
    },
    {
      position: 'Secretary',
      member: {
        id: 'sanjay-k-patro',
        name: 'Sanjay K. Patro',
        lines: ['Dean [Academics]', 'XLRI', 'Jamshedpur'],
        portrait: {
          src: '/media/board-of-governors/sanjay-k-patro.jpg',
          width: 270,
          height: 315,
        },
      },
    },
    {
      position: 'Vice Chairman',
      member: {
        id: 'fr-s-george',
        name: 'Fr. S George, SJ',
        lines: ['Director', 'XLRI', 'Jamshedpur'],
        portrait: {
          src: '/media/board-of-governors/fr-s-george.jpg',
          width: 270,
          height: 315,
        },
      },
    },
    {
      position: 'Treasurer',
      member: {
        id: 'fr-donald-dsilva',
        name: 'Fr. Donald D’Silva, SJ',
        lines: ['Dean [Administration & Finance]', 'XLRI', 'Jamshedpur'],
        portrait: {
          src: '/media/board-of-governors/fr-donald-dsilva.jpg',
          width: 270,
          height: 315,
        },
      },
    },
  ],
  members: {
    heading: 'Members',
    people: [
      {
        id: 'fr-jerome-stanislaus-dsouza',
        name: 'Fr. Jerome Stanislaus D’Souza, SJ',
        lines: ['Provincial', 'South Asia'],
        portrait: {
          src: '/media/board-of-governors/fr-jerome-stanislaus-dsouza.jpg',
          width: 270,
          height: 315,
        },
      },
      {
        id: 'fr-sunny-jacob',
        name: 'Fr. Sunny Jacob, SJ',
        lines: ['President', 'Jamshedpur Jesuit Society', 'Jamshedpur'],
        portrait: {
          src: '/media/board-of-governors/fr-sunny-jacob.jpg',
          width: 270,
          height: 315,
        },
      },
      {
        id: 'jaspal-bindra',
        name: 'Jaspal Bindra',
        lines: ['Chairman', 'Centrum Group', 'Mumbai'],
        portrait: {
          src: '/media/board-of-governors/jaspal-bindra.jpg',
          width: 270,
          height: 315,
        },
      },
      {
        id: 'ajay-kaul',
        name: 'Ajay Kaul',
        lines: ['Senior Director', 'Everstone Capital Asia Pvt Ltd', 'Singapore'],
        portrait: {
          src: '/media/board-of-governors/ajay-kaul.jpg',
          width: 270,
          height: 315,
        },
      },
      {
        id: 'fr-nelson-a-dsilva',
        name: 'Fr. Nelson A. D’Silva, SJ',
        lines: ['President', 'Delhi Jesuit Society', 'Delhi'],
        portrait: {
          src: '/media/board-of-governors/fr-nelson-a-dsilva.jpg',
          width: 270,
          height: 315,
        },
      },
      {
        id: 'rekha-m-menon',
        name: 'Rekha M Menon',
        lines: [
          'Former Chairperson & Senior Managing Director',
          'Accenture Services Pvt. Ltd.',
          'Bangalore',
        ],
        portrait: {
          src: '/media/board-of-governors/rekha-m-menon.jpg',
          width: 270,
          height: 315,
        },
      },
      {
        id: 'jose-parayanken',
        name: 'Jose Parayanken',
        lines: ['Chairman', 'Mozambique Holdings, Maputo', 'Mozambique'],
        portrait: {
          src: '/media/board-of-governors/jose-parayanken.jpg',
          width: 270,
          height: 315,
        },
      },
      {
        id: 'n-s-rajan',
        name: 'N S Rajan',
        lines: ['Former CEO', 'IDFC Foundation', 'IDFC Bank', 'Mumbai'],
        portrait: {
          src: '/media/board-of-governors/n-s-rajan.jpg',
          width: 270,
          height: 315,
        },
      },
      {
        id: 'd-shivakumar',
        name: 'D Shivakumar',
        lines: ['Former Chairman, Pepsico;', 'Former Director-Strategy, Aditya Birla Group'],
        portrait: {
          src: '/media/board-of-governors/d-shivakumar.jpg',
          width: 270,
          height: 315,
        },
      },
      {
        id: 'ranaveer-sinha',
        name: 'Ranaveer Sinha',
        lines: [
          'President XLRI Alumni Association. Former MD-Tata Hitachi; Former Chairman, Indian Construction Equipment Manufacturing Association.',
        ],
        portrait: {
          src: '/media/board-of-governors/ranaveer-sinha.jpg',
          width: 270,
          height: 315,
        },
      },
      {
        id: 'fr-antony-r-uvari',
        name: 'Fr. Antony R Uvari, SJ',
        lines: ['Director', 'XLRI Delhi-NCR'],
        portrait: {
          src: '/media/board-of-governors/fr-antony-r-uvari.jpg',
          width: 270,
          height: 315,
        },
      },
      {
        id: 'm-g-jomon',
        name: 'M G Jomon',
        lines: ['Professor of HRM.', 'XLRI, Jamshedpur'],
        portrait: {
          src: '/media/board-of-governors/m-g-jomon.jpg',
          width: 270,
          height: 315,
        },
      },
      {
        id: 'fr-k-s-casimir',
        name: 'Fr. K S Casimir, SJ',
        lines: ['Vice Chancellor', 'XIM University, Bhubaneswar'],
        portrait: {
          src: '/media/board-of-governors/fr-k-s-casimir.jpg',
          width: 270,
          height: 315,
        },
      },
      {
        id: 'sandeep-kataria',
        name: 'Sandeep Kataria',
        lines: ['Chief Executive Officer (CEO),', 'Bata Brands'],
        portrait: {
          src: '/media/board-of-governors/sandeep-kataria.jpg',
          width: 270,
          height: 315,
        },
      },
      {
        id: 'fr-marianus-kujur',
        name: 'Fr. Marianus Kujur, SJ',
        lines: ['Director', 'XISS'],
        portrait: {
          src: '/media/board-of-governors/fr-marianus-kujur.jpg',
          width: 270,
          height: 315,
        },
      },
      {
        id: 'madhav-b-kalyan',
        name: 'Madhav B Kalyan',
        lines: ['Managing Director', 'JP Morgan'],
        portrait: {
          src: '/media/board-of-governors/madhav-b-kalyan.jpg',
          width: 270,
          height: 315,
        },
      },
      {
        id: 'vasanthi-srinivasan',
        name: 'Vasanthi Srinivasan',
        lines: ['Professor OB & HRM', 'IIM Bangalore'],
        portrait: {
          src: '/media/board-of-governors/vasanthi-srinivasan.jpg',
          width: 270,
          height: 315,
        },
      },
    ],
  },
  invitees: {
    heading: 'Permanent Invitees',
    people: [
      {
        id: 'munish-kumar-thakur',
        name: 'Munish Kumar Thakur',
        lines: ['Dean [Academics]', 'XLRI', 'Delhi-NCR'],
        portrait: {
          src: '/media/board-of-governors/munish-kumar-thakur.jpg',
          width: 270,
          height: 315,
        },
      },
    ],
  },
};
