# 0002 Android First

## Status

Accepted.

## Context

VidTone was initially described as cross-platform, but the current product goal is to build an Android app first.

The app should let users add and manage YouTube and Bilibili videos, then play the audio from those videos. Existing local repositories provide reference implementations and product behavior:

- `/home/user/NoxPlayer`
- `/home/user/azusa-player`
- `/home/user/azusa-player-mobile`

## Decision

Prioritize the Android app as the first shipping surface.

Keep `packages/core` platform-agnostic so source parsing, playlist models, queue behavior, and resolver contracts can still be reused by future surfaces.

Use the existing repositories as references for behavior and architecture, especially `azusa-player-mobile` for mobile and Android concerns.

## Consequences

- `apps/mobile` or an Android-focused app shell should be scaffolded before browser-extension work.
- Product and technical decisions should optimize for Android playback and local management first.
- Browser extension support remains possible but is no longer the first milestone.
- Reference-repo behavior must be evaluated before reuse, especially where licensing, platform policy, credentials, or source-platform access are involved.
