# `components/` — the design system

Generic, **domain-free** building blocks. A component here must not know what a
faculty member, a programme, or a news article is. That constraint is what lets
these primitives outlive the pages built on them, and it is enforced by
`boundaries/element-types` in `eslint.config.mjs`: nothing here may import from
`features/`, `services/`, or `content/`.

- `ui/` — Button, Link, Heading, Text, Badge, Card, Accordion, Tabs, Dialog,
  Breadcrumbs, Pagination, Stat, Quote
- `layout/` — Container, Section, Grid, Stack, Cluster, Divider
- `media/` — Figure, ResponsiveImage, VideoEmbed, LogoBar

Populated in Phase 1.
