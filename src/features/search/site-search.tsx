'use client';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';

import { CloseIcon, ExternalIcon, SearchIcon } from '@/components/ui/icon';
import type { SearchEntry } from '@/types/search';

/** Opens the header search from anywhere on the page (the 404 page uses it). */
export const OPEN_SEARCH_EVENT = 'xlri:open-search';

/** Lower case, accents off, punctuation to spaces: "Fr. Antony" → "fr antony". */
const fold = (text: string) =>
  text
    // Decompose "é" to "e" + accent; the accent then goes with the punctuation.
    .normalize('NFD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/**
 * Shown before anything is typed — the institute's "Key Searches". Ids from
 * the index; any that are missing are skipped.
 */
const KEY_SEARCHES = [
  'page:/academics/programmes/pgdm-business-management',
  'page:/academics/programmes/pgdm-innovation-entrepreneurship',
  'page:/faculty/full-time',
  'page:/placements',
  'page:/placements/reports',
  'page:/executive-education/emdp',
  'page:/executive-education/management-development-programmes',
  'page:/about/mandatory-disclosure',
  'page:/about/directors-desk',
  'page:/about/accreditation',
];

interface Prepared {
  entry: SearchEntry;
  title: string;
  rest: string;
}

/**
 * Every query word must appear somewhere in the entry; the order is how well
 * the title matches. A title that starts with the query beats one that merely
 * contains it, which beats a match only in the keywords.
 */
function score(item: Prepared, words: readonly string[], phrase: string): number {
  let total = 0;
  const titleWords = item.title.split(' ');
  for (const word of words) {
    const inTitle = item.title.includes(word);
    if (!inTitle && !item.rest.includes(word)) return 0;
    if (titleWords.some((t) => t.startsWith(word))) total += 10;
    else if (inTitle) total += 6;
    else total += 1;
  }
  if (item.title === phrase) total += 100;
  else if (item.title.startsWith(phrase)) total += 40;
  return total;
}

/** Wraps each typed word's occurrences in `text` in a highlight. */
function highlight(text: string, words: readonly string[]): ReactNode {
  if (words.length === 0) return text;
  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  return text.split(pattern).map((part, index) =>
    index % 2 === 1 ? (
      <mark key={index} className="bg-brand/10 text-inherit">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

/**
 * Header search — the institute's pattern: the Search button opens a panel
 * beneath it with a text box and a list. Before anything is typed the list
 * is the Key Searches; as the visitor types it becomes the matches, filtered
 * on every keystroke in the browser (the index is built once on the server,
 * see `services/search`). There is no results page.
 *
 *  - Enter opens the top match; Escape, the close button, or a click outside
 *    closes the panel and returns focus to the Search button.
 *  - Links to other XLRI sites open in a new tab and say so.
 *  - The panel is a disclosure (`aria-expanded` on the button), not a modal:
 *    the page behind stays usable.
 */
export function SiteSearch({ index }: { index: readonly SearchEntry[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const panelId = useId();
  const inputId = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const prepared = useMemo<Prepared[]>(
    () =>
      index.map((entry) => ({
        entry,
        title: fold(entry.title),
        rest: fold(
          `${entry.trail} ${entry.summary ?? ''} ${entry.keywords} ${entry.destination ?? ''}`,
        ),
      })),
    [index],
  );

  const keySearches = useMemo(
    () => KEY_SEARCHES.map((id) => index.find((e) => e.id === id)).filter((e) => e !== undefined),
    [index],
  );

  const phrase = fold(query);
  const results = useMemo(() => {
    const words = phrase ? phrase.split(' ') : [];
    if (words.length === 0) return [];
    return prepared
      .map((item) => ({ item, score: score(item, words, phrase) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score || a.item.entry.title.localeCompare(b.item.entry.title))
      .map((r) => r.item.entry);
  }, [prepared, phrase]);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) button.current?.focus();
  }, []);

  // Focus the box when the panel opens.
  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  // Close on a click outside, or on Escape anywhere.
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) close(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close(true);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  // An address carrying `?q=` (an old `/search` link, redirected) opens the
  // panel with that query, then drops it from the address. Read after
  // hydration (the server render has no address bar), a tick later.
  useEffect(() => {
    const url = new URL(window.location.href);
    const q = url.searchParams.get('q');
    if (!q) return;
    url.searchParams.delete('q');
    window.history.replaceState(window.history.state, '', url);
    const timer = setTimeout(() => {
      setQuery(q);
      setOpen(true);
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Let other parts of the page open it.
  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    return () => {
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
    };
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const top = results[0];
    if (!top) return;
    close(false);
    if (top.kind === 'elsewhere') window.open(top.href, '_blank', 'noopener');
    else router.push(top.href);
  };

  const marks = query.trim().split(/\s+/).filter(Boolean);
  const list = phrase ? results : keySearches;

  return (
    <div ref={root} className="relative">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setOpen((value) => !value);
        }}
        className="inline-flex h-11 items-center gap-2 rounded-sm text-xs font-medium text-ink-strong transition-colors hover:text-brand aria-expanded:text-brand lg:h-9 lg:border lg:border-border lg:px-3 lg:hover:border-brand lg:aria-expanded:border-brand"
      >
        <SearchIcon size={18} />
        <span className="sr-only lg:not-sr-only">Search</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        // Below lg the button is not at the screen edge, so the panel is pinned
        // across the screen under the header instead of hanging off the button.
        className="fixed inset-x-4 top-[4.75rem] z-[60] rounded-[8px] bg-surface-subtle p-5 shadow-raised lg:absolute lg:inset-x-auto lg:top-[calc(100%+0.75rem)] lg:right-0 lg:w-[22rem]"
      >
        <form role="search" onSubmit={onSubmit}>
          <label htmlFor={inputId} className="sr-only">
            Search the XLRI Delhi-NCR website
          </label>
          <div className="relative">
            <input
              ref={input}
              id={inputId}
              type="search"
              autoComplete="off"
              enterKeyHint="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              placeholder="Search"
              className="h-11 w-full rounded-[6px] border-[1.5px] border-ink-strong bg-surface pr-11 pl-4 text-[0.9375rem] text-ink-strong placeholder:text-ink-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/25 [&::-webkit-search-cancel-button]:hidden"
            />
            <button
              type="button"
              onClick={() => {
                if (query) {
                  setQuery('');
                  input.current?.focus();
                } else {
                  close(true);
                }
              }}
              aria-label={query ? 'Clear search' : 'Close search'}
              className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center text-ink-muted transition-colors duration-300 hover:text-ink-strong"
            >
              <CloseIcon size={22} />
            </button>
          </div>
        </form>

        {/* As on the institute site, the heading stays "Key Searches" while
            typing; the count is announced to screen readers only. */}
        <p className="mt-4 text-[0.8125rem] font-semibold text-ink-strong">Key Searches</p>
        <p aria-live="polite" className="sr-only">
          {phrase
            ? results.length > 0
              ? `${results.length} ${results.length === 1 ? 'result' : 'results'}`
              : `No results for “${query.trim()}”`
            : ''}
        </p>

        {list.length > 0 ? (
          <ul className="scroll-slim mt-1.5 max-h-[min(13.5rem,50vh)] overflow-y-auto overscroll-contain pr-3">
            {list.map((entry) => (
              <li key={entry.id}>
                <Result
                  entry={entry}
                  marks={marks}
                  onNavigate={() => {
                    close(false);
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1.5 py-2 text-sm text-ink-muted">No results found</p>
        )}
      </div>
    </div>
  );
}

function Result({
  entry,
  marks,
  onNavigate,
}: {
  entry: SearchEntry;
  marks: readonly string[];
  onNavigate: () => void;
}) {
  const body = (
    <>
      {highlight(entry.title, marks)}
      {entry.kind === 'elsewhere' ? (
        <ExternalIcon size={12} aria-hidden="true" className="ml-1.5 inline-block align-baseline" />
      ) : null}
    </>
  );

  const className =
    'block py-2 text-[0.9375rem] leading-snug text-brand underline-offset-[3px] transition-colors duration-200 hover:text-brand-950 hover:underline focus-visible:underline';

  if (entry.kind === 'elsewhere') {
    return (
      <a
        href={entry.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={className}
      >
        {body}
        <span className="sr-only"> (opens {entry.destination ?? 'another site'} in a new tab)</span>
      </a>
    );
  }
  return (
    <NextLink href={entry.href} onClick={onNavigate} className={className}>
      {body}
    </NextLink>
  );
}

/** A button anywhere on the page that opens the header search (the 404 page). */
export function OpenSearchButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));
      }}
    >
      {children}
    </button>
  );
}
