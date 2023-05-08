import { name, version } from 'package.json';
import { APP_CONFIG_KEY } from '@/data/enums/localObnject';

let sharedInstance: AmbianceConfig | null = null;

export default class AmbianceConfig {
	static get sharedInstance(): AmbianceConfig {
		if (sharedInstance === null) {
			sharedInstance = new AmbianceConfig();
		}
		return sharedInstance;
	}

	public readonly app: Map<APP_CONFIG_KEY, string | number> = new Map<APP_CONFIG_KEY, string | number>();

	constructor() {
		this.app.set(APP_CONFIG_KEY.NAME, name);
		this.app.set(APP_CONFIG_KEY.VERSION, version);
		this.app.set(APP_CONFIG_KEY.PORT, process.env.PORT || 3000);
		this.app.set(APP_CONFIG_KEY.ENV, process.env.NODE_ENV || 'development');
	}
}
