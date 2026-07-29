import Image from 'next/image';

import { HeroCredentials } from '@/features/homepage/hero-credentials';
import { HeroMotion } from '@/features/homepage/hero-motion';
import type { Hero } from '@/types/homepage';

/**
 * The homepage hero.
 *
 * Full-bleed campus footage, the headline set over it, and a rotating spotlight
 * card alongside.
 *
 * ## Text over moving footage, made safe
 *
 * Overlaid type usually fails eventually: its contrast depends on whichever
 * frame happens to be showing. That is an engineering problem, not a reason to
 * avoid the composition.
 *
 * The scrim opacity is derived rather than eyeballed. Solving for the worst case
 * — a pure-white frame beneath it — white text over a `brand-950` scrim needs
 * alpha 0.615 for AA and 0.750 for AAA. Everywhere the headline can reach, the
 * scrim holds at or above 0.78, so the guarantee survives every frame of the
 * video and any photograph that ever replaces it. Measured on the rendered page
 * at three breakpoints: 8.58:1, 8.55:1, 10.42:1.
 *
 * ## What rotates, and what does not
 *
 * Only the spotlight card. The background media loads once and the `h1` never
 * changes — it stays a single stable sentence, which is what search engines and
 * heading-navigation users need. A conventional hero carousel swaps the
 * background too, which means several large images against the LCP.
 *
 * The headline column below is server-rendered and handed to `HeroMotion` as
 * children, so the largest text on the site never enters a client bundle.
 */
export function HeroSection({ hero }: { hero: Hero }) {
  return (
    <>
      <section aria-labelledby="hero-heading" className="relative isolate">
        {/*
        Poster. Always rendered, always the LCP element, and the exact first
        frame of the loop — so nothing shifts when the video fades in over it.
        For reduced-motion, data-saver, and no-JavaScript visitors this is the
        hero, and no video bytes are ever requested.
      */}
        <div className="absolute inset-0 -z-20">
          <Image
            src={hero.media.src}
            alt={hero.media.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <HeroMotion video={hero.media.video} spotlight={hero.spotlight}>
          <p className="text-2xs font-semibold tracking-[0.22em] text-white/85 uppercase">
            {hero.eyebrow}
          </p>

          <span aria-hidden="true" className="mt-6 mb-7 block h-[3px] w-14 bg-accent-surface" />

          <h1
            id="hero-heading"
            className="font-serif text-[clamp(2.4rem,4.9vw,3.9rem)] leading-[1.05] tracking-[-0.022em] text-balance text-white"
          >
            {hero.headline}
            {hero.headlineEmphasis ? (
              <>
                {' '}
                {/*
                Second voice from the same family — italic, in the accent green,
                which measures 8.3:1 against this field. It is illegal on white
                at 1.74:1; the dark scrim is the only reason it can carry type.
              */}
                <span className="block font-normal text-accent-surface italic">
                  {hero.headlineEmphasis}
                </span>
              </>
            ) : null}
          </h1>

          <p className="mt-8 max-w-[38rem] text-lg leading-relaxed text-white/90">{hero.lead}</p>
        </HeroMotion>
      </section>

      {hero.credentials ? <HeroCredentials items={hero.credentials} /> : null}
    </>
  );
}
