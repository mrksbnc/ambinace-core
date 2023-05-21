import type { TRequestMethod } from '@/api';
import type { APP_CONFIG_KEY, API_CONFIG_KEY, AUTH_CONFIG_KEY, CACHE_CONFIG_KEY } from '../data/constants/config';
/**
 * Interface for the AppConfig class.
 */
export declare type TAppConfig = {
	readonly api: TApiConfig;
	readonly auth: TAuthConfig;
	readonly cache: TCacheConfig;
	readonly app: TAmbianceConfig;
};
/**
 * Definition for app config keys.
 */
export declare type TAmbianceConfig = {
	[APP_CONFIG_KEY.ENV]: string;
	[APP_CONFIG_KEY.PORT]: number;
	[APP_CONFIG_KEY.NAME]: string;
	[APP_CONFIG_KEY.VERSION]: string;
};
/**
 * Definition for auth config keys.
 */
export declare type TAuthConfig = {
	[AUTH_CONFIG_KEY.JWT_SECRET]: string;
	[AUTH_CONFIG_KEY.SALT_ROUNDS]: number;
	[AUTH_CONFIG_KEY.JWT_EXPIRES_IN]: number;
	[AUTH_CONFIG_KEY.JWT_GRACE_PERIOD]: number;
};
/**
 * Definition for api config keys.
 */
export declare type TApiConfig = {
	[API_CONFIG_KEY.BASE_URL]: string;
	[API_CONFIG_KEY.ENABLED_HTTP_REQUEST_METHODS]: TRequestMethod[];
};
/**
 * Definition for cache config keys.
 */
export declare type TCacheConfig = {
	[CACHE_CONFIG_KEY.CACHE_TTL]: number;
	[CACHE_CONFIG_KEY.REDIS_HOST]: string;
	[CACHE_CONFIG_KEY.REDIS_PORT]: number;
	[CACHE_CONFIG_KEY.CACHE_NAME]: string;
	[CACHE_CONFIG_KEY.REDIS_USERNAME]: string;
	[CACHE_CONFIG_KEY.REDIS_PASSWORD]: string;
};
