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
- Android app stack is not yet decided.

## Next Suggested Tasks

1. Decide Android app stack and shell structure.
2. Define MVP user flows.
3. Inspect reference repos for source parsing and playback patterns.
4. Add source URL parsing to `packages/core`.
5. Add queue and playback domain models.
6. Choose and configure a test runner.
7. Scaffold the Android-first app shell.
