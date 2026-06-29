export interface RequestAdapter {
  fetch(input: string | URL, init?: RequestInit): Promise<Response>;
}

export interface AudioResolver {
  resolve(song: import('./media').Song): Promise<import('./media').ResolvedMediaUrl>;
}

export interface CacheAdapter {
  get(song: import('./media').Song): Promise<string | null>;
  put(song: import('./media').Song, media: import('./media').ResolvedMediaUrl): Promise<string | null>;
}
