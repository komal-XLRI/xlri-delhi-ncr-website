'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { Heritage } from '@/types/heritage';

/**
 * The heritage film: a poster with a round Play button that becomes the
 * YouTube player in place — the Jamshedpur layout, minus its modal.
 *
 * ## Why a facade
 *
 * A YouTube iframe costs roughly 500 kB–1 MB of third-party JavaScript and puts
 * an origin we do not control on the page (see `types/homepage.ts`,
 * `HeroVideoSource`). The poster is a self-hosted copy of the thumbnail, so
 * nothing is fetched from YouTube until someone actually presses Play. The
 * embed uses `youtube-nocookie.com`, which sets no cookies before playback.
 *
 * Inline rather than in a modal: one fewer focus trap to get right, and the
 * player lands exactly where the visitor was already looking.
 */
export function HeritageFilm({ film }: { film: Heritage['film'] }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-[5px] bg-surface-inverse">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0`}
          title={film.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full cursor-pointer"
        >
          <Image
            src={film.poster.src}
            alt={film.poster.alt}
            fill
            sizes="(min-width: 1280px) 1184px, 100vw"
            className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
          />
          {/*
            The disc: frosted grey at rest, navy on hover, as on Jamshedpur. The
            label carries the film's title so the control is not just "Play".
          */}
          <span className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-neutral-500/70 text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 group-hover:border-surface-inverse group-hover:bg-surface-inverse md:size-[5.9rem] md:text-base">
            Play
            <span className="sr-only">: {film.title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
