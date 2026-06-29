import type { Playlist, Song } from '../media.js';

export interface YoutubeVideoMetadata {
  videoId: string;
  title: string;
  channelName?: string;
  coverUrl?: string;
  durationSeconds?: number;
  sourceUrl?: string;
}

export interface YoutubePlaylistMetadata {
  id: string;
  title: string;
  videos: YoutubeVideoMetadata[];
  sourceUrl?: string;
  updatedAt?: number;
}

export const createYoutubeSongId = (videoId: string): string => {
  return `youtube:${videoId}`;
};

export const createYoutubeSourceUrl = (videoId: string): string => {
  return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
};

export const songFromYoutubeVideo = (metadata: YoutubeVideoMetadata): Song => {
  return {
    id: createYoutubeSongId(metadata.videoId),
    source: 'youtube',
    sourceId: metadata.videoId,
    sourceUrl: metadata.sourceUrl ?? createYoutubeSourceUrl(metadata.videoId),
    title: metadata.title,
    artist: metadata.channelName,
    coverUrl: metadata.coverUrl,
    durationSeconds: metadata.durationSeconds,
  };
};

export const playlistFromYoutubeVideos = ({
  id,
  title,
  videos,
  sourceUrl,
  updatedAt = Date.now(),
}: YoutubePlaylistMetadata): Playlist => {
  return {
    id,
    title,
    songs: videos.map(songFromYoutubeVideo),
    sourceUrl,
    updatedAt,
  };
};
