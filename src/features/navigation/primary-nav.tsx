'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

import { ChevronDownIcon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

/**
 * The mega-menu controller — the only client boundary in the header.
 *
 * Panel content arrives as a server-rendered `ReactNode` on each item, so none
 * of that markup enters the JavaScript bundle (§8.2). This component owns
 * behaviour only: which panel is open, and the interaction rules around it.
 *
 * ## Semantics: disclosure navigation, not a menubar
 *
 * This deliberately does **not** use `role="menubar"` / `role="menuitem"`. That
 * is the most common and most damaging mistake in mega-menu implementations.
 * Menubar semantics are for application menus — think a desktop app's File
 * menu. Applying them to site navigation removes the links from a screen
 * reader's links list, hijacks the arrow keys away from their normal browsing
 * behaviour, and makes the menu *harder* to use with assistive technology than
 * plain markup would have been.
 *
 * Instead it follows the WAI-ARIA APG **disclosure navigation** pattern:
 *
 *   • trigger: `<button aria-expanded aria-controls>`
 *   • panel:   a labelled `<div role="group">` containing ordinary `<ul><li><a>`
 *   • headings inside the panel are real `<h3>` elements
 *
 * ## Triggers are buttons, not links
 *
 * A primary item with children renders as a `<button>` that opens its panel,
 * and the section landing page appears as the first link *inside* the panel
 * ("Overview", "All Programmes"). This resolves the touch ambiguity that a
 * link-plus-panel creates — where a tap must somehow mean both "open" and
 * "navigate" — without resorting to pointer-type sniffing and a
 * tap-twice convention that nothing on the web teaches users.
 */

export interface PrimaryNavEntry {
  id: string;
  label: string;
  href?: string;
  /** Server-rendered panel. Absent for items with no children. */
  panel?: ReactNode;
}

/** Intent delay: long enough to ignore a pointer crossing the bar diagonally. */
const OPEN_DELAY_MS = 100;
/** Grace period: long enough to travel from the trigger into the panel. */
const CLOSE_DELAY_MS = 200;

export function PrimaryNav({ items }: { items: PrimaryNavEntry[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleOpen = useCallback(
    (id: string) => {
      clearTimer();
      // Switching between triggers while a panel is already open should feel
      // immediate; only the first open pays the intent delay.
      timerRef.current = setTimeout(
        () => {
          setOpenId(id);
        },
        openId ? 0 : OPEN_DELAY_MS,
      );
    },
    [clearTimer, openId],
  );

  const scheduleClose = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      setOpenId(null);
    }, CLOSE_DELAY_MS);
  }, [clearTimer]);

  const closeNow = useCallback(() => {
    clearTimer();
    setOpenId(null);
  }, [clearTimer]);

  /*
   * Close on route change — otherwise the panel stays open over the new page.
   *
   * Adjusted during render rather than in an effect. This is React's documented
   * pattern for resetting state when a prop changes: the re-render happens
   * before the browser paints, so there is no flash of an open panel over new
   * content, and no cascading second render pass. An effect would produce both.
   */
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenId(null);
  }

  useEffect(() => clearTimer, [clearTimer]);

  // Click outside, and Escape anywhere.
  useEffect(() => {
    if (!openId) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) closeNow();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      // Return focus to the trigger that opened the panel — otherwise focus is
      // stranded inside a container that has just been hidden.
      const trigger = document.getElementById(`nav-trigger-${openId}`);
      closeNow();
      trigger?.focus();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openId, closeNow]);

  /**
   * Tabbing out of the navigation closes the panel. `relatedTarget` is the
   * element receiving focus, so this fires only when focus genuinely leaves —
   * moving between links inside the panel does not close it.
   */
  const onBlurCapture = (event: React.FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    if (next && navRef.current?.contains(next)) return;
    closeNow();
  };

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      /*
       * Deliberately NOT `relative`. Panels are absolutely positioned and must
       * span the full viewport width (the brief calls for a full-width
       * dropdown), so the positioning context is the full-width wrapper in
       * site-header.tsx. Making the nav itself the context would clip every
       * panel to the width of the centred menu.
       *
       * Pointer and focus handling are unaffected: each panel is still a DOM
       * descendant of this element, so `pointerleave` does not fire when the
       * pointer moves into a panel, and `contains()` still recognises it.
       */
      onBlurCapture={onBlurCapture}
      onPointerLeave={() => {
        if (openId) scheduleClose();
      }}
    >
      <ul className="flex items-stretch">
        {items.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `nav-panel-${item.id}`;

          if (!item.panel) {
            return (
              <li key={item.id}>
                <NextLink
                  href={item.href ?? '#'}
                  className="inline-flex h-full items-center border-b-[3px] border-transparent px-3 py-5 text-sm font-medium text-nav-ink transition-colors duration-200 hover:border-nav-indicator hover:text-nav-ink-hover xl:px-2.5 xl:whitespace-nowrap"
                  onPointerEnter={closeNow}
                >
                  {item.label}
                </NextLink>
              </li>
            );
          }

          return (
            <li key={item.id}>
              <button
                type="button"
                id={`nav-trigger-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  clearTimer();
                  setOpenId(isOpen ? null : item.id);
                }}
                onPointerEnter={(event) => {
                  // Touch and pen open on tap via onClick; hover-intent is a
                  // mouse affordance and would otherwise fire spuriously.
                  if (event.pointerType === 'mouse') scheduleOpen(item.id);
                }}
                className={cn(
                  // Ten items since Centres and Sustainability were promoted (D4
                  // revisited). From `xl` up every label holds one line at 10px a
                  // side: ~1,216px for the whole bar, measured. At 12px it was
                  // 1,256px and ran to within 12px of the screen edge at 1280.
                  // Between `lg` and `xl` the two-word labels wrap to two lines,
                  // as they could before.
                  'inline-flex h-full items-center gap-1.5 px-3 py-5 text-sm font-medium xl:px-2.5 xl:whitespace-nowrap',
                  // A rule along the bottom edge that fills in on hover and turns
                  // accent green when the panel opens. On the dark field the
                  // accent finally has somewhere legal to live: 6.45:1 here
                  // against 1.74:1 on white.
                  'border-b-[3px] transition-colors duration-200',
                  isOpen
                    ? 'border-nav-indicator text-nav-ink'
                    : 'border-transparent text-nav-ink hover:border-nav-indicator hover:text-nav-ink-hover',
                )}
              >
                {item.label}
                <ChevronDownIcon
                  size={14}
                  className={cn(
                    'text-nav-ink/60 transition-transform duration-200',
                    isOpen && 'rotate-180 text-nav-indicator',
                  )}
                />
              </button>

              {/*
                The panel is always in the DOM. `hidden` keeps it out of the
                accessibility tree and out of the tab order when closed, while
                its links remain in the HTML for crawlers and for no-JS use —
                where the mobile navigation's `<details>` fallback takes over.

                Absolutely positioned, so opening never reflows the page: the
                CLS contribution is exactly zero.
              */}
              <div
                id={panelId}
                role="group"
                aria-labelledby={`nav-trigger-${item.id}`}
                hidden={!isOpen}
                data-mega-panel=""
                data-open={isOpen ? 'true' : 'false'}
                onPointerEnter={clearTimer}
                className="absolute inset-x-0 top-full z-40"
              >
                {item.panel}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
