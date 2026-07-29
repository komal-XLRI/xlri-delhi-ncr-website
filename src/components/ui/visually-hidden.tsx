import type { ReactNode } from 'react';

/**
 * Content available to assistive technology but not visually rendered.
 *
 * Uses the clip-rect technique rather than `display: none` or `visibility:
 * hidden`, both of which remove content from the accessibility tree entirely and
 * so defeat the purpose.
 */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
