import type { TRequestMethod } from '@/api';
import type { APP_CONFIG_KEY, API_CONFIG_KEY, AUTH_CONFIG_KEY } from '../data/constants/config';
/**
 * Interface for the AppConfig class.
 */
export type TAppConfig = {
	readonly api: TApiConfig;
	readonly auth: TAuthConfig;
	readonly app: TAmbianceConfig;
};
/**
 * Definition for app config keys.
 */
export type TAmbianceConfig = {
	[APP_CONFIG_KEY.ENV]: string;
	[APP_CONFIG_KEY.PORT]: number;
	[APP_CONFIG_KEY.NAME]: string;
	[APP_CONFIG_KEY.VERSION]: string;
};
/**
 * Definition for auth config keys.
 */
export type TAuthConfig = {
	[AUTH_CONFIG_KEY.JWT_SECRET]: string;
	[AUTH_CONFIG_KEY.SALT_ROUNDS]: number;
	[AUTH_CONFIG_KEY.JWT_EXPIRES_IN]: number;
	[AUTH_CONFIG_KEY.JWT_GRACE_PERIOD]: number;
};
/**
 * Definition for api config keys.
 */
export type TApiConfig = {
	[API_CONFIG_KEY.BASE_URL]: string;
	[API_CONFIG_KEY.ENABLED_HTTP_REQUEST_METHODS]: TRequestMethod[];
};
