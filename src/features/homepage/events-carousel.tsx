'use client';

import Image from 'next/image';
import NextLink from 'next/link';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';

import { ArrowRightIcon, PauseIcon, PlayIcon } from '@/components/ui/icon';
import type { EventItem } from '@/types/homepage';

/**
 * The events carousel.
 *
 * Four cards at desktop, two at tablet, one on a phone, on a track that scrolls
 * horizontally.
 *
 * ## Why this one scrolls instead of transforming
 *
 * The other carousels on this page translate a track by a step the stylesheet
 * defines per breakpoint. That works when every breakpoint shows the same number
 * of items. Here the count changes — 4, then 2, then 1 — so the last valid
 * position changes with it, and a transform-based track has to *know* the
 * viewport to avoid scrolling six cards into a four-card frame and leaving two
 * card-widths of white space at the end.
 *
 * Knowing the viewport means measuring it, and measuring it means JavaScript
 * that cannot run during server rendering. A native scroll container already
 * knows all of it: `scroll-snap` gives the stops, the scroll range clamps
 * itself, and the browser will not scroll past the final card no matter how
 * many fit. The breakpoint logic is then one `flex-basis` per media query and
 * nothing else.
 *
 * It is also better behaved than a transform for the things this section needs:
 * touch momentum is the platform's, a card scrolls into view by itself when
 * focused, and there is no hydration gap because the resting state is the
 * document's own scroll position.
 *
 * ## What is still JavaScript
 *
 *  • autoplay, which needs a timer
 *  • mouse drag, because a desktop pointer does not drag a scroll container
 *  • disabling the arrows at each end, which needs the scroll position
 *
 * ## Why the section header is rendered here
 *
 * The arrows belong in the header now, and they need `atStart` / `atEnd` and
 * the scroll handlers — state that only exists in this component. Rather than
 * lift the header into the client bundle, the heading and the intro arrive as
 * `ReactNode` props: a Server Component passing JSX to a Client Component
 * renders that JSX **on the server** and ships it in the RSC payload. So this
 * file decides where the header sits, and `events-section.tsx` still owns what
 * it says — the `h2` and the paragraph never become client components.
 *
 * ## Accessibility
 *
 * Each card's heading *is* its link, so the accessible name of every link is the
 * event title rather than "Read more" six times over (WCAG 2.4.4), and the
 * "Read more" line is decorative. The whole card is clickable through that same
 * anchor rather than a second nested one — which is also what makes the track
 * keyboard-operable without a `tabindex` of its own: tabbing walks six real
 * links and the browser scrolls each into view.
 */

/** 6s, per the brief. */
const ROTATION_MS = 3400;

/** Travel, in px, before a drag counts as a drag rather than a click. */
const DRAG_THRESHOLD = 10;

/** How long a step takes. */
const SLIDE_MS = 700;

/**
 * Ease-in-out cubic.
 *
 * `scroll-behavior: smooth` cannot be timed — the duration is the browser's and
 * runs nearer 300ms — so a 700ms step has to be animated by hand. This is the
 * curve for it: slow at both ends, quickest in the middle, which is what stops a
 * long step from starting and stopping abruptly.
 */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function EventsCarousel({
  items,
  heading,
  intro,
}: {
  items: readonly EventItem[];
  /** The eyebrow and `h2`, server-rendered. Placed in the left column. */
  heading: ReactNode;
  /** The lead paragraph, server-rendered. Placed above the arrows on the right. */
  intro: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [stopped, setStopped] = useState(false);
  const [paused, setPaused] = useState(false);
  /** Bumped by `nudge`, purely to restart the autoplay countdown. */
  const [restartKey, setRestartKey] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /** Pointer x and scrollLeft at drag start. */
  const dragOrigin = useRef<{ x: number; scroll: number } | null>(null);
  const dragged = useRef(false);

  /** Width of one card plus the gap — read from the DOM, never assumed. */
  const step = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild;
    if (!track || !(first instanceof HTMLElement)) return 0;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || '0') || 0;
    return first.offsetWidth + gap;
  }, []);

  const syncEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 1);
    // 1px of slack: fractional layout means scrollLeft rarely lands exactly.
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1);
  }, []);

  useEffect(() => {
    syncEdges();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', syncEdges, { passive: true });
    window.addEventListener('resize', syncEdges);
    return () => {
      track.removeEventListener('scroll', syncEdges);
      window.removeEventListener('resize', syncEdges);
    };
  }, [syncEdges]);

  /** Handle of the running step animation, so a new one can cancel it. */
  const tween = useRef<number | null>(null);

  /**
   * Animate the track to a scroll position over `SLIDE_MS`.
   *
   * Snapping is suspended for the duration. `scroll-snap-type: x mandatory`
   * re-snaps whenever scrolling settles, and it cannot tell a hand-written
   * frame from a finished gesture — left on, it fights the tween and lands the
   * track a few pixels off on every step.
   */
  const animateTo = useCallback((track: HTMLDivElement, target: number) => {
    if (tween.current !== null) cancelAnimationFrame(tween.current);

    const from = track.scrollLeft;
    const distance = target - from;
    if (distance === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      track.scrollLeft = target;
      return;
    }

    const snap = track.style.scrollSnapType;
    track.style.scrollSnapType = 'none';
    const started = performance.now();

    const frame = (now: number) => {
      const progress = Math.min((now - started) / SLIDE_MS, 1);
      track.scrollLeft = from + distance * easeInOutCubic(progress);
      if (progress < 1) {
        tween.current = requestAnimationFrame(frame);
        return;
      }
      tween.current = null;
      track.style.scrollSnapType = snap;
    };

    tween.current = requestAnimationFrame(frame);
  }, []);

  useEffect(
    () => () => {
      if (tween.current !== null) cancelAnimationFrame(tween.current);
    },
    [],
  );

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const distance = step();
      if (distance === 0) return;
      const limit = track.scrollWidth - track.clientWidth;
      animateTo(track, Math.max(0, Math.min(track.scrollLeft + direction * distance, limit)));
    },
    [step, animateTo],
  );

  /**
   * A deliberate move by the visitor, as opposed to one the timer made.
   *
   * Bumping `restartKey` tears the interval down and starts a fresh one, which
   * is the whole point: without it the autoplay kept its original schedule
   * through your click, so a timer that happened to be nearly elapsed fired
   * immediately afterwards. Click *next* near the end of the track and the
   * carousel would advance, then wrap back to the first card a fraction of a
   * second later — which does not read as "autoplay resumed", it reads as the
   * button not working.
   *
   * Every other carousel on this page already behaved this way. This one did
   * not, and it is the only one whose controls felt broken.
   */
  const nudge = useCallback(
    (direction: 1 | -1) => {
      scrollByCard(direction);
      setRestartKey((key) => key + 1);
    },
    [scrollByCard],
  );

  /* Autoplay: one card every 6s, back to the start once the end is reached. */
  useEffect(() => {
    if (stopped || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const finished = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      if (finished) animateTo(track, 0);
      else scrollByCard(1);
    }, ROTATION_MS);
    return () => {
      clearInterval(timer);
    };
    // `restartKey` is not read in the body — it is here so a manual move
    // restarts the countdown rather than inheriting whatever was left of it.
  }, [stopped, paused, scrollByCard, animateTo, restartKey]);

  function handleArrowKeys(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nudge(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      nudge(-1);
    }
  }

  /* ---- mouse drag. Touch is the platform's own and is left alone. ---- */
  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse') return;
    const track = trackRef.current;
    if (!track) return;
    dragOrigin.current = { x: event.clientX, scroll: track.scrollLeft };
    dragged.current = false;
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const origin = dragOrigin.current;
    const track = trackRef.current;
    if (!origin || !track) return;
    const travel = event.clientX - origin.x;
    if (Math.abs(travel) > DRAG_THRESHOLD) {
      dragged.current = true;
      setDragging(true);
    }
    track.scrollLeft = origin.scroll - travel;
  }

  function endDrag() {
    dragOrigin.current = null;
    setDragging(false);
  }

  /*
   * A drag that ends over a card would otherwise follow its link on release.
   * Swallowing that click in the capture phase is what keeps the two gestures
   * separable — every card here is a link, so without it the track would be
   * draggable nowhere at all.
   */
  function onClickCapture(event: ReactMouseEvent<HTMLDivElement>) {
    if (!dragged.current) return;
    event.preventDefault();
    event.stopPropagation();
    dragged.current = false;
  }

  if (items.length === 0) return null;

  return (
    <div
      onMouseEnter={() => {
        setPaused(true);
      }}
      onMouseLeave={() => {
        setPaused(false);
      }}
      onFocusCapture={() => {
        setPaused(true);
      }}
      onBlurCapture={() => {
        setPaused(false);
      }}
    >
      {/* ================= the header ================= */}
      {/*
        Two columns from `lg`: the label and heading at 40%, the paragraph and
        the arrows at 60%. Stacked below that, in source order — heading, then
        description, then controls — which is the order the brief asks for on a
        phone and also the order a keyboard walks.

        `items-center` aligns the columns on their shared centre rather than
        their tops. The two are very different heights, and top-aligning a
        two-line heading against a paragraph plus a row of 48px buttons hangs
        the heading off the top of a much taller block.
      */}
      <div className="mb-10 grid gap-8 md:mb-12 lg:grid-cols-[2fr_3fr] lg:items-center lg:gap-16">
        <div>{heading}</div>

        <div className="lg:max-w-[30rem] lg:justify-self-end">
          {intro}

          {/*
            The arrows sit after the description in the DOM as well as beneath
            it on screen, so tabbing reaches them before the six cards rather
            than after them.
          */}
          <div className="mt-6 flex items-center justify-start gap-3 lg:justify-end">
            {/*
          `data-dir` is what lets each arrow slide the right way on hover: the
          back arrow's glyph is rotated, so a shared rule would move both of
          them forwards. See `.events-control-arrow`.
        */}
            <button
              type="button"
              onClick={() => {
                nudge(-1);
              }}
              onKeyDown={handleArrowKeys}
              disabled={atStart}
              data-dir="prev"
              className="carousel-control"
            >
              <ArrowRightIcon
                size={18}
                aria-hidden="true"
                className="carousel-control-arrow rotate-180"
              />
              <span className="sr-only">Previous events</span>
            </button>

            <button
              type="button"
              onClick={() => {
                nudge(1);
              }}
              onKeyDown={handleArrowKeys}
              disabled={atEnd}
              data-dir="next"
              className="carousel-control"
            >
              <ArrowRightIcon size={18} aria-hidden="true" className="carousel-control-arrow" />
              <span className="sr-only">Next events</span>
            </button>

            {/*
          WCAG 2.2.2. Hidden until focused — hover-pause is not a mechanism a
          keyboard-only user can invoke.
        */}
            <button
              type="button"
              onClick={() => {
                setStopped((value) => !value);
              }}
              aria-pressed={stopped}
              className="sr-only shrink-0 focus-visible:not-sr-only focus-visible:inline-flex focus-visible:h-11 focus-visible:items-center focus-visible:gap-2 focus-visible:rounded-full focus-visible:border focus-visible:border-border-strong focus-visible:px-4 focus-visible:text-2xs focus-visible:text-ink"
            >
              {stopped ? <PlayIcon size={13} /> : <PauseIcon size={13} />}
              {stopped ? 'Resume rotation' : 'Pause rotation'}
            </button>
          </div>
        </div>
      </div>

      {/* ================= the track ================= */}
      <div
        ref={trackRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Latest events"
        /*
         * No `tabindex` here, deliberately.
         *
         * A scrollable region must be keyboard-operable, and the usual fix is to
         * make the container itself focusable. That is only necessary when the
         * region has no focusable content of its own — every card here contains
         * a link, so tabbing already walks the whole track and the browser
         * scrolls each card into view as it goes. Adding a tab stop would put an
         * extra, silent stop in front of six real ones.
         */
        data-dragging={dragging ? 'true' : 'false'}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="events-track flex gap-8 overflow-x-auto pb-2"
      >
        {items.map((item) => {
          /*
            The source prints dates as "08 Apr" — two tokens. Split so the day
            and month can stack in the badge, which is what makes a date
            scannable at a glance rather than read.

            Guarded rather than assumed: if a label ever arrives in another
            shape, `parts.length !== 2` and it renders on one line instead of
            silently losing half of itself. Parsing a display string is only
            safe when the failure mode is "looks slightly different".
          */
          const parts = item.dateLabel?.trim().split(/\s+/) ?? [];
          const stacked = parts.length === 2;

          return (
            <article key={item.id} className="events-card group relative flex flex-col">
              {/* ---- banner ---- */}
              <div className="events-media relative overflow-hidden">
                <Image
                  src={item.image.src}
                  /*
                   * Empty on purpose. The title sits directly beneath the banner
                   * and is itself the link, so describing the poster would
                   * announce the same event twice.
                   */
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  sizes="(min-width: 1024px) 24vw, (min-width: 768px) 44vw, 84vw"
                  loading="lazy"
                  className="events-image h-full w-full object-cover"
                />

                {/*
                  The date, on the poster rather than under it.

                  These banners are dense event posters cropped to 4:3, so their
                  lower edge is usually the least informative part of the image —
                  which makes it the right place to put something, and it buys
                  the body back a whole line. A solid block rather than text over
                  a scrim: the posters run from near-black to bright yellow, and
                  no scrim survives both.
                */}
                {item.dateLabel ? (
                  <time
                    // The visible label is what the institution printed; the
                    // machine-readable year is inferred. See the content note.
                    dateTime={item.dateTime}
                    className="events-datechip"
                  >
                    {stacked ? (
                      <>
                        <span className="events-datechip-day">{parts[0]}</span>
                        <span className="events-datechip-month">{parts[1]}</span>
                      </>
                    ) : (
                      item.dateLabel
                    )}
                  </time>
                ) : null}
              </div>

              {/* ---- body ---- */}
              <div className="flex flex-1 flex-col p-6">
                {/*
                Resting in `ink-strong`, not `brand`.

                "Title changes to XLRI Blue on hover" only reads as a change if
                the title is not already blue — it was, so the hover was a
                no-op. Dark ink at rest turning brand blue on hover is the
                interaction that was actually being asked for, and it also lets
                the date's green be the only colour in the card at rest.
              */}
                <h3 className="events-title font-serif text-lg leading-snug font-semibold tracking-[-0.015em] text-ink-strong">
                  {/*
                    The heading is the link, so the link's accessible name is
                    the event title. `.events-link::after` covers the whole
                    card, which is what makes the card clickable without nesting
                    a second anchor inside it — including this footer, so "the
                    entire footer area is clickable" comes for free rather than
                    needing a second overlay.
                  */}
                  <NextLink href={item.href} className="events-link">
                    {item.title}
                  </NextLink>
                </h3>

                {/* Decorative: it repeats the link above it. */}
                <span
                  aria-hidden="true"
                  className="events-more mt-auto flex items-center gap-2 pt-5 text-2xs font-semibold tracking-[0.16em] text-ink-muted uppercase"
                >
                  <span className="events-more-label">Read more</span>
                  <ArrowRightIcon size={14} className="events-arrow" />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
