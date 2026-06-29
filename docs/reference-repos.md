# Reference Repositories

VidTone is a new implementation informed by existing local repositories. These repositories are references for product behavior, source handling, and mobile playback architecture. They should not be copied blindly.

The most important reference area is how the existing projects resolve and play audio from video websites. UI style, code formatting, broad feature scope, and framework choices should not be followed automatically.

## Local Paths

- `/home/user/NoxPlayer`
- `/home/user/azusa-player`
- `/home/user/azusa-player-mobile`

## Reference Roles

### `azusa-player`

Browser extension reference for the original Bilibili audio-player concept.

Useful areas to inspect:

- Bilibili URL and video handling.
- Audio resolution and playback behavior for Bilibili videos.
- Existing test patterns around parser behavior.

### `NoxPlayer`

Enhanced browser-extension reference based on Azusa Player.

Useful areas to inspect:

- Bilibili and YouTube source support.
- Audio resolution for Bilibili and YouTube videos.
- Any credential, cookie, or request patterns needed to make video audio playable.

### `azusa-player-mobile`

Mobile reference for Android and cross-platform app behavior.

Useful areas to inspect:

- Mobile playback behavior.
- Android-specific media integration.
- YouTube and Bilibili source handling.
- Minimal storage or cache patterns only when they directly support playback.

## Usage Rules

- Use these repositories as references, not as direct sources of truth.
- Prefer the simplest VidTone-specific implementation that satisfies the requirement.
- Do not inherit UI style, formatting rules, broad feature scope, or dependency choices unless they clearly solve a current VidTone problem.
- Prefer documenting what behavior is being reused before implementing it.
- Preserve VidTone's package boundaries: shared logic in `packages/core`, Android/app behavior in `apps/*`.
- Check license implications before copying non-trivial code, assets, or text.
- When a feature is ported or reimplemented from a reference repo, mention the source repo in the task notes or decision record.
