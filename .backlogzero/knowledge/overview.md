---
name: overview
description: What this repo is and the one hard rule that governs all changes here
type: knowledge
scope: global
updated: 2026-09-09 (IONE-959)
captured_sha: 8f14044fc250cc0e6f3f057108aec6e8c67a5375
sources:
  - README.md
  - package.json
  - src/greeting.ts
sources_sha256:
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  package.json: 91e7e08e3d8c1f4faeb295e1404b691497c70e5207f72e671e01e9e661a65bf4
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

This repo is a **journey-suite fixture**, not a product. Its entire purpose,
the deliberate-red-main behavior, and the PR-branch fix contract are already
correctly described in `../../README.md` and the header comment of
`src/greeting.ts:1-6` — read those first; this page only adds what they don't
say.

## Derived facts not in the README

- The repo has **no test suite and no build step** — `package.json` defines
  exactly one script, `typecheck` (`tsc --noEmit`). There is nothing else to
  run, and no framework (jest/vitest/etc.) is installed.
- The only dependency is `typescript@5.6.3` (dev-only). Do not add runtime
  dependencies or a test framework — the fixture's minimalism is load-bearing
  for the journey it seeds.
- `tsconfig.json` has `strict: true`, so the `answer: number = 'forty-two'`
  assignment at `src/greeting.ts:11` fails as **TS2322** ("Type 'string' is
  not assignable to type 'number'"). That is the exact diagnostic the
  resolver-core CI-fix agent journey expects to see in the check-run
  annotation.
- `tests/journeys/scripts/provision-ci-red-fixtures.ts`, referenced by the
  README's "Re-provision" line, does **not exist in this repo** — it lives in
  the upstream resolver-core repo that seeds/reprovisions this fixture from
  the outside. Don't go looking for it here.

See `../conventions/ci-red-fixture.md` for the operational rule this implies
for any agent touching `src/greeting.ts`.
