---
name: fixture-handling
description: Rules for how agents should (and should not) touch this fixture's intentional break
type: convention
scope: global
updated: 2026-09-09 (IONE-959)
captured_sha: 8f14044fc250cc0e6f3f057108aec6e8c67a5375
sources:
  - README.md
  - src/greeting.ts
sources_sha256:
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

See ../../README.md and the comment at ../../src/greeting.ts:1-6 for the core
rule: never fix the type error on `main`, but do fix it on PR branches.

## Derived, code-level specifics

- The fix must be **scoped to the value only** — change
  `export const answer: number = 'forty-two';` to a numeric literal
  (e.g. `42`), keeping the identifier name, type annotation, and export intact.
  Renaming `answer`, changing its declared type away from `number`, or removing
  the `export` would break the narrow contract the CI-fix journey is testing.
- There is no test suite in this repo (no `tests/` directory, no test runner in
  `package.json`). The only verification step is `tsc --noEmit` via
  `npm run typecheck` or the CI job directly — do not add a test framework or
  test files here as part of a "fix," since that would go beyond the minimal
  change the journey expects.
- Do not edit `.github/workflows/ci.yml` or `tsconfig.json` to make the error
  go away (e.g. loosening `strict`, or excluding `src/greeting.ts`). Those are
  the fixture's control knobs, not the bug.
