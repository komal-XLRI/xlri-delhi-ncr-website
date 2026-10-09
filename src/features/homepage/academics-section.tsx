import NextLink from 'next/link';

import { Container } from '@/components/layout/container';
import { ArrowRightIcon } from '@/components/ui/icon';
import { AcademicsCarousel } from '@/features/homepage/academics-carousel';
import type { Academics } from '@/types/homepage';

/**
 * Academic programmes — the section between the institutional story and the
 * news feed.
 *
 * About says who the school is; this says what it actually teaches, which is
 * the question a prospective applicant arrived with. It sits before News for
 * that reason: announcements matter to people who have already decided to care.
 *
 * ## The carousel, and what changed about it
 *
 * This was a featured-programme showcase: one large split panel, a rail of six
 * names, and a 398-line client component. It is a carousel again by request,
 * but not the same one. The failure worth not repeating is that the old version
 * **unmounted** the five unselected programmes, so five sixths of the portfolio
 * existed only after hydration — absent from the HTML, from search engines, and
 * from any visit where the bundle failed.
 *
 * Now three cards are visible at a time on a track that auto-advances, and all
 * six are server-rendered and stay mounted for the life of the page. Without
 * JavaScript the track is simply a horizontally scrollable strip of six cards
 * rather than a single one.
 *
 * ## How this differs from the reference design it was measured against
 *
 * That design groups programmes into four families and lists them as bare
 * acronyms — PGDM (IEV), PGCCSRL, EDABS — inside a carousel, with the
 * programme names as inert text. Three changes:
 *
 *   • **No families.** They exist there because that campus has seventeen
 *     programmes; six do not need grouping before they can be read.
 *   • **Every programme says what it is.** An acronym is precise for someone
 *     who already knows it and meaningless to everyone else, and this section
 *     exists for everyone else. The code is kept, beside the category.
 *   • **Every card is a link.** In the reference the only clickable thing is
 *     the carousel chevron, so there is no route from a programme to its page.
 *
 * ## Provenance
 *
 * Every programme name and link comes from `config/navigation.ts` by way of the
 * content layer, so this section and the Academics menu cannot disagree about
 * what the campus offers. The descriptions are draft copy and the fact chips
 * restate level and format only; no regulatory or ranking claim appears here
 * without a source. `content/homepage.ts` carries the full note.
 *
 * ## Palette and background
 *
 * Plain white. The drafting grid that used to sit behind this section — and
 * behind Events and Insights — has been removed: four faint vertical rules are
 * texture when a section is mostly empty and interference once it is full of
 * cards and photographs. Every colour resolves to a token —
 * `--brand` for headings and the button, `--accent-surface` for the green as
 * decoration, `--accent-ink` wherever the green has to be legible as type. No
 * literal appears in this file or in the section's CSS.
 *
 * Everything except the track is a Server Component.
 */
export function AcademicsSection({ academics }: { academics: Academics }) {
  return (
    <section
      id="academics"
      aria-labelledby="academics-heading"
      /*
        The brand motif, top-right — see the "Brand motif" block in base.css.
        One attribute is the whole of it: the artwork is a `::before` on this
        element, so there is no wrapper to nest around the content and nothing
        for a screen reader to skip past.
      */
      data-motif="academics"
      className="academics-band relative isolate overflow-hidden py-16 md:py-20 lg:py-24"
    >
      <Container className="relative">
        {/* ---------------- header ---------------- */}
        {/*
          Heading left, the single action right, aligned on their **bottom**
          edges rather than their centres. The two are very different heights —
          a two-line display heading against a 44px pill — and centring them
          would leave the button floating in the middle of the heading's block
          with no line to relate to. On `items-end` it sits on the heading's
          last baseline, which is the line the eye finishes on.

          The intro paragraph that used to fill this column is gone, and the
          button has moved up from the foot of the section to take its place.
          The cards are the description now: four sentences explaining that the
          school offers a range of programmes, directly above six cards showing
          exactly which, was the page saying the same thing twice — once
          abstractly and once usefully.
        */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <div>
            <p className="section-eyebrow reveal">{academics.eyebrow}</p>

            <h2 id="academics-heading" className="section-heading reveal mt-5">
              {academics.heading}
            </h2>
          </div>

          {/*
            `.cta-split`, shared with the About, Events and News CTAs. The
            per-card "Learn more" is deliberately not this treatment: it is a
            label on a card that is already a link, so it stays quiet uppercase
            type rather than a second button competing with this one.

            `shrink-0` because the pill must not be squeezed narrower than its
            label when the heading beside it runs long at a middling width.
          */}
          {/*
            `self-start` matters only on a phone. Below `md` this row is a
            flex *column*, and a flex column stretches its items — so the pill
            was 342px wide holding 263px of content, with the label and its
            disc pushed left and a gap of empty border to the right. It read as
            a broken full-width bar rather than a button.
          */}
          <NextLink
            href={academics.action.href}
            className="cta-split reveal self-start md:shrink-0"
          >
            <span className="cta-split-label">{academics.action.label}</span>
            <span aria-hidden="true" className="cta-split-icon">
              <ArrowRightIcon size={18} className="cta-split-arrow" />
            </span>
          </NextLink>
        </div>

        {/* ---------------- the portfolio ---------------- */}
        {/*
          All six programmes, in one track, three visible at a time. Every card
          is server-rendered and stays mounted — see `academics-carousel.tsx`.
        */}
        <div className="reveal mt-10 md:mt-12">
          <AcademicsCarousel programmes={academics.programmes} />
        </div>
      </Container>
    </section>
  );
}
