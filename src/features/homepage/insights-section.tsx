import { Container } from '@/components/layout/container';
import { TestimonialShowcase } from '@/features/homepage/testimonial-showcase';
import type { Insights } from '@/types/homepage';

/**
 * Student testimonials.
 *
 * ## What this used to be
 *
 * Two carousels side by side on one white band: the school's own blog posts on
 * the left, students' words on the right. They sat together because they
 * answered the same question from opposite directions — the first in the
 * institution's voice, the second not.
 *
 * The blogs have been removed, and the section is the testimonials alone. The
 * heading is a real `h2` now rather than a visually hidden one: it used to be
 * hidden because the band held two subjects and neither `h3` could name the
 * whole of it. With one subject left, the section can simply say what it is.
 *
 * ## Layout
 *
 * A portrait on the left and the words on the right — see
 * `testimonial-showcase.tsx` for why this section is deliberately built unlike
 * every other one on the page. The portrait column caps at 22rem, which leaves
 * the quote a measure it can be read at rather than the full 1,184px, where a
 * line would run past 120 characters.
 *
 * ## The ground
 *
 * White, with one very soft green wash. It was briefly the deepest brand blue;
 * that was the wrong instinct on a page otherwise white and airy, and the dark
 * block read as weight rather than emphasis.
 *
 * One knock-on remains: the accent green seed is a legal state indicator on a
 * deep field (6.45:1) and is not on white (1.74:1), so every indicator here —
 * the active dot, the focus rings, the arrow icons — uses `--accent-ink`, the
 * same green at 5.83:1.
 *
 * ## Provenance
 *
 * Fetched from xlridelhi.ac.in on 28 July 2026 — quotes unedited, and one
 * student deliberately without a photograph because the source has none. The
 * full note is in `content/homepage.ts` and is worth reading before correcting
 * anything here that looks like a mistake.
 */
export function InsightsSection({ insights }: { insights: Insights }) {
  const { testimonials } = insights;

  return (
    <section
      aria-labelledby="insights-heading"
      /* The brand motif, top-left and mostly outside the measure — the left
         gutter beside the portrait column is the emptiest ground on the page.
         See the "Brand motif" block in base.css. */
      data-motif="insights"
      className="insights-band relative isolate overflow-hidden py-10 md:py-12"
    >
      <Container className="relative">
        <div className="reveal">
          <TestimonialShowcase
            items={testimonials.items}
            heading={
              <>
                <p className="section-eyebrow">{testimonials.eyebrow}</p>
                {/*
                  An `h2`, not the `h3` it was. It was a level three because the
                  band carried a hidden `h2` naming both halves; with the blogs
                  gone that wrapper heading is this one, and leaving an `h3`
                  under no `h2` is the outline damage that only shows up in a
                  screen reader's heading list.
                */}
                <h2 id="insights-heading" className="section-heading mt-4">
                  {testimonials.heading}
                </h2>
              </>
            }
          />
        </div>
      </Container>
    </section>
  );
}
