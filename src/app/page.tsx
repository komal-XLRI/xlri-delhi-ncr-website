import { AboutSection } from '@/features/homepage/about-section';
import { AcademicsSection } from '@/features/homepage/academics-section';
import { AccreditationsSection } from '@/features/homepage/accreditations-section';
import { EventsSection } from '@/features/homepage/events-section';
import { HeroSection } from '@/features/homepage/hero-section';
import { InsightsSection } from '@/features/homepage/insights-section';
import { NewsSection } from '@/features/homepage/news-section';
import {
  getAbout,
  getAcademics,
  getAccreditations,
  getEvents,
  getHero,
  getInsights,
  getNews,
} from '@/services/homepage';

/**
 * The homepage.
 *
 * Composes feature sections and holds no markup of its own beyond `<main>` —
 * pages orchestrate, features render (§7). Data comes through `services/`, so
 * this file is unaffected when the source becomes a CMS.
 *
 * Both requests are issued together rather than awaited in sequence; they are
 * independent, and serialising them would cost a round trip for nothing once
 * they are real queries.
 */
export default async function HomePage() {
  const [hero, about, academics, accreditations, events, insights, news] = await Promise.all([
    getHero(),
    getAbout(),
    getAcademics(),
    getAccreditations(),
    getEvents(),
    getInsights(),
    getNews(),
  ]);

  return (
    <main id="main">
      <HeroSection hero={hero} />
      <AboutSection about={about} />
      {/*
        The order is an argument.

        About is the school describing itself. Academics answers the question a
        prospective applicant actually arrived with — what is taught here —
        which is why it follows immediately rather than sitting below the news.
        Accreditation is where a third party vouches for all of it, and an
        endorsement lands harder after the claim than before it. News is last
        because announcements matter to people who have already decided to care.
      */}

      <NewsSection news={news} />
      <AccreditationsSection accreditations={accreditations} />
      <AcademicsSection academics={academics} />
      <EventsSection events={events} />
      <InsightsSection insights={insights} />
    </main>
  );
}
