import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { AccreditationPage as AccreditationContent } from '@/types/accreditation';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';

/**
 * "Accreditation".
 *
 * ## The model
 *
 * The Jamshedpur accreditations page (xlri.ac.in/newsroom/accreditations), with
 * Delhi-NCR's content:
 *
 *  1. **Banner and introduction** — a full-width photograph that zooms
 *     slightly on hover, the title, and a paragraph.
 *  2. **Accreditation rows** — on a tinted band, one row per body: its mark on
 *     the left (a quarter), a vertical rule, and the text on the right, with a
 *     horizontal rule between rows. Jamshedpur has a Government band and an
 *     International band; Delhi publishes only AMBA and BGA, so there is one.
 *
 * Each row also carries a thumbnail of the certificate itself, linking to the
 * full-size scan — the certificates are what the Delhi page publishes, so they
 * stay on the page rather than being replaced by a description of them.
 *
 * Motion is light and slow: the banner and introduction rise in on load,
 * accent rules draw under the headings (`.rise-in`, `.rule-draw` in
 * base.css), and a row lifts its mark, draws a lime bar across it and turns
 * its rule lime on hover. None of it plays under `prefers-reduced-motion`.
 *
 * Server Component; no client JavaScript.
 */
export function AccreditationPage({ content }: { content: AccreditationContent }) {
  const { banner, international } = content;

  return (
    <article aria-labelledby="accreditation-heading">
      {/* ---------------- banner + introduction ---------------- */}
      <section className="bg-surface">
        <div className={`${MEASURE} pt-10 pb-14 md:pt-14 md:pb-20`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'About', href: routes.about.index },
              { label: content.title },
            ]}
          />

          <div className="rise-in group relative mt-8 aspect-[16/9] overflow-hidden rounded-[5px] sm:aspect-[21/9] lg:aspect-[3/1]">
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              // Above the fold — the LCP element. `preload` replaces the
              // deprecated `priority` in Next 16.
              preload
              sizes="(min-width: 1280px) 1184px, 100vw"
              className="object-cover object-[center_70%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
            />
          </div>

          <h1
            id="accreditation-heading"
            className="mt-8 font-serif text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.05] tracking-[-0.035em] text-brand md:mt-10"
          >
            {content.title}
          </h1>
          <span
            aria-hidden="true"
            className="rule-draw mt-4 block h-[3px] w-14 origin-left bg-accent-surface"
          />
          <p
            className="rise-in mt-5 max-w-[56rem] text-base leading-[1.85] text-ink md:text-justify md:text-[1.0625rem]"
            style={{ ['--rise-delay' as string]: '350ms' }}
          >
            {content.intro}
          </p>
        </div>
      </section>

      {/* ---------------- accreditation rows ---------------- */}
      <section aria-labelledby="international-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2
            id="international-heading"
            className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong"
          >
            {international.heading}
          </h2>
          <span
            aria-hidden="true"
            className="rule-draw mt-4 block h-[3px] w-10 origin-left bg-accent-surface"
          />

          <ul className="mt-10 divide-y divide-border-strong/50 md:mt-12">
            {international.items.map((item) => (
              <li
                key={item.id}
                className="group/row grid grid-cols-1 gap-8 py-10 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] sm:gap-0"
              >
                {/* The mark, on white so the certificate's paper tone disappears. */}
                <div className="flex items-center sm:pr-8 lg:pr-12">
                  <div className="relative w-full max-w-[16rem] overflow-hidden rounded-[5px] bg-white p-4 transition-[translate,box-shadow] duration-700 ease-out group-hover/row:shadow-raised motion-safe:group-hover/row:-translate-y-1 sm:max-w-none">
                    {/* A lime bar that sweeps across the top of the mark on hover. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover/row:scale-x-100"
                    />
                    <Image
                      src={item.mark.src}
                      width={item.mark.width}
                      height={item.mark.height}
                      alt={item.mark.alt}
                      sizes="(min-width: 1280px) 260px, (min-width: 640px) 22vw, 256px"
                      className="w-full mix-blend-multiply"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-8 sm:border-l sm:border-border-strong/60 sm:pl-8 sm:transition-colors sm:duration-700 sm:group-hover/row:border-accent-surface md:flex-row md:items-start lg:pl-10">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-2xl leading-tight text-ink-strong transition-colors duration-700 group-hover/row:text-brand md:text-[1.75rem]">
                      {item.name}
                      <span className="text-ink-muted"> — {item.body}</span>
                    </h3>
                    <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm md:text-base">
                      <dt className="font-semibold text-ink-strong">Accredited</dt>
                      <dd className="text-ink">{item.scope}</dd>
                      <dt className="font-semibold text-ink-strong">Awarded</dt>
                      <dd className="text-ink">{item.awarded}</dd>
                    </dl>
                    <p className="mt-5 text-base leading-[1.85] text-ink md:text-[1.0625rem]">
                      {item.statement}
                    </p>
                  </div>

                  {/*
                    The certificate itself. A plain link to the full-size scan —
                    the browser's own image viewer zooms and prints it better
                    than a lightbox would.
                  */}
                  <a
                    href={item.certificate.src}
                    target="_blank"
                    rel="noopener"
                    className="group w-32 shrink-0 md:w-36"
                  >
                    <span className="block overflow-hidden rounded-[3px] bg-white shadow-raised ring-1 ring-border transition-[rotate,box-shadow] duration-700 ease-out group-hover:ring-2 group-hover:ring-accent-surface motion-safe:group-hover:-rotate-2">
                      <Image
                        src={item.certificate.src}
                        width={item.certificate.width}
                        height={item.certificate.height}
                        alt={item.certificate.alt}
                        sizes="144px"
                        className="w-full transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                      />
                    </span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                      View certificate
                      <span className="sr-only"> (opens in a new tab)</span>
                      <ArrowRightIcon
                        size={14}
                        aria-hidden="true"
                        className="text-accent-700 transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
