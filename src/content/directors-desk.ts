import type { DirectorsDesk } from '@/types/directors-desk';

/**
 * "From the Director's Desk" content.
 *
 * Copied verbatim from the current site
 * (xlridelhi.ac.in/about-xlri/from-the-directors-desk/) — this is the Director's
 * own message, so it is not ours to edit for house style. The only changes are
 * structural: the four hallmarks are split out into title and body,
 * and the sign-off is separated from the body.
 *
 * Portrait: wp-content/uploads/2026/07/fr-tony.jpg, 900×1200, self-hosted under
 * public/media/leadership/ so the page has no runtime dependency on the old site.
 */
export const directorsDesk: DirectorsDesk = {
  title: 'From the Director’s Desk',

  director: {
    name: 'Fr. Antony R Uvari, SJ',
    designation: 'Director, XLRI Delhi-NCR',
    portrait: {
      src: '/media/leadership/fr-antony-uvari.jpg',
      width: 900,
      height: 1200,
      alt: 'Portrait of Fr. Antony R Uvari, SJ, Director of XLRI Delhi-NCR',
    },
  },

  message: {
    heading: 'Director’s Message',
    opening: [
      'At XLRI Delhi-NCR, we carry forward a proud legacy that began in 1949 when Jesuit Fr. Quinn Enright, SJ, and his companions laid the foundation of what would become modern India’s oldest business school. Long before the emergence of other premier institutions, XLRI was envisioned as more than just a centre for academic excellence — it was conceived as a place where values, vision, and a commitment to the greater good would shape leaders for generations to come.',
      'Over the last 75 years, thanks to the tireless dedication of our faculty, the unwavering commitment of our staff, and the enduring loyalty of our alumni, XLRI has earned its place among the top business schools in India and Asia. Yet, what truly differentiates us is not just our ranking, but the four hallmarks of Jesuit education that guide everything we do:',
    ],
    hallmarks: [
      {
        id: 'excellence',
        title: 'Excellence',
        subtitle: 'The Spirit of Magis',
        body: 'At the heart of our ethos lies the Latin ideal Magis — not just doing well, but striving for the greater, the better, and the best possible. Excellence at XLRI means never settling for complacency. It means equipping our students with the mindset to innovate, adapt, and lead in a rapidly changing world — from boardrooms to grassroots initiatives.',
      },
      {
        id: 'integrity',
        title: 'Integrity',
        subtitle: 'Ethics as a Core Competency',
        body: 'Excellence without ethics is incomplete. Integrity is woven into the very DNA of XLRI. It is what shapes leaders who are not only successful in business but also responsible stewards of society. Our students are encouraged to see business decisions not just through the lens of profitability, but also sustainability, fairness, and societal impact.',
      },
      {
        id: 'whole-person',
        title: 'Whole-Person Growth',
        body: 'Leadership is not defined solely by intellectual ability. At XLRI, we nurture growth across intellectual, emotional, social, and spiritual dimensions. This holistic approach develops leaders who are empathetic, resilient, and committed to making a difference — whether in entrepreneurship, corporate leadership, or social innovation.',
      },
      {
        id: 'social-consciousness',
        title: 'Social Consciousness',
        subtitle: 'Business for the Greater Good',
        body: 'From compulsory courses in Business Ethics to rural immersion programmes, our curriculum fosters a deep sensitivity to the needs of the less privileged. We believe that the true measure of business leadership lies in the ability to create value that extends beyond shareholders to benefit the larger community and the environment.',
      },
    ],
    closing: [
      'Our state-of-the-art campus at Jhajjar, Delhi-NCR as well as Amravati (AP) and Navi Mumbai campuses in the works are part of a strategic vision to reach and inspire more young minds. Our flagship PGDM programmes in Business Management, Human Resource Management, General Management, and our Fellow Programme are constantly evolving to meet the demands of sustainability-driven business practices, technological disruption, and entrepreneurial innovation.',
      'Beyond academics, our Management Development and Outreach Programmes have empowered thousands of executives at all levels to enhance their leadership skills, adopt sustainable strategies, and contribute meaningfully to their organisations and society.',
      'As you step into XLRI Delhi-NCR, you are not just joining a business school; you are becoming part of a living tradition — one that challenges you to think beyond yourself, act with integrity, and strive for Excellence in the service of the Greater Good.',
    ],
    invitation: 'Come, explore the spirit of Magis, and let XLRI inspire you to lead with purpose.',
    signOff: 'God Bless You,',
  },

  biography: {
    heading: 'About the Director',
    paragraphs: [
      'Fr. Antony R Uvari, SJ, having done his Post Graduation from XLRI, Jamshedpur and PhD from Madras University, is currently working as the Director, XLRI, Delhi-NCR.',
      'Fr. Antony R Uvari, SJ has over eighteen years of rich experience in different fields of OB & HRM like Institutional Building, Industrial Relations, Business & Corporate HR and Training and Development etc. His research interests are in the area of Leadership and Personnel Effectiveness, and his current area of research is the Relationship between HR Practices and the Performance of Business Organizations.',
      'Fr. Antony R Uvari, SJ has published many research articles in national and international conferences and conducted various Management Development Programmes (MDPs) for different Corporate & Development sector organizations in the area of Organization Building, Human Resource Management, Teamwork for the Star Performers and Leadership Development.',
      'Fr. Antony R Uvari, SJ has developed several case studies for classroom training, teaching on OB/HR related issues & used for learning purposes.',
      'Fr. Antony R Uvari, SJ is currently associated with many Academic Institutions of repute as Life Member of NHRD, Board member of IAJBS (International Association of Jesuit Business School), Board member of XLRI, Jamshedpur, Board member of Xavier Institute of Social Service, Ranchi, Board member of St. Xavier’s University, Kolkata and Board member of LIBA, Chennai.',
    ],
  },
};
