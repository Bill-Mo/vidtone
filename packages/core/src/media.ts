export type MediaSource = 'bilibili' | 'youtube';

export interface Song {
  id: string;
  source: MediaSource;
  sourceId: string;
  title: string;
  artist?: string;
  album?: string;
  coverUrl?: string;
  durationSeconds?: number;
  page?: number;
}

export interface Playlist {
  id: string;
  title: string;
  songs: Song[];
  sourceUrl?: string;
  updatedAt: number;
}

export interface ResolvedMediaUrl {
  url: string;
  headers?: Record<string, string>;
  expiresAt?: number;
}
