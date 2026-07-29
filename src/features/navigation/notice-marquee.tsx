import NextLink from 'next/link';

import { PauseIcon, PlayIcon } from '@/components/ui/icon';

import { notices, type Notice } from '@/config/notices';

/**
 * The notices ticker — Layer 3 of the header.
 *
 * A Server Component with **no JavaScript at all**, including its pause control.
 *
 * ## Why the pause control is not optional
 *
 * WCAG 2.2.2 (Pause, Stop, Hide) is unambiguous: any content that moves
 * automatically, starts automatically, and lasts more than five seconds must
 * offer a mechanism to pause, stop, or hide it. A ticker without one is a
 * conformance failure, not a stylistic choice — and under the GIGW commitment
 * (D9) that is a compliance defect rather than a nitpick.
 *
 * It matters practically too. Moving text is hard to read for anyone, and for
 * readers with dyslexia, ADHD, or vestibular disorders it can make the rest of
 * the page unusable while it runs.
 *
 * ## Why it uses a checkbox rather than a button
 *
 * A `<button onClick>` would need JavaScript, which means that between first
 * paint and hydration the ticker would be moving with no way to stop it. On a
 * slow connection that window is seconds long — precisely when a compliance
 * control needs to work.
 *
 * A checkbox plus a CSS sibling selector toggles `animation-play-state` with no
 * script, so the control works from the first frame. It is announced as
 * "Pause notices, checkbox" — plain, and honest about what it does.
 *
 * ## Other mitigations
 *
 *   • pauses on hover and on `:focus-within`, so a link is never a moving target
 *   • `prefers-reduced-motion` stops the animation entirely and turns the strip
 *     into an ordinary horizontally-scrollable list
 *   • the duplicated copy that makes the loop seamless is `aria-hidden`, so
 *     screen readers hear each notice once
 *   • the whole strip is a labelled region containing a real list of real links
 */

function NoticeItem({ notice }: { notice: Notice }) {
  return (
    <li className="flex shrink-0 items-center gap-2 px-6">
      {notice.isNew ? (
        <span className="rounded-xs bg-accent-surface px-1.5 py-0.5 text-2xs font-semibold text-ink-strong">
          New
        </span>
      ) : null}
      <NextLink
        href={notice.href}
        className="rounded-xs text-sm whitespace-nowrap text-ink underline-offset-4 hover:text-brand hover:underline"
      >
        {notice.label}
      </NextLink>
      {notice.date ? (
        <time dateTime={notice.date} className="text-2xs whitespace-nowrap text-ink-muted">
          {new Date(notice.date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
          })}
        </time>
      ) : null}
    </li>
  );
}

export function NoticeMarquee() {
  if (notices.length === 0) return null;

  const items = notices.map((notice) => <NoticeItem key={notice.id} notice={notice} />);

  return (
    <section aria-labelledby="notices-heading" className="border-t border-border bg-notice-surface">
      <div className="mx-auto flex w-full max-w-[80rem] items-center px-6 md:px-8 lg:px-12">
        <h2
          id="notices-heading"
          className="mr-5 shrink-0 py-2.5 text-2xs font-semibold tracking-widest text-notice-label uppercase"
        >
          Notices
        </h2>

        {/*
          Must precede the marquee: the CSS pause rule reaches it with a sibling
          combinator, which cannot select backwards.
        */}
        <input type="checkbox" id="pause-notices" className="notice-pause sr-only" />

        <div className="notice-marquee min-w-0 flex-1 py-2">
          <div className="notice-track">
            <ul className="flex items-center">{items}</ul>
            {/*
              Second copy exists only so the loop has no visible seam. Hidden
              from assistive technology so every notice is announced once, and
              removed entirely under reduced motion — with no animation running
              there is no seam to hide, and leaving it in would show every
              notice twice.

              `motion-reduce:hidden` rather than a rule in the components layer:
              Tailwind's utilities layer wins over components regardless of
              specificity, so a plain CSS override here would silently lose.
            */}
            <ul className="flex items-center motion-reduce:hidden" aria-hidden="true">
              {items}
            </ul>
          </div>
        </div>

        <label
          htmlFor="pause-notices"
          className="notice-pause-label ml-4 inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-xs text-ink-muted transition-colors hover:bg-surface hover:text-brand"
        >
          {/*
            Icon only. WCAG 2.2.2 requires a mechanism to pause content that
            moves automatically for more than five seconds, so this control
            cannot simply be deleted — but it does not need a text label to
            satisfy that, and the accessible names below keep it usable.
          */}
          <span className="notice-when-running">
            <PauseIcon size={14} />
            <span className="sr-only">Pause notices</span>
          </span>
          <span className="notice-when-paused">
            <PlayIcon size={14} />
            <span className="sr-only">Resume notices</span>
          </span>
        </label>
      </div>
    </section>
  );
}
