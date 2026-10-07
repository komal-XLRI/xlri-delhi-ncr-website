import type { AutomobileDesignCentre } from '@/types/automobile-design';

const MEDIA = '/media/centres/design-of-automobiles';

const mentor = (id: string, name: string, role: string, href: string) => ({
  id,
  name,
  role,
  href,
  portrait: { src: `${MEDIA}/mentors/${id}.jpg`, width: 300, height: 300 },
});

/**
 * Indian School for Design of Automobiles (INDEA).
 *
 * ## Sources
 *
 * Everything is from the Delhi-NCR page
 * (xlridelhi.ac.in/indian-school-for-design-of-automobiles/), verbatim but for
 * these repairs:
 *
 *  - "The groundbreaking … ceremony … was took place" → "took place".
 *  - "‘Does India Need a Design DNA’?" → "‘Does India Need a Design DNA?’".
 *  - "…from the 1970s.Visitors" — the missing space restored.
 *  - The debate paragraph sets names in Unicode "mathematical bold" letters
 *    (𝗗𝗿 𝗙𝗿. 𝗞.𝗦. …), which screen readers spell out or skip; they are
 *    plain text here. "Shri." → "Shri"; the Director's name in the house style.
 *  - The long curriculum paragraph is split where its subject changes, so the
 *    flagship programme can be set as a callout. No words are changed.
 *
 * Photographs are the page's own, at full size from the site's media library,
 * self-hosted under public/media/centres/design-of-automobiles/. The Marcello
 * Gandini image on the Delhi page has his message set into the picture; here
 * the photograph is cropped to him and the message is real text.
 *
 * The press list keeps the Delhi page's order. Its two broken links (stray
 * "%20"s) are handled: the ET Auto one is repaired, and the BW AutoWorld one
 * duplicated a working link beside it, so it is dropped. Headlines are the
 * articles' own titles.
 */
export const automobileDesignCentre: AutomobileDesignCentre = {
  shortName: 'INDEA',
  title: 'Indian School for Design of Automobiles',
  statement:
    'Once operational, INDEA will be a first-of-its-kind dedicated finishing school for automobile design in India',
  logo: {
    src: `${MEDIA}/indea-logo.jpg`,
    width: 1320,
    height: 735,
    alt: 'INDEA — Indian School for Design of Automobiles. An XLRI – Avik Chattopadhyay initiative. Shape the future, for the greater good!',
  },
  facts: [
    { id: 'announced', value: '4 March 2024', label: 'INDEA announced' },
    { id: 'foundation', value: '16 June 2025', label: 'Foundation stone laid' },
    { id: 'construction', value: 'August 2025', label: 'Construction began' },
    { id: 'campus', value: '45 acres', label: 'XLRI Delhi-NCR campus, fully residential' },
  ],
  intro: {
    heading: 'Make in India. Design in India.',
    paragraphs: [
      'As India strengthens its position as an unparalleled hub of technology, innovation, and economic advancement, the Indian automotive sector is poised for its next phase of growth driven by a strong post-pandemic revival, evolving consumer tastes and the need for sustainable mobility solutions.',
      'A critical component to realise the auto sector’s role as an enabler for our nation’s leap to become a $5 trillion economy will be the capability to not only ‘Make in India’ but also ‘Design in India’ through highly skilled design talent. Recognising this need, XLRI, in association with XLRI alum and automobile industry expert Avik Chattopadhyay, announced the creation of the Indian School for Design of Automobiles (INDEA) on March 4, 2024.',
    ],
    image: {
      src: `${MEDIA}/make-design-create-in-india.jpg`,
      width: 1600,
      height: 752,
      alt: 'Make in India plus Design in India equals Create in India',
    },
  },
  campus: {
    heading: 'Building INDEA',
    ceremony:
      'The groundbreaking and foundation stone ceremony for the INDEA campus took place on 16 June, 2025 at the hands of Shri Nitin Gadkari, Hon’ble Minister for Road Transport and Highways, India.',
    ceremonyImage: {
      src: `${MEDIA}/gadkari-foundation-address.jpg`,
      width: 1224,
      height: 676,
      alt: 'Shri Nitin Gadkari, Minister for Road Transport and Highways, addressing the INDEA foundation stone ceremony',
    },
    pillar: {
      caption:
        'The foundation pillar titled Param—a Sanskrit word meaning supreme, highest, or ultimate—marks the beginning of a pioneering hub for innovation and excellence.',
      image: {
        src: `${MEDIA}/param-foundation-pillar.jpg`,
        width: 1200,
        height: 1345,
        alt: 'Param, the INDEA foundation pillar — a tall white obelisk with a rust-coloured plaque bearing the INDEA and XLRI marks, on the Delhi-NCR campus lawn',
      },
    },
    paragraphs: [
      'The upcoming INDEA Building will be housed within the 45-acre XLRI Delhi-NCR campus, offering a fully residential, sustainable ecosystem designed to promote collaboration and interaction between the existing MBA program and the Innovation, Entrepreneurship, and Venture Development (IEV) cohorts.',
      'Construction for the new INDEA building commenced in August 2025.',
    ],
    studio: {
      text: 'INDEA will have a full-fledged working design studio, facilitating sketching, design, one-to-one clay modelling, and prototyping, supported by the latest equipment and software.',
      activities: ['Sketching', 'Design', 'One-to-one clay modelling', 'Prototyping'],
    },
  },
  academics: {
    heading: 'The academic framework',
    intro: 'The academic framework of INDEA is built on three core pillars:',
    pillars: [
      'Balance of intuition and industrial knowledge',
      'Rich industry interface',
      'Exposure to global thought and application',
    ],
    paragraphs: [
      'In line with this vision, the curriculum incorporates critical domains such as research, behavioural studies, consumer insight, anthropology, project planning, and cost management. It has been co-created with practising industry experts, ensuring continuous feedback and relevance to real-world needs.',
      'The curriculum has also undergone peer review by experts at leading global institutions, such as Istituto Europeo di Design (IED) and ArtCenter College of Design, to maintain an international orientation.',
    ],
    flagship: {
      label: 'Flagship programme',
      paragraphs: [
        'The flagship offering will be an AICTE-certified Master’s in Automobile Design and Management, combining studio-based work, classroom instruction, and live industry projects to deliver a balanced and mature learning experience.',
        'In addition to the flagship post-graduate programme, the institute will conduct refresher courses for practising designers and induction programmes tailored for senior industry executives.',
      ],
    },
  },
  mentors: {
    heading: 'Mentors and faculty',
    paragraphs: [
      'It is worthwhile to note that since inception the institute has onboarded leading figures from the automotive design and development world as visiting faculty, bringing international perspectives and contemporary industry practices into the classroom.',
      'INDEA’s teaching will be led by a core team of ten experienced faculty members with extensive industry backgrounds, complemented by globally acclaimed design leaders and subject-matter experts who will bring diverse perspectives to the classroom.',
    ],
    people: [
      mentor(
        'iv-rao',
        'I.V. Rao',
        'Mentor, TERI, ex- Maruti Suzuki',
        'https://www.linkedin.com/in/iv-rao-7326a04/',
      ),
      mentor(
        'gautam-sen',
        'Gautam Sen',
        'Mentor, Historian and Author',
        'https://www.linkedin.com/in/gautam-sen-10422b18/',
      ),
      mentor(
        'jean-paul-oyono',
        'Jean-Paul Oyono',
        'Head - Academic Council, ex-BMW & Zagato',
        'https://www.linkedin.com/in/jean-paul-oyono/',
      ),
      mentor(
        'rajeev-chaba',
        'Rajeev Chaba',
        'JSW-MG',
        'https://www.linkedin.com/in/rajeev-chaba-b58b284/',
      ),
      mentor(
        'marzia-gandini-provera',
        'Marzia Gandini Provera',
        'ThinkPR',
        'https://www.linkedin.com/in/marzia-gandini-provera-3400688/',
      ),
      mentor(
        'pierre-terblanche',
        'Pierre Terblanche',
        'ex-Ducati, Moto Guzzi & Royal Enfield',
        'https://www.linkedin.com/in/pierre-terblanche-14400ab/',
      ),
      mentor(
        'vinay-piparsania',
        'Vinay Piparsania',
        'Millenstrat, ex-Ford',
        'https://www.linkedin.com/in/vinay-piparsania-6992779b/',
      ),
      mentor(
        'maria-paola-stola',
        'Maria Paola Stola',
        'IED and Stola',
        'https://www.linkedin.com/in/maria-paola-stola-ariusso-94347520b/',
      ),
      mentor(
        'g-sathiyaseelan',
        'G. Sathiyaseelan',
        'Ashok Leyland',
        'https://www.linkedin.com/in/sathiyaseelan-g-4bb95048/',
      ),
      mentor(
        'anand-sharma',
        'Anand Sharma',
        'Studio34',
        'https://www.linkedin.com/in/anand-sharma-7565a679/',
      ),
    ],
  },
  milestones: {
    heading: 'INDEA in action',
    items: [
      {
        id: 'indea-debate-2024',
        eyebrow: 'The INDEA Debate · 16 December 2024',
        title: 'Does India Need a Design DNA?',
        paragraphs: [
          'On 16 December, 2024, INDEA successfully hosted the first edition of the annual INDEA Debate at the India Habitat Centre in New Delhi. The event provided a platform for leading minds from automotive design and design management to discuss and shape the future of mobility design. The debut year’s topic, ‘Does India Need a Design DNA?’, focused on the need for a distinctive automotive design language rooted in Indian culture, heritage, and ethos. As India continues to rise as a global automotive hub, the debates addressed the need for the country to carve its own identity in the world of automotive design.',
          'The debut debate was inaugurated by Shri Sasmit Patra, Hon’ble Member of Parliament, Rajya Sabha, Retd. Justice Indira Banerjee, Dr. Fr. K.S. Casimir, SJ, Director, XLRI Delhi-NCR, and Avik Chattopadhyay, Chairperson, XLRI Centre for Automobile Design & Management (XADM) and Founder of INDEA, marking a significant beginning for INDEA’s thought leadership initiatives.',
        ],
        image: {
          src: `${MEDIA}/indea-debate-2024.jpg`,
          width: 2400,
          height: 454,
          alt: 'The INDEA Debate 2024 at the India Habitat Centre: a speaker at the lectern, the guests on stage, the panel, and the audience',
        },
      },
      {
        id: 'bharat-mobility-expo-2025',
        eyebrow: 'Bharat Mobility Global Expo 2025 · Bharat Mandapam',
        title: '#DesignInIndia takes root',
        paragraphs: [
          'Closely on the heels of the annual debate, INDEA helped #DesignInIndia take root at the prestigious Bharat Mobility Global Expo 2025 at Bharat Mandapam, participating with its own booth showcasing India’s rich automotive heritage with the Sipani Badal, a revolutionary three-wheeled car from the 1970s.',
          'Visitors to the booth also unleashed their creativity on the Wacom design tablet and generally elevated the booth to be the go-to destination for budding designers, automotive experts and industry leaders, all displaying an overwhelming passion for #Automobiles #Design and #DesignEducation. The booth was inaugurated by Mr. I.V. Rao, an esteemed automotive industry veteran and mentor to INDEA, and Mr. Adil Jal Darukhanawala, a pioneer in Indian automotive journalism & Founder & Director of #AdilsAutoZone.',
        ],
        image: {
          src: `${MEDIA}/bharat-mobility-expo-2025.jpg`,
          width: 2400,
          height: 602,
          alt: 'The INDEA booth at Bharat Mobility Global Expo 2025, with the red Sipani Badal and visitors sketching on a design tablet',
        },
      },
    ],
  },
  press: {
    heading: 'INDEA in the media',
    intro:
      'Since its announcement, INDEA has received unprecedented media coverage and support with the media playing a crucial role in shaping the collective aspiration to build a future-ready mobility design ecosystem in India.',
    items: [
      {
        id: 'autocarpro-announce',
        outlet: 'Autocar Professional',
        title: 'XLRI to set up India’s first dedicated automobile design institute',
        href: 'https://www.autocarpro.in/news/xlri-to-set-up-indias-first-dedicated-automobile-design-institute-119460',
      },
      {
        id: 'indiatoday',
        outlet: 'India Today',
        title: 'XLRI to set-up Indian School for Design of Automobiles',
        href: 'https://www.indiatoday.in/auto/latest-auto-news/story/xlri-to-set-up-indian-school-for-design-of-automobiles-2511011-2024-03-05',
      },
      {
        id: 'financialexpress',
        outlet: 'The Financial Express',
        title:
          'XLRI Delhi-NCR to setup India’s first institute dedicated to automobile design and management',
        href: 'https://www.financialexpress.com/business/express-mobility-xlri-delhi-ncr-to-setup-indias-first-institute-dedicated-to-automobile-design-and-management-3413113/',
      },
      {
        id: 'etauto-foundation',
        outlet: 'ET Auto',
        title: 'Nitin Gadkari unveils foundation stone for INDEA at XLRI Delhi-NCR',
        href: 'https://auto.economictimes.indiatimes.com/news/industry/nitin-gadkari-unveils-foundation-stone-for-indea-at-xlri-delhi-ncr/121902684',
      },
      {
        id: 'autocarindia',
        outlet: 'Autocar India',
        title: 'INDEA established as India’s first automotive design school based in Delhi',
        href: 'https://www.autocarindia.com/industry/indea-established-as-india8217s-first-automotive-design-school-based-in-delhi-435754',
      },
      {
        id: 'bwautoworld',
        outlet: 'BW AutoWorld',
        title:
          'Union Minister Nitin Gadkari lays foundation stone for India’s first automotive design school',
        href: 'https://bwautoworld.com/article/union-minister-nitin-gadkari-lays-foundation-stone-for-indias-first-automotive-design-school-560352',
      },
      {
        id: 'autocarpro-foundation',
        outlet: 'Autocar Professional',
        title: 'Nitin Gadkari lays foundation stone for India’s first automobile design school',
        href: 'https://www.autocarpro.in/news/nitin-gadkari-lays-foundation-stone-for-indias-first-automobile-design-school-127036',
      },
      {
        id: 'etvbharat',
        outlet: 'ETV Bharat',
        title: 'भारत के पहले ऑटोमोटिव डिजाइन स्कूल INDEA की स्थापना, नितिन गडकरी ने रखी आधारशिला',
        href: 'https://www.etvbharat.com/hi/!technology/establishment-of-indias-first-automotive-design-school-indea-nitin-gadkari-laid-the-foundation-stone-hin25061801319',
        lang: 'hi',
      },
      {
        id: 'etauto-debate',
        outlet: 'ET Auto',
        title:
          'XLRI Delhi-NCR and INDEA discussed India’s need for design DNA at INDEA Debate 2024',
        href: 'https://auto.economictimes.indiatimes.com/news/industry/xlri-delhi-ncr-and-indea-discussed-indias-need-for-design-dna-at-indea-debate-2024/116437249',
      },
      {
        id: 'theprint',
        outlet: 'ThePrint',
        title:
          'XLRI Delhi-NCR and INDEA spark dialogue on ‘Does India Need a Design DNA?’ in a landmark debate',
        href: 'https://theprint.in/ani-press-releases/xlri-delhi-ncr-and-indea-spark-dialogue-on-does-india-need-a-design-dna-in-a-landmark-debate/2407375/',
      },
      {
        id: 'motoring-trends',
        outlet: 'Motoring Trends',
        title:
          'XLRI Delhi-NCR, INDEA showcase indigenous automotive design at Bharat Mobility Expo',
        href: 'https://motoring-trends.com/technology/xlri-delhi-ncr-indea-showcase-indigenous-automotive-design-at-bharat-mobility-expo',
      },
      {
        id: 'etauto-expo',
        outlet: 'ET Auto',
        title: 'Auto Expo 2025: INDEA showcases Indian automotive design heritage',
        href: 'https://auto.economictimes.indiatimes.com/news/industry/auto-expo-2025-indea-showcases-indian-automotive-design-heritage/117339175',
      },
    ],
  },
  quote: {
    paragraphs: [
      'For the students who will come to this design school in future, I have one message: Fight to never do what someone has already done, do not even repeat yourselves. Find solutions, perhaps difficult, but new. I know it’s not easy.',
      'I wish for an era as close as possible where change and courage are a mandatory voice in the business plans of companies and in the strategy of every CEO. I am on your side.',
    ],
    name: 'Marcello Gandini',
    date: '4 March 2024',
    portrait: {
      src: `${MEDIA}/marcello-gandini.jpg`,
      width: 740,
      height: 751,
      alt: 'Marcello Gandini, smiling, seated at a desk',
    },
  },
};
