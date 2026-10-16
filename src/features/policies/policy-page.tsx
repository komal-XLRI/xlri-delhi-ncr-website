import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CheckIcon, MailIcon, MapPinIcon, PhoneIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import { formatDate } from '@/lib/format/date';
import { fill } from '@/lib/format/template';
import type { ResolvedPolicyPage } from '@/types/policies';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * A website policy — Privacy, Terms & Conditions, Help: a compact
 * hero, the text in numbered sections with an "On this page" index beside it
 * on large screens, and how to reach the campus at the end.
 *
 * Content comes from `content/policies.json` through `services/policies`.
 */
export function PolicyPageView({ content }: { content: ResolvedPolicyPage }) {
  const sections = (content.sections ?? []).map((section) => ({
    ...section,
    id: slug(section.heading),
  }));
  const empty = sections.length === 0;

  return (
    <article aria-labelledby="policy-heading">
      <section data-motif="hero" className="relative isolate overflow-hidden bg-surface">
        <div className={`${MEASURE} pt-8 pb-12 md:pt-10 md:pb-14`}>
          <Breadcrumbs items={[{ label: 'Home', href: routes.home }, { label: content.title }]} />
          <div className="mt-8 max-w-3xl md:mt-10">
            <p className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
              {content.eyebrow}
            </p>
            <h1
              id="policy-heading"
              className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-balance text-brand"
            >
              {content.title}
            </h1>
            <span
              aria-hidden="true"
              className="rule-draw mt-6 block h-[3px] w-14 origin-left bg-accent-surface"
            />
            {content.intro ? (
              <p className="mt-6 text-lg leading-[1.75] text-ink">{content.intro}</p>
            ) : null}
            {content.updated ? (
              <p className="mt-4 text-sm text-ink-muted">
                {fill(content.updatedLabel, { date: formatDate(content.updated) })}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <div className="bg-surface-subtle">
        <div
          className={`${MEASURE} grid grid-cols-1 gap-10 py-12 md:py-16 lg:gap-14 lg:py-20 ${empty ? '' : 'lg:grid-cols-[15rem_minmax(0,1fr)]'}`}
        >
          {empty ? null : (
            <nav
              aria-labelledby="policy-toc"
              className="hidden lg:sticky lg:top-[calc(var(--header-height,6rem)+1.5rem)] lg:block lg:self-start"
            >
              <p
                id="policy-toc"
                className="text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase"
              >
                {content.tocHeading}
              </p>
              <ol className="mt-3 flex flex-col border-l border-border">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px flex gap-2.5 border-l-2 border-transparent py-1.5 pl-4 text-[0.9375rem] text-ink transition-colors duration-300 hover:border-accent-surface hover:text-brand"
                    >
                      <span className="text-ink-muted tabular-nums">{index + 1}.</span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="max-w-3xl min-w-0">
            {/* A policy with no text yet says so, rather than showing a blank page. */}
            {empty ? (
              <p className="rounded-[8px] border border-dashed border-border-strong bg-surface px-6 py-10 text-center text-[1.0625rem] text-ink-muted md:px-10">
                {content.emptyNote}
              </p>
            ) : (
              <div className="rounded-[8px] border border-border bg-surface px-6 py-2 md:px-10 md:py-4">
                {content.preamble ? (
                  <div className="border-b border-border py-8">
                    {content.preamble.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="mt-4 text-[1.0625rem] leading-[1.8] text-ink first:mt-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
                {sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`${section.id}-heading`}
                    className="border-b border-border py-8 last:border-b-0"
                  >
                    <h2
                      id={`${section.id}-heading`}
                      className="flex items-baseline gap-3 font-serif text-[1.5rem] leading-tight text-ink-strong"
                    >
                      <span className="text-base text-accent-700 tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {section.heading}
                    </h2>
                    {section.paragraphs?.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="mt-4 text-[1.0625rem] leading-[1.8] text-ink"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.points ? <PointList points={section.points} /> : null}
                    {section.blocks?.map((block) =>
                      block.kind === 'h' ? (
                        <h3
                          key={`h-${block.text}`}
                          className="mt-7 text-[1.125rem] font-semibold text-ink-strong"
                        >
                          {block.text}
                        </h3>
                      ) : block.kind === 'p' ? (
                        <p
                          key={`p-${block.text.slice(0, 40)}`}
                          className="mt-4 text-[1.0625rem] leading-[1.8] text-ink"
                        >
                          {block.text}
                        </p>
                      ) : (
                        <PointList key={`list-${block.items[0] ?? ''}`} points={block.items} />
                      ),
                    )}
                  </section>
                ))}
              </div>
            )}

            {/* How to reach the campus. */}
            <aside
              aria-labelledby="policy-contact"
              className="mt-6 rounded-[8px] bg-brand p-6 text-white md:p-8"
            >
              <h2 id="policy-contact" className="font-serif text-2xl">
                {content.contact.heading}
              </h2>
              <p className="mt-2 text-white/80">{content.contact.text}</p>
              <ul className="mt-6 grid grid-cols-1 gap-4 text-[0.9375rem] md:grid-cols-3">
                <li className="flex gap-3">
                  <MapPinIcon
                    size={18}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-accent-surface"
                  />
                  <span>{content.contact.address}</span>
                </li>
                <li className="flex gap-3">
                  <PhoneIcon
                    size={18}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-accent-surface"
                  />
                  <a
                    href={`tel:${content.contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {content.contact.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MailIcon
                    size={18}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-accent-surface"
                  />
                  <a
                    href={`mailto:${content.contact.email}`}
                    className="break-all underline-offset-4 hover:underline"
                  >
                    {content.contact.email}
                  </a>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </article>
  );
}

function PointList({ points }: { points: readonly string[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-3">
      {points.map((point) => (
        <li key={point.slice(0, 40)} className="flex gap-3 text-[1.0625rem] leading-[1.7] text-ink">
          <CheckIcon size={18} aria-hidden="true" className="mt-1 shrink-0 text-accent-700" />
          {point}
        </li>
      ))}
    </ul>
  );
}
