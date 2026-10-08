import type { IevStartup, PgdmIevPage } from '@/types/pgdm-iev';

const MEDIA = '/media/academics/pgdm-iev';

const startup = (
  id: string,
  name: string,
  description: string,
  links: IevStartup['links'] = [],
): IevStartup => ({ id, name, description, logo: `${MEDIA}/startups/${id}.jpg`, links });

const partner = (id: string, name: string, width: number, height: number) => ({
  id,
  name,
  logo: { src: `${MEDIA}/partners/${id}.png`, width, height, alt: name },
});

/**
 * PGDM - IEV — Post Graduate Diploma in Management (Innovation,
 * Entrepreneurship & Venture Development).
 *
 * ## Sources
 *
 * Everything is from the Delhi-NCR page
 * (xlridelhi.ac.in/post-graduate-diploma-in-management-innovation-entrepreneurship-venture-development/),
 * in its order. Photographs and logos are the page's own, at full size from
 * the site's media library, self-hosted under public/media/academics/pgdm-iev/.
 *
 * Kept on the Delhi site, not copied here: the admission prospectus (a 20 MB
 * PDF) and the two videos (45 MB and 103 MB). They are linked and streamed
 * from xlridelhi.ac.in, and must move to object storage before that site is
 * retired.
 *
 * ## Repairs to the source
 *
 *  - "Postgraduate diploma management in …" → "Postgraduate Diploma in
 *    Management in …"; "Ventresparx" → "VentureSparX"; "rather for those" →
 *    "rather than for those"; "infront" → "in front"; "aggrotech" →
 *    "agritech"; "Stratup" → "startup"; "working of" → "working on"; missing
 *    spaces after full stops restored; student names capitalised.
 *  - "the singing session of his bestseller" → "signing session".
 *  - The Delhi page repeats the VentureSparX description word for word under
 *    the InnovateX photograph. That duplicate is dropped: InnovateX appears
 *    with its photograph and title only.
 *  - Tracking parameters (`?igsh=…`, `?srsltid=…`, `utm_…`) are stripped from
 *    the startup and student links.
 *
 * The important dates are the 2026 cycle's, as published. Update them when
 * the next cycle is announced.
 */
export const pgdmIev: PgdmIevPage = {
  school: 'XLRI – Entrepreneurship',
  shortName: 'PGDM - IEV',
  title: 'Post Graduate Diploma in Management',
  subtitle: 'Innovation, Entrepreneurship & Venture Development',
  heroImage: {
    src: `${MEDIA}/xceed-cohort.jpg`,
    width: 1600,
    height: 1200,
    alt: 'A PGDM - IEV cohort gathered on the tiered seating of the XCEED incubator',
  },
  apply: {
    label: 'Apply Now',
    href: 'https://erp.xlri.ac.in/anon_applRegistrationPage.htm?id=ca3604dfa290307fc378409906c19d1b',
  },
  brochure: {
    label: 'Download Brochure',
    href: 'https://xlridelhi.ac.in/wp-content/uploads/2025/11/Admission-Prospectus-2025_PGDM-IEV.pdf',
    meta: 'PDF · 20 MB',
  },
  intro:
    'It is a two-year full time AICTE approved course in entrepreneurship by XLRI which offers structured long-term support for aspiring entrepreneurs by combining management education with incubation/acceleration. Postgraduate Diploma in Management in Innovation, Entrepreneurship, and Venture Development (PGDMIEV) is designed to empower students to think creatively and critically about identifying and solving problems, and to equip them with the skills and knowledge to turn their ideas into successful ventures. The program aims to foster an entrepreneurial mindset in students through a combination of theoretical and practical coursework, hands-on projects and internships, along with opportunities to network with industry professionals and successful entrepreneurs through In-house events like VentureSparX, ElevateX, Eco-system events – IID, TIECON, Entrepreneur India etc., Industry Visits and Live Projects. Post Completion of the program the PGDM degree will be issued by XLRI, Delhi-NCR.',
  facts: [
    { id: 'duration', value: 'Two years', label: 'Full time' },
    { id: 'approval', value: 'AICTE', label: 'Approved course' },
    { id: 'residential', value: 'Residential', label: 'Fully residential, offline' },
    { id: 'issued', value: 'XLRI', label: 'Delhi-NCR issues the PGDM' },
  ],
  introVideo: {
    title: 'IEV Intro',
    src: 'https://xlridelhi.ac.in/wp-content/uploads/2026/03/IEV-Intro_1.mp4',
    poster: `${MEDIA}/xceed-cohort.jpg`,
    size: '45 MB',
  },
  whyApply: {
    heading: 'Why Should You Apply To The Program?',
    lead: 'All aspiring entrepreneurs desirous of starting a venture soon are encouraged to apply.',
    note: 'This programme will be especially useful for:',
    audiences: [
      {
        id: 'graduates',
        icon: 'graduate',
        text: 'Those who have just finished graduation and wish to acquire a knowledge of business before starting their own enterprise.',
      },
      {
        id: 'mba-alternative',
        icon: 'switch',
        text: 'Students who wish to go for business education at a high-quality institute realize that a usual MBA/PGDM is designed more for those who wish to take up a job, rather than for those who aspire to start their own business.',
      },
      {
        id: 'family-business',
        icon: 'family',
        text: 'The younger generation of family businesses who wish to strengthen and carry forward the business, and at the same time, wish to take it in a direction that capitalizes on current trends and technological advances.',
      },
      {
        id: 'professionals',
        icon: 'professional',
        text: 'Working professionals at the early stage of their career, who wish to start their own venture but realize that there needs to be sufficient groundwork to enhance their chances of success at their proposed venture.',
      },
    ],
  },
  eligibility: {
    heading: 'Eligibility',
    paragraphs: [
      'To be eligible for the Post Graduate Diploma in Management in Innovation, Entrepreneurship and Venture Development (PGDM-IEV), applicants must possess a bachelor’s degree in any discipline from a university or institution recognized by the Ministry of Education, Government of India. They must have achieved a minimum of 50% aggregate marks. Applicants in the final year of their bachelor’s degree are also eligible to apply, provided they obtain their degree certificate by October 31, 2026.',
      'Additionally, applicants must have valid scores from one of the following management entrance tests: XAT, CAT, MAT, ATMA, CMAT, GMAT, or CUET, as per the common entrance examinations conducted by the state or central government. Preference will be given to candidates with experience in startups, businesses, or relevant work fields.',
      'All applicants who have appeared for XAT or any of the other entrance tests listed above must apply via this portal to be considered for the PGDMIEV program.',
    ],
    tests: ['XAT', 'CAT', 'MAT', 'ATMA', 'CMAT', 'GMAT', 'CUET'],
  },
  selection: {
    heading: 'Selection Process',
    rounds: [
      { id: 'screening', title: 'Application Screening' },
      {
        id: 'sop-video',
        title: 'SOP and 5-Minute Video Submission',
        detail:
          'SOP (Assessment of entrepreneurial aspirations, business vision, and problem-solving approach) and 5-Minute Video Submission (Comprehensive Business Plan- Ideation/MVP/Traction)',
      },
      { id: 'interview', title: 'Interview' },
    ],
    deadline: '15th March 2026, 4PM',
    note: 'The final list of selected candidates will be released based on cumulative scores from all rounds.',
  },
  dates: {
    heading: 'Important Dates',
    items: [
      { id: 'deadline', label: 'Application deadline', value: '15th March 2026, 4PM' },
      { id: 'interview', label: 'Interview', value: '5th - 8th May 2026', tentative: true },
      {
        id: 'session',
        label: 'Academic Session Begins',
        value: '1st week of July, 2026',
        tentative: true,
      },
    ],
  },
  team: {
    heading: 'Program Team',
    people: [
      {
        id: 'munish-thakur',
        name: 'Prof. Munish Thakur',
        role: 'Dean (Academics)',
        bio: 'Prof. Munish Thakur is the Dean and a Professor at the XLRI Delhi-NCR campus. With over two decades of experience, he specializes in teaching strategy, entrepreneurship, and research methods. He is keenly interested in understanding how new forms of organizing are shaping economies and societies. He is especially interested in understanding the interplay between visible and the hidden forces that shape new forms of organizing and their impact on the existence and sustainability of organizations. He thinks that organizations can be better understood as habitats and hype objects.',
        portrait: {
          src: `${MEDIA}/team/munish-thakur.jpg`,
          width: 413,
          height: 531,
          alt: 'Portrait of Prof. Munish Thakur',
        },
      },
      {
        id: 'rachna-tiwari',
        name: 'Ms. Rachna Tiwari',
        role: 'COO Entrepreneurship',
        bio: 'Ms. Rachna has been an entrepreneurship development professional donning many hats. Earlier, she had been an entrepreneur, and has also been on the founding team of ABVIL, the state incubator (Jharkhand state & IIM Ahmedabad). KVIC online founding team. She was felicitated by Govt. of Jharkhand for her contribution in developing startup ecosystem and advisory during “DIPP’s Startup Framework, 2018 (by Govt. of India). She has been invited as mentor, advisor or member of the board, of several incubators and institutions. She has mentored and handheld startups across diverse sectors.',
        portrait: {
          src: `${MEDIA}/team/rachna-tiwari.jpg`,
          width: 600,
          height: 800,
          alt: 'Portrait of Ms. Rachna Tiwari',
        },
      },
    ],
    studentsHeading: 'Student Representatives',
    students: [
      {
        id: 'ankita-kumari',
        name: 'Ankita Kumari',
        email: 'v25005@astra.xlri.ac.in',
        linkedin: 'https://www.linkedin.com/in/ankita-kumari-92250b205/',
      },
      {
        id: 'archit-paliwal',
        name: 'Archit Paliwal',
        email: 'v25008@astra.xlri.ac.in',
        linkedin: 'https://www.linkedin.com/in/architpaliwal2003',
      },
      {
        id: 'kushagra-agarwal',
        name: 'Kushagra Agarwal',
        email: 'v25015@astra.xlri.ac.in',
        linkedin: 'https://www.linkedin.com/in/kush4gra-agarwal',
      },
      {
        id: 'mandeep-singh',
        name: 'Mandeep Singh',
        email: 'v25016@astra.xlri.ac.in',
        linkedin: 'https://www.linkedin.com/in/mandeep-singh-a04230105',
      },
      {
        id: 'manojna-eadala',
        name: 'Manojna Eadala',
        email: 'v25017@astra.xlri.ac.in',
        linkedin: 'https://www.linkedin.com/in/manojna-eadala-52a27b227/',
      },
    ],
  },
  xceed: {
    heading: 'XCEED – The Campus Incubator at XLRI',
    intro:
      'XCEED supports the development of early-stage startup companies led by XLRI students, alumni, and faculty. Our incubator offers a comprehensive set of resources and services designed to assist entrepreneurs in turning their ideas into successful businesses. We understand that starting a company can be a difficult and uncertain journey, which is why we strive to create a supportive and collaborative environment that fosters innovation and growth.',
    benefitsLead: 'Startups incubated at XCEED can avail of the following:',
    benefits: [
      {
        id: 'training',
        icon: 'training',
        title: 'Training',
        text: 'Our incubator hosts workshops and seminars from entrepreneurs & industry leaders on a variety of topics such as marketing, finance, legal issues, and so on, as well as other customized courses relevant for the startups incubated at XCEED.',
      },
      {
        id: 'funding',
        icon: 'funding',
        title: 'Access to Funding',
        text: 'We help startups access funding by providing information on grants, loans, and investment opportunities. We organise Demo Day where students can pitch their Startups in front of a panel of investors.',
      },
      {
        id: 'partners',
        icon: 'partners',
        title: 'Benefits from Partners',
        text: 'Access to tools, tech credits and discounted business services from our partner organizations.',
      },
      {
        id: 'office',
        icon: 'office',
        title: 'Office Space',
        text: 'Our incubator features modern and well-equipped office space that allows entrepreneurs to collaborate and work efficiently.',
      },
      {
        id: 'mentorship',
        icon: 'mentorship',
        title: 'Mentorship',
        text: 'Entrepreneurs will have access to experienced mentors who have a wealth of knowledge and expertise in various industries. These mentors will provide guidance, feedback and advice that will help startups navigate the early stages of business development.',
      },
      {
        id: 'networking',
        icon: 'network',
        title: 'Networking Opportunities',
        text: 'Networking events and workshops are held on a regular basis to connect entrepreneurs with potential partners, investors, and industry experts.',
      },
    ],
    partnerships: {
      heading: 'XCEED Partnerships',
      text: 'XCEED has several partnerships with business service providers, technology services, funding entities and other eco-system partners, providing a variety of benefits to startups like providing tech credits to help build your product or giving free or discounted services. It also includes sharing preferential business services, sharing knowledge and access to build business relationships.',
    },
    visits: {
      heading: 'Corporate Visits',
      text: 'Cohort visits will be organized to several startup meets and events in India and abroad. The idea would be to be exposed to other entrepreneurial ecosystems, network, explore partnerships with other startups and corporate entities, explore markets, pitch to potential investors, get feedback, etc.',
    },
    partnersHeading: 'To Name a Few',
    partners: [
      partner('aws', 'Amazon Web Services', 281, 135),
      partner('bank-of-baroda', 'Bank of Baroda', 280, 131),
      partner('hubspot', 'HubSpot', 249, 108),
      partner('digitalocean', 'DigitalOcean', 258, 134),
      partner('guptajiinvests', 'Guptajiinvests', 254, 105),
      partner('payu', 'PayU', 226, 99),
      partner('qapita', 'Qapita', 250, 94),
      partner('vakilsearch', 'Vakilsearch', 231, 95),
      partner('iavc', 'Indian Academy of Venture Capital', 252, 101),
      partner('decentro', 'Decentro', 251, 97),
    ],
  },
  events: {
    heading: 'In-house Events',
    items: [
      {
        id: 'venturesparx',
        title: 'VentureSparX (Startup Conclave Edition 1)',
        paragraphs: [
          'Hosted by XLRI Delhi-NCR in partnership with TiE Delhi-NCR, VentureSparX – a dynamic event that took place on September 15th and 16th, 2023. It offered a unique opportunity for entrepreneurs and venture capitalists to explore India’s startup ecosystem. VentureSparX featured renowned speakers, including Mr. Mahavir Pratap Sharma, Mr. Vikas Gupta, Ms. Garima Seth, Mr. Nitin Mantri, Mr. Mithun Sacheti, Mr. Ashish Taneja, and many others. Discussions spanned entrepreneurship, angel investing, marketing, and innovation, providing participants with actionable insights to fuel their startup journeys. The event’s highlights were the presence of the top 20 teams from IgniteX, who showcased their innovative business ideas to a panel of experts, receiving valuable feedback and exposure. VentureSparX exemplified the spirit of collaboration, innovation, and entrepreneurship that is essential for building a brighter future.',
        ],
        image: {
          src: `${MEDIA}/events/venturesparx.jpg`,
          width: 959,
          height: 636,
          alt: 'VentureSparX – The Entrepreneurship Odyssey, edition 1: a packed auditorium, a group photograph and audience moments',
        },
      },
      {
        id: 'innovatex',
        title: 'InnovateX (The Product Summit Edition 2)',
        paragraphs: [],
        image: {
          src: `${MEDIA}/events/innovatex.jpg`,
          width: 958,
          height: 616,
          alt: 'InnovateX – The Product Summit, edition 2: a speaker being felicitated, a speaker session and group photographs on stage',
        },
      },
      {
        id: 'elevatex',
        title: 'ElevateX (Edition 3)',
        paragraphs: [
          'The third edition of ElevateX – XLRI’s Premier Startup Conclave served as a transformative platform for aspiring entrepreneurs. Bringing together 25+ distinguished speakers and investors including industry leaders like Mr. Arjun Vaidya, Mr. Bharat Sethi, and Mr. Akash Gupta, and many others discussing themes like AI, blockchain, consumer tech, and FinTech.',
          'The event highlight was the interactive sessions, networking opportunities, and a Live Pitching Sessions where startups showcased their ideas to potential investors and mentors. The IgniteX competition also took place, with top teams pitching their innovative solutions and ideas. Winners included ReCell (IIT Delhi), Vyapaar Setu (SRCC), Solarization of MSMEs (NTPC) and HabiNest (DU), marking ElevateX as a standout event in the Indian startup ecosystem.',
        ],
        image: {
          src: `${MEDIA}/events/elevatex.jpg`,
          width: 930,
          height: 616,
          alt: 'ElevateX – XLRI’s Premier Startup Conclave, edition 3: an audience, a fireside chat and a speaker on stage',
        },
      },
      {
        id: 'ankur-warikoo',
        title: 'Unplugged Conversation with Ankur Warikoo',
        paragraphs: [
          'On February 29th, 2024, XLRI Delhi-NCR hosted a captivating “Unplugged Conversation” with Ankur Warikoo a prominent entrepreneur, motivational speaker, and internet personality. Known for his contribution to the Indian startup ecosystem, Mr. Warikoo shared his entrepreneurial journey, offered mentorship and insights on personal growth and career management. His presence, along with the signing session of his bestseller “Make Epic Money” made the event memorable, further strengthening the connection between aspiring entrepreneurs and industry leaders.',
        ],
        image: {
          src: `${MEDIA}/events/ankur-warikoo.jpg`,
          width: 860,
          height: 575,
          alt: 'Ankur Warikoo’s unplugged conversation at XLRI Delhi-NCR: on stage, in conversation, and with the audience',
        },
      },
    ],
    recap: {
      title: 'ElevateX Recap',
      src: 'https://xlridelhi.ac.in/wp-content/uploads/2026/03/ElevateX-Recap-Video.mp4',
      poster: `${MEDIA}/events/elevatex.jpg`,
      size: '103 MB',
    },
  },
  activities: {
    heading: 'Our Activities',
    items: [
      {
        id: 'industry-visits',
        title: 'Industry Visits',
        text: 'Industry visits are a cornerstone of our program, offering students exposure to startups and established companies across diverse sectors such as manufacturing, robotics, drones, fashion accessories, etc. During these visits, students interact with founders and managers, gaining insights into their operations through guided tours of the facilities.',
        image: {
          src: `${MEDIA}/activities/industry-visits.jpg`,
          width: 1280,
          height: 720,
          alt: 'PGDM - IEV students on industry visits, including a robotics facility',
        },
      },
      {
        id: 'demo-day',
        title: 'Demo Day',
        text: 'Demo Day marks the culmination of the program, where students with revenue-positive startups pitch their ventures to a carefully selected group of investors and venture capitalists. In the first batch of the IEV program, 14 startups successfully showcased their ideas and achievements.',
        image: {
          src: `${MEDIA}/activities/demo-day.jpg`,
          width: 1280,
          height: 720,
          alt: 'Students pitching their startups to investors at Demo Day',
        },
      },
      {
        id: 'entrepreneur-sessions',
        title: 'Entrepreneur Sessions and Workshops',
        text: 'We regularly organize entrepreneur sessions and workshops to provide students with insights into the entrepreneurial journey. Entrepreneurs share their personal experiences and expertise in their respective fields. Workshops cover a broad range of topics related to entrepreneurship, equipping students with practical skills and knowledge to enhance their ventures.',
        image: {
          src: `${MEDIA}/activities/entrepreneur-sessions.jpg`,
          width: 1280,
          height: 720,
          alt: 'Entrepreneur sessions and workshops at the XCEED incubator',
        },
      },
      {
        id: 'ecosystem-events',
        title: 'Ecosystem Events',
        text: 'Through partnerships with leading ecosystem enablers, we encourage students to participate in prominent entrepreneurship events. These events offer opportunities for learning, networking, and growth. Some of the key events our students have attended include TiEcon, India Internet Day, Jagriti Yatra, Startup Hub Expo, and Entrepreneur India',
        image: {
          src: `${MEDIA}/activities/ecosystem-events.jpg`,
          width: 1280,
          height: 720,
          alt: 'PGDM - IEV students at ecosystem events, including Entrepreneur India and a sustainability summit',
        },
      },
    ],
  },
  startups: {
    heading: 'PGDMIEV Startups',
    items: [
      startup('aquave', 'AQUAVE', 'A marine-based skincare brand', [
        { kind: 'LinkedIn', href: 'https://www.linkedin.com/company/aquave/' },
        { kind: 'Instagram', href: 'https://www.instagram.com/aquaveskin' },
        { kind: 'Website', href: 'https://aquave.in/' },
      ]),
      startup('the-better-choice', 'THE BETTER CHOICE', 'A lifestyle and indulgence brand', [
        { kind: 'Instagram', href: 'https://www.instagram.com/thebetterchoice.inc' },
        { kind: 'Website', href: 'http://www.thebetterchoice.in' },
      ]),
      startup('farmegrow', 'FARMEGROW', 'An agritech start-up'),
      startup(
        'hastindia',
        'HASTINDIA',
        'A D2C platform offering authentic handicrafts sourced from artisans',
        [{ kind: 'Instagram', href: 'https://www.instagram.com/hastindia_handicrafts' }],
      ),
      startup(
        'aaradhak',
        'AARADHAK',
        'Building a religious ecosystem providing products and services',
        [
          { kind: 'Instagram', href: 'https://www.instagram.com/aaradhak.online' },
          { kind: 'Website', href: 'http://www.aaradhak.com' },
        ],
      ),
      startup('privaak', 'PRIVAAK', 'Provider of safety solutions'),
      startup('zobzyx', 'ZOBZYX', 'A dynamic recruitment start-up', [
        { kind: 'Instagram', href: 'https://www.instagram.com/zobzyx' },
      ]),
      startup(
        'mahaviragro',
        'MAHAVIRAGRO',
        'Agri Waste to Green and Sustainable Energy solutions (ME)',
      ),
      startup(
        'glowjob',
        'GLOWJOB',
        'A curated line of makeup essentials designed for every skin type and style',
        [
          { kind: 'Instagram', href: 'https://www.instagram.com/glowjobcosmetics' },
          { kind: 'Website', href: 'https://glowjob.com/' },
        ],
      ),
      startup('zewar-kart', 'ZEWAR KART', 'A fashion accessories brand', [
        { kind: 'Instagram', href: 'https://www.instagram.com/zewarkart' },
      ]),
      startup('sastelabel', 'SASTELABEL', 'Multivendor marketplace for secondhand fashion', [
        { kind: 'Instagram', href: 'https://www.instagram.com/sastelabel' },
      ]),
      startup(
        'hintech-energy',
        'HINTECH ENERGY',
        'A startup working on Green technology – Energy sector servicing',
        [
          { kind: 'LinkedIn', href: 'https://www.linkedin.com/company/hintech-energy/' },
          { kind: 'Website', href: 'https://www.hintechenergy.com/' },
        ],
      ),
      startup(
        'cognizen-ed',
        'COGNIZEN-ED',
        'A platform offering cognitive excellence in exams and personal growth.',
        [{ kind: 'Instagram', href: 'https://www.instagram.com/cognizen.ed' }],
      ),
      startup(
        'vidyarthi-ai',
        'VIDYARTHI.AI',
        'A platform where to learn, earn and grow with peer students.',
      ),
      startup('consgo', 'CONSGO', 'An Omni-channel Construction solution startup', [
        { kind: 'LinkedIn', href: 'https://www.linkedin.com/company/consgo/' },
        { kind: 'Website', href: 'https://consgo.com/' },
      ]),
      startup(
        'fundcapita',
        'FUNDCAPITA',
        'A fundraising platform & your strategic partner in success.',
        [
          { kind: 'LinkedIn', href: 'https://www.linkedin.com/company/fundcapita/' },
          { kind: 'Instagram', href: 'https://www.instagram.com/fundcapita' },
          { kind: 'Website', href: 'https://fundcapita.com/' },
        ],
      ),
      startup(
        'shepop',
        'SHEPOP',
        'D2C brand selling unique, creative bag/ lifestyle products to young women.',
      ),
      startup('wittyboo', 'WITTYBOO', 'A children’s fashion startup'),
      startup('starkid', 'STARKID', 'An Ed-tech platform', [
        { kind: 'Instagram', href: 'https://www.instagram.com/starkid_app' },
      ]),
      startup('bakebuddy', 'BAKEBUDDY', 'A cakes and flowers delivery platform', [
        { kind: 'LinkedIn', href: 'https://www.linkedin.com/company/bakebuddy/' },
        { kind: 'Instagram', href: 'https://www.instagram.com/bakebuddy.in' },
        { kind: 'Website', href: 'http://www.bakebuddy.in' },
      ]),
      startup(
        'gameshala',
        'GAMESHALA',
        'A platform with structured program for esports at the college level.',
      ),
    ],
  },
  alumni: {
    heading: 'Alumni Benefits',
    lead: 'Students of this Post Graduate Diploma in Management (Innovation, Entrepreneurship & Venture Development) program enjoy lifetime alumni benefits of XLRI',
    benefits: [
      'Alumni will also have access to the Job Portal to post jobs or apply for vacancies posted on the alumni forum.',
      'Participate in the mentorship program on the portal and depending on age and experience can be a mentor or a mentee.',
      'Attend the Annual Homecoming & Distinguished Alumni awards which is hosted at XLRI.',
      'Access to the XLRI Alumni directory on the alumni portal.',
      'Access to register with the respective Chapters across the country and abroad where they are located.',
      'Invites for Summer Meets at various cities and also for chapters specific programmes events.',
      'Access to the discussion forums and the built in message board to connect and network with alumni.',
      'Get to be a part of the Chapter Social Media Groups on Whatsapp / Signal / Facebook / Linkedin and the exclusive XLr app.',
      'Alumni will also receive monthly alumni e-newsletter XLConnect keeping them posted of alumni events, activities and news.',
    ],
  },
  contacts: {
    heading: 'Contact Details',
    people: [
      {
        id: 'jasmine-mudgal',
        name: 'Ms. Jasmine Mudgal',
        department: 'Entrepreneurship Department',
        phone: '+91 9899210734',
        email: 'jasminemudgal@xlri.ac.in',
      },
      {
        id: 'abhijeet-singh',
        name: 'Mr. Abhijeet Singh',
        department: 'Entrepreneurship Department',
        phone: '+91 9212880004',
        email: 'ievadmis@xlri.ac.in',
      },
      {
        id: 'surekha',
        name: 'Ms. Surekha',
        department: 'Entrepreneurship Department',
        phone: '+91 7988352939',
        email: 'ievadmis@xlri.ac.in',
      },
      {
        id: 'rahul-sarkar',
        name: 'Mr. Rahul Sarkar',
        department: 'Academic Deans Office',
        phone: '+91 9931687849',
        email: 'deanoffice.delhi@xlri.ac.in',
      },
    ],
  },
  faq: {
    heading: 'FAQ',
    items: [
      {
        id: 'typical-day',
        question: 'What is a typical day for XLRI IEV students?',
        answer:
          'XLRI IEV employs a dynamic, hands-on approach in which no two days are identical. Students should anticipate two to three 120-minute lessons per day, five days per week. Students also engage in group projects, career counselling meetings, industry practicums, and extracurricular activities throughout the week.',
      },
      {
        id: 'xat',
        question: 'Do we have to give XAT to apply?',
        answer:
          'No. You may apply without giving XAT. However, those who have given XAT need not pay additional application fees. Applicants applying through the website must have valid scores from one of the following management entrance tests: XAT, CAT, MAT, ATMA, CMAT, GMAT, or CUET, as per the common entrance examinations conducted by the state or central government.',
      },
      {
        id: 'online',
        question: 'Is it an online programme?',
        answer:
          'No. This is a full-time offline programme, which will be fully residential. In case there are government regulations related to COVID and we are unable to get students on campus, it may be conducted online.',
      },
      {
        id: 'enterprise',
        question: 'Do I have to start an enterprise?',
        answer:
          'It is a programme for those who wish to start an enterprise. It is highly encouraged that you start one while in the programme, but it is not compulsory.',
      },
      {
        id: 'network',
        question: 'How will this programme help in expanding my professional network?',
        answer:
          'As part of the Alumni community of XLRI, you will be part of one of India’s strongest alumni networks and will receive invites to exclusive events, meets and conferences. During the course of the programme, you will cross paths with several industry experts, entrepreneurs, angel investors and others. You will also be taking part in events, demo days and meetups where you will find opportunities to expand your professional networks.',
      },
      {
        id: 'curriculum',
        question: 'What is the curriculum like?',
        answer:
          'The curriculum is based on the regular PGDM curriculum for business management but has been contextualized for startups. The core courses will cover all aspects of business fundamentals needed to run a business, and electives will help you focus on your specific learning needs. A large part of the course is designed around experiential learning, where you get an opportunity to validate and internalize your learning by applying it in the real world.',
      },
      {
        id: 'certificate',
        question: 'Who will issue the PGDM Certificate?',
        answer: 'The certificate will be issued by XLRI Delhi-NCR.',
      },
    ],
  },
};
