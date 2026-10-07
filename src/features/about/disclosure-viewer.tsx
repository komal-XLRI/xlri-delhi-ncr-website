'use client';

import { useRef, useState, type KeyboardEvent } from 'react';

import { ArrowRightIcon, ExternalIcon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import type { DisclosureDocument } from '@/types/mandatory-disclosure';

/**
 * The disclosure documents — Jamshedpur's layout: a tab per document, the
 * selected one's PDF embedded beneath.
 *
 * ## One document, no tabs
 *
 * Delhi publishes a single disclosure today. A tab row with one tab is a
 * control that does nothing, so the row only renders when there are two or
 * more documents; until then the document's own heading stands in its place.
 *
 * ## Why the embed is desktop-only
 *
 * Jamshedpur shows the 600px iframe on every screen. Mobile browsers mostly do
 * not render PDFs inline — Android Chrome shows a blank frame or a download
 * prompt, iOS Safari shows the first page and will not scroll it — so below
 * `md` the frame is replaced by a card with Open and Download, which work
 * everywhere. Open and Download stay above the frame on desktop too: a
 * statutory document should be one click from being saved or printed.
 *
 * Tabs follow the WAI-ARIA pattern (Left/Right, Home/End, roving tabindex).
 */
export function DisclosureViewer({ documents }: { documents: readonly DisclosureDocument[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const last = documents.length - 1;
  const showTabs = documents.length > 1;

  const go = (index: number) => {
    const next = index < 0 ? last : index > last ? 0 : index;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: last,
    };
    const target = moves[event.key];
    if (target !== undefined) {
      event.preventDefault();
      go(target);
    }
  };

  return (
    <div>
      {showTabs ? (
        <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
          <div
            role="tablist"
            aria-label="Disclosure documents"
            className="flex min-w-max gap-8 border-b border-border"
          >
            {documents.map((doc, index) => {
              const selected = index === active;
              return (
                <button
                  key={doc.id}
                  ref={(node) => {
                    tabs.current[index] = node;
                  }}
                  id={`disclosure-tab-${doc.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`disclosure-panel-${doc.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={onKeyDown}
                  className={cn(
                    'relative -mb-px pb-3 text-lg font-semibold whitespace-nowrap transition-colors',
                    selected ? 'text-ink-strong' : 'text-ink-muted hover:text-ink-strong',
                  )}
                >
                  {doc.title}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-accent-surface transition-opacity',
                      selected ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {documents.map((doc, index) => (
        <div
          key={doc.id}
          {...(showTabs
            ? {
                id: `disclosure-panel-${doc.id}`,
                role: 'tabpanel',
                'aria-labelledby': `disclosure-tab-${doc.id}`,
              }
            : {})}
          hidden={index !== active}
          className={showTabs ? 'pt-8' : undefined}
        >
          <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-serif text-2xl leading-tight text-ink-strong md:text-[1.75rem]">
                {doc.title}
              </h2>
              <p className="mt-1.5 text-sm text-ink-muted">
                PDF · {doc.pages} pages · {doc.sizeLabel}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={doc.src}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-ink-strong transition-colors hover:border-brand hover:text-brand"
              >
                Open in new tab
                <span className="sr-only"> (PDF)</span>
                <ExternalIcon size={15} aria-hidden="true" />
              </a>
              <a
                href={doc.src}
                download
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
              >
                Download
                <span className="sr-only">
                  {' '}
                  {doc.title}, PDF, {doc.sizeLabel}
                </span>
                <ArrowRightIcon size={15} aria-hidden="true" className="rotate-90" />
              </a>
            </div>
          </div>

          {/* The embed, from `md` up. Only the visible document's frame is mounted. */}
          {index === active ? (
            <div className="mt-6 hidden overflow-hidden rounded-[5px] border border-border bg-surface-subtle md:block">
              <iframe
                src={`${doc.src}#view=FitH`}
                title={`${doc.title} (PDF)`}
                className="block h-[min(80vh,56rem)] min-h-[37.5rem] w-full"
              />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
