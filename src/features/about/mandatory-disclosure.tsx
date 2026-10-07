import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { routes } from '@/constants/routes';
import { DisclosureViewer } from '@/features/about/disclosure-viewer';
import type { MandatoryDisclosure } from '@/types/mandatory-disclosure';

/**
 * "Mandatory Disclosure".
 *
 * The Jamshedpur page (xlri.ac.in/about/mandatory-disclosure) — a title, then
 * the disclosure documents as tabs with the PDF embedded — holding Delhi-NCR's
 * document. See `disclosure-viewer.tsx` for the tabs and the mobile fallback.
 */
export function MandatoryDisclosurePage({ content }: { content: MandatoryDisclosure }) {
  return (
    <article aria-labelledby="disclosure-heading" className="bg-surface">
      <div className="mx-auto w-full max-w-[80rem] px-6 pt-10 pb-16 md:px-8 md:pt-14 md:pb-24 lg:px-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: routes.home },
            { label: 'About', href: routes.about.index },
            { label: content.title },
          ]}
        />

        <h1
          id="disclosure-heading"
          className="mt-8 font-serif text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.05] tracking-[-0.035em] text-brand"
        >
          {content.title}
        </h1>
        <p className="mt-3 text-lg font-semibold text-ink-strong md:text-xl">{content.subtitle}</p>

        <div className="mt-10 md:mt-12">
          <DisclosureViewer documents={content.documents} />
        </div>
      </div>
    </article>
  );
}
