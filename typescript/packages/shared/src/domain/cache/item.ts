export interface CacheItem<T> {
  expiry: number;
  data: T;
}
