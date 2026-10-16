import { Fragment } from 'react';

/** `**bold**` or `[text](url)`, whichever comes first. */
const MARK = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Text from `news.json` with its two marks rendered: `**bold**` as strong,
 * `[text](url)` as a link. Links leave the site, so they open in a new tab
 * and say so to screen readers.
 */
export function MarkedText({ text, newTab }: { text: string; newTab: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(MARK)) {
    const at = match.index;
    if (at > last) parts.push(text.slice(last, at));
    const [, bold, label, href] = match;
    if (bold !== undefined) {
      parts.push(
        <strong key={at} className="font-semibold text-ink-strong">
          {bold}
        </strong>,
      );
    } else if (label !== undefined && href !== undefined) {
      parts.push(
        <a
          key={at}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand underline decoration-accent-surface decoration-2 underline-offset-[3px] transition-colors hover:decoration-brand"
        >
          {label}
          <span className="sr-only"> {newTab}</span>
        </a>,
      );
    }
    last = at + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}
