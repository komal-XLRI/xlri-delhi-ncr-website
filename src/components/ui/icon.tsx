import type { SVGProps } from 'react';

/**
 * The curated icon set.
 *
 * Inline SVG from a local set, never an icon package (§5). Two reasons:
 *
 *  1. **Weight.** An icon library ships hundreds of glyphs to use six. Even
 *     tree-shaken, the wrapper components and their runtime cost more than the
 *     handful of paths below.
 *
 *  2. **Consistency.** The header previously used text glyphs — ⌕ for search,
 *     ☰ for menu, ▾ for the dropdown caret. Those render from whatever font
 *     happens to be available, so their weight, size, and baseline shift
 *     between macOS, Windows, and Android. On a site whose whole design premise
 *     is typographic control, that is not acceptable.
 *
 * All icons inherit `currentColor` and size from the `size` prop, and are
 * `aria-hidden` by default — an icon beside a visible label must not be
 * announced twice. Where an icon is the only content, the calling component
 * supplies an accessible name.
 */

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /** Rendered square size in pixels. */
  size?: number;
}

function Svg({ size = 20, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </Svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  );
}

/** Dropdown affordance. Rotates 180° when its panel is open. */
export function ChevronDownIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  );
}

/** Marks a link that leaves the site. Paired with text for screen readers. */
export function ExternalIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </Svg>
  );
}

/** Contrast toggle. A half-filled circle is the conventional glyph. */
export function ContrastIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 0 0 18Z" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/* ---------------------------------------------------------------------------
   Credential icons.

   Line drawings, not glyphs in coloured circles — §10 rules out the filled-icon
   grid by name. Each is a category marker that helps the eye find a cell when
   scanning six of them, which is a real job; none of them restates the word
   beneath it more than the convention requires.
   ------------------------------------------------------------------------- */

/** Founding, heritage — a classical portico. */
export function LandmarkIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 10h18L12 4 3 10Z" />
      <path d="M6 10v8M10 10v8M14 10v8M18 10v8" />
      <path d="M3 20h18" />
    </Svg>
  );
}

/** Ranking, standing. */
export function AwardIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m8.5 13.8-1.4 6.2 4.9-2.6 4.9 2.6-1.4-6.2" />
    </Svg>
  );
}

/** Accreditation — a seal with a mark of approval. */
export function SealIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m12 3 2.2 1.7 2.8-.3 1 2.6 2.4 1.4-.8 2.7.8 2.7-2.4 1.4-1 2.6-2.8-.3L12 21l-2.2-1.7-2.8.3-1-2.6L3.6 15l.8-2.7-.8-2.7L6 8.2l1-2.6 2.8.3L12 3Z" />
      <path d="m9.2 12.2 2 2 3.6-3.9" />
    </Svg>
  );
}

/** Recruiters, employment. */
export function BriefcaseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="7.5" width="18" height="12.5" rx="1.5" />
      <path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5" />
      <path d="M3 12.5h18" />
    </Svg>
  );
}

/** Location. */
export function MapPinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </Svg>
  );
}

/** Reach, alumni network. */
export function GlobeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
    </Svg>
  );
}

/* ---------------------------------------------------------------------------
   Mission icons.

   One per commitment. Line drawings in the same 1.75 stroke as everything else
   — the point is that the five rows are scannable at a glance, not that each
   glyph explains its sentence. They are `aria-hidden`; the sentence beside them
   is the content.
   ------------------------------------------------------------------------- */

/** Disseminating knowledge — an open book. */
export function BookIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 6.5C10.5 5.2 8.4 4.5 5 4.5v13c3.4 0 5.5.7 7 2 1.5-1.3 3.6-2 7-2v-13c-3.4 0-5.5.7-7 2Z" />
      <path d="M12 6.5v13" />
    </Svg>
  );
}

/** Extending frontiers — a compass rose. */
export function CompassIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.2 8.8-1.9 4.5-4.5 1.9 1.9-4.5 4.5-1.9Z" />
    </Svg>
  );
}

/** Nurturing leaders — new growth. */
export function LeafIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 19.5c0-7 4.5-12 15-12.5 0 9.5-5 13.5-11 13.5a5 5 0 0 1-4-1Z" />
      <path d="M9 15c2.2-2.4 4.6-3.9 7.5-4.8" />
    </Svg>
  );
}

/** Critical thinking — a lamp. */
export function LightbulbIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.2 16.5a6.5 6.5 0 1 1 5.6 0" />
      <path d="M9.5 19.5h5M10.5 22h3" />
    </Svg>
  );
}

/** Innovation — a struck spark. */
export function SparkIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M6.2 6.2 9 9M15 15l2.8 2.8M17.8 6.2 15 9M9 15l-2.8 2.8" />
    </Svg>
  );
}

/** Forward action. Used in the pill button on the About section. */
/** A tick, for the fact chips beside a programme. */
export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h13" />
      <path d="m12.5 6 6 6-6 6" />
    </Svg>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 5v14M15 5v14" />
    </Svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 4.5v15l12-7.5z" fill="currentColor" stroke="none" />
    </Svg>
  );
}
