import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    /**
     * Quality values components are allowed to request.
     *
     * Next 16 ignores any `quality` prop not listed here and silently falls back
     * to 75 — which is how the accreditation marks ended up being served at
     * q=75 despite asking for 90. Flat-colour logos band visibly at 75, so 90 is
     * allowlisted for them; 75 stays the default for photography, where the
     * difference is not worth the bytes.
     */
    qualities: [75, 90],

    /**
     * AVIF first, WebP as fallback. AVIF is typically 20–30% smaller than WebP
     * at equal quality, which matters for a photography-heavy institutional site.
     *
     * The cost lands on us rather than a platform (D3, self-hosted): AVIF
     * encoding is markedly slower than WebP, so the persistent image cache
     * described in §13.1 is not optional. Without it every deploy re-encodes
     * from cold and the first visitor after each release pays for it.
     */
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
