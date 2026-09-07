---
name: overview
description: What this repo is and why its main branch is deliberately red — read before touching src/greeting.ts or the CI workflow
type: knowledge
scope: global
updated: 2026-09-07 (IONE-959)
captured_sha: 8f14044fc250cc0e6f3f057108aec6e8c67a5375
sources:
  - README.md
  - package.json
  - src/greeting.ts
  - .github/workflows/ci.yml
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  README.md: 94e891950db6aae4acb55484a33e18552acbd4aa1f88c834541bec8f45a503b2
  package.json: 91e7e08e3d8c1f4faeb295e1404b691497c70e5207f72e671e01e9e661a65bf4
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

This repo is not an application — it is a **journey-suite fixture** for resolver-core spec 014 / j85. Its sole purpose is to hold `main` deterministically RED in CI so that a downstream "CI-fix agent" seeding process has a reliable, reproducible failure to detect and fix on PR branches.

The single production file is `src/greeting.ts`, which exports a working `greeting()` function plus a deliberately broken line:

```ts
export const answer: number = 'forty-two';
```

Assigning a string literal to a `number`-typed const fails `tsc --noEmit` under `strict: true` (`tsconfig.json`). The CI workflow (`.github/workflows/ci.yml`) runs exactly that check, and `actions/setup-node@v4` registers the TypeScript problem matcher so the failure surfaces as a GitHub check-run **annotation** (`{path, line, message}`) rather than just a red X — that structured annotation is the signal the resolver-core CI-fix agent seeding consumes.

## The one rule that matters

- **Never fix `src/greeting.ts:11` on `main`.** The red build on main is the feature under test, not a bug.
- On a **PR branch**, an automated CI-fix agent is expected to change the line to a valid `number` literal (e.g. `42`) — that is the exact behavior being exercised. Such fix PRs are intentionally declined/never merged; they exist only to prove the agent can make CI pass.

See `../../README.md` for the authoritative statement of this rule.

## Divergences

Diverges from README.md: the README's "Re-provision" line points to `tests/journeys/scripts/provision-ci-red-fixtures.ts` as if it lives in this repo, but no `tests/` directory exists anywhere in this checkout — the provisioning script lives outside this repo (presumably in resolver-core itself). Don't go looking for it here.
