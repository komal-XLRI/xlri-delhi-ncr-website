'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Progressive enhancement for the mobile navigation.
 *
 * The sheet itself is a native `<details>` element rendered on the server (see
 * `MobileNavSheet` in `site-header.tsx`). It opens, closes, and is fully
 * keyboard operable with **no JavaScript at all** — which matters more than it
 * first appears:
 *
 *   • With JS disabled, a phone visitor still has the whole navigation. An
 *     earlier version of this component rendered the sheet only when React
 *     state said it was open, which meant no-JS mobile visitors had no
 *     navigation whatsoever while the code claimed otherwise.
 *   • Before hydration — the first seconds on a slow connection — tapping the
 *     menu works immediately rather than doing nothing.
 *
 * This component adds only what the platform does not give us for free:
 * scroll locking, `inert` on the rest of the page, focus management, Escape to
 * close, and closing on navigation. If it never loads, nothing is broken.
 */
export function MobileNavEnhancer({ detailsId }: { detailsId: string }) {
  const pathname = usePathname();
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const details = document.getElementById(detailsId);
    if (!(details instanceof HTMLDetailsElement)) return;

    const summary = details.querySelector('summary');

    const lock = () => {
      const { body, documentElement } = document;
      const previousOverflow = body.style.overflow;
      const previousPadding = body.style.paddingRight;

      // Compensate for the scrollbar so the page behind does not jump.
      const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
      body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

      // Everything that is not the header becomes inert, so focus and
      // screen-reader browsing cannot wander behind the sheet.
      const outside = Array.from(body.children).filter((element) => !element.contains(details));
      for (const element of outside) element.setAttribute('inert', '');

      cleanupRef.current = () => {
        body.style.overflow = previousOverflow;
        body.style.paddingRight = previousPadding;
        for (const element of outside) element.removeAttribute('inert');
        cleanupRef.current = null;
      };
    };

    const onToggle = () => {
      if (details.open) {
        lock();
      } else {
        cleanupRef.current?.();
        // Focus returns to the summary rather than the top of the document.
        if (summary instanceof HTMLElement) summary.focus();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && details.open) {
        details.open = false;
        onToggle();
      }
    };

    details.addEventListener('toggle', onToggle);
    document.addEventListener('keydown', onKeyDown);

    // The element may already be open — a no-JS visitor who enables JS, or a
    // browser restoring the open state on back-navigation.
    if (details.open) lock();

    return () => {
      details.removeEventListener('toggle', onToggle);
      document.removeEventListener('keydown', onKeyDown);
      cleanupRef.current?.();
    };
  }, [detailsId]);

  // Close on navigation. The <details> is not React-controlled, so this reaches
  // for the DOM directly rather than mirroring its state.
  useEffect(() => {
    const details = document.getElementById(detailsId);
    if (details instanceof HTMLDetailsElement && details.open) {
      details.open = false;
      cleanupRef.current?.();
    }
  }, [pathname, detailsId]);

  return null;
}
