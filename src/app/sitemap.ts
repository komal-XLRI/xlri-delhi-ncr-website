import { readdirSync, readFileSync } from 'node:fs';
import { join, sep } from 'node:path';

import type { MetadataRoute } from 'next';

import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { absoluteUrl } from '@/lib/seo/metadata';
import { getLatestEvents } from '@/services/events';
import { getAdjunctFacultyIds, getFullTimeFacultyIds } from '@/services/faculty';
import { getLatestNews } from '@/services/news';
import { getPolicy } from '@/services/policies';

const APP = join(process.cwd(), 'src', 'app');

/**
 * Every page with a fixed address, read from `src/app` when the site is
 * built, so a new page is listed without anyone remembering to add it.
 * Left out: route groups' brackets, pages with a dynamic segment (listed
 * below from their content), and pages that ask not to be indexed.
 */
function fixedPages(): string[] {
  return readdirSync(APP, { recursive: true, encoding: 'utf8' })
    .map((file) => file.split(sep).join('/'))
    .filter((file) => file === 'page.tsx' || file.endsWith('/page.tsx'))
    .filter((file) => !file.includes('['))
    .filter((file) => {
      const source = readFileSync(join(APP, file), 'utf8');
      return !/noIndex:\s*true|index:\s*false/.test(source);
    })
    .map((file) => `/${file.replace(/\/?page\.tsx$/, '')}`.replace(/\/\([^)]+\)/g, '') || '/');
}

/**
 * `/sitemap.xml` — every indexable page, for search engines. Built once, at
 * build time. Events and news carry their own dates; other pages carry none
 * rather than a made-up one, which search engines would learn to ignore.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [fullTime, adjunct, { events }, { stories }, ...policies] = await Promise.all([
    getFullTimeFacultyIds(),
    getAdjunctFacultyIds(),
    getLatestEvents(),
    getLatestNews(),
    ...(['privacy', 'terms', 'copyright', 'help'] as const).map(async (id) => ({
      path: routes.policies[id],
      empty: !(await getPolicy(id)).sections?.length,
    })),
  ]);
  // Policy pages with no text yet ask not to be indexed, so are not listed.
  const unlisted = new Set<string>(
    policies.filter((policy) => policy.empty).map((policy) => policy.path),
  );

  const url = (path: string) => absoluteUrl(site.url, path);

  return [
    ...fixedPages()
      .filter((path) => !unlisted.has(path))
      .sort()
      .map((path) => ({ url: url(path), ...(path === '/' ? { priority: 1 } : {}) })),
    ...fullTime.map((slug) => ({ url: url(routes.faculty.fullTimeProfile(slug)) })),
    ...adjunct.map((slug) => ({ url: url(routes.faculty.adjunctProfile(slug)) })),
    ...events.map((event) => ({
      url: url(event.href),
      lastModified: event.dateTime,
    })),
    ...stories.map((story) => ({
      url: url(story.href),
      lastModified: story.date,
    })),
  ];
}
