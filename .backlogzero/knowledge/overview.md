---
name: overview
description: What rbe-ci-red is and why its main branch is intentionally red
type: knowledge
scope: global
updated: 2026-09-09 (IONE-959)
captured_sha: 8f14044fc250cc0e6f3f057108aec6e8c67a5375
sources:
  - README.md
  - src/greeting.ts
  - package.json
  - tsconfig.json
sources_sha256:
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  package.json: 91e7e08e3d8c1f4faeb295e1404b691497c70e5207f72e671e01e9e661a65bf4
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
  tsconfig.json: b3433dd8b2ee73252b402dc6964bbd0b8fd3e34802fd0750c24a884501678da9
---

This repo is a **journey-suite fixture** for resolver-core (spec 014 / j85), not a
real application. See ../../README.md for the intended behavior: `main` is kept
deterministically red in CI by a type error, and PR-branch CI-fix agents are
expected to resolve it (fix PRs are declined, never merged).

## Gaps not covered by README

- **Why `tsc` catches it**: `tsconfig.json` sets `"strict": true`, which is what
  turns `export const answer: number = 'forty-two';` (`src/greeting.ts:11`) into
  a hard type error (`string` is not assignable to `number`). Without strict
  mode this line would not fail.
- **Exact expected fix**: per the code comment at `src/greeting.ts:1-6`, the
  correct minimal PR-branch fix is replacing the string literal with a number
  literal, e.g. `export const answer: number = 42;` — nothing else on the line
  or in the file should change.
- **CI command differs from the package script**: `package.json` defines a
  `typecheck` script (`tsc --noEmit`), but `.github/workflows/ci.yml` invokes
  `npx tsc --noEmit` directly rather than `npm run typecheck`. Both run the same
  underlying command today, so this is not a bug, just worth knowing if the
  script is ever changed without updating the workflow (or vice versa).
- **Re-provision script is not in this checkout**: README points to
  `tests/journeys/scripts/provision-ci-red-fixtures.ts` for re-provisioning this
  fixture, but no `tests/` directory exists in this repo — that script lives in
  the parent resolver-core journey-suite repo, not here.

## Files that matter

- `src/greeting.ts` — the only source file; line 11 is the deliberate break.
- `.github/workflows/ci.yml` — single `typecheck` job, relies on the
  `actions/setup-node` `tsc` problem matcher to turn compiler errors into
  check-run annotations (see [[architecture]]).
