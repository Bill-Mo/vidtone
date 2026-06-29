# 0001 Initial Stack

## Status

Accepted.

## Context

VidTone needs shared domain logic for multiple app surfaces, starting with a small codebase that agents can understand and extend consistently.

## Decision

Use a TypeScript npm workspace monorepo.

The initial shared package is `@vidtone/core`, located at `packages/core`. It uses ESM and TypeScript declaration output.

Planned app shells live under `apps/*`, while shared logic lives under `packages/*`.

## Consequences

- Shared domain types and logic can be reused by browser, mobile, and other future surfaces.
- Platform APIs must stay outside `packages/core`.
- Build and typecheck commands can run across workspaces from the root.
- App-specific decisions remain open until the first app shell is selected.
