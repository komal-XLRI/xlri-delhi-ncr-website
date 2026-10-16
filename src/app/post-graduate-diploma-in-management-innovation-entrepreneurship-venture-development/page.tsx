import type { Metadata } from 'next';

import { JsonLd } from '@/components/seo/json-ld';
import { PgdmIevPage } from '@/features/academics/pgdm-iev-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { course } from '@/lib/seo/structured-data';
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
      <JsonLd
        data={course(site.url, {
          name: content.meta.title,
          path: routes.academics.programme('pgdm-innovation-entrepreneurship'),
          description: content.meta.description,
          ...(content.meta.image ? { image: content.meta.image } : {}),
        })}
      />
      <PgdmIevPage content={content} />
    </main>
  );
}
