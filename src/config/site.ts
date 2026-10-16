import { env } from '@/config/env';
import siteJson from '@/config/site.json';

/**
 * Institutional facts used by metadata, JSON-LD, and the footer.
 *
 * Scope is the Delhi-NCR campus (D1), which is why `parentOrganization` is
 * present: structured data must model this as a campus of XLRI rather than as
 * the institute itself, or the two sites compete in search for the same entity.
 *
 * The names and the default description — the words a visitor reads, in the
 * footer and in search results — are in `config/site.json`, so they can be
 * edited without touching code. URLs and machine values stay here.
 *
 * TODO(Q4): confirm the legal entity name, full postal address, and the
 * official social profile list with the communications team before launch.
 */
export const site = {
  name: siteJson.name,
  legalName: siteJson.legalName,
  shortName: siteJson.shortName,
  /** Default meta description — every page that does not set its own. */
  description: siteJson.description,
  url: env.SITE_URL,
  locale: 'en_IN',
  /** Single-locale by decision D6. Kept as a named constant so the assumption is greppable. */
  languages: ['en'] as const,

  parentOrganization: {
    name: siteJson.parentOrganizationName,
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
