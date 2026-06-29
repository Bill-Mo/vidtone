import type { MediaSource } from '../media.js';

export interface ParsedSourceInput {
  source: MediaSource;
  sourceId: string;
  originalInput: string;
  url?: string;
  page?: number;
}

const BILIBILI_BVID_PATTERN = /(BV[a-zA-Z0-9]{10})/;
const YOUTUBE_VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;
const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'youtu.be',
  'www.youtu.be',
]);

export const extractBilibiliBvid = (input: string): string | undefined => {
  return input.match(BILIBILI_BVID_PATTERN)?.[1];
};

export const extractYoutubeVideoId = (input: string): string | undefined => {
  const trimmed = input.trim();
  if (YOUTUBE_VIDEO_ID_PATTERN.test(trimmed)) {
    return trimmed;
  }

  const url = parseUrlLikeInput(trimmed);
  if (!url || !isYoutubeHost(url.hostname)) {
    return undefined;
  }

  if (url.hostname.endsWith('youtu.be')) {
    return normalizeYoutubeVideoId(url.pathname.split('/').filter(Boolean)[0]);
  }

  const queryVideoId = normalizeYoutubeVideoId(url.searchParams.get('v') || '');
  if (queryVideoId) {
    return queryVideoId;
  }

  const [kind, id] = url.pathname.split('/').filter(Boolean);
  if (kind === 'shorts' || kind === 'live' || kind === 'embed') {
    return normalizeYoutubeVideoId(id);
  }

  return undefined;
};

export const parseSourceInput = (input: string): ParsedSourceInput | undefined => {
  const trimmed = input.trim();
  if (!trimmed) {
    return undefined;
  }

  const bvid = extractBilibiliBvid(trimmed);
  if (bvid) {
    return {
      source: 'bilibili',
      sourceId: bvid,
      originalInput: input,
      url: parseUrlLikeInput(trimmed)?.toString(),
      page: extractPositiveIntegerQueryParam(trimmed, 'p'),
    };
  }

  const youtubeVideoId = extractYoutubeVideoId(trimmed);
  if (youtubeVideoId) {
    return {
      source: 'youtube',
      sourceId: youtubeVideoId,
      originalInput: input,
      url: parseUrlLikeInput(trimmed)?.toString(),
    };
  }

  return undefined;
};

const normalizeYoutubeVideoId = (value: string | undefined): string | undefined => {
  if (!value) {
    return undefined;
  }

  const decoded = decodeURIComponent(value);
  return YOUTUBE_VIDEO_ID_PATTERN.test(decoded) ? decoded : undefined;
};

const isYoutubeHost = (hostname: string): boolean => {
  return YOUTUBE_HOSTS.has(hostname.toLowerCase());
};

const parseUrlLikeInput = (input: string): URL | undefined => {
  try {
    return new URL(input);
  } catch {
    try {
      return new URL(`https://${input}`);
    } catch {
      return undefined;
    }
  }
};

const extractPositiveIntegerQueryParam = (input: string, key: string): number | undefined => {
  const url = parseUrlLikeInput(input);
  const value = url?.searchParams.get(key);
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
};
