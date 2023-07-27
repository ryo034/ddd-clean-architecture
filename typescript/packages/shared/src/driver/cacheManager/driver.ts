import { CustomCacheStorage } from "../../infrastructure/cacheStorage"

export interface GetOptions {
  cacheTime?: number;
  retryCount?: number;
  retryDelay?: number;
}

/**
 * ApiCacheManagerDriver is used to cache API responses.
 *
 * @description
 * Class such as Domain cannot be stored in the cache.
 */
export class ApiCacheManagerDriver {
  constructor(
    private readonly client: CustomCacheStorage,
    private defaultCacheTime: number = 5 * 60 * 1000, // 5m
    private defaultRetryCount = 3,
    private defaultRetryDelay = 1000
  ) { }

  async getOrSet<T>(key: string, fetchData: () => Promise<T>, options: GetOptions): Promise<T> {
    const { cacheTime, retryCount, retryDelay } = options
    const rd = retryDelay || this.defaultRetryDelay;
    const rc = retryCount || this.defaultRetryCount;
    if (rc < 1) {
      throw new Error('Retry count must be at least 1');
    }

    const now = Date.now()
    const item = await this.client.get<T>(key);
    if (item && item.expiry > now) {
      return item.data;
    }

    let retries = 0;

    const newCacheTime = cacheTime || this.defaultCacheTime;

    while (retries < rc) {
      try {
        const v = await fetchData();
        if (v) {
          await this.client.set(key, { expiry: newCacheTime, data: v });
          return v;
        }
      } catch (err) {
        retries++;
        if (retries >= rc) {
          throw err;
        }
        await new Promise((resolve) => setTimeout(resolve, rd));
      }
    }
    throw new Error('Failed to get value after retries');
  }

  async clearCache(key: string): Promise<void> {
    return this.client.remove(key);
  }

  /**
   * getAndUpdate is used to get the value from the cache and update it.
   *
   * @description
   * This method is useful when you want to update the cache after getting the value.
   */
  async getAndUpdate<T>(key: string, fetchData: () => Promise<T>, options: GetOptions): Promise<T> {
    const result = await this.getOrSet(key, fetchData, options);
    this.clearCache(key);
    return result;
  }
}
