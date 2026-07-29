# `lib/` — pure, framework-agnostic utilities

No React, no Next imports, no side effects. Trivially unit-testable.

- `color/` — WCAG contrast maths, used by the token tests and `/design-system`
- `seo/` — the metadata factory
- `schema/` — typed JSON-LD builders
- `format/` — dates, numbers, names
- `validation/` — shared Zod schemas

There is deliberately no separate `utils/`. Two folders meaning the same thing is
how a codebase rots — within a year nobody can predict which one holds
`formatDate`.
