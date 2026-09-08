---
name: branch-and-fix-policy
description: Rules for what may change on main vs. PR branches in this fixture repo
type: convention
scope: global
updated: 2026-09-08 (IONE-959)
captured_sha: 8f14044fc250cc0e6f3f057108aec6e8c67a5375
sources:
  - README.md
  - src/greeting.ts
sources_sha256:
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

This repo inverts the usual "keep CI green" convention on purpose. See
../../README.md for the base rule (never fix main; PR-branch fixes are expected
and always declined/never merged) — not restated here.

## Practical implications not spelled out in the README

- Any change to `src/greeting.ts:11` on `main` (fixing, deleting, or
  type-widening the `answer` export) breaks the fixture for every future
  journey run against this repo — treat that line as immutable on `main`.
- Because fix PRs are **declined, never merged**, do not add automation (e.g. a
  merge-on-green workflow) that would merge a passing PR branch — that would
  defeat the fixture's purpose of testing the CI-fix agent in isolation.
- There is no test suite to run locally; `npm run typecheck` (→ `tsc --noEmit`)
  is the only verification step, and on `main` it is expected to exit non-zero.
