import type { CACHE_KEY } from '@/data/constants/cache';

/**
 * Interface declaration for the cache service
 */
export declare interface TCacheService {
	/**
	 * Initializes the cache service and connects to the redis server
	 */
	init(): Promise<void>;
	/**
	 * Disconnects from the cache server
	 */
	disconnect(): Promise<void>;
	/**
	 * Checks if value exists in cache
	 */
	exists(key: string): Promise<boolean>;
	/**
	 * Stores a value in cache.
	 *
	 * Note: the value is serialized using JSON.stringify
	 */
	set<T>(key: string, value: T): Promise<void>;
	/**
	 * Stores a value in cache or updates the value if it already exists.
	 */
	setSafe<T>(key: string, value: T): Promise<void>;
	/**
	 * Returns a key or null if the key does not exists in
	 * cache.
	 *
	 * Note: the value is parsed and returned as T
	 */
	get<T>(key: string): Promise<T | null>;
	/**
	 * Deletes an entry if exsists from the cache
	 */
	del(key: string): Promise<void>;
	/**
	 * Flushes the cache
	 */
	flush(): Promise<void>;
	/**
	 * Generates a new key for the cache entry
	 */
	generateKey(baseKey: CACHE_KEY, uniqueSegment: string);
}
