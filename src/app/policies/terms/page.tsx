import type { Metadata } from 'next';

import { PolicyPageView } from '@/features/policies/policy-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPolicy } from '@/services/policies';

export async function generateMetadata(): Promise<Metadata> {
  const { meta, sections } = await getPolicy('terms');
  // Not listed in search while it has no text yet (see `emptyNote`).
  return buildMetadata(site, {
    ...meta,
    path: routes.policies.terms,
    noIndex: !sections?.length,
  });
}

export default async function TermsPolicyRoute() {
  const content = await getPolicy('terms');

  return (
    <main id="main">
      <PolicyPageView content={content} />
    </main>
  );
}
