import { describe, expect, it } from 'vitest';

import { buildMetadata } from '@/lib/seo/metadata';
import {
  breadcrumbList,
  newsArticle,
  organizationId,
  serializeJsonLd,
} from '@/lib/seo/structured-data';

/**
 * The SEO helpers. Search engines fail quietly — a wrong canonical or a broken
 * JSON-LD block costs rankings without an error anywhere — so the rules these
 * helpers promise are pinned here.
 */
const SITE = {
  name: 'XLRI Delhi-NCR',
  url: 'https://xlridelhi.ac.in',
  locale: 'en_IN',
  description: 'The campus.',
  shareImage: { src: '/brand/share-default.jpg', alt: 'Campus', width: 1200, height: 630 },
};

describe('buildMetadata', () => {
  it('adds the site name to a title that fits', () => {
    expect(buildMetadata(SITE, { title: 'Latest News', path: '/latest-news' }).title).toBe(
      'Latest News | XLRI Delhi-NCR',
    );
  });

  it('leaves the site name off a title too long to show with it', () => {
    const title = 'Executive Development Program in Digital HR Leadership (Batch 8)';
    expect(buildMetadata(SITE, { title, path: '/x' }).title).toBe(title);
  });

  it('uses a full title as is', () => {
    const meta = buildMetadata(SITE, { fullTitle: 'XLRI Delhi-NCR | Home', path: '/' });
    expect(meta.title).toBe('XLRI Delhi-NCR | Home');
  });

  it('gives every page an absolute canonical URL', () => {
    expect(buildMetadata(SITE, { path: '/pgdm-bm' }).alternates?.canonical).toBe(
      'https://xlridelhi.ac.in/pgdm-bm',
    );
  });

  it('falls back to the site share image for a page without one', () => {
    const images = buildMetadata(SITE, { path: '/about-xlri' }).openGraph?.images;
    expect(images).toEqual([
      {
        url: 'https://xlridelhi.ac.in/brand/share-default.jpg',
        alt: 'Campus',
        width: 1200,
        height: 630,
      },
    ]);
  });

  it('asks not to be indexed when told to', () => {
    expect(buildMetadata(SITE, { path: '/policies/privacy', noIndex: true }).robots).toEqual({
      index: false,
      follow: true,
    });
  });
});

describe('structured data', () => {
  it('leaves address-less steps out of the breadcrumb trail, keeping the page', () => {
    const list = breadcrumbList(SITE.url, [
      { label: 'Home', href: '/' },
      { label: 'Campus Life' },
      { label: 'Latest News', href: '/latest-news' },
      { label: 'A story' },
    ]);
    expect(list?.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://xlridelhi.ac.in' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Latest News',
        item: 'https://xlridelhi.ac.in/latest-news',
      },
      { '@type': 'ListItem', position: 3, name: 'A story' },
    ]);
  });

  it('writes no breadcrumb trail for a single step', () => {
    expect(breadcrumbList(SITE.url, [{ label: 'Home' }])).toBeUndefined();
  });

  it('credits news to the campus, by its identifier', () => {
    const article = newsArticle(SITE.url, {
      headline: 'Convocation',
      path: '/convocation-2024',
      datePublished: '2024-03-04',
      images: ['/media/news/c24-01.jpg'],
    });
    expect(article.publisher).toEqual({ '@id': organizationId(SITE.url) });
    expect(article.image).toEqual(['https://xlridelhi.ac.in/media/news/c24-01.jpg']);
  });

  it('cannot be closed early by a title containing a script tag', () => {
    const json = serializeJsonLd({ name: '</script><script>alert(1)</script>' });
    expect(json).not.toContain('</script>');
    expect(JSON.parse(json)).toEqual({ name: '</script><script>alert(1)</script>' });
  });
});
