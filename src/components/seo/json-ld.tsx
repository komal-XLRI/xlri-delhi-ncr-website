import { serializeJsonLd } from '@/lib/seo/structured-data';

/**
 * Writes structured data into the page, for search engines (see
 * `lib/seo/structured-data.ts`). Renders nothing visible; `undefined` renders
 * nothing at all, so a builder that has nothing to say can return it.
 */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | readonly Record<string, unknown>[] | undefined;
}) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // Escaped by serializeJsonLd: `<` cannot end the script early.
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
