---
name: architecture
description: The CI pipeline shape that produces the red/green signal this fixture exists to test
type: knowledge
scope: global
updated: 2026-09-09 (IONE-959)
captured_sha: 8f14044fc250cc0e6f3f057108aec6e8c67a5375
sources:
  - .github/workflows/ci.yml
  - src/greeting.ts
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

There is no application architecture here — the repo is one source file plus one
workflow. The only "system" worth diagramming is the CI pipeline itself, since
that pipeline's pass/fail signal is the actual product under test.

```mermaid
flowchart LR
    A[push or pull_request\nany branch] --> B[actions/checkout@v4]
    B --> C[actions/setup-node@v4\nnode 20, registers tsc problem matcher]
    C --> D[npm install --no-audit --no-fund]
    D --> E[npx tsc --noEmit]
    E -->|main: fails on\nsrc/greeting.ts:11| F[check-run annotation\nconsumed by resolver-core\nCI-fix agent seeding]
    E -->|PR branch fixed:\nanswer is a number| G[typecheck job green]
```

The `setup-node` problem matcher (comment at `.github/workflows/ci.yml:14-16`) is
what converts a raw `tsc` compiler error into a structured check-run annotation
(`{path, line, message}`) — that annotation, not the exit code alone, is the
signal the resolver-core CI-fix agent seeding actually consumes.
