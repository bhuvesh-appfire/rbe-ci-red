---
name: ci-red-fixture
description: The one rule for touching src/greeting.ts — read before making any change here
type: convention
scope: global
updated: 2026-09-09 (IONE-959)
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

The branch-dependent fix rule is already stated correctly in
`../../README.md:7-10` and `src/greeting.ts:1-6` — cite those, don't restate
them at length. Summary for quick reference:

- **`main`**: never fix the type error at `src/greeting.ts:11`. Red CI on
  main is the feature under test, not a bug.
- **PR branches**: an automated CI-fix agent making CI pass (by assigning a
  number literal, e.g. `42`, to `answer` at `src/greeting.ts:11`) is the
  expected, correct behavior — that's exactly what the journey is testing.
- Any **fix PR opened against `main`** is expected to be declined and never
  merged — that's part of the fixture's contract, not an oversight to
  correct.

## What this means for an agent working in `.backlogzero/`

Because this repo's only content-file (`src/greeting.ts`) is a deliberate
fixture, there's nothing here to "improve" — no refactor, no added test, no
extra validation is in scope. If a task ever asks you to make CI green on
`main`, that request conflicts with the fixture's stated purpose; flag it
back to the user rather than doing it.
