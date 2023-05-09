import type { API_CONFIG_KEY, APP_CONFIG_KEY } from '../data/constants/appConfig';

export type TAppConfig = {
	readonly app: Map<APP_CONFIG_KEY, string | number>;
	readonly api: Map<API_CONFIG_KEY, string | string[]>;
};
