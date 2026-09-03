# rbe-ci-red

**Journey-suite fixture — deterministically RED CI on main** (resolver-core
spec 014 / j85). The type error at `src/greeting.ts:11` keeps every push to
main failing `ci` with a check-run annotation the CI-fix agent seeding consumes.

- **Do NOT fix main** — the red build is the feature.
- **On PR branches, automated CI-fix agents ARE expected to make CI pass**
  (assign a number literal at `src/greeting.ts:11`) — that branch-side fix is
  exactly the behavior under test. Fix PRs are declined, never merged.

Re-provision: `tests/journeys/scripts/provision-ci-red-fixtures.ts`.
