# Agent Instructions

## Core Principle

VidTone is intended to be built and maintained primarily by agents.

Every change must leave the repository easier for the next agent to understand. Code, documentation, tests, and project status should move together.

## Required Workflow

For every non-trivial task:

1. Read the relevant code and docs before editing.
2. Identify the likely files to change.
3. Make the smallest coherent implementation.
4. Run the relevant checks.
5. Update documentation affected by the change.
6. Summarize what changed, what was verified, which docs were updated, and any remaining risk.

Small, obvious edits can be made directly, but the final response still needs to mention verification and documentation impact.

## Documentation Is Part Of Done

A task is not complete until documentation has been considered.

Update documentation when changing:

- Product behavior or user flows: `docs/product.md`
- Architecture, module boundaries, or data flow: `docs/architecture.md`
- Coding patterns, naming, or project conventions: `docs/conventions.md`
- Setup, commands, environment variables, or local development: `docs/development.md`
- Tests, quality gates, or verification strategy: `docs/testing.md`
- Meaningful technical choices: `docs/decisions/`
- Current implementation state, known gaps, or next tasks: `docs/status.md`

If no documentation needs to change, say why in the final response.

## Change Constraints

- Prefer existing patterns over new abstractions.
- Do not introduce new dependencies without a clear reason.
- Do not perform unrelated refactors.
- Do not overwrite user changes.
- Keep changes small and verifiable.
- Keep docs concise and current.
- Avoid storing secrets or credentials in the repository.

## Verification

Use the narrowest reliable verification for the change. Current standard commands are:

```sh
pnpm run test
pnpm run typecheck
pnpm run build
```

If a relevant command cannot be run, explain why and describe the remaining risk.

## Handoff Format

Final responses should include:

- What changed
- What was verified
- Which docs were updated
- Any follow-up or risk
