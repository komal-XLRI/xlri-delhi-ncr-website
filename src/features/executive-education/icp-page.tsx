import Image from 'next/image';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ArrowRightIcon, BriefcaseIcon, LandmarkIcon } from '@/components/ui/icon';
import { routes } from '@/constants/routes';
import type { IcpPage as IcpContent, IcpSector } from '@/types/icp';

const MEASURE = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';
const H2 =
  'font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink-strong';

const SECTOR: Record<IcpSector, { label: string; chip: string }> = {
  industry: { label: 'Industry', chip: 'bg-accent-50 text-accent-700' },
  government: { label: 'Government', chip: 'bg-surface-subtle text-brand' },
};

const delay = (ms: number) => ({ ['--enter-delay' as string]: `${String(ms)}ms` });
const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Executive Education › In-Company Programmes.
 *
 * ## The model
 *
 * The XLEAD visual language shared with EMDP and MDP: a navy hero with the
 * brand colours drifting behind it, then light sections.
 *
 *  1. **Hero** — the name with "(ICP)" in the accent, what the page lists,
 *     and three figures counted from the content, over the MDP Block
 *     photograph, which fades into the navy on wide screens.
 *  2. **Organisations** — the five clients, each with its sector and how
 *     many of the programmes were theirs.
 *  3. **Past programmes** — numbered cards; the hours, batches and
 *     participant counts the Delhi page gives are shown as chips.
 *  4. **Next steps** (navy) — the campus contact and the two sibling XLEAD
 *     programmes.
 *
 * Motion on load only (`.enter`, `.drift` in styles/base.css), never on
 * scroll, and none under `prefers-reduced-motion`.
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
      {/* ---------------- hero ---------------- */}
      <section className="relative isolate overflow-hidden bg-brand-950 text-ink-inverse">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 -z-20 hidden w-[52%] lg:block"
        >
          <Image
            src={content.image.src}
            alt=""
            fill
            // Above the fold — the LCP element. `preload` replaces the
            // deprecated `priority` in Next 16.
            preload
            sizes="52vw"
            className="object-cover object-[30%_center]"
          />
          <span className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/70 to-brand-950/10" />
        </div>
        <span
          aria-hidden="true"
          className="drift absolute -top-40 -left-32 -z-10 size-[34rem] rounded-full bg-brand opacity-60 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="drift absolute -bottom-56 left-1/3 -z-10 size-[26rem] rounded-full bg-accent-surface opacity-20 blur-3xl [animation-delay:-8s]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:28px_28px] lg:right-[52%]"
        />

        <div className={`${MEASURE} pt-8 pb-16 md:pt-10 md:pb-24`}>
          <Breadcrumbs
            className="[&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white"
            items={[
              { label: 'Home', href: routes.home },
              { label: 'Executive Education' },
              { label: content.abbreviation },
            ]}
          />

          <div className="mt-10 max-w-[40rem] md:mt-16 lg:mb-6">
            <p
              className="enter text-sm font-semibold tracking-[0.18em] text-accent-surface uppercase"
              style={delay(0)}
            >
              {content.eyebrow}
            </p>
            <h1
              id="icp-heading"
              className="enter mt-4 font-serif text-[clamp(2.5rem,5.4vw,4.25rem)] leading-[1.02] tracking-[-0.035em] text-balance text-white"
              style={delay(90)}
            >
              {content.title}{' '}
              <span className="bg-gradient-to-r from-accent-surface to-white bg-clip-text text-transparent">
                ({content.abbreviation})
              </span>
            </h1>
            <p
              className="enter mt-6 border-l-[3px] border-accent-surface pl-5 text-lg leading-[1.7] text-white/85"
              style={delay(180)}
            >
              {content.summary}
            </p>

            <div className="enter mt-9 flex flex-wrap items-center gap-3" style={delay(260)}>
              <a
                href="#past-programmes"
                className="group inline-flex items-center gap-3 rounded-full bg-accent-surface py-2.5 pr-5 pl-2.5 text-[0.9375rem] font-semibold text-brand-950 transition-colors duration-200 hover:bg-white"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-brand-950 text-accent-surface">
                  <ArrowRightIcon
                    size={15}
                    aria-hidden="true"
                    className="rotate-90 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
                  />
                </span>
                See past programmes
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-white/35 px-5 py-3 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:border-accent-surface hover:bg-white/10"
              >
                Plan a programme
              </a>
            </div>

            <dl
              className="enter mt-12 grid max-w-[34rem] grid-cols-3 divide-x divide-white/15 border-t border-white/15 pt-6"
              style={delay(340)}
            >
              {facts.map((fact) => (
                // Label first in the DOM (a <dt> must precede its <dd>),
                // figure first on screen.
                <div key={fact.id} className="flex flex-col-reverse justify-end px-4 first:pl-0">
                  <dt className="mt-2 text-sm leading-snug text-white/70">{fact.label}</dt>
                  <dd className="font-serif text-[2.75rem] leading-none text-accent-surface">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Narrow screens: the photograph below the text, not behind it. */}
        <div className="relative aspect-[3/2] lg:hidden">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand-950 to-transparent"
          />
          <span className="absolute bottom-3 left-6 rounded-full bg-brand-950/85 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-white uppercase backdrop-blur md:left-8">
            MDP Block · Delhi-NCR campus
          </span>
        </div>
      </section>

      {/* ---------------- organisations ---------------- */}
      <section aria-labelledby="clients-heading" className="bg-surface">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="clients-heading" className={H2}>
                Organisations we have worked with
              </h2>
              <span
                aria-hidden="true"
                className="mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-accent-surface"
              />
            </div>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {clients.map((client) => {
              const sector = SECTOR[client.sector];
              const Icon = client.sector === 'industry' ? BriefcaseIcon : LandmarkIcon;
              const count = countFor(client.id);
              return (
                <li
                  key={client.id}
                  className="group flex flex-col rounded-[10px] border border-border bg-surface p-6 transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand hover:bg-brand hover:shadow-raised"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-accent-50 text-accent-700 transition-colors duration-300 group-hover:bg-white/15 group-hover:text-accent-surface">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl leading-snug text-ink-strong transition-colors duration-300 group-hover:text-white">
                    {client.name}
                  </h3>
                  <p className="mt-auto flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 pt-5 text-sm text-ink-muted transition-colors duration-300 group-hover:text-white/80">
                    <span>{sector.label}</span>
                    <span className="whitespace-nowrap">
                      <span className="font-serif text-lg text-brand transition-colors duration-300 group-hover:text-accent-surface">
                        {count}
                      </span>{' '}
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
      <section
        id="past-programmes"
        aria-labelledby="programmes-heading"
        className="scroll-mt-40 bg-surface-subtle"
      >
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-14">
            <div className="lg:sticky lg:top-40 lg:self-start">
              <p className="text-sm font-semibold tracking-[0.18em] text-accent-700 uppercase">
                Delivered by XLRI Delhi-NCR
              </p>
              <h2 id="programmes-heading" className={`${H2} mt-2`}>
                {programmes.heading}
              </h2>
              <span
                aria-hidden="true"
                className="mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-accent-surface"
              />
              <ul aria-label="Sectors" className="mt-8 space-y-2 text-sm text-ink-muted">
                {(Object.keys(SECTOR) as IcpSector[]).map((key) => (
                  <li key={key} className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${SECTOR[key].chip}`}
                    >
                      {SECTOR[key].label}
                    </span>
                    {
                      programmes.items.filter((item) => clientById.get(item.client)?.sector === key)
                        .length
                    }{' '}
                    programmes
                  </li>
                ))}
              </ul>
            </div>

            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
              {programmes.items.map((item, index) => {
                const client = clientById.get(item.client);
                const sector = client ? SECTOR[client.sector] : undefined;
                const last = index === programmes.items.length - 1;
                return (
                  <li
                    key={item.id}
                    className={`group relative overflow-hidden rounded-[10px] border border-border bg-surface p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-raised md:p-7 ${
                      last && programmes.items.length % 2 === 1 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.18] bg-gradient-to-r from-brand to-accent-surface transition-transform duration-500 ease-out group-hover:scale-x-100"
                    />
                    <div className="flex items-start justify-between gap-4">
                      <span
                        aria-hidden="true"
                        className="font-serif text-[2.75rem] leading-none text-transparent transition-colors duration-300 [-webkit-text-stroke:1px_var(--color-brand)] group-hover:text-brand"
                      >
                        {pad(index + 1)}
                      </span>
                      {sector ? (
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${sector.chip}`}
                        >
                          {sector.label}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-5 font-serif text-xl leading-snug text-ink-strong">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] font-medium text-accent-700">
                      {item.audience}
                    </p>
                    {item.details.length > 0 ? (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {item.details.map((detail) => (
                          <li
                            key={detail}
                            className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-ink"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------- next steps ---------------- */}
      <section aria-labelledby="contact-heading" className="purpose-band text-ink-inverse">
        <div className={`${MEASURE} py-14 md:py-20`}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div id="contact" className="scroll-mt-40">
              <p className="text-sm font-semibold tracking-[0.18em] text-accent-surface uppercase">
                Get in touch
              </p>
              <h2
                id="contact-heading"
                className="mt-2 font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.02em] text-white"
              >
                {contact.heading}
              </h2>
              <p className="mt-4 max-w-[34rem] leading-[1.75] text-white/80">{contact.text}</p>
              <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-5 text-[0.9375rem]">
                <li>
                  <span className="block text-xs tracking-[0.14em] text-white/60 uppercase">
                    Phone
                  </span>
                  <a
                    href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                    className="font-semibold text-white hover:text-accent-surface"
                  >
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <span className="block text-xs tracking-[0.14em] text-white/60 uppercase">
                    Email
                  </span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-semibold text-accent-surface hover:text-white"
                  >
                    {contact.email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-[0.18em] text-accent-surface uppercase">
                More from XLEAD
              </h3>
              <ul className="mt-5 space-y-4">
                {related.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between gap-6 rounded-[10px] bg-white p-6 text-ink shadow-raised transition-transform duration-300 ease-out hover:-translate-y-1"
                    >
                      <span>
                        <span className="block font-serif text-xl text-ink-strong">
                          {link.label}
                        </span>
                        <span className="mt-1 block text-[0.9375rem] text-ink-muted">
                          {link.text}
                        </span>
                      </span>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700 transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                        <ArrowRightIcon
                          size={16}
                          aria-hidden="true"
                          className="transition-transform duration-300 motion-safe:group-hover:translate-x-0.5"
                        />
                      </span>
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
