import Image from 'next/image';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, BriefcaseIcon, LandmarkIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { IcpPage as IcpContent, IcpSector } from '@/types/icp';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong';

const SECTOR_LABEL: Record<IcpSector, string> = {
  industry: 'Industry',
  government: 'Government',
};

const pad = (n: number) => String(n).padStart(2, '0');

function Rule({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`block h-[3px] w-10 bg-accent-surface ${className}`} />
  );
}

/**
 * Executive Education › In-Company Programmes.
 *
 * ## The model
 *
 * The light treatment of the About pages (Accreditation's banner and rows):
 *
 *  1. **Introduction** — the MDP Block as a wide banner, the name, what the
 *     page lists, and three figures counted from the content.
 *  2. **Organisations** — the five clients, each with its sector and how
 *     many of the programmes were theirs.
 *  3. **Past programmes** — a numbered list; the hours, batches and
 *     participant counts the Delhi page gives are shown as chips.
 *  4. **Get in touch** — the campus contact and the two sibling XLEAD
 *     programmes.
 *
 * Motion is light and slow, in the brand colours, as on the About pages: the
 * banner and figures rise in and the title rule draws on load (`.rise-in`,
 * `.rule-draw`); cards lift and rows grow a lime marker on hover. Nothing
 * plays on scroll, and none of it under `prefers-reduced-motion`.
 */
export function IcpPage({ content }: { content: IcpContent }) {
  const { clients, programmes, related, contact } = content;
  const clientById = new Map(clients.map((client) => [client.id, client]));
  const countFor = (id: string) => programmes.items.filter((item) => item.client === id).length;
  const sectors = new Set(clients.map((client) => client.sector)).size;

  const facts = [
    { id: 'programmes', value: programmes.items.length, label: 'Past programmes' },
    { id: 'clients', value: clients.length, label: 'Organisations' },
    { id: 'sectors', value: sectors, label: 'Sectors: industry and government' },
  ];

  return (
    <article aria-labelledby="icp-heading">
      {/* ---------------- introduction ---------------- */}
      <section className="bg-surface">
        <div className={`${MEASURE} pt-10 pb-14 md:pt-14 md:pb-20`}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Executive Education' },
              { label: content.abbreviation },
            ]}
          />

          <div className="rise-in group relative mt-8 md:mt-10">
            {/* The offset lime frame used on the other page photographs. */}
            <span
              aria-hidden="true"
              className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-[8px] border-2 border-accent-surface/70 transition-[translate,border-color] duration-700 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:border-accent-surface md:block"
            />
            <div className="relative aspect-[16/9] overflow-hidden rounded-[8px] md:aspect-[21/8]">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                // Above the fold — the LCP element. `preload` replaces the
                // deprecated `priority` in Next 16.
                preload
                sizes="(min-width: 1280px) 1184px, 100vw"
                className="object-cover object-[center_40%] transition-transform duration-[1200ms] ease-out motion-safe:group-hover:scale-[1.03]"
              />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 md:mt-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                {content.eyebrow}
              </p>
              <h1
                id="icp-heading"
                className="mt-3 font-serif text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.04] tracking-[-0.03em] text-balance text-brand"
              >
                {content.title}{' '}
                <span className="text-accent-surface">({content.abbreviation})</span>
              </h1>
              <Rule className="rule-draw mt-6 w-14 origin-left" />
              <p className="mt-6 text-base leading-[1.85] text-ink md:text-[1.0625rem]">
                {content.summary}
              </p>
            </div>

            <dl
              className="rise-in grid grid-cols-3 overflow-hidden rounded-[8px] border border-border"
              style={{ ['--rise-delay' as string]: '300ms' }}
            >
              {facts.map((fact, index) => (
                // Label first in the DOM (a <dt> must precede its <dd>),
                // figure first on screen.
                <div
                  key={fact.id}
                  className={`flex flex-col-reverse justify-end bg-surface-subtle px-4 py-5 md:px-5 ${
                    index > 0 ? 'border-l border-border' : ''
                  }`}
                >
                  <dt className="mt-2 text-sm leading-snug text-ink-muted">{fact.label}</dt>
                  <dd className="font-serif text-[2.25rem] leading-none text-brand">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------- organisations ---------------- */}
      <section aria-labelledby="clients-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="clients-heading" className={H2}>
            Organisations we have worked with
          </h2>
          <Rule className="mt-4" />

          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {clients.map((client) => {
              const Icon = client.sector === 'industry' ? BriefcaseIcon : LandmarkIcon;
              const count = countFor(client.id);
              return (
                <li
                  key={client.id}
                  className="group flex flex-col rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-6 transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-brand/40 hover:border-t-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-accent-50 text-accent-700 transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-serif text-xl leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand">
                    {client.name}
                  </h3>
                  <p className="mt-auto flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 pt-5 text-sm text-ink-muted">
                    <span>{SECTOR_LABEL[client.sector]}</span>
                    <span className="whitespace-nowrap">
                      <span className="font-serif text-lg text-brand">{count}</span>{' '}
                      {count === 1 ? 'programme' : 'programmes'}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------------- past programmes ---------------- */}
      <section aria-labelledby="programmes-heading" className="bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <h2 id="programmes-heading" className={H2}>
            {programmes.heading}
          </h2>
          <Rule className="mt-4" />

          <ol className="mt-10 divide-y divide-border border-y border-border">
            {programmes.items.map((item, index) => {
              const client = clientById.get(item.client);
              return (
                <li
                  key={item.id}
                  className="group relative grid grid-cols-[3rem_minmax(0,1fr)] gap-x-5 gap-y-3 py-6 md:grid-cols-[4rem_minmax(0,1fr)_auto] md:items-center md:gap-x-8"
                >
                  {/* A lime marker that grows down the row's left edge on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute top-4 bottom-4 -left-3 w-[3px] origin-top scale-y-0 rounded-full bg-accent-surface transition-transform duration-500 ease-out group-hover:scale-y-100 md:-left-5"
                  />
                  <span aria-hidden="true" className="font-serif text-3xl leading-none text-brand">
                    {pad(index + 1)}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl leading-snug text-ink-strong transition-colors duration-500 group-hover:text-brand">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] text-ink-muted">{item.audience}</p>
                  </div>
                  <ul className="col-start-2 flex flex-wrap gap-2 md:col-start-3 md:justify-end">
                    {client ? (
                      <li className="rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">
                        {SECTOR_LABEL[client.sector]}
                      </li>
                    ) : null}
                    {item.details.map((detail) => (
                      <li
                        key={detail}
                        className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-ink"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---------------- get in touch ---------------- */}
      <section aria-labelledby="contact-heading" className="bg-surface-subtle">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div id="contact" className="scroll-mt-40">
              <h2 id="contact-heading" className={H2}>
                {contact.heading}
              </h2>
              <Rule className="mt-4" />
              <p className="mt-6 leading-[1.75] text-ink">{contact.text}</p>
              <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 text-[0.9375rem]">
                <div>
                  <dt className="text-xs tracking-[0.14em] text-ink-muted uppercase">Phone</dt>
                  <dd>
                    <a
                      href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                      className="font-semibold text-ink-strong hover:text-brand"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.14em] text-ink-muted uppercase">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-semibold text-brand hover:underline"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                More from XLEAD
              </h3>
              <ul className="mt-5 space-y-4">
                {related.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between gap-6 rounded-[8px] border border-border bg-surface p-6 transition-colors duration-200 hover:border-brand"
                    >
                      <span>
                        <span className="block font-serif text-xl text-ink-strong group-hover:text-brand">
                          {link.label}
                        </span>
                        <span className="mt-1 block text-[0.9375rem] text-ink-muted">
                          {link.text}
                        </span>
                      </span>
                      <ArrowRightIcon
                        size={16}
                        aria-hidden="true"
                        className="shrink-0 text-accent-700 transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
