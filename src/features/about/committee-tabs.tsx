'use client';

import { useRef, useState, type KeyboardEvent } from 'react';

import { cn } from '@/lib/cn';
import type { Committee, CommitteeGroup } from '@/types/leadership';

/**
 * The councils and committees, one tab per group (A–E) — the Jamshedpur tab
 * row: plain labels, the selected one underlined in green.
 *
 * ## Why every panel is in the HTML
 *
 * Unselected panels are `hidden`, not unmounted. All 250-odd names are then in
 * the server-rendered page, so "who convenes the Library committee?" can be
 * answered by the browser's find-in-page or a search engine without anyone
 * guessing which tab to open.
 *
 * ## Tabs on a phone
 *
 * Jamshedpur swaps its tabs for an accordion below desktop. Here the tab row
 * simply scrolls sideways: one component, one set of markup, and five short
 * labels sit comfortably in a swipeable strip. Keyboard behaviour is the
 * WAI-ARIA Tabs pattern — Left/Right move and select, Home/End jump.
 *
 * ## The cards
 *
 * Committees run from three members to eleven, so a grid would leave ragged
 * holes. CSS columns pack them like a newspaper instead, and
 * `break-inside-avoid` keeps each card whole.
 */
export function CommitteeTabs({ groups }: { groups: readonly CommitteeGroup[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const last = groups.length - 1;

  const go = (index: number) => {
    const next = index < 0 ? last : index > last ? 0 : index;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: last,
    };
    const target = moves[event.key];
    if (target !== undefined) {
      event.preventDefault();
      go(target);
    }
  };

  return (
    <div>
      <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
        <div
          role="tablist"
          aria-label="Councils and committees"
          className="flex min-w-max gap-8 border-b border-border md:gap-10"
        >
          {groups.map((group, index) => {
            const selected = index === active;
            return (
              <button
                key={group.code}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                id={`committee-tab-${group.code}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`committee-panel-${group.code}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={onKeyDown}
                className={cn(
                  'relative -mb-px pb-3 text-base font-semibold whitespace-nowrap transition-colors md:text-lg',
                  selected ? 'text-ink-strong' : 'text-ink-muted hover:text-ink-strong',
                )}
              >
                <span className="mr-1.5 text-ink-muted">{group.code}.</span>
                {group.tabLabel}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-accent-surface transition-opacity',
                    selected ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {groups.map((group, index) => (
        <div
          key={group.code}
          id={`committee-panel-${group.code}`}
          role="tabpanel"
          aria-labelledby={`committee-tab-${group.code}`}
          hidden={index !== active}
          className="pt-8 md:pt-10"
        >
          <h3 className="text-sm font-semibold tracking-[0.14em] text-ink-muted uppercase">
            {group.code}. {group.title}
          </h3>
          <div className="mt-6 columns-1 gap-6 md:columns-2 xl:columns-3">
            {group.committees.map((committee) => (
              <CommitteeCard key={committee.code} committee={committee} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CommitteeCard({ committee }: { committee: Committee }) {
  const paired = committee.members.some((member) => typeof member !== 'string');

  return (
    <section
      aria-labelledby={`committee-${committee.code}`}
      className="mb-6 break-inside-avoid rounded-[5px] border border-t-[3px] border-border border-t-accent-surface bg-surface p-5 md:p-6"
    >
      <h4
        id={`committee-${committee.code}`}
        className="flex gap-2.5 text-sm leading-snug font-semibold tracking-[0.06em] text-ink-strong uppercase"
      >
        <span className="shrink-0 text-brand">{committee.code}</span>
        <span>{committee.name}</span>
      </h4>

      {paired ? (
        <dl className="mt-4 divide-y divide-border">
          {committee.members.map((member) =>
            typeof member === 'string' ? null : (
              <div key={`${member.role}-${member.name}`} className="py-2.5 first:pt-0 last:pb-0">
                <dt className="text-xs font-medium tracking-wide text-ink-muted uppercase">
                  {member.role}
                </dt>
                <dd
                  className={cn(
                    'mt-0.5 text-[0.9375rem] text-ink',
                    isConvenor(member.name) && 'font-semibold text-ink-strong',
                  )}
                >
                  {member.name}
                </dd>
              </div>
            ),
          )}
        </dl>
      ) : (
        <ol className="mt-4 divide-y divide-border">
          {committee.members.map((member, index) => {
            const text = typeof member === 'string' ? member : `${member.role} — ${member.name}`;
            return (
              <li
                key={`${index}-${text}`}
                className={cn(
                  'py-2 text-[0.9375rem] leading-snug text-ink first:pt-0 last:pb-0',
                  isConvenor(text) && 'font-semibold text-ink-strong',
                )}
              >
                {text}
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

/** The convenor's line is set bold, so each committee's lead is findable at a glance. */
function isConvenor(text: string): boolean {
  return /convenor/i.test(text);
}
