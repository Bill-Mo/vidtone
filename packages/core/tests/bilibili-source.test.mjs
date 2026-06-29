import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  createBilibiliSongId,
  createBilibiliSourceUrl,
  playlistFromBilibiliVideo,
  songsFromBilibiliVideo,
} from '../dist/index.js';

describe('Bilibili source metadata mapping', () => {
  it('creates stable song ids and source URLs', () => {
    assert.equal(createBilibiliSongId('BV1wr4y1v7TA', '123'), 'bilibili:BV1wr4y1v7TA:123');
    assert.equal(createBilibiliSourceUrl('BV1wr4y1v7TA'), 'https://www.bilibili.com/video/BV1wr4y1v7TA');
    assert.equal(createBilibiliSourceUrl('BV1wr4y1v7TA', 2), 'https://www.bilibili.com/video/BV1wr4y1v7TA?p=2');
  });

  it('maps a single-page Bilibili video to one song', () => {
    const [mapped] = songsFromBilibiliVideo({
      bvid: 'BV1wr4y1v7TA',
      title: 'Video Title',
      ownerName: 'Uploader',
      coverUrl: 'https://example.com/cover.jpg',
      pages: [{ cid: '100', title: 'Part 1', durationSeconds: 180 }],
    });

    assert.deepEqual(mapped, {
      id: 'bilibili:BV1wr4y1v7TA:100',
      source: 'bilibili',
      sourceId: 'BV1wr4y1v7TA',
      sourcePartId: '100',
      sourceUrl: 'https://www.bilibili.com/video/BV1wr4y1v7TA',
      title: 'Video Title',
      artist: 'Uploader',
      album: undefined,
      coverUrl: 'https://example.com/cover.jpg',
      durationSeconds: 180,
      page: 1,
    });
  });

  it('maps multi-page Bilibili videos to one song per page', () => {
    const mapped = songsFromBilibiliVideo({
      bvid: 'BV1wr4y1v7TA',
      title: 'Compilation',
      ownerName: 'Uploader',
      pages: [
        { cid: '100', title: 'Song A', page: 1 },
        { cid: '200', title: 'Song B', page: 2 },
      ],
    });

    assert.equal(mapped.length, 2);
    assert.deepEqual(
      mapped.map((song) => [song.id, song.title, song.album, song.page, song.sourcePartId]),
      [
        ['bilibili:BV1wr4y1v7TA:100', 'Song A', 'Compilation', 1, '100'],
        ['bilibili:BV1wr4y1v7TA:200', 'Song B', 'Compilation', 2, '200'],
      ],
    );
  });

  it('creates a playlist from Bilibili video metadata', () => {
    const playlist = playlistFromBilibiliVideo(
      {
        bvid: 'BV1wr4y1v7TA',
        title: 'Compilation',
        sourceUrl: 'https://www.bilibili.com/video/BV1wr4y1v7TA',
        pages: [{ cid: '100', title: 'Song A' }],
      },
      { updatedAt: 123 },
    );

    assert.equal(playlist.id, 'bilibili:BV1wr4y1v7TA');
    assert.equal(playlist.title, 'Compilation');
    assert.equal(playlist.sourceUrl, 'https://www.bilibili.com/video/BV1wr4y1v7TA');
    assert.equal(playlist.updatedAt, 123);
    assert.equal(playlist.songs.length, 1);
  });
});
