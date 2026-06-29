# 0003 Use pnpm

## Status

Accepted.

## Context

VidTone is a JavaScript and TypeScript monorepo. The project should use a package manager that works well with workspaces, keeps installs deterministic, and remains friendly to agent-driven development.

The initial repository used npm workspace metadata and `package-lock.json`.

## Decision

Use pnpm for JavaScript package management.

The root package manager is pinned through `packageManager` in `package.json`, and workspace packages are declared in `pnpm-workspace.yaml`.

## Consequences

- Use `pnpm install` for dependency installation.
- Use `pnpm run typecheck` and `pnpm run build` for root verification.
- Keep `pnpm-lock.yaml` as the JavaScript dependency lockfile.
- Do not reintroduce `package-lock.json` or `yarn.lock`.
