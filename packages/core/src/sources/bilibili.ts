import type { Playlist, Song } from '../media.js';

export interface BilibiliVideoPageMetadata {
  cid: string;
  title: string;
  page?: number;
  durationSeconds?: number;
}

export interface BilibiliVideoMetadata {
  bvid: string;
  title: string;
  ownerName?: string;
  coverUrl?: string;
  sourceUrl?: string;
  pages: BilibiliVideoPageMetadata[];
}

export interface BilibiliPlaylistOptions {
  id?: string;
  updatedAt?: number;
}

export const createBilibiliSongId = (bvid: string, cid: string): string => {
  return `bilibili:${bvid}:${cid}`;
};

export const createBilibiliSourceUrl = (bvid: string, page?: number): string => {
  const url = new URL(`https://www.bilibili.com/video/${bvid}`);
  if (page && page > 1) {
    url.searchParams.set('p', String(page));
  }

  return url.toString();
};

export const songsFromBilibiliVideo = (metadata: BilibiliVideoMetadata): Song[] => {
  const multiPage = metadata.pages.length > 1;

  return metadata.pages.map((page, index) => {
    const pageNumber = page.page ?? index + 1;

    return {
      id: createBilibiliSongId(metadata.bvid, page.cid),
      source: 'bilibili',
      sourceId: metadata.bvid,
      sourcePartId: page.cid,
      sourceUrl: metadata.sourceUrl ?? createBilibiliSourceUrl(metadata.bvid, pageNumber),
      title: multiPage ? page.title : metadata.title,
      artist: metadata.ownerName,
      album: multiPage ? metadata.title : undefined,
      coverUrl: metadata.coverUrl,
      durationSeconds: page.durationSeconds,
      page: pageNumber,
    };
  });
};

export const playlistFromBilibiliVideo = (
  metadata: BilibiliVideoMetadata,
  { id = `bilibili:${metadata.bvid}`, updatedAt = Date.now() }: BilibiliPlaylistOptions = {},
): Playlist => {
  return {
    id,
    title: metadata.title,
    songs: songsFromBilibiliVideo(metadata),
    sourceUrl: metadata.sourceUrl ?? createBilibiliSourceUrl(metadata.bvid),
    updatedAt,
  };
};
