2026-09-07 · first-run · created .backlogzero

- Indexed the repo: a resolver-core journey-suite fixture (spec 014 / j85) whose only purpose is a deterministic type error keeping `main` red in CI.
- Wrote `knowledge/overview.md` explaining the fixture's purpose, the exact break location (`src/greeting.ts:11`), and how the CI annotation is consumed.
- Wrote `knowledge/architecture.md` with a Mermaid flowchart of the push → GitHub Actions → tsc → annotation pipeline.
- Wrote `conventions/ci-fixture-rules.md` codifying the hard rule: never fix `main`, only fix PR branches with a numeric literal, and fix PRs are expected to be declined.
- Noted a divergence: README's "Re-provision" pointer (`tests/journeys/scripts/provision-ci-red-fixtures.ts`) does not exist in this checkout — no `tests/` directory is present.
