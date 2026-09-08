---
name: overview
description: What this repo is and why main is intentionally red — read before touching anything
type: knowledge
scope: global
updated: 2026-09-08 (IONE-959)
captured_sha: 8f14044fc250cc0e6f3f057108aec6e8c67a5375
sources:
  - package.json
  - README.md
  - src/greeting.ts
  - .github/workflows/ci.yml
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  package.json: 91e7e08e3d8c1f4faeb295e1404b691497c70e5207f72e671e01e9e661a65bf4
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

`rbe-ci-red` is a **journey-suite test fixture** for resolver-core (spec 014 / j85), not
an application. Its only purpose is to keep `main`'s CI deterministically red so a
downstream CI-fix agent has a real check-run failure to consume and resolve on a PR
branch. See ../../README.md for the authoritative description of the fixture's intent
and the "do not fix main" rule — that file is correct and should not be duplicated here.

## What actually exists

- `src/greeting.ts` — one function (`greeting`) plus the deliberate defect:
  `export const answer: number = 'forty-two';` (src/greeting.ts:11) assigns a string
  literal to a `number`-typed binding, which `tsc --strict` rejects.
- `package.json` — single script `typecheck` → `tsc --noEmit`. No test runner, no
  lint script, no build/emit step (`noEmit: true` in tsconfig.json).
- No test directory exists in this checkout. The README references
  `tests/journeys/scripts/provision-ci-red-fixtures.ts` as the re-provisioning
  script, but that script lives in the resolver-core monorepo this fixture is
  seeded from, not in this repo's working tree.

## Gotcha: the "minimal fix" is load-bearing

The comment at src/greeting.ts:1-6 and README.md both specify the expected fix is
narrowly a **number literal** replacing `'forty-two'` on line 11 — not a type
change, not removing the export, not refactoring `greeting`. The CI-fix agent
under test is graded on producing exactly that minimal diff; anything broader
changes what the journey is actually testing.
