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
 * ## The preview frame
 *
 * The browser's own PDF viewer brings a dark toolbar and a thumbnail rail
 * that no page can style. Both are switched off with the PDF open parameters
 * (`toolbar=0`, `navpanes=0`) so the pages sit alone as a white sheet inside
 * our own frame: a lime top edge, a slim header with the page count, and a
 * Full screen control. The full viewer is still one click away through Open
 * in new tab.
 *
 * Tabs follow the WAI-ARIA pattern (Left/Right, Home/End, roving tabindex).
 */
export function DisclosureViewer({ documents }: { documents: readonly DisclosureDocument[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const frame = useRef<HTMLDivElement>(null);
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
          <div className="rise-in flex flex-col gap-5 rounded-[5px] border-l-4 border-accent-surface bg-surface-subtle p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex h-12 w-10 shrink-0 items-center justify-center rounded-[4px] bg-brand text-[0.6875rem] font-bold tracking-[0.06em] text-white"
              >
                PDF
              </span>
              <div>
                <h2 className="font-serif text-2xl leading-tight text-ink-strong md:text-[1.75rem]">
                  {doc.title}
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={doc.src}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-2.5 text-sm font-semibold text-ink-strong transition-colors duration-300 hover:border-brand hover:text-brand"
              >
                Open in new tab
                <span className="sr-only"> (PDF)</span>
                <ExternalIcon
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href={doc.src}
                download
                className="group inline-flex items-center gap-2.5 rounded-full bg-brand py-1.5 pr-1.5 pl-5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-950"
              >
                Download
                <span className="sr-only">
                  {' '}
                  {doc.title}, PDF, {doc.sizeLabel}
                </span>
                <span
                  aria-hidden="true"
                  className="flex size-8 items-center justify-center rounded-full bg-accent-surface text-brand-950"
                >
                  <ArrowRightIcon
                    size={14}
                    className="rotate-90 transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </span>
              </a>
            </div>
          </div>

          {/* The embed, from `md` up. Only the visible document's frame is mounted. */}
          {index === active ? (
            <div
              ref={frame}
              className="rise-in mt-6 hidden overflow-hidden rounded-[8px] border border-t-4 border-border border-t-accent-surface bg-surface-subtle md:block"
              style={{ ['--rise-delay' as string]: '250ms' }}
            >
              <div className="flex items-center justify-between gap-4 border-b border-border bg-surface px-5 py-3">
                <p className="flex items-center gap-3 text-sm">
                  <span className="font-semibold tracking-[0.14em] text-accent-700 uppercase">
                    Document preview
                  </span>
                  <span aria-hidden="true" className="h-4 w-px bg-border-strong" />
                  <span className="text-ink-muted">{doc.pages} pages · scroll to read</span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    void frame.current?.requestFullscreen();
                  }}
                  className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-3.5 py-1.5 text-sm font-semibold text-ink-strong transition-colors duration-300 hover:border-brand hover:text-brand"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="size-3.5 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  >
                    <path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" />
                  </svg>
                  Full screen
                </button>
              </div>
              {/* In full screen the frame fills the display, so the sheet grows with it. */}
              <div className="p-4 lg:p-6 [:fullscreen_&]:h-[calc(100%-3.25rem)]">
                <iframe
                  src={`${doc.src}#toolbar=0&navpanes=0&view=FitH`}
                  title={`${doc.title} (PDF)`}
                  className="block h-[min(78vh,54rem)] min-h-[36rem] w-full rounded-[4px] bg-surface shadow-raised ring-1 ring-border [:fullscreen_&]:h-full"
                />
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
