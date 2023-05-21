import {
	API_CONFIG_KEY,
	APP_CONFIG_KEY,
	AUTH_CONFIG_KEY,
	CACHE_CONFIG_KEY,
	ENABLED_HTTP_REQUEST_METHODS,
} from '@/data/constants/config';
import { name, version } from '../../package.json';
import type { TAppConfig, TAmbianceConfig, TApiConfig, TAuthConfig } from './appConfig.d';

let sharedInstance: AppConfig | null = null;

export default class AppConfig implements TAppConfig {
	public readonly auth: TAuthConfig = {
		[AUTH_CONFIG_KEY.JWT_SECRET]: '',
		[AUTH_CONFIG_KEY.SALT_ROUNDS]: 10,
		[AUTH_CONFIG_KEY.JWT_EXPIRES_IN]: 86400000,
		[AUTH_CONFIG_KEY.JWT_GRACE_PERIOD]: 10800000,
	};
	public readonly app: TAmbianceConfig = {
		[APP_CONFIG_KEY.PORT]: 0,
		[APP_CONFIG_KEY.ENV]: '',
		[APP_CONFIG_KEY.NAME]: '',
		[APP_CONFIG_KEY.VERSION]: '',
	};
	public readonly api: TApiConfig = {
		[API_CONFIG_KEY.BASE_URL]: '',
		[API_CONFIG_KEY.ENABLED_HTTP_REQUEST_METHODS]: [],
	};
	public readonly cache = {
		[CACHE_CONFIG_KEY.CACHE_TTL]: 0,
		[CACHE_CONFIG_KEY.REDIS_PORT]: 0,
		[CACHE_CONFIG_KEY.REDIS_HOST]: '',
		[CACHE_CONFIG_KEY.CACHE_NAME]: '',
		[CACHE_CONFIG_KEY.REDIS_USERNAME]: '',
		[CACHE_CONFIG_KEY.REDIS_PASSWORD]: '',
	};

	public static get sharedInstance(): AppConfig {
		if (sharedInstance === null) {
			sharedInstance = new AppConfig();
		}
		return sharedInstance;
	}

	constructor() {
		this.loadConfig();
	}

	private loadConfig(): void {
		this.app[APP_CONFIG_KEY.NAME] = name;
		this.app[APP_CONFIG_KEY.VERSION] = version;
		this.app[APP_CONFIG_KEY.PORT] = parseInt(process.env.PORT || '', 10) || 3010;

		this.app[APP_CONFIG_KEY.ENV] = process.env.NODE_ENV || 'development';

		this.api[API_CONFIG_KEY.BASE_URL] = process.env.BASE_URL || '/api/v1';
		this.api[API_CONFIG_KEY.ENABLED_HTTP_REQUEST_METHODS] = ENABLED_HTTP_REQUEST_METHODS;

		this.auth[AUTH_CONFIG_KEY.JWT_SECRET] = process.env.JWT_SECRET || '';
		this.auth[AUTH_CONFIG_KEY.SALT_ROUNDS] = parseInt(process.env.BCRYPT_SALT_ROUNDS || '', 10) || 10;
		this.auth[AUTH_CONFIG_KEY.JWT_EXPIRES_IN] = parseInt(process.env.JWT_EXPIRES_IN || '', 10) || 86400000;
		this.auth[AUTH_CONFIG_KEY.JWT_GRACE_PERIOD] = parseInt(process.env.JWT_GRACE_PERIOD || '', 10) || 10800000;

		this.cache[CACHE_CONFIG_KEY.CACHE_NAME] = process.env.CACHE_NAME || 'ambiance';
		this.cache[CACHE_CONFIG_KEY.REDIS_HOST] = process.env.REDIS_HOST || 'localhost';
		this.cache[CACHE_CONFIG_KEY.CACHE_TTL] = parseInt(process.env.CACHE_TTL || '', 10) || 3600;
		this.cache[CACHE_CONFIG_KEY.REDIS_PORT] = parseInt(process.env.REDIS_PORT || '', 10) || 6379;
		this.cache[CACHE_CONFIG_KEY.REDIS_USERNAME] = process.env.REDIS_USERNAME || '';
		this.cache[CACHE_CONFIG_KEY.REDIS_PASSWORD] = process.env.REDIS_PASSWORD || '';
	}
}
