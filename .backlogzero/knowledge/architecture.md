---
name: architecture
description: How the CI-red fixture mechanism actually flows from push to consumed annotation
type: knowledge
scope: global
updated: 2026-09-07 (IONE-959)
captured_sha: 8f14044fc250cc0e6f3f057108aec6e8c67a5375
sources:
  - .github/workflows/ci.yml
  - tsconfig.json
  - src/greeting.ts
  - package.json
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  package.json: 91e7e08e3d8c1f4faeb295e1404b691497c70e5207f72e671e01e9e661a65bf4
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
  tsconfig.json: b3433dd8b2ee73252b402dc6964bbd0b8fd3e34802fd0750c24a884501678da9
---

There is no runtime service here — the "architecture" is a single-job CI pipeline whose failure output is the product.

```mermaid
flowchart LR
    A[git push to any branch\nor pull_request event] --> B[GitHub Actions job: typecheck]
    B --> C[actions/checkout@v4]
    C --> D[actions/setup-node@v4\nregisters tsc problem matcher]
    D --> E[npm install --no-audit --no-fund]
    E --> F[npx tsc --noEmit]
    F -->|main: answer: number = 'forty-two'| G[Type error at src/greeting.ts:11]
    G --> H[Check-run annotation\n path, line, message]
    H --> I[resolver-core CI-fix agent seeding]
    F -->|PR branch with literal fix, e.g. 42| J[tsc passes, CI green]
```

Notes on the non-obvious edges:
- The problem matcher registered by `actions/setup-node@v4` (line 14-16 of `ci.yml`) is what turns a plain `tsc` stderr line into a structured GitHub check-run annotation — without it the same failure would just be a red job, not a machine-consumable annotation.
- The workflow triggers on `push` to `branches: ['**']` (every branch, not just `main`) and on `pull_request`, so both the persistently-red `main` and any candidate fix branch run the identical job.
- `tsconfig.json` sets `strict: true` and `noEmit: true` — the type check is the only build step; there is no compiled output, no bundler, no test runner in this repo.
