import { CacheItem } from "../../domain/cache/item";
import { CustomCacheStorage } from "./cacheStorage";

export class LocalStorageCache implements CustomCacheStorage {
  constructor(private readonly client: Storage) { }

  async get<T>(key: string): Promise<CacheItem<T> | null> {
    const item = this.client.get(key);
    return item ? JSON.parse(item) : null;
  }

  async set<T>(key: string, value: CacheItem<T>): Promise<void> {
    this.client.setItem(key, JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    this.client.removeItem(key);
  }
}