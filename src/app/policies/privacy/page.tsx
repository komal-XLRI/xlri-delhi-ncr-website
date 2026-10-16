import type { Metadata } from 'next';

import { PolicyPageView } from '@/features/policies/policy-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPolicy } from '@/services/policies';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getPolicy('privacy');
  return buildMetadata(site, { ...meta, path: routes.policies.privacy });
}

export default async function PrivacyPolicyRoute() {
  const content = await getPolicy('privacy');

  return (
    <main id="main">
      <PolicyPageView content={content} />
    </main>
  );
}
