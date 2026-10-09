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
    // Sustainability followed it the same day, and eleven when Admissions gave
    // way to Giving to XLRI and Alumni Portal joined, and ten again when News &
    // Events was removed (both 2026-10-09) — each time after checking the
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
  it('replaces Admissions with Giving to XLRI, last in the bar (2026-10-09)', () => {
    const ids = PRIMARY_NAV.map((i) => i.id);
    expect(ids).not.toContain('admissions');
    expect(ids.at(-1)).toBe('giving');
  });

  it('links Alumni Portal straight to the alumni site, just before Giving', () => {
    const ids = PRIMARY_NAV.map((i) => i.id);
    expect(ids.indexOf('alumni-portal')).toBe(ids.indexOf('giving') - 1);
    const portal = PRIMARY_NAV.find((i) => i.id === 'alumni-portal');
    expect(portal?.children).toBeUndefined();
    expect(classifyHref(portal?.href ?? '', SITE)).toBe('sibling');
  });

  it('gives Sustainability its own primary item, after Centres, not a column under About', () => {
    const ids = PRIMARY_NAV.map((i) => i.id);
    expect(ids.indexOf('sustainability')).toBe(ids.indexOf('centres') + 1);
    const about = PRIMARY_NAV.find((i) => i.id === 'about');
    expect(about?.children?.map((c) => c.id)).not.toContain('about-sustainability');
  });

  it('has no News & Events item (removed 2026-10-09, superseding Q12)', () => {
    expect(PRIMARY_NAV.map((i) => i.id)).not.toContain('news-events');
  });

  it('surfaces the two orphaned legacy sections found in the audit (§16 F4)', () => {
    const ids = walkNavTree(PRIMARY_NAV).map((n) => n.id);
    expect(ids).toContain('sustainability-group'); // 15 orphaned legacy pages
    expect(ids).toContain('campus-library'); // ~10 scattered legacy pages
  });
});

describe('cross-property links (Q11 / §16 F1)', () => {
  it('sends every Giving to XLRI link to the institute site', () => {
    const giving = PRIMARY_NAV.find((i) => i.id === 'giving');
    const links = giving?.children?.flatMap((group) => group.children ?? []) ?? [];
    expect(links.map((l) => l.label)).toEqual([
      'Donation',
      'Scholarship Fund',
      'Endowment Fund',
      'Committee',
      'Future Plans',
    ]);
    for (const link of links) {
      expect(classifyHref(link.href ?? '', SITE), `${link.id} should leave for xlri.ac.in`).toBe(
        'sibling',
      );
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
