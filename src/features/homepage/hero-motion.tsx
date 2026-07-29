'use client';

import NextLink from 'next/link';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

import { ArrowRightIcon, PauseIcon, PlayIcon } from '@/components/ui/icon';
import type { HeroSpotlightItem, HeroVideoSource } from '@/types/homepage';

/**
 * The moving parts of the hero: background video, and the rotating spotlight
 * card beside the headline.
 *
 * Both live in one component so a single control can stop all of it. Two
 * separate pause buttons in one hero would be clutter, and — more to the point —
 * a visitor who wants the motion to stop wants *the motion* to stop, not one of
 * the two things that are moving.
 *
 * The headline column arrives as `children`, server-rendered. It is the largest
 * text on the site and has no business being in a client bundle.
 *
 * ## How this differs from the reference design
 *
 * The design being matched rotates whole slides: each step swaps the background
 * photograph, the headline, and the card together. Four slides means four large
 * images fetched and decoded, and the hero is the LCP element.
 *
 * Here only the **card** rotates. The background media loads once, the headline
 * never moves, and a step costs a few hundred bytes of text already in memory.
 * Same feel, none of the weight — and the `h1` stays a single stable sentence,
 * which matters for search and for anyone navigating by heading.
 *
 * ## Accessibility
 *
 * Built to the APG carousel pattern rather than approximated:
 *
 *   • the region is `aria-roledescription="carousel"` with a label
 *   • each slide is `aria-roledescription="slide"` labelled "n of N"
 *   • only the active slide is in the accessibility tree; the rest are `hidden`
 *   • `aria-live` is `off` while rotating and `polite` once stopped, so a screen
 *     reader is not interrupted by automatic changes but *is* told about ones
 *     the user asked for
 *   • rotation pauses on hover and on focus-within, so it cannot move while
 *     being read or while a link inside it is being reached
 *   • WCAG 2.2.2: an explicit control stops the rotation and the video together
 *   • `prefers-reduced-motion` disables auto-rotation entirely — the card
 *     becomes a manual prev/next, and the video never loads
 */

const ROTATION_MS = 3200;

export function HeroMotion({
  video,
  spotlight,
  children,
}: {
  video?: HeroVideoSource | undefined;
  spotlight?: readonly HeroSpotlightItem[] | undefined;
  children: ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const count = spotlight?.length ?? 0;

  /* ---------------- video ---------------- */
  useEffect(() => {
    const element = videoRef.current;
    if (!element || !video) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(reduced.matches);

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (reduced.matches || connection?.saveData === true) return;

    // Nothing has been fetched yet — `preload="none"` held the sources back.
    element.load();
    void element.play().then(
      () => {
        setVideoReady(true);
      },
      () => {
        // Autoplay refused. The poster is already painted, so there is nothing
        // to recover from.
      },
    );

    const onChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
      if (event.matches) element.pause();
    };
    reduced.addEventListener('change', onChange);
    return () => {
      reduced.removeEventListener('change', onChange);
    };
  }, [video]);

  /* ---------------- rotation ---------------- */
  const advance = useCallback(
    (delta: number) => {
      if (count === 0) return;
      setIndex((current) => (current + delta + count) % count);
    },
    [count],
  );

  /**
   * Any deliberate move stops the rotation for the rest of the visit.
   *
   * Someone who reaches for the arrows has decided to read at their own pace;
   * snatching the card away four seconds later is the single most irritating
   * thing an auto-carousel does. This also means the arrows and dots are
   * themselves a mechanism for stopping the motion, which is what WCAG 2.2.2
   * asks for.
   */
  const goTo = useCallback((next: number) => {
    setRunning(false);
    setIndex(next);
  }, []);

  const rotating = running && !hovered && !reducedMotion && count > 1;

  useEffect(() => {
    if (!rotating) return;
    const timer = setInterval(() => {
      advance(1);
    }, ROTATION_MS);
    return () => {
      clearInterval(timer);
    };
  }, [rotating, advance]);

  /** One control for every moving thing in the hero. */
  function toggleMotion() {
    const next = !running;
    setRunning(next);
    const element = videoRef.current;
    if (element && videoReady) {
      if (next) void element.play();
      else element.pause();
    }
  }

  const active = spotlight?.[index];

  return (
    <>
      {video ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          data-visible={videoReady ? 'true' : 'false'}
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-0 transition-opacity duration-1000 data-[visible=true]:opacity-100"
        >
          {video.webm ? <source src={video.webm} type="video/webm" /> : null}
          {video.mp4 ? <source src={video.mp4} type="video/mp4" /> : null}
        </video>
      ) : null}

      <div className="hero-scrim absolute inset-0 -z-10" />

      <div className="mx-auto grid w-full max-w-[80rem] grid-cols-1 items-center gap-12 px-6 pt-20 pb-16 md:px-8 md:pt-28 md:pb-20 lg:min-h-[40rem] lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pt-32 lg:pb-24">
        <div className="lg:col-span-7">{children}</div>

        {active && spotlight ? (
          <div className="lg:col-span-5">
            <section
              aria-roledescription="carousel"
              aria-label="Highlights"
              onMouseEnter={() => {
                setHovered(true);
              }}
              onMouseLeave={() => {
                setHovered(false);
              }}
              onFocusCapture={() => {
                setHovered(true);
              }}
              onBlurCapture={() => {
                setHovered(false);
              }}
              className="glass-card rounded-md p-7 shadow-raised md:p-9 md:backdrop-blur-xl md:backdrop-saturate-150"
            >
              <div aria-live={rotating ? 'off' : 'polite'} aria-atomic="true">
                {spotlight.map((item, itemIndex) => (
                  <div
                    key={item.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${itemIndex + 1} of ${spotlight.length}`}
                    hidden={itemIndex !== index}
                    data-spotlight-slide=""
                    data-active={itemIndex === index ? 'true' : 'false'}
                  >
                    <p className="text-2xs font-semibold tracking-[0.18em] text-accent-surface uppercase">
                      {item.eyebrow}
                    </p>
                    <h2 className="mt-4 font-serif text-[1.7rem] leading-[1.2] text-balance text-white">
                      {item.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-white/75">{item.excerpt}</p>
                    {/*
                      Three things changed here.

                      **The arrow is an icon, not a text glyph.** A text arrow
                      renders from whatever font the platform happens to
                      resolve, so its weight, size and baseline shift between
                      macOS, Windows and Android — the exact failure
                      `components/ui/icon.tsx` was written to end. Replacing it
                      here turned up two more in the same card: the prev and
                      next buttons below were still drawing their arrows as
                      literal characters. Those are icons now too.

                      **The link says what it opens.** "Read more" appears on
                      all four slides, so a screen-reader user listing the links
                      heard it four times with no way to tell them apart (WCAG
                      2.4.4). The title is appended out of sight, giving each
                      link a distinct accessible name.

                      **It is a control, not a sentence.** The card's own arrows
                      are hairline-bordered discs; this now matches them —
                      bordered pill, fills on hover, arrow slides. The accent
                      underline it used to carry was a static rule that never
                      responded to anything.
                    */}
                    <NextLink
                      href={item.href}
                      className="group/link mt-7 inline-flex items-center gap-2.5 rounded-full border border-white/30 py-2 pr-4 pl-5 text-sm font-medium text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
                    >
                      Read more
                      <span className="sr-only"> about {item.title}</span>
                      <ArrowRightIcon
                        size={16}
                        aria-hidden="true"
                        className="text-accent-surface transition-transform duration-200 group-hover/link:translate-x-1"
                      />
                    </NextLink>
                  </div>
                ))}
              </div>

              {/* ---------------- controls ---------------- */}
              <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    goTo((index - 1 + spotlight.length) % spotlight.length);
                  }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white/80 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
                >
                  <ArrowRightIcon size={16} aria-hidden="true" className="rotate-180" />
                  <span className="sr-only">Previous highlight</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    goTo((index + 1) % spotlight.length);
                  }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white/80 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
                >
                  <ArrowRightIcon size={16} aria-hidden="true" />
                  <span className="sr-only">Next highlight</span>
                </button>

                {/*
                  The pause control, kept out of the visual design but not
                  removed.

                  WCAG 2.2.2 requires a mechanism to stop content that moves
                  automatically for more than five seconds, and this one governs
                  the rotation *and* the background video. Deleting it outright
                  would leave a keyboard or screen-reader user with no way to
                  stop either.

                  So it is visually hidden until focused — the same technique as
                  the skip link. Sighted mouse users never see it; anyone
                  tabbing through reaches it immediately, and it becomes fully
                  visible when it does. The arrows and dots stop the rotation
                  too, so in practice most people never need it.
                */}
                <button
                  type="button"
                  onClick={toggleMotion}
                  aria-pressed={!running}
                  className="sr-only focus-visible:not-sr-only focus-visible:ml-1 focus-visible:inline-flex focus-visible:h-9 focus-visible:w-auto focus-visible:items-center focus-visible:gap-2 focus-visible:rounded-full focus-visible:border focus-visible:border-white focus-visible:bg-brand-950 focus-visible:px-3 focus-visible:text-2xs focus-visible:text-white"
                >
                  {running ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
                  {running ? 'Pause motion' : 'Resume motion'}
                </button>

                <span className="ml-auto text-2xs text-white/60 tabular-nums">
                  <span className="sr-only">Highlight </span>
                  {index + 1} / {spotlight.length}
                </span>
              </div>

              {/*
                Progress track. Each segment is a jump target; the active one
                drains over the rotation interval so the reader can see the next
                change coming rather than being surprised by it. Once rotation
                stops the active segment simply stays full.
              */}
              <div className="mt-4 flex gap-1.5">
                {spotlight.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      goTo(itemIndex);
                    }}
                    aria-current={itemIndex === index ? 'true' : undefined}
                    className="track-segment group flex-1"
                  >
                    <span className="track-segment-bar bg-white/20 transition-colors group-hover:bg-white/40">
                      {itemIndex < index ? (
                        <span aria-hidden="true" className="absolute inset-0 bg-white/40" />
                      ) : null}
                      {itemIndex === index ? (
                        <span
                          aria-hidden="true"
                          // Re-keyed on each step so the drain restarts.
                          key={`${index}-${rotating ? 'run' : 'hold'}`}
                          className={
                            rotating
                              ? 'spotlight-progress absolute inset-0 bg-accent-surface'
                              : 'absolute inset-0 bg-accent-surface'
                          }
                          style={{ ['--spotlight-duration' as string]: `${ROTATION_MS}ms` }}
                        />
                      ) : null}
                    </span>
                    <span className="sr-only">
                      Go to highlight {itemIndex + 1}: {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </>
  );
}
