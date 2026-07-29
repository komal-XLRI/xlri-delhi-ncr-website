import type { Metadata } from 'next';

/**
 * The metadata factory.
 *
 * Pages describe intent — title, description, path — and this builds the full
 * `Metadata` object. Centralising it guarantees that the canonical URL, Open
 * Graph tags, and Twitter Card are always present and mutually consistent,
 * which is exactly the sort of thing that silently rots when every page hand-
 * rolls its own tags.
 *
 * Pure and framework-light by design: it takes site facts as an argument rather
 * than importing `@/config/site`, so it stays in the `lib` layer (§7) and is
 * testable without environment setup.
 */

export interface SiteIdentity {
  readonly name: string;
  readonly url: string;
  readonly locale: string;
  readonly description: string;
}

export interface PageMetadataInput {
  /** Page title, without the site suffix — the factory appends it. */
  readonly title?: string;
  readonly description?: string;
  /** Root-relative path, e.g. `/faculty/jane-doe`. Drives the canonical URL. */
  readonly path: string;
  /** Root-relative or absolute image URL for OG/Twitter cards. */
  readonly image?: string;
  readonly imageAlt?: string;
  readonly type?: 'website' | 'article';
  /** Set for drafts, thin archives, and retired pages. */
  readonly noIndex?: boolean;
  readonly publishedTime?: string;
  readonly modifiedTime?: string;
}

/** Join an origin and a root-relative path without doubling or dropping slashes. */
export function absoluteUrl(origin: string, path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const base = origin.replace(/\/+$/, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return suffix === '/' ? base : `${base}${suffix}`;
}

export function buildMetadata(site: SiteIdentity, page: PageMetadataInput): Metadata {
  const title = page.title ? `${page.title} | ${site.name}` : site.name;
  const description = page.description ?? site.description;
  const canonical = absoluteUrl(site.url, page.path);
  const image = page.image ? absoluteUrl(site.url, page.image) : undefined;

  return {
    metadataBase: new URL(site.url),
    title,
    description,

    // Canonical on every page, always. Duplicate-content problems on university
    // sites almost always trace back to a missing canonical rather than to
    // genuinely duplicated writing.
    alternates: { canonical },

    robots: page.noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
        },

    openGraph: {
      type: page.type ?? 'website',
      siteName: site.name,
      locale: site.locale,
      title,
      description,
      url: canonical,
      ...(image ? { images: [{ url: image, alt: page.imageAlt ?? title }] } : {}),
      ...(page.publishedTime ? { publishedTime: page.publishedTime } : {}),
      ...(page.modifiedTime ? { modifiedTime: page.modifiedTime } : {}),
    },

    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
