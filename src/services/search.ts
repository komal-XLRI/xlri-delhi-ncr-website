import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { PRIMARY_NAV } from '@/config/navigation';
import { site } from '@/config/site';
import { routes } from '@/constants/routes';
import { classifyHref, destinationLabel } from '@/lib/url';
import { fill } from '@/lib/format/template';
import { getStudentEvents, getStudentSocieties } from '@/services/campus-life';
import { getLibrary } from '@/services/library';
import {
  getAdjunctFaculty,
  getFullTimeFaculty,
  getStaff,
  getVisitingFaculty,
} from '@/services/faculty';
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
  '/about-xlri': 'overview institute xlri delhi ncr campus jesuit',
  '/about-xlri/from-the-directors-desk': 'director message fr antony uvari',
  '/about-xlri/mandatory-disclosure': 'aicte disclosure statutory pdf',
  '/about-xlri/accreditation': 'aacsb amba equis nirf ranking accredited',
  '/about-xlri/leadership-administration': 'administration dean registrar',
  '/about-xlri/board-of-governors': 'board governance',
  '/pgdm-bm': 'mba pgdm bm business management programme course two year admission',
  '/post-graduate-diploma-in-management-innovation-entrepreneurship-venture-development':
    'mba pgdm iev innovation entrepreneurship venture startup programme',
  '/emdp-2': 'executive mba working professionals management development',
  '/mdp': 'mdp short course training executives',
  '/icp': 'icp corporate training custom programmes',
  '/core-faculty': 'faculty professors teachers directory staff',
  '/placement': 'placement jobs recruiters salary ctc careers',
  '/placement/final-placements': 'final placement report salary ctc offers 2024-26',
  '/placement/summer-internships': 'summer internship stipend 2025',
  '/placement/reports': 'placement audit reports pdf archive',
  '/sustainability-core-team-2': 'sustainability green environment team',
  '/centre-for-gender-equality-inclusive-leadership':
    'gender women inclusion diversity leadership centre',
  '/center-for-public-policy-and-public-affairs': 'policy government public affairs centre',
  '/indian-school-for-design-of-automobiles': 'automobile car automotive design gandini centre',
  '/xlri-center-for-healthcare-management': 'health hospital healthcare centre',
};

/** "/placement#recruiters" → "/placement". */
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

  const listings = [
    { directory: await getFullTimeFaculty(), base: routes.faculty.index },
    { directory: await getAdjunctFaculty(), base: routes.faculty.adjunct },
  ];
  for (const { directory, base } of listings) {
    for (const member of directory.faculty) {
      entries.push({
        id: `person:${member.id}`,
        kind: 'person',
        title: member.name,
        href: `${base}/${member.id}`,
        trail: directory.title,
        summary: `${member.designation} · ${member.areas.join(', ')}`,
        keywords: `${member.qualification} ${member.email} faculty professor`,
      });
    }
  }

  // Visiting faculty have no profile page; the result opens their card.
  const visiting = await getVisitingFaculty();
  for (const member of visiting.faculty) {
    entries.push({
      id: `person:${member.id}`,
      kind: 'person',
      title: member.name,
      href: `${routes.faculty.visiting}#${member.id}`,
      trail: visiting.title,
      summary: `${member.designation} · ${member.organisation}`,
      keywords: 'visiting faculty',
    });
  }

  // Staff likewise: the result opens their card on the Staff page.
  const staff = await getStaff();
  for (const member of staff.staff) {
    entries.push({
      id: `staff:${member.id}`,
      kind: 'person',
      title: member.name,
      href: `${routes.faculty.staff}#${member.id}`,
      trail: staff.title,
      summary: member.designation,
      keywords: 'staff',
    });
  }

  // Student committees: the result opens the committee on Student Societies.
  const societies = await getStudentSocieties();
  for (const committee of societies.committees) {
    entries.push({
      id: `society:${committee.id}`,
      kind: 'page',
      title: committee.name,
      href: `${routes.campusLife.societies}#${committee.id}`,
      trail: `Campus Life › ${societies.title}`,
      summary: committee.fullName ?? committee.focus,
      keywords: [
        'committee club society student',
        committee.focus,
        committee.lead?.name ?? '',
      ].join(' '),
    });
  }

  // The library's own pages, which sit under its menu rather than the main one.
  // Titles are the pages' own browser-tab titles, from library.json.
  const library = await getLibrary();
  const { pages } = library;
  const libraryPages: readonly (readonly [string, string, string])[] = [
    [
      'services',
      pages.services.meta.title,
      'circulation borrowing reprography photocopy reference cases textbooks turnitin',
    ],
    ['committee', pages.committee.meta.title, 'librarian committee'],
    ...library.collections.map(
      (collection) =>
        [
          collection.id,
          fill(pages.collection.meta.title, { label: collection.label }),
          collection.items.map((item) => item.name).join(' '),
        ] as const,
    ),
    ['gallery', pages.gallery.meta.title, 'photos'],
    ['contact', pages.contact.meta.title, 'email phone hours'],
  ];
  for (const [slug, title, keywords] of libraryPages) {
    entries.push({
      id: `library:${slug}`,
      kind: 'page',
      title,
      href: routes.campusLife.libraryPage(slug),
      trail: `Campus Life › ${library.title}`,
      keywords: `library ${keywords}`,
    });
  }

  // Student events: the result opens the event's poster on Student Events.
  const studentEvents = await getStudentEvents();
  for (const event of studentEvents.events) {
    entries.push({
      id: `event:${event.id}`,
      kind: 'page',
      title: event.title,
      href: `${routes.campusLife.studentEvents}#${event.id}`,
      trail: `Campus Life › ${studentEvents.title}`,
      summary: event.summary,
      keywords: ['event', ...event.organisers.map((organiser) => organiser.name)].join(' '),
    });
  }

  return entries;
}
