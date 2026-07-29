/**
 * Homepage content shapes.
 *
 * Types live in the leaf `types/` layer, not beside the data in `content/`.
 * That is not filing preference — `features/` is forbidden from importing
 * `content/` (§7), because the whole point of the content layer is that nothing
 * above `services/` knows it exists. A component still needs to describe the
 * props it accepts, so the shape lives here and the data lives there.
 *
 * The boundary lint caught this the moment the hero component tried to import
 * its type from `content/`, which is the rule earning its keep: the import was
 * type-only and would have compiled away to nothing, but it would have left a
 * dependency in the source that quietly contradicted the architecture.
 */

/**
 * Self-hosted background video for the hero.
 *
 * Deliberately not a YouTube URL. An iframe embed above the fold costs roughly
 * 500 kB–1 MB of third-party JavaScript against a 90 kB first-load budget, and
 * puts an origin we do not control in the critical path. See
 * `features/homepage/hero-video.tsx`.
 *
 * Supply WebM as well as MP4 where possible — VP9/AV1 typically lands 30–50%
 * smaller than H.264 at the same quality, and browsers pick the first source
 * they can play.
 */
export interface HeroVideoSource {
  readonly mp4?: string;
  readonly webm?: string;
}

export interface HeroMedia {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  /**
   * Alt text.
   *
   * Empty when the image is decorative — a hero photograph that merely sets a
   * mood beside a heading that already says everything is decorative, and
   * describing it again is noise for a screen-reader user. Fill this in only if
   * the photograph carries information the text does not.
   */
  readonly alt: string;
  /** Surfaced on the design-system page so stand-ins are not quietly forgotten. */
  readonly placeholder: boolean;
  /** Credit line, where the photographer requires one. */
  readonly credit?: string;
  /**
   * Optional background video. When absent — as now — the hero is the still
   * image alone, which is also what every reduced-motion, data-saver, and
   * no-JavaScript visitor sees.
   */
  readonly video?: HeroVideoSource;
}

/**
 * A rotating spotlight item in the hero card.
 *
 * Only the *card* rotates — the background media and the headline stay put.
 * That is the whole difference between this and a conventional hero carousel:
 * swapping four background images means four large downloads, four decode
 * costs, and layout shift on every transition. Swapping a few hundred bytes of
 * text costs nothing measurable.
 */
export interface HeroSpotlightItem {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly excerpt: string;
  readonly href: string;
}

/**
 * A credential shown in the strip that straddles the foot of the hero.
 *
 * `value` is the figure or short claim; `label` says what it measures. A number
 * without a label is decoration, so both are required.
 */
/**
 * Icon names, not components.
 *
 * The content layer must stay free of React — it becomes a CMS collection in
 * Phase 6, and a database cannot store a component. The feature maps these
 * names to the drawings.
 */
export type CredentialIcon = 'landmark' | 'award' | 'seal' | 'briefcase' | 'map-pin' | 'globe';

export interface HeroCredential {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  /** Optional source, for claims that need one — rankings especially. */
  readonly source?: string;
  /**
   * Where the claim is substantiated. A credential that states a fact and then
   * offers nowhere to check it is an assertion; one that links is evidence.
   */
  readonly href?: string;
  /** Category marker, to help the eye find a cell when scanning the strip. */
  readonly icon?: CredentialIcon;
}

export interface HeroAction {
  readonly label: string;
  readonly href: string;
}

export interface Hero {
  readonly eyebrow: string;
  readonly headline: string;
  /** Optional second line, set in the accent-adjacent weight for contrast of texture. */
  readonly headlineEmphasis?: string;
  readonly lead: string;
  /**
   * Hero call-to-action buttons. Both optional — the hero currently runs without
   * them, leaning on the spotlight card's own links and the primary navigation.
   */
  readonly primaryAction?: HeroAction;
  readonly secondaryAction?: HeroAction;
  readonly media: HeroMedia;
  /** Rotating spotlight card. Omit to render the hero without one. */
  readonly spotlight?: readonly HeroSpotlightItem[];
  /** Credentials strip across the foot of the hero. */
  readonly credentials?: readonly HeroCredential[];
}

/* ---------------------------------------------------------------------------
   About section
   ------------------------------------------------------------------------ */

export interface AboutImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly placeholder: boolean;
  /** Shown beneath the gallery, and announced when the slide changes. */
  readonly caption?: string;
}

export type MissionIcon = 'book' | 'compass' | 'leaf' | 'lightbulb' | 'spark';

/**
 * One mission commitment.
 *
 * The icon name is stored, never the component — this becomes a CMS collection
 * in Phase 6 and a database cannot hold JSX. Same reason `HeroCredential` works
 * this way.
 */
export interface MissionCommitment {
  readonly text: string;
  readonly icon: MissionIcon;
}

export interface AboutStatementBlock {
  readonly title: string;
  /** A single statement (Vision) or a set of commitments (Mission). */
  readonly text?: string;
  readonly items?: readonly MissionCommitment[];
}

/**
 * The statement of purpose, which is its own full-bleed section rather than a
 * pull quote inside About.
 *
 * The sentence is stored in two parts so the closing phrase can be set apart
 * typographically. That is a content decision, not a styling one — where the
 * emphasis falls changes what the sentence argues — so it belongs in the
 * content layer where an editor can move it, not hard-coded in a component.
 */
export interface Purpose {
  /** Eyebrow, and the section's real `h2`. */
  readonly label: string;
  /** The statement up to the emphasised phrase. */
  readonly lead: string;
  /** The closing phrase, set in the accent italic. Optional. */
  readonly emphasis?: string;
  readonly attribution?: string;
}

/**
 * One part of the motto, and what the institution means by it.
 *
 * A term and its definition, which is exactly what it is rendered as. The last
 * part is emphasised in the accent, derived from position rather than flagged
 * here — a content editor should not have to remember to move a `highlight`
 * flag when the motto changes.
 */
export interface MottoPart {
  readonly word: string;
  readonly text: string;
}

export interface About {
  /** Section heading. Rendered small-caps but carried by a real `h2`. */
  readonly heading: string;
  /** Body paragraphs. An array so the CMS can hold rich text later. */
  readonly body: readonly string[];
  readonly action: HeroAction;
  readonly purpose: Purpose;
  readonly vision: AboutStatementBlock;
  readonly mission: AboutStatementBlock;
  /**
   * The institutional motto, one entry per part.
   *
   * Split explicitly rather than left to wrap: each part now carries its own
   * gloss, so the division is structural rather than typographic, and the three
   * are rendered as a term-and-definition set.
   */
  readonly motto: readonly MottoPart[];
  /** Rotating gallery. A single entry renders as a still image. */
  readonly gallery: readonly AboutImage[];
}

/* ---------------------------------------------------------------------------
   Global accreditations
   ------------------------------------------------------------------------ */

/**
 * Which mark in `config/brand.ts` an entry is about.
 *
 * A string, not the mark itself — the same rule as `CredentialIcon` and
 * `MissionIcon` above, and for the same reason: the content layer becomes a CMS
 * collection in Phase 6, and a database cannot store an imported module. It is
 * also forbidden from importing `config/` at all (§7), so the artwork could not
 * live here even if a CMS could hold it.
 *
 * The consequence worth stating: **name, full name, and logo are not fields on
 * `AccreditationItem`.** They already exist, once, in `config/brand.ts`, which
 * is the declared single source for every brand asset on the site. Repeating
 * them here would create two places for "AACSB" to be spelled and eventually
 * two spellings. The feature resolves the id to the mark and reads them from
 * there.
 */
export type AccreditationMarkId = 'aacsb' | 'amba' | 'equis';

/**
 * One accreditation, as an editor writes it.
 *
 * Everything here is copy — the parts a communications team would revise
 * without a developer. The parts that are *assets* live in `config/brand.ts`.
 */
export interface AccreditationItem {
  readonly id: string;
  /** Resolves to the artwork, name, and full name in `config/brand.ts`. */
  readonly markId: AccreditationMarkId;
  /**
   * What this accreditation is, in **one line**.
   *
   * The limit is structural, not stylistic. Every slide occupies the same cell
   * of a stack and the tallest sets the height for all three, so a second line
   * on one slide adds dead space to the other two permanently — and the whole
   * point of the coverflow is that a visitor takes the mark in at a glance
   * rather than reading. Keep these under about 70 characters.
   */
  readonly description: string;
  /** Optional "Learn more" target. Omit and the slide renders without one. */
  readonly action?: HeroAction;
}

/**
 * The trust strip beneath the grid.
 *
 * Separate from `footnote`, which this replaced, because it is not an aside —
 * it is the claim the three cards add up to, and it is the one place the
 * section says how rare holding all three actually is. A component can render a
 * footnote small and grey; this one has a heading of its own.
 */
export interface AccreditationSeal {
  /** "Triple Crown Accredited". */
  readonly label: string;
  /** How uncommon the combination is, and what it is called. */
  readonly text: string;
}

/*
 * `eyebrow` used to live here — the small-caps "Global recognition" above the
 * heading. It is gone rather than merely unrendered: an optional field nothing
 * reads is a trap for whoever next fills in the content and wonders why their
 * text does not appear.
 */
export interface Accreditations {
  /** The section's real `h2`, and the page's second-strongest line of type. */
  readonly heading: string;
  /** Why triple accreditation is worth a section rather than a logo strip. */
  readonly intro: string;
  readonly items: readonly AccreditationItem[];
  /** Optional closing strip. Omit and the section ends on the grid. */
  readonly seal?: AccreditationSeal;
}

/* ---------------------------------------------------------------------------
   Academic programmes
   ------------------------------------------------------------------------ */

/**
 * A short factual chip beside a programme — "Doctoral", "For working
 * professionals".
 *
 * ## What belongs here, and what does not
 *
 * Only things that restate the programme's own name, level, or format. Those
 * are matters of definition and can be written without a source.
 *
 * What must **not** appear here is a regulatory or ranking claim — "AICTE
 * Approved", "NBA Accredited", "Ranked #3" — unless the communications team has
 * supplied it. A chip is read as a verified fact about a qualification, which
 * makes it the single worst element on a university homepage to guess at. The
 * institution's real accreditations are stated once, with attribution, in the
 * accreditation section; they are institution-level and do not transfer to an
 * individual programme without confirmation.
 */
export interface ProgrammeHighlight {
  readonly id: string;
  readonly label: string;
}

export interface ProgrammeImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  /** True while this is generic campus photography standing in for the real thing. */
  readonly placeholder: boolean;
}

export interface AcademicProgramme {
  readonly id: string;
  /** "PGDM (Business Management)" — exactly as the navigation spells it. */
  readonly name: string;
  /** Short label for the navigation rail, where the full name will not fit. */
  readonly shortName: string;
  /** "Postgraduate", "Doctoral", "Executive". */
  readonly category: string;
  /** One sentence. Two is already too many for this layout. */
  readonly description: string;
  readonly highlights: readonly ProgrammeHighlight[];
  readonly image: ProgrammeImage;
  readonly action: HeroAction;
}

export interface Academics {
  readonly eyebrow: string;
  readonly heading: string;
  readonly programmes: readonly AcademicProgramme[];
  /**
   * The single closing call to action.
   *
   * A bare action, not a `footer` block. It carried a heading and a sentence
   * as well; both restated the button's own label, so the section closed by
   * saying the same thing three times.
   */
  readonly action: HeroAction;
}

/* ---------------------------------------------------------------------------
   Insights — blogs and student testimonials
   ------------------------------------------------------------------------ */

export interface Testimonial {
  readonly id: string;
  readonly name: string;
  /** The quote as the homepage displays it. Never re-punctuated or extended. */
  readonly quote: string;
  /** True where the source itself truncates the quote mid-sentence. */
  readonly truncated?: boolean;
  /** Programme, where the source states one. It states none today. */
  readonly programme?: string;
  readonly graduationYear?: string;
  /**
   * Portrait.
   *
   * Optional, and genuinely absent for one student — see the content note. A
   * missing portrait renders as initials rather than as a stock face.
   */
  readonly photo?: ProgrammeImage;
}

export interface Insights {
  readonly testimonials: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly items: readonly Testimonial[];
  };
}

/* ---------------------------------------------------------------------------
   Latest events
   ------------------------------------------------------------------------ */

export interface EventItem {
  readonly id: string;
  /** Verbatim from xlridelhi.ac.in. Never paraphrased — see the content note. */
  readonly title: string;
  /**
   * The date exactly as the source site prints it: "08 Apr".
   *
   * Stored as a display string rather than formatted from `dateTime`, because
   * the source shows no year and reformatting would either invent one on screen
   * or silently change what the institution published.
   */
  readonly dateLabel?: string;
  /**
   * ISO date for `<time datetime>`, so the date is machine-readable for sorting
   * and structured data even though the visible label is not.
   *
   * The **year is inferred**, not published — see the content note.
   */
  readonly dateTime?: string;
  readonly href: string;
  readonly image: ProgrammeImage;
}

export interface Events {
  readonly heading: string;
  readonly intro: string;
  readonly items: readonly EventItem[];
  readonly action: HeroAction;
}

/* ---------------------------------------------------------------------------
   News & announcements
   ------------------------------------------------------------------------ */

export interface NewsImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  /**
   * True while this is generic campus photography standing in for a real
   * picture of the story. Carried in the data rather than left as a comment so
   * the set can be audited — `grep placeholder: true` is a to-do list the
   * communications team can work through.
   */
  readonly placeholder: boolean;
}

export interface NewsItem {
  readonly id: string;
  /** Kind of announcement — Admissions, Research, Events. Drives the eyebrow. */
  readonly category: string;
  readonly title: string;
  readonly href: string;
  /** `YYYY-MM-DD`. A calendar date an editor typed, not an instant. */
  readonly date: string;
  /** Optional: several announcements are titles only until copy is written. */
  readonly excerpt?: string;
  readonly image?: NewsImage;
  /** Leaves the site. Changes the affordance and adds rel/target. */
  readonly external?: boolean;
}

export interface News {
  readonly heading: string;
  readonly intro?: string;
  readonly action: HeroAction;
  /** Rotates in the feature slot. A single entry renders as a still card. */
  readonly featured: readonly NewsItem[];
  /** The list beside it. */
  readonly items: readonly NewsItem[];
}
