'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { ArrowRightIcon, CloseIcon } from '@/components/ui/icon';
import type { LibraryPhoto } from '@/types/library';

const ROUND =
  'flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-brand-950 shadow-raised transition-colors duration-300 hover:bg-accent-surface';

/**
 * The library's photographs as a grid; a photo opens full size in a dialog,
 * with arrows (and the arrow keys) to step through them.
 */
export function LibraryGallery({ photos }: { photos: readonly LibraryPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const count = photos.length;
  const current = open === null ? undefined : photos[open];

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open !== null && !node.open) node.showModal();
    if (open === null && node.open) node.close();
  }, [open]);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    const onClick = (event: MouseEvent) => {
      if (event.target === node) setOpen(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % count));
      if (event.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + count) % count));
    };
    node.addEventListener('click', onClick);
    node.addEventListener('keydown', onKey);
    return () => {
      node.removeEventListener('click', onClick);
      node.removeEventListener('keydown', onKey);
    };
  }, [count]);

  return (
    <>
      <ul className="grid grid-flow-row-dense grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {photos.map((photo, index) => (
          <li key={photo.src} className={index % 7 === 0 ? 'col-span-2' : ''}>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => {
                setOpen(index);
              }}
              className="group relative block aspect-3/2 w-full cursor-pointer overflow-hidden rounded-[8px] bg-surface-inverse"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={
                  index % 7 === 0
                    ? '(min-width: 1024px) 600px, 100vw'
                    : '(min-width: 1024px) 300px, 50vw'
                }
                className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.05]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label="Library photo"
        onClose={() => {
          setOpen(null);
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-6xl overflow-visible bg-transparent p-0 backdrop:bg-brand-950/85 backdrop:backdrop-blur-sm"
      >
        {current && open !== null ? (
          <figure className="relative">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="(min-width: 1200px) 1150px, 100vw"
              className="mx-auto h-auto max-h-[calc(100dvh-7rem)] w-auto max-w-full rounded-[8px] object-contain"
            />
            <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm text-white">
              <span>{current.alt}</span>
              <span className="shrink-0 text-white/70 tabular-nums">
                <span className="text-accent-surface">{open + 1}</span> / {count}
              </span>
            </figcaption>
            <button
              type="button"
              onClick={() => {
                setOpen(null);
              }}
              className={`absolute top-3 right-3 ${ROUND}`}
            >
              <CloseIcon size={18} aria-hidden="true" />
              <span className="sr-only">Close</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen((open - 1 + count) % count);
              }}
              aria-label="Previous photo"
              className={`absolute top-1/2 left-3 -translate-y-1/2 ${ROUND}`}
            >
              <ArrowRightIcon size={18} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen((open + 1) % count);
              }}
              aria-label="Next photo"
              className={`absolute top-1/2 right-3 -translate-y-1/2 ${ROUND}`}
            >
              <ArrowRightIcon size={18} />
            </button>
          </figure>
        ) : null}
      </dialog>
    </>
  );
}
