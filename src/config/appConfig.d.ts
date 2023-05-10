import type { APP_CONFIG_KEY, API_CONFIG_KEY, AUTH_CONFIG_KEY } from '../data/constants/ambianceConfig';
/**
 * Interface for the AmbianceConfig class.
 */
export type TAppConfig = {
	/**
	 * Config map for authentication related values.
	 */
	readonly auth: Map<AUTH_CONFIG_KEY, string>;
	/**
	 * Config map for application related values.
	 */
	readonly app: Map<APP_CONFIG_KEY, string | number>;
	/**
	 * Config map for API related values.
	 */
	readonly api: Map<API_CONFIG_KEY, string | string[]>;
};
