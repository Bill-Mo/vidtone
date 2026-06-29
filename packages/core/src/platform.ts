export interface RequestAdapter {
  fetch(input: string | URL, init?: RequestInit): Promise<Response>;
}

export interface AudioResolver {
  resolve(song: import('./media.js').Song): Promise<import('./media.js').ResolvedMediaUrl>;
}

export interface CacheAdapter {
  get(song: import('./media.js').Song): Promise<string | null>;
  put(song: import('./media.js').Song, media: import('./media.js').ResolvedMediaUrl): Promise<string | null>;
}
