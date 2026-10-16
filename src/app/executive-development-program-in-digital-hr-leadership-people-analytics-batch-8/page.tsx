import type { Metadata } from 'next';

import { EmdpProgrammePage } from '@/features/executive-education/emdp-programme-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getEmdpProgramme } from '@/services/executive-education';

/** Its id in emdp.json and emdp-programmes.json; the address is the live site's. */
const ID = 'digital-hr-people-analytics-batch-8';

export async function generateMetadata(): Promise<Metadata> {
  const { meta, poster } = await getEmdpProgramme(ID);
  return buildMetadata(site, {
    ...meta,
    image: poster.src,
    imageAlt: poster.alt,
    path: routes.executiveEducation.emdpProgramme(ID),
  });
}

export default async function DigitalHrBatch8Route() {
  const content = await getEmdpProgramme(ID);

  return (
    <main id="main">
      <EmdpProgrammePage content={content} />
    </main>
  );
}
