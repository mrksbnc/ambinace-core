import type { Route } from './router.d';
import { logger } from '@/utils/logger';
import type { Application } from 'express';
import AmbianceConfig from '@/config/appConfig';
import { API_CONFIG_KEY } from '@/data/enums/localObnject';
import { notFoundHandlerMiddleware } from '../middlewares/notFoundHandler';
import { errorHandlerMiddleware } from '../middlewares/errorHandler';

export const routes = [];

export const registerRoutes = (app: Application): void => {
	const basePath: string = AmbianceConfig.sharedInstance.api.get(API_CONFIG_KEY.BASE_PATH) as string;

	routes.forEach((route: Route) => {
		app.use(`${basePath}/${route.path}`, route.router);
		logger.info(`route registered: ${route.path}`);
	});

	app.use(notFoundHandlerMiddleware);
	app.use(errorHandlerMiddleware);
};
