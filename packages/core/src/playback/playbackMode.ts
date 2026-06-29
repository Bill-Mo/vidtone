export type PlaybackMode = 'sequential' | 'repeat-all' | 'repeat-one' | 'shuffle';

export const cyclePlaybackMode = (mode: PlaybackMode): PlaybackMode => {
  switch (mode) {
    case 'sequential':
      return 'repeat-all';
    case 'repeat-all':
      return 'repeat-one';
    case 'repeat-one':
      return 'shuffle';
    case 'shuffle':
      return 'sequential';
  }
};
