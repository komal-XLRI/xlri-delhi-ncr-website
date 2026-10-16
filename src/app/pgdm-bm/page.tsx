import type { Metadata } from 'next';

import { JsonLd } from '@/components/seo/json-ld';
import { ProgrammePage } from '@/features/academics/programme-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { course } from '@/lib/seo/structured-data';
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
      <JsonLd
        data={course(site.url, {
          name: content.meta.title,
          path: routes.academics.programme('pgdm-business-management'),
          description: content.meta.description,
          ...(content.meta.image ? { image: content.meta.image } : {}),
        })}
      />
      <ProgrammePage content={content} />
    </main>
  );
}
