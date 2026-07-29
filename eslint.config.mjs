import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import boundaries from 'eslint-plugin-boundaries';

/**
 * Architectural layers, mirroring `docs/architecture.md` §7.
 *
 * Order matters: `boundaries` uses the first pattern that matches, so more
 * specific patterns must come first.
 */
const ELEMENTS = [
  { type: 'app', pattern: 'src/app/**' },
  { type: 'feature', pattern: 'src/features/*/**', capture: ['featureName'] },
  { type: 'component', pattern: 'src/components/**' },
  { type: 'service', pattern: 'src/services/**' },
  { type: 'action', pattern: 'src/actions/**' },
  { type: 'content', pattern: 'src/content/**' },
  { type: 'hook', pattern: 'src/hooks/**' },
  { type: 'lib', pattern: 'src/lib/**' },
  { type: 'config', pattern: 'src/config/**' },
  { type: 'constant', pattern: 'src/constants/**' },
  { type: 'type', pattern: 'src/types/**' },
  { type: 'style', pattern: 'src/styles/**' },
];

/** Leaf layers — dependency-free, importable from anywhere above them. */
const LEAVES = ['lib', 'constant', 'type', 'style'];

/** Build a v7 policy entry. Keeps the matrix below readable as a plain layer list. */
const policy = (fromType, ...allowedTypes) => ({
  from: { element: { type: fromType } },
  allow: { to: { element: { types: { anyOf: allowedTypes.flat() } } } },
});

/**
 * The dependency matrix. Anything not listed is denied.
 *
 * The rule that matters most: `component` may not reach `feature`, `service`, or
 * `content`. That is what keeps the design system domain-free and therefore
 * reusable across a redesign. Without machine enforcement it stops being true
 * within about six months of multi-developer work.
 *
 * Verified against deliberate violations rather than assumed — see
 * `tests/boundaries/` and ADR-0003. A boundaries config can silently match
 * nothing and then pass a codebase full of violations, which is worse than
 * having no rule at all because it reads as enforcement.
 */
const DEPENDENCY_POLICIES = [
  policy('app', 'feature', 'component', 'service', 'action', 'hook', 'config', LEAVES),
  // Features may compose other features — a homepage section reusing NewsCard is
  // legitimate. Restricting cross-feature imports to each feature's public
  // index.ts lands in Phase 2, once there are features to verify it against.
  policy('feature', 'feature', 'component', 'service', 'action', 'hook', 'config', LEAVES),
  policy('component', 'component', 'hook', LEAVES),
  policy('service', 'content', 'config', LEAVES),
  policy('action', 'service', 'config', LEAVES),
  policy('content', LEAVES),
  policy('hook', 'hook', LEAVES),
  policy('config', 'config', LEAVES),
  policy('lib', 'lib', 'constant', 'type'),
  policy('constant', 'constant', 'type'),
  policy('type', 'type'),
  policy('style', 'style', 'type', 'constant'),
];

export default defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'next-env.d.ts',
    'node_modules/**',
  ]),

  ...nextVitals,
  ...nextTs,

  /* Type-aware linting, scoped to TS/TSX. Running the type-checked rule set over
     config files costs time and finds nothing. */
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // `verbatimModuleSyntax` is on. Consistent type-only imports keep a type
      // import from accidentally dragging a server module into a client bundle.
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
    },
  },

  /* Accessibility. GIGW/WCAG compliance (§11) is a project requirement, so the
     recommended set runs at error severity rather than warn.

     The plugin itself is already registered by `eslint-config-next`; re-declaring
     it is a config error, so we pull in only the rule set. */
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      'jsx-a11y/anchor-is-valid': 'off', // next/link owns anchor validity
    },
  },

  /* Architectural boundaries (§7). */
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'boundaries/elements': ELEMENTS,
      // boundaries resolves module specifiers through eslint-module-utils, which
      // reads this setting. Without it the `@/` alias silently fails to resolve
      // and every cross-layer import is treated as "unknown" — the rule then
      // passes on a codebase full of violations.
      'import/resolver': {
        typescript: { alwaysTryTypes: true, project: './tsconfig.json' },
      },
    },
    rules: {
      'boundaries/dependencies': ['error', { default: 'disallow', policies: DEPENDENCY_POLICIES }],
      'boundaries/no-unknown-files': 'off',
      'boundaries/no-unknown': 'off',
    },
  },

  /* Project-specific rules. */
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          // Raw colour literals bypass the token layer, and the token layer is
          // what makes the high-contrast theme (§11.2) a value swap rather than
          // a rewrite. src/styles/** is exempt below.
          selector: 'Literal[value=/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/]',
          message:
            'Raw hex colours bypass the design tokens. Use a semantic token (text-ink, bg-surface, border-border…) — see src/styles/theme.css.',
        },
        {
          selector: "CallExpression[callee.name='fetch'] > Literal[value=/^https?:/]",
          message: 'Network calls belong in src/services/, not in components — architecture §7.',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../../*'],
              message: 'Use the @/ absolute alias rather than reaching up through directories.',
            },
          ],
        },
      ],
    },
  },

  /* Styles, scripts and tests are where literals and looser typing are correct. */
  {
    files: ['src/styles/**/*.ts', 'scripts/**/*', 'tests/**/*', '*.config.{ts,mts,mjs,js}'],
    rules: {
      'no-restricted-syntax': 'off',
      'boundaries/dependencies': 'off',
    },
  },
]);
