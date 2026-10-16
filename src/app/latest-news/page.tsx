import type { Metadata } from 'next';

import { LatestNews } from '@/features/news/latest-news-page';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getLatestNews } from '@/services/news';

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getLatestNews();
  return buildMetadata(site, { ...copy.meta, path: routes.news.index });
}

export default async function LatestNewsRoute() {
  const content = await getLatestNews();

  return (
    <main id="main">
      <LatestNews content={content} />
    </main>
  );
}
