import Image from 'next/image';
import NextLink from 'next/link';

import { wordmark } from '@/config/brand';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';

/**
 * The masthead lockup.
 *
 * Rendered as `next/image` rather than inlined SVG on purpose. The full lockup
 * is 10.3 kB gzipped; inlining it would spend roughly 17% of the 60 kB HTML
 * budget on *every* page (docs/brand/README.md). As an image it is fetched once
 * and cached for the whole session.
 *
 * The mark alone, with no campus descriptor beside it. The site is identified as
 * Delhi-NCR by its domain, page titles, and footer, so the masthead does not
 * need to repeat it — and the mark reads better without a second element
 * competing beside it.
 *
 * The link carries the accessible name (`XLRI Delhi-NCR — home`), so the image
 * itself is `alt=""`: announcing both would repeat the institution's name twice
 * on every page.
 */
export function SiteWordmark({ className, height = 44 }: { className?: string; height?: number }) {
  const width = Math.round((wordmark.width / wordmark.height) * height);

  return (
    <NextLink
      href="/"
      className={cn('inline-flex items-center rounded-xs', className)}
      aria-label={`${site.name} — home`}
    >
      <Image
        src={wordmark.src}
        alt=""
        width={width}
        height={height}
        priority
        // Explicit dimensions keep the sticky header from shifting on load.
        style={{ width: 'auto', height: `${height}px` }}
      />
    </NextLink>
  );
}
