---
name: architecture
description: Shape of the (single) CI pipeline and how it produces the annotation the journey consumes
type: knowledge
scope: global
updated: 2026-09-09 (IONE-959)
captured_sha: 8f14044fc250cc0e6f3f057108aec6e8c67a5375
sources:
  - .github/workflows/ci.yml
  - package.json
  - tsconfig.json
  - src/greeting.ts
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  package.json: 91e7e08e3d8c1f4faeb295e1404b691497c70e5207f72e671e01e9e661a65bf4
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
  tsconfig.json: b3433dd8b2ee73252b402dc6964bbd0b8fd3e34802fd0750c24a884501678da9
---

The repo has one moving part: a single GitHub Actions job. There is no app,
no server, no runtime — the "architecture" is the CI pipeline itself.

```mermaid
flowchart LR
    A[push to any branch\nor pull_request] --> B[job: typecheck\nubuntu-latest, 5min timeout]
    B --> C[actions/checkout@v4]
    C --> D[actions/setup-node@v4\nnode 20, registers tsc problem matcher]
    D --> E[npm install --no-audit --no-fund]
    E --> F[npx tsc --noEmit]
    F -->|src/greeting.ts:11 TS2322| G[check-run annotation\npath/line/message]
    G --> H[resolver-core CI-fix agent\nexternal, not in this repo]
```

Non-obvious edges:
- `setup-node@v4` is what turns raw `tsc` stderr into structured `{path, line,
  message}` annotations (via its built-in tsc problem matcher) — without it
  the failure would still redden the check but wouldn't carry the
  machine-readable annotation the downstream agent parses. See the comment at
  `.github/workflows/ci.yml:14-16`.
- `H` (the CI-fix agent) is not part of this repo; it's the consumer that
  reacts to the annotation on PR branches. `main` never triggers a fix.
