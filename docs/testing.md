# Testing

## Current State

The project currently uses Node's built-in test runner for `packages/core` behavior tests, plus TypeScript verification and build checks.

Available checks:

```sh
pnpm run test
pnpm run typecheck
pnpm run build
```

## Expected Verification

For documentation-only changes:

- Run no code checks if the change cannot affect runtime behavior.
- Optionally inspect Markdown manually for structure and links.

For TypeScript type or domain model changes:

- Run `pnpm run test` when behavior is covered by tests or should be covered by tests.
- Run `pnpm run typecheck`.
- Run `pnpm run build` when emitted output or package exports may be affected.

For future app changes:

- Run the relevant app test suite once one exists.
- Run linting once a lint command exists.
- Use browser or device verification for user-facing playback behavior.

## Future Test Strategy

Maintain or add focused tests around:

- Source input parsing.
- Playlist and queue operations.
- Playback mode transitions.
- Resolver contracts.
- Cache adapter behavior.
- Platform adapter integration boundaries.

## Documentation Requirement

When adding or changing test commands, update:

- `docs/testing.md`
- `docs/development.md`
- `AGENTS.md` if the standard verification workflow changes
