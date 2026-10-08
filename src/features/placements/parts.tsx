import { ArrowRightIcon, BookIcon } from '@/components/ui/icon';
import type { PlacementDocument, PlacementStat } from '@/types/placements';

export const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
export const H2 =
  'font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong';

/** The short accent rule under a heading, as on the programme pages. */
export function Rule({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`block h-[3px] w-10 bg-accent-surface ${className}`} />
  );
}

/** Renders `**…**` in a content string as bold; the rest as plain text. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="font-semibold text-ink-strong">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** A figure with its unit set smaller after it: ₹29 LPA. */
export function Figure({ stat, className = '' }: { stat: PlacementStat; className?: string }) {
  return (
    <span className={`font-serif leading-none ${className}`}>
      {stat.value}
      {stat.unit ? (
        <span className="ml-1 font-sans text-[0.45em] font-semibold tracking-[0.04em]">
          {stat.unit}
        </span>
      ) : null}
    </span>
  );
}

/**
 * A report or audit PDF as a card — the institute's "Recruitment Report &
 * Process" tiles: the document kind set large and faint, the title, and the
 * action.
 */
export function PdfCard({ doc }: { doc: PlacementDocument }) {
  return (
    <a
      href={doc.href}
      target="_blank"
      rel={doc.local ? 'noopener' : 'noopener noreferrer'}
      className="group flex h-full flex-col items-center rounded-[8px] border border-border bg-surface px-5 pt-7 pb-6 text-center transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-brand hover:shadow-raised"
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-accent-50 text-accent-700 transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
        <BookIcon size={18} aria-hidden="true" />
      </span>
      <span
        aria-hidden="true"
        className="mt-4 font-serif text-[1.75rem] leading-none tracking-[0.14em] text-border-strong uppercase transition-colors duration-300 group-hover:text-brand"
      >
        {doc.kind}
      </span>
      <span className="mt-3 text-[0.9375rem] leading-snug font-medium text-ink-strong">
        {doc.title}
      </span>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand">
        View PDF
        <ArrowRightIcon
          size={14}
          aria-hidden="true"
          className="transition-transform duration-300 motion-safe:group-hover:translate-x-0.5"
        />
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** Newest first; a year's report before its audit. */
export const byYear = (docs: readonly PlacementDocument[]) =>
  [...docs].sort((a, b) => b.year - a.year || (a.kind === 'report' ? -1 : 1));
