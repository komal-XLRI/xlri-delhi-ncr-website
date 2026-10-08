import type { PlacementReport, PlacementsArchive, PlacementsOverview } from '@/types/placements';

/**
 * Placements.
 *
 * ## Sources
 *
 * Everything here is from the Delhi-NCR placement page
 * (xlridelhi.ac.in/placement/), which carries both seasons on one page under
 * two tabs. This site splits it into an overview, one page per season and
 * the archive.
 *
 * - **Report text** — the introductions, the Director's statements, the "Key
 *   Highlights" lists and the sector paragraphs — is verbatim. `**…**` marks
 *   the figures set in bold, as the institute's own placement page does.
 * - **`headline`** repeats four figures from the text for the stats strip and
 *   the overview cards; **`recruiters`** is the "highest number of offers"
 *   line as a list, for the overview.
 * - **The summer highlights** are headed "Summer Placements 2024" on the
 *   Delhi page, but their figures are the 2025 process described above
 *   them, so they are shown under 2025.
 * - **Photograph** — the 2024–26 batch, the image on the Delhi page.
 * - **The 2024–26 final report PDF** is from the Delhi media library and is
 *   self-hosted. The archive documents are linked where the Delhi page links
 *   them (XLRI's media library); all 29 resolved when the page was built.
 *
 * `overview.intro` describes what the section covers; it claims nothing
 * beyond the reports.
 */

const DIRECTOR = {
  name: 'Fr. S. George, SJ',
  role: 'Director, XLRI – Xavier School of Management',
};

const BATCH_PHOTO = {
  src: '/media/placements/batch-2024-26.jpg',
  width: 2560,
  height: 1707,
  alt: 'Students of the 2024–26 batch in business suits, seated and standing in front of the XLRI Xavier School of Management sign in the campus foyer',
};

export const finalPlacements: PlacementReport = {
  season: 'final',
  eyebrow: 'Final Placements',
  title: 'Final Placement Report 2024–26',
  batch: 'PGDM (BM) and PGDM (HRM) · Batch 2024–26',
  intro: [
    'XLRI Jamshedpur and XLRI Delhi-NCR completed the Final Recruitment Process for the graduating class of 2024-26, which is an additional milestone for their two-year PGDM (BM) and PGDM (HRM) programmes. The final recruitment process was part of a larger initiative to place the **576 students** from both campuses with **145 different recruiting organisations**, including **25 organisations** that partnered with XLRI for the first time. The strong calibre of the cohort was evident in the fact that recruiters made over **576 domestic offers** and **2 international offers** during the recruitment process. The results of summer internships were reflected in the fact that **42.5% of students in the cohort received Pre-Placement Offers (PPOs)**, demonstrating the industry’s high regard for students’ professional capabilities.',
  ],
  quote: {
    text: 'There are many accomplishments that have made us extremely proud to mentor our students into becoming ethical leaders who can take on key roles in the corporate world throughout India. The fact that this placement period has undoubtedly been a success, even in today’s challenging job market, is a tremendous source of pride for us! This is clear evidence from the corporate sector of how well our management program prepares our students for their careers and how quickly they adapt to lead our companies through the changing business environment in which they will operate. Our faculty, who mentor their students, continue to demonstrate their dedication to helping students achieve their goals! Thank you to all of the companies that employed our talented students as members of your organisation.',
    ...DIRECTOR,
  },
  headline: [
    { id: 'students', value: '576', label: 'Students from both campuses' },
    { id: 'organisations', value: '145', label: 'Recruiting organisations' },
    { id: 'ppo', value: '42.5', unit: '%', label: 'Received Pre-Placement Offers' },
    { id: 'median', value: '₹29', unit: 'LPA', label: 'Median salary' },
  ],
  highlights: {
    heading: 'Key Highlights of XLRI Final Placements 2024-26',
    items: [
      'The median salary offered to the batch stood at **INR 29 lakhs per annum** with the **top 10th and 25th percentile** average being **INR 49.2 lakhs and INR 44.18 lakhs per annum**, respectively.',
      'The average salary offered to the batch stood at **INR 31.40 lakhs per annum** with the highest international offer standing at **INR 1.10 Crores** and the highest domestic offer of **INR 59 lakhs per annum**.',
      'No. of new recruiters: **25**',
      'The top domains based on the roles offered were Consulting, BFSI and Sales & Marketing',
      'Accenture Strategy and Consulting, Accenture Technology, Aditya Birla Group, Amazon, American Express, Bajaj Auto, Boston Consulting Group, Deloitte USI, EY Parthenon, HUL, ITC, Kotak Mahindra Bank and PwC made the highest number of offers among the regular recruiters',
      '**42.5%** of the students received **Pre-Placement Offers**',
      'New final recruiters included Enparadigm, Firstsource, Hilabs, Indigene, IndiGo Airlines, Nexsales, Razorpay, Salescode.ai, Sunsure Energy, Vikram Solar, Wagh Bakri, Waaree, Zomato Hyperpure among others.',
    ],
  },
  recruiters: {
    heading: 'Made the highest number of offers among the regular recruiters',
    names: [
      'Accenture Strategy and Consulting',
      'Accenture Technology',
      'Aditya Birla Group',
      'Amazon',
      'American Express',
      'Bajaj Auto',
      'Boston Consulting Group',
      'Deloitte USI',
      'EY Parthenon',
      'HUL',
      'ITC',
      'Kotak Mahindra Bank',
      'PwC',
    ],
  },
  sectors: {
    heading: 'Sector-wise Turnout',
    intro:
      'The top segments based on roles offered were Consulting, BFSI, Sales & Marketing, ITES, E-Commerce and General Management. Consulting firms extended offers to 36% of the candidates. BFSI and Sales & Marketing constituted 18% and 12% respectively and ITES constituted 15% of the roles offered to the students. Accenture Strategy, Amazon, Bajaj Auto, BCG, Deloitte, EY Parthenon, HUL, PwC made the highest number of offers. Other top and legacy recruiters include but not limited to Aditya Birla Group, Asian Paints, Bain & Company, ITC, IndigoEdge, JP Morgan Chase & Co., McKinsey, P&G, TAS and Vector Consulting Group.',
    items: [
      {
        id: 'consulting',
        name: 'Consulting',
        text: 'XLRI remains a preferred destination for top consulting firms, including Accenture Strategy, Accenture Technology Consulting, Accenture TAP, Aon Consulting, Bain & Company, Boston Consulting Group, Deloitte, EY Parthenon, EY PAS, GDI Partners, Infosys Consulting, KPMG, McKinsey & Company, PwC, Samagra Governance, Sutra Consulting, Vector Consulting Group, YCP Auctus and others. The increase in consulting roles is largely due to the growing recognition of XLRI’s exceptional talent pool, which is supported by its rigorous academic approach. This interest is further enhanced by the impressive performance of XLRI graduates in renowned management consulting firms globally.',
      },
      {
        id: 'tech',
        name: 'ITES, E-commerce, Gaming and Online Services',
        text: 'Despite the evolving market conditions, recruitment in the tech sector remains robust, particularly in areas such as Product Management, Analytics, and Programme Management. This year, a diverse range of prominent companies, including Accenture Technology, Amazon, American Express, Doubletick, Eternal, FedEx, Flipkart, Genpact, Google, GyanSys, HCL Tech, ITC Infotech, Media.net, Meesho, Microsoft, Nykaa, Ola, Pine Labs, Playsimple, Tata Electronics, Waaree continue to actively recruit. This ongoing demand for skilled professionals underscores the industry’s resilience and adaptability in the face of changing market dynamics.',
      },
      {
        id: 'fmcg',
        name: 'FMCG, Pharma and Real Estate',
        text: 'XLRI continues to be a preferred campus for FMCG companies, with top firms such as AbinBev, Amul, Arvind Fashions, Asian Paints, Colgate Palmolive, Dabur, Diageo, Godrej Consumer Products Limited, Godrej Properties Limited, Hindustan Unilever, ITC, Kraft Heinz, Lodha Group, L’Oréal, Marico, Mondelez, Nestle, P&G, Pidilite, Reckitt, Tata Consumer Products Limited actively participating in the recruitment process. Roles were offered in Strategy, Sales & Marketing, Supply Chain, Operations and IT to the graduating students. This ongoing engagement underscores XLRI’s strong reputation and the industry’s continued interest in its talented graduates.',
      },
      {
        id: 'bfsi',
        name: 'BFSI',
        text: 'The Finance sector has emerged as a pivotal contributor to XLRI’s placements, reflecting its significant evolution over the years. This year, prominent financial institutions such as Avendus, Axis Bank, Barclays, Centrum, Citi, DBS, Deutsche Bank, DSP Asset Managers, FinIQ, Goldman Sachs, HDFC Ergo, HSBC, ICICI Bank, IndigoEdge, IndusInd, InsuranceDekho, Ionic Wealth, JP Morgan Chase & Co., Kotak Bank, L&T Finance, Mastercard, Morgan Stanley, NIIF, NPCI, Policy Bazaar, among others. The roles offered spanned a wide range of financial services, including Front-end Investment Banking, Asset Management, Portfolio Management, Global and Corporate Banking, Wealth Management, Global Markets, Equity Research, and Retail Banking. This robust participation underscores the sector’s growing reliance on XLRI’s talented graduates.',
      },
      {
        id: 'industry',
        name: 'Automotive, Defence, Energy and Telecommunications',
        text: 'Manufacturing & Energy sector witnessed recruiters the likes of which included Airtel, Bajaj Auto, Bajaj Auto Credit Limited, CarDekho, Castrol, Hero MotoCorp, IndiGo Airlines, Maruti Suzuki, Michelin, Ola, Renew Power, Shell, Tata Steel, Waaree among other firms.',
      },
      {
        id: 'general',
        name: 'General Management and PSU',
        text: 'Roles in General Management were offered by conglomerates such as ABG, Capgemini, GMR Group, JSW, JSW One, L&T, Mahindra, Reliance, RPG Group, TAS, Vedanta and other firms. This year marked significant interest from PSUs in XLRI with firms such as BPCL, CPCL, GAIL, IOCL, ONGC etc. visiting campus in various HR and Business Management domains.',
      },
      {
        id: 'hr',
        name: 'HR',
        text: 'XLRI holds the distinction of being the top choice for HR studies in the nation, drawing interest from a broad spectrum of companies for HR roles, including ABG, Accenture TAP, Airtel, Amazon, AM/NS, Asian Paints, Bajaj Auto, Colgate Palmolive, EY PAS, FedEx, Flipkart, HDFC Ergo, HUL, ITC, KPMG, Meesho, Nykaa, Ola, Reliance, Sun Pharma, TAS, Tata Steel, Vedanta, and more. The HR positions offered span a diverse range of functions such as HR Consulting, Recruitment, Compensation & Benefits, HR Analytics, and Chief of Staff roles. Leading consulting firms like Aon, Deloitte, EY, KPMG and PwC specifically target XLRI students for exclusive HR consulting positions, underscoring their confidence in XLRI graduates as the future leaders in HR.',
      },
    ],
  },
  image: BATCH_PHOTO,
  document: {
    label: 'Final Placement Report for XLRI PGDM (BM) and PGDM (HRM) Batch 2024-26',
    href: '/documents/placements/final-placement-report-2024-26.pdf',
    meta: 'PDF · 3 pages · 170 KB',
  },
  more: 'https://www.xlri.ac.in/corporate-relations-and-placement/placement-reports',
};

export const summerInternships: PlacementReport = {
  season: 'summer',
  eyebrow: 'Summer Internships',
  title: 'Summer Internship Placements 2025',
  batch: 'PGDM-HRM, PGDM-BM and PGDM-LSCM · Batch 2025–27',
  intro: [
    'XLRI – Xavier School of Management has successfully completed the Summer Internship Placement (SIP) process for the batch of 2025–27 across its flagship two-year programs — Postgraduate Diploma in Human Resource Management (PGDM-HRM), Postgraduate Diploma in Business Management (PGDM-BM), and Postgraduate Diploma in Logistics and Supply Chain Management (PGDM-LSCM).',
    'A total of **583 students** from both the Jamshedpur and Delhi-NCR campuses participated in the process and secured **584 offers** from **114 leading organizations**, including **28 new recruiters**. Offers were spread across key domains such as Consulting, Finance, Sales & Marketing, General Management, Product Management, Operations, Systems/IT, and Human Resources.',
    'The institution recorded an average stipend of **INR 1.6 lakhs per month** and a median of **INR 1.55 lakhs per month**, while the highest stipend stood at **INR 3.50 lakhs per month**, offered from the BFSI sector. The average stipend for the top 5%, 10%, and 25% of the batch stood at INR 2.49 LPM, INR 2.40 LPM, and INR 2.23 LPM, respectively. Notably, **38%** of the batch secured stipends above INR 2 LPM, **62%** above INR 1.5 LPM, and **81%** above INR 1 LPM.',
  ],
  quote: {
    text: 'The successful completion of the Summer Internship Process 2025 marks yet another milestone in XLRI’s legacy of excellence and industry trust. This year’s process reflects the institute’s enduring commitment to forming responsible business leaders who excel amidst evolving market dynamics. We are deeply grateful to our recruiting partners for their continued faith in XLRI’s talent and proud of our students whose performance and professionalism uphold the values of integrity, competence, and purpose that define this institution. My heartfelt appreciation also goes to our faculty, staff, and placement committee for their relentless efforts in ensuring yet another remarkable season of placements.',
    ...DIRECTOR,
  },
  headline: [
    { id: 'students', value: '583', label: 'Students from both campuses' },
    { id: 'offers', value: '584', label: 'Offers' },
    { id: 'organisations', value: '114', label: 'Organisations' },
    { id: 'median', value: '₹1.55', unit: 'LPM', label: 'Median stipend' },
  ],
  highlights: {
    heading: 'Key Highlights of XLRI Summer Placements 2025',
    items: [
      'Median stipend: **INR 1.55 LPM**; Top 5% average: **INR 2.49 LPM**; Top 10% average: **INR 2.40 LPM**.',
      'Top domains: Management & Advisory Consulting, Sales & Marketing, and General Management.',
      'Top recruiters: Aditya Birla Group, Accenture Strategy, Amazon, American Express, Bajaj Auto, Boston Consulting Group, Flipkart, HUL, and ITC.',
      'Highest domestic offer: **INR 3.5 LPM** by JP Morgan Chase (BFSI).',
      'New recruiters: **28**, including Eternal, Standard Chartered, JioStar, UKG, Pine Labs, Meesho, Deloitte USI, Deutsche Bank IB, Diageo, Valorant Consulting, Philip Morris, Firstclub, and Joveo.',
    ],
  },
  recruiters: {
    heading: 'Top recruiters',
    names: [
      'Aditya Birla Group',
      'Accenture Strategy',
      'Amazon',
      'American Express',
      'Bajaj Auto',
      'Boston Consulting Group',
      'Flipkart',
      'HUL',
      'ITC',
    ],
  },
  sectors: {
    heading: 'Sectoral Overview',
    items: [
      {
        id: 'hr',
        name: 'Human Resources',
        text: 'XLRI, widely regarded as Asia’s best institution for Human Resource Management, continued to attract top HR recruiters including Accenture TAP, Asian Paints, Bajaj Auto, Citi, Godrej, HUL, HCCB, ITC, Mahindra, Mondelez, Nestle, Ola, P&G, Pepsico, Reckitt, Reliance, Sun Pharma, TAS, Vedanta, and Zeiss. Roles spanned Compensation & Benefits, Learning & Development, Talent Acquisition, HR Consulting, HR Analytics, and HR Business Partner functions.',
      },
      {
        id: 'consulting',
        name: 'Consulting & Advisory',
        text: 'The Consulting and Advisory domain accounted for nearly 30% of the batch placements. Leading firms such as Accenture Strategy, Bain, BCG, Deloitte USI, EY Parthenon, KPMG, McKinsey & Company, PwC US, and others participated actively, reaffirming XLRI’s position as a preferred consulting campus.',
      },
      {
        id: 'bfsi',
        name: 'BFSI',
        text: 'The BFSI sector witnessed strong participation from firms such as Axis Bank, Bajaj Finserv, Barclays, Citi Bank, DE Shaw, Deutsche Bank (Investment Banking), Goldman Sachs, HSBC, ICICI Bank, JPMC, Kotak Mahindra Bank, NIIF, and NPCI, offering roles across Investment Banking, Corporate Banking, Markets, Wealth Management, and Equity Research.',
      },
      {
        id: 'fmcg',
        name: 'FMCG, Consumer Durables and Pharma',
        text: 'Top companies such as AB InBev, Asian Paints, Coca-Cola, Colgate-Palmolive, Emami, Haleon, HUL, ITC, L’Oréal, Marico, Mondelez, Nestlé, P&G, PepsiCo, Reckitt, Samsung, Sun Pharma, and Tata Consumer Products continued to recruit in large numbers.',
      },
      {
        id: 'general',
        name: 'Conglomerates',
        text: 'Aditya Birla Group, Godrej Group, JSW, Mahindra, Reliance, Tata Administrative Services, and Vedanta led this cohort.',
      },
      {
        id: 'tech',
        name: 'ITES, E-commerce, Gaming and Online Services',
        text: 'The technology and e-commerce sectors featured recruiters like Amazon, American Express, CarDekho, Flipkart, JioStar, Media.net, Samsung, TransUnion CIBIL, and UNext.',
      },
      {
        id: 'industry',
        name: 'Automotive, Heavy Industries and Telecom',
        text: 'New entrants and returning firms included Airtel, AM/NS, Bajaj Auto, BPCL, Carl Zeiss, Michelin, Ola, Renew Power, RPG CEAT, Shell, Suzuki, Tata Steel, and Vodafone Idea.',
      },
    ],
  },
  more: 'https://www.xlri.ac.in/corporate-relations-and-placement/summer-internship-placements',
};

export const placementsOverview: PlacementsOverview = {
  title: 'Placements',
  intro:
    'Final placement and summer internship outcomes for XLRI’s two-year PGDM programmes, recruited across the Jamshedpur and Delhi-NCR campuses, with every report and audit since 2014.',
  recruitersIntro:
    'The organisations that made the most offers in the 2024–26 final placements and the 2025 summer internships.',
  image: BATCH_PHOTO,
};

export const placementsArchive: PlacementsArchive = {
  final: [
    {
      id: 'final-placement-report-2024-26',
      title: 'Final Placement Report 2024–26',
      kind: 'report',
      year: 2026,
      href: '/documents/placements/final-placement-report-2024-26.pdf',
      local: true,
    },
    {
      id: 'placement-audit-report-2022-24',
      title: 'Placement Audit Report 2022–24',
      kind: 'audit',
      year: 2024,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FAudit%20%20Report%202022-24.pdf2025-03-04T10%3A09%3A33.899Z?alt=media&token=2d161e50-72b2-4bba-acbc-770e6fd953e2',
    },
    {
      id: 'final-recruitment-process-2023',
      title: 'Final Recruitment Process 2023',
      kind: 'report',
      year: 2023,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FPlacement%20Report%20-%20Finals%202023.pdf2024-09-20T05%3A36%3A02.451Z?alt=media&token=e8bddaae-0a74-47e4-9354-4239333efb30',
    },
    {
      id: 'placement-audit-report-2021-23',
      title: 'Placement Audit Report 2021–23',
      kind: 'audit',
      year: 2023,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FPlacement%20Audit%20Report%202021-23.pdf2024-08-14T08%3A06%3A53.979Z?alt=media&token=45d513eb-b9c1-4a24-95b3-ebe219fb0b07',
    },
    {
      id: 'placement-audit-report-2020-22',
      title: 'Placement Audit Report 2020–22',
      kind: 'audit',
      year: 2022,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2Fplacement-audit-report-2020-22.pdf2024-01-18T07%3A06%3A09.192Z?alt=media&token=fd2ecef1-70e2-41bd-84d9-33e9471482c9',
    },
    {
      id: 'placement-audit-report-2019-21',
      title: 'Placement Audit Report 2019–21',
      kind: 'audit',
      year: 2021,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2Fplacement-audit-report-2019-21.pdf2024-01-18T07%3A05%3A38.970Z?alt=media&token=d848d0eb-0613-4e7c-9cd2-017b740df7d0',
    },
    {
      id: 'final-recruitment-process-2022',
      title: 'Final Recruitment Process 2022',
      kind: 'report',
      year: 2022,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FFinal%20Recruitment%20Process%202022.pdf2024-01-18T07%3A05%3A06.907Z?alt=media&token=f87ed28b-6fab-4a44-8fa5-4a0ee187e6f7',
    },
    {
      id: 'final-recruitment-process-2021',
      title: 'Final Recruitment Process 2021',
      kind: 'report',
      year: 2021,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FFinal%20Recruitment%20Process%202021.pdf2024-01-18T07%3A04%3A35.044Z?alt=media&token=1415cca6-d8a0-4783-9c66-c155cb0caf8e',
    },
    {
      id: 'final-recruitment-process-2020',
      title: 'Final Recruitment Process 2020',
      kind: 'report',
      year: 2020,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FCRP-2020.pdf2024-01-18T07%3A03%3A01.903Z?alt=media&token=3561b804-d78b-4255-b474-83f739e4c18f',
    },
    {
      id: 'final-recruitment-process-2019',
      title: 'Final Recruitment Process 2019',
      kind: 'report',
      year: 2019,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FCRP-2019.pdf2024-01-18T07%3A02%3A37.413Z?alt=media&token=77348c4b-1b01-47ed-aa93-1663b6f31c35',
    },
    {
      id: 'final-recruitment-process-2018',
      title: 'Final Recruitment Process 2018',
      kind: 'report',
      year: 2018,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FCRP-2018.pdf2024-01-18T07%3A02%3A15.859Z?alt=media&token=6c3c96e8-47c9-4cb0-844f-f5f87daf288e',
    },
    {
      id: 'final-recruitment-process-2017',
      title: 'Final Recruitment Process 2017',
      kind: 'report',
      year: 2017,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FCRP-2017.pdf2024-01-18T07%3A00%3A18.121Z?alt=media&token=609ac90a-413f-4e74-a6a6-1fe81e06c44d',
    },
    {
      id: 'final-recruitment-process-2016',
      title: 'Final Recruitment Process 2016',
      kind: 'report',
      year: 2016,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FCRP-2016.pdf2024-01-18T06%3A59%3A07.003Z?alt=media&token=fa8658c3-50e3-4d45-8036-a853b49c0995',
    },
    {
      id: 'final-recruitment-process-2015',
      title: 'Final Recruitment Process 2015',
      kind: 'report',
      year: 2015,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FCRP-2015.pdf2024-01-18T06%3A58%3A27.572Z?alt=media&token=03c0edde-6fda-4a96-8804-21c9c9850cd4',
    },
    {
      id: 'final-recruitment-process-2014',
      title: 'Final Recruitment Process 2014',
      kind: 'report',
      year: 2014,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FCRP-2014.pdf2024-01-18T06%3A57%3A54.997Z?alt=media&token=33b71628-2c78-4d9d-b320-3fc8a6a70c5f',
    },
  ],
  summer: [
    {
      id: 'summer-internship-2024',
      title: 'Summer Internship 2024',
      kind: 'report',
      year: 2024,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FXLRI%20completes%20Summer%20Internship%20Placements%202024.pdf2025-11-10T10%3A52%3A45.993Z?alt=media&token=4a75d706-0d46-4919-8c47-5f89026a2fc7',
    },
    {
      id: 'sip-audit-report-2023-25',
      title: 'SIP Audit Report 2023–25',
      kind: 'audit',
      year: 2025,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FScan%2017%20May%2025%2012%C2%B721%C2%B749.pdf2025-05-17T07%3A28%3A38.349Z?alt=media&token=9886132c-faa0-4cbe-b972-23f20df66721',
    },
    {
      id: 'summer-internship-2022',
      title: 'Summer Internship 2022',
      kind: 'report',
      year: 2022,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FSIP%202022-24%20Report.pdf2024-11-07T12%3A51%3A57.702Z?alt=media&token=e98e7c91-233c-470e-b3af-ac6ff3d31d24',
    },
    {
      id: 'sip-audit-report-2022-24',
      title: 'SIP Audit Report 2022–24',
      kind: 'audit',
      year: 2024,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FSIP%20Audit%20Report%20for%202022-2024.pdf2024-11-07T12%3A42%3A48.315Z?alt=media&token=81ed221f-fc54-420c-8951-656d93aab7ee',
    },
    {
      id: 'summer-internship-2023',
      title: 'Summer Internship 2023',
      kind: 'report',
      year: 2023,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FSummer%20Internship%20Placements.pdf2024-10-30T09%3A52%3A53.617Z?alt=media&token=d18ab21e-13e1-465f-a30e-85b79d929754',
    },
    {
      id: 'sip-audit-report-2021-23',
      title: 'SIP Audit Report 2021–23',
      kind: 'audit',
      year: 2023,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FXLRI%20SIP%20Placement%20Audit%20%20Report%202021-2023.pdf2023-12-29T18%3A08%3A20.756Z?alt=media&token=88fc9154-097e-480f-a0ac-2fa98a196470',
    },
    {
      id: 'sip-audit-report-2020-22',
      title: 'SIP Audit Report 2020–22',
      kind: 'audit',
      year: 2022,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FSummer%20Internship%20Placements%202021.pdf2023-12-29T18%3A07%3A31.440Z?alt=media&token=649e41cc-1983-4a28-a2e5-9060401207f7',
    },
    {
      id: 'summer-internship-2021',
      title: 'Summer Internship 2021',
      kind: 'report',
      year: 2021,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FSummer%20Internship%20Placements%202021.pdf2023-12-29T18%3A06%3A51.510Z?alt=media&token=96cf27ce-0f05-42f2-a0a2-bd80954894fe',
    },
    {
      id: 'summer-internship-2020',
      title: 'Summer Internship 2020',
      kind: 'report',
      year: 2020,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2Fsip-2020.pdf2023-12-29T18%3A05%3A51.107Z?alt=media&token=31b02d6d-6d7d-4773-a598-4b828fb59a3e',
    },
    {
      id: 'summer-internship-2019',
      title: 'Summer Internship 2019',
      kind: 'report',
      year: 2019,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FSIP-2019.pdf2023-12-29T18%3A05%3A06.174Z?alt=media&token=598e371c-70b0-4334-b3d4-81bc7cd5f72a',
    },
    {
      id: 'summer-internship-2018',
      title: 'Summer Internship 2018',
      kind: 'report',
      year: 2018,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FSIP-2018.pdf2023-12-29T18%3A04%3A13.102Z?alt=media&token=76ab92fd-6a00-4362-b4ad-9864f0738408',
    },
    {
      id: 'summer-internship-2017',
      title: 'Summer Internship 2017',
      kind: 'report',
      year: 2017,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FSIP-2017.pdf2023-12-29T18%3A03%3A25.251Z?alt=media&token=733afb2c-9981-46ca-a64e-2bacd74976d9',
    },
    {
      id: 'summer-internship-2016',
      title: 'Summer Internship 2016',
      kind: 'report',
      year: 2016,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FSIP-2016.pdf2023-12-29T18%3A01%3A48.211Z?alt=media&token=ffdb14c9-ee3e-4580-9ae2-e57b86c50978',
    },
    {
      id: 'summer-internship-2015',
      title: 'Summer Internship 2015',
      kind: 'report',
      year: 2015,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FSIP-2015.pdf2023-12-29T18%3A00%3A49.222Z?alt=media&token=3f2c9183-055b-4946-9e43-78a928aa9593',
    },
    {
      id: 'summer-internship-2014',
      title: 'Summer Internship 2014',
      kind: 'report',
      year: 2014,
      href: 'https://firebasestorage.googleapis.com/v0/b/xlri-firebase-e5d2d.appspot.com/o/CMS_MediaLibrary%2FSIP-2014.pdf2023-12-29T17%3A59%3A32.359Z?alt=media&token=c7c61188-8da9-4fcb-ad91-13d89136a126',
    },
  ],
};
