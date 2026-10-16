import type { Metadata } from 'next';

import { ProgrammePage } from '@/features/academics/programme-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPgdmBm } from '@/services/programmes';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getPgdmBm();
  return buildMetadata(site, {
    ...meta,
    path: routes.academics.programme('pgdm-business-management'),
  });
}

export default async function PgdmBmRoute() {
  const content = await getPgdmBm();

  return (
    <main id="main">
      <ProgrammePage content={content} />
    </main>
  );
}
