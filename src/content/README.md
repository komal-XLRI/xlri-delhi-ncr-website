# `content/` — typed content source (Phase 1–5)

Typed TypeScript modules and MDX, validated by Zod at build time. Deliberately
isolated so it can be deleted once Payload lands (D2).

**Reachable only from `services/`.** No page, feature, or component may import
from here — enforced by `boundaries/element-types`.
