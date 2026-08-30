# CognitiveLint Demo App

A minimal **PatternFly** React app with **intentional human bugs** for live [CognitiveLint](https://github.com/cognitivelint/cognitivelint) scan demos at conference talks.

This repository is the demo app itself. Scan it with the published [`@cognitivelint/cli`](https://www.npmjs.com/package/@cognitivelint/cli) package — no local checkout of the main CognitiveLint monorepo is required.

## Prerequisites

- **Node.js** 18+ ([nodejs.org](https://nodejs.org/))
- **pnpm** 9+ (this repo uses pnpm 11)

Install pnpm if you do not have it yet:

```bash
npm install -g pnpm
pnpm --version
```

Alternatively, enable it via Corepack (bundled with Node.js 16.13+):

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

## Quick start

Clone this repo, install dependencies, and start the dev server:

```bash
git clone https://github.com/anujsingla/cognitivelint_demo.git
cd cognitivelint_demo
pnpm install
pnpm dev          # http://localhost:5174
```

Build for production:

```bash
pnpm build
pnpm preview      # preview the production build
```

## Run a CognitiveLint scan

The demo includes `@cognitivelint/cli` as a dev dependency. From the repo root:

```bash
pnpm scan              # terminal output
pnpm scan:json         # writes report.json
pnpm scan:html         # writes report.html
```

Or run the CLI directly without the npm scripts:

```bash
npx @cognitivelint/cli scan
npx @cognitivelint/cli scan -f html -o report.html
```

Install the CLI globally if you prefer:

```bash
npm install -g @cognitivelint/cli
cognitivelint scan
```

Configuration lives in [`cognitivelint.config.js`](./cognitivelint.config.js).

## Intentional bugs by page

| Page | Rules triggered |
|------|-----------------|
| **Error Prevention** | `destructive-no-confirm`, `no-undo`, `confirmation-fatigue` |
| **Feedback** | `missing-loading-state`, `missing-empty-state`, `missing-success-feedback`, `no-progress-indicator` |
| **Trust & Confidence** | `unexplained-disabled`, `ownership-ambiguity`, `missing-ownership` |
| **Cognitive Load** | `excessive-primary-actions`, `long-forms`, `filter-overload`, `dense-tables` |
| **Discoverability** | `missing-search`, `hidden-primary-action`, `empty-navigation` |
| **Consistency** | `inconsistent-button-labels` |

## Expected scan results

A scan typically reports **~22 findings** across **16 rules** with a cognitive score around **B (85–90)**.

| Rule | Triggered? |
|------|------------|
| All 16 enabled rules | Yes |
| `error-prevention/no-undo` | Overlaps with `destructive-no-confirm` (same button) |
| `error-prevention/modal-nesting` | Off by default in `cognitivelint.config.js` |

### Important demo note

CognitiveLint's parser only sees **static JSX**. Use explicit `<th>`, `<TextInput>`, and `<FilterSelect>` elements — not `.map()` — so rules like `dense-tables` and `long-forms` fire reliably.

## Stack

- React 18 + Vite + TypeScript
- PatternFly 5 (`@patternfly/react-core`)
- React Query (for `useMutation` demo)
- [`@cognitivelint/cli`](https://www.npmjs.com/package/@cognitivelint/cli)

## Related

- [CognitiveLint](https://github.com/cognitivelint/cognitivelint) — main project, rules, and docs
- [cognitivelint.github.io](https://cognitivelint.github.io/) — project site
