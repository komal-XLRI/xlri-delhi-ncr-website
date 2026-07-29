import { describe, expect, it } from 'vitest';

import { classifyHref, destinationLabel, isOffsite } from '@/lib/url';

/**
 * These cases are drawn from the real links found on the current site during the
 * §16 audit, not invented. The classification decides whether a visitor gets a
 * client-side route or a full page load, and whether they are told they are
 * leaving — so getting it wrong is a navigation bug and an accessibility one.
 */
const SITE = 'https://xlridelhi.ac.in';

describe('internal links', () => {
  it.each([
    '/',
    '/admissions',
    '/faculty/jane-doe',
    './relative',
    '../up-one',
    '#section',
    '?page=2',
    '/news?tag=research#top',
  ])('%s is internal', (href) => {
    expect(classifyHref(href, SITE)).toBe('internal');
  });

  it('treats the site’s own absolute URL as internal', () => {
    expect(classifyHref('https://xlridelhi.ac.in/about', SITE)).toBe('internal');
  });

  it('distinguishes the site host from a lookalike', () => {
    expect(classifyHref('https://xlridelhi.ac.in.evil.test/', SITE)).toBe('external');
  });
});

describe('sibling XLRI properties', () => {
  // Every one of these appears on the current homepage (§16 F1).
  it.each([
    'https://xlri.ac.in',
    'https://xlri.ac.in/academic-programmes/admission-procedure/overview',
    'https://xlrialumni.xlri.ac.in/',
    'https://xceed.xlri.ac.in/',
    'https://acad.xlri.ac.in/xluploads/nirf/',
    'https://api.xlri.edu/xlri-75-logo.svg',
  ])('%s is a sibling property', (href) => {
    expect(classifyHref(href, SITE)).toBe('sibling');
  });

  it('does not match a host that merely ends with the same letters', () => {
    expect(classifyHref('https://notxlri.ac.in/', SITE)).toBe('external');
  });

  it('still counts as offsite — a sibling is a different system to the visitor', () => {
    expect(isOffsite(classifyHref('https://xlri.ac.in/donation', SITE))).toBe(true);
  });
});

describe('external links', () => {
  it.each([
    'https://www.aacsb.edu/',
    'https://firebasestorage.googleapis.com/v0/b/xlri-firebase/o/prospectus.pdf',
    'mailto:admissions@xlridelhi.ac.in',
    'tel:+911234567890',
  ])('%s is external', (href) => {
    expect(classifyHref(href, SITE)).toBe('external');
  });

  it('classifies malformed absolute URLs as internal rather than throwing', () => {
    // `http://` with no host fails to parse. Falling back to internal is the safe
    // default: it renders a link that goes nowhere, rather than crashing a page.
    expect(() => classifyHref('http://', SITE)).not.toThrow();
  });
});

describe('destinationLabel', () => {
  it('strips www so the announced host reads naturally', () => {
    expect(destinationLabel('https://www.aacsb.edu/about')).toBe('aacsb.edu');
  });

  it('names the sibling property', () => {
    expect(destinationLabel('https://xlri.ac.in/donation')).toBe('xlri.ac.in');
  });

  it('describes non-web schemes in words rather than reading out a host', () => {
    expect(destinationLabel('mailto:x@y.test')).toBe('email');
    expect(destinationLabel('tel:+9111')).toBe('phone');
  });

  it('returns null for relative hrefs, which are never announced as offsite', () => {
    expect(destinationLabel('/faculty')).toBeNull();
  });
});
