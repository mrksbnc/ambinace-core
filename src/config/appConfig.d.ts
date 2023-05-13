import type { TRequestMethod } from '@/api';
import type { APP_CONFIG_KEY, API_CONFIG_KEY, AUTH_CONFIG_KEY } from '../data/constants/ambianceConfig';
/**
 * Interface for the AmbianceConfig class.
 */
export type TAmbianceConfig = {
	readonly api: TApiConfig;
	readonly app: TAppConfig;
	readonly auth: TAuthConfig;
};
/**
 * Definition for app config keys.
 */
export type TAppConfig = {
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
};
/**
 * Definition for api config keys.
 */
export type TApiConfig = {
	[API_CONFIG_KEY.BASE_PATH]: string;
	[API_CONFIG_KEY.ENABLED_HTTP_REQUEST_METHODS]: TRequestMethod[];
};
