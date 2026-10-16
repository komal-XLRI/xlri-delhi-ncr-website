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

export function DumbbellIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" />
    </Svg>
  );
}

export function BusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="16" height="13" rx="2.5" />
      <path d="M4 11h16M8 17v2.5M16 17v2.5" />
      <circle cx="8" cy="14" r="0.6" fill="currentColor" />
      <circle cx="16" cy="14" r="0.6" fill="currentColor" />
    </Svg>
  );
}

export function ScissorsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="6.5" r="2.5" />
      <circle cx="6" cy="17.5" r="2.5" />
      <path d="M8.2 7.8 20 18M8.2 16.2 20 6" />
    </Svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </Svg>
  );
}

export function CarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 16.5H3.5v-4l2-5h13l2 5v4H19" />
      <path d="M3.5 12.5h17M9 16.5h6" />
      <circle cx="7" cy="16.5" r="2" />
      <circle cx="17" cy="16.5" r="2" />
    </Svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </Svg>
  );
}

export function FileIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8Z" />
      <path d="M14 3v5h5M8.5 13h7M8.5 16.5h5" />
    </Svg>
  );
}

export function StethoscopeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 3.5v5a4.5 4.5 0 0 0 9 0v-5" />
      <path d="M9.5 13v2.5a4.5 4.5 0 0 0 9 0V13" />
      <circle cx="18.5" cy="10.5" r="2.5" />
    </Svg>
  );
}

export function PillIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-45 12 12)" />
      <path d="m9.5 9.5 5 5" />
    </Svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14a6.5 6.5 0 0 1 3 6" />
    </Svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 3.5h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.6 6.6l1.4-2.3 4.5 1.8V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5Z" />
    </Svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20.5 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 20.5 12Z" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" strokeWidth={2.5} />
    </Svg>
  );
}

export function GamepadIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 7h10a5 5 0 0 1 4.6 7l-1 2.3a2.6 2.6 0 0 1-4.4.6L14.5 15h-5l-1.7 1.9a2.6 2.6 0 0 1-4.4-.6l-1-2.3A5 5 0 0 1 7 7Z" />
      <path d="M7.5 10v3M6 11.5h3" />
      <path d="M15.5 11h.01M17.5 12.5h.01" strokeWidth={2.5} />
    </Svg>
  );
}

export function BallIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3v18" />
      <path d="M5.6 5.6a9 9 0 0 1 0 12.8M18.4 5.6a9 9 0 0 0 0 12.8" />
    </Svg>
  );
}

export function TreeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21v-6" />
      <path d="M12 3a5 5 0 0 0-4.6 7A4.5 4.5 0 0 0 8.5 18h7a4.5 4.5 0 0 0 1.1-8A5 5 0 0 0 12 3Z" />
    </Svg>
  );
}

export function RouteIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="18.5" r="2.5" />
      <circle cx="18" cy="5.5" r="2.5" />
      <path d="M8.5 18.5h7.5a3.5 3.5 0 0 0 0-7H8a3.5 3.5 0 0 1 0-7h7.5" />
    </Svg>
  );
}

export function BedIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 19v-12M3 15h18v4M21 15v-3a3 3 0 0 0-3-3h-8v6" />
      <circle cx="6.5" cy="11.5" r="1.8" />
    </Svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m3.5 10.5 8.5-7 8.5 7" />
      <path d="M5.5 9v11h13V9M10 20v-6h4v6" />
    </Svg>
  );
}

export function BasketIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 10h17l-1.8 9a1.5 1.5 0 0 1-1.5 1.2H6.8A1.5 1.5 0 0 1 5.3 19Z" />
      <path d="m8 10 3-6M16 10l-3-6M9.5 14v3M14.5 14v3" />
    </Svg>
  );
}

export function UtensilsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 3v7a2 2 0 0 0 4 0V3M8 3v18" />
      <path d="M17 21V3c-2.2 1-3.5 3.5-3.5 7v3H17" />
    </Svg>
  );
}

export function CoffeeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 9h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" />
      <path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5v2.5M12 3.5v2.5" />
    </Svg>
  );
}

export function ShirtIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 3.5 3.5 6.5l2 4.5 2-1V20.5h9V10l2 1 2-4.5L15 3.5a3 3 0 0 1-6 0Z" />
    </Svg>
  );
}
