import Log from '@/utils/logger';
import AuthRoute from './authRoute';
import UserRoute from './userRoute';
import type { TRoute } from './route';
import type { TRouter } from './router.d';
import AppConfig from '@/config/appConfig';
import type { Application } from 'express';
import Middleware from '../middlewares/middleware';
import { API_CONFIG_KEY } from '@/data/constants/config';

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
		this.routes = [AuthRoute.sharedInstance, UserRoute.sharedInstance];
	}

	public register(app: Application): void {
		const basePath: string = AppConfig.sharedInstance.api[API_CONFIG_KEY.BASE_URL];

		this.routes.forEach((route: TRoute) => {
			app.use(AppConfig.sharedInstance.api[API_CONFIG_KEY.BASE_URL], route.router);
			Log.sharedInstance.baseLogger.info(`path registered: ${basePath}${route.path}`);
		});

		app.use(Middleware.sharedInstance.routeNotFoundHandler);
		app.use(Middleware.sharedInstance.errorHandler);
	}
}
