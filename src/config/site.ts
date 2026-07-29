import { env } from '@/config/env';

/**
 * Institutional facts used by metadata, JSON-LD, and the footer.
 *
 * Scope is the Delhi-NCR campus (D1), which is why `parentOrganization` is
 * present: structured data must model this as a campus of XLRI rather than as
 * the institute itself, or the two sites compete in search for the same entity.
 *
 * TODO(Q4): confirm the legal entity name, full postal address, and the
 * official social profile list with the communications team before launch.
 */
export const site = {
  name: 'XLRI Delhi-NCR',
  legalName: 'XLRI — Xavier School of Management, Delhi-NCR Campus',
  shortName: 'XLRI Delhi',
  description:
    'XLRI Delhi-NCR — Xavier School of Management. Postgraduate management education, executive programmes, and research at the Jhajjar campus.',
  url: env.SITE_URL,
  locale: 'en_IN',
  /** Single-locale by decision D6. Kept as a named constant so the assumption is greppable. */
  languages: ['en'] as const,

  parentOrganization: {
    name: 'XLRI — Xavier School of Management',
    url: 'https://xlri.ac.in',
  },

  /** Sibling properties in the XLRI ecosystem, identified in the §16 audit. */
  relatedProperties: {
    institute: 'https://xlri.ac.in',
    alumni: 'https://xlrialumni.xlri.ac.in',
    incubator: 'https://xceed.xlri.ac.in',
    nirf: 'https://acad.xlri.ac.in/xluploads/nirf/',
  },

  /** Triple-crown accreditation — the three-tier treatment in §2.3. */
  accreditations: [
    {
      id: 'aacsb',
      name: 'AACSB',
      fullName: 'Association to Advance Collegiate Schools of Business',
    },
    { id: 'amba', name: 'AMBA', fullName: 'Association of MBAs' },
    { id: 'equis', name: 'EQUIS', fullName: 'EFMD Quality Improvement System' },
  ],
} as const;

export type Site = typeof site;
