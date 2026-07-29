import Image from 'next/image';
import NextLink from 'next/link';

import { accreditations, type AccreditationMark } from '@/config/brand';
import { cn } from '@/lib/cn';

/**
 * Accreditation marks.
 *
 * These now sit in the header's first layer, as the original brief specified:
 * XLRI wordmark on the left, accreditation logos on the right. Triple-crown
 * accreditation — AACSB, AMBA, EQUIS — is a genuine differentiator for a
 * business school, and putting it in the masthead states it immediately rather
 * than asking a visitor to scroll to the footer for it.
 *
 * The earlier concern (§2.3) was that multicolour logos at small sizes read as
 * noise beside the wordmark. That is handled by sizing rather than by hiding
 * them: they are small, generously spaced, separated from the wordmark by a
 * hairline, and hidden below the medium breakpoint where there is no room.
 */

/** Display width implied by the mark's aspect ratio and its chosen height. */
function displayWidth(mark: AccreditationMark, height: number): number {
  return Math.round((mark.width / mark.height) * height);
}

/**
 * Header treatment: the real marks, small.
 *
 * Heights are per-mark rather than shared, because these are different kinds of
 * lockup — AACSB and AMBA are single-line horizontal marks, EQUIS is stacked
 * (graphic above two lines of type). At equal height EQUIS's wordmark comes out
 * roughly half the size of the others. See `displayHeight` in config/brand.ts.
 *
 * The scale factor keeps that optical relationship intact while fitting the
 * masthead, where the marks need to be smaller than they were in the footer.
 */
export function AccreditationLogos({
  className,
  scale = 0.8,
}: {
  className?: string;
  scale?: number;
}) {
  return (
    <NextLink
      href="/about/accreditation"
      className={cn(
        'group flex items-center gap-6 rounded-xs',
        // The link exists to explain the marks; it should not add visual weight.
        'transition-opacity duration-150 hover:opacity-80',
        className,
      )}
    >
      <span className="sr-only">
        Accredited by {accreditations.map((mark) => mark.name).join(', ')} — read about our
        accreditation
      </span>
      {accreditations.map((mark) => {
        const height = Math.round(mark.displayHeight * scale);
        return (
          <Image
            key={mark.id}
            src={mark.src}
            // Decorative here: the link's own accessible name already lists the
            // marks, so alt text would repeat all three.
            alt=""
            width={displayWidth(mark, height)}
            height={height}
            quality={90}
          />
        );
      })}
    </NextLink>
  );
}

/**
 * Larger treatment with the marks at full size, for a dedicated accreditation
 * section or the About page. Not used in the header or footer.
 */
export function AccreditationStrip({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-10 gap-y-6', className)}>
      {accreditations.map((mark) => (
        <Image
          key={mark.id}
          src={mark.src}
          // Standalone here, so each mark carries its own name. The acronym alone
          // means nothing to a screen reader; the full name is the signal.
          alt={mark.fullName}
          width={displayWidth(mark, mark.displayHeight)}
          height={mark.displayHeight}
          quality={90}
        />
      ))}
    </div>
  );
}
