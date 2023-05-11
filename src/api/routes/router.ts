import Log from '@/utils/logger';
import type { Application } from 'express';
import AmbianceConfig from '@/config/appConfig';
import type { TRoute, TRouter } from './router.d';
import { API_CONFIG_KEY } from '@/data/constants/ambianceConfig';
import errorMiddleware from '../middlewares/errorMiddleware';
import notFoundMiddleware from '../middlewares/notFoundMiddleware';

let sharedInstance: Router | null = null;

export default class Router implements TRouter {
	private readonly _routes: TRoute[];

	static get sharedInstance(): Router {
		if (sharedInstance === null) {
			sharedInstance = new Router();
		}
		return sharedInstance;
	}

	constructor() {
		this._routes = [];
	}

	public registerRoutes(app: Application): void {
		const basePath: string = AmbianceConfig.sharedInstance.api.get(API_CONFIG_KEY.BASE_PATH) as string;

		this._routes.forEach((route: TRoute) => {
			app.use(`${basePath}/${route.path}`, route.router);
			Log.sharedInstance.baseLogger.info(`route registered: ${route.path}`);
		});

		app.use(notFoundMiddleware);
		app.use(errorMiddleware);
	}
}
