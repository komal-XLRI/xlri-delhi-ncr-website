import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { routes } from '@/constants/routes';
import type { DirectorsDesk } from '@/types/directors-desk';

/** Running text, matching the justified body copy of the Jamshedpur pages. */
const PROSE = 'prose-justify space-y-5 text-base leading-[1.85] text-ink md:text-[1.0625rem]';

/**
 * Section headings inside the letter column.
 *
 * Deliberately not `.section-heading`: that is the homepage's display size, in
 * brand blue, and directly under an h1 of the same face and colour it read as a
 * second page title. Dark ink at roughly half the h1's size keeps the page to
 * one headline. `leading-none` puts the cap height flush with the top of the
 * portrait beside it, so the two columns start on the same line.
 */
const SECTION_HEADING =
  'font-serif text-2xl leading-none tracking-[-0.02em] text-ink-strong md:text-[1.75rem]';

/**
 * "From the Director's Desk".
 *
 * ## The model
 *
 * A straight port of the XLRI Jamshedpur pair — "About The Director" and
 * "Director's Message" (xlri.ac.in/about/…) — so the two campuses read as one
 * institution. Both of those pages share one layout, reproduced here: a large
 * title, then a 1 : 3 split with the portrait, name and designation pinned on
 * the left while plain justified text scrolls on the right. The portrait zooms
 * very slightly on hover, as it does there.
 *
 * Jamshedpur gives each its own route; we have a single entry in the
 * navigation, so they are two sections of one page, in the same order the
 * Jamshedpur menu lists them: the Director first, then the message.
 *
 * The only departure is structural: the hallmarks are bold lead-ins, as on the
 * source, but each sits in its own paragraph so the content stays data rather
 * than an HTML string.
 *
 * ## The sticky column
 *
 * Offset `13.5rem`, the same as the Vision panel on the homepage — clear of the
 * measured sticky header. Nothing above it may set `overflow: hidden`, which
 * would silently turn the sticky off; the hover zoom is clipped on the image
 * frame itself for that reason.
 *
 * A Server Component with no client JavaScript.
 */
export function DirectorsDeskPage({ content }: { content: DirectorsDesk }) {
  const { director, message, biography } = content;

  return (
    <article aria-labelledby="directors-desk-heading" className="bg-surface">
      <div className="mx-auto w-full max-w-[80rem] px-6 pt-10 pb-20 md:px-8 md:pt-14 md:pb-28 lg:px-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: routes.home },
            { label: 'About', href: routes.about.index },
            { label: content.title },
          ]}
        />

        <h1
          id="directors-desk-heading"
          className="mt-6 font-serif text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.05] tracking-[-0.035em] text-brand"
        >
          {content.title}
        </h1>

        <div className="mt-8 flex flex-col gap-10 md:mt-10 lg:flex-row lg:gap-12">
          {/* ---------------- portrait: the pinned quarter ---------------- */}
          <aside aria-label="The Director" className="lg:w-1/4 lg:shrink-0">
            <div className="lg:sticky lg:top-[13.5rem]">
              <figure className="group max-w-sm lg:max-w-none">
                <div className="overflow-hidden rounded-sm bg-surface-subtle">
                  <Image
                    src={director.portrait.src}
                    width={director.portrait.width}
                    height={director.portrait.height}
                    alt={director.portrait.alt}
                    // Above the fold on every viewport — the LCP element.
                    // `preload`, not `priority`: the latter is deprecated in Next 16.
                    preload
                    sizes="(min-width: 1280px) 296px, (min-width: 1024px) 22vw, 384px"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-5">
                  <span className="block font-serif text-xl text-ink-strong md:text-2xl">
                    {director.name}
                  </span>
                  <span className="mt-1 block text-ink-muted">{director.designation}</span>
                </figcaption>
              </figure>
            </div>
          </aside>

          {/* ---------------- text: the remaining three quarters ---------------- */}
          <div className="min-w-0 flex-1">
            <section aria-labelledby="about-director-heading">
              <h2 id="about-director-heading" className={SECTION_HEADING}>
                {biography.heading}
              </h2>
              <div className={`${PROSE} mt-6`}>
                {biography.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="director-message-heading"
              className="mt-14 border-t border-border pt-12 md:mt-16 md:pt-14"
            >
              <h2 id="director-message-heading" className={SECTION_HEADING}>
                {message.heading}
              </h2>
              <div className={`${PROSE} mt-6`}>
                {message.opening.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}

                {message.hallmarks.map((hallmark) => (
                  <p key={hallmark.id}>
                    <strong className="block font-semibold text-ink-strong">
                      {hallmark.title}
                      {hallmark.subtitle ? ` – ${hallmark.subtitle}` : null}
                    </strong>
                    {hallmark.body}
                  </p>
                ))}

                {message.closing.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}

                <p className="font-semibold text-ink-strong">{message.invitation}</p>

                <p className="pt-2 font-semibold text-ink-strong">
                  {message.signOff}
                  <br />
                  {director.name}
                  <br />
                  {director.designation}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
