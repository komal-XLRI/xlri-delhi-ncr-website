'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { PauseIcon, PlayIcon } from '@/components/ui/icon';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import type { AboutImage } from '@/types/homepage';

/**
 * The About gallery.
 *
 * ## What this replaced, and why
 *
 * The first version stacked three devices on one photograph: an offset accent
 * frame behind it, a second image overlapping its lower-left corner, and
 * progress bars laid across its foot. Each was defensible alone; together they
 * fought. The overlap cropped the main image at exactly the point the eye enters
 * it, the bars sat on top of the photograph they were describing, and the only
 * way to reach another image was to guess that the small square was a button.
 *
 * This is the plain version: one picture, a row of thumbnails beneath it, a
 * caption. Nothing overlaps anything. What you can do is visible rather than
 * discovered, and the photographs — which are the point — are unobstructed.
 *
 * ## The craft is in the thumbnails
 *
 * Inactive frames are desaturated and dimmed; the active one is full colour with
 * an accent rule beneath it that drains over the rotation interval. That rule is
 * the same gesture as the hero spotlight's progress track, so the two galleries
 * on the page read as one system — and it means the rotation announces itself
 * rather than surprising you.
 *
 * ## Behaviour
 *
 * - Crossfade, not slide: sliding a photograph sideways pulls the eye off the
 *   text beside it.
 * - Pauses on hover and focus; resumes on leaving.
 * - Choosing a thumbnail **restarts** the interval rather than ending it, so
 *   that frame gets a full turn and the gallery keeps going.
 * - An explicit pause control satisfies WCAG 2.2.2, visually hidden until
 *   focused.
 * - `prefers-reduced-motion` disables auto-advance entirely.
 *
 * ## Why the slides mount lazily
 *
 * A crossfade needs both frames in the DOM, so the naive version mounts every
 * slide up front — and because they all sit inside the viewport together, the
 * browser fetches all of them the moment the section scrolls into view. At six
 * photographs that is most of a megabyte for a decorative gallery, below the
 * fold, most of which a visitor scrolling past never sees.
 *
 * So a slide mounts the first time it is reached and stays mounted afterwards.
 * The outgoing frame is by definition already mounted, so the crossfade is
 * unaffected; the cost simply arrives one image at a time, at rotation pace,
 * and stops arriving when the visitor moves on. The thumbnails still render
 * every image, but they are ~72 px wide and cost almost nothing.
 */

const ROTATION_MS = 2400;

/**
 * Thumbnail columns per image count.
 *
 * Written out as literal strings because Tailwind scans source text — a
 * template like `grid-cols-${count}` produces no CSS at all. Below `sm` the
 * gallery spans the full width and three columns keep the frames tappable;
 * above it they fit on one row.
 */
const THUMB_COLUMNS: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
  5: 'grid-cols-3 sm:grid-cols-5',
  6: 'grid-cols-3 sm:grid-cols-6',
};

export function AboutGallery({ images }: { images: readonly AboutImage[] }) {
  const [index, setIndex] = useState(0);
  /** Set only by the explicit pause control. Never cleared automatically. */
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  /** Bumped on manual navigation purely to restart the interval below. */
  const [restartKey, setRestartKey] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const count = images.length;
  const rotating = !stopped && !hovered && !reducedMotion && count > 1;

  useEffect(() => {
    if (!rotating) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, ROTATION_MS);
    return () => {
      clearInterval(timer);
    };
    // `restartKey` is not read in the body — it is here so choosing a thumbnail
    // tears down the interval and starts a fresh one, giving that frame a full
    // turn rather than whatever was left of the previous tick.
  }, [rotating, count, restartKey]);

  const goTo = useCallback((next: number) => {
    setIndex(next);
    setRestartKey((key) => key + 1);
  }, []);

  /*
    Which slides have been reached, and therefore may be in the DOM. Adjusted
    during render rather than in an effect: React explicitly supports a state
    update during a component's own render, and it means the newly reached
    frame is mounted in the same commit that reveals it. Deferring to an effect
    would paint one frame of nothing first.
  */
  const [mounted, setMounted] = useState<readonly number[]>([0]);
  if (!mounted.includes(index)) {
    setMounted((current) => [...current, index]);
  }

  const active = images[index];
  if (!active) return null;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Campus gallery"
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
    >
      {/* ---------------- the photograph ---------------- */}
      <div className="relative aspect-3/2 w-full overflow-hidden rounded-sm bg-surface-subtle">
        {images.map((image, imageIndex) => (
          <div
            key={image.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${imageIndex + 1} of ${count}`}
            aria-hidden={imageIndex !== index}
            className={[
              'absolute inset-0 transition-opacity duration-700 ease-out',
              imageIndex === index ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          >
            {mounted.includes(imageIndex) ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            ) : null}
          </div>
        ))}
      </div>

      {/* ---------------- thumbnails ---------------- */}
      {count > 1 ? (
        <ul
          className={[
            'mt-3 grid gap-2 sm:gap-3',
            THUMB_COLUMNS[count] ?? 'grid-cols-3 sm:grid-cols-6',
          ].join(' ')}
        >
          {images.map((image, imageIndex) => {
            const isActive = imageIndex === index;
            return (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => {
                    goTo(imageIndex);
                  }}
                  aria-current={isActive ? 'true' : undefined}
                  className="group block w-full rounded-xs text-left"
                >
                  <span
                    className={[
                      'relative block aspect-3/2 w-full overflow-hidden rounded-xs bg-surface-subtle',
                      'transition duration-300',
                      isActive
                        ? ''
                        : 'opacity-55 grayscale group-hover:opacity-100 group-hover:grayscale-0',
                    ].join(' ')}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 6vw, 30vw"
                      className="object-cover"
                    />
                  </span>

                  {/*
                    A flat track under every thumbnail; for the active one an
                    accent bar that drains over the interval. Together the six
                    tracks read as one segmented rail — the same device as the
                    hero spotlight, so both galleries on the page behave alike.
                    Re-keyed on each step so the drain restarts, and only
                    animated while actually rotating — otherwise it holds full.
                  */}
                  <span
                    aria-hidden="true"
                    className="mt-2 block h-[3px] w-full overflow-hidden rounded-full bg-border"
                  >
                    {isActive ? (
                      <span
                        key={`${index}-${rotating ? 'run' : 'hold'}`}
                        className={[
                          'block h-full w-full origin-left bg-accent-surface',
                          rotating ? 'spotlight-progress' : '',
                        ].join(' ')}
                        style={{ ['--spotlight-duration' as string]: `${ROTATION_MS}ms` }}
                      />
                    ) : null}
                  </span>

                  <span className="sr-only">
                    Show image {imageIndex + 1}: {image.alt}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      {/* ---------------- caption + control ---------------- */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <p aria-live={rotating ? 'off' : 'polite'} className="text-sm text-ink-muted">
          {active.caption ?? active.alt}
        </p>

        {/*
          WCAG 2.2.2. Hidden until focused — the gallery is decoration and a
          permanently visible pause button beside it would be clutter, but a
          keyboard user reaches it immediately and it is the only thing that
          stops the rotation for good.
        */}
        {count > 1 ? (
          <button
            type="button"
            onClick={() => {
              setStopped((value) => !value);
            }}
            aria-pressed={stopped}
            className="sr-only shrink-0 rounded-full border-border-strong text-ink focus-visible:not-sr-only focus-visible:inline-flex focus-visible:h-8 focus-visible:items-center focus-visible:gap-2 focus-visible:border focus-visible:px-3 focus-visible:text-2xs"
          >
            {stopped ? <PlayIcon size={13} /> : <PauseIcon size={13} />}
            {stopped ? 'Resume gallery' : 'Pause gallery'}
          </button>
        ) : null}
      </div>
    </div>
  );
}
