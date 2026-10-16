import Image from 'next/image';
import NextLink from 'next/link';
import type { ReactNode } from 'react';

import { ArrowRightIcon, MailIcon, MapPinIcon, PhoneIcon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import { wordmark } from '@/config/brand';
import { POLICY_NAV, UTILITY_NAV } from '@/config/navigation';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { fill } from '@/lib/format/template';
import { getFooterCopy } from '@/services/site';
import type { FooterLinkGroup, SocialNetwork } from '@/types/site';

/** The networks' marks, drawn to sit with the line icons in `components/ui/icon`. */
const SOCIAL_GLYPHS: Record<SocialNetwork, ReactNode> = {
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5v.01" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.5 9.5 4 2.5-4 2.5z" />
    </>
  ),
  facebook: (
    <path d="M14 21v-8h3l.5-3.5H14V7.8c0-1 .3-1.8 1.8-1.8h1.8V3.1A24 24 0 0 0 15 3c-2.6 0-4.4 1.6-4.4 4.5v2H8V13h2.6v8" />
  ),
  x: <path d="M4 4l16 16M20 4 4 20" />,
};

function LinkColumn({ group }: { group: FooterLinkGroup }) {
  return (
    <div>
      <h2 className="footer-group-heading">{group.heading}</h2>
      <span aria-hidden="true" className="mt-3 block h-0.5 w-8 bg-accent-surface" />
      <ul className="mt-5 space-y-3">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} siteUrl={site.url} variant="bare" className="footer-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Site footer, on every page.
 *
 * Laid out after the XLRI Jamshedpur footer — a band of identity and one call
 * to action, then Quick Links, Useful Links and Contact info in columns — and
 * set in this site's own navy, lime and serif:
 *
 *  1. **Identity and a visit panel** — the logo, the campus, a sentence on it, and
 *     the two things a visitor most often wants next: the video campus tour
 *     and directions to Jhajjar.
 *  2. **Columns** — Quick Links (the section home pages), Useful Links, the
 *     audience links ("For" students, alumni …) and Contact info with the
 *     address, phone, email, directions and social accounts.
 *  3. **Bottom bar** — copyright, the institute site, and the policy links.
 *
 * Jamshedpur's WhatsApp QR code and newsletter box are left out: the Delhi-NCR
 * campus has neither a WhatsApp line nor a newsletter service to wire them to,
 * and a form that goes nowhere is worse than no form.
 *
 * The words and links are in `content/site.json` (`footer`); the audience and
 * policy links are the menus in `config/navigation.json`.
 */
export async function SiteFooter() {
  const copy = await getFooterCopy();
  const { contact, visit } = copy;
  const year = new Date().getFullYear();

  return (
    <footer className="footer-band mt-auto text-ink-inverse">
      <div className="mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12">
        {/* ================= identity + visit ================= */}
        <div className="grid gap-8 border-b border-ink-inverse/15 py-12 md:py-14 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-6">
            {/* The masthead's lockup, on a white plate so its blue holds against navy. */}
            <NextLink
              href={routes.home}
              aria-label={`${site.name} — home`}
              className="inline-flex rounded-md bg-white px-5 py-3"
            >
              <Image
                src={wordmark.src}
                alt=""
                width={Math.round((wordmark.width / wordmark.height) * 64)}
                height={64}
                style={{ width: 'auto', height: '64px' }}
              />
            </NextLink>
            {/* The lockup carries no campus; the footer names it. */}
            <p className="mt-4 flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-accent-surface uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-accent-surface" />
              {copy.campusLabel}
            </p>
            <p className="mt-4 max-w-[34rem] text-[0.9375rem] leading-relaxed text-ink-inverse/70">
              {copy.description}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[10px] border border-ink-inverse/15 bg-ink-inverse/5 p-6 md:p-7 lg:col-span-6">
            {/* The site's triangle motif, small, in the corner. */}
            <span
              aria-hidden="true"
              className="absolute -top-px -right-px size-16 bg-accent-surface/90 [clip-path:polygon(0_0,100%_0,100%_100%)]"
            />
            <p className="text-xs font-semibold tracking-[0.18em] text-accent-surface uppercase">
              {visit.eyebrow}
            </p>
            <p className="mt-2 pr-10 font-serif text-2xl leading-snug text-ink-inverse">
              {visit.heading}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={visit.tourHref}
                siteUrl={site.url}
                variant="bare"
                className="group inline-flex items-center gap-2 rounded-full bg-accent-surface px-5 py-2.5 text-sm font-semibold text-brand-950 transition-colors duration-300 hover:bg-white"
              >
                {visit.tourLabel}
                <ArrowRightIcon
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href={contact.directionsHref}
                siteUrl={site.url}
                variant="bare"
                className="inline-flex items-center gap-2 rounded-full border border-ink-inverse/30 px-5 py-2.5 text-sm font-semibold text-ink-inverse transition-colors duration-300 hover:border-ink-inverse hover:bg-ink-inverse/10"
              >
                <MapPinIcon size={15} aria-hidden="true" className="text-accent-surface" />
                {visit.directionsLabel}
              </Link>
            </div>
          </div>
        </div>

        {/* ================= columns ================= */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:py-14 lg:grid-cols-12 lg:gap-x-10">
          <nav aria-label={copy.quickLinks.heading} className="lg:col-span-3">
            <LinkColumn group={copy.quickLinks} />
          </nav>
          <nav aria-label={copy.usefulLinks.heading} className="lg:col-span-3">
            <LinkColumn group={copy.usefulLinks} />
          </nav>
          <nav aria-label={copy.audienceHeading} className="col-span-2 sm:col-span-1 lg:col-span-2">
            <LinkColumn
              group={{
                heading: copy.audienceHeading,
                links: UTILITY_NAV.map(({ label, href }) => ({ label, href })),
              }}
            />
          </nav>

          <div className="col-span-2 sm:col-span-1 lg:col-span-4">
            <h2 className="footer-group-heading">{contact.heading}</h2>
            <span aria-hidden="true" className="mt-3 block h-0.5 w-8 bg-accent-surface" />
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <PhoneIcon
                  size={17}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-accent-surface"
                />
                <a
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="footer-link text-base"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <MailIcon
                  size={17}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-accent-surface"
                />
                <a href={`mailto:${contact.email}`} className="footer-link text-base">
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPinIcon
                  size={17}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-accent-surface"
                />
                <address className="leading-relaxed text-ink-inverse/75 not-italic">
                  {contact.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <Link
                    href={contact.directionsHref}
                    siteUrl={site.url}
                    variant="bare"
                    hideOffsiteIndicator
                    className="group mt-2 inline-flex items-center gap-1 font-semibold text-accent-surface hover:text-white"
                  >
                    {visit.directionsLabel}
                    <ArrowRightIcon
                      size={13}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                    <span className="sr-only"> (opens Google Maps)</span>
                  </Link>
                </address>
              </li>
            </ul>

            <h3 className="mt-7 text-xs font-semibold tracking-[0.18em] text-ink-inverse/60 uppercase">
              {contact.followHeading}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2.5">
              {contact.social.map((account) => (
                <li key={account.network}>
                  <a
                    href={account.href}
                    rel="noopener noreferrer"
                    aria-label={account.label}
                    className="flex size-10 items-center justify-center rounded-full border border-ink-inverse/20 text-ink-inverse/85 transition-[background-color,color,border-color,translate] duration-300 hover:border-accent-surface hover:bg-accent-surface hover:text-brand-950 motion-safe:hover:-translate-y-0.5"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width={18}
                      height={18}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      focusable="false"
                    >
                      {SOCIAL_GLYPHS[account.network]}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ================= bottom bar ================= */}
        <div className="flex flex-col gap-4 border-t border-ink-inverse/15 py-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <p className="text-xs text-ink-inverse/60">
            {fill(copy.copyright, { year })}{' '}
            <Link
              href={site.parentOrganization.url}
              siteUrl={site.url}
              variant="bare"
              className="ml-1 text-ink-inverse/80 underline decoration-accent-surface decoration-2 underline-offset-4 hover:text-ink-inverse"
            >
              {copy.instituteLinkLabel}
            </Link>
          </p>
          {/*
            Wrapped and separated by space-plus-dot drawn before every item but
            the first, so a wrap never leaves a dot dangling at a line start.
          */}
          <nav aria-label="Policies">
            <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              {POLICY_NAV.map((item, index) => (
                <li key={`f-${item.id}`} className="flex items-baseline gap-3">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-accent-surface/60">
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
        </div>
      </div>
    </footer>
  );
}
