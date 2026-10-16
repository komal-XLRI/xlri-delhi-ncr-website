import newsJson from '@/content/news.json';
import { routes } from '@/constants/routes';
import { fromJson } from '@/lib/validation/json-content';
import type { LatestNewsPage, NewsArticlePage, NewsStory, StoredNews } from '@/types/news';

const stored = fromJson<StoredNews>(newsJson);

/** Marked-up text as plain text: `**bold**` and `[text](url)` lose their marks. */
const plain = (text: string) => text.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

/** Newest first, as the live listing orders them. */
const stories: readonly NewsStory[] = stored.items.map((story) => {
  const first = story.body.find((block) => block.kind === 'p');
  return {
    ...story,
    href: routes.news.article(story.slug),
    excerpt: first?.kind === 'p' ? plain(first.text) : '',
  };
});

/**
 * News repository — the same seam as `services/homepage`. Async so the
 * Payload query that replaces it is not a signature change.
 */
export async function getLatestNews(): Promise<LatestNewsPage> {
  return Promise.resolve({ copy: stored.page, stories });
}

export async function getNewsSlugs(): Promise<readonly string[]> {
  return Promise.resolve(stories.map((story) => story.slug));
}

/** One story's page, or `undefined` for an unknown slug. */
export async function getNewsStory(slug: string): Promise<NewsArticlePage | undefined> {
  const index = stories.findIndex((story) => story.slug === slug);
  const story = stories[index];
  if (!story) return Promise.resolve(undefined);
  // Three more: the ones after it, then before it near the list's end.
  const more = [...stories.slice(index + 1), ...stories.slice(0, index).reverse()].slice(0, 3);
  return Promise.resolve({
    copy: stored.article,
    listing: {
      section: stored.page.section,
      title: stored.page.title,
      readMore: stored.page.readMore,
    },
    story,
    more,
  });
}
