import Image from 'next/image';
import NextLink from 'next/link';

import {
  ArrowRightIcon,
  BookIcon,
  CompassIcon,
  LeafIcon,
  LightbulbIcon,
  SparkIcon,
  type IconProps,
} from '@/components/ui/icon';
import { AboutGallery } from '@/features/homepage/about-gallery';
import { MottoStepper } from '@/features/homepage/motto-stepper';
import type { About, MissionIcon } from '@/types/homepage';

/**
 * Name-to-drawing map. The content layer stores a string, not a component —
 * it becomes a CMS collection in Phase 6, and a database cannot hold JSX.
 */
const MISSION_ICONS: Record<MissionIcon, (props: IconProps) => React.ReactElement> = {
  book: BookIcon,
  compass: CompassIcon,
  leaf: LeafIcon,
  lightbulb: LightbulbIcon,
  spark: SparkIcon,
};

/**
 * The photograph behind the Vision panel.
 *
 * Blue hour: the picture has to sit under a heavy scrim and still read as a
 * picture, and a shot that is already low-key loses far less to the wash than a
 * bright midday one would. It is decorative — the vision statement is the
 * content — so its `alt` is empty.
 */
const VISION_IMAGE = { src: '/media/campus-dusk.jpg' } as const;

/**
 * The About section — the second thing on the homepage.
 *
 * One section again, in three movements: the introduction and gallery, the
 * statement of purpose, then Vision, Mission and the motto.
 *
 * ## The purpose band
 *
 * It was briefly its own full-bleed section, centred, at display scale. That
 * gave the sentence real authority but cost roughly 600px of height for
 * fourteen words — a page-stopping device used on something that only needed
 * to be set apart, not enshrined.
 *
 * It is now a **compact band inside this section**: still full-bleed, still
 * navy, still carrying the accent italic, but laid out horizontally — label on
 * the left, statement on the right — which is what buys back the height. A
 * centred stack has to spend vertical space to feel deliberate; a two-column
 * band gets the same effect from the colour change and the alignment, in about
 * a third of the room.
 *
 * The full-bleed part is why the markup here has three sibling containers
 * rather than one. The band breaks out of the measure while the prose around it
 * stays inside it, which a single wrapper cannot do.
 *
 * A Server Component. Everything here that moves, moves in CSS.
 *
 * ## The interaction, and why there is no JavaScript in it
 *
 * The reveals are scroll-linked with `animation-timeline: view()`. No
 * IntersectionObserver, no scroll handler, no hydration cost, and no jank —
 * scroll-driven animations run off the main thread, so they hold their frame
 * rate while the page is busy doing something else.
 *
 * It also fails in the right direction. The rules sit inside
 * `@supports (animation-timeline: view())`, so a browser without support never
 * applies them and the content is simply present. The common JS reveal does the
 * opposite — hide with an initial style, show from script — so a failed bundle
 * leaves a blank page. See `.reveal` in styles/base.css.
 *
 * ## Two display sizes, not three
 *
 * The section opens on the `h2` and closes on the motto. Nothing between them
 * competes: the body sits at lead size, the purpose statement one step below
 * display, and the vision and mission headings stay small. Three display sizes
 * in one section is what makes a page feel loud.
 */
export function AboutSection({ about }: { about: About }) {
  const measure = 'mx-auto w-full max-w-[80rem] px-6 md:px-8 lg:px-12';

  return (
    <section aria-labelledby="about-heading" className="bg-surface">
      {/* ---------------- intro ---------------- */}
      {/*
        The brand motif — see the "Brand motif" block in base.css.

        It goes on the intro block rather than on the `<section>`, and that is
        not arbitrary. The motif needs `overflow-hidden` on its host to be
        cropped, and `overflow: hidden` makes an element a scroll container,
        which silently kills `position: sticky` in any descendant. The vision
        column further down this section is `lg:sticky`. On the section it would
        have traded a working sticky column for a decoration.

        Here it also means the crop lands on the purpose band's top edge — a
        real colour boundary rather than a section seam, which is a different
        cut from every other placement on the page.

        The host is full width, with the measure inside it, so the motif sits
        in the page's right-hand margin. On the measured block it sat inside
        the content column and covered the gallery's thumbnails.
      */}
      <div data-motif="about" className="relative isolate overflow-hidden">
        <div className={`${measure} pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24`}>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="reveal lg:col-span-7">
              <h2 id="about-heading" className="section-heading">
                {about.heading}
              </h2>

              <span aria-hidden="true" className="mt-8 mb-9 block h-[3px] w-14 bg-accent-surface" />

              {/*
              The opening paragraph carries the visual weight a heading normally
              would — set at lead size, with a capped measure so it stays
              readable at that scale.
            */}
              <div className="prose-justify max-w-[38rem] space-y-6 text-lg leading-relaxed text-ink">
                {about.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>

              {/*
              A pill with the arrow carried in its own filled disc. The label
              and the disc move toward each other on hover — the padding on the
              right closes as the disc slides — so the control feels like it is
              already going somewhere. Cheaper and quieter than a colour change,
              and it keeps the button legible against the white surface at rest.
            */}
              {/*
              `.cta-split`, shared with the Academics, Events and News CTAs.
              This button and the News one each carried their own inline copy of
              the pattern — at 44px and 36px, with different paddings — which is
              exactly how four buttons meant to look identical end up not
              matching. The class owns the geometry now.
            */}
              <NextLink href={about.action.href} className="cta-split mt-10">
                <span className="cta-split-label">{about.action.label}</span>
                <span aria-hidden="true" className="cta-split-icon">
                  <ArrowRightIcon size={18} className="cta-split-arrow" />
                </span>
              </NextLink>
            </div>

            {/* ---------------- gallery ---------------- */}
            <div className="reveal lg:col-span-5" style={{ ['--reveal-start' as string]: '10%' }}>
              <AboutGallery images={about.gallery} />
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- statement of purpose ---------------- */}
      {/*
        Full-bleed, so it is a sibling of the measured containers rather than a
        child.

        ## Why the navy stays

        Not for emphasis — for the accent. The brand green measures 1.74:1 on
        white and cannot legally carry text there; on brand-950 it reaches
        8.89:1. This band is the only place on a white page where the closing
        phrase can be set in the institution's own colour rather than a
        darkened approximation of it.

        ## Why the label sits on a rule

        The previous version put the label in its own grid column and left the
        top and right of the band empty, which made a 200px strip read as a
        banner with something missing from it. A label with a hairline running
        off it to the right edge is an old editorial device and it does two
        jobs at once: it fills that width deliberately, and it draws a lid over
        the statement so the block reads as composed rather than adrift.

        ## Where the height went

        The tall version cost ~600px, but almost none of that was the type —
        it was 160px of padding at each end. The statement is back at display
        scale here and fills the measure on two lines; the padding is a third
        of what it was. Confidence is cheaper than air.
      */}
      <div className="purpose-band">
        <div className={`${measure} py-10 md:py-14`}>
          <div className="reveal">
            <div className="flex items-center gap-5">
              <h3 className="shrink-0 text-2xs font-semibold tracking-[0.22em] text-accent-surface uppercase">
                {about.purpose.label}
              </h3>
              <span aria-hidden="true" className="h-px flex-1 bg-white/20" />
            </div>

            {/*
              No width cap and `text-pretty`, not `text-balance`.

              Balance equalises line lengths by minimising the longest one. At
              52px that was invisible, because the sentence filled the measure
              anyway. At 40px it settled both lines at ~795px inside an 1184px
              measure and cut a rectangular void down the right-hand side — the
              type was smaller, so balancing had room to shrink it further, and
              it took it.

              Pretty only guards the last line against a widow. The first line
              runs the full measure and the second ends where the sentence
              does, which is how prose is supposed to look.
            */}
            <blockquote className="mt-7 font-serif text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.16] tracking-[-0.02em] text-pretty text-ink-inverse md:mt-8">
              {about.purpose.lead}
              {about.purpose.emphasis ? (
                <>
                  {' '}
                  {/*
                    One sentence, two spans — screen readers read straight
                    through it. The italic is the serif's own, not a
                    synthesised slant, which is why it holds up at this size.
                  */}
                  <em className="text-accent-surface italic">{about.purpose.emphasis}</em>
                </>
              ) : null}
            </blockquote>

            {about.purpose.attribution ? (
              <p className="mt-7 text-sm text-white/65">{about.purpose.attribution}</p>
            ) : null}
          </div>
        </div>
      </div>

      {/* ---------------- vision & mission ---------------- */}
      {/*
        ## The problem this replaces

        Two columns split by a vertical rule, Vision on the left and Mission on
        the right. Vision is three lines; Mission is five commitments. The rule
        ran the height of the taller one, so it drew a box around several
        hundred pixels of nothing and made the shortfall look like a mistake
        rather than a difference in length.

        ## What fixes it

        Vision becomes a **photographic panel** that pins while the commitments
        scroll past it (`position: sticky`, offset clear of the measured 185px
        sticky header). Two things follow from that. The empty space beside it
        stops being a shortfall and becomes the room the panel needs to stay
        legible; and giving the single sentence a picture to sit on finally
        makes it weigh as much as the five opposite, which no amount of type
        size was going to do.

        The commitments become cards with a mark apiece, so five near-identical
        blocks of text acquire five different silhouettes and the column can be
        scanned rather than read.

        No JavaScript in any of it. The pinning is `sticky`, the entrances are
        `animation-timeline: view()`, and every hover state is a transition.
      */}
      <div className={`${measure} pt-16 pb-20 md:pt-20 md:pb-28 lg:pb-32`}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ---- vision: the fixed half ---- */}
          <div className="lg:col-span-5">
            <div className="reveal lg:sticky lg:top-[13.5rem]">
              <div className="relative min-h-[26rem] overflow-hidden rounded-sm shadow-raised lg:min-h-[30rem]">
                <Image
                  src={VISION_IMAGE.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />

                {/* Guarantees the contrast; see `.vision-scrim` for the maths. */}
                <div aria-hidden="true" className="vision-scrim absolute inset-0" />

                {/*
                  The panel's lid, drawn left to right on arrival — the same
                  gesture as the rules under the cards opposite, which is what
                  makes the two halves read as one system.
                */}
                <span
                  aria-hidden="true"
                  className="reveal-rule-x absolute inset-x-0 top-0 z-10 block h-[4px] bg-accent-surface"
                />

                {/*
                  Text seated at the foot, where the scrim is heaviest. Anywhere
                  higher and the guarantee would depend on which frame of the
                  photograph happened to be behind it.
                */}
                <div className="relative flex h-full min-h-[26rem] flex-col justify-end p-9 md:p-11 lg:min-h-[30rem]">
                  <h3 className="font-serif text-2xl text-white md:text-[1.75rem]">
                    {about.vision.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-5 mb-6 block h-[3px] w-10 bg-accent-surface"
                  />
                  <p className="text-lg leading-relaxed text-white/85 md:text-xl">
                    {about.vision.text}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ---- mission: the half you move through ---- */}
          <div className="lg:col-span-7">
            <h3 className="font-serif text-2xl text-ink-strong md:text-[1.75rem]">
              {about.mission.title}
            </h3>
            <span aria-hidden="true" className="mt-5 mb-7 block h-[3px] w-10 bg-accent-surface" />

            {/*
              An `<ol>`, reversing an earlier decision here.

              The old comment argued that numbering implies a ranking the
              institution has not claimed. That holds for *ranked* numbering;
              these read as indices — 01 to 05 — which is enumeration, and the
              list visibly has an order whether or not it is marked. Since the
              numerals are shown, the element should say so: an `<ol>` means a
              screen reader announces position and the visible and announced
              structures agree.
            */}
            <ol className="mission-list space-y-4">
              {about.mission.items?.map((item, index) => {
                const Icon = MISSION_ICONS[item.icon];
                return (
                  <li
                    key={item.text.slice(0, 32)}
                    className="reveal"
                    style={{ ['--reveal-start' as string]: `${String(4 + index * 3)}%` }}
                  >
                    <div className="mission-card group relative isolate overflow-hidden rounded-sm border border-border bg-surface p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-border-strong hover:shadow-raised md:p-7">
                      {/*
                        The accent edge grows from the top on hover. It sits in
                        the card's own padding, so nothing reflows when it
                        appears.
                      */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 z-10 w-[3px] origin-top scale-y-0 bg-accent-surface transition-transform duration-300 ease-out group-hover:scale-y-100"
                      />

                      {/*
                        Mark and index on one line, statement beneath. Putting
                        the numeral hard right rather than beside the icon gives
                        the card two anchored corners instead of one cluster and
                        a long empty edge, and it lets every card share the same
                        top line whether its statement runs to one line or two.
                      */}
                      <div className="relative z-10 flex items-center justify-between gap-4">
                        <Icon
                          size={28}
                          aria-hidden="true"
                          className="shrink-0 text-accent-ink transition-colors duration-300 group-hover:text-brand"
                        />
                        <span
                          aria-hidden="true"
                          className="mission-index font-serif text-[1.5rem] leading-none text-ink-muted tabular-nums transition-colors duration-300 group-hover:text-brand"
                        />
                      </div>

                      <p className="relative z-10 mt-5 text-lg leading-relaxed text-ink">
                        {item.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* ---------------- motto ---------------- */}
      {/*
        The closing device, and the only part of the page that is properly
        *coloured* rather than toned.

        ## Why it is a stepper rather than three columns

        The previous version set the three parts side by side, each with its
        gloss beneath. Everything was visible at once, which sounds like a
        virtue and read like a table: three equal columns, no focus, and the
        motto itself — which is a single phrase — broken into three unrelated
        headings.

        The words now stack and read down as one phrase, one gloss shows at a
        time, and a track down their edge marks where you are. It restores the
        motto as a sentence and gives the section a focal point.

        Because only one gloss is visible, the words became controls rather than
        headings, so this is the WAI-ARIA **tab** pattern — see
        `motto-stepper.tsx`. That is also the one thing here that needs client
        JavaScript; everything else in this section is server-rendered.

        Full-bleed, so it is a sibling of the measured containers.
      */}
      {/*
        No closing rule along the foot any more. The dark version needed one
        because the footer beneath is the same deep navy and the band bled into
        it; a light band against that footer separates itself.
      */}
      <div className="motto-band relative isolate overflow-hidden">
        <div className={`${measure} py-20 md:py-24 lg:py-28`}>
          <div className="reveal">
            <MottoStepper parts={about.motto} />
          </div>
        </div>
      </div>
    </section>
  );
}
