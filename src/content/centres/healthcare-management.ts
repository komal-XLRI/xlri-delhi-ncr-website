import type { HealthcareCentre } from '@/types/healthcare-centre';

const MEDIA = '/media/centres/healthcare-management';

/**
 * XLRI Centre for Healthcare Management.
 *
 * ## Sources
 *
 * Everything is from the Delhi-NCR page
 * (xlridelhi.ac.in/xlri-center-for-healthcare-management/). The wording is
 * the page's own, with these repairs:
 *
 *  - "Center" → "Centre", the spelling the rest of this site (and its
 *    navigation) uses for every centre.
 *  - "The vision … is position XLRI" → "is to position XLRI".
 *  - "In today’s era. collaborations" → "In today’s era, collaborations".
 *  - "Along-with" → "Along with"; "its’ collaborating institutions" → "its".
 *  - "design cutting programs" → "design cutting-edge programs".
 *  - The long "About" paragraph is split where its subject changes. Its last
 *    sentence on the Delhi page is a fragment ("It is against this
 *    backdrop."), which the Mission completes; it is kept as published.
 *
 * The two lists in the ecosystem panel are lifted, word for word, from the
 * "About" paragraph that names them.
 *
 * The photographs are the three on the Delhi page — the Centre's partnership
 * signings with CMC Vellore, SRIHER and St. John’s — at full size from the
 * site's media library, self-hosted under
 * public/media/centres/healthcare-management/.
 */
export const healthcareCentre: HealthcareCentre = {
  shortName: 'Healthcare Management',
  title: 'XLRI Centre for Healthcare Management',
  lead: 'Our aim is to make XLRI and the XLRI Centre for Healthcare Management synonymous with leadership at the cutting edge of healthcare management, healthcare policy, and healthcare management research in India.',
  photos: [
    {
      id: 'cmc-vellore',
      src: `${MEDIA}/cmc-vellore.jpg`,
      width: 1379,
      height: 717,
      alt: 'XLRI and Christian Medical College Vellore representatives holding the signed partnership documents',
      caption: 'CMC – Vellore',
    },
    {
      id: 'sriher',
      src: `${MEDIA}/sriher.jpg`,
      width: 1379,
      height: 717,
      alt: 'XLRI and Sri Ramachandra Institute of Higher Education & Research representatives signing the partnership agreement',
      caption: 'Sri Ramachandra Institute of Higher Education & Research (SRIHER)',
    },
    {
      id: 'st-johns',
      src: `${MEDIA}/st-johns.jpg`,
      width: 1500,
      height: 1075,
      alt: 'XLRI and St. John’s Medical College representatives shaking hands over the signed agreement',
      caption: 'St. John’s Medical College',
    },
  ],
  about: {
    heading: 'About the Centre',
    paragraphs: [
      'The healthcare segment is a fast-growing segment with an immense potential to contribute to the needs of the world and more so in India. With Indian spending on healthcare a fraction of healthcare spending in the developed world, there is immense potential for rapid growth in this segment to address the health concerns of a large population that faces inequities in the availability of quality healthcare.',
      'The changes in the healthcare ecosystem have redefined the nature of participants in this sector that traditionally included hospitals, medical device companies, and pharmaceutical companies. We now have a growing number of specialized consultancy bodies, healthcare analytics specialists, healthcare legal professionals, health insurance companies, health-tech specialists, specialist pharmaceutical research organizations, public health professionals, healthcare logistics specialists, and many others contributing to this critical ecosystem in India.',
      'The growth of this ecosystem brings with it the challenge of meeting the professionally trained & skilled human capital requirements to efficiently and effectively manage the activities of organizations in this ecosystem towards effective and efficient addressing of the needs of the Indian populace. Along with education, healthcare retains a strategic public policy importance in developing the overall human capital and quality of life in India. It is against this backdrop.',
    ],
    ecosystem: {
      heading: 'A redefined ecosystem',
      traditional: {
        label: 'Traditionally',
        items: ['Hospitals', 'Medical device companies', 'Pharmaceutical companies'],
      },
      growing: {
        label: 'Now, a growing number of',
        items: [
          'Specialized consultancy bodies',
          'Healthcare analytics specialists',
          'Healthcare legal professionals',
          'Health insurance companies',
          'Health-tech specialists',
          'Specialist pharmaceutical research organizations',
          'Public health professionals',
          'Healthcare logistics specialists',
        ],
      },
    },
  },
  vision: {
    heading: 'Vision of the Centre',
    paragraphs: [
      'The vision of the XLRI Centre for Healthcare Management is to position XLRI uniquely in the healthcare management domain by providing high quality academic programs, professional and skill development programs, and policy-oriented research in collaboration with medical institutions of high repute. Our aim is to make XLRI and the XLRI Centre for Healthcare Management synonymous with leadership at the cutting edge of healthcare management, healthcare policy, and healthcare management research in India.',
      'The long-term vision we seek to achieve is for XLRI to be recognized as an educational institution of choice for healthcare ecosystem professionals in India and globally through the activities of the centre. The institute eagerly looks forward to contributing towards the United Nations Sustainable Development Goals by providing highly skilled, responsible, and ethical healthcare management professionals to help address the crucial healthcare needs of the nation through the activities of the centre.',
    ],
  },
  mission: {
    heading: 'Mission of the Centre',
    paragraphs: [
      'The rapid growth and development of the Indian economy has brought along with it a new set of imperatives, goals, desires, and needs of the Indian population. India’s commitment to the United Nations Sustainable Development Goals has brought to the fore multiple challenges that need to be addressed by the nation as it marches towards a century of independence. One such crucial area is the goal of ensuring healthy lives and promoting well-being of the citizens of the country and the reduction of inequities in access to quality healthcare services.',
      'This growing imperative for affordable, accessible, equitable, high-quality healthcare services in India’s journey towards sustainable, inclusive growth for all would, in addition to an increase in quantity and quality of healthcare infrastructure, also require a significant number of professionals trained in cutting-edge management practices relevant to the Indian healthcare sector.',
      'It is with an eye on the newer needs of the nation, the mission of the institute, and the need to continually create and maintain our stature as India’s oldest and one of the most respected management institutions, that the XLRI Centre For Healthcare Management was set-up.',
    ],
  },
  activities: {
    heading: 'Activities of the Centre',
    intro:
      'In today’s era, collaborations and creating an ecosystem of prestigious institutions, Indian and Global, sharing a common vision is key to achieving the ambitious goals of the Centre. Towards this end, we have entered into broad-based collaborations with institutions of high repute to jointly offer academic programs, executive education programs, skill development programs, and collaborative research. We are constantly looking forward to expanding our collaborations towards meeting the vision of the Centre.',
    items: [
      { id: 'academic', icon: 'academic', label: 'Academic programs' },
      { id: 'executive', icon: 'executive', label: 'Executive education programs' },
      { id: 'skills', icon: 'skills', label: 'Skill development programs' },
      { id: 'research', icon: 'research', label: 'Collaborative research' },
    ],
  },
  collaborations: {
    heading: 'Collaborations',
    intro:
      'Our collaborating institutions include the following top-ranked Institutions who are pioneers in the domain of Medical Education and Practice:',
    items: [
      {
        id: 'cmc-vellore',
        name: 'Christian Medical College (CMC) Vellore',
        href: 'https://www.cmch-vellore.edu',
      },
      {
        id: 'sriher',
        name: 'Sri Ramachandra Institute of Higher Education & Research (Deemed to be University)',
        href: 'https://www.sriramachandra.edu.in',
      },
      {
        id: 'cmc-ludhiana',
        name: 'Christian Medical College & Hospital Ludhiana',
        href: 'https://www.cmcludhiana.in',
      },
      {
        id: 'st-johns',
        name: 'St. John’s National Academy of Health Sciences (St. John’s Medical College)',
        href: 'https://stjohns.in',
      },
      {
        id: 'iae-paris',
        name: 'IAE Paris Sorbonne Business School',
        href: 'https://www.iae-paris.com/en/international/sorbonne-business-school',
      },
      {
        id: 'iie',
        name: 'IIE Consortium of International Higher Education Institutions',
        href: 'https://www.iie.global/about.html',
      },
      {
        id: 'dcac',
        name: 'The Danish Consortium of Academic Craftsmanship',
        href: 'https://www.dcac.dk/about',
      },
      {
        id: 'aster',
        name: 'Aster Health Academy',
        href: 'https://asterhealthacademy.com/about-us/',
      },
    ],
  },
  upcoming: {
    heading: 'Upcoming Programs & Activities',
    paragraphs: [
      'In addition to collaborative research projects, the Centre and its collaborating institutions are working closely to design cutting-edge programs that are specially curated to meet the requirements of professionals across all stages of their careers in the healthcare ecosystem.',
      'The uniqueness of these programs is that they have been co-created to meet the specific, practical requirements of professionals in the healthcare ecosystem and will be jointly delivered by faculty from XLRI and the collaborating institutions.',
    ],
    comingSoon: {
      label: 'Coming Soon',
      text: 'Upcoming Programs … Please watch this space for more details.',
    },
  },
};
