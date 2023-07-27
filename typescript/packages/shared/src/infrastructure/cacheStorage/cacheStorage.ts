import { CacheItem } from "../../domain/cache/item";

export interface CustomCacheStorage {
  get<T>(key: string): Promise<CacheItem<T> | null>;
  set<T>(key: string, value: CacheItem<T>): Promise<void>;
  remove(key: string): Promise<void>;
}
