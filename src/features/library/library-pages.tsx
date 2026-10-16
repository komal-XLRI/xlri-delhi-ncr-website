import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon, CheckIcon, ExternalIcon, MailIcon, PhoneIcon } from '@/components/ui/icon';
import { fill } from '@/lib/format/template';
import type {
  LibraryCollection,
  LibraryContent,
  LibraryPerson,
  ResourceAccess,
} from '@/types/library';

const LIFT =
  'transition-[translate,box-shadow,border-color] duration-500 ease-out hover:border-accent-surface hover:shadow-raised motion-safe:hover:-translate-y-1';
const BAR =
  'absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-surface transition-transform duration-700 ease-out group-hover:scale-x-100';
const H2 = 'font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-ink-strong';
const stagger = (i: number, columns: number) => ({
  ['--reveal-start' as string]: `${String(4 + (i % columns) * 6)}%`,
});
const pad = (n: number) => String(n).padStart(2, '0');

/* ------------------------------------------------------------------ services */

export function LibraryServices({ content }: { content: LibraryContent }) {
  const copy = content.pages.services;
  return (
    <div className="flex flex-col gap-12">
      {/* Borrowing, at a glance. */}
      <section aria-labelledby="borrow-heading">
        <h2 id="borrow-heading" className={H2}>
          {copy.borrowing.title}
        </h2>
        <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {content.circulation.map((row) => (
            <li
              key={row.who}
              className="rounded-[8px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-6"
            >
              <p className="text-xs font-semibold tracking-[0.16em] text-accent-700 uppercase">
                {row.who}
              </p>
              <p className="mt-3 font-serif text-3xl text-brand">{row.books}</p>
              <p className="mt-1 text-ink">
                {fill(copy.borrowing.perLoan, { period: row.period })}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-muted">{copy.borrowing.note}</p>
      </section>

      <section aria-labelledby="services-heading">
        <h2 id="services-heading" className={H2}>
          {copy.servicesTitle}
        </h2>
        <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
        <ol className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {content.services.map((service, index) => (
            <li key={service.title} className="reveal" style={stagger(index, 2)}>
              <div
                className={`group relative h-full overflow-hidden rounded-[8px] border border-border bg-surface p-6 ${LIFT}`}
              >
                <span aria-hidden="true" className={BAR} />
                <p className="font-serif text-2xl leading-none text-accent-700 tabular-nums">
                  {pad(index + 1)}
                </p>
                <h3 className="mt-3 font-serif text-xl text-ink-strong">{service.title}</h3>
                {service.text ? (
                  <p className="mt-2 leading-relaxed text-ink">{service.text}</p>
                ) : null}
                {service.points ? (
                  <ul className="mt-3 flex flex-col gap-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-2.5 leading-relaxed text-ink">
                        <CheckIcon
                          size={14}
                          aria-hidden="true"
                          className="mt-1.5 shrink-0 text-accent-700"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="other-heading"
        className="rounded-[8px] border border-border bg-surface p-6 md:p-8"
      >
        <h2 id="other-heading" className="font-serif text-2xl text-ink-strong">
          {copy.otherTitle}
        </h2>
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {content.otherServices.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed text-ink">
              <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-surface text-brand-950">
                <CheckIcon size={12} aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* ----------------------------------------------------------------- committee */

function PersonCard({ person, large = false }: { person: LibraryPerson; large?: boolean }) {
  return (
    <div
      className={`group relative flex h-full items-center gap-4 overflow-hidden rounded-[8px] border border-border bg-surface p-5 ${LIFT}`}
    >
      <span aria-hidden="true" className={BAR} />
      <span
        className={`relative block shrink-0 overflow-hidden rounded-full bg-surface-inverse ring-4 ring-accent-100 transition-shadow duration-500 group-hover:ring-accent-surface ${large ? 'size-20' : 'size-16'}`}
      >
        <Image
          src={person.photo}
          alt=""
          fill
          sizes={large ? '80px' : '64px'}
          className="object-cover object-[center_20%]"
        />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent-700 uppercase">
          {person.role}
        </p>
        <Link
          href={person.href}
          className={`mt-1 block font-semibold text-ink-strong hover:text-brand ${large ? 'font-serif text-xl' : ''}`}
        >
          {person.name}
        </Link>
        <a
          href={`mailto:${person.email}`}
          className="mt-1 inline-flex items-center gap-1.5 text-sm break-all text-brand hover:text-brand-950"
        >
          <MailIcon size={13} aria-hidden="true" className="shrink-0 text-accent-700" />
          {person.email}
        </a>
      </div>
    </div>
  );
}

export function LibraryCommittee({ content }: { content: LibraryContent }) {
  const [convenor, ...members] = content.committee;
  const copy = content.pages.committee;
  return (
    <div className="flex flex-col gap-12">
      <section aria-labelledby="committee-heading">
        <h2 id="committee-heading" className={H2}>
          {copy.committeeTitle}
        </h2>
        <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {convenor ? (
            <li className="md:col-span-2">
              <PersonCard person={convenor} large />
            </li>
          ) : null}
          {members.map((person, index) => (
            <li key={person.email} className="reveal" style={stagger(index, 2)}>
              <PersonCard person={person} />
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="personnel-heading">
        <h2 id="personnel-heading" className={H2}>
          {copy.personnelTitle}
        </h2>
        <span aria-hidden="true" className="mt-4 block h-[3px] w-10 bg-accent-surface" />
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {content.personnel.map((person) => (
            <li key={person.role}>
              <PersonCard person={person} large />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* --------------------------------------------------------------- collections */

/** The tag's colours by access; its words are in `pages.collection.access`. */
const ACCESS: Record<ResourceAccess, string> = {
  open: 'bg-surface-subtle text-ink-muted',
  'sign-in': 'bg-brand-50 text-brand',
  'on-campus': 'bg-accent-50 text-accent-700',
};

export function LibraryCollectionPage({
  collection,
  copy,
}: {
  collection: LibraryCollection;
  copy: LibraryContent['pages']['collection'];
}) {
  const signIn = collection.items.some((item) => item.access === 'sign-in');
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <p className="text-ink-muted">
          <span className="font-semibold text-ink-strong tabular-nums">
            {collection.items.length}
          </span>{' '}
          {copy.countLabel}
        </p>
        {signIn ? (
          <p className="flex items-center gap-2 text-sm text-ink-muted">
            <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand">
              {copy.access['sign-in']}
            </span>
            {copy.signInNote}
          </p>
        ) : null}
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {collection.items.map((item, index) => {
          const access = { label: copy.access[item.access], className: ACCESS[item.access] };
          const body = (
            <>
              <span aria-hidden="true" className={BAR} />
              <span className="flex items-start justify-between gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-[8px] bg-brand font-serif text-lg text-white transition-colors duration-500 group-hover:bg-accent-surface group-hover:text-brand-950">
                  {item.name.replace(/[^A-Za-z]/g, '').slice(0, 1)}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${access.className}`}
                >
                  {access.label}
                </span>
              </span>
              <span className="mt-4 block font-serif text-xl leading-snug text-ink-strong transition-colors duration-300 group-hover:text-brand">
                {item.name}
              </span>
              <span className="mt-2 block flex-1 leading-relaxed text-ink">{item.description}</span>
              {item.href ? (
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Open
                  <ExternalIcon size={13} aria-hidden="true" className="text-accent-700" />
                  <span className="sr-only"> {item.name} (opens in a new tab)</span>
                </span>
              ) : (
                <span className="mt-5 text-sm text-ink-muted">{copy.installed}</span>
              )}
            </>
          );
          return (
            <li key={item.name} className="reveal" style={stagger(index, 2)}>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-border bg-surface p-6 ${LIFT}`}
                >
                  {body}
                </a>
              ) : (
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-border bg-surface p-6">
                  {body}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ contact */

export function LibraryContact({ content }: { content: LibraryContent }) {
  const [head] = content.personnel;
  const copy = content.pages.contact;
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <a
          href={`mailto:${content.contact.email}`}
          className={`group relative overflow-hidden rounded-[8px] border border-border bg-surface p-7 ${LIFT}`}
        >
          <span aria-hidden="true" className={BAR} />
          <span className="flex size-12 items-center justify-center rounded-full bg-brand text-white transition-colors duration-500 group-hover:bg-accent-surface group-hover:text-brand-950">
            <MailIcon size={22} aria-hidden="true" />
          </span>
          <span className="mt-5 block text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">
            {copy.email}
          </span>
          <span className="mt-1 block font-serif text-2xl text-brand">{content.contact.email}</span>
        </a>
        <div className="relative overflow-hidden rounded-[8px] border border-border bg-surface p-7">
          <span className="flex size-12 items-center justify-center rounded-full bg-brand text-white">
            <PhoneIcon size={22} aria-hidden="true" />
          </span>
          <span className="mt-5 block text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">
            {copy.phone}
          </span>
          <span className="mt-1 block font-serif text-2xl text-brand tabular-nums">
            {content.contact.extensions.join(' / ')}
          </span>
          <span className="mt-1 block text-sm text-ink-muted">{copy.phoneNote}</span>
        </div>
      </div>
      {head ? <PersonCard person={head} large /> : null}
      <div className="rounded-[8px] border border-l-4 border-border border-l-accent-surface bg-surface p-6">
        <p className="font-semibold text-ink-strong">{copy.hours}</p>
        <p className="mt-1 text-ink">{content.hours.always}</p>
        <dl className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {content.hours.week.map((row) => (
            <div key={row.days}>
              <dt className="text-sm text-ink-muted">{row.days}</dt>
              <dd className="font-semibold text-ink-strong tabular-nums">{row.time}</dd>
            </div>
          ))}
        </dl>
      </div>
      <Link
        href={content.remote.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 self-start font-semibold text-brand"
      >
        {fill(copy.remoteLink, { remote: content.remote.label })}
        <ArrowRightIcon
          size={16}
          aria-hidden="true"
          className="transition-transform duration-500 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}
