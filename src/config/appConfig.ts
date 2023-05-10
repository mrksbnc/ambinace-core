import {
	API_CONFIG_KEY,
	APP_CONFIG_KEY,
	AUTH_CONFIG_KEY,
	ENABLED_HTTP_REQUEST_METHODS,
} from '@/data/constants/ambianceConfig';
import type { TAppConfig } from './appConfig.d';
import { name, version } from '../../package.json';

let sharedInstance: AmbianceConfig | null = null;

export default class AmbianceConfig implements TAppConfig {
	public readonly auth: Map<AUTH_CONFIG_KEY, string> = new Map<AUTH_CONFIG_KEY, string>();
	public readonly app: Map<APP_CONFIG_KEY, string | number> = new Map<APP_CONFIG_KEY, string | number>();
	public readonly api: Map<API_CONFIG_KEY, string | string[]> = new Map<API_CONFIG_KEY, string | string[]>();

	static get sharedInstance(): AmbianceConfig {
		if (sharedInstance === null) {
			sharedInstance = new AmbianceConfig();
		}
		return sharedInstance;
	}

	constructor() {
		this.setAppConfig();
		this.setApiConfig();
		this.setAuthConfig();
	}

	private setAppConfig(): void {
		this.app.set(APP_CONFIG_KEY.NAME, name);
		this.app.set(APP_CONFIG_KEY.VERSION, version);
		this.app.set(APP_CONFIG_KEY.PORT, process.env.PORT || 3010);
		this.app.set(APP_CONFIG_KEY.ENV, process.env.NODE_ENV || 'development');
	}

	private setApiConfig(): void {
		this.api.set(API_CONFIG_KEY.ENABLED_HTTP_REQUEST_METHODS, ENABLED_HTTP_REQUEST_METHODS);
	}

	private setAuthConfig(): void {
		this.auth.set(AUTH_CONFIG_KEY.JWT_SECRET, process.env.JWT_SECRET || '');
	}
}
