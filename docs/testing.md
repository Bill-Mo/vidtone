# Testing

## Current State

The project currently has TypeScript verification but no dedicated test runner.

Available checks:

```sh
npm run typecheck
npm run build
```

## Expected Verification

For documentation-only changes:

- Run no code checks if the change cannot affect runtime behavior.
- Optionally inspect Markdown manually for structure and links.

For TypeScript type or domain model changes:

- Run `npm run typecheck`.
- Run `npm run build` when emitted output or package exports may be affected.

For future app changes:

- Run the relevant app test suite once one exists.
- Run linting once a lint command exists.
- Use browser or device verification for user-facing playback behavior.

## Future Test Strategy

Add focused tests around:

- Source URL parsing.
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
