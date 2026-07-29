import NextLink from 'next/link';

import { Container } from '@/components/layout/container';
import { ArrowRightIcon } from '@/components/ui/icon';
import { EventsCarousel } from '@/features/homepage/events-carousel';
import type { Events } from '@/types/homepage';

/**
 * Latest events.
 *
 * A header, a carousel of event cards, and one centred call to action.
 *
 * ## The content is fetched, not written
 *
 * Every title, date, link slug and banner in this section came from
 * xlridelhi.ac.in on 28 July 2026 and is reproduced verbatim — including a
 * lower-case "convocation" and three different dash characters, which are the
 * institution's own. `content/homepage.ts` carries the full provenance note,
 * and it is worth reading before correcting anything that looks like a typo.
 *
 * ## What is server rendered
 *
 * All six cards, with their titles, dates, links and images. The carousel is a
 * client component only because autoplay needs a timer and mouse drag needs a
 * pointer — the cards themselves are ordinary markup inside a scroll container,
 * so the section is fully present and fully navigable before any JavaScript
 * arrives, and remains so if none ever does.
 *
 * ## Palette
 *
 * Tokens only. `--brand` on headings and the button, `--accent-ink` on dates
 * and the arrows (the green seed is 1.74:1 on white and cannot carry text),
 * `--accent-surface` where the green is decoration — the hairline beside the
 * eyebrow, the hover border on the controls.
 */
export function EventsSection({ events }: { events: Events }) {
  return (
    <section
      aria-labelledby="events-heading"
      /* The brand motif, bottom-right and flipped — one corner only. See the
         "Brand motif" block in base.css. */
      data-motif="events"
      className="events-band relative isolate overflow-hidden py-16 md:py-20 lg:py-24"
    >
      <Container className="relative">
        {/* ---------------- header + carousel ---------------- */}
        {/*
          The heading and the intro are built here and handed to the carousel as
          props, because the arrows now live in the header and they need the
          carousel's scroll state.

          They stay Server Components. JSX created in a Server Component and
          passed to a Client Component is rendered on the server and arrives as
          RSC payload — the `h2` and the paragraph are in the HTML, not in the
          client bundle. What moved is only the decision about *where* they sit.
        */}
        <div className="reveal">
          <EventsCarousel
            items={events.items}
            heading={
              /*
                The heading alone. The eyebrow above it read "Latest events" —
                the heading's own words in small caps — so it labelled a label.
                The accent rule it carried moves under the heading, where it
                still marks the section without pretending to categorise it.
              */
              <>
                <h2 id="events-heading" className="section-heading">
                  {events.heading}
                </h2>
                <span
                  aria-hidden="true"
                  className="reveal-rule-x mt-5 block h-[3px] w-14 bg-accent-surface"
                />
              </>
            }
            intro={
              /* 17px on a 1.7 line-height across a 480px measure — the brief's
                 16–18px / 1.7 / 420–500px, and the same neutral the other
                 section leads use. */
              <p className="prose-justify max-w-[30rem] text-base leading-[1.7] text-ink-muted">
                {events.intro}
              </p>
            }
          />
        </div>

        {/* ---------------- the closing call to action ---------------- */}
        {/*
          `.cta-split`, shared with the About, Academics and News CTAs. All four
          are specified identically, and the surest way for identical buttons to
          stop matching is to define them four times.
        */}
        <div className="reveal mt-10 flex justify-center md:mt-12">
          <NextLink href={events.action.href} className="cta-split">
            <span className="cta-split-label">{events.action.label}</span>
            <span aria-hidden="true" className="cta-split-icon">
              <ArrowRightIcon size={18} className="cta-split-arrow" />
            </span>
          </NextLink>
        </div>
      </Container>
    </section>
  );
}
