# Project Status

## Current Phase

Early project setup for an Android-first, agent-friendly MVP.

## Implemented

- TypeScript workspace root.
- pnpm workspace package management.
- Shared `@vidtone/core` package.
- Repository ignore rules for generated output, local environment files, and editor settings.
- Product direction: Android app for adding, managing, and playing audio from YouTube and Bilibili videos.
- Local reference-repo documentation for `NoxPlayer`, `azusa-player`, and `azusa-player-mobile`.
- Accepted mobile stack direction: React Native, Expo, React Navigation, Zustand, SQLite, and React Native Track Player.
- Accepted source pipeline: stable song metadata first, transient playable URL resolution on demand.
- Core media models:
  - `MediaSource`
  - `Song`
  - `Playlist`
  - `ResolvedMediaUrl`
- Core platform adapter interfaces:
  - `RequestAdapter`
  - `AudioResolver`
  - `CacheAdapter`
- Core source input parsing for Bilibili and YouTube video inputs.
- Core Bilibili metadata to song and playlist mapping.
- Core YouTube metadata to song and playlist mapping.
- Core playback mode and queue domain operations.
- Core playlist domain operations.
- Node test runner coverage for core source input, Bilibili mapping, YouTube mapping, queue, and playlist behavior.
- Agent workflow and documentation baseline.

## Not Yet Implemented

- Android-first app shell.
- Audio resolver implementations.
- Persistent storage.
- Linting.
- Environment variable template.

## Known Gaps

- MVP user flow needs more detail.
- Platform policy and caching constraints for Bilibili and YouTube need review.
- Error handling patterns are not yet defined.
- Exact SQLite access layer is not yet decided.
- Initial cache policy is not yet decided.

## Next Suggested Tasks

1. Define MVP user flows.
2. Scaffold the Android-first app shell.
3. Implement Bilibili metadata and audio URL resolver adapter.
4. Implement YouTube metadata and audio URL resolver adapter.
5. Add persistence repositories for songs, playlists, and playback queue.
