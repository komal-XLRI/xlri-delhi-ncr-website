import NextLink from 'next/link';
import type { AriaAttributes, MouseEventHandler, ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { classifyHref, destinationLabel, isOffsite } from '@/lib/url';

/**
 * The one way to link.
 *
 * Two things it guarantees that hand-written anchors do not:
 *
 * 1. Internal links route through `next/link` (client navigation, prefetch),
 *    while offsite links render a plain anchor. Getting this wrong either breaks
 *    routing or ships a full page reload for in-site navigation.
 *
 * 2. Offsite links are *marked*. Per §16 F1 a large share of high-intent
 *    journeys — admissions, XAT, giving, alumni — leave for other XLRI
 *    properties. Sending someone to a different system with no signal is a small
 *    betrayal of trust, and WCAG 3.2.5 asks that a change of context be
 *    predictable. Sighted users get an arrow glyph; screen-reader users get the
 *    destination host appended to the accessible name.
 *
 * The prop surface is deliberately curated rather than extending
 * `AnchorHTMLAttributes`. A design-system link that forwards 280 DOM attributes
 * is not a component, it is an anchor with extra steps — and the narrow surface
 * keeps it compatible with `exactOptionalPropertyTypes`.
 */
const variants = {
  /** Inline within prose. Underlined by default — colour alone is never the signal. */
  inline: 'text-brand hover:text-brand-hover underline underline-offset-[3px] decoration-1',
  /** Standalone navigational link. Underline appears on hover. */
  standalone:
    'text-brand hover:text-brand-hover no-underline hover:underline underline-offset-[3px] decoration-1',
  /** Inherits colour — for links wrapping a whole card or nav item. */
  bare: 'text-inherit no-underline',
} as const;

export interface LinkProps {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  /**
   * The site's own origin, used to classify the href. Passed in rather than
   * imported so this component stays in the domain-free `components` layer (§7)
   * — it is not permitted to reach `config/`.
   */
  siteUrl: string;
  /** Suppress the offsite affordance where surrounding UI already conveys it. */
  hideOffsiteIndicator?: boolean;
  className?: string;
  id?: string;
  title?: string;
  'aria-label'?: string;
  'aria-current'?: AriaAttributes['aria-current'];
  'aria-describedby'?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function Link({
  href,
  children,
  variant = 'inline',
  siteUrl,
  hideOffsiteIndicator = false,
  className,
  id,
  title,
  onClick,
  ...aria
}: LinkProps) {
  const kind = classifyHref(href, siteUrl);
  const classes = cn(variants[variant], 'rounded-xs transition-colors duration-150', className);

  // Built conditionally: under `exactOptionalPropertyTypes` an explicit
  // `undefined` is not the same as an absent property.
  const shared = {
    className: classes,
    ...(id ? { id } : {}),
    ...(title ? { title } : {}),
    ...(onClick ? { onClick } : {}),
    ...(aria['aria-label'] ? { 'aria-label': aria['aria-label'] } : {}),
    ...(aria['aria-current'] ? { 'aria-current': aria['aria-current'] } : {}),
    ...(aria['aria-describedby'] ? { 'aria-describedby': aria['aria-describedby'] } : {}),
  };

  if (!isOffsite(kind)) {
    return (
      <NextLink href={href} {...shared}>
        {children}
      </NextLink>
    );
  }

  const destination = destinationLabel(href);

  return (
    <a
      href={href}
      // noopener/noreferrer regardless of target: it costs nothing and forecloses
      // a whole class of tab-nabbing mistakes if someone later adds target.
      rel="noopener noreferrer"
      {...shared}
    >
      {children}
      {hideOffsiteIndicator ? null : (
        <>
          <span aria-hidden="true" className="ml-1 inline-block align-baseline text-[0.8em]">
            ↗
          </span>
          {destination ? <span className="sr-only"> (opens {destination})</span> : null}
        </>
      )}
    </a>
  );
}
