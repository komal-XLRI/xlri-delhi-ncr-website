import type { Metadata } from 'next';

import { PgdmIevPage } from '@/features/academics/pgdm-iev-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPgdmIev } from '@/services/programmes';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getPgdmIev();
  return buildMetadata(site, {
    ...meta,
    path: routes.academics.programme('pgdm-innovation-entrepreneurship'),
  });
}

export default async function PgdmIevRoute() {
  const content = await getPgdmIev();

  return (
    <main id="main">
      <PgdmIevPage content={content} />
    </main>
  );
}
