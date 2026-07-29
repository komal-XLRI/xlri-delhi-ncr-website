'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState, type ReactNode } from 'react';

import { PauseIcon, PlayIcon } from '@/components/ui/icon';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import type { Testimonial } from '@/types/homepage';

/**
 * Student testimonials.
 *
 * ## Why this looks unlike the rest of the page
 *
 * Everything above it is cards on white: programmes, events, news, all the same
 * rectangle at a different size. That consistency is right for content you
 * *scan*, and wrong here — a testimonial is one person's sentence, and four of
 * them in a row of cards is a wall of strangers nobody reads.
 *
 * So this is the one section built around a sentence. The quote is set at
 * display scale and centred, with the student as a byline beneath it and a rail
 * of the others below that.
 *
 * ## Why the big portrait went
 *
 * It was a 352x469 frame on the left. Two things were wrong with it. The
 * photographs are not portraits — they are snapshots, one of them a full-length
 * shot of a student standing in a lobby — and enlarging a weak asset to 469px
 * makes it the biggest thing in the section. And it inverted the point: a
 * testimonial's content is the sentence, and the person is the credential that
 * makes it worth reading. The layout said the opposite.
 *
 * Faces are still here, at 44px in the byline and the rail, which is the size a
 * credential wants to be.
 *
 * ## The rail is the navigation
 *
 * There are no arrows and no dots. The other students' faces *are* the
 * controls, which is the only navigation on the page where the control shows
 * you what you are about to get. Each is a real `<button>` with the student's
 * name as its accessible label.
 *
 * The active one carries a **countdown ring** rather than the draining bar used
 * everywhere else — a circular progress on a circular avatar, which is both the
 * right shape for the object and the visual signature that keeps this section
 * from reading as another carousel.
 *
 * ## The ring's colour is not the brand green
 *
 * `--accent-surface` measures 1.74:1 on white. WCAG 1.4.11 asks 3:1 of any
 * graphic that carries meaning, and this ring carries *which student you are
 * reading* — so it uses `--accent-ink`, the same green darkened to 5.83:1.
 * The seed green appears only where it is decoration.
 *
 * ## Motion
 *
 * The same contract as everything else: advances on its own, pauses on hover
 * and focus-within, **restarts** rather than stops when a face is chosen,
 * disabled entirely under `prefers-reduced-motion`, and a focus-reachable
 * control ends it for good (WCAG 2.2.2).
 *
 * Every student stays mounted; the portraits crossfade and the quotes are
 * swapped by opacity, so all four quotes are in the HTML and none of this
 * depends on JavaScript to exist.
 */

const ROTATION_MS = 3800;

/** Matches `r` on the ring circle below. Circumference = 2πr. */
const RING_RADIUS = 26;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/** "Ankita Kumari" → "AK". Used where the source publishes no portrait. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export function TestimonialShowcase({
  items,
  heading,
}: {
  items: readonly Testimonial[];
  /** Eyebrow and `h2`, server-rendered and passed in. */
  heading: ReactNode;
}) {
  const [index, setIndex] = useState(0);
  /** Set only by the explicit control. Never cleared automatically. */
  const [stopped, setStopped] = useState(false);
  const [paused, setPaused] = useState(false);
  /** Bumped on manual selection purely to restart the interval. */
  const [restartKey, setRestartKey] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const count = items.length;
  const rotating = !stopped && !paused && !reducedMotion && count > 1;

  useEffect(() => {
    if (!rotating) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, ROTATION_MS);
    return () => {
      clearInterval(timer);
    };
  }, [rotating, count, restartKey]);

  const select = useCallback((next: number) => {
    setIndex(next);
    setRestartKey((key) => key + 1);
  }, []);

  const active = items[index];
  if (!active) return null;

  /*
    A JSX *value*, not a component.

    Declaring `const Rail = () => (...)` here reads the same but creates a new
    component type on every render, so React unmounts and remounts the whole
    subtree each time — which would restart the countdown ring on every state
    change, including the one that advances the rotation. The lint rule that
    flags this earned its keep.
  */
  const rail = (
    <>
      {/* ================= the rail ================= */}
      <div className="mt-7 flex items-center gap-4">
        <ul className="flex items-center gap-3">
          {items.map((item, itemIndex) => {
            const isActive = itemIndex === index;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    select(itemIndex);
                  }}
                  aria-current={isActive ? 'true' : undefined}
                  className="testimonial-avatar group"
                  data-active={isActive ? 'true' : 'false'}
                >
                  {item.photo ? (
                    <Image
                      src={item.photo.src}
                      alt=""
                      fill
                      sizes="64px"
                      className="testimonial-avatar-image"
                    />
                  ) : (
                    <span className="testimonial-initials">{initials(item.name)}</span>
                  )}

                  {/*
                      The countdown ring. `pathLength` is not set — the dash
                      values are the real circumference, computed from the same
                      radius the circle uses, so the two can never drift.
                    */}
                  {isActive ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 60 60"
                      className="testimonial-ring"
                      // Re-keyed each step so the countdown restarts.
                      key={`${String(index)}-${rotating ? 'run' : 'hold'}`}
                    >
                      <circle
                        cx="30"
                        cy="30"
                        r={RING_RADIUS}
                        className={rotating ? 'testimonial-ring-track' : undefined}
                        style={{
                          ['--ring' as string]: String(RING_CIRCUMFERENCE),
                          ['--ring-duration' as string]: `${String(ROTATION_MS)}ms`,
                        }}
                      />
                    </svg>
                  ) : null}

                  <span className="sr-only">Read what {item.name} says</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/*
            WCAG 2.2.2. Visually hidden until focused — choosing a face restarts
            the rotation rather than ending it, so this is the only control that
            stops it for good.
          */}
        {count > 1 ? (
          <button
            type="button"
            onClick={() => {
              setStopped((value) => !value);
            }}
            aria-pressed={stopped}
            className="sr-only focus-visible:not-sr-only focus-visible:inline-flex focus-visible:h-9 focus-visible:items-center focus-visible:gap-2 focus-visible:rounded-full focus-visible:border focus-visible:border-border-strong focus-visible:px-3 focus-visible:text-2xs focus-visible:text-ink"
          >
            {stopped ? <PlayIcon size={13} /> : <PauseIcon size={13} />}
            {stopped ? 'Resume' : 'Pause'}
          </button>
        ) : null}
      </div>
    </>
  );

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Student testimonials"
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
      className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:items-center md:gap-14"
    >
      {/* ================= label and rail ================= */}
      {/*
        The heading and the navigation share the left column, and that is the
        whole of the height saving. Stacked, this section spent its vertical
        budget three times over — a heading row, then a quote, then a rail
        underneath it. Side by side, the section is only as tall as the taller
        of two columns, and the quote is the taller one, so the heading and the
        four faces are effectively free.
      */}
      <div>
        {heading}
        {rail}
      </div>

      {/* ================= the quote ================= */}
      <div>
        {/*
          All four quotes stay in the DOM and are swapped by opacity, stacked in
          one grid cell so the block's height is the tallest of them. A slot
          that resized on every step would shunt the rail up and down under the
          cursor — and the rail is the navigation.
        */}
        <div className="testimonial-stack">
          {items.map((item, itemIndex) => (
            <figure
              key={item.id}
              data-active={itemIndex === index ? 'true' : 'false'}
              aria-hidden={itemIndex !== index}
              className="testimonial-quote"
            >
              {/*
                28px across a 60rem measure — three lines for the longest quote.
                It has come down twice: 40px gave six lines and a 388px wall of
                display serif, 32px gave four. The stack is sized to the tallest
                quote so that nothing below it moves, which means every line the
                longest quote saves is a line off the whole section.
              */}
              <blockquote className="testimonial-body font-serif text-[clamp(1.125rem,1.7vw,1.5rem)] leading-[1.4] tracking-[-0.01em] text-pretty text-ink-strong">
                {item.quote}
                {/* The source truncates this one mid-sentence; the ellipsis is
                    theirs, not ours. */}
                {item.truncated ? '…' : null}
              </blockquote>

              {/*
                No face here. The rail directly beneath shows the active
                student in colour while the others are desaturated, so a second
                portrait of the same person one row above it was the same
                information twice — and it cost a 44px row.
              */}
              <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-serif text-lg leading-tight text-brand">{item.name}</span>
                {item.programme ? (
                  <span className="text-2xs tracking-[0.16em] text-ink-muted uppercase">
                    {item.programme}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
