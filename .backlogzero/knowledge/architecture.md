---
name: architecture
description: How the single typecheck job turns the intentional type error into a CI signal — read before editing the workflow or greeting.ts
type: knowledge
scope: global
updated: 2026-09-09 (IONE-959)
captured_sha: 8f14044fc250cc0e6f3f057108aec6e8c67a5375
sources:
  - .github/workflows/ci.yml
  - src/greeting.ts
  - package.json
sources_sha256:
  .github/workflows/ci.yml: 78a07cbeb9a9a149e2c4b07d43c1748d898b13cf2fd769e79e06fbb270ae4acb
  package.json: 91e7e08e3d8c1f4faeb295e1404b691497c70e5207f72e671e01e9e661a65bf4
  src/greeting.ts: a8e1dbd805e47e32ce412d18ba9f9c04a46eb1d2a919f3bfb26358735d3bc7f8
---

```mermaid
flowchart LR
    A["push (any branch)\nor pull_request event"] --> B["GitHub Actions\nworkflow: ci (.github/workflows/ci.yml)"]
    B --> C["job: typecheck\n(ubuntu-latest, 5 min timeout)"]
    C --> D["actions/checkout@v4"]
    D --> E["actions/setup-node@v4\n(node 20, registers tsc problem matcher)"]
    E --> F["npm install --no-audit --no-fund"]
    F --> G["npx tsc --noEmit"]
    G -->|"src/greeting.ts:11 type error"| H["check-run annotation\n{path, line, message}"]
    H --> I["resolver-core CI-fix agent\n(external, consumes annotation)"]
```

There is exactly one workflow (`ci`) and one job (`typecheck`) in this repo —
no build, deploy, or release pipeline exists. The whole point of the pipeline is
the annotation `G -> H`: `actions/setup-node@v4` registers a `tsc` problem
matcher (see the comment in ci.yml lines 14-16), which is what turns the raw
`tsc --noEmit` failure into a structured `{path, line, message}` check-run
annotation instead of a plain log line. That structured annotation is the
contract an external CI-fix agent (outside this repo) is built to parse and act
on — see [[overview]] for why the error must stay.

The workflow triggers on push to **every** branch (`branches: ['**']`) and on
every `pull_request`, so both "main stays red" and "PR branch gets a fix
attempt" run through the identical job — the branch context alone determines
which behavior is expected (see [[gotchas]]).
