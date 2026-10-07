import type { Centre } from '@/types/centre';

/**
 * XLRI Centre for Gender Equality & Inclusive Leadership (CGEIL).
 *
 * ## Sources
 *
 * Everything is from the Delhi-NCR page
 * (xlridelhi.ac.in/centre-for-gender-equality-inclusive-leadership/): the
 * introduction, purpose, structure, news & events, Board of Advisors and
 * Chairperson, verbatim. Photographs are the page's own — advisor portraits as
 * published, and news images at their full size from the site's media library
 * (two, up! SWING and up! SCALE, exist only as the page's 580px thumbnails).
 * All self-hosted under public/media/centres/gender-equality/.
 *
 * The people and news data were generated from the page, not retyped. Two
 * repairs to the source: Sohini Bhattacharyara's biography was split
 * mid-sentence across three paragraphs and is rejoined; Veena Swarup's closing
 * sentence was fused onto her last bullet point and is separated.
 *
 * The four facts in the about strip are each stated in the page's own text —
 * nothing is added.
 */
export const genderEqualityCentre: Centre = {
  shortName: 'CGEIL',
  title: 'XLRI Centre for Gender Equality & Inclusive Leadership',
  lead: 'The Xavier School of Management - XLRI’s Centre for Gender Equality and Inclusive Leadership (CGEIL) is based in XLRI’s Delhi NCR campus. The Centre has been founded to shape policy, guide actions, and support individuals, firms, and governments in enabling a more equitable and just society.',
  heroImage: {
    src: '/media/centres/gender-equality/news/up-surge-participant-meets.jpg',
    width: 1200,
    height: 800,
    alt: 'Participants of up!SURGE, a CGEIL leadership programme for women, gathered for a group photograph',
  },

  about: {
    why: {
      heading: 'Why the Centre was founded',
      body: 'Concern with the escalating gender gap in India, as highlighted in the World Economic Forum’s Global Gender Gap Report released in 2021, has been a key factor in founding the Centre. This trend is further exacerbated by India’s gender ratio of 92% (2% below global average) due to the issue of “missing girls” and disparate gender-specific access to healthcare. Faculty members of XLRI and its alumni came together to set the framework for the Centre, which was launched in 2021.',
    },
    focus: {
      heading: 'Our focus',
      body: 'CGEIL’s focus is to empower livelihoods and employment opportunities on a gender neutral basis to further the cause of developing an equitable and just society. Taking further XLRI’s guiding motto of Excellence with Integrity, the Centre seeks to establish itself as a premier body collaborating with partner institutions, governments, and funding agencies to interweave the mindset, approach and habits that shall make realisation of Gender Equality and Inclusive Leadership a lived experience in all facets and arenas of society.',
    },
    facts: [
      { id: 'launched', value: '2021', label: 'Year the Centre was launched' },
      { id: 'ratio', value: '92%', label: 'India’s gender ratio — 2% below the global average' },
      { id: 'areas', value: '3', label: 'Areas of intervention' },
      { id: 'advisors', value: '12', label: 'Members of the Board of Advisors' },
    ],
  },

  purpose: {
    heading: 'Purpose',
    intro:
      'Thus, the Centre will aim to encourage and improve gender equality in the workforce, entrepreneurial participation of women across sectors and segments. To this end, three areas of intervention will form the Centre’s focus.',
    areas: [
      {
        id: 'research',
        icon: 'research',
        title: 'Research Initiatives',
        points: [
          'Undertake Studies, Research Projects and Reports focussing on areas such as credit offtake by women entrepreneurs, gender gap, pay parity, women leadership, access to rights and benefits across formal and informal work spaces.',
          'Industry & govt. Partnership to enable change in mindsets and action deep within society.',
          'Advocacy through participation in policy formulation in collaboration with global / national organizations.',
          'Awareness programs on Gender Equality and Inclusion customized for various stakeholders.',
        ],
      },
      {
        id: 'teaching',
        icon: 'teaching',
        title: 'Teaching & Education',
        points: [
          'Embed Modules on Gender Equality & Inclusive Leadership in higher education curricula.',
          'Mentoring & coaching initiatives.',
          'Supporting & facilitating collaboration initiatives with centres for Women’s studies in foreign and Indian Universities.',
          'Launch certified skill programs aimed to build social, financial & economic empowerment.',
        ],
      },
      {
        id: 'field',
        icon: 'field',
        title: 'Field Programs',
        points: [
          'Undertake capability building programs in partnership with government, funding agencies, and corporates for vulnerable communities.',
          'Advisory services to corporations and organizations.',
          'Design and Implement innovative programs to recognize, reward, nurture individuals and organizations working in these areas.',
        ],
      },
    ],
  },

  news: {
    heading: 'News & Events',
    items: [
      {
        id: 'up-swing-a-transformative-journey-of-clarity-courage-and-car',
        title: 'up! SWING: A Transformative Journey of Clarity, Courage, and Career Ownership',
        image: {
          src: '/media/centres/gender-equality/news/up-swing-a-transformative-journey-of-clarity-courage-and-car.jpg',
          width: 580,
          height: 320,
        },
      },
      {
        id: 'up-scale-by-xl4w-accelerating-the-leadership-journey-of-mid',
        title: 'up! SCALE by XL4W: Accelerating the Leadership Journey of Mid-Career Women',
        image: {
          src: '/media/centres/gender-equality/news/up-scale-by-xl4w-accelerating-the-leadership-journey-of-mid.jpg',
          width: 580,
          height: 320,
        },
      },
      {
        id: 'up-surge-participant-meets',
        title: 'up!SURGE participant meets',
        image: {
          src: '/media/centres/gender-equality/news/up-surge-participant-meets.jpg',
          width: 1200,
          height: 800,
        },
      },
      {
        id: '4th-cohort-of-up-surge',
        title: '4th cohort of up! SURGE',
        image: {
          src: '/media/centres/gender-equality/news/4th-cohort-of-up-surge.jpg',
          width: 800,
          height: 599,
        },
      },
      {
        id: 'mauna-dhwani-project-mayurbhanj',
        title: 'Mauna Dhwani Project, Mayurbhanj',
        image: {
          src: '/media/centres/gender-equality/news/mauna-dhwani-project-mayurbhanj.jpg',
          width: 800,
          height: 800,
        },
      },
      {
        id: 'impact-assessment-and-socio-economic-survey-in-met-region',
        title: 'Impact Assessment and Socio-Economic Survey in MET region',
        image: {
          src: '/media/centres/gender-equality/news/impact-assessment-and-socio-economic-survey-in-met-region.jpg',
          width: 582,
          height: 366,
        },
        fit: 'contain',
      },
      {
        id: 'building-inclusive-leaders-on-campus-and-beyond',
        title: 'Building Inclusive Leaders: On Campus and Beyond',
        image: {
          src: '/media/centres/gender-equality/news/building-inclusive-leaders-on-campus-and-beyond.jpg',
          width: 800,
          height: 379,
        },
        fit: 'contain',
      },
      {
        id: '5th-edition-of-up-surge-in-august-2024',
        title: '5th edition of up!SURGE in August 2024',
        image: {
          src: '/media/centres/gender-equality/news/5th-edition-of-up-surge-in-august-2024.jpg',
          width: 596,
          height: 296,
        },
        fit: 'contain',
      },
      {
        id: 'meet-the-core-xl4w-powerful-team',
        title: 'Meet the core XL4W powerful team',
        image: {
          src: '/media/centres/gender-equality/news/meet-the-core-xl4w-powerful-team.jpg',
          width: 800,
          height: 454,
        },
      },
      {
        id: 'evoke-navigate-and-amplify',
        title: 'Evoke, Navigate and Amplify',
        image: {
          src: '/media/centres/gender-equality/news/evoke-navigate-and-amplify.jpg',
          width: 619,
          height: 309,
        },
        fit: 'contain',
      },
      {
        id: 'creating-next-generation-of-women-leaders-the-xlri-way',
        title: 'Creating next generation of women leaders the XLRI way',
        image: {
          src: '/media/centres/gender-equality/news/creating-next-generation-of-women-leaders-the-xlri-way.jpg',
          width: 1200,
          height: 675,
        },
      },
      {
        id: 'dialogues-for-transformation',
        title: 'Dialogues for Transformation',
        image: {
          src: '/media/centres/gender-equality/news/dialogues-for-transformation.jpg',
          width: 800,
          height: 800,
        },
        fit: 'contain',
      },
      {
        id: 'round-table-discussion-between-cgeil-tiss-and-undp',
        title: 'Round Table discussion between CGEIL, TISS, and UNDP',
        image: {
          src: '/media/centres/gender-equality/news/round-table-discussion-between-cgeil-tiss-and-undp.jpg',
          width: 1200,
          height: 540,
        },
      },
      {
        id: 'mou-signing-between-xlri-and-tis',
        title: 'MoU signing between XLRI and TIS',
        image: {
          src: '/media/centres/gender-equality/news/mou-signing-between-xlri-and-tis.jpg',
          width: 1200,
          height: 900,
        },
      },
      {
        id: 'village-immersion-program',
        title: 'Village Immersion Program',
        image: {
          src: '/media/centres/gender-equality/news/village-immersion-program.jpg',
          width: 1200,
          height: 676,
        },
      },
      {
        id: 'workshop-with-reliance-met-city',
        title: 'Workshop with Reliance MET City',
        image: {
          src: '/media/centres/gender-equality/news/workshop-with-reliance-met-city.jpg',
          width: 1200,
          height: 540,
        },
      },
    ],
  },

  structure: {
    heading: 'Structure',
    paragraphs: [
      'Effective August 2023, the Centre’s efforts are guided by a Board of Advisors (BoA) comprising eminent professionals, thought leaders, and practitioners across academia and research, corporates, government, and philanthropic organizations. Advisors serve a tenure of 3 years with 1/3rd Members retiring every other year. The BoA is designed to provide inputs on the Centre’s overall direction and to specific programs that the Centre implements, while enabling an appropriate supporting network of relevant stakeholders that lead to effective and visible advocacy by the Centre. The Centre’s BoA is headed by a Chairperson who serves the Centre over a 3 year tenure.',
      'The Executive Officer leads and shoulders all operational responsibilities for the Centre, reporting to the Director, XLRI NCR.',
    ],
  },

  chairperson: {
    heading: 'Chairperson',
    person: {
      id: 'pritha-dutt',
      name: 'Ms. Pritha Dutt',
      role: 'Chairperson, CGEIL-XLRI',
      portrait: {
        src: '/media/centres/gender-equality/people/pritha-dutt.jpg',
        width: 477,
        height: 477,
      },
      biography: [
        {
          type: 'p',
          text: 'A postgraduate from XLRI, Jamshedpur and a Masters in Development & Extension from IGNOU, she worked for 2 decades in the Corporate Sector, handling Industrial Relations, Human Resources and Learning & Development in India and abroad before moving to the Development Sector. She is passionate about empowering women and youth, building institutions and designing large-scale programs for change. She has worked with Feedback Infra as President of the Capacity Building Division co-founded Phicus Social Solutions and was CEO, Empower Foundation. Since 2011 she has been co-owner and Board Director, Empower Pragati (a funded partner of NSDC (National Skill Development Corporation) .In early 2023 she launched a social enterprise MeraBizNet (www.merabiznet.in) to enable and grow women owned businesses from the low and middle income category. She has been a Governing Board Member for the Alliance of Skill Training Partners (ASTP) and Board Chairperson of the DWSSC (Domestic Worker Sector Skill Council). She is a recipient of the British Chevening Young Manager’s Award for a scholarship to Leeds University, UK for the year 1997.',
        },
      ],
    },
  },

  advisors: {
    heading: 'Board of Advisors',
    people: [
      {
        id: 'madhavi-lall',
        name: 'Ms. Madhavi Lall',
        role: 'Managing Director, Head of HR, India – Deutsche Bank',
        portrait: {
          src: '/media/centres/gender-equality/people/madhavi-lall.jpg',
          width: 200,
          height: 200,
        },
        biography: [
          {
            type: 'p',
            text: 'Madhavi has over 32 years experience and has held various positions in multi-national organizations like Standard Chartered Bank, ABN Amro Bank, Colgate Palmolive, and HCL Hewlett Packard Ltd. She holds an MBA degree with specialization in Human Resources and Systems from XLRI, Jamshedpur, India, and has pursued a master’s degree in mathematics from St. Stephen’s College, University of Delhi, India. Madhavi was conferred the “Women Leadership Award” by the Jury and Council of Board Members of the Institute of Public Enterprise – BFSI Madhavi actively contributes to the latest HR thinking through articles published in reputed publications. Her hobbies include traveling, movies, and reading.',
          },
        ],
      },
      {
        id: 'madhura-dasgupta-sinha',
        name: 'Ms. Madhura DasGupta Sinha',
        role: 'Founder & CEO of Aspire For Her',
        portrait: {
          src: '/media/centres/gender-equality/people/madhura-dasgupta-sinha.jpg',
          width: 250,
          height: 250,
        },
        biography: [
          {
            type: 'p',
            text: 'Madhura DasGupta Sinha is the Founder & CEO of Aspire For Her, a unique start-up to motivate women to enter and stay in the workforce. Madhura has been a banker for the last 25 years – holding leadership positions in IDFC, Standard Chartered and ANZ Grindlays Bank, after an MBA from XLRI and Electrical Engineering from Jadavpur University. Madhura was one of the 12 women across India to be awarded the British Chevening Scholarship in 2003. Since its birth on Women’s Day, 2020, the rapidly-growing community at Aspire For Her has become a movement for women, in India and across the world, getting together members, supporters and mentors to unleash the trillion dollar potential in the Indian economy. Madhura’s work has been covered widely in the media including CNBC, NDTV, BBC, The Times Of India, New Indian Express etc. Aspire For Her has been honoured by awards from UN Women, Economic Times, T-Hub, NDTV and International Advertising Association. Madhura was among the 23 of Twenty-Three list published by HR Association of India. She also is invited to speak at various prestigious forums including IITs, IIMs, Niti Aayog, G 20, UN Women, Global Fintech Forum, National Commission of Women and many acclaimed podcasts. Aspire For Her is proud to be part of the first ever cohort of Women Founders launched by Google, India.',
          },
        ],
      },
      {
        id: 'parineeta-cecil-lakra',
        name: 'Ms. Parineeta Cecil Lakra',
        role: 'Country People & Culture Manager at IKEA India',
        portrait: {
          src: '/media/centres/gender-equality/people/parineeta-cecil-lakra.jpg',
          width: 250,
          height: 250,
        },
        biography: [
          {
            type: 'p',
            text: 'Parineeta Cecil Lakra is currently Country People & Cultural Manager, IKEA India. She has extensive experience in Human Resources over 19 years mostly in the Retail industry. Prior to working with IKEA, she served at Carrefour India as Division Head – Human Resources, and Senior Manager – Training and Development, as a Manager at Genpact.',
          },
          {
            type: 'p',
            text: 'Parineeta has been an integral part of IKEA India’s start-up journey since 2014, contributing to and delivering to setting up of the People & Culture function. She has been actively working to establish a strong positive Employer Brand and developing and growing talent for IKEA India’s growth journey. She brings to bear her competence for establishing people functions, talent development, and leadership acceleration. Parineeta and her team support business expansion and business transformations for IKEA India.',
          },
          {
            type: 'p',
            text: 'She holds a bachelor’s degree in economics from St. Stephen’s College, Delhi, and an MBA in Human Resources from XLRI Jamshedpur.',
          },
        ],
      },
      {
        id: 'prawin-kumar-toppo',
        name: 'Mr. Prawin Kumar Toppo, IAS',
        role: 'Secretary to the Govt. of Jharkhand',
        portrait: {
          src: '/media/centres/gender-equality/people/prawin-kumar-toppo.jpg',
          width: 250,
          height: 250,
        },
        biography: [
          {
            type: 'p',
            text: 'Before joining the Government services, he had exposure in the areas of HR, Exports & Imports. Working in the Government services has given him varied experience especially in district administration, where one is expected to implement government schemes in the fields of education, health, welfare, rural development, urban development, etc. In the Secretariat, his exposure was in the departments of Welfare, Education, Labour, Industry Transport, Panchayati Raj, Building Construction and Personnel, Administrative Reforms, and Rajbhasha. The most challenging role was that of the Labour Commissioner when the state introduced a series of labour reforms at the same time protecting the interests of the labour. Apart from a Bachelors in History from St Stephen’s College, he has an MBA from XLRI Jamshedpur, and a Masters in international development policy from Duke University.',
          },
        ],
      },
      {
        id: 'poornima-dore',
        name: 'Dr. Poornima Dore',
        role: 'Venture Partner – Elevar Equity, Author, Visiting faculty, XLRI- Jamshedpur.',
        portrait: {
          src: '/media/centres/gender-equality/people/poornima-dore.jpg',
          width: 200,
          height: 200,
        },
        biography: [
          {
            type: 'p',
            text: 'An Economist, Teacher, and TAS Business Leader with deep experience in solving for impact at scale, institution building, digital transformation, corporate and development finance. Recognized as one of the Top 100 Analytics Leaders in South Asia. As a member of the flagship leadership program TAS, she has worked across Tata group companies in finance, auto, consumer goods etc. Most recently as Director – Analytics, Insights and Impact at the Tata Trusts, the principal shareholder of the Tata Group. In this role, she has held organisation-wide charge of leading the impact narrative and leveraging the power of data and digital tools for better SDG outcomes – across all focus districts and cities in India. She has served on select Boards and Ministerial Committees, the most recent being on the National Consumption Expenditure Survey, Aspirational Districts of India, and Datasmart Cities. Over the years, she has contributed to the Private sector’s investment approach to Digital Public Goods, Urban Poverty, Migration, and Livelihoods, while actively designing special institutional programs on Social Impact Financing and Employment Creation. She has a Ph.D. in Economics from IIT Bombay. A Gold Medalist from XLRI Jamshedpur, Poornima holds a bachelor’s degree in economics and is a Principal’s Award holder from Lady Shri Ram College.',
          },
        ],
      },
      {
        id: 'sohini-bhattacharyara',
        name: 'Ms. Sohini Bhattacharyara',
        role: 'Senior Advisor, The Accelerator for Shifting Gender Norms through Education.',
        portrait: {
          src: '/media/centres/gender-equality/people/sohini-bhattacharyara.jpg',
          width: 250,
          height: 250,
        },
        biography: [
          {
            type: 'p',
            text: 'Sohini has worked in the development sector for 30+ years with a focus on women and empowerment. She has been closely connected to the Women’s Movement in India and co-founded Sanhita Gender Resource Centre — the first of its kind in Eastern India in 1996. Before The Accelerator for Shifting Gender Norms through Education, she worked as CEO of Breakthrough for 7 years and with Ashoka Innovators for the Public for 10 years to bring in more women entrepreneurs to the fellowship and on institution building for the organisation in South Asia. She also worked as the India strategy advisor for the Asian Venture Philanthropy Network from 2010-2013.',
          },
          {
            type: 'p',
            text: 'Currently, Sohini is the Senior Advisor of The Accelerator for Shifting Gender Norms through Education and Director of Samya Development, a for-profit organisation whose goal is to consult with other organisations to integrate gender in their work and operations . She is also a trustee of Read India, an organisation that sets up self-sustaining community libraries across the country.',
          },
        ],
      },
      {
        id: 'suresh-ramasubramanian',
        name: 'Mr. Suresh Ramasubramanian',
        role: 'Advisor – Entrepreneurs & CEOs',
        portrait: {
          src: '/media/centres/gender-equality/people/suresh-ramasubramanian.jpg',
          width: 480,
          height: 480,
        },
        biography: [
          {
            type: 'p',
            text: 'An alumnus of XLRI from the class of 1989 – 91, as a Human Resources leader and CHRO, Suresh Ramasubramanian has served at leading engineering and financial services groups and at a diversified conglomerate. His energies are now devoted to research in ethics and governance, and as a trusted advisor and coach. In which latter role, he engages intensively with select individuals and organizations to grow individual capability and develop institutional capacity. To take farther the best that XLRI has to offer, Suresh is specifically focused on serving XLRI by bringing to the institute, its students, faculty, and alumni, appropriate individual and institutional networks.',
          },
        ],
      },
      {
        id: 'vasanthi-srinivasan',
        name: 'Dr. Vasanthi Srinivasan',
        role: 'Professor, Indian Institute of Management, Bangalore',
        portrait: {
          src: '/media/centres/gender-equality/people/vasanthi-srinivasan.jpg',
          width: 250,
          height: 250,
        },
        biography: [
          {
            type: 'p',
            text: 'Professor Vasanthi Srinivasan is a Professor in the Organizational Behaviour and Human Resources Management area and Chairperson – Digital Learning at the Indian Institute of Management Bangalore. She did her Post Graduate Diploma in Personnel Management and Industrial Relations from XLRI Jamshedpur and a Fellow in Management (Ph. D equivalent) from the Indian Institute of Management Bangalore. Before joining IIMB, Professor Vasanthi Srinivasan worked as an HR Professional and a consultant. She was the ICCR Chair Professor of Corporate Responsibility and Governance at the HHL School of Management, Leipzig, Germany, from 2012 to 2013. She was also a British Council Visiting Scholar at the International Centre for Corporate Social Responsibility at the Nottingham University Business School in 2007.',
          },
          {
            type: 'p',
            text: 'She was a member of the Uday Kotak Committee on Corporate Governance set up by India’s Securities Exchange Board in 2017. She is a member of the Business and human rights working group constituted by India’s National Human Rights Commission. She was also on the National Guidelines on Responsible Business Conduct drafting committee and National Action Plans on Business and Human Rights. She was a subcommittee member of the second Administrative Reforms Commission of Karnataka.',
          },
        ],
      },
      {
        id: 'veena-swarup',
        name: 'Ms. Veena Swarup',
        role: 'Former Director HR, Engineers India Limited',
        portrait: {
          src: '/media/centres/gender-equality/people/veena-swarup.jpg',
          width: 200,
          height: 200,
        },
        biography: [
          {
            type: 'list',
            items: [
              'A Management Professional with more than 3 decades in PSU',
              'Former Director of HR Engineers India Lt',
              'Superannuated in 2016',
              'Three decades as HR Professional in Oil & Natural Gas Corp. Post Superannuation',
              'Independent Director on Boards',
              'Chair / Member of various policy-related committees of Industry Bodies and academic institutions–FICCI, AIMA, DMA, IOD, NHRD, IPE, FORE, SPJIMR, etc.',
              'Chair FICCI Taskforce for development of Traditional Clusters through Skilling.',
              'Founder & Chair of NOWE @DMA ( Network of Women Entrepreneurs )',
              'Fellow of All India Management Association',
              'Fellow of World Academy of Productivity Science (WAPS)',
            ],
          },
          {
            type: 'p',
            text: 'She has been recognized with various awards in Human Resources and Leadership in India and abroad.',
          },
        ],
      },
      {
        id: 'muniinder-k-anand',
        name: 'Mr. Muniinder K Anand',
        role: 'President, Chrysalis India.',
        portrait: {
          src: '/media/centres/gender-equality/people/muniinder-k-anand.jpg',
          width: 466,
          height: 466,
        },
        biography: [
          {
            type: 'p',
            text: 'With over 25 years of experience in business and human resources consulting, Muninder is a lifelong learner who has catapulted a multitude of global firms and leaders to the pinnacles of commercial success.',
          },
          {
            type: 'p',
            text: 'From PwC, Aon Hewitt, and Schneider through Mercer, KPMG, CCL, and now Chrysalis, Muninder’s forte has always been qualitative, future-first expansion. As Director of Management Consulting at KPMG, he led the team and re-energized the business with People in Change, playing a crucial role along the way in enabling nearly 5000 leaders in IOCL.',
          },
          {
            type: 'p',
            text: 'Muniinder has consistently pushed for improved experiences, streamlined processes, and strengthened client engagements across a wide range of industries by emphasizing relationships, teamwork, and that unbeatable “we” mantra.',
          },
          {
            type: 'p',
            text: 'Recently, Muninder has been recognized for his efforts in the field of leadership development with the Edvocate Leadership Award and L&D’s Business Excellence Award. He also received the Indian Achievers’ Award for 2020 & 2021-22.',
          },
        ],
      },
      {
        id: 'madhukar-shukla',
        name: 'Dr. Madhukar Shukla',
        role: 'Retired Professor, XLRI Jamshedpur',
        portrait: {
          src: '/media/centres/gender-equality/people/madhukar-shukla.jpg',
          width: 424,
          height: 424,
        },
        biography: [
          {
            type: 'p',
            text: 'Madhukar Shukla is a development sector professional with over four decades of experience as a trainer/ consultant for social ventures, government agencies, and corporate organisations. He was one of the founding members of the Advisory Council of the University Network for Social Entrepreneurship (founded by Ashoka: Innovators for the Public and Skoll Center for Social Entrepreneurship, University of Oxford) and has served as the jury for the Oikos Case Competition on Social Entrepreneurship. He was also the Conference Coordinator of the National Conference on Social Entrepreneurship during 2009-17.',
          },
          {
            type: 'p',
            text: 'He retired as a Professor of Strategic Management & Organisational Behaviour and Chairperson – Fr Aruppe Center for Ecology & Sustainability at XLRI Jamshedpur & XLRI Delhi-NCR. Prior to Joining XLRI in 1990, he worked with the National Productivity Council and Administrative Staff College of India, Hyderabad, during 1980-90. He was also a visiting faculty member at ESADE, Barcelona, during 1993-94.',
          },
        ],
      },
      {
        id: 'preeti-reddy',
        name: 'Ms. Preeti Reddy',
        role: 'Erstwhile Chairwoman, Kantar Insights, South Asia',
        portrait: {
          src: '/media/centres/gender-equality/people/preeti-reddy.jpg',
          width: 460,
          height: 460,
        },
        biography: [
          {
            type: 'p',
            text: 'Preeti was CEO of IMRB/Kantar till 2021 and, thereafter, Chairwoman of South Asia of Kantar– the global consumer insights and consulting company. As country manager of one of Kantar’s ‘Big Six’ markets, Preeti was part of the global leadership team and an important contributor to Kantar’s growth.',
          },
          {
            type: 'p',
            text: 'Preeti is widely recognised as a thought leader and has been at the forefront of the development of the consumer insights industry in India. She has been on the advisory boards of the Modern Marketing Association (MMA), Delhi Skill Building and Entrepreneurship University (DSEU), LeadUp (an HR start-up) and on the Governing Council of the Centre for Marketing in Emerging Economies (CMEE) at IIM Lucknow. She has also been the Chairperson for the western region of the CII-Indian Women Network. Since 2015, she has been chosen from over 500 women professionals as one of Impact’s ’50 Most Influential Women Professionals in Indian Media, Marketing and Advertising for five consecutive years.',
          },
          {
            type: 'p',
            text: 'Preeti is currently an independent director on the boards of ICICI Prudential AMC, ICICI Lombard, Popular Vehicles & Services Limited and JSW Cement and Advisor (Strategy and Growth) at XLRI’s Centre for Gender Equality and Inclusive Leadership (CGEIL).',
          },
          {
            type: 'p',
            text: 'Preeti has a BA (Hons) degree in Economics from Lady Shri Ram College, Delhi University and an MBA from XLRI, Jamshedpur. Prior to joining Kantar, she was CEO of LMRB (Sri Lanka) and worked in advertising, consulting, and consumer insights on the agency and client side, including with VST Industries and Tata Burroughs.',
          },
        ],
      },
    ],
  },
};
