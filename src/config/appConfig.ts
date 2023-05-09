import { name, version } from '../../package.json';
import { API_CONFIG_KEY, APP_CONFIG_KEY, ENABLED_HTTP_REQUEST_METHODS } from '@/data/constants/appConfig';

let sharedInstance: AmbianceConfig | null = null;

export default class AmbianceConfig {
	public readonly app: Map<APP_CONFIG_KEY, string | number> = new Map<APP_CONFIG_KEY, string | number>();
	public readonly api: Map<API_CONFIG_KEY, string | string[]> = new Map<API_CONFIG_KEY, string | string[]>();

	static get sharedInstance(): AmbianceConfig {
		if (sharedInstance === null) {
			sharedInstance = new AmbianceConfig();
		}
		return sharedInstance;
	}

	constructor() {
		this.app.set(APP_CONFIG_KEY.NAME, name);
		this.app.set(APP_CONFIG_KEY.VERSION, version);
		this.app.set(APP_CONFIG_KEY.PORT, process.env.PORT || 3010);
		this.app.set(APP_CONFIG_KEY.ENV, process.env.NODE_ENV || 'development');

		this.api.set(API_CONFIG_KEY.BASE_PATH, '/api/v1');
		this.api.set(API_CONFIG_KEY.ENABLED_HTTP_REQUEST_METHODS, ENABLED_HTTP_REQUEST_METHODS);
	}
}
