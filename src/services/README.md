# `services/` — the data boundary

The **only** layer permitted to know where data comes from. Pages and features
call repository functions (`getFacultyBySlug`, `listProgrammes`) and never touch
a data source directly.

This is the seam that makes the Payload migration (D2, Phase 6) a swap rather
than a rewrite: Phase 1–5 implementations read from `content/`, Phase 6 swaps
them for CMS queries, and nothing above this layer changes.

`content/` is importable only from here — enforced by lint.
