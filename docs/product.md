# Product

## Summary

VidTone is an Android-first audio player for video sources such as Bilibili and YouTube.

The product should let users add supported Bilibili and YouTube videos, manage them as audio items, organize them into playlists and queues, and play their audio on Android.

## Target Users

- Users who listen to music, talks, podcasts, or long-form audio from video platforms.
- Users who want playlist and queue control without keeping the original video player in focus.
- Android users who want a mobile-first listening experience.

## Initial Scope

- Parse Bilibili and YouTube inputs.
- Resolve playable audio streams where supported.
- Model songs, playlists, queues, and playback modes in shared code.
- Build an Android app as the first shipping surface.
- Add and manage video-derived audio items.
- Keep platform-specific playback implementations behind adapters.
- Use local reference repositories to inform behavior and architecture.

## Out Of Scope For Now

- Public social features.
- Cloud sync.
- Payments.
- Advanced recommendation systems.
- Broad platform support beyond the first Bilibili and YouTube flows.
- Browser extension support as a first milestone.

## Product Principles

- Keep the core listening flow simple: add source, resolve audio, play, queue, organize.
- Optimize the first product experience for Android.
- Keep platform differences behind app-specific adapters.
- Prefer explicit user control over hidden automation.
- Preserve enough metadata to make playlists useful offline or after source refreshes.

## Reference Products

VidTone should be informed by these local repositories:

- `/home/user/NoxPlayer`
- `/home/user/azusa-player`
- `/home/user/azusa-player-mobile`

See `docs/reference-repos.md` for how agents should use these references.

## Open Questions

- What source URLs and playlist formats are supported in the first MVP?
- What caching behavior is allowed for each source platform?
- What authentication, if any, is needed for source access?
- Which Android app stack should be used for the first implementation?
