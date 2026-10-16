import type { Metadata } from 'next';

import { PolicyPageView } from '@/features/policies/policy-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPolicy } from '@/services/policies';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getPolicy('help');
  return buildMetadata(site, { ...meta, path: routes.policies.help });
}

export default async function HelpPolicyRoute() {
  const content = await getPolicy('help');

  return (
    <main id="main">
      <PolicyPageView content={content} />
    </main>
  );
}
