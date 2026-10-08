import { describe, expect, it } from 'vitest';

import { PRIMARY_NAV, POLICY_NAV, UTILITY_NAV, allNavLinks } from '@/config/navigation';
import { findNavTreeProblems, walkNavTree } from '@/lib/validation/navigation';
import { classifyHref } from '@/lib/url';
import { routes } from '@/constants/routes';

/**
 * The navigation tree drives six surfaces (§8.1), so a defect here is six
 * defects. These tests guard the invariants that types cannot express and that
 * a reviewer would not reliably catch by reading a 400-line data file.
 */
const SITE = 'https://xlridelhi.ac.in';

describe('tree integrity', () => {
  it('passes its own validator', () => {
    expect(findNavTreeProblems(PRIMARY_NAV)).toEqual([]);
  });

  it('has exactly ten primary items (D4, revisited)', () => {
    // Not arbitrary: §2.2 found that twelve items cannot sit balanced at 1280px
    // with premium type. The agreed eight became nine when Centres was promoted
    // to the top level to match the Delhi-NCR site (2026-10-07), and ten when
    // Sustainability followed it the same day — each time after checking the
    // bar still fits at 1280px. If this fails, the IA decision is being
    // reopened again — which is fine, but it should be deliberate.
    expect(PRIMARY_NAV).toHaveLength(10);
  });

  it('gives Centres its own primary item, not a column under Faculty & Research', () => {
    expect(PRIMARY_NAV.map((i) => i.id)).toContain('centres');
    const faculty = PRIMARY_NAV.find((i) => i.id === 'faculty-research');
    expect(faculty?.children?.map((c) => c.id)).not.toContain('centres-group');
  });

  it('gives every node a unique id, since ids drive aria-controls', () => {
    const ids = walkNavTree(PRIMARY_NAV).map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('leaves no node unreachable', () => {
    for (const node of walkNavTree(PRIMARY_NAV)) {
      const reachable = Boolean(node.href) || Boolean(node.children?.length);
      expect(reachable, `"${node.id}" has neither href nor children`).toBe(true);
    }
  });

  it('keeps every panel to a workable number of columns', () => {
    for (const item of PRIMARY_NAV) {
      if (!item.children) continue;
      expect(item.children.length, `${item.id} panel`).toBeLessThanOrEqual(4);
    }
  });
});

describe('agreed information architecture', () => {
  it('keeps Admissions in the primary bar (Q11)', () => {
    expect(PRIMARY_NAV.map((i) => i.id)).toContain('admissions');
  });

  it('gives Sustainability its own primary item, after Centres, not a column under About', () => {
    const ids = PRIMARY_NAV.map((i) => i.id);
    expect(ids.indexOf('sustainability')).toBe(ids.indexOf('centres') + 1);
    const about = PRIMARY_NAV.find((i) => i.id === 'about');
    expect(about?.children?.map((c) => c.id)).not.toContain('about-sustainability');
  });

  it('gives News & Events the eighth primary slot (Q12)', () => {
    expect(PRIMARY_NAV.map((i) => i.id)).toContain('news-events');
  });

  it('surfaces the two orphaned legacy sections found in the audit (§16 F4)', () => {
    const ids = walkNavTree(PRIMARY_NAV).map((n) => n.id);
    expect(ids).toContain('sustainability-group'); // 15 orphaned legacy pages
    expect(ids).toContain('campus-library'); // ~10 scattered legacy pages
  });
});

describe('cross-property links (Q11 / §16 F1)', () => {
  it('sends shared admissions information to the institute site rather than duplicating it', () => {
    const admissions = PRIMARY_NAV.find((i) => i.id === 'admissions');
    const institute = admissions?.children?.find((c) => c.id === 'admissions-institute');
    expect(institute).toBeDefined();

    const links = institute?.children ?? [];
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(classifyHref(link.href ?? '', SITE), `${link.id} should leave for xlri.ac.in`).toBe(
        'sibling',
      );
    }
  });

  it('keeps Delhi-NCR-specific admissions content on this site', () => {
    const admissions = PRIMARY_NAV.find((i) => i.id === 'admissions');
    const local = admissions?.children?.find((c) => c.id === 'admissions-delhi');
    for (const link of local?.children ?? []) {
      expect(classifyHref(link.href ?? '', SITE), `${link.id} should be internal`).toBe('internal');
    }
  });

  it('routes Alumni and Giving to their own properties', () => {
    const byId = Object.fromEntries(UTILITY_NAV.map((i) => [i.id, i.href]));
    expect(classifyHref(byId['utility-alumni'] ?? '', SITE)).toBe('sibling');
    expect(classifyHref(byId['utility-giving'] ?? '', SITE)).toBe('sibling');
  });
});

describe('footer policy links', () => {
  it('lists the policy pages the footer is meant to surface', () => {
    const hrefs = POLICY_NAV.map((i) => i.href);
    for (const required of [
      routes.policies.privacy,
      routes.policies.terms,
      routes.policies.copyright,
      routes.policies.help,
      routes.sitemap,
    ]) {
      expect(hrefs, `${required} must appear in the footer policy list`).toContain(required);
    }
  });

  // Removed from the footer at the institute's request. The pages still exist
  // and `routes.policies` still names them; this asserts the footer no longer
  // links to them, so a well-meaning restore has to be deliberate.
  it('omits the four links that were withdrawn', () => {
    const hrefs = POLICY_NAV.map((i) => i.href);
    for (const removed of [
      routes.policies.hyperlinking,
      routes.policies.disclaimer,
      routes.policies.accessibility,
      routes.policies.screenReaderAccess,
    ]) {
      expect(hrefs, `${removed} must not appear in the footer policy list`).not.toContain(removed);
    }
  });
});

describe('internal links match the typed route map', () => {
  it('uses only paths the route map knows about at the section level', () => {
    // Guards against a nav entry pointing at a section that does not exist.
    // Deep pages are added as content lands; the section roots must be real.
    const knownRoots = new Set(
      [
        routes.home,
        routes.about.index,
        routes.academics.index,
        routes.executiveEducation.index,
        routes.admissions.index,
        routes.faculty.index,
        routes.research.index,
        routes.campusLife.index,
        routes.placements.index,
        routes.sustainability.index,
        routes.news.index,
        routes.events.index,
        routes.contact,
        routes.search,
        routes.sitemap,
        '/students',
        '/policies',
      ].map((path) => path.split('/')[1] ?? ''),
    );

    for (const node of allNavLinks()) {
      const href = node.href ?? '';
      if (classifyHref(href, SITE) !== 'internal') continue;
      const root = href.split(/[?#]/)[0]?.split('/')[1] ?? '';
      expect(knownRoots, `"${node.id}" points at an unknown section: ${href}`).toContain(root);
    }
  });
});
