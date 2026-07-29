import Image from 'next/image';

/**
 * The animated loading mark.
 *
 * ## Why the lockup is an image and the animation is a separate SVG
 *
 * The full lockup is 25 kB of source — fourteen paths, four fills. Inlining it
 * to animate its individual paths would put that in the payload of every route
 * that suspends, to be seen for a few hundred milliseconds. As an `<img>` it is
 * the same file the header already loaded, so on any navigation it costs
 * nothing at all: it is in cache before this screen ever renders.
 *
 * The animation is therefore layered *over* the mark rather than built into it:
 *
 *  • a **sweep** — a soft highlight travelling across the lockup, done with an
 *    animated `mask-position` so it lights the artwork itself rather than
 *    drawing a shape on top of it
 *  • an **arc**, which is a genuinely hand-authored SVG, ~300 bytes, drawing
 *    and retracting around a circle beneath the mark
 *
 * ## The arc is a real SVG animation, not a spinner GIF
 *
 * `stroke-dasharray` and `stroke-dashoffset` on a single `<circle>`. The dash
 * pattern is expressed against `pathLength="100"`, so the numbers in the
 * keyframes are percentages of the circumference and do not have to be
 * recomputed if the radius ever changes — the usual reason a hand-built arc
 * breaks the moment somebody resizes it.
 *
 * ## The mark arrives as props
 *
 * `components/` may not import `config/`, and the boundary lint stopped this
 * file the moment it tried — correctly. A primitive that reaches into the brand
 * registry is no longer a primitive; it is a branded component filed in the
 * wrong layer. The caller in `app/` supplies the artwork, which is also what
 * makes this usable for any mark rather than only this one.
 *
 * ## Reduced motion
 *
 * Both animations stop. The arc holds a static three-quarter ring and the sweep
 * is removed entirely, so the screen is still visibly a loading state without
 * anything moving. That is the point of the preference: not "no feedback", but
 * "no motion".
 */
export function LoadingMark({
  src,
  width,
  height,
}: {
  src: string;
  /** Intrinsic dimensions of `src`, used to derive the rendered aspect ratio. */
  width: number;
  height: number;
}) {
  return (
    <div className="loading-mark">
      {/*
        `priority` is deliberate and safe here: this component only renders on a
        screen whose entire purpose is to show it, so there is nothing else on
        the page for it to compete with for bandwidth.
      */}
      <Image
        src={src}
        alt=""
        width={Math.round((width / height) * 96)}
        height={96}
        priority
        className="loading-mark-image"
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="loading-arc"
        // Presentational only; the accessible status lives on the region.
        focusable="false"
      >
        <circle cx="60" cy="60" r="54" className="loading-arc-track" pathLength={100} />
        <circle cx="60" cy="60" r="54" className="loading-arc-head" pathLength={100} />
      </svg>
    </div>
  );
}
