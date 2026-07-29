import Image from 'next/image';
import NextLink from 'next/link';

import { Container } from '@/components/layout/container';
import { getAccreditationMark } from '@/config/brand';
import type { Accreditations } from '@/types/homepage';

/**
 * Global accreditations.
 *
 * It sits between the institutional story and the news feed on purpose. About
 * is the school describing itself; this is where somebody else vouches for it,
 * and an endorsement lands harder after the claim than before it.
 *
 * ## Why this stopped being a carousel
 *
 * Three previous passes cut this section from ~1,170px to 590px by tightening
 * padding, type and card interiors. That approach had run out: what was left
 * was a *carousel* — a viewport, a sliding track, three bordered cards, a
 * progress rule and two 44px arrow buttons — and a carousel has a floor no
 * amount of tightening gets under.
 *
 * It also never earned its complexity. At `lg` all three cards were visible at
 * once and the track's slide distance was, by its own documentation, zero — so
 * the controls changed which card was *highlighted* and nothing else. That is a
 * 451-line client component, framer-motion, a timer, drag handling, keyboard
 * handling and a pause control, to tint one of three cards a visitor could
 * already see.
 *
 * So the marks are simply laid out. Three accreditations is not a set that
 * needs paging — it is a set that needs a row.
 *
 * ## The composition
 *
 * Heading and sentence on the left, the three marks across the right, on one
 * line at `lg`. Turning the header from a centred block into a left-hand column
 * is most of the saving: centred, it owned a full-width band of its own and
 * everything else had to begin below it. Beside the marks it costs no vertical
 * space at all, because the marks are taller than it is.
 *
 * ## What went, and what did not
 *
 * The name under each logo went — the logo *is* the name, and setting "AACSB"
 * in the body typeface beneath a mark that reads AACSB is the kind of
 * redundancy that only survives because nobody says it out loud. The full name
 * moved into the image's `alt`, so it still reaches a screen reader.
 *
 * The one-line definition stayed. It is the only thing here a visitor cannot
 * get from the marks themselves, and the argument for holding all three is
 * precisely that each body assesses something different.
 *
 * ## Zero JavaScript
 *
 * All of this is a Server Component now. The section previously shipped the
 * largest client bundle on the page.
 */
export function AccreditationsSection({ accreditations }: { accreditations: Accreditations }) {
  return (
    <section
      aria-labelledby="accreditations-heading"
      className="accreditation-band relative isolate border-y border-border py-10 md:py-12"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ---------------- header ---------------- */}
          <div className="reveal lg:col-span-4">
            <h2 id="accreditations-heading" className="section-heading">
              {accreditations.heading}
            </h2>
            <span aria-hidden="true" className="mt-4 mb-4 block h-[3px] w-10 bg-accent-surface" />
            <p className="prose-justify max-w-[26rem] text-sm leading-relaxed text-ink-muted">
              {accreditations.intro}
            </p>
          </div>

          {/* ---------------- the marks ---------------- */}
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:col-span-8">
            {accreditations.items.map((item, index) => {
              const mark = getAccreditationMark(item.markId);
              if (!mark) return null;

              /*
                Display dimensions, derived from the artwork's own aspect ratio.
                Passing the intrinsic size and then sizing in CSS is what makes
                a logo render at 1x on a 2x display — next/image builds its
                srcset from the `width` prop, so it must be the width the mark
                is actually drawn at.
              */
              const displayWidth = Math.round((mark.width / mark.height) * mark.displayHeight);

              const body = (
                <>
                  {/*
                    A fixed-height box, so the three captions sit on one line.
                    EQUIS is a stacked lockup and is deliberately set taller than
                    the other two (see `config/brand.ts`); without a shared box
                    its extra height would push its caption out of alignment.
                  */}
                  <span className="flex h-14 items-center">
                    <Image
                      src={mark.src}
                      alt={`${mark.name} — ${mark.fullName}`}
                      width={displayWidth}
                      height={mark.displayHeight}
                      style={{ height: `${String(mark.displayHeight)}px`, width: 'auto' }}
                      className="max-w-full object-contain"
                    />
                  </span>

                  <span className="mt-3 block text-sm leading-snug text-balance text-ink-muted transition-colors duration-300 group-hover:text-ink">
                    {item.description}
                  </span>
                </>
              );

              return (
                <li
                  key={item.id}
                  className="reveal"
                  style={{ ['--reveal-start' as string]: `${String(4 + index * 3)}%` }}
                >
                  {item.action ? (
                    /*
                      The whole cell is the link, rather than a "Learn more"
                      beneath it. Three call-to-action labels in a band this
                      short is three times the clutter for one destination, and
                      the cell is a far larger target than the words would be.
                    */
                    <NextLink
                      href={item.action.href}
                      className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                    >
                      {body}
                    </NextLink>
                  ) : (
                    <div className="group">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
