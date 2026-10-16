import Image from 'next/image';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  ArrowRightIcon,
  ChatIcon,
  CompassIcon,
  ExternalIcon,
  MailIcon,
  UsersIcon,
  type IconProps,
} from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { CounsellingChannel, CounsellingPage } from '@/types/counselling';

import { NoticeBox, RelatedLinks } from './campus-blocks';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] leading-tight tracking-[-0.02em] text-ink-strong';
const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1';
const EYEBROW = 'text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });
const stagger = (i: number, columns: number) => ({
  ['--reveal-start' as string]: `${String(4 + (i % columns) * 6)}%`,
});

const ICONS: Record<CounsellingChannel['icon'], (props: IconProps) => React.JSX.Element> = {
  users: UsersIcon,
  chat: ChatIcon,
};

/**
 * Campus Life › Counselling Services.
 *
 *  1. **Hero** — the title, the Delhi page's heading and introduction, and the
 *     counsellor beside them (from the faculty directory, linked to their
 *     profile), so who to talk to is the first thing seen.
 *  2. **Two channels** — internal (on campus, in person) and external
 *     (YourDOST, online, 24/7) side by side, each with what it covers.
 *  3. **A sign of strength** — the closing paragraph, its key line set large.
 *  4. **If you need help right now** — helplines, then related pages.
 *
 * Content comes from `content/campus-life/counselling-services.json`.
 */
export function Counselling({ content }: { content: CounsellingPage }) {
  const { counsellor } = content;

  return (
    <article aria-labelledby="counselling-heading">
      {/* ---------------- hero ---------------- */}
      <section data-motif="hero" className="relative isolate overflow-hidden bg-surface">
        <div className={`${MEASURE} pt-8 pb-16 md:pt-10 md:pb-20`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Campus Life' },
              { label: content.title },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 items-center gap-12 md:mt-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className={`flex items-center gap-2.5 ${EYEBROW}`}>
                <CompassIcon size={18} aria-hidden="true" />
                {content.eyebrow}
              </p>
              <h1
                id="counselling-heading"
                className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03] tracking-[-0.03em] text-balance text-brand"
              >
                {content.title}
              </h1>
              <span
                aria-hidden="true"
                className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
              />
              <p
                className="rise-in mt-7 font-serif text-[clamp(1.375rem,2.4vw,1.75rem)] leading-snug text-ink-strong"
                style={delay(120)}
              >
                {content.headline}
              </p>
              <p
                className="rise-in mt-4 max-w-2xl text-lg leading-[1.75] text-ink"
                style={delay(180)}
              >
                {content.intro}
              </p>
              <div className="rise-in mt-8 flex flex-wrap gap-3" style={delay(240)}>
                {content.channels.map((channel) => {
                  const Icon = ICONS[channel.icon];
                  return (
                    <a
                      key={channel.id}
                      href={`#${channel.id}`}
                      className="group inline-flex items-center gap-2.5 rounded-full border border-border-strong px-5 py-2.5 font-semibold text-ink-strong transition-colors duration-300 hover:border-brand hover:text-brand"
                    >
                      <Icon size={18} aria-hidden="true" className="text-accent-700" />
                      {channel.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* The counsellor. */}
            <aside
              aria-labelledby="counsellor-heading"
              className="rise-in group overflow-hidden rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface-subtle"
              style={delay(300)}
            >
              <div className="flex items-center gap-5 p-6 md:p-7">
                <span className="relative block aspect-4/5 w-28 shrink-0 overflow-hidden rounded-[6px] bg-surface-inverse ring-4 ring-accent-100 transition-shadow duration-500 group-hover:ring-accent-surface">
                  <Image
                    src={counsellor.photo}
                    alt={`Portrait of ${counsellor.name}`}
                    fill
                    preload
                    sizes="112px"
                    className="object-cover object-top"
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">
                    {content.counsellorCard.label}
                  </p>
                  <p
                    id="counsellor-heading"
                    className="mt-2 font-serif text-[1.375rem] leading-snug text-ink-strong"
                  >
                    {counsellor.name}
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">{counsellor.role}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border px-6 py-4 md:px-7">
                <a
                  href={`mailto:${counsellor.email}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-950"
                >
                  <MailIcon size={16} aria-hidden="true" className="text-accent-700" />
                  {counsellor.email}
                </a>
                <Link
                  href={counsellor.href}
                  className="group/profile ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-ink-strong hover:text-brand"
                >
                  {content.counsellorCard.profileLink}
                  <ArrowRightIcon
                    size={14}
                    aria-hidden="true"
                    className="text-accent-700 transition-transform duration-300 group-hover/profile:translate-x-0.5"
                  />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------- two channels ---------------- */}
      <section aria-labelledby="channels-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <div className="max-w-3xl">
            <p className={EYEBROW}>{content.channelsHeading.eyebrow}</p>
            <h2 id="channels-heading" className={`mt-3 ${H2}`}>
              {content.channelsHeading.title}
            </h2>
            <span aria-hidden="true" className="mt-5 block h-[3px] w-10 bg-accent-surface" />
          </div>

          <div className="relative mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
            {/* The join between the two: one service, two ways in. */}
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 z-10 hidden size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-surface font-serif text-2xl text-brand-950 shadow-raised ring-8 ring-surface-subtle lg:flex"
            >
              +
            </span>
            {content.channels.map((channel, index) => {
              const Icon = ICONS[channel.icon];
              return (
                <section
                  key={channel.id}
                  id={channel.id}
                  aria-labelledby={`${channel.id}-heading`}
                  className="reveal"
                  style={stagger(index, 2)}
                >
                  <div
                    className={`group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-border bg-surface p-7 md:p-9 ${LIFT}`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100"
                    />
                    <div className="flex items-center gap-4">
                      <span className="flex size-14 items-center justify-center rounded-full bg-brand text-white transition-colors duration-500 group-hover:bg-accent-surface group-hover:text-brand-950">
                        <Icon size={24} aria-hidden="true" />
                      </span>
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold tracking-[0.12em] text-brand uppercase">
                        {channel.label}
                      </span>
                    </div>
                    <h3
                      id={`${channel.id}-heading`}
                      className="mt-6 font-serif text-[clamp(1.5rem,2.4vw,1.875rem)] leading-tight text-ink-strong"
                    >
                      {channel.title}
                    </h3>
                    <p className="mt-4 leading-[1.8] text-ink">{channel.text}</p>

                    <p className="mt-7 text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">
                      {channel.pointsTitle}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {channel.points.map((point) => (
                        <li
                          key={point}
                          className="rounded-full border border-border-strong px-3.5 py-1.5 text-sm font-semibold text-ink-strong"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>

                    {channel.link ? (
                      <a
                        href={channel.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-2 self-start pt-8 font-semibold text-brand hover:text-brand-950"
                      >
                        {channel.link.label}
                        <ExternalIcon size={14} aria-hidden="true" className="text-accent-700" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- a sign of strength ---------------- */}
      <section aria-labelledby="strength-heading" className="bg-surface">
        <div
          className={`${MEASURE} grid grid-cols-1 gap-10 py-16 md:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:py-24`}
        >
          <figure className="reveal relative">
            <span
              aria-hidden="true"
              className="absolute -top-8 -left-2 font-serif text-[8rem] leading-none text-accent-surface/60 select-none"
            >
              “
            </span>
            <blockquote className="relative">
              <p
                id="strength-heading"
                className="font-serif text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.15] tracking-[-0.02em] text-brand"
              >
                {content.quote}
              </p>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 text-sm text-ink-muted">
              <span aria-hidden="true" className="h-[3px] w-10 bg-accent-surface" />
              {content.quoteCaption.before}
              <em className="text-ink-strong">{content.quoteCaption.emphasis}</em>
              {content.quoteCaption.after}
            </figcaption>
          </figure>
          <p className="reveal self-center text-[1.0625rem] leading-[1.85] text-ink">
            {content.closing}
          </p>
        </div>
      </section>

      {/* ---------------- right now ---------------- */}
      {content.notice ? (
        <section aria-label={content.notice.title} className="bg-surface-subtle">
          <div className={`${MEASURE} py-12 md:py-16`}>
            <NoticeBox notice={content.notice} />
          </div>
        </section>
      ) : null}

      <RelatedLinks heading={content.relatedHeading} links={content.related} />
    </article>
  );
}
