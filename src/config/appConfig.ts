import { name, version } from 'package.json';
import { API_CONFIG_KEY, APP_CONFIG_KEY, ENABLED_HTTP_REQUEST_METHODS } from '@/data/enums/localObnject';

let sharedInstance: AmbianceConfig | null = null;

export default class AmbianceConfig {
	static get sharedInstance(): AmbianceConfig {
		if (sharedInstance === null) {
			sharedInstance = new AmbianceConfig();
		}
		return sharedInstance;
	}

	public readonly app: Map<APP_CONFIG_KEY, string | number> = new Map<APP_CONFIG_KEY, string | number>();
	public readonly api: Map<string, string | string[]> = new Map<string, string | string[]>();

	constructor() {
		this.app.set(APP_CONFIG_KEY.NAME, name);
		this.app.set(APP_CONFIG_KEY.VERSION, version);
		this.app.set(APP_CONFIG_KEY.PORT, process.env.PORT || 3000);
		this.app.set(APP_CONFIG_KEY.ENV, process.env.NODE_ENV || 'development');

		this.api.set(API_CONFIG_KEY.ENABLED_HTTP_REQUEST_METHODS, ENABLED_HTTP_REQUEST_METHODS);
	}
}
