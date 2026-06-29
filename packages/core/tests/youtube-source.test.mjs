import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  createYoutubeSongId,
  createYoutubeSourceUrl,
  playlistFromYoutubeVideos,
  songFromYoutubeVideo,
} from '../dist/index.js';

describe('YouTube source metadata mapping', () => {
  it('creates stable song ids and source URLs', () => {
    assert.equal(createYoutubeSongId('dQw4w9WgXcQ'), 'youtube:dQw4w9WgXcQ');
    assert.equal(createYoutubeSourceUrl('dQw4w9WgXcQ'), 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  });

  it('maps a YouTube video to a song', () => {
    assert.deepEqual(
      songFromYoutubeVideo({
        videoId: 'dQw4w9WgXcQ',
        title: 'Video Title',
        channelName: 'Channel',
        coverUrl: 'https://example.com/cover.jpg',
        durationSeconds: 212,
      }),
      {
        id: 'youtube:dQw4w9WgXcQ',
        source: 'youtube',
        sourceId: 'dQw4w9WgXcQ',
        sourceUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Video Title',
        artist: 'Channel',
        coverUrl: 'https://example.com/cover.jpg',
        durationSeconds: 212,
      },
    );
  });

  it('uses provided source URLs when present', () => {
    const song = songFromYoutubeVideo({
      videoId: 'dQw4w9WgXcQ',
      title: 'Video Title',
      sourceUrl: 'https://music.youtube.com/watch?v=dQw4w9WgXcQ',
    });

    assert.equal(song.sourceUrl, 'https://music.youtube.com/watch?v=dQw4w9WgXcQ');
  });

  it('creates playlists from YouTube video metadata', () => {
    const playlist = playlistFromYoutubeVideos({
      id: 'youtube:list',
      title: 'YouTube List',
      sourceUrl: 'https://www.youtube.com/playlist?list=abc',
      updatedAt: 123,
      videos: [
        { videoId: 'dQw4w9WgXcQ', title: 'Video A' },
        { videoId: '9bZkp7q19f0', title: 'Video B' },
      ],
    });

    assert.equal(playlist.id, 'youtube:list');
    assert.equal(playlist.title, 'YouTube List');
    assert.equal(playlist.sourceUrl, 'https://www.youtube.com/playlist?list=abc');
    assert.equal(playlist.updatedAt, 123);
    assert.deepEqual(
      playlist.songs.map((song) => [song.id, song.title]),
      [
        ['youtube:dQw4w9WgXcQ', 'Video A'],
        ['youtube:9bZkp7q19f0', 'Video B'],
      ],
    );
  });
});
