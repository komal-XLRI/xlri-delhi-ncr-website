'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { PauseIcon, PlayIcon } from '@/components/ui/icon';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import type { MottoPart } from '@/types/homepage';

/**
 * The motto, as a vertical stepper.
 *
 * The three words stack on the left and act as the controls; a track runs down
 * their right edge with the active segment filled; the gloss for the active
 * word sits opposite. One word is emphasised at a time and the other two recede.
 *
 * ## Why this is tabs and not three panels of text
 *
 * Because only one gloss is visible, the words are no longer decoration — they
 * are controls that change what is displayed, and the pattern for "a set of
 * labels, one associated panel visible at a time" is the WAI-ARIA tab pattern.
 * Built to it properly rather than approximated:
 *
 *   • `role="tablist"` with `aria-orientation="vertical"`, because the labels
 *     stack — a screen reader announces the arrow keys that actually work
 *   • each word is a real `<button role="tab">` with `aria-selected` and
 *     `aria-controls`; each gloss is a `role="tabpanel"` pointing back
 *   • roving `tabIndex`: the selected tab is the only one in the tab order, so
 *     Tab moves past the group rather than through three stops inside it
 *   • Up/Down/Left/Right, Home and End move between words, with selection
 *     following focus — safe here because the panels are already in the DOM and
 *     switching costs nothing
 *
 * All three glosses stay in the markup; inactive ones carry `hidden`. They are
 * indexed and searchable, which is not true of text a script injects on click.
 *
 * ## Motion
 *
 * It advances on its own, on the same terms as the hero: paused on hover and on
 * focus-within so it cannot move while being read or reached; **restarted**
 * rather than stopped when a word is chosen, so the reader's word gets a full
 * turn and the sequence continues; disabled outright under
 * `prefers-reduced-motion`; and an explicit control stops it for good, which is
 * what WCAG 2.2.2 requires of anything that moves for more than five seconds.
 *
 * The track segment beside the active word fills over the interval, so the next
 * change is visible before it happens rather than being a surprise.
 */

const ROTATION_MS = 2200;

export function MottoStepper({ parts }: { parts: readonly MottoPart[] }) {
  const [index, setIndex] = useState(0);
  /** Set only by the explicit control. Never cleared automatically. */
  const [stopped, setStopped] = useState(false);
  const [paused, setPaused] = useState(false);
  /** Bumped on manual selection purely to restart the interval below. */
  const [restartKey, setRestartKey] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const count = parts.length;
  const rotating = !stopped && !paused && !reducedMotion && count > 1;

  useEffect(() => {
    if (!rotating) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, ROTATION_MS);
    return () => {
      clearInterval(timer);
    };
    // `restartKey` is not read in the body — it is here so choosing a word
    // tears down the interval and starts a fresh one.
  }, [rotating, count, restartKey]);

  const select = useCallback((next: number, moveFocus: boolean) => {
    setIndex(next);
    setRestartKey((key) => key + 1);
    if (moveFocus) tabs.current[next]?.focus();
  }, []);

  /*
    Bound to each tab rather than to the tablist. Focus is always on a tab when
    these keys matter, so the handler fires either way — but an element carrying
    an interactive role and a key handler is expected to be focusable, and a
    tablist is not. Putting it here keeps that true and matches the APG example.
  */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const step =
        event.key === 'ArrowDown' || event.key === 'ArrowRight'
          ? 1
          : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
            ? -1
            : 0;

      if (step !== 0) {
        event.preventDefault();
        select((index + step + count) % count, true);
        return;
      }
      if (event.key === 'Home') {
        event.preventDefault();
        select(0, true);
      }
      if (event.key === 'End') {
        event.preventDefault();
        select(count - 1, true);
      }
    },
    [index, count, select],
  );

  const active = parts[index];
  if (!active) return null;

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
      className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,auto)_minmax(0,1fr)] md:gap-0"
    >
      {/* ---------------- the words ---------------- */}
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="For The Greater Good"
        /*
          No minimum width. It was pinned at 18rem, which is wider than the
          longest word needs and pushed the track — and everything after it —
          to the right for no reason. `auto` lets the column be exactly as wide
          as "Greater" and hands the remainder to the gloss.
        */
        className="relative flex flex-col items-start md:border-r md:border-border md:pr-12"
      >
        {parts.map((part, partIndex) => {
          const isActive = partIndex === index;
          return (
            <button
              key={part.word}
              ref={(node) => {
                tabs.current[partIndex] = node;
              }}
              type="button"
              role="tab"
              id={`motto-tab-${String(partIndex)}`}
              aria-selected={isActive}
              aria-controls={`motto-panel-${String(partIndex)}`}
              // Roving tabIndex: one stop for the whole group, not three.
              tabIndex={isActive ? 0 : -1}
              onClick={() => {
                select(partIndex, false);
              }}
              onKeyDown={onKeyDown}
              className="group relative block w-full py-2 text-left md:py-3"
            >
              {/*
                The filled segment of the track, at the tablist's right edge.
                Pulled one pixel right so it sits *on* the hairline rather than
                beside it, and re-keyed each step so the fill restarts.
              */}
              {isActive ? (
                <span
                  aria-hidden="true"
                  key={`${String(index)}-${rotating ? 'run' : 'hold'}`}
                  className={[
                    // 3rem must track the tablist's `md:pr-12`, plus 1px so the
                    // segment sits *on* the hairline rather than beside it.
                    'absolute top-0 -right-[calc(3rem+1px)] hidden h-full w-[3px] bg-motto-word md:block',
                    rotating ? 'spotlight-progress-y' : '',
                  ].join(' ')}
                  style={{ ['--spotlight-duration' as string]: `${String(ROTATION_MS)}ms` }}
                />
              ) : null}

              {/* On a phone there is no track, so the active word is marked in
                  its own left margin instead. */}
              <span
                aria-hidden="true"
                className={[
                  'absolute top-1/2 -left-5 h-8 w-[3px] -translate-y-1/2 bg-motto-word transition-opacity duration-300 md:hidden',
                  isActive ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
              />

              <span
                className={[
                  'block font-serif text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.12] tracking-[-0.03em]',
                  // 300ms, matched to the shorter interval. A half-second
                  // colour fade against a 3.5s step reads as lag.
                  'transition-colors duration-300 ease-out',
                  /*
                    Two tokens, not one colour at two opacities. On the dark
                    version the idle word was translucent white, which meant its
                    contrast depended on whatever the gradient happened to be
                    doing behind it. Here both states are solid, with floors
                    fixed in the theme: 8.04:1 active, 4.47:1 idle. The idle
                    value sits under the 4.5 body floor and is deliberately
                    restricted to this display size, where 3:1 applies.
                  */
                  isActive
                    ? 'text-motto-word'
                    : 'text-motto-word-idle group-hover:text-motto-word group-focus-visible:text-motto-word',
                ].join(' ')}
              >
                {part.word}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------------- the gloss ---------------- */}
      <div className="md:flex md:items-center md:pl-12">
        {parts.map((part, partIndex) => (
          <div
            key={part.word}
            role="tabpanel"
            id={`motto-panel-${String(partIndex)}`}
            aria-labelledby={`motto-tab-${String(partIndex)}`}
            hidden={partIndex !== index}
            data-spotlight-slide=""
            data-active={partIndex === index ? 'true' : 'false'}
            /* A tabpanel with no focusable content must be reachable itself, or
               a keyboard user can select a word and never read it. */
            tabIndex={partIndex === index ? 0 : -1}
          >
            {/*
              No width cap, and `text-pretty` rather than `text-balance` — the
              same trap the purpose band fell into. Balance works by minimising
              the longest line, so given room to spare it shrinks every line
              and empties the right of the column. Pretty only guards the last
              line against a widow, so the first line runs the full width.

              The size went up a step too: set against words at 52px, a gloss
              at 30px read as a caption rather than the other half of the
              composition.
            */}
            <p className="font-serif text-[clamp(1.5rem,2.7vw,2.125rem)] leading-[1.3] text-pretty text-ink-strong">
              {part.text}
            </p>
          </div>
        ))}
      </div>

      {/*
        WCAG 2.2.2, kept out of the composition but not removed. Visually hidden
        until focused — the same technique as the skip link. Choosing a word
        already restarts rather than stops, so this is the only thing that ends
        the rotation for good.
      */}
      {count > 1 ? (
        <button
          type="button"
          onClick={() => {
            setStopped((value) => !value);
          }}
          aria-pressed={stopped}
          className="sr-only focus-visible:not-sr-only focus-visible:inline-flex focus-visible:h-9 focus-visible:items-center focus-visible:gap-2 focus-visible:justify-self-start focus-visible:rounded-full focus-visible:border focus-visible:border-border-strong focus-visible:px-3 focus-visible:text-2xs focus-visible:text-ink"
        >
          {stopped ? <PlayIcon size={13} /> : <PauseIcon size={13} />}
          {stopped ? 'Resume motto' : 'Pause motto'}
        </button>
      ) : null}
    </div>
  );
}
