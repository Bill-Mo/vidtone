# Reference Repositories

VidTone is a new implementation informed by existing local repositories. These repositories are references for product behavior, source handling, and mobile playback architecture. They should not be copied blindly.

## Local Paths

- `/home/user/NoxPlayer`
- `/home/user/azusa-player`
- `/home/user/azusa-player-mobile`

## Reference Roles

### `azusa-player`

Browser extension reference for the original Bilibili audio-player concept.

Useful areas to inspect:

- Bilibili URL and video handling.
- Playlist behavior.
- Browser-extension interaction model.
- Existing test patterns around parser or UI behavior.

### `NoxPlayer`

Enhanced browser-extension reference based on Azusa Player.

Useful areas to inspect:

- Bilibili and YouTube source support.
- Subscription-style playlist updates.
- Lyrics and song-title extraction.
- Bilibili login-related behavior.
- Cloud backup and compatibility ideas.

### `azusa-player-mobile`

Mobile reference for Android and cross-platform app behavior.

Useful areas to inspect:

- React Native Android app structure.
- Mobile playback behavior.
- Queue, playlist, cache, and local storage patterns.
- Android-specific media integration.
- YouTube and Bilibili source handling.

## Usage Rules

- Use these repositories as references, not as direct sources of truth.
- Prefer documenting what behavior is being reused before implementing it.
- Preserve VidTone's package boundaries: shared logic in `packages/core`, Android/app behavior in `apps/*`.
- Check license implications before copying non-trivial code, assets, or text.
- When a feature is ported or reimplemented from a reference repo, mention the source repo in the task notes or decision record.
