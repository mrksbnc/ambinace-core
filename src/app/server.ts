import { logger } from '@/utils/logger';
import type { TServer } from './server.d';
import AmbianceConfig from '@/config/appConfig';
import express, { type Application } from 'express';
import { registerApiMiddlewares } from '@/api/middlewares';
import { APP_CONFIG_KEY } from '@/data/enums/localObnject';

let sharedInstance: Server | null = null;
export default class Server implements TServer {
	static get sharedInstance(): Server {
		if (sharedInstance === null) {
			sharedInstance = new Server();
		}

		return sharedInstance;
	}

	private readonly _app: Application;

	constructor() {
		this._app = express();
	}

	public get(): Application {
		return this._app;
	}

	public async init(): Promise<void> {
		registerApiMiddlewares(this._app);
		const port = AmbianceConfig.sharedInstance.app.get(APP_CONFIG_KEY.PORT);
		const name = AmbianceConfig.sharedInstance.app.get(APP_CONFIG_KEY.NAME);
		const version = AmbianceConfig.sharedInstance.app.get(APP_CONFIG_KEY.VERSION);

		this._app.listen(port, () => {
			logger.info(`${name} v${version} is running on port ${port}`);
		});
	}
}
