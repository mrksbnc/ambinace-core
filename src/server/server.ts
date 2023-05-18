import Log from '@/utils/logger';
import Router from '@/api/routes/router';
import type { TServer } from './server.d';
import AppConfig from '@/config/appConfig';
import express, { type Application } from 'express';
import Middleware from '@/api/middlewares/middleware';
import { APP_CONFIG_KEY } from '@/data/constants/config';

let sharedInstance: Server | null = null;
export default class Server implements TServer {
	private readonly _app: Application;

	public static get sharedInstance(): Server {
		if (sharedInstance === null) {
			sharedInstance = new Server();
		}

		return sharedInstance;
	}

	constructor() {
		this._app = express();
	}

	public get(): Application {
		return this._app;
	}

	public async init(): Promise<void> {
		const name = AppConfig.sharedInstance.app[APP_CONFIG_KEY.NAME];
		const port = AppConfig.sharedInstance.app[APP_CONFIG_KEY.PORT];
		const version = AppConfig.sharedInstance.app[APP_CONFIG_KEY.VERSION];

		Middleware.sharedInstance.register(this._app);
		Router.sharedInstance.register(this._app);

		this._app.listen(port, () => {
			Log.sharedInstance.baseLogger.info(`${name} v${version} is running on port ${port}!`);
		});
	}
}
