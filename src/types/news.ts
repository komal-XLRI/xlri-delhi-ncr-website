import type { ProgrammeImage } from './homepage';
import type { PageMeta } from './page-copy';

/**
 * Latest News — the listing at `/latest-news` and each story at the site
 * root (`/corporate-confluence-2025`), both the live site's addresses.
 * Content is `content/news.json`.
 *
 * Text in `p`, `list` and `quote` blocks may carry two marks, kept as written
 * on the live page: `**bold**` and `[link text](https://…)`.
 */

export type NewsBlock =
  | { readonly kind: 'p'; readonly text: string }
  /** A subheading inside the story ("Event Details:"). */
  | { readonly kind: 'h'; readonly text: string }
  | { readonly kind: 'list'; readonly items: readonly string[] }
  | { readonly kind: 'quote'; readonly text: string; readonly cite?: string }
  /** A call to action the live story ends on ("Know More", "Read Article"). */
  | { readonly kind: 'link'; readonly label: string; readonly href: string };

export interface StoredNewsStory {
  readonly slug: string;
  /** As the live listing prints it, capitals and all. */
  readonly title: string;
  /** ISO date: the live story's publication date. */
  readonly date: string;
  /** The picture on the listing, and at the head of the story. */
  readonly image: ProgrammeImage;
  /** A line under the title, where the live story has one. */
  readonly standfirst?: string;
  /** Empty where the live story is a picture and a title only. */
  readonly body: readonly NewsBlock[];
  /** The story's other photographs. */
  readonly gallery?: readonly ProgrammeImage[];
}

export interface NewsStory extends StoredNewsStory {
  readonly href: string;
  /** The first paragraph as plain text, for the cards; empty if there is none. */
  readonly excerpt: string;
}

export interface LatestNewsCopy {
  readonly meta: PageMeta;
  readonly section: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly facts: { readonly stories: string; readonly years: string; readonly latest: string };
  readonly spotlightBadge: string;
  readonly yearsNav: string;
  readonly yearCount: { readonly one: string; readonly other: string };
  readonly readMore: string;
}

export interface NewsArticleCopy {
  /** "{title} — news from XLRI Delhi-NCR, {date}." */
  readonly metaDescription: string;
  readonly eyebrow: string;
  readonly galleryHeading: string;
  /** "{title}: photograph {n} of {count}". */
  readonly galleryAlt: string;
  readonly back: string;
  readonly more: string;
  readonly opensNewTab: string;
}

export interface StoredNews {
  readonly page: LatestNewsCopy;
  readonly article: NewsArticleCopy;
  readonly items: readonly StoredNewsStory[];
}

export interface LatestNewsPage {
  readonly copy: LatestNewsCopy;
  readonly stories: readonly NewsStory[];
}

export interface NewsArticlePage {
  readonly copy: NewsArticleCopy;
  readonly listing: { readonly section: string; readonly title: string; readonly readMore: string };
  readonly story: NewsStory;
  readonly more: readonly NewsStory[];
}
