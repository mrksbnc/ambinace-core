import {
	API_CONFIG_KEY,
	APP_CONFIG_KEY,
	AUTH_CONFIG_KEY,
	ENABLED_HTTP_REQUEST_METHODS,
} from '@/data/constants/ambianceConfig';
import { name, version } from '../../package.json';
import type { TAppConfig, TAmbianceConfig, TApiConfig, TAuthConfig } from './appConfig.d';

let sharedInstance: AmbianceConfig | null = null;

export default class AmbianceConfig implements TAmbianceConfig {
	public readonly auth: TAuthConfig = {
		[AUTH_CONFIG_KEY.JWT_SECRET]: '',
	};
	public readonly app: TAppConfig = {
		[APP_CONFIG_KEY.PORT]: 0,
		[APP_CONFIG_KEY.ENV]: '',
		[APP_CONFIG_KEY.NAME]: '',
		[APP_CONFIG_KEY.VERSION]: '',
	};
	public readonly api: TApiConfig = {
		[API_CONFIG_KEY.BASE_PATH]: '',
		[API_CONFIG_KEY.ENABLED_HTTP_REQUEST_METHODS]: [],
	};

	static get sharedInstance(): AmbianceConfig {
		if (sharedInstance === null) {
			sharedInstance = new AmbianceConfig();
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

		this.api[API_CONFIG_KEY.BASE_PATH] = process.env.BASE_PATH || '/api/v1';
		this.api[API_CONFIG_KEY.ENABLED_HTTP_REQUEST_METHODS] = ENABLED_HTTP_REQUEST_METHODS;

		this.auth[AUTH_CONFIG_KEY.JWT_SECRET] = process.env.JWT_SECRET || '';
	}
}
