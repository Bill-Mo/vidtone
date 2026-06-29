import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  addSongsToPlaylist,
  createPlaylist,
  findPlaylistSong,
  getPlaylistSongIds,
  movePlaylistSong,
  removeSongFromPlaylist,
  renamePlaylist,
  replacePlaylistSong,
  setPlaylistSongs,
} from '../dist/index.js';

const song = (id, title = id) => ({
  id,
  source: 'bilibili',
  sourceId: id,
  title,
});

describe('playlist operations', () => {
  it('creates playlists and deduplicates songs by default', () => {
    const playlist = createPlaylist({
      id: 'p1',
      title: 'Favorites',
      songs: [song('a'), song('a'), song('b')],
      updatedAt: 100,
    });

    assert.equal(playlist.id, 'p1');
    assert.equal(playlist.title, 'Favorites');
    assert.equal(playlist.updatedAt, 100);
    assert.deepEqual(getPlaylistSongIds(playlist), ['a', 'b']);
  });

  it('renames playlists', () => {
    const playlist = createPlaylist({ id: 'p1', title: 'Old', updatedAt: 100 });
    const renamed = renamePlaylist(playlist, 'New', 200);

    assert.equal(renamed.title, 'New');
    assert.equal(renamed.updatedAt, 200);
  });

  it('sets playlist songs and removes duplicates', () => {
    const playlist = createPlaylist({ id: 'p1', title: 'List', songs: [song('a')], updatedAt: 100 });
    const updated = setPlaylistSongs(playlist, [song('b'), song('b'), song('c')], 200);

    assert.deepEqual(getPlaylistSongIds(updated), ['b', 'c']);
    assert.equal(updated.updatedAt, 200);
  });

  it('adds songs at a position', () => {
    const playlist = createPlaylist({ id: 'p1', title: 'List', songs: [song('a'), song('d')] });
    const updated = addSongsToPlaylist(playlist, [song('b'), song('c')], { position: 1, updatedAt: 200 });

    assert.deepEqual(getPlaylistSongIds(updated), ['a', 'b', 'c', 'd']);
    assert.equal(updated.updatedAt, 200);
  });

  it('can allow duplicate songs when explicitly requested', () => {
    const playlist = createPlaylist({ id: 'p1', title: 'List', songs: [song('a')] });
    const updated = addSongsToPlaylist(playlist, [song('a')], { allowDuplicates: true });

    assert.deepEqual(getPlaylistSongIds(updated), ['a', 'a']);
  });

  it('removes, moves, and finds songs', () => {
    const playlist = createPlaylist({ id: 'p1', title: 'List', songs: [song('a'), song('b'), song('c')] });
    const moved = movePlaylistSong(playlist, 'c', 0, 200);
    const removed = removeSongFromPlaylist(moved, 'b', 300);

    assert.deepEqual(getPlaylistSongIds(moved), ['c', 'a', 'b']);
    assert.deepEqual(getPlaylistSongIds(removed), ['c', 'a']);
    assert.equal(findPlaylistSong(removed, 'c')?.id, 'c');
    assert.equal(removed.updatedAt, 300);
  });

  it('replaces songs and keeps ids unique', () => {
    const playlist = createPlaylist({ id: 'p1', title: 'List', songs: [song('a'), song('b')] });
    const replaced = replacePlaylistSong(playlist, 'a', song('b', 'Updated B'), 200);

    assert.deepEqual(getPlaylistSongIds(replaced), ['b']);
    assert.equal(replaced.songs[0]?.title, 'Updated B');
  });

  it('returns the original playlist when moving or replacing a missing song', () => {
    const playlist = createPlaylist({ id: 'p1', title: 'List', songs: [song('a')] });

    assert.equal(movePlaylistSong(playlist, 'missing', 0), playlist);
    assert.equal(replacePlaylistSong(playlist, 'missing', song('b')), playlist);
  });
});
