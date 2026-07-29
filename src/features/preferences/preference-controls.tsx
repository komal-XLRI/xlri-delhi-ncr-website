'use client';

import { useSyncExternalStore } from 'react';

import { cn } from '@/lib/cn';
import {
  CONTRAST_ATTR,
  TEXT_SIZE_ATTR,
  TEXT_SIZE_KEY,
  TEXT_SIZE_LABELS,
  TEXT_SIZES,
  type TextSize,
} from '@/features/preferences/preferences';

/**
 * Text-size and high-contrast controls (GIGW, §11.2).
 *
 * One of the very few client components on the site — a handful of buttons and
 * two `localStorage` writes — sitting in the utility bar where Indian
 * institutional visitors expect to find it.
 *
 * **The DOM is the store.** The preference lives in the `data-*` attributes on
 * `<html>`, which the pre-paint script sets before React exists and which CSS
 * reads directly. Rather than mirroring that into React state and syncing the
 * two — which invites the classic bug where the theme and the "active" button
 * disagree after navigation — this subscribes to the attributes with
 * `useSyncExternalStore`. There is no local state and no effect: a
 * `MutationObserver` on two attributes of one element is the entire mechanism,
 * and anything else that changes the preference keeps the buttons correct for
 * free.
 *
 * **Hidden without JavaScript.** `.js-only` stays `display: none` until the
 * pre-paint script stamps `data-js`, so a no-JS visitor is never offered a
 * control that cannot work. Because that script runs before first paint, there
 * is no flash and no layout shift either way.
 *
 * **Toggle buttons, not a radiogroup.** These take effect immediately with no
 * submit step, so `aria-pressed` models them accurately; a radiogroup would
 * imply a pending selection.
 *
 * **The high-contrast toggle was removed from the header** to keep the masthead
 * uncluttered. Everything behind it is intact — the `data-contrast` attribute,
 * the full high-contrast token set in `styles/theme.css`, the pre-paint restore
 * script, and the tests that hold that theme to AAA. Re-enabling is a button,
 * not a rebuild. The site meets AA/AAA contrast without it, so this is not a
 * conformance question; GIGW checklists do commonly expect the control, which
 * is why the machinery stays.
 */

/** Watch the two preference attributes on `<html>`. */
function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [TEXT_SIZE_ATTR, CONTRAST_ATTR],
  });
  return () => {
    observer.disconnect();
  };
}

function readTextSize(): TextSize {
  const value = document.documentElement.getAttribute(TEXT_SIZE_ATTR);
  return value === 'large' || value === 'x-large' ? value : 'default';
}

/**
 * Server snapshot. The server cannot know a per-visitor preference, so it
 * renders the default and the client corrects on hydration. The controls are
 * invisible until `data-js` is set, so nothing visibly changes.
 */
const serverTextSize = (): TextSize => 'default';

function persist(key: string, value: string, isDefault: boolean) {
  try {
    if (isDefault) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Private mode or a restrictive enterprise policy. The preference still
    // applies to this page view; it just will not survive a reload.
  }
}

export function PreferenceControls({ className }: { className?: string }) {
  const textSize = useSyncExternalStore(subscribe, readTextSize, serverTextSize);

  function applyTextSize(next: TextSize) {
    const root = document.documentElement;
    if (next === 'default') root.removeAttribute(TEXT_SIZE_ATTR);
    else root.setAttribute(TEXT_SIZE_ATTR, next);
    persist(TEXT_SIZE_KEY, next, next === 'default');
  }

  return (
    <div className={cn('js-only items-center gap-4', className)}>
      <div className="flex items-center gap-1">
        {/* <span className="sr-only text-ink-muted sm:not-sr-only sm:text-2xs">Text size</span> */}
        <div className="flex items-center gap-0.5" role="group" aria-label="Text size">
          {TEXT_SIZES.map((size) => {
            const active = textSize === size;
            return (
              <button
                key={size}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  applyTextSize(size);
                }}
                className={cn(
                  'inline-flex h-8 min-w-8 items-center justify-center rounded-xs px-1.5',
                  'text-2xs font-medium transition-colors duration-150',
                  active
                    ? 'bg-brand text-ink-inverse'
                    : 'text-ink-muted hover:bg-surface-subtle hover:text-ink',
                )}
              >
                <span aria-hidden="true">{TEXT_SIZE_LABELS[size].short}</span>
                <span className="sr-only">{TEXT_SIZE_LABELS[size].full}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
