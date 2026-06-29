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
- Pure transformation from source metadata to `Song` and `Playlist` models.

### `apps/*`

Platform-specific shells. These should own UI, platform APIs, storage integrations, and playback implementations.

Planned app shells:

- `apps/mobile` as the Android-first app shell.

Browser-extension or other surfaces may be added later, but they are not the first milestone.

Expected `apps/mobile` responsibilities:

- React Native and Expo app shell.
- Android navigation and screens.
- Local persistence with SQLite.
- Playback integration with React Native Track Player.
- Background playback service and Android media notification controls.
- App-level source adapters for Bilibili and YouTube network behavior.
- Cache, credential, cookie, and request-header policy.

## Boundary Rules

- `packages/core` must not depend on browser extension APIs, React Native APIs, DOM APIs, or platform-specific storage.
- Platform-specific behavior should be passed into core through interfaces.
- Shared types should be exported from `packages/core/src/index.ts`.
- App packages should depend on core, not the other way around.
- Source-specific implementation details should remain isolated from generic queue and playlist logic.
- Android playback, background audio, permissions, and storage integrations should stay outside `packages/core`.
- Bilibili and YouTube client setup should stay outside `packages/core` when it requires credentials, cookies, request headers, platform APIs, or third-party clients.
- Stored song metadata should not depend on a currently valid media URL. Playable URLs are resolved on demand and may expire.

## Data Flow

Expected high-level flow:

1. User provides a source URL or source identifier.
2. App shell passes the input to shared parsing logic.
3. Core produces source-aware song or playlist models.
4. App shell uses an `AudioResolver` implementation to resolve playable media.
5. Playback is handled by the app shell through platform APIs.
6. Optional cache behavior is handled through a `CacheAdapter`.

## Proposed Module Layout

```txt
packages/core/src/
  media.ts
  platform.ts
  sources/
    input.ts
    bilibili.ts
    youtube.ts
  playlist/
    playlist.ts
  queue/
    queue.ts
  playback/
    playbackMode.ts

apps/mobile/src/
  app/
  screens/
  components/
  navigation/
  playback/
    trackPlayer.ts
    playbackService.ts
    trackMapping.ts
  storage/
    database.ts
    songsRepository.ts
    playlistsRepository.ts
  sources/
    bilibiliResolver.ts
    youtubeResolver.ts
```

This layout is a direction, not a requirement to create every file immediately.

## Source Resolution

Use a two-step source pipeline:

1. Parse input and create stable source metadata.
2. Resolve a playable media URL only when playback or prefetch needs it.

Bilibili MVP flow:

1. Parse a Bilibili URL to `bvid`.
2. Fetch video metadata and page `cid` values.
3. Create one `Song` for a single-page video or one `Song` per page for multi-page videos.
4. Resolve audio with Bilibili's play URL response.
5. Select a DASH audio stream and pass its URL plus required headers to the mobile playback layer.

YouTube MVP flow:

1. Parse a YouTube URL to video id.
2. Use an app-level YouTube adapter, likely based on `youtubei.js` if no simpler reliable option is found.
3. Create `Song` metadata separately from the transient playable URL.
4. Resolve a playable audio URL on demand.

## Playback

The mobile app should use React Native Track Player for Android audio playback.

`apps/mobile` owns:

- Mapping `Song` plus `ResolvedMediaUrl` into Track Player tracks.
- Background playback service.
- Media notification controls.
- Queue synchronization with app state.
- Refreshing stale media URLs after playback errors.
- Optional media caching.

`packages/core` owns:

- Queue ordering.
- Playback mode semantics.
- Resolver interfaces.
- Source-aware but platform-neutral song and playlist models.

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

- Testing approach for platform adapters.
- Exact SQLite access layer.
- Whether YouTube support starts with `youtubei.js` or a smaller adapter.
- Initial cache policy.
