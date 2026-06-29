# Development

## Prerequisites

- Node.js 20 or newer.
- npm 10.8.2 or compatible npm 10 release.

## Install

```sh
npm install
```

## Common Commands

```sh
npm run typecheck
npm run build
```

Current root scripts run across npm workspaces with `--workspaces --if-present`.

## Repository Layout

```txt
packages/core/     Shared TypeScript domain logic.
apps/              Planned Android-first app shell. Not scaffolded yet.
docs/              Product, architecture, process, and project state.
tasks/             Task templates for agent-friendly implementation requests.
```

## Environment Variables

No environment variables are required yet.

When environment variables are introduced:

- Document them here.
- Add examples to `.env.example`.
- Do not commit real secrets.

## Adding Packages

Prefer using existing packages and standard TypeScript features first.

When adding a dependency:

- Explain why it is needed.
- Prefer package-level dependencies over root dependencies when usage is package-specific.
- Run the relevant verification command.
- Update docs if setup or architecture changes.

## Agent Development Notes

Before editing code, agents should read:

- `AGENTS.md`
- Relevant files under `docs/`
- The package or app files related to the task

For behavior related to source parsing, playlist management, mobile playback, or Android integration, agents should also consult `docs/reference-repos.md` and then inspect the relevant local reference repository.

After editing code, agents should update the relevant docs and summarize verification.
