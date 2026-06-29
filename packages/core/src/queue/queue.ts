import type { Song } from '../media.js';
import type { PlaybackMode } from '../playback/playbackMode.js';

export interface PlaybackQueue {
  songs: Song[];
  currentSongId?: string;
  mode: PlaybackMode;
  shuffleOrder?: string[];
}

export interface CreateQueueOptions {
  currentSongId?: string;
  mode?: PlaybackMode;
  shuffleOrder?: string[];
}

export const createQueue = (songs: Song[] = [], options: CreateQueueOptions = {}): PlaybackQueue => {
  const currentSongId = resolveCurrentSongId(songs, options.currentSongId);

  return normalizeQueue({
    songs: [...songs],
    currentSongId,
    mode: options.mode ?? 'sequential',
    shuffleOrder: options.shuffleOrder,
  });
};

export const getCurrentSong = (queue: PlaybackQueue): Song | undefined => {
  return queue.songs.find((song) => song.id === queue.currentSongId);
};

export const setCurrentSong = (queue: PlaybackQueue, songId: string): PlaybackQueue => {
  if (!queue.songs.some((song) => song.id === songId)) {
    return queue;
  }

  return {
    ...queue,
    currentSongId: songId,
  };
};

export const setPlaybackMode = (
  queue: PlaybackQueue,
  mode: PlaybackMode,
  shuffleOrder = queue.shuffleOrder,
): PlaybackQueue => {
  return normalizeQueue({
    ...queue,
    mode,
    shuffleOrder,
  });
};

export const appendSongs = (queue: PlaybackQueue, songs: Song[]): PlaybackQueue => {
  return normalizeQueue({
    ...queue,
    songs: [...queue.songs, ...songs],
  });
};

export const insertSongsAfterCurrent = (queue: PlaybackQueue, songs: Song[]): PlaybackQueue => {
  const currentIndex = getCurrentIndex(queue);
  const insertIndex = currentIndex === -1 ? queue.songs.length : currentIndex + 1;
  const nextSongs = [...queue.songs];
  nextSongs.splice(insertIndex, 0, ...songs);

  return normalizeQueue({
    ...queue,
    songs: nextSongs,
  });
};

export const removeSong = (queue: PlaybackQueue, songId: string): PlaybackQueue => {
  const nextSongs = queue.songs.filter((song) => song.id !== songId);
  const removedCurrent = queue.currentSongId === songId;
  const nextCurrentSongId = removedCurrent ? resolveCurrentAfterRemoval(queue, songId) : queue.currentSongId;

  return normalizeQueue({
    ...queue,
    songs: nextSongs,
    currentSongId: nextCurrentSongId,
  });
};

export const moveSong = (queue: PlaybackQueue, songId: string, targetIndex: number): PlaybackQueue => {
  const sourceIndex = queue.songs.findIndex((song) => song.id === songId);
  if (sourceIndex === -1) {
    return queue;
  }

  const nextSongs = [...queue.songs];
  const [song] = nextSongs.splice(sourceIndex, 1);
  nextSongs.splice(clamp(targetIndex, 0, nextSongs.length), 0, song);

  return normalizeQueue({
    ...queue,
    songs: nextSongs,
  });
};

export const getNextSong = (queue: PlaybackQueue): Song | undefined => {
  const nextId = getNextSongId(queue);
  return queue.songs.find((song) => song.id === nextId);
};

export const getPreviousSong = (queue: PlaybackQueue): Song | undefined => {
  const previousId = getPreviousSongId(queue);
  return queue.songs.find((song) => song.id === previousId);
};

export const getNextSongId = (queue: PlaybackQueue): string | undefined => {
  if (!queue.songs.length) {
    return undefined;
  }

  if (queue.mode === 'repeat-one') {
    return queue.currentSongId;
  }

  if (queue.mode === 'shuffle') {
    return getRelativeShuffleSongId(queue, 1);
  }

  return getRelativeSequentialSongId(queue, 1);
};

export const getPreviousSongId = (queue: PlaybackQueue): string | undefined => {
  if (!queue.songs.length) {
    return undefined;
  }

  if (queue.mode === 'repeat-one') {
    return queue.currentSongId;
  }

  if (queue.mode === 'shuffle') {
    return getRelativeShuffleSongId(queue, -1);
  }

  return getRelativeSequentialSongId(queue, -1);
};

export const advanceQueue = (queue: PlaybackQueue): PlaybackQueue => {
  const nextSongId = getNextSongId(queue);
  return nextSongId ? setCurrentSong(queue, nextSongId) : queue;
};

export const rewindQueue = (queue: PlaybackQueue): PlaybackQueue => {
  const previousSongId = getPreviousSongId(queue);
  return previousSongId ? setCurrentSong(queue, previousSongId) : queue;
};

const normalizeQueue = (queue: PlaybackQueue): PlaybackQueue => {
  const currentSongId = resolveCurrentSongId(queue.songs, queue.currentSongId);
  const songIds = new Set(queue.songs.map((song) => song.id));
  const shuffleOrder = queue.shuffleOrder?.filter((songId) => songIds.has(songId));

  return {
    ...queue,
    currentSongId,
    shuffleOrder,
  };
};

const resolveCurrentSongId = (songs: Song[], preferredSongId?: string): string | undefined => {
  if (preferredSongId && songs.some((song) => song.id === preferredSongId)) {
    return preferredSongId;
  }

  return songs[0]?.id;
};

const resolveCurrentAfterRemoval = (queue: PlaybackQueue, songId: string): string | undefined => {
  const currentIndex = queue.songs.findIndex((song) => song.id === songId);
  if (currentIndex === -1) {
    return queue.currentSongId;
  }

  return queue.songs[currentIndex + 1]?.id ?? queue.songs[currentIndex - 1]?.id;
};

const getCurrentIndex = (queue: PlaybackQueue): number => {
  return queue.songs.findIndex((song) => song.id === queue.currentSongId);
};

const getRelativeSequentialSongId = (queue: PlaybackQueue, offset: 1 | -1): string | undefined => {
  const currentIndex = getCurrentIndex(queue);
  if (currentIndex === -1) {
    return queue.songs[0]?.id;
  }

  const nextIndex = currentIndex + offset;
  if (queue.mode === 'repeat-all') {
    return queue.songs[wrapIndex(nextIndex, queue.songs.length)]?.id;
  }

  return queue.songs[nextIndex]?.id;
};

const getRelativeShuffleSongId = (queue: PlaybackQueue, offset: 1 | -1): string | undefined => {
  const order = buildCompleteShuffleOrder(queue);
  if (!order.length) {
    return undefined;
  }

  const currentIndex = order.findIndex((songId) => songId === queue.currentSongId);
  if (currentIndex === -1) {
    return order[0];
  }

  return order[wrapIndex(currentIndex + offset, order.length)];
};

const buildCompleteShuffleOrder = (queue: PlaybackQueue): string[] => {
  const songIds = queue.songs.map((song) => song.id);
  const known = new Set<string>();
  const ordered = (queue.shuffleOrder ?? []).filter((songId) => {
    if (!songIds.includes(songId) || known.has(songId)) {
      return false;
    }

    known.add(songId);
    return true;
  });

  return [...ordered, ...songIds.filter((songId) => !known.has(songId))];
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

const wrapIndex = (index: number, length: number): number => {
  return ((index % length) + length) % length;
};
