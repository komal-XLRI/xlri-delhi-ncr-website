import { notFound } from 'next/navigation';

import { Container } from '@/components/layout/container';
import { Divider } from '@/components/layout/divider';
import { Grid } from '@/components/layout/grid';
import { Section } from '@/components/layout/section';
import { Cluster, Stack } from '@/components/layout/stack';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardFooter, CardMedia } from '@/components/ui/card';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { Link } from '@/components/ui/link';
import { Stat, StatGroup } from '@/components/ui/stat';
import { Text } from '@/components/ui/text';
import { isProduction } from '@/config/env';
import { site } from '@/config/site';
import { PreferenceControls } from '@/features/preferences/preference-controls';
import { contrastRatio, formatRatio, WCAG } from '@/lib/color/contrast';
import {
  BRAND_SEEDS,
  RAMP_STEPS,
  ramps,
  semanticBase,
  semanticHighContrast,
  surfaceWhite,
  type RampName,
  type SemanticToken,
} from '@/styles/tokens';

/**
 * The design-system workbench.
 *
 * Chosen over Storybook deliberately: no extra dependencies, no separate build
 * to keep green, and it exercises the primitives in the real application's CSS
 * context rather than an approximation of it.
 *
 * The page is built *out of* the primitives it documents, so a broken primitive
 * breaks its own documentation — which is a faster feedback loop than a
 * screenshot that has to be regenerated.
 *
 * Excluded from production and from search.
 */
export const metadata = {
  title: 'Design System',
  robots: { index: false, follow: false },
};

function verdictLabel(ratio: number): string {
  if (ratio >= WCAG.AAA_TEXT) return 'AAA';
  if (ratio >= WCAG.AA_TEXT) return 'AA';
  if (ratio >= WCAG.AA_LARGE) return 'Large / UI only';
  return 'Decorative only';
}

function Swatch({ hex }: { hex: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-5 w-8 shrink-0 rounded-xs border border-border align-middle"
      style={{ backgroundColor: hex }}
    />
  );
}

function TokenTable({
  caption,
  tokens,
}: {
  caption: string;
  tokens: Record<string, SemanticToken>;
}) {
  return (
    <div className="mb-8 overflow-x-auto rounded-sm border border-border">
      <table className="w-full min-w-[46rem] text-sm">
        <caption className="px-4 py-3 text-left text-ink-muted">{caption}</caption>
        <thead className="border-y border-border bg-surface-subtle text-left">
          <tr>
            {['Token', 'Value', 'Measured', 'Floor', 'Role'].map((h) => (
              <th key={h} scope="col" className="px-4 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(tokens).map(([name, token]) => {
            const ratio = contrastRatio(token.value, token.on);
            return (
              <tr key={name} className="border-b border-border last:border-0">
                <th scope="row" className="px-4 py-2 text-left font-mono text-xs font-normal">
                  {name}
                </th>
                <td className="px-4 py-2">
                  <Cluster gap="sm">
                    <Swatch hex={token.value} />
                    <code className="text-xs">{token.value}</code>
                  </Cluster>
                </td>
                <td className="px-4 py-2 tabular-nums">
                  {token.minContrast === null ? (
                    <span className="text-ink-muted">—</span>
                  ) : (
                    formatRatio(ratio)
                  )}
                </td>
                <td className="px-4 py-2 text-ink-muted tabular-nums">
                  {token.minContrast === null ? 'decorative' : `${token.minContrast}:1`}
                </td>
                <td className="px-4 py-2 text-ink-muted">{token.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function RampTable({ name }: { name: RampName }) {
  const ramp = ramps[name];
  const seed = Object.values(BRAND_SEEDS).find((s) => s.ramp === name);

  return (
    <div className="mb-10">
      <Heading level={3} size="sm" className="mb-1 capitalize">
        {name}
      </Heading>
      {seed ? (
        <Text size="small" tone="muted" className="mb-3">
          Official seed <code className="text-ink-strong">{seed.hex}</code> preserved exactly at
          step {seed.step}.
        </Text>
      ) : null}
      <div className="overflow-x-auto rounded-sm border border-border">
        <table className="w-full min-w-[32rem] text-sm">
          <thead className="border-b border-border bg-surface-subtle text-left">
            <tr>
              {['Step', 'Swatch', 'Hex', 'On white', 'Verdict'].map((h) => (
                <th key={h} scope="col" className="px-4 py-2 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RAMP_STEPS.map((step) => {
              const hex = ramp[step];
              const ratio = contrastRatio(hex, surfaceWhite);
              return (
                <tr key={step} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 tabular-nums">
                    {step}
                    {seed?.step === step ? (
                      <span className="ml-2 text-2xs text-ink-muted">SEED</span>
                    ) : null}
                  </td>
                  <td className="px-4 py-2">
                    <Swatch hex={hex} />
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">{hex}</td>
                  <td className="px-4 py-2 tabular-nums">{formatRatio(ratio)}</td>
                  <td className="px-4 py-2 text-ink-muted">{verdictLabel(ratio)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  // Dev-only. A 404 in production means the route does not exist, rather than
  // merely being unlinked.
  if (isProduction) notFound();

  const accentOnWhite = contrastRatio(ramps.accent[300], surfaceWhite);
  const inkOnAccent = contrastRatio(semanticBase['ink-strong'].value, ramps.accent[300]);

  return (
    <main id="main">
      <Section spacing="lg" width="content">
        <Stack gap="md">
          <Eyebrow>Phase 1 — design system</Eyebrow>
          <Heading level={1} size="2xl">
            Design System
          </Heading>
          <Text size="lead" tone="muted" measure>
            Every contrast figure on this page is computed at render time from{' '}
            <code className="text-ink-strong">src/styles/tokens.ts</code>. The same values are
            asserted in <code className="text-ink-strong">tests/unit/tokens.test.ts</code>, so the
            palette cannot regress without failing CI.
          </Text>
          <Divider variant="accent" />
        </Stack>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section spacing="md" surface="subtle" aria-labelledby="prefs">
        <Stack gap="md">
          <Heading level={2} id="prefs">
            Display preferences
          </Heading>
          <Text tone="muted" measure>
            GIGW requires a text-size control and a high-contrast mode (§11.2). Both are applied
            before first paint by an inline script, so a returning visitor never sees the default
            theme flash first. The controls are hidden entirely without JavaScript — a control that
            cannot work should not be offered.
          </Text>
          <div className="rounded-sm border border-border bg-surface p-5">
            <PreferenceControls />
          </div>
          <Text size="small" tone="muted">
            Try them — the whole page responds, including every measurement above.
          </Text>
        </Stack>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section aria-labelledby="typography">
        <Stack gap="lg">
          <Stack gap="sm">
            <Heading level={2} id="typography">
              Typography
            </Heading>
            <Text tone="muted" measure>
              Serif display over neutral sans. Body sits at 17px rather than the 16px default. The{' '}
              <code className="text-ink-strong">Heading</code> primitive separates semantic level
              from visual size, so a correct document outline never costs a correct-looking page.
            </Text>
          </Stack>

          <div className="rounded-sm border border-border p-6">
            <Stack gap="md">
              <Heading level={3} size="display">
                Display
              </Heading>
              <Heading level={3} size="xl">
                Heading XL
              </Heading>
              <Heading level={3} size="md">
                Heading MD
              </Heading>
              <Text size="lead" measure>
                A lead paragraph introduces a section with slightly larger type.
              </Text>
              <Text measure>
                Body copy at 17px with a measure capped near 68 characters, which is what keeps
                long-form prose readable on ultra-wide displays — the point where most institutional
                sites fall apart.
              </Text>
              <Text size="small" tone="muted">
                Small muted text for captions and metadata, at 6.03:1.
              </Text>
            </Stack>
          </div>
        </Stack>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section surface="subtle" aria-labelledby="actions">
        <Stack gap="lg">
          <Stack gap="sm">
            <Heading level={2} id="actions">
              Buttons &amp; links
            </Heading>
            <Text tone="muted" measure>
              Three button variants, not a dozen. The accent green is absent: at{' '}
              {formatRatio(accentOnWhite)} it cannot carry label text.
            </Text>
          </Stack>

          <Cluster gap="md">
            <Button variant="primary">Apply now</Button>
            <Button variant="secondary">Download brochure</Button>
            <Button variant="ghost">Learn more</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </Cluster>

          <Cluster gap="md" align="baseline">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Cluster>

          <Divider />

          <Stack gap="sm">
            <Heading level={3} size="sm">
              Link classification
            </Heading>
            <Text tone="muted" measure>
              The audit found that admissions, XAT, giving, and alumni all live on other XLRI
              properties (§16 F1). Offsite links are marked rather than disguised — sighted users
              get the arrow, screen-reader users get the destination host in the accessible name.
            </Text>
            <Stack gap="xs">
              <Text>
                Internal:{' '}
                <Link href="/faculty" siteUrl={site.url}>
                  our faculty directory
                </Link>
              </Text>
              <Text>
                Sibling property:{' '}
                <Link href="https://xlri.ac.in/academic-programmes" siteUrl={site.url}>
                  admission procedure
                </Link>
              </Text>
              <Text>
                External:{' '}
                <Link href="https://www.aacsb.edu/" siteUrl={site.url}>
                  AACSB
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section aria-labelledby="containers">
        <Stack gap="lg">
          <Stack gap="sm">
            <Heading level={2} id="containers">
              Cards, badges &amp; figures
            </Heading>
            <Text tone="muted" measure>
              Cards use a hairline border rather than a shadow. Composed of parts rather than
              configured by flags, because a programme card and a news card share a frame and almost
              nothing else.
            </Text>
          </Stack>

          <Grid cols={3}>
            {[
              { title: 'PGDM (Business Management)', tag: 'Two years', tone: 'brand' as const },
              {
                title: 'Executive Development Programme',
                tag: 'Part time',
                tone: 'accent' as const,
              },
              { title: 'Doctoral Programme', tag: 'Research', tone: 'neutral' as const },
            ].map((item) => (
              <Card key={item.title} variant="interactive">
                <CardMedia ratio="3/2">
                  <div className="h-full w-full bg-brand-surface" />
                </CardMedia>
                <CardBody>
                  <Badge tone={item.tone}>{item.tag}</Badge>
                  <Heading level={3} size="sm">
                    {item.title}
                  </Heading>
                  <Text size="small" tone="muted">
                    A short description of the programme, its duration, and who it is designed for.
                  </Text>
                </CardBody>
                <CardFooter>
                  <Link href="/academics" siteUrl={site.url} variant="standalone">
                    Programme details
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </Grid>

          <Divider />

          <StatGroup>
            <Stat value="1949" label="Founded" detail="Jesuit heritage" />
            <Stat value="3" label="Accreditations" detail="AACSB · AMBA · EQUIS" />
            <Stat value="42" label="Events this year" detail="From the legacy audit" />
            <Stat value="205" label="Pages to migrate" detail="WordPress inventory" />
          </StatGroup>
        </Stack>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section surface="subtle" aria-labelledby="disclosure">
        <Stack gap="lg">
          <Stack gap="sm">
            <Heading level={2} id="disclosure">
              Accordion &amp; breadcrumbs
            </Heading>
            <Text tone="muted" measure>
              The accordion is built on native{' '}
              <code className="text-ink-strong">&lt;details&gt;</code> — no client JavaScript at
              all. The browser already handles keyboard operation and the correct expanded
              semantics, and it works before hydration and with JS disabled.
            </Text>
          </Stack>

          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Academics', href: '/academics' },
              { label: 'PGDM (Business Management)' },
            ]}
          />

          <Accordion>
            <AccordionItem summary="What are the admission requirements?" name="faq" defaultOpen>
              <Text tone="muted">
                Admissions content lives on the institute site, so this panel would link out with a
                clearly marked cross-property link.
              </Text>
            </AccordionItem>
            <AccordionItem summary="When does the programme begin?" name="faq">
              <Text tone="muted">
                Cohort dates are data on the programme record, not a new page.
              </Text>
            </AccordionItem>
            <AccordionItem summary="Is financial assistance available?" name="faq">
              <Text tone="muted">
                Opening one panel closes the others — the shared <code>name</code> attribute,
                handled entirely by the browser.
              </Text>
            </AccordionItem>
          </Accordion>
        </Stack>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section aria-labelledby="tokens">
        <Stack gap="lg">
          <Stack gap="sm">
            <Heading level={2} id="tokens">
              Semantic tokens
            </Heading>
            <Text tone="muted" measure>
              Components consume only these. Ramp steps and raw hex are blocked by lint outside{' '}
              <code className="text-ink-strong">src/styles/</code>.
            </Text>
          </Stack>
          <TokenTable
            caption="Base theme — measured against the surface each token sits on."
            tokens={semanticBase}
          />
          <TokenTable
            caption="High-contrast theme (GIGW). Every text role is lifted to AAA; the accent green seed is absent from all text and interactive roles because at 1.74:1 it cannot legibly participate."
            tokens={semanticHighContrast}
          />
        </Stack>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section surface="subtle" aria-labelledby="ramps">
        <Stack gap="lg">
          <Stack gap="sm">
            <Heading level={2} id="ramps">
              Colour ramps
            </Heading>
            <Text tone="muted" measure>
              Generated in OKLCH for perceptual evenness. Each official colour is pinned at the step
              where its own lightness naturally falls, so the brand survives untouched.
            </Text>
          </Stack>
          {(Object.keys(ramps) as RampName[]).map((name) => (
            <RampTable key={name} name={name} />
          ))}
        </Stack>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section aria-labelledby="accent">
        <Stack gap="lg">
          <Stack gap="sm">
            <Heading level={2} id="accent">
              Accent green — where it is legal
            </Heading>
            <Text tone="muted" measure>
              The official accent measures {formatRatio(accentOnWhite)} against white. It is a
              background colour and a rule; never text, never a link, never a focus ring.
            </Text>
          </Stack>
          <Grid cols={2}>
            <div className="rounded-sm bg-accent-surface p-6 text-ink-strong">
              <Heading level={3} size="sm" className="mb-1">
                Correct — dark ink on an accent block
              </Heading>
              <Text size="small">{formatRatio(inkOnAccent)}, comfortably AAA.</Text>
            </div>
            <div className="rounded-sm border border-border p-6">
              <Heading level={3} size="sm" className="mb-1">
                Correct — accent as a rule
              </Heading>
              <Text size="small" tone="muted">
                Carries emphasis without carrying information.
              </Text>
              <Divider variant="accent" className="mt-4" />
            </div>
          </Grid>
        </Stack>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section surface="inverse" spacing="md">
        <Stack gap="sm">
          <Heading level={2} tone="inverse" size="lg">
            Inverse surface
          </Heading>
          <Text tone="inverse" measure>
            Used for the footer and occasional emphasis bands. Text on this surface is white on
            brand-950 at {formatRatio(contrastRatio(surfaceWhite, ramps.brand[950]))}.
          </Text>
        </Stack>
      </Section>

      <Container className="py-10">
        <Text size="small" tone="muted">
          Radius tokens stop at 6px and there is exactly one shadow — the absence of larger values
          is the policy, not an oversight.
        </Text>
        <Cluster gap="md" className="mt-4">
          <div className="rounded-xs border border-border px-5 py-4 text-sm">radius-xs · 2px</div>
          <div className="rounded-sm border border-border px-5 py-4 text-sm">radius-sm · 4px</div>
          <div className="rounded-md border border-border px-5 py-4 text-sm">radius-md · 6px</div>
          <div className="rounded-sm px-5 py-4 text-sm shadow-raised">shadow-raised</div>
        </Cluster>
      </Container>
    </main>
  );
}
