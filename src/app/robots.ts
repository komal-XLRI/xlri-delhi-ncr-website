import type { MetadataRoute } from 'next';

import { site } from '@/config/site';
import { absoluteUrl } from '@/lib/seo/metadata';

/**
 * `/robots.txt`. Everything may be crawled except the design-system
 * workbench, which is for the team, not for search; the sitemap lists the
 * rest. Next's own build files are not pages and are left alone.
 *
 * A copy of the site at any address other than the real one (a preview, a
 * local build) asks not to be crawled at all, so it cannot compete with the
 * real site in search. `SITE_URL` decides which is which.
 */
export default function robots(): MetadataRoute.Robots {
  const isLive = !/localhost|127\.0\.0\.1|vercel\.app|\.local\b/.test(site.url);
  if (!isLive) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/design-system'] },
    sitemap: absoluteUrl(site.url, '/sitemap.xml'),
    host: site.url,
  };
}
