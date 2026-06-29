# Conventions

## General

- Use TypeScript for application and shared package code.
- Prefer explicit exported types for domain models and public package APIs.
- Keep implementation changes small and cohesive.
- Follow existing file and package structure before adding new abstractions.
- Avoid new dependencies unless they remove meaningful complexity.

## Monorepo

- Shared code belongs in `packages/*`.
- App-specific code belongs in `apps/*`.
- `packages/core` should stay platform-agnostic.
- Public package exports should flow through the package `src/index.ts`.

## TypeScript

- Use ESM modules.
- Prefer interfaces for exported object shapes that are intended to be extended or implemented.
- Prefer type aliases for unions and simple composed types.
- Avoid `any` unless there is a documented reason.
- Keep source files focused on one domain concept or closely related set of concepts.

## Naming

- Use `PascalCase` for exported types and interfaces.
- Use `camelCase` for variables, functions, and object properties.
- Use clear domain names such as `Song`, `Playlist`, `AudioResolver`, and `CacheAdapter`.
- Avoid source-specific names in generic domain models unless the field is explicitly source-aware.

## Documentation

- Keep docs concise and current.
- Update docs in the same change as code when behavior, architecture, setup, testing, or status changes.
- Add a decision record under `docs/decisions/` for meaningful technical choices.
- Update `docs/status.md` when implemented scope, known gaps, or next suggested tasks change.

## Safety

- Do not commit secrets.
- Use `.env.example` for documenting required environment variables once env vars are introduced.
- Treat source-platform credentials, cookies, and tokens as sensitive.
- Validate external input before using it in resolver or playback flows.
