import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  advanceQueue,
  appendSongs,
  createQueue,
  getCurrentSong,
  getNextSongId,
  getPreviousSongId,
  insertSongsAfterCurrent,
  moveSong,
  removeSong,
  rewindQueue,
  setPlaybackMode,
} from '../dist/index.js';

const song = (id, title = id) => ({
  id,
  source: 'bilibili',
  sourceId: id,
  title,
});

describe('playback queue', () => {
  it('creates a queue with the first song current by default', () => {
    const queue = createQueue([song('a'), song('b')]);

    assert.equal(queue.currentSongId, 'a');
    assert.equal(getCurrentSong(queue)?.id, 'a');
  });

  it('advances and rewinds sequential queues without wrapping', () => {
    let queue = createQueue([song('a'), song('b'), song('c')], { currentSongId: 'b' });

    assert.equal(getNextSongId(queue), 'c');
    assert.equal(getPreviousSongId(queue), 'a');

    queue = advanceQueue(queue);
    assert.equal(queue.currentSongId, 'c');
    assert.equal(getNextSongId(queue), undefined);

    queue = rewindQueue(queue);
    assert.equal(queue.currentSongId, 'b');
  });

  it('wraps repeat-all queues', () => {
    const queue = createQueue([song('a'), song('b')], {
      currentSongId: 'b',
      mode: 'repeat-all',
    });

    assert.equal(getNextSongId(queue), 'a');
    assert.equal(getPreviousSongId(createQueue(queue.songs, { currentSongId: 'a', mode: 'repeat-all' })), 'b');
  });

  it('keeps repeat-one on the current song', () => {
    const queue = createQueue([song('a'), song('b')], {
      currentSongId: 'b',
      mode: 'repeat-one',
    });

    assert.equal(getNextSongId(queue), 'b');
    assert.equal(getPreviousSongId(queue), 'b');
  });

  it('uses explicit shuffle order and wraps', () => {
    const queue = createQueue([song('a'), song('b'), song('c')], {
      currentSongId: 'b',
      mode: 'shuffle',
      shuffleOrder: ['b', 'a', 'c'],
    });

    assert.equal(getNextSongId(queue), 'a');
    assert.equal(getPreviousSongId(queue), 'c');
  });

  it('appends and inserts songs without changing current song', () => {
    const queue = createQueue([song('a'), song('c')], { currentSongId: 'a' });
    const appended = appendSongs(queue, [song('d')]);
    const inserted = insertSongsAfterCurrent(appended, [song('b')]);

    assert.deepEqual(
      inserted.songs.map((item) => item.id),
      ['a', 'b', 'c', 'd'],
    );
    assert.equal(inserted.currentSongId, 'a');
  });

  it('moves and removes songs', () => {
    const queue = createQueue([song('a'), song('b'), song('c')], { currentSongId: 'b' });
    const moved = moveSong(queue, 'c', 0);
    const removed = removeSong(moved, 'b');

    assert.deepEqual(
      moved.songs.map((item) => item.id),
      ['c', 'a', 'b'],
    );
    assert.deepEqual(
      removed.songs.map((item) => item.id),
      ['c', 'a'],
    );
    assert.equal(removed.currentSongId, 'a');
  });

  it('normalizes shuffle order when mode changes', () => {
    const queue = setPlaybackMode(createQueue([song('a'), song('b')]), 'shuffle', ['x', 'b', 'a']);

    assert.deepEqual(queue.shuffleOrder, ['b', 'a']);
  });
});
