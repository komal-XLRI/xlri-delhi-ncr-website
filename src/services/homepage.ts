import homepageJson from '@/content/homepage.json';
import type {
  About,
  Academics,
  Accreditations,
  Events,
  Hero,
  Insights,
  News,
} from '@/types/homepage';
import { fromJson } from '@/lib/validation/json-content';
import { getRecentEvents } from '@/services/events';

const about = fromJson<About>(homepageJson.about);
const academics = fromJson<Academics>(homepageJson.academics);
const accreditations = fromJson<Accreditations>(homepageJson.accreditations);
/** The strip's copy; its events are the newest `count` from `content/events.json`. */
const events = fromJson<Omit<Events, 'items'> & { readonly count: number }>(homepageJson.events);
const hero = fromJson<Hero>(homepageJson.hero);
const insights = fromJson<Insights>(homepageJson.insights);
const news = fromJson<News>(homepageJson.news);

/**
 * Homepage repository.
 *
 * The seam described in §3. Pages call these functions and never learn where the
 * data came from; today it is a typed module, in Phase 6 it will be a Payload
 * query. Because the return type is owned by `types/` rather than by the content
 * module, that swap changes this file and nothing above it.
 *
 * `async` from the outset even though nothing awaits yet — the CMS version will
 * be, and making callers `await` now means the migration is not a signature
 * change rippling through every page.
 */
export async function getHero(): Promise<Hero> {
  return Promise.resolve(hero);
}

export async function getAbout(): Promise<About> {
  return Promise.resolve(about);
}

export async function getAcademics(): Promise<Academics> {
  return Promise.resolve(academics);
}

export async function getAccreditations(): Promise<Accreditations> {
  return Promise.resolve(accreditations);
}

export async function getEvents(): Promise<Events> {
  const { count, ...copy } = events;
  return { ...copy, items: await getRecentEvents(count) };
}

export async function getInsights(): Promise<Insights> {
  return Promise.resolve(insights);
}

export async function getNews(): Promise<News> {
  return Promise.resolve(news);
}
