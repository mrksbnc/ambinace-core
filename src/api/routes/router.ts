import Log from '@/utils/logger';
import AuthRoute from './authRoute';
import MoodRoute from './moodRoute';
import UserRoute from './userRoute';
import type { TRouter } from './router.d';
import AppConfig from '@/config/appConfig';
import type { Application } from 'express';
import Middleware from '../middlewares/middleware';
import type { TRoute, TRouteMetaData } from './route';
import { API_CONFIG_KEY } from '@/data/constants/config';
import ActivityRoute from './activityRoute';

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
		this.routes = [
			AuthRoute.sharedInstance,
			UserRoute.sharedInstance,
			MoodRoute.sharedInstance,
			ActivityRoute.sharedInstance,
		];
	}

	public register(app: Application): void {
		this.routes.forEach((route: TRoute) => {
			Log.sharedInstance.createInfoMessageBlock([
				`__register: Mounting routes for ${route.path}`,
				`__register: ${route.meta.length} routes found`,
			]);

			app.use(AppConfig.sharedInstance.api[API_CONFIG_KEY.BASE_URL], route.router);

			Log.sharedInstance.createInfoMessageBlock([
				`__register: Routes for ${route.path} mounted`,
				...route.meta.map((meta: TRouteMetaData) => `__register: ${meta.controller} ${meta.method} ${meta.fullPath}`),
			]);
		});

		app.use(Middleware.sharedInstance.routeNotFoundHandler);
		app.use(Middleware.sharedInstance.errorHandler);
	}
}
