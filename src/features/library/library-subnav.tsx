'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';

import {
  ArrowRightIcon,
  BookIcon,
  ChevronDownIcon,
  CompassIcon,
  ExternalIcon,
  GlobeIcon,
  LandmarkIcon,
  SearchIcon,
  SparkIcon,
} from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { LibraryContent } from '@/types/library';

import type { LibraryNavGroup } from './library-nav';

const pad = (n: number) => String(n).padStart(2, '0');

/** A glyph per menu group, in `libraryNav` order: About, eResources, Access, More. */
const GROUP_ICONS = [LandmarkIcon, GlobeIcon, CompassIcon, SparkIcon] as const;

/**
 * The library's submenu: a bar under the site header on every library page,
 * staying in view as the page scrolls. Each group opens the whole menu — the
 * four columns of the "Explore the library" cards — with that group's column
 * picked out, and the page you are on marked. On phones one button opens the
 * same menu, stacked.
 *
 * Opens on hover (with a short grace period on the way out) and on click;
 * Escape or a click elsewhere closes it, and following a link closes it too.
 */
export function LibrarySubnav({
  groups,
  catalogue,
  title,
  subtitle,
  labels,
}: {
  groups: readonly LibraryNavGroup[];
  catalogue: string;
  /** The library's name and subtitle, beside its mark. */
  title: string;
  subtitle: string;
  labels: LibraryContent['nav'];
}) {
  const pathname = usePathname();
  const panelId = useId();
  const root = useRef<HTMLElement>(null);
  const leave = useRef<number | undefined>(undefined);
  /** The open group's index, or null when the menu is shut. */
  const [open, setOpen] = useState<number | null>(null);

  const home = pathname === routes.campusLife.library;
  const currentGroup = groups.findIndex((group) =>
    group.links.some((link) => link.href === pathname),
  );
  const currentLink = groups.flatMap((group) => group.links).find((l) => l.href === pathname);
  const feature = groups[open ?? 0];

  useEffect(() => {
    if (open === null) return;
    const node = root.current;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(null);
      // The trigger that is showing: the group button, or the phone button.
      [...(node?.querySelectorAll<HTMLButtonElement>('[aria-expanded="true"]') ?? [])]
        .find((button) => button.offsetParent !== null)
        ?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (node && !node.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(leave.current), []);

  /*
   * Stick flush under the site header. `--header-height` is an estimate for
   * scroll-padding; the header's real height (its notice row included) is
   * measured here, and kept up to date as text size or width changes it.
   */
  useEffect(() => {
    const node = root.current;
    const header = document.querySelector<HTMLElement>('.site-header');
    if (!node || !header) return;
    const sync = () => {
      node.style.setProperty('--subnav-top', `${String(header.offsetHeight)}px`);
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(header);
    return () => {
      observer.disconnect();
    };
  }, []);

  /** Hover only where there is a mouse; touch taps arrive as clicks. */
  const hover = (index: number | null) => (event: React.PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    window.clearTimeout(leave.current);
    if (index === null) {
      leave.current = window.setTimeout(() => {
        setOpen(null);
      }, 180);
    } else {
      setOpen(index);
    }
  };

  const toggle = (index: number) => {
    setOpen((value) => (value === index ? null : index));
  };

  const close = () => {
    setOpen(null);
  };

  return (
    <nav
      ref={root}
      aria-label="Library"
      onPointerLeave={hover(null)}
      className="library-subnav sticky top-[var(--subnav-top,var(--header-height))] z-40 border-b border-border bg-surface/95 shadow-[0_10px_24px_-18px_rgb(10_37_84/0.4)] backdrop-blur-md"
    >
      {/* A brand-to-lime hairline, so the bar reads as the library's own. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-brand via-brand to-accent-surface"
      />
      <div className="mx-auto flex h-16 w-full max-w-[80rem] items-center gap-4 px-6 md:px-8 lg:px-12">
        <Link
          href={routes.campusLife.library}
          aria-current={home ? 'page' : undefined}
          onClick={close}
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="flex size-10 items-center justify-center rounded-[8px] bg-brand text-accent-surface shadow-[0_6px_14px_-6px_rgb(10_37_84/0.5)] transition-[rotate,background-color] duration-500 ease-out group-hover:bg-brand-950 motion-safe:group-hover:-rotate-6">
            <BookIcon size={18} aria-hidden="true" />
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-xl leading-none text-brand transition-colors duration-300 group-hover:text-brand-950">
              {title}
            </span>
            <span className="mt-1 hidden text-[0.625rem] font-semibold tracking-[0.16em] text-ink-muted uppercase sm:block">
              {subtitle}
            </span>
          </span>
        </Link>

        <span aria-hidden="true" className="hidden h-8 w-px bg-border lg:block" />

        {/* Group triggers, lg and up: pills on a soft track. */}
        <ul className="hidden items-center gap-0.5 rounded-full border border-border bg-surface-subtle p-1 lg:flex">
          {groups.map((group, index) => {
            const expanded = open === index;
            const here = currentGroup === index;
            const Glyph = GROUP_ICONS[index];
            return (
              <li key={group.label}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => {
                    toggle(index);
                  }}
                  onPointerEnter={hover(index)}
                  className={`relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-[0.9375rem] font-semibold transition-[background-color,color,box-shadow] duration-300 ${
                    expanded
                      ? 'bg-brand text-white shadow-[0_6px_14px_-6px_rgb(10_37_84/0.55)]'
                      : here
                        ? 'bg-surface text-brand shadow-sm'
                        : 'text-ink-strong hover:bg-surface hover:text-brand'
                  }`}
                >
                  {Glyph ? (
                    <Glyph
                      size={15}
                      aria-hidden="true"
                      className={`hidden xl:block ${expanded ? 'text-accent-surface' : 'text-accent-700'}`}
                    />
                  ) : null}
                  {group.label}
                  <ChevronDownIcon
                    size={14}
                    aria-hidden="true"
                    className={`transition-transform duration-300 ${expanded ? 'rotate-180 text-accent-surface' : 'text-ink-muted'}`}
                  />
                  {here && !expanded ? (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent-surface"
                    />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>

        <a
          href={catalogue}
          target="_blank"
          rel="noopener noreferrer"
          className="group ml-auto hidden items-center gap-2 rounded-full bg-brand py-2 pr-5 pl-4 text-sm font-semibold text-white shadow-[0_6px_14px_-6px_rgb(10_37_84/0.55)] transition-colors duration-300 hover:bg-brand-950 xl:inline-flex"
        >
          <SearchIcon
            size={15}
            aria-hidden="true"
            className="text-accent-surface transition-transform duration-300 group-hover:scale-110"
          />
          {labels.searchCatalogue}
          <span className="sr-only"> (OPAC, on the campus network; opens in a new tab)</span>
        </a>

        {/* One button, below lg. */}
        <button
          type="button"
          aria-expanded={open !== null}
          aria-controls={panelId}
          onClick={() => {
            toggle(Math.max(currentGroup, 0));
          }}
          className="ml-auto flex min-w-0 cursor-pointer items-center gap-2 rounded-full border border-border bg-surface-subtle px-4 py-2 text-sm font-semibold text-brand aria-expanded:border-brand aria-expanded:bg-brand aria-expanded:text-white lg:hidden"
        >
          <span className="truncate">{currentLink?.label ?? labels.menuButton}</span>
          <ChevronDownIcon
            size={14}
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-300 ${open !== null ? 'rotate-180 text-accent-surface' : 'text-accent-700'}`}
          />
        </button>
      </div>

      {/*
        The menu: on wide screens a blue feature card for the open group beside
        all four groups as columns, the open one tinted; on phones the columns
        stack.
      */}
      <div
        id={panelId}
        hidden={open === null}
        onPointerEnter={() => {
          window.clearTimeout(leave.current);
        }}
        className="library-subnav-panel absolute inset-x-0 top-full max-h-[calc(100dvh-var(--subnav-top,var(--header-height))-4rem)] overflow-y-auto border-t border-border bg-surface shadow-[0_28px_48px_-28px_rgb(10_37_84/0.5)]"
      >
        <div className="mx-auto grid w-full max-w-[80rem] grid-cols-1 gap-6 px-6 py-6 md:px-8 lg:gap-8 lg:px-12 lg:py-8 xl:grid-cols-[14rem_minmax(0,1fr)]">
          <div className="relative hidden min-h-[17rem] flex-col overflow-hidden rounded-[12px] bg-brand p-6 text-white xl:flex">
            {/* The lime triangle of the site's motif, in the corner. */}
            <span
              aria-hidden="true"
              className="absolute -right-4 -bottom-4 size-28 bg-accent-surface [clip-path:polygon(100%_0,100%_100%,0_100%)]"
            />
            <p className="text-xs font-semibold tracking-[0.18em] text-accent-surface uppercase">
              {labels.menuCounter} · {pad((open ?? 0) + 1)}/{pad(groups.length)}
            </p>
            <div key={open} className="rise-in">
              <p className="mt-4 font-serif text-[1.75rem] leading-tight">{feature?.label}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/80">{feature?.note}</p>
            </div>
            <p className="relative mt-auto pt-8 text-sm text-white/75">
              <span className="font-serif text-3xl text-white tabular-nums">
                {feature?.links.length}
              </span>{' '}
              {feature?.links.length === 1 ? labels.linkCount.one : labels.linkCount.other}
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2">
            {groups.map((group, index) => {
              const picked = open === index;
              const Glyph = GROUP_ICONS[index];
              return (
                <li
                  key={group.label}
                  onPointerEnter={hover(index)}
                  className={`relative rounded-[10px] p-4 transition-colors duration-300 max-lg:border max-lg:border-border lg:p-5 xl:p-4 ${picked ? 'bg-brand-50' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-[8px] transition-colors duration-300 ${picked ? 'bg-brand text-accent-surface' : 'bg-brand-50 text-brand'}`}
                    >
                      {Glyph ? <Glyph size={16} aria-hidden="true" /> : null}
                    </span>
                    <p className="font-serif text-lg leading-tight text-ink-strong lg:text-[1.0625rem]">
                      {group.label}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted lg:hidden">
                    {group.note}
                  </p>
                  <span
                    aria-hidden="true"
                    className={`mt-4 block h-[2px] w-10 origin-left bg-accent-surface transition-transform duration-500 ease-out ${picked ? 'scale-x-100' : 'scale-x-50'}`}
                  />
                  <ul className="mt-3 flex flex-col gap-0.5">
                    {group.links.map((link) => {
                      const active = link.href === pathname;
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            aria-current={active ? 'page' : undefined}
                            onClick={close}
                            {...(link.external
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                            className={`group/link -mx-2 flex items-center justify-between gap-3 rounded-[6px] px-2 py-2 text-[0.9375rem] font-semibold transition-[background-color,color,box-shadow] duration-300 ${
                              active
                                ? 'bg-brand text-white shadow-sm'
                                : `text-ink-strong hover:text-brand hover:shadow-sm ${picked ? 'hover:bg-surface' : 'hover:bg-brand-50'}`
                            }`}
                          >
                            <span>
                              {link.label}
                              {link.external ? (
                                <span className="block text-xs font-normal text-ink-muted">
                                  {link.external}
                                </span>
                              ) : null}
                            </span>
                            {link.external ? (
                              <>
                                <ExternalIcon
                                  size={13}
                                  aria-hidden="true"
                                  className="shrink-0 text-accent-700"
                                />
                                <span className="sr-only"> (opens in a new tab)</span>
                              </>
                            ) : (
                              <ArrowRightIcon
                                size={14}
                                aria-hidden="true"
                                className={`shrink-0 transition-[translate,opacity] duration-300 group-hover/link:translate-x-0.5 group-hover/link:opacity-100 ${active ? 'text-accent-surface' : 'text-accent-700 opacity-50'}`}
                              />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
