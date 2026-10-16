'use client';

import Image from 'next/image';
import { useEffect, useReducer, useRef, useState, useSyncExternalStore } from 'react';

import { ArrowRightIcon, PauseIcon, PlayIcon } from '@/components/ui/icon';
import type { ServicePhoto } from '@/types/campus-services';

/** How long each photo shows before the next, in ms. */
const INTERVAL = 5000;
const TICK = 100;

interface Slide {
  readonly index: number;
  /** Time shown so far, in ms. */
  readonly elapsed: number;
}
type SlideAction = { type: 'tick'; count: number } | { type: 'go'; index: number };

function slide(state: Slide, action: SlideAction): Slide {
  if (action.type === 'go') return { index: action.index, elapsed: 0 };
  const elapsed = state.elapsed + TICK;
  return elapsed >= INTERVAL
    ? { index: (state.index + 1) % action.count, elapsed: 0 }
    : { index: state.index, elapsed };
}

const REDUCED = '(prefers-reduced-motion: reduce)';
function subscribeReduced(onChange: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener('change', onChange);
  return () => {
    query.removeEventListener('change', onChange);
  };
}

const ARROW =
  'flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/90 text-brand-950 shadow-raised backdrop-blur transition-[background-color,scale] duration-300 hover:bg-accent-surface motion-safe:active:scale-95';

/**
 * One service's photos: the current one large, the rest as thumbnails below.
 *
 * Every photo is mounted and stacked, so changing photo is a slow cross-fade
 * rather than a load; only the first is fetched eagerly. One photo renders as
 * a plain figure with no controls.
 *
 * ## Slideshow
 *
 * The photos advance on their own every five seconds, with a lime bar along
 * the top counting down to the next. It holds while the pointer or keyboard
 * focus is on the gallery and while the gallery is off screen, and the
 * pause button stops it for good (WCAG 2.2.2). Under `prefers-reduced-motion`
 * it starts paused; the play button still starts it.
 *
 * The timer is JavaScript, not the bar's CSS animation: the site's
 * reduced-motion rule shortens every animation to 0.01ms, which would turn an
 * animation-driven timer into a flicker.
 */
export function ServiceGallery({
  photos,
  title,
  preload = false,
  corner = 'left',
}: {
  photos: readonly ServicePhoto[];
  title: string;
  preload?: boolean;
  /** Which bottom corner the lime block sits behind. */
  corner?: 'left' | 'right';
}) {
  const [{ index, elapsed }, dispatch] = useReducer(slide, { index: 0, elapsed: 0 });
  /** The viewer's own choice; until they make one, reduced motion decides. */
  const [choice, setChoice] = useState<boolean | null>(null);
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
  const playing = choice ?? !reduced;
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const count = photos.length;
  const go = (next: number) => {
    dispatch({ type: 'go', index: (next + count) % count });
  };

  // Run only while on screen.
  useEffect(() => {
    const node = root.current;
    if (!node || count < 2) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry?.isIntersecting ?? false);
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [count]);

  const running = count > 1 && playing && !held && visible;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      dispatch({ type: 'tick', count });
    }, TICK);
    return () => {
      window.clearInterval(timer);
    };
  }, [running, count]);

  return (
    <div
      ref={root}
      onPointerEnter={() => {
        setHeld(true);
      }}
      onPointerLeave={() => {
        setHeld(false);
      }}
      onFocus={() => {
        setHeld(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false);
      }}
    >
      <div className="relative">
        <span
          aria-hidden="true"
          className={`absolute -bottom-3 hidden size-28 rounded-[8px] bg-accent-surface/70 sm:block ${corner === 'right' ? '-right-3' : '-left-3'}`}
        />
        <div className="group relative aspect-4/3 overflow-hidden rounded-[8px] bg-surface-inverse shadow-raised">
          {photos.map((photo, i) => (
            <Image
              key={photo.src}
              src={photo.src}
              alt={i === index ? photo.alt : ''}
              fill
              preload={preload && i === 0}
              sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 100vw"
              className={`object-cover transition-[opacity,scale] duration-700 ease-out motion-safe:group-hover:scale-[1.02] ${i === index ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}

          {count > 1 ? (
            <>
              {/* Time to the next photo. */}
              <span aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-1 bg-white/25">
                <span
                  className="block h-full origin-left bg-accent-surface transition-transform duration-100 ease-linear"
                  style={{ transform: `scaleX(${String(elapsed / INTERVAL)})` }}
                />
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-brand-950/55 to-transparent"
              />
              <p className="absolute bottom-4 left-5 text-sm font-semibold text-white tabular-nums">
                <span className="text-accent-surface">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-white/70"> / {String(count).padStart(2, '0')}</span>
              </p>
              <div className="absolute right-4 bottom-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setChoice(!playing);
                  }}
                  aria-label={
                    playing ? `Pause the ${title} slideshow` : `Play the ${title} slideshow`
                  }
                  className={ARROW}
                >
                  {playing ? (
                    <PauseIcon size={15} />
                  ) : (
                    <PlayIcon size={14} className="translate-x-px" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    go(index - 1);
                  }}
                  aria-label={`Previous photo of ${title}`}
                  className={ARROW}
                >
                  <ArrowRightIcon size={16} className="rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    go(index + 1);
                  }}
                  aria-label={`Next photo of ${title}`}
                  className={ARROW}
                >
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {count > 1 ? (
        <ul className="mt-5 flex gap-3" aria-label={`Photos of ${title}`}>
          {photos.map((photo, i) => (
            <li key={photo.src}>
              <button
                type="button"
                onClick={() => {
                  go(i);
                }}
                aria-pressed={i === index}
                aria-label={`Photo ${String(i + 1)}: ${photo.alt}`}
                className={`relative block aspect-4/3 w-20 cursor-pointer overflow-hidden rounded-[6px] bg-surface-inverse transition-[opacity,box-shadow] duration-300 sm:w-24 ${i === index ? 'opacity-100 outline-2 outline-offset-2 outline-accent-surface' : 'opacity-60 hover:opacity-100'}`}
              >
                <Image src={photo.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
