/**
 * Self-test for the architectural boundary rules.
 *
 *   node scripts/check-boundaries.mjs
 *
 * Why this exists: `eslint-plugin-boundaries` fails *silently* when its element
 * patterns do not match. The rule reports nothing, `npm run lint` exits 0, and
 * the codebase looks compliant while enforcing nothing. That is worse than
 * having no rule at all, because the green check reads as enforcement.
 *
 * This happened during Phase 0 — `src/config/**\/*` matched nested files but not
 * `src/config/env.ts`, so half the layers were unguarded while lint passed. See
 * ADR-0003.
 *
 * The script writes deliberate violations into `src/`, asserts ESLint rejects
 * each one, asserts a legal import is still accepted, and removes the probes.
 */

import { execFile } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);
const root = process.cwd();

/** Each case: a probe file, the layer it must not reach, and its dependency. */
const CASES = [
  {
    name: 'component → service',
    dependency: { path: 'src/services/__probe.ts', body: "export const probe = 'x';\n" },
    probe: {
      path: 'src/components/ui/__probe.ts',
      body: "import { probe } from '@/services/__probe';\nexport const bad = probe;\n",
    },
    mustFail: true,
  },
  {
    name: 'component → feature',
    dependency: { path: 'src/features/__probe/index.ts', body: "export const feat = 'x';\n" },
    probe: {
      path: 'src/components/ui/__probe2.ts',
      body: "import { feat } from '@/features/__probe';\nexport const bad2 = feat;\n",
    },
    mustFail: true,
  },
  {
    name: 'app → content',
    dependency: { path: 'src/content/__probe.ts', body: "export const c = 'y';\n" },
    probe: {
      path: 'src/app/__probe.ts',
      body: "import { c } from '@/content/__probe';\nexport const bad3 = c;\n",
    },
    mustFail: true,
  },
  {
    name: 'lib → service',
    dependency: { path: 'src/services/__probe2.ts', body: "export const s = 'z';\n" },
    probe: {
      path: 'src/lib/__probe.ts',
      body: "import { s } from '@/services/__probe2';\nexport const bad4 = s;\n",
    },
    mustFail: true,
  },
  {
    name: 'component → lib (legal)',
    dependency: null,
    probe: {
      path: 'src/components/ui/__probe3.ts',
      body: "import { cn } from '@/lib/cn';\nexport const ok = cn('a');\n",
    },
    mustFail: false,
  },
];

const written = new Set();

function write({ path, body }) {
  const absolute = join(root, path);
  mkdirSync(dirname(absolute), { recursive: true });
  writeFileSync(absolute, body);
  written.add(absolute);
}

async function lint(path) {
  try {
    await run('npx', ['eslint', '--no-warn-ignored', path], { cwd: root });
    return { failed: false, output: '' };
  } catch (error) {
    return { failed: true, output: `${error.stdout ?? ''}${error.stderr ?? ''}` };
  }
}

let failures = 0;

try {
  for (const testCase of CASES) {
    if (testCase.dependency) write(testCase.dependency);
    write(testCase.probe);

    const { failed, output } = await lint(testCase.probe.path);
    const caughtByBoundaries = output.includes('boundaries/dependencies');

    if (testCase.mustFail) {
      if (failed && caughtByBoundaries) {
        console.log(`  ✓ rejected: ${testCase.name}`);
      } else {
        failures += 1;
        console.error(
          `  ✗ NOT ENFORCED: ${testCase.name} — the boundary rule did not fire.\n` +
            '    The element patterns in eslint.config.mjs are probably not matching.\n' +
            '    Check with: npx eslint --rule \'{"boundaries/no-unknown-files":"error"}\' "src/**/*.ts"',
        );
      }
    } else if (failed) {
      failures += 1;
      console.error(`  ✗ FALSE POSITIVE: ${testCase.name} is legal but was rejected.\n${output}`);
    } else {
      console.log(`  ✓ allowed:  ${testCase.name}`);
    }
  }
} finally {
  for (const path of written) rmSync(path, { force: true });
  rmSync(join(root, 'src/features/__probe'), { recursive: true, force: true });
}

if (failures > 0) {
  console.error(`\nBoundary self-test failed: ${failures} case(s).`);
  process.exit(1);
}

console.log('\nBoundary rules are enforcing correctly.');
