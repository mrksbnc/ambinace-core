import Log from '@/utils/logger';
import type { TServer } from './server.d';
import Router from '@/api/routes/router';
import AppConfig from '@/config/appConfig';
import express, { type Application } from 'express';
import { APP_CONFIG_KEY } from '@/data/constants/config';
import { registerApiMiddlewares } from '@/api/middlewares';

let sharedInstance: Server | null = null;
export default class Server implements TServer {
	private readonly _router: Router;
	private readonly _app: Application;

	static get sharedInstance(): Server {
		if (sharedInstance === null) {
			sharedInstance = new Server();
		}

		return sharedInstance;
	}

	constructor() {
		this._app = express();
		this._router = new Router();
	}

	public get(): Application {
		return this._app;
	}

	public async init(): Promise<void> {
		const name = AppConfig.sharedInstance.app[APP_CONFIG_KEY.NAME];
		const port = AppConfig.sharedInstance.app[APP_CONFIG_KEY.PORT];
		const version = AppConfig.sharedInstance.app[APP_CONFIG_KEY.VERSION];

		registerApiMiddlewares(this._app);

		this._router.registerRoutes(this._app);

		this._app.listen(port, () => {
			Log.sharedInstance.baseLogger.info(`${name} v${version} is running on port ${port}`);
		});
	}
}
