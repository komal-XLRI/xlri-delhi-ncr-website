'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Whether the visitor has asked the system for reduced motion.
 *
 * Implemented with `useSyncExternalStore` rather than `useState` + `useEffect`.
 * The preference is external state that React does not own, and mirroring it
 * into component state means a render pass where the component believes motion
 * is allowed when it is not — plus React's `set-state-in-effect` rule flags the
 * mirroring as a cascading render, correctly.
 *
 * The server snapshot returns `false`: the server cannot know the preference,
 * and animations are gated on the client anyway, so the honest default is "not
 * yet known" rather than a guess in either direction.
 */
function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(QUERY);
  query.addEventListener('change', onChange);
  return () => {
    query.removeEventListener('change', onChange);
  };
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
