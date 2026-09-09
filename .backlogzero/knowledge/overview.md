---
name: overview
description: What rbe-ci-red is and why its main branch is deliberately red — read before touching anything here
type: knowledge
scope: global
updated: 2026-09-09 (IONE-959)
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

This repo is a **test fixture**, not an application. See README.md for the
core rule: main is deliberately kept red in CI by a type error, and PR-branch
automated CI-fix agents are expected to fix it (fix PRs themselves are declined,
never merged). Do not treat this as a normal "fix the bug" task.

## What actually exists

The entire source surface is one file, `src/greeting.ts` (7 lines of code):

```ts
export function greeting(name: string): string {
  return `Hello, ${name}!`;
}

export const answer: number = 'forty-two';
```

`answer` is declared `number` but assigned the string literal `'forty-two'` —
this is the single type error `tsc --noEmit` reports, at `src/greeting.ts:11`.
`greeting()` itself is correct and unused elsewhere; it exists only to give the
file a plausible non-trivial shape.

There is no test suite, no runtime entrypoint, and no other source file in this
repository — `package.json` only exposes `typecheck` (`tsc --noEmit`).

## Gap vs README

README (line 12) points to `tests/journeys/scripts/provision-ci-red-fixtures.ts`
for re-provisioning this fixture. That path does not exist anywhere in this
checkout (verified: `tests/` is absent). It is external tooling (likely in the
resolver-core host repo that seeds this fixture), not something you can open or
run from within this repository.

See [[architecture]] for how the red build surfaces to CI, and [[gotchas]] for
the specific things not to do here.
