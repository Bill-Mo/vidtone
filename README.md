# VidTone

VidTone is an Android-first audio player for video sources such as Bilibili and YouTube.

The project goal is to let users add, manage, and play audio from YouTube and Bilibili videos. Shared media parsing, playlist, and playback-domain logic should stay reusable across future platforms, while Android-specific playback and storage live in the app layer.

## Repository Layout

```txt
apps/
  mobile/          Android-first mobile app shell

packages/
  core/            Shared TypeScript domain logic

docs/              Product, architecture, development, testing, and status docs
tasks/             Agent-friendly task templates
```

## Initial Scope

- Parse Bilibili and YouTube inputs.
- Resolve playable audio streams.
- Model songs, playlists, queues, and playback modes in shared code.
- Build the Android app first.
- Keep platform playback implementations behind adapters.

## Development

This repository is designed to be agent-friendly. Agents should read `AGENTS.md` and the relevant files under `docs/` before making non-trivial changes.

Common commands:

```sh
pnpm run test
pnpm run typecheck
pnpm run build
```

Key docs:

- `docs/product.md`
- `docs/architecture.md`
- `docs/conventions.md`
- `docs/development.md`
- `docs/testing.md`
- `docs/status.md`
- `docs/reference-repos.md`

## License

TBD.
