import Log from '@/utils/logger';
import { createClient } from 'redis';
import AppConfig from '@/config/appConfig';
import type { TCacheService } from './cacheService.d';
import type { CACHE_KEY } from '@/data/constants/cache';
import { CACHE_CONFIG_KEY } from '@/data/constants/config';

let sharedInstance: CacheService | null = null;

export default class CacheService implements TCacheService {
	private readonly _redis_client: ReturnType<typeof createClient>;

	public static get sharedInstance(): CacheService {
		if (sharedInstance === null) {
			sharedInstance = new CacheService();
		}

		return sharedInstance;
	}

	constructor() {
		this._redis_client = createClient({
			name: AppConfig.sharedInstance.cache[CACHE_CONFIG_KEY.CACHE_NAME],
			password: AppConfig.sharedInstance.cache[CACHE_CONFIG_KEY.REDIS_PASSWORD],
			username: AppConfig.sharedInstance.cache[CACHE_CONFIG_KEY.REDIS_USERNAME],
		});
	}

	public async init(): Promise<void> {
		await this._redis_client.connect();
	}

	public async disconnect(): Promise<void> {
		await this._redis_client.disconnect();
		Log.sharedInstance.createInfoMessageBlock(['redis connection closed']);
	}

	public async exists(key: string): Promise<boolean> {
		return (await this._redis_client.exists(key)) === 1;
	}

	public async get<T>(key: string): Promise<T | null> {
		const start = performance.now();
		const value: string | null = await this._redis_client.get(key);
		const end = performance.now();

		Log.sharedInstance.baseLogger.info(`CACHE get for key: ${key} took ${(end - start).toPrecision(5)}ms`);

		return value ? (JSON.parse(value) as T) : null;
	}

	public async set<T>(key: string, value: T): Promise<void> {
		const valueString: string = typeof value === 'string' ? value : JSON.stringify(value);

		await this._redis_client.set(key, valueString, {
			EX: AppConfig.sharedInstance.cache[CACHE_CONFIG_KEY.CACHE_TTL],
		});
		Log.sharedInstance.baseLogger.info(`CACHE new cache entry created for key: ${key}`);
	}

	public async setSafe<T>(key: string, value: T): Promise<void> {
		const exists: boolean = await this.exists(key);

		if (exists) await this.del(key);

		await this.set<T>(key, value);
	}

	public async del(key: string): Promise<void> {
		await this._redis_client.del(key);
	}

	public async flush(): Promise<void> {
		await this._redis_client.flushAll();
	}

	public generateKey(baseKey: CACHE_KEY, uniqueSegment: string): string {
		return baseKey.replace('${}', uniqueSegment);
	}
}
