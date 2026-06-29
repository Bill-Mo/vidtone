import type { Playlist, Song } from '../media.js';

export interface CreatePlaylistOptions {
  id: string;
  title: string;
  songs?: Song[];
  sourceUrl?: string;
  updatedAt?: number;
}

export interface AddSongsOptions {
  position?: number;
  allowDuplicates?: boolean;
  updatedAt?: number;
}

export const createPlaylist = ({
  id,
  title,
  songs = [],
  sourceUrl,
  updatedAt = Date.now(),
}: CreatePlaylistOptions): Playlist => {
  return {
    id,
    title,
    songs: uniqueSongsById(songs),
    sourceUrl,
    updatedAt,
  };
};

export const renamePlaylist = (playlist: Playlist, title: string, updatedAt = Date.now()): Playlist => {
  return {
    ...playlist,
    title,
    updatedAt,
  };
};

export const setPlaylistSongs = (playlist: Playlist, songs: Song[], updatedAt = Date.now()): Playlist => {
  return {
    ...playlist,
    songs: uniqueSongsById(songs),
    updatedAt,
  };
};

export const addSongsToPlaylist = (
  playlist: Playlist,
  songs: Song[],
  { position, allowDuplicates = false, updatedAt = Date.now() }: AddSongsOptions = {},
): Playlist => {
  const insertIndex = clamp(position ?? playlist.songs.length, 0, playlist.songs.length);
  const nextSongs = [...playlist.songs];
  nextSongs.splice(insertIndex, 0, ...songs);

  return {
    ...playlist,
    songs: allowDuplicates ? nextSongs : uniqueSongsById(nextSongs),
    updatedAt,
  };
};

export const removeSongFromPlaylist = (playlist: Playlist, songId: string, updatedAt = Date.now()): Playlist => {
  return {
    ...playlist,
    songs: playlist.songs.filter((song) => song.id !== songId),
    updatedAt,
  };
};

export const movePlaylistSong = (
  playlist: Playlist,
  songId: string,
  targetIndex: number,
  updatedAt = Date.now(),
): Playlist => {
  const sourceIndex = playlist.songs.findIndex((song) => song.id === songId);
  if (sourceIndex === -1) {
    return playlist;
  }

  const nextSongs = [...playlist.songs];
  const [song] = nextSongs.splice(sourceIndex, 1);
  nextSongs.splice(clamp(targetIndex, 0, nextSongs.length), 0, song);

  return {
    ...playlist,
    songs: nextSongs,
    updatedAt,
  };
};

export const replacePlaylistSong = (
  playlist: Playlist,
  songId: string,
  replacement: Song,
  updatedAt = Date.now(),
): Playlist => {
  const index = playlist.songs.findIndex((song) => song.id === songId);
  if (index === -1) {
    return playlist;
  }

  const nextSongs = [...playlist.songs];
  nextSongs[index] = replacement;

  return {
    ...playlist,
    songs: uniqueSongsById(nextSongs),
    updatedAt,
  };
};

export const findPlaylistSong = (playlist: Playlist, songId: string): Song | undefined => {
  return playlist.songs.find((song) => song.id === songId);
};

export const getPlaylistSongIds = (playlist: Playlist): string[] => {
  return playlist.songs.map((song) => song.id);
};

const uniqueSongsById = (songs: Song[]): Song[] => {
  const seen = new Set<string>();
  const result: Song[] = [];

  for (const song of songs) {
    if (seen.has(song.id)) {
      continue;
    }

    seen.add(song.id);
    result.push(song);
  }

  return result;
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
