import type { AccreditationPage } from '@/types/accreditation';

/**
 * "Accreditation" content.
 *
 * ## Sources
 *
 * The Delhi-NCR page (xlridelhi.ac.in/about-xlri/accreditation/) carries no
 * running text — only the AMBA and BGA certificates of January 2025. So the
 * words here are the certificates' own: what each accredits, when, and the
 * awarding body's description of itself, transcribed from the documents.
 *
 * The one sentence that is not on a certificate is the intro, which gives the
 * terms (five years, AMBA for the third consecutive time). It is XLRI's own
 * published statement, from the 2025 entry of the Jamshedpur heritage timeline.
 *
 * Images: the certificates re-encoded at 1092px, and each body's mark cropped
 * from the head of its certificate — the site has no BGA logo file, and
 * cropping both keeps the two marks consistent. Each crop was whitened by
 * scaling every channel so the certificate's paper colour maps to pure white;
 * without that the cream paper showed as a box on the white card, and
 * `mix-blend-multiply` cannot remove a tint, only white. Banner: the Delhi campus
 * photograph already used on Vision & Mission.
 */
export const accreditation: AccreditationPage = {
  title: 'Accreditation',

  banner: {
    src: '/media/vision-mission/campus-i-love-xlri.jpg',
    width: 1537,
    height: 1023,
    alt: 'The XLRI Delhi-NCR campus, with the “I ♥ XLRI” sign on the front lawn',
  },

  intro:
    'XLRI achieved a significant milestone by securing AMBA accreditation for the third consecutive time for a five-year period (2025-2030). Simultaneously, XLRI received BGA accreditation for the first time, also for a five-year period (2025-2030).',

  international: {
    heading: 'International Accreditation',
    items: [
      {
        id: 'amba',
        name: 'AMBA',
        body: 'Association of MBAs',
        scope: 'MBA & MBM Portfolio delivered by XLRI – Xavier School of Management',
        awarded: 'January 2025',
        statement:
          'AMBA is the only MBA-specific global accreditation organisation, accrediting MBA programmes at the world’s leading business schools.',
        mark: {
          src: '/media/accreditation/amba-logo.jpg',
          width: 750,
          height: 270,
          alt: 'Association of MBAs — Be in brilliant company',
        },
        certificate: {
          src: '/media/accreditation/amba-certificate-2025.jpg',
          width: 1092,
          height: 1536,
          alt: 'AMBA Certificate of Accreditation for the MBA & MBM Portfolio delivered by XLRI – Xavier School of Management, January 2025',
        },
      },
      {
        id: 'bga',
        name: 'BGA',
        body: 'Business Graduates Association',
        scope: 'XLRI – Xavier School of Management',
        awarded: 'January 2025',
        statement:
          'BGA accreditation is a gold-standard quality mark and is awarded to Business Schools that clearly demonstrate an increasing impact on their students and communities over a measurable period.',
        mark: {
          src: '/media/accreditation/bga-logo.jpg',
          width: 710,
          height: 300,
          alt: 'Business Graduates Association — Leaders never stop learning',
        },
        certificate: {
          src: '/media/accreditation/bga-certificate-2025.jpg',
          width: 1089,
          height: 1536,
          alt: 'BGA Certificate of Accreditation for XLRI – Xavier School of Management, January 2025',
        },
      },
    ],
  },
};
