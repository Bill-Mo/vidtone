# 0004 Mobile Stack

## Status

Accepted.

## Context

VidTone's first shipping surface is Android. The app needs a JavaScript and TypeScript stack that can support mobile UI, background audio playback, local storage, and reuse of `packages/core`.

The local `azusa-player-mobile` reference uses React Native, Expo, React Navigation, Zustand, SQLite, and React Native Track Player. That project is more feature-rich than VidTone's first MVP, so VidTone should adopt only the pieces that directly support the current product.

## Decision

Use React Native with Expo for the Android app shell.

Use these supporting choices for the MVP:

- React Navigation for app navigation.
- Zustand for app UI and playback state that is not pure domain logic.
- SQLite for local persistence.
- React Native Track Player for Android background audio playback.
- TypeScript across the app and shared packages.

Defer these until there is a direct need:

- Drizzle ORM.
- Cloud backup.
- Lyrics.
- FFmpeg-based normalization.
- Android Auto.
- CarPlay.
- Crossfade and AB repeat.
- Broad plugin systems.

## Consequences

- `apps/mobile` will own React Native, Expo, Track Player, SQLite, permissions, and Android-specific code.
- `packages/core` remains platform-agnostic and must not import React Native, Expo, or Track Player.
- The first app implementation should stay smaller than the reference mobile app.
- Additional dependencies should be added only when they solve an immediate MVP problem.
