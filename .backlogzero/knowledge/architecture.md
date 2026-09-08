---
name: architecture
description: How the CI signal flows from a push/PR to the resolver-core CI-fix agent
type: knowledge
scope: global
updated: 2026-09-08 (IONE-959)
captured_sha: 8f14044fc250cc0e6f3f057108aec6e8c67a5375
sources:
  - .github/workflows/ci.yml
  - package.json
  - tsconfig.json
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  package.json: 91e7e08e3d8c1f4faeb295e1404b691497c70e5207f72e671e01e9e661a65bf4
  tsconfig.json: b3433dd8b2ee73252b402dc6964bbd0b8fd3e34802fd0750c24a884501678da9
---

There is no runtime service topology here — the "system" is a single GitHub
Actions job whose failure output is the product.

```mermaid
flowchart LR
    A[push to any branch\nor pull_request] --> B[ci workflow]
    B --> C[actions/checkout@v4]
    C --> D[actions/setup-node@v4\nnode 20, registers tsc problem matcher]
    D --> E[npm install --no-audit --no-fund]
    E --> F[npx tsc --noEmit]
    F -->|main: fails on src/greeting.ts:11| G[check-run annotation\npath, line, message]
    F -->|PR branch: expected to pass\nafter CI-fix agent edits line 11| H[green check-run]
    G --> I[resolver-core CI-fix agent\nconsumes annotation]
    I --> H
```

The `setup-node` step's problem matcher (.github/workflows/ci.yml:14-16) is what
turns a raw `tsc` stderr line into a structured `{path, line, message}` check-run
annotation — this is the concrete mechanism resolver-core's seeding depends on,
so removing or reordering that step would silently break the fixture even though
`tsc --noEmit` would still run.
