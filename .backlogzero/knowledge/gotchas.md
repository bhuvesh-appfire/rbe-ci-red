---
name: gotchas
description: Hard rules for this fixture repo — what must never be "fixed" and what fix agents are expected to do on PR branches
type: knowledge
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

- **Never fix `src/greeting.ts:11` on `main`.** `export const answer: number =
  'forty-two';` is the intentional type error that keeps `main` red. See
  [[overview]] — this is the feature under test, not a bug.
- **On a PR branch, the expected minimal fix is a number literal** (e.g.
  `answer: number = 42`) — this is the exact edit an automated CI-fix agent is
  supposed to make. Making any larger change (renaming, restructuring,
  reformatting the file) goes beyond what the fixture is testing.
- **Fix PRs are declined, never merged** (README) — if you're asked to open a
  PR fixing the type error, know that merging it is not the expected outcome;
  the fixture measures whether the fix attempt happens and what it looks like,
  not whether it lands.
- `greeting()` is a red herring in terms of functionality — it type-checks fine
  and has no test coverage; don't add tests or exports for it, that's outside
  this fixture's scope (see [[overview]] for the intentionally minimal file
  set).
- The CI job's 5-minute timeout and `branches: ['**']` trigger (ci.yml) mean
  literally every branch, including scratch/experiment branches, will report a
  red `typecheck` check on push unless the number-literal fix is present on
  that branch — this is expected, not a sign something is broken. See
  [[architecture]] for the full trigger-to-annotation flow.
