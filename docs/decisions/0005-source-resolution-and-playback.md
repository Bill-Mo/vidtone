# 0005 Source Resolution And Playback

## Status

Accepted.

## Context

VidTone needs to add YouTube and Bilibili video sources, turn them into audio items, and play their audio on Android.

Reference inspection showed:

- `azusa-player` resolves Bilibili audio by fetching video metadata, resolving `cid`, calling the Bilibili `playurl` API, and selecting a DASH audio URL.
- `azusa-player-mobile` wraps playable URLs into React Native Track Player tracks, refreshes URLs when playback errors indicate stale media URLs, and keeps background playback in the mobile layer.
- `NoxPlayer` and `azusa-player-mobile` use `youtubei.js` for YouTube-related source behavior.

## Decision

Use a two-step source pipeline:

1. Parse and model source input as stable `Song` or playlist data.
2. Resolve a playable media URL only when playback or prefetch needs it.

For Bilibili MVP support:

- Parse Bilibili URLs to a source identifier such as `bvid`.
- Fetch video metadata to produce one or more `Song` records.
- Resolve audio through Bilibili's play URL response and select a DASH audio stream.
- Keep request headers, cookies, credential handling, and URL refresh policy inside app-level adapters.

For YouTube MVP support:

- Parse YouTube URLs to video identifiers.
- Use a source adapter based on `youtubei.js` or a simpler proven implementation if available.
- Keep YouTube client setup and platform-specific request behavior outside `packages/core`.

Playback:

- `packages/core` defines source, queue, playlist, and resolver contracts.
- `apps/mobile` turns resolved media into React Native Track Player tracks.
- `apps/mobile` owns background playback service, media notification controls, stale URL refresh, and cache policy.

## Consequences

- Core can be tested without Android or network playback dependencies.
- URL resolution can be retried or refreshed without changing stored song metadata.
- Source adapters may be swapped if a simpler or more reliable implementation is found.
- Reference repos should guide resolver behavior, not UI structure or broad feature scope.
