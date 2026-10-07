import type { FoundingFather, FoundingFathers } from '@/types/founding-fathers';

/**
 * "Jesuit Founding Fathers" content.
 *
 * Text and portraits from the XLRI Jamshedpur page
 * (xlri.ac.in/about/jesuit-founding-fathers), verbatim — it is one history for
 * both campuses. Portraits are their 270×315 originals re-encoded as JPEG and
 * self-hosted under public/media/founding-fathers/.
 */

const portrait = (slug: string): FoundingFather['portrait'] => ({
  src: `/media/founding-fathers/${slug}.jpg`,
  width: 270,
  height: 315,
});

export const foundingFathers: FoundingFathers = {
  title: 'Jesuit Founding Fathers',
  subtitle: 'The Visionaries : Who is who',
  intro:
    'The Founding Fathers of XLRI whose vision, commitment and adherence to the jesuit spirit of magis shaped this centre of excellence.',
  fathers: [
    {
      id: 'quinn-enright',
      name: 'Fr. Quinn Enright',
      cardLabel: 'SJ (Founding Father of XLRI)',
      portrait: portrait('fr-quinn-enright'),
      biography:
        'XLRI was founded in 1949 by Fr. Quinn Enright, SJ, - Founding Father of XLRI. He obtained permission from Bihar University to prepare candidates for Ranchi University’s MA degree in Labor and Social Welfare. Fr. Enright was Director of XLRI from 1949 to 1959.',
    },
    {
      id: 'eh-mcgrath',
      name: 'Fr. E.H. McGrath',
      cardLabel: 'SJ',
      portrait: portrait('fr-eh-mcgrath'),
      biography:
        'Fr. E.H. McGrath, SJ, was Director of XLRI from 1959 to 1962, and 1981-1982. Fr McGrath conducted several courses for management and trade union groups at XLRI. During the 60s, XLRI started offering courses for unions at the Steel Worker College.',
    },
    {
      id: 'jim-collins',
      name: 'Fr. Jim Collins',
      cardLabel: 'SJ',
      portrait: portrait('fr-jim-collins'),
      biography:
        'Fr. Jim Collins, SJ, was Dean at XLRI from 1962-1964. He was instrumental in starting the Three-Year Business Management Evening Programme. This led to the two-year Business Management Day Programme in 1968. He also taught Labour Law.',
    },
    {
      id: 'william-tome',
      name: 'Fr. William N Tome',
      cardLabel: 'SJ',
      portrait: portrait('fr-william-tome'),
      biography:
        'Fr William N Tome, SJ, was Director of XLRI from 1962 to 1970 and again from 1973 to 1978. He conducted courses on Business Communication as well as Business Ethics.',
    },
    {
      id: 'wa-dawson',
      name: 'Fr. WA Dawson',
      cardLabel: 'SJ',
      portrait: portrait('fr-wa-dawson'),
      biography:
        'Fr. WA Dawson, SJ, was a faculty member in XLRI in the 1960s. He taught Labour law.',
    },
    {
      id: 'h-covely',
      name: 'Fr. H Covely',
      cardLabel: 'SJ',
      portrait: portrait('fr-h-covely'),
      biography: 'Fr. H Covely, SJ, was Treasurer at XLRI in the 1960s.',
    },
    {
      id: 'rw-norman',
      name: 'Fr. RW Norman',
      cardLabel: 'SJ',
      portrait: portrait('fr-rw-norman'),
      biography:
        'Fr. RW Norman, SJ, was Director of XLRI for a short period during 1981. Fr Norman was primarily responsible for the infrastructure of XLRI in the 70s and 80s. The Sir Jehangir Ghandy Library and the infrastructure development was largely done under his supervision.',
    },
  ],
};
