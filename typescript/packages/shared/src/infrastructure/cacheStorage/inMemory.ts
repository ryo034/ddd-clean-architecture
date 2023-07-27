import { CacheItem } from "../../domain/cache/item";
import { CustomCacheStorage } from "./cacheStorage";

export class InMemoryCache implements CustomCacheStorage {
  private cache: Map<string, CacheItem<any>> = new Map();

  async get<T>(key: string): Promise<CacheItem<T> | null> {
    return this.cache.get(key) || null;
  }

  async set<T>(key: string, value: CacheItem<T>): Promise<void> {
    this.cache.set(key, value);
  }

  async remove(key: string): Promise<void> {
    this.cache.delete(key);
  }
}