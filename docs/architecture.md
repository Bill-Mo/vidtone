# Architecture

## Current Shape

VidTone is a TypeScript monorepo using pnpm workspaces. It is Android-first, with shared source and playback-domain logic kept in reusable packages.

```txt
apps/
  mobile/

packages/
  core/
```

Only `packages/core` exists at the moment. The Android-first mobile app shell is planned but not scaffolded yet.

## Package Responsibilities

### `packages/core`

Shared domain logic that should be portable across app surfaces.

Current responsibilities:

- Media source types.
- Song, playlist, and resolved media URL models.
- Platform adapter interfaces for fetch, audio resolution, and cache access.

Expected future responsibilities:

- Source input parsing.
- Queue and playlist domain operations.
- Playback mode state.
- Source-agnostic resolver contracts.

### `apps/*`

Platform-specific shells. These should own UI, platform APIs, storage integrations, and playback implementations.

Planned app shells:

- `apps/mobile` as the Android-first app shell.

Browser-extension or other surfaces may be added later, but they are not the first milestone.

## Boundary Rules

- `packages/core` must not depend on browser extension APIs, React Native APIs, DOM APIs, or platform-specific storage.
- Platform-specific behavior should be passed into core through interfaces.
- Shared types should be exported from `packages/core/src/index.ts`.
- App packages should depend on core, not the other way around.
- Source-specific implementation details should remain isolated from generic queue and playlist logic.
- Android playback, background audio, permissions, and storage integrations should stay outside `packages/core`.

## Data Flow

Expected high-level flow:

1. User provides a source URL or source identifier.
2. App shell passes the input to shared parsing logic.
3. Core produces source-aware song or playlist models.
4. App shell uses an `AudioResolver` implementation to resolve playable media.
5. Playback is handled by the app shell through platform APIs.
6. Optional cache behavior is handled through a `CacheAdapter`.

## Reference Repositories

Implementation should be informed by existing local repositories:

- `/home/user/NoxPlayer`
- `/home/user/azusa-player`
- `/home/user/azusa-player-mobile`

Use `docs/reference-repos.md` before inspecting or porting behavior from those repos.

## Current Code

- `packages/core/src/media.ts` defines media source, song, playlist, and resolved URL types.
- `packages/core/src/platform.ts` defines adapter interfaces.
- `packages/core/src/index.ts` re-exports the public core API.

## Open Architecture Decisions

- Source parsing design.
- Resolver implementation boundaries.
- Persistent storage strategy.
- Queue and playback state model.
- Testing approach for platform adapters.
- Android app stack and playback implementation.
