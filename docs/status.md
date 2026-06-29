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
- Agent workflow and documentation baseline.

## Not Yet Implemented

- Android-first app shell.
- Source URL parsing.
- Audio resolver implementations.
- Queue and playback state logic.
- Persistent storage.
- Test runner.
- Linting.
- Environment variable template.

## Known Gaps

- MVP user flow needs more detail.
- Platform policy and caching constraints for Bilibili and YouTube need review.
- Error handling patterns are not yet defined.
- No automated tests exist beyond TypeScript verification.
- Exact SQLite access layer is not yet decided.
- Initial cache policy is not yet decided.

## Next Suggested Tasks

1. Define MVP user flows.
2. Add source URL parsing to `packages/core`.
3. Add queue and playback domain models.
4. Choose and configure a test runner.
5. Scaffold the Android-first app shell.
6. Implement Bilibili metadata and audio URL resolver adapter.
7. Implement YouTube metadata and audio URL resolver adapter.
