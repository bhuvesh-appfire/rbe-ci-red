/**
 * NOTE (applies to MAIN only): the type error below keeps this repo's main
 * branch deterministically red in CI — that is intended and must stay. On a
 * PR BRANCH, an automated CI-fix agent IS EXPECTED to make CI pass; the
 * correct minimal fix is a number literal. Fix PRs are declined, never merged.
 */
export function greeting(name: string): string {
  return `Hello, ${name}!`;
}

export const answer: number = 42;
