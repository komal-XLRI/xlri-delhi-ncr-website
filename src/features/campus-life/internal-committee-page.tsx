import Image from 'next/image';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  CompassIcon,
  ExternalIcon,
  FileIcon,
  MailIcon,
} from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { Avatar } from '@/features/sustainability/avatar';
import type { InternalCommitteePage } from '@/types/internal-committee';

import { fill } from '@/lib/format/template';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] leading-tight tracking-[-0.02em] text-ink-strong';
/** A slow lift with a soft shadow — the cards' shared hover, as on the Team page. */
const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1';
const EYEBROW = 'text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase';
const RULE = 'mt-5 block h-[3px] w-10 bg-accent-surface';
const BAR =
  'absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100';
const delay = (ms: number) => ({ ['--rise-delay' as string]: `${ms}ms` });
const stagger = (i: number, columns: number) => ({
  ['--reveal-start' as string]: `${String(4 + (i % columns) * 6)}%`,
});
const pad = (n: number) => String(n).padStart(2, '0');

/** A downward connector between two boxes of the flowchart. */
function Down() {
  return (
    <span aria-hidden="true" className="flex justify-center py-2 text-accent-700">
      <ArrowRightIcon size={18} className="rotate-90" />
    </span>
  );
}

function SectionHead({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <p className={EYEBROW}>{eyebrow}</p>
      <h2 id={id} className={`mt-3 ${H2}`}>
        {title}
      </h2>
      <span aria-hidden="true" className={RULE} />
      {children}
    </div>
  );
}

/**
 * Campus Life › Internal Complaints Committee.
 *
 * A page someone may come to at a difficult moment, so it is calm and plain:
 * how to reach the IC is in the hero and again at the end, and nothing that
 * matters is hidden behind an image.
 *
 *  1. **Hero** — the title, the Delhi page's headline and standfirst, and the
 *     IC's address beside them.
 *  2. **What the IC does** — the three responsibilities as one thread.
 *  3. **What is sexual harassment?** — the six examples.
 *  4. **The inquiry process** — the handbook's flowchart rebuilt as text, both
 *     routes side by side, with the original diagram and the handbook linked.
 *  5. **Awareness sessions**, 6. **Who can approach the IC**, 7. **How to file
 *     a complaint**, 8. **FAQs** (native `<details>`, no JavaScript),
 *     9. **The committee**, 10. **Documents**, 11. **Contact**.
 *
 * Content comes from `content/campus-life/internal-complaints-committee.json`.
 * Server Component; no client JavaScript.
 */
export function InternalCommittee({ content }: { content: InternalCommitteePage }) {
  const { process } = content;
  const [convener, ...members] = content.members;
  const mail = `mailto:${content.email}`;

  return (
    <article aria-labelledby="ic-heading">
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

          <div className="mt-8 grid grid-cols-1 items-center gap-12 md:mt-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className={`flex items-center gap-2.5 ${EYEBROW}`}>
                <CompassIcon size={18} aria-hidden="true" />
                {content.eyebrow}
              </p>
              <h1
                id="ic-heading"
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
                {content.standfirst}
              </p>
              <div className="rise-in mt-8 flex flex-wrap gap-3" style={delay(240)}>
                <a
                  href={mail}
                  className="inline-flex items-center gap-2.5 rounded-full bg-brand px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-brand-950"
                >
                  <MailIcon size={18} aria-hidden="true" />
                  {content.hero.contactButton}
                </a>
                <a
                  href="#complaint-process"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-border-strong px-6 py-3 font-semibold text-ink-strong transition-colors duration-300 hover:border-brand hover:text-brand"
                >
                  {content.hero.processLink}
                  <ArrowRightIcon
                    size={16}
                    aria-hidden="true"
                    className="rotate-90 text-accent-700 transition-transform duration-500 group-hover:translate-y-0.5"
                  />
                </a>
              </div>
            </div>

            <aside
              aria-labelledby="write-heading"
              className="rise-in rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface-subtle p-6 md:p-8"
              style={delay(300)}
            >
              <p
                id="write-heading"
                className="text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase"
              >
                {content.hero.writeTitle}
              </p>
              <a
                href={mail}
                className="mt-3 block font-serif text-[1.375rem] leading-snug break-all text-brand underline decoration-accent-surface decoration-2 underline-offset-[6px] hover:text-brand-950"
              >
                {content.email}
              </a>
              <p className="mt-4 leading-relaxed text-ink">{content.contact.text}</p>
              {convener ? (
                <div className="group mt-6 flex items-center gap-4 border-t border-border pt-6">
                  <Avatar name={convener.name} size="sm" />
                  <div>
                    <p className="font-semibold text-ink-strong">{convener.name}</p>
                    <p className="text-sm text-ink-muted">
                      {fill(content.hero.convenerRole, { role: convener.role })}
                    </p>
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------- what the IC does ---------------- */}
      <section aria-labelledby="does-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <SectionHead
            id="does-heading"
            eyebrow={content.responsibilities.eyebrow}
            title={content.responsibilities.title}
          >
            <p className="mt-6 text-[1.0625rem] leading-[1.8] text-ink">{content.intro}</p>
          </SectionHead>

          {/* One thread: the line runs behind the numbered nodes. */}
          <ol className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            <span
              aria-hidden="true"
              className="absolute top-7 right-[16%] left-[16%] hidden h-[3px] rounded-full bg-linear-to-r from-brand via-accent-surface to-brand md:block"
            />
            {content.responsibilities.items.map((item, index) => (
              <li
                key={item.label}
                className="reveal group relative flex flex-col items-center text-center"
                style={stagger(index, 3)}
              >
                <span className="relative z-10 flex size-14 items-center justify-center rounded-full bg-brand font-serif text-xl text-white ring-8 ring-surface-subtle transition-colors duration-500 group-hover:bg-accent-surface group-hover:text-brand-950">
                  {pad(index + 1)}
                </span>
                <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-accent-700 uppercase">
                  {item.label}
                </p>
                <h3 className="mt-2 font-serif text-2xl leading-snug text-ink-strong">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-xs leading-relaxed text-ink">{item.text}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-ink-muted italic">
            {content.responsibilities.note}
          </p>
        </div>
      </section>

      {/* ---------------- what is sexual harassment ---------------- */}
      <section aria-labelledby="what-heading" className="bg-surface">
        <div
          className={`${MEASURE} grid grid-cols-1 gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16 lg:py-24`}
        >
          <SectionHead
            id="what-heading"
            eyebrow={content.harassment.eyebrow}
            title={content.harassment.title}
          >
            <p className="mt-6 text-[1.0625rem] leading-[1.8] text-ink">
              {content.harassment.note}
            </p>
          </SectionHead>

          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {content.harassment.items.map((item, index) => (
              <li key={item} className="reveal" style={stagger(index, 2)}>
                <div
                  className={`group relative flex h-full gap-4 overflow-hidden rounded-[8px] border border-border bg-surface-subtle p-5 ${LIFT}`}
                >
                  <span aria-hidden="true" className={BAR} />
                  <span className="font-serif text-2xl leading-none text-accent-700 tabular-nums">
                    {pad(index + 1)}
                  </span>
                  <span className="leading-relaxed text-ink-strong">{item}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- the inquiry process ---------------- */}
      <section
        id="complaint-process"
        aria-labelledby="process-heading"
        className="bg-surface-subtle"
      >
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <SectionHead id="process-heading" eyebrow={process.eyebrow} title={process.title}>
            <p className="mt-6 text-[1.0625rem] leading-[1.8] text-ink">{process.text}</p>
          </SectionHead>

          <div className="mt-12 grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_17rem] xl:gap-12">
            <div className="reveal">
              <p className="rounded-[8px] bg-brand px-6 py-5 text-center font-semibold text-white">
                {process.start}
              </p>

              <div className="mt-2 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]">
                {/* Informal */}
                <div>
                  <Down />
                  <p className="text-center">
                    <span className="inline-block rounded-full border-2 border-brand px-4 py-1 text-sm font-bold tracking-[0.14em] text-brand uppercase">
                      {process.informal.label}
                    </span>
                  </p>
                  <Down />
                  <p className="rounded-[8px] border border-border bg-surface px-5 py-4 text-center font-semibold text-ink-strong">
                    {process.informal.step}
                  </p>
                  <Down />
                  <ul className="flex flex-col gap-3">
                    {process.informal.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="rounded-[8px] border border-border bg-surface px-5 py-4 text-[0.9375rem] leading-relaxed text-ink"
                      >
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Formal */}
                <div>
                  <Down />
                  <p className="text-center">
                    <span className="inline-block rounded-full border-2 border-brand bg-brand px-4 py-1 text-sm font-bold tracking-[0.14em] text-white uppercase">
                      {process.formal.label}
                    </span>
                  </p>
                  <Down />
                  <p className="flex flex-wrap justify-center gap-2">
                    {process.formal.routes.map((route) => (
                      <span
                        key={route}
                        className="rounded-[6px] border border-border bg-surface px-4 py-2 text-sm font-semibold text-ink-strong"
                      >
                        {route}
                      </span>
                    ))}
                  </p>
                  <Down />
                  <ol className="relative flex flex-col gap-3">
                    {process.formal.steps.map((step, index) => (
                      <li
                        key={step}
                        className="flex gap-4 rounded-[8px] border border-border bg-surface px-5 py-4"
                      >
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-surface text-sm font-bold text-brand-950 tabular-nums">
                          {index + 1}
                        </span>
                        <span className="text-[0.9375rem] leading-relaxed text-ink">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <Down />
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {process.formal.outcomes.map((outcome) => (
                      <li
                        key={outcome.label}
                        className="rounded-[8px] border border-t-[3px] border-border border-t-brand bg-surface px-5 py-4"
                      >
                        <p className="text-xs font-bold tracking-[0.14em] text-brand uppercase">
                          {outcome.label}
                        </p>
                        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink">
                          {outcome.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <Down />
                  <p className="rounded-[8px] border border-accent-surface bg-accent-50 px-5 py-4 text-[0.9375rem] leading-relaxed text-ink-strong">
                    <span className="font-semibold">{process.formal.appealLabel} · </span>
                    {process.formal.appeal}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-sm text-ink-muted">
                {fill(process.sourceLine, { source: process.source })}
              </p>
            </div>

            {/* The original, for anyone who wants it as drawn. */}
            <aside aria-label="The original diagram" className="reveal">
              <a
                href={process.diagram.src}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block overflow-hidden rounded-[8px] border border-border bg-surface p-3 ${LIFT}`}
              >
                <span aria-hidden="true" className={BAR} />
                <Image
                  src={process.diagram.src}
                  alt={process.diagram.alt}
                  width={process.diagram.width}
                  height={process.diagram.height}
                  sizes="(min-width: 1280px) 248px, 60vw"
                  className="mx-auto h-auto w-full max-w-sm"
                />
                <span className="mt-3 flex items-center justify-between gap-2 px-1 text-sm font-semibold text-brand">
                  {process.diagramLink}
                  <ExternalIcon size={13} aria-hidden="true" className="text-accent-700" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
              <a
                href={process.handbook}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-3 rounded-[8px] border border-border bg-surface px-4 py-3 text-sm font-semibold text-ink-strong transition-colors duration-300 hover:border-brand hover:text-brand"
              >
                <FileIcon size={20} aria-hidden="true" className="shrink-0 text-accent-700" />
                {process.handbookLink}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------- awareness sessions ---------------- */}
      {content.sessions.photos.length > 0 ? (
        <section aria-labelledby="sessions-heading" className="bg-surface">
          <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
            <SectionHead
              id="sessions-heading"
              eyebrow={content.sessions.eyebrow}
              title={content.sessions.title}
            >
              <p className="mt-6 text-[1.0625rem] leading-[1.8] text-ink">
                {content.sessions.text}
              </p>
            </SectionHead>
            <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {content.sessions.photos.map((photo, index) => (
                <li key={photo.src} className="reveal" style={stagger(index, 2)}>
                  <div className="group relative aspect-3/2 overflow-hidden rounded-[8px] bg-surface-inverse shadow-raised transition-[translate] duration-500 ease-out motion-safe:hover:-translate-y-1">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1280px) 580px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
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

      {/* ---------------- who can approach / how to file ---------------- */}
      <section aria-labelledby="who-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <SectionHead
            id="who-heading"
            eyebrow={content.audiences.eyebrow}
            title={content.audiences.title}
          />
          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
            {content.audiences.items.map((item, index) => (
              <li key={item.title} className="reveal" style={stagger(index, 3)}>
                <div
                  className={`group relative h-full overflow-hidden rounded-[8px] border border-border bg-surface p-6 md:p-8 ${LIFT}`}
                >
                  <span aria-hidden="true" className={BAR} />
                  <h3 className="font-serif text-2xl text-ink-strong">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="file-heading" className="bg-surface">
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <SectionHead
            id="file-heading"
            eyebrow={content.filing.eyebrow}
            title={content.filing.title}
          />
          <ol className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
            {content.filing.steps.map((step, index) => (
              <li key={step.title} className="reveal" style={stagger(index, 3)}>
                <div
                  className={`group relative h-full overflow-hidden rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface-subtle p-6 md:p-8 ${LIFT}`}
                >
                  <span className="font-serif text-5xl leading-none text-brand/15 tabular-nums transition-colors duration-500 group-hover:text-accent-700">
                    {pad(index + 1)}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl text-ink-strong">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- FAQs ---------------- */}
      <section aria-labelledby="faq-heading" className="bg-surface-subtle">
        <div
          className={`${MEASURE} grid grid-cols-1 gap-10 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] lg:gap-16 lg:py-24`}
        >
          <div className="lg:sticky lg:top-40 lg:self-start">
            <SectionHead id="faq-heading" eyebrow={content.faqs.eyebrow} title={content.faqs.title}>
              <p className="mt-6 text-[1.0625rem] leading-[1.8] text-ink">{content.faqs.text}</p>
            </SectionHead>
          </div>

          <div className="flex flex-col gap-3">
            {content.faqs.items.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[8px] border border-border bg-surface transition-colors duration-300 open:border-accent-surface"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold text-ink-strong transition-colors duration-300 hover:text-brand [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border-strong text-brand transition-[rotate,background-color,border-color] duration-500 group-open:rotate-180 group-open:border-accent-surface group-open:bg-accent-surface group-open:text-brand-950">
                    <ChevronDownIcon size={16} aria-hidden="true" />
                  </span>
                </summary>
                <div className="px-6 pb-6 leading-[1.8] text-ink">
                  {faq.answer?.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                  {faq.list ? (
                    <ul className="flex flex-col gap-2.5">
                      {faq.list.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-1.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-surface text-brand-950">
                            <CheckIcon size={12} aria-hidden="true" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- the committee ---------------- */}
      <section aria-labelledby="members-heading" className="bg-surface">
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <SectionHead
            id="members-heading"
            eyebrow={content.membersSection.eyebrow}
            title={content.membersSection.title}
          />

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {convener ? (
              <li className="reveal sm:col-span-2 lg:col-span-3">
                <div className="group relative flex flex-wrap items-center gap-5 overflow-hidden rounded-[8px] border border-border bg-brand-50 p-6 md:p-7">
                  <Avatar name={convener.name} size="md" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold tracking-[0.16em] text-accent-700 uppercase">
                      {convener.role}
                    </p>
                    <p className="mt-1 font-serif text-2xl text-ink-strong">{convener.name}</p>
                  </div>
                  <a
                    href={mail}
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-950"
                  >
                    <MailIcon size={16} aria-hidden="true" />
                    {content.membersSection.convenerLink}
                  </a>
                </div>
              </li>
            ) : null}
            {members.map((member, index) => (
              <li key={member.name} className="reveal" style={stagger(index, 3)}>
                <div
                  className={`group relative flex h-full items-center gap-4 overflow-hidden rounded-[8px] border border-border bg-surface-subtle p-5 ${LIFT}`}
                >
                  <span aria-hidden="true" className={BAR} />
                  <Avatar name={member.name} size="sm" />
                  <div className="min-w-0">
                    <p className="font-semibold text-ink-strong">{member.name}</p>
                    <p className="mt-0.5 text-sm text-ink-muted">
                      {member.role}
                      {member.programme ? (
                        <span className="ml-2 rounded-full bg-surface px-2 py-0.5 text-xs font-semibold text-brand">
                          {member.programme}
                        </span>
                      ) : null}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- documents ---------------- */}
      <section aria-labelledby="docs-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-16 md:py-20 lg:py-24`}>
          <SectionHead
            id="docs-heading"
            eyebrow={content.documentsSection.eyebrow}
            title={content.documentsSection.title}
          />
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.documents.map((document, index) => (
              <li key={document.href} className="reveal" style={stagger(index, 4)}>
                <a
                  href={document.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-border bg-surface p-6 ${LIFT}`}
                >
                  <span aria-hidden="true" className={BAR} />
                  <span className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-full bg-brand-50 text-brand transition-colors duration-500 group-hover:bg-accent-surface group-hover:text-brand-950">
                      <FileIcon size={20} aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-border-strong px-2.5 py-0.5 text-xs font-bold tracking-[0.12em] text-ink-muted">
                      PDF
                    </span>
                  </span>
                  <span className="mt-6 flex-1 font-serif text-xl leading-snug text-ink-strong transition-colors duration-300 group-hover:text-brand">
                    {document.title}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Open
                    <ExternalIcon size={13} aria-hidden="true" className="text-accent-700" />
                    <span className="sr-only"> {document.title} (PDF, opens in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- contact ---------------- */}
      <section aria-labelledby="contact-heading" className="bg-surface">
        <div className={`${MEASURE} py-16 md:py-20`}>
          <div className="reveal relative flex flex-col gap-8 overflow-hidden rounded-[8px] border border-border bg-brand-50 p-8 md:flex-row md:items-center md:p-12">
            <span
              aria-hidden="true"
              className="absolute -top-12 -right-12 size-40 rotate-45 bg-accent-surface/40"
            />
            <span className="relative flex size-16 shrink-0 items-center justify-center rounded-full bg-accent-surface text-brand-950 shadow-raised ring-8 ring-white/70">
              <MailIcon size={26} aria-hidden="true" />
            </span>
            <div className="relative flex-1">
              <h2
                id="contact-heading"
                className="font-serif text-[clamp(1.625rem,3vw,2.25rem)] leading-tight text-ink-strong"
              >
                {content.contact.title}
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink">{content.contact.text}</p>
            </div>
            <a
              href={mail}
              className="relative inline-flex items-center justify-center gap-2.5 self-start rounded-full bg-brand px-6 py-3.5 font-semibold break-all text-white transition-colors duration-300 hover:bg-brand-950 md:self-center"
            >
              {content.email}
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
