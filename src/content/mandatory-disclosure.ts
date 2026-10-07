import type { MandatoryDisclosure } from '@/types/mandatory-disclosure';

/**
 * "Mandatory Disclosure" content.
 *
 * The Delhi-NCR page (xlridelhi.ac.in/about-xlri/mandatory-disclosure/) is a
 * title, "XLRI Delhi - NCR", and one embedded PDF — the November 2025
 * disclosure. It is self-hosted under public/documents/ so the page has no
 * runtime dependency on the old site.
 *
 * Only that document is listed, deliberately. The old site's media library also
 * holds a 2024 disclosure and two AICTE Extension of Approval letters (one
 * linked from its footer, a newer one not linked anywhere), but this is a
 * statutory page: which documents belong on it is the institution's call, not
 * something to infer from what happens to be uploaded. Add an entry here and
 * the page grows Jamshedpur's tab row automatically.
 */
export const mandatoryDisclosure: MandatoryDisclosure = {
  title: 'Mandatory Disclosure',
  subtitle: 'XLRI Delhi - NCR',
  documents: [
    {
      id: 'november-2025',
      title: 'Mandatory Disclosure – November 2025',
      src: '/documents/mandatory-disclosure/xlri-delhi-mandatory-disclosure-november-2025.pdf',
      sizeLabel: '2.1 MB',
      pages: 16,
    },
  ],
};
