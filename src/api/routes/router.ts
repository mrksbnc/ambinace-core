import Log from '@/utils/logger';
import AppConfig from '@/config/appConfig';
import type { Application } from 'express';
import type { TRoute, TRouter } from './router.d';
import errorMiddleware from '../middlewares/errorHandler';
import { API_CONFIG_KEY } from '@/data/constants/config';
import notFoundMiddleware from '../middlewares/routeNotFound';

export default class Router implements TRouter {
	readonly routes: TRoute[];

	constructor() {
		this.routes = [];
	}

	public registerRoutes(app: Application): void {
		const basePath: string = AppConfig.sharedInstance.api[API_CONFIG_KEY.BASE_URL];

		this.routes.forEach((route: TRoute) => {
			app.use(route.router);
			Log.sharedInstance.baseLogger.info(`path registered: ${basePath}${route.path}`);
		});

		app.use(notFoundMiddleware);
		app.use(errorMiddleware);
	}
}
