---
name: ci-fixture-rules
description: Rules for what may and may not be changed in this fixture repo — read before editing src/greeting.ts, tsconfig.json, or the CI workflow
type: convention
scope: global
updated: 2026-09-07 (IONE-959)
captured_sha: 8f14044fc250cc0e6f3f057108aec6e8c67a5375
sources:
  - README.md
  - src/greeting.ts
  - .github/workflows/ci.yml
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

This repo inverts the usual "green CI is good" assumption, so normal instincts about fixing a broken build do not apply here.

- **On `main`**: leave `src/greeting.ts:11` (`export const answer: number = 'forty-two';`) exactly as-is. Do not "helpfully" correct the type error, do not delete the line, do not loosen `tsconfig.json`'s `strict` flag to make it compile. Any of those would remove the red signal the fixture exists to produce.
- **On a PR branch**: the only in-scope fix is replacing `'forty-two'` with a numeric literal (e.g. `42`) on that one line. Nothing else in `src/greeting.ts`, `tsconfig.json`, or `.github/workflows/ci.yml` should need to change to go green.
- Fix PRs that do this are expected to be declined/never merged — merging one would permanently turn `main` green and break the fixture for future runs. If asked to "fix CI" in this repo, confirm whether the request is against `main` (decline) or a PR branch (expected, scoped to the one-line numeric fix).
- Don't add tests, linting, or extra CI jobs — the single `typecheck` job in `.github/workflows/ci.yml` is intentionally the entire pipeline (see [[architecture]]).
