# `content/` — the site's content, as JSON

Every page's text, figures, people, links and image references live here as
JSON, one file per page (or per group of pages). To change what a page says,
edit its JSON file — no component needs touching.

- Images are referenced by path under `public/` (e.g. `/media/heritage/…`).
- Keep typographic punctuation as it is: ’ “ ” — –.
- The menus and the notice ticker are JSON too, in `src/config/navigation.json`
  and `src/config/notices.json`.

**Notes.** JSON cannot hold comments, so the editorial notes — where text came
from, what was checked, what still needs confirming — are in `NOTES.md`, by
file and field. Read the note before changing a field that has one.

**Checking.** Each file is checked when the site builds: Campus Life, Library,
Faculty, Research and Sustainability files by Zod schemas in
`lib/validation/`, the rest against their TypeScript types (`fromJson` in
`lib/validation/json-content.ts`). A missing field or a wrong kind of value
fails the build with the file and field named.

**Reachable only from `services/`.** No page, feature, or component may import
from here — enforced by `boundaries/element-types`. Deliberately isolated so
it can be replaced once Payload lands (D2).
