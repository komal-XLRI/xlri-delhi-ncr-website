'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { ArrowRightIcon, CloseIcon } from '@/components/ui/icon';
import type { BiographyBlock, CentrePerson } from '@/types/centre';

/**
 * The Chairperson and the Board of Advisors, each with "Know More" opening a
 * biography in a native `<dialog>` — the same dialog pattern, and the same
 * reasoning, as the Jesuit Founding Fathers page: focus moves in and is
 * trapped, Escape closes, the page goes inert, focus returns to the card.
 *
 * Chairperson first, as a wide featured card; the advisors below in a grid of
 * round portraits. One dialog serves both.
 */
export function CentrePeople({
  chairperson,
  advisors,
}: {
  chairperson: { heading: string; person: CentrePerson };
  advisors: { heading: string; people: readonly CentrePerson[] };
}) {
  const [selected, setSelected] = useState<CentrePerson | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (selected && !dialog.current?.open) dialog.current?.showModal();
  }, [selected]);

  const chair = chairperson.person;
  const lead = chair.biography.find((block) => block.type === 'p');

  return (
    <>
      {/* ---------------- chairperson ---------------- */}
      <section aria-labelledby="chairperson-heading">
        <h2
          id="chairperson-heading"
          className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase"
        >
          {chairperson.heading}
        </h2>
        <div className="mt-5 grid grid-cols-1 items-center gap-8 rounded-[8px] border border-border bg-surface p-6 shadow-raised sm:grid-cols-[11rem_1fr] md:gap-10 md:p-10 lg:grid-cols-[14rem_1fr]">
          <div className="mx-auto w-40 overflow-hidden rounded-full ring-4 ring-accent-100 sm:mx-0 sm:w-full">
            <Image
              src={chair.portrait.src}
              width={chair.portrait.width}
              height={chair.portrait.height}
              alt={`Portrait of ${chair.name}`}
              sizes="224px"
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-serif text-2xl leading-tight text-ink-strong md:text-[2rem]">
              {chair.name}
            </p>
            <p className="mt-1.5 font-medium text-ink-muted">{chair.role}</p>
            {lead && lead.type === 'p' ? (
              <p className="mt-4 line-clamp-4 text-[0.9375rem] leading-[1.75] text-ink md:line-clamp-3">
                {lead.text}
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => setSelected(chair)}
              aria-haspopup="dialog"
              className="group mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-brand"
            >
              Read full profile
              <span className="sr-only"> of {chair.name}</span>
              <ArrowRightIcon
                size={14}
                aria-hidden="true"
                className="text-accent-700 transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- board of advisors ---------------- */}
      <section aria-labelledby="advisors-heading" className="mt-16 md:mt-20">
        <h2
          id="advisors-heading"
          className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong"
        >
          {advisors.heading}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:mt-10 lg:grid-cols-4 lg:gap-x-8">
          {advisors.people.map((person) => (
            <li key={person.id}>
              <button
                type="button"
                onClick={() => setSelected(person)}
                aria-haspopup="dialog"
                className="group flex w-full flex-col items-center text-center"
              >
                <span className="block w-28 overflow-hidden rounded-full bg-surface-subtle ring-1 ring-border transition-shadow duration-300 group-hover:ring-4 group-hover:ring-accent-surface md:w-36">
                  <Image
                    src={person.portrait.src}
                    width={person.portrait.width}
                    height={person.portrait.height}
                    alt=""
                    sizes="144px"
                    className="aspect-square w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.05]"
                  />
                </span>
                <span className="mt-4 block font-serif text-lg leading-tight text-ink-strong">
                  {person.name}
                </span>
                <span className="mt-1.5 block text-[0.8125rem] leading-snug text-ink-muted md:text-sm">
                  {person.role}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Know More
                  <span className="sr-only"> about {person.name}</span>
                  <ArrowRightIcon
                    size={13}
                    aria-hidden="true"
                    className="text-accent-700 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- biography dialog ---------------- */}
      <dialog
        ref={dialog}
        aria-labelledby="person-dialog-name"
        onClose={() => setSelected(null)}
        className="m-0 size-full max-h-none max-w-none items-center justify-center bg-transparent p-4 backdrop:bg-black/55 open:flex"
      >
        {selected ? (
          <div className="relative z-10 max-h-full w-full max-w-[46rem] overflow-y-auto rounded-[8px] bg-surface p-6 text-ink shadow-raised sm:p-10">
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close"
              className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink-strong"
            >
              <CloseIcon size={20} />
            </button>
            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
              <div className="w-24 shrink-0 overflow-hidden rounded-full ring-4 ring-accent-100">
                <Image
                  src={selected.portrait.src}
                  width={selected.portrait.width}
                  height={selected.portrait.height}
                  alt={`Portrait of ${selected.name}`}
                  sizes="96px"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="sm:pr-8">
                <h3
                  id="person-dialog-name"
                  className="font-serif text-2xl leading-tight text-ink-strong"
                >
                  {selected.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-ink-muted">{selected.role}</p>
              </div>
            </div>
            <div className="mt-6 space-y-4 border-t border-border pt-6 text-[0.9375rem] leading-[1.8]">
              {selected.biography.map((block, index) => (
                <Biography key={index} block={block} />
              ))}
            </div>
          </div>
        ) : null}
        {/*
          Behind the panel, after it in source order so `showModal()` focuses
          the Close button first. See founding-fathers-grid.tsx.
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

function Biography({ block }: { block: BiographyBlock }) {
  if (block.type === 'list') {
    return (
      <ul className="space-y-2 pl-5 [list-style:disc] marker:text-accent-700">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p>{block.text}</p>;
}
