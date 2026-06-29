import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  extractBilibiliBvid,
  extractYoutubeVideoId,
  parseSourceInput,
} from '../dist/sources/input.js';

describe('source input parsing', () => {
  it('extracts Bilibili BV ids from ids and URLs', () => {
    assert.equal(extractBilibiliBvid('BV1wr4y1v7TA'), 'BV1wr4y1v7TA');
    assert.equal(
      extractBilibiliBvid('https://www.bilibili.com/video/BV1wr4y1v7TA/?p=2'),
      'BV1wr4y1v7TA',
    );
  });

  it('extracts YouTube video ids from common URL forms', () => {
    assert.equal(extractYoutubeVideoId('dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
    assert.equal(extractYoutubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
    assert.equal(extractYoutubeVideoId('https://youtu.be/dQw4w9WgXcQ?t=42'), 'dQw4w9WgXcQ');
    assert.equal(extractYoutubeVideoId('https://www.youtube.com/shorts/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
    assert.equal(extractYoutubeVideoId('https://www.youtube.com/live/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
  });

  it('parses Bilibili input with page metadata', () => {
    assert.deepEqual(parseSourceInput('https://www.bilibili.com/video/BV1wr4y1v7TA/?p=2'), {
      source: 'bilibili',
      sourceId: 'BV1wr4y1v7TA',
      originalInput: 'https://www.bilibili.com/video/BV1wr4y1v7TA/?p=2',
      url: 'https://www.bilibili.com/video/BV1wr4y1v7TA/?p=2',
      page: 2,
    });
  });

  it('parses YouTube input', () => {
    assert.deepEqual(parseSourceInput('https://music.youtube.com/watch?v=dQw4w9WgXcQ'), {
      source: 'youtube',
      sourceId: 'dQw4w9WgXcQ',
      originalInput: 'https://music.youtube.com/watch?v=dQw4w9WgXcQ',
      url: 'https://music.youtube.com/watch?v=dQw4w9WgXcQ',
    });
  });

  it('returns undefined for unsupported inputs', () => {
    assert.equal(parseSourceInput('https://example.com/video/BVnotvalid'), undefined);
    assert.equal(parseSourceInput(''), undefined);
  });
});
