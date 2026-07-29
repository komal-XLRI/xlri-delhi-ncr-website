import { Link } from '@/components/ui/link';
import { POLICY_NAV, PRIMARY_NAV, UTILITY_NAV } from '@/config/navigation';
import { site } from '@/config/site';

/**
 * Site footer — derived from the same navigation tree as the header (§8.1).
 *
 * This is the third of the tree's six consumers, and the reason the data-driven
 * model earns its keep: the footer sitemap cannot drift out of sync with the
 * menu, because there is nothing to keep in sync.
 *
 * ## What the redesign fixed
 *
 * The previous footer measured **917px** — taller than most of the sections
 * above it — and roughly half of that was empty navy. Three things caused it:
 *
 *  1. **An orphaned identity block.** The wordmark, legal name and institute
 *     link sat alone in a full-width row with Quick Links and Policies pushed to
 *     the far right, leaving ~450px of bare ground between them.
 *  2. **Policies as a vertical column.** Nine GIGW-mandated links stacked one
 *     per line set the height of the entire lower half on their own.
 *  3. **Eight nav groups in a four-column grid**, wrapping to two rows of
 *     uneven height with the gaps that implies.
 *
 * Now the identity is the first column *of the same grid* as the sitemap, so
 * there is no orphan row; the audience links run inline on one rule; and the
 * policies run inline in the bottom bar. Same links, no losses — the count is
 * unchanged.
 *
 * ## The obligation this carries
 *
 * The GIGW policy links (§11.2) appear on every page. Laying them out
 * horizontally is a presentation change, not a reduction: all nine are still
 * here, still real links, still in the document.
 *
 * (An earlier version of this note claimed the footer also carried a
 * full-colour accreditation strip. It does not, and has not since the marks
 * moved to the header's first layer.)
 */
export function SiteFooter() {
  return (
    <footer className="footer-band mt-auto text-ink-inverse">
      <div className="mx-auto w-full max-w-[80rem] px-6 py-14 md:px-8 md:py-16 lg:px-12">
        {/* ================= identity + sitemap ================= */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/*
            The identity, as the first column of the grid rather than a row of
            its own above it. That single change is most of the height saving:
            as a row it had a full measure to itself and used a third of it.
          */}
          <div className="lg:col-span-3">
            {/*
              Set in type, not the wordmark.

              I tried `brightness-0 invert` on the positive artwork first. It
              does turn the mark white — including the shield, which is a blue
              field carrying a white cross, so the whole emblem flattened into a
              featureless white rectangle. The detail that makes it a crest was
              gone.

              `docs/brand/README.md` lists a reversed lockup as an outstanding
              asset, and until one exists the honest treatment is the
              institution's name in its own serif. A filtered logo is not a
              reversed logo; it is a damaged one.
            */}
            <p className="font-serif text-2xl leading-tight text-ink-inverse">{site.name}</p>
            <p className="mt-3 max-w-[22rem] text-sm leading-relaxed text-ink-inverse/70">
              {site.legalName}
            </p>

            <Link
              href={site.parentOrganization.url}
              siteUrl={site.url}
              variant="bare"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink-inverse/85 underline decoration-accent-surface decoration-2 underline-offset-4 hover:text-ink-inverse"
            >
              Visit the institute site
            </Link>

            {/*
              The audience shortcuts live here rather than in a full-width row
              of their own. The identity column is three of twelve beside a
              two-row sitemap, so it had roughly 250px of empty ground beneath
              it; these five links fill it, and removing the separate row takes
              its divider and margins with it.
            */}
            <h2 className="mt-9 text-2xs font-semibold tracking-[0.22em] text-ink-inverse/55 uppercase">
              For
            </h2>
            {/*
              Inline and wrapped below `lg`, stacked above it. Five audience
              links as a column cost five lines of a phone screen to say what
              two wrapped lines say; on a desktop the column has room and reads
              better beside the sitemap.
            */}
            {/*
              Wrapped and separated by space, not by interpuncts. With a "·"
              before every item but the first, a wrap put the dot at the *start*
              of the second line, dangling in the margin with nothing before it.
              Space does the same separating job and cannot land in the wrong
              place.
            */}
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 lg:block lg:space-y-2">
              {UTILITY_NAV.map((item) => (
                <li key={`f-${item.id}`}>
                  <Link href={item.href} siteUrl={site.url} variant="bare" className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/*
            Four columns of the remaining nine, so the eight sections fall as
            two even rows. `gap-y` is larger than `gap-x` because the second row
            needs to read as a new row rather than as a continuation of the
            column above it.
          */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-8 lg:col-span-9 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-9"
          >
            {PRIMARY_NAV.map((item) => (
              <div key={`f-${item.id}`}>
                <h2 className="footer-group-heading">
                  {item.href ? (
                    <Link
                      href={item.href}
                      siteUrl={site.url}
                      variant="bare"
                      className="hover:underline"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    item.label
                  )}
                </h2>
                <ul className="mt-3 space-y-2">
                  {item.children?.map((section) => (
                    <li key={`f-${section.id}`}>
                      <Link
                        href={section.href ?? section.children?.[0]?.href ?? '#'}
                        siteUrl={site.url}
                        variant="bare"
                        className="footer-link"
                      >
                        {section.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* ================= bottom bar ================= */}
        <div className="mt-8 flex flex-col gap-5 border-t border-ink-inverse/15 pt-8 lg:flex-row-reverse lg:items-baseline lg:justify-between lg:gap-10">
          {/*
            The GIGW links, inline. All nine, unchanged — a wrapped row rather
            than a nine-line column.
          */}
          <nav aria-label="Policies">
            <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              {POLICY_NAV.map((item, index) => (
                <li key={`f-${item.id}`} className="flex items-baseline gap-3">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-ink-inverse/25">
                      ·
                    </span>
                  ) : null}
                  <Link
                    href={item.href}
                    siteUrl={site.url}
                    variant="bare"
                    className="footer-link text-xs"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-xs text-ink-inverse/55">© {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
