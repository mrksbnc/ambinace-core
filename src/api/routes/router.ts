import Log from '@/utils/logger';
import EntryRoute from './entryRoute';
import type { Application } from 'express';
import { controllers } from '../controllers';
import AmbianceConfig from '@/config/appConfig';
import type { TRoute, TRouter } from './router.d';
import errorMiddleware from '../middlewares/errorMiddleware';
import { API_CONFIG_KEY } from '@/data/constants/ambianceConfig';
import notFoundMiddleware from '../middlewares/notFoundMiddleware';

export default class Router implements TRouter {
	readonly routes: TRoute[];

	constructor() {
		this.routes = [new EntryRoute(controllers.entry)];
	}

	public registerRoutes(app: Application): void {
		const basePath: string = AmbianceConfig.sharedInstance.api[API_CONFIG_KEY.BASE_PATH];

		this.routes.forEach((route: TRoute) => {
			app.use(route.router);
			Log.sharedInstance.baseLogger.info(`path registered: ${basePath}${route.path}`);
		});

		app.use(notFoundMiddleware);
		app.use(errorMiddleware);
	}
}
