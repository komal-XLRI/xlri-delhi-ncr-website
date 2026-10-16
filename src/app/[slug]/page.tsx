import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { NewsArticle } from '@/features/news/news-article-page';
import { newsDate } from '@/features/news/news-dates';
import { fill } from '@/lib/format/template';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getNewsSlugs, getNewsStory } from '@/services/news';

/**
 * News stories, at the site root as on the live site
 * (`/corporate-confluence-2025`). Every page with a fixed address takes
 * precedence over this one, and only the stories in `news.json` are built:
 * any other single-segment address is a 404, as before.
 */
export const dynamicParams = false;

/** A meta description's length: the opening lines, cut at a word. */
function clip(text: string, max = 160): string {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(' ', max - 1))}…`;
}

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getNewsStory(slug);
  if (!content) return {};
  const { story, copy } = content;
  return buildMetadata(site, {
    title: story.title,
    description: story.excerpt
      ? clip(story.excerpt)
      : fill(copy.metaDescription, { title: story.title, date: newsDate(story.date) }),
    image: story.image.src,
    imageAlt: story.title,
    path: routes.news.article(slug),
    type: 'article',
    publishedTime: story.date,
  });
}

export default async function NewsStoryRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getNewsStory(slug);
  if (!content) notFound();

  return (
    <main id="main">
      <NewsArticle content={content} />
    </main>
  );
}
