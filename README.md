# VidTone

VidTone is a cross-platform audio player for video sources such as Bilibili and YouTube.

The project goal is to share media parsing, playlist, and playback-domain logic across platforms, while keeping platform-specific playback adapters separate.

## Repository Layout

```txt
apps/
  web-extension/   Browser extension shell
  mobile/          React Native shell

packages/
  core/            Shared TypeScript domain logic
```

## Initial Scope

- Parse Bilibili and YouTube inputs.
- Resolve playable audio streams.
- Model songs, playlists, queues, and playback modes in shared code.
- Keep Web and mobile playback implementations behind adapters.

## License

TBD.
