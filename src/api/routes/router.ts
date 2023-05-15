import Log from '@/utils/logger';
import AppConfig from '@/config/appConfig';
import type { Application } from 'express';
import type { TRoute, TRouter } from './router.d';
import { API_CONFIG_KEY } from '@/data/constants/config';
import { routeNotFoundMiddleware } from '../middlewares/routeNotFoundMiddleware';
import { errorMiddleware } from '../middlewares/errorMiddleware';

let sharedInstance: Router | null = null;

export default class Router implements TRouter {
	readonly routes: TRoute[];

	static get sharedInstance(): Router {
		if (sharedInstance === null) {
			sharedInstance = new Router();
		}
		return sharedInstance;
	}

	constructor() {
		this.routes = [];
	}

	public register(app: Application): void {
		const basePath: string = AppConfig.sharedInstance.api[API_CONFIG_KEY.BASE_URL];

		this.routes.forEach((route: TRoute) => {
			app.use(route.router);
			Log.sharedInstance.baseLogger.info(`path registered: ${basePath}${route.path}`);
		});

		app.use(routeNotFoundMiddleware);
		app.use(errorMiddleware);
	}
}
