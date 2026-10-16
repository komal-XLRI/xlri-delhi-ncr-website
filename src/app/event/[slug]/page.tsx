import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { EventDetail } from '@/features/events/event-detail-page';
import { longDate } from '@/features/events/event-dates';
import { fill } from '@/lib/format/template';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { getEvent, getEventSlugs } from '@/services/events';

/** Every event is built ahead of time; an unknown slug is a 404. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getEvent(slug);
  if (!content) return {};
  const { event, copy } = content;
  return buildMetadata(site, {
    title: fill(copy.metaTitle, {
      title: event.title,
      date: new Intl.DateTimeFormat('en-GB', {
        timeZone: 'UTC',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(new Date(`${event.dateTime}T00:00:00Z`)),
    }),
    description: fill(copy.metaDescription, {
      title: event.title,
      date: longDate(event.dateTime),
    }),
    image: event.image.src,
    imageAlt: event.title,
    path: routes.events.detail(slug),
  });
}

export default async function EventRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getEvent(slug);
  if (!content) notFound();

  return (
    <main id="main">
      <EventDetail content={content} />
    </main>
  );
}
