import { LoadingMark } from '@/components/ui/loading-mark';
import { wordmark } from '@/config/brand';
import { site } from '@/config/site';

/**
 * The route loading screen.
 *
 * ## When you will actually see this
 *
 * Next renders `loading.tsx` as the Suspense fallback while a route segment is
 * being prepared. **It will not appear on the homepage**, and that is not a
 * fault: every route in this project is statically prerendered, so there is
 * nothing to wait for. It exists for the routes that will suspend once the
 * content layer becomes a CMS in Phase 6 — a Payload query is a network round
 * trip, and that is the moment a reader needs to be told something is coming.
 *
 * It is also why this is `loading.tsx` and not a splash screen. A splash — an
 * overlay that covers the page on first load and hides itself when scripts
 * finish — would have to *delay* the content in order to be seen at all. On a
 * site whose whole rendering strategy is "the HTML is the page", that would be
 * spending the site's best quality to decorate its slowest moment. This costs
 * nothing when there is nothing to wait for.
 *
 * ## The ground is light, and that is a constraint rather than a preference
 *
 * The lockup is dark blue on transparent and has no reversed variant
 * (`docs/brand/README.md` lists one as outstanding). On the brand navy it would
 * be very nearly invisible. So the screen is the palest brand tint, which is
 * also the right instinct: a full-viewport dark panel between two white pages
 * is a flash, not a transition.
 *
 * ## Accessibility
 *
 * `role="status"` with `aria-live="polite"`, carrying real text that is
 * visually hidden. A screen-reader user is told the page is loading; everyone
 * else sees the mark. Without it this screen is, to a screen reader, a picture
 * of nothing.
 */
export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="loading-screen">
      <LoadingMark src={wordmark.src} width={wordmark.width} height={wordmark.height} />

      <p className="sr-only">Loading {site.name}</p>
    </div>
  );
}
