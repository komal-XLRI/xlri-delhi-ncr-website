'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { ArrowRightIcon, CloseIcon } from '@/components/ui/icon';
import type { FoundingFather } from '@/types/founding-fathers';

/**
 * The portrait grid and its "Know More" dialog — the Jamshedpur layout.
 *
 * ## The grid
 *
 * Four to a row on desktop, two below `lg`, and the last row *centred* rather
 * than left-aligned: seven fathers leave three on the second row, and Jamshedpur
 * centres them (their `inline-block` + `text-align: center`). A flex-wrap with
 * `justify-center` gives the same thing without the inline-block whitespace
 * quirks.
 *
 * ## The dialog
 *
 * Native `<dialog>` opened with `showModal()`. The browser supplies the things a
 * hand-rolled modal usually gets wrong: focus moves in and is trapped, Escape
 * closes it, the rest of the page goes inert, and focus returns to the card that
 * opened it.
 *
 * Clicking outside the panel closes it too. The usual trick — a click handler on
 * the `<dialog>` that checks whether the target was the element itself — puts a
 * mouse-only listener on a non-interactive element, which jsx-a11y rightly
 * rejects. So the `<dialog>` is a transparent full-screen layer and the dimmed
 * area is a real `<button>` behind the panel. It is out of the tab order and
 * hidden from assistive tech, because keyboard and screen-reader users already
 * have Escape and the visible Close button; it exists only for the pointer.
 *
 * Each card is a real `<button>`, so "Know More" is reachable by keyboard; on
 * Jamshedpur it is a `<div>` with a click handler and cannot be reached at all.
 */
export function FoundingFathersGrid({ fathers }: { fathers: readonly FoundingFather[] }) {
  const [selected, setSelected] = useState<FoundingFather | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (selected && !dialog.current?.open) dialog.current?.showModal();
  }, [selected]);

  return (
    <>
      <ul className="-mx-2.5 flex flex-wrap justify-center md:-mx-4 xl:-mx-7">
        {fathers.map((father) => (
          <li key={father.id} className="mb-8 w-1/2 px-2.5 md:mb-12 md:px-4 lg:w-1/4 xl:px-7">
            <button
              type="button"
              onClick={() => setSelected(father)}
              aria-haspopup="dialog"
              className="group block w-full cursor-pointer rounded-sm text-left"
            >
              {/*
                Square, not the portraits' native 270×315. At the native ratio
                a desktop row ran ~300px of photo before the name, and the
                "Know More" links fell off the bottom of a laptop screen. The
                crop sits a little above centre so it trims chest, not hair.
              */}
              <span className="block aspect-square overflow-hidden rounded-[5px] bg-surface-subtle">
                <Image
                  src={father.portrait.src}
                  width={father.portrait.width}
                  height={father.portrait.height}
                  alt=""
                  sizes="(min-width: 1280px) 240px, (min-width: 1024px) 22vw, 45vw"
                  className="size-full object-cover object-[center_30%] transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
                />
              </span>
              <span className="mt-4 block font-serif text-lg leading-tight text-ink-strong md:text-[1.375rem]">
                {father.name}
              </span>
              <span className="mt-1.5 block text-sm font-medium text-ink-muted md:text-base">
                {father.cardLabel}
              </span>
              <span className="mt-2.5 inline-flex items-center gap-2 text-sm font-semibold text-brand md:mt-3">
                Know More
                <span className="sr-only"> about {father.name}</span>
                <ArrowRightIcon
                  size={14}
                  aria-hidden="true"
                  className="text-accent-700 transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-labelledby="father-dialog-name"
        onClose={() => setSelected(null)}
        className="m-0 size-full max-h-none max-w-none items-center justify-center bg-transparent p-4 backdrop:bg-black/55 open:flex"
      >
        {selected ? (
          <div className="relative z-10 max-h-full w-full max-w-[43.75rem] overflow-y-auto rounded-[5px] bg-surface p-6 text-ink shadow-raised sm:px-12 sm:py-10">
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close"
              className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink-strong"
            >
              <CloseIcon size={20} />
            </button>

            <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
              <div className="w-40 shrink-0 overflow-hidden rounded-[5px] sm:w-[30%]">
                <Image
                  src={selected.portrait.src}
                  width={selected.portrait.width}
                  height={selected.portrait.height}
                  alt={`Portrait of ${selected.name}, SJ`}
                  sizes="200px"
                  className="w-full"
                />
              </div>
              <div className="min-w-0 sm:pt-1">
                <h2
                  id="father-dialog-name"
                  className="pr-10 font-serif text-2xl leading-tight text-ink-strong"
                >
                  {selected.name}
                </h2>
                <p className="mt-1 font-semibold text-ink-muted">SJ</p>
                <p className="mt-5 text-base leading-[1.8] text-ink">{selected.biography}</p>
              </div>
            </div>
          </div>
        ) : null}
        {/*
          After the panel in source order, beneath it by z-index. `showModal()`
          focuses the first focusable element inside the dialog, and a
          `tabIndex={-1}` button still counts — placed first, it took focus and
          left it on something `aria-hidden`. Last, the Close button wins.
        */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => dialog.current?.close()}
          className="absolute inset-0 size-full cursor-default"
        />
      </dialog>
    </>
  );
}
