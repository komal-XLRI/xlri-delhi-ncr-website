import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { PRIMARY_NAV } from '@/config/navigation';
import { site } from '@/config/site';
import { classifyHref, destinationLabel } from '@/lib/url';
import { getFullTimeFaculty } from '@/services/faculty';
import type { NavNode } from '@/types/navigation';
import type { SearchEntry } from '@/types/search';

/**
 * The site search index.
 *
 * ## What is in it
 *
 *  - **Pages** — every internal link in the navigation tree whose page has
 *    been built. The menu lists a few destinations that do not exist yet
 *    (Adjunct Faculty, the news pages, …); offering those as results would
 *    send people to a 404, so each href is checked against `src/app`.
 *  - **People** — every full-time faculty profile, findable by name,
 *    designation, functional area or qualification.
 *  - **Elsewhere** — the menu's links to other XLRI sites (admissions, giving,
 *    alumni, XCEED), marked as leaving this site.
 *
 * ## When it is built
 *
 * The header calls this, and every page is prerendered, so it runs at build
 * time — when `src/app` is on disk to check against. If it ever runs where the
 * source is absent (a page rendered at request time on the host), the check is
 * skipped rather than dropping every page. The index is small (a few hundred
 * entries) and goes to the browser whole; matching happens there, as the
 * visitor types, with no server round trip.
 *
 * ## Extra words
 *
 * `KEYWORDS` adds the words people actually type to the pages they mean —
 * "MBA" for the PGDM, "AICTE" for Mandatory Disclosure. It is the one place to
 * teach the search a synonym.
 */

const KEYWORDS: Record<string, string> = {
  '/about': 'overview institute xlri delhi ncr campus jesuit',
  '/about/directors-desk': 'director message fr antony uvari',
  '/about/mandatory-disclosure': 'aicte disclosure statutory pdf',
  '/about/accreditation': 'aacsb amba equis nirf ranking accredited',
  '/about/leadership': 'administration dean registrar',
  '/about/board-of-governors': 'board governance',
  '/academics/programmes/pgdm-business-management':
    'mba pgdm bm business management programme course two year admission',
  '/academics/programmes/pgdm-innovation-entrepreneurship':
    'mba pgdm iev innovation entrepreneurship venture startup programme',
  '/executive-education/emdp': 'executive mba working professionals management development',
  '/executive-education/management-development-programmes': 'mdp short course training executives',
  '/executive-education/in-company-programmes': 'icp corporate training custom programmes',
  '/faculty/full-time': 'faculty professors teachers directory staff',
  '/placements': 'placement jobs recruiters salary ctc careers',
  '/placements/final-placements': 'final placement report salary ctc offers 2024-26',
  '/placements/summer-internships': 'summer internship stipend 2025',
  '/placements/reports': 'placement audit reports pdf archive',
  '/sustainability/team': 'sustainability green environment team',
  '/research/centres/gender-equality': 'gender women inclusion diversity leadership centre',
  '/research/centres/public-policy': 'policy government public affairs centre',
  '/research/centres/design-of-automobiles': 'automobile car automotive design gandini centre',
  '/research/centres/healthcare-management': 'health hospital healthcare centre',
};

/** "/placements#recruiters" → "/placements". */
const pathOf = (href: string) => href.split(/[?#]/)[0] ?? href;

/** Whether `src/app` has a page for this path (static segments only). */
const APP_DIR = join(process.cwd(), 'src', 'app');
const canCheck = existsSync(APP_DIR);

function pageExists(path: string): boolean {
  if (!canCheck) return true;
  const segments = path.split('/').filter(Boolean);
  return existsSync(join(APP_DIR, ...segments, 'page.tsx'));
}

function walk(
  nodes: readonly NavNode[],
  trail: readonly string[],
  visit: (node: NavNode, trail: readonly string[]) => void,
) {
  for (const node of nodes) {
    visit(node, trail);
    if (node.children) walk(node.children, [...trail, node.label], visit);
  }
}

export async function getSearchIndex(): Promise<readonly SearchEntry[]> {
  const entries: SearchEntry[] = [];
  const seen = new Set<string>();

  walk(PRIMARY_NAV, [], (node, trail) => {
    if (!node.href) return;
    const kind = classifyHref(node.href, site.url);
    // A group heading repeats its parent's name ("Faculty & Research ›
    // Faculty & Research"); say it once.
    const crumbs = trail.filter((label, i) => label !== trail[i - 1] && label !== node.label);
    const base = {
      title: node.label,
      href: node.href,
      trail: crumbs.join(' › '),
      ...(node.description ? { summary: node.description } : {}),
    };

    if (kind === 'internal') {
      const path = pathOf(node.href);
      if (seen.has(node.href) || !pageExists(path)) return;
      seen.add(node.href);
      entries.push({
        ...base,
        id: `page:${node.href}`,
        kind: 'page',
        keywords: KEYWORDS[path] ?? '',
      });
      return;
    }

    if (seen.has(node.href)) return;
    seen.add(node.href);
    const destination = destinationLabel(node.href);
    entries.push({
      ...base,
      id: `elsewhere:${node.href}`,
      kind: 'elsewhere',
      keywords: '',
      ...(destination ? { destination } : {}),
    });
  });

  const directory = await getFullTimeFaculty();
  for (const member of directory.faculty) {
    entries.push({
      id: `person:${member.id}`,
      kind: 'person',
      title: member.name,
      href: `/faculty/full-time/${member.id}`,
      trail: directory.title,
      summary: `${member.designation} · ${member.areas.join(', ')}`,
      keywords: `${member.qualification} ${member.email} faculty professor`,
    });
  }

  return entries;
}
