import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  BasketIcon,
  BedIcon,
  BriefcaseIcon,
  CarIcon,
  CompassIcon,
  DumbbellIcon,
  FileIcon,
  HomeIcon,
  LeafIcon,
  PillIcon,
  RouteIcon,
  ShirtIcon,
  SparkIcon,
  StethoscopeIcon,
  SunIcon,
  TreeIcon,
  UsersIcon,
  UtensilsIcon,
  type IconProps,
} from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { CampusFacilityPage, FacilityIcon } from '@/types/campus-services';

import { NoticeBox, RelatedLinks } from './campus-blocks';
import { ServiceGallery } from './service-gallery';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong';
/** A slow lift with a soft shadow — the cards' shared hover, as on the Team page. */
const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1';
const EYEBROW = 'text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });
const stagger = (i: number, columns: number) => ({
  ['--reveal-start' as string]: `${String(4 + (i % columns) * 6)}%`,
});

const ICONS: Record<FacilityIcon, (props: IconProps) => React.JSX.Element> = {
  sun: SunIcon,
  car: CarIcon,
  leaf: LeafIcon,
  stethoscope: StethoscopeIcon,
  pill: PillIcon,
  users: UsersIcon,
  tree: TreeIcon,
  path: RouteIcon,
  dumbbell: DumbbellIcon,
  bed: BedIcon,
  home: HomeIcon,
  basket: BasketIcon,
  utensils: UtensilsIcon,
  sparkle: SparkIcon,
  shirt: ShirtIcon,
  briefcase: BriefcaseIcon,
};

/**
 * A Campus Life facility page — Parking Areas, Medical Facilities.
 *
 * The Delhi pages behind these are a heading, a line or two and a few photos,
 * so the photos lead: the hero sets the title beside them as a slideshow
 * (`ServiceGallery`). Below it, a few highlights say what the facility offers,
 * an optional notice (what to do in an emergency), then links to the pages a
 * visitor would want next.
 *
 * Content comes from `content/campus-life/<page>.json`; photos are in
 * `public/media/campus-life/<page>/`.
 */
export function CampusFacility({ content }: { content: CampusFacilityPage }) {
  return (
    <article aria-labelledby="facility-heading">
      {/* ---------------- hero ---------------- */}
      <section data-motif="hero" className="relative isolate overflow-hidden bg-surface">
        <div className={`${MEASURE} pt-8 pb-16 md:pt-10 md:pb-20 lg:pb-24`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Campus Life' },
              { label: content.title },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 items-center gap-12 md:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
            <div>
              <p className={`flex items-center gap-2.5 ${EYEBROW}`}>
                <CompassIcon size={18} aria-hidden="true" />
                {content.eyebrow}
              </p>
              <h1
                id="facility-heading"
                className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03] tracking-[-0.03em] text-balance text-brand"
              >
                {content.title}
              </h1>
              <span
                aria-hidden="true"
                className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
              />
              <p
                className="rise-in mt-6 max-w-lg text-lg leading-[1.75] text-ink md:text-[1.1875rem]"
                style={delay(150)}
              >
                {content.intro}
              </p>
            </div>

            <div className="rise-in" style={delay(250)}>
              <ServiceGallery
                photos={content.photos}
                title={content.title}
                preload
                corner="right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- highlights ---------------- */}
      <section aria-labelledby="glance-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <p className={EYEBROW}>{content.highlightsEyebrow}</p>
          <h2 id="glance-heading" className={`mt-3 ${H2}`}>
            {content.highlightsTitle}
          </h2>
          <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />

          <ul
            className={`mt-10 grid grid-cols-1 gap-5 lg:gap-6 ${content.highlights.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}
          >
            {content.highlights.map((highlight, index) => {
              const Icon = ICONS[highlight.icon];
              return (
                <li key={highlight.title} className="reveal" style={stagger(index, 3)}>
                  <div
                    className={`group relative h-full overflow-hidden rounded-[8px] border border-border bg-surface p-6 md:p-8 ${LIFT}`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
                    />
                    <span className="flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand transition-colors duration-500 group-hover:bg-accent-surface group-hover:text-brand-950">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-serif text-[1.375rem] leading-snug text-ink-strong">
                      {highlight.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-ink">{highlight.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          {content.notice ? <NoticeBox notice={content.notice} className="mt-10" /> : null}
        </div>
      </section>

      {/* ---------------- about + documents ---------------- */}
      {content.about ? (
        <section aria-labelledby="about-heading" className="bg-surface">
          <div
            className={`${MEASURE} grid grid-cols-1 gap-10 py-16 md:py-20 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16 lg:py-24`}
          >
            <div className="reveal">
              <p className={EYEBROW}>{content.about.eyebrow}</p>
              <h2 id="about-heading" className={`mt-3 ${H2}`}>
                {content.about.title}
              </h2>
              <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />
              <div className="mt-7 flex flex-col gap-5 text-[1.0625rem] leading-[1.8] text-ink">
                {content.about.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>
            {content.documents ? (
              <aside
                aria-labelledby="documents-heading"
                className="reveal lg:sticky lg:top-40 lg:self-start"
              >
                <p
                  id="documents-heading"
                  className="text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase"
                >
                  {content.documentsTitle}
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {content.documents.map((document) => (
                    <li key={document.href}>
                      <a
                        href={document.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative flex items-center gap-4 overflow-hidden rounded-[8px] border border-border bg-surface-subtle p-5 ${LIFT}`}
                      >
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand transition-colors duration-500 group-hover:bg-accent-surface group-hover:text-brand-950">
                          <FileIcon size={20} aria-hidden="true" />
                        </span>
                        <span className="flex-1 font-semibold text-ink-strong transition-colors duration-300 group-hover:text-brand">
                          {document.title}
                        </span>
                        <span className="rounded-full border border-border-strong px-2.5 py-0.5 text-xs font-bold tracking-[0.12em] text-ink-muted">
                          PDF
                        </span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ---------------- gallery ---------------- */}
      {content.gallery ? (
        <section aria-labelledby="gallery-heading" className="bg-surface">
          <div className={`${MEASURE} pt-16 md:pt-20 lg:pt-24`}>
            <p className={EYEBROW}>{content.gallery.eyebrow}</p>
            <h2 id="gallery-heading" className={`mt-3 ${H2}`}>
              {content.gallery.title}
            </h2>
            <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />

            {/* A mosaic: the first photo large, the rest beside and below it. */}
            <ul className="mt-10 grid grid-cols-2 gap-3 md:auto-rows-[15rem] md:grid-cols-4 md:gap-4">
              {content.gallery.photos.map((photo, index) => (
                <li
                  key={photo.src}
                  className={`reveal ${index === 0 ? 'col-span-2 md:row-span-2' : ''} ${index === 3 ? 'col-span-2' : ''}`}
                  style={stagger(index, 4)}
                >
                  <div className="group relative h-full min-h-40 overflow-hidden rounded-[8px] bg-surface-inverse shadow-raised transition-[translate] duration-500 ease-out motion-safe:hover:-translate-y-1 md:min-h-0">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={
                        index === 0
                          ? '(min-width: 768px) 50vw, 100vw'
                          : '(min-width: 768px) 25vw, 50vw'
                      }
                      className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <RelatedLinks heading={content.relatedHeading} links={content.related} />
    </article>
  );
}
