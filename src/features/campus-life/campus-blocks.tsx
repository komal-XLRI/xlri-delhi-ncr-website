import Link from 'next/link';

import { ArrowRightIcon, PhoneIcon } from '@/components/ui/icon';
import type { CampusFacilityPage, SectionHeading } from '@/types/campus-services';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong';
const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1';
const EYEBROW = 'text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase';
const stagger = (i: number, columns: number) => ({
  ['--reveal-start' as string]: `${String(4 + (i % columns) * 6)}%`,
});

/**
 * Blocks shared by the smaller Campus Life pages (Parking, Medical,
 * Counselling), so they read as one family.
 */

/** A boxed note with tap-to-call or mail buttons — e.g. what to do in an emergency. */
export function NoticeBox({
  notice,
  className = '',
}: {
  notice: NonNullable<CampusFacilityPage['notice']>;
  className?: string;
}) {
  return (
    <aside
      aria-labelledby="notice-heading"
      className={`reveal relative flex flex-col gap-6 overflow-hidden rounded-[8px] border border-l-4 border-border border-l-accent-surface bg-surface p-6 md:flex-row md:items-center md:gap-10 md:p-8 ${className}`}
    >
      <div className="flex-1">
        <h3 id="notice-heading" className="font-serif text-2xl text-ink-strong">
          {notice.title}
        </h3>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink">{notice.text}</p>
      </div>
      <ul className="flex flex-wrap gap-3">
        {notice.contacts.map((contact) => (
          <li key={contact.href}>
            <a
              href={contact.href}
              className="group flex items-center gap-3 rounded-full border border-border-strong py-2 pr-5 pl-2 transition-colors duration-300 hover:border-brand"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-brand text-white transition-colors duration-300 group-hover:bg-accent-surface group-hover:text-brand-950">
                <PhoneIcon size={16} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-ink-muted">{contact.label}</span>
                <span className="block font-semibold text-ink-strong tabular-nums">
                  {contact.value}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Three link cards to neighbouring pages, under the page's own heading. */
export function RelatedLinks({
  heading,
  links,
}: {
  heading: SectionHeading;
  links: CampusFacilityPage['related'];
}) {
  if (links.length === 0) return null;
  return (
    <section aria-labelledby="related-heading" className="bg-surface">
      <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
        <p className={EYEBROW}>{heading.eyebrow}</p>
        <h2 id="related-heading" className={`mt-3 ${H2}`}>
          {heading.title}
        </h2>
        <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />

        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {links.map((link, index) => (
            <li key={link.href} className="reveal" style={stagger(index, 3)}>
              <Link
                href={link.href}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-border bg-surface-subtle p-6 md:p-7 ${LIFT}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-y-100"
                />
                <span className="font-serif text-xl leading-snug text-ink-strong transition-colors duration-300 group-hover:text-brand">
                  {link.label}
                </span>
                <span className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {link.description}
                </span>
                <ArrowRightIcon
                  size={18}
                  aria-hidden="true"
                  className="mt-5 text-brand transition-transform duration-500 group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
