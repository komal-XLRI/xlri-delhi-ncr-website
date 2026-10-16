import type { Metadata } from 'next';

import { SitemapPage } from '@/features/policies/sitemap-page';
import { POLICY_NAV, PRIMARY_NAV, UTILITY_NAV } from '@/config/navigation';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getSitemapCopy } from '@/services/policies';

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getSitemapCopy();
  return buildMetadata(site, { ...meta, path: routes.sitemap });
}

export default async function SitemapRoute() {
  const copy = await getSitemapCopy();
  // Pages outside the main menu: the utility row and the policies, once each.
  const more = [...UTILITY_NAV, ...POLICY_NAV].filter(
    (item, index, all) =>
      item.href !== routes.sitemap && all.findIndex((other) => other.href === item.href) === index,
  );

  return (
    <main id="main">
      <SitemapPage copy={copy} primary={PRIMARY_NAV} more={more} />
    </main>
  );
}
