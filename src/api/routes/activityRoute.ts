import { Router } from 'express';
import AppConfig from '@/config/appConfig';
import { concatSegmentHelper } from './routeHelper';
import ActivityController from '../controllers/activityController';
import type { TActivityController } from '../controllers/activityController.d';
import type { TRoute, TRouteConstructorArgs, TRouteMetaData } from './route.d';

let sharedInstance: ActivityRoute | null = null;

export default class ActivityRoute implements TRoute {
	private readonly _activityController: TActivityController;

	static get sharedInstance(): ActivityRoute {
		if (sharedInstance === null) {
			sharedInstance = new ActivityRoute({
				controller: ActivityController.sharedInstance,
			});
		}
		return sharedInstance;
	}

	public readonly path = '/activity';
	public readonly router: Router;
	public readonly meta: TRouteMetaData[] = [
		{
			method: 'get',
			controller: 'ActivityController',
			path: this._concatSegment(['get', ':id']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['get', ':id'])}`,
			__handler: (router: Router): ReturnType<Router['get']> =>
				router.get(this._concatSegment(['get', ':id']), this._activityController.get),
		},
		{
			method: 'get',
			controller: 'ActivityController',
			path: this._concatSegment(['get', 'many', 'default', ':userId']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['get', 'many', 'default', ':userId'])}`,
			__handler: (router: Router): ReturnType<Router['get']> =>
				router.get(
					this._concatSegment(['get', 'many', 'default', ':userId']),
					this._activityController.getDefaultsWithUser,
				),
		},
		{
			method: 'get',
			controller: 'ActivityController',
			path: this._concatSegment(['get', 'many', ':userId']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['get', 'many', ':userId'])}`,
			__handler: (router: Router): ReturnType<Router['get']> =>
				router.get(this._concatSegment(['get', 'many', ':userId']), this._activityController.getManyByUserId),
		},
		{
			method: 'put',
			controller: 'ActivityController',
			path: this._concatSegment(['get', 'many']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['get', 'many'])}`,
			__handler: (router: Router): ReturnType<Router['put']> =>
				router.put(this._concatSegment(['get', 'many']), this._activityController.getManyByIds),
		},
		{
			method: 'post',
			controller: 'ActivityController',
			path: this._concatSegment('create'),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment('create')}`,
			__handler: (router: Router): ReturnType<Router['post']> =>
				router.post(this._concatSegment('create'), this._activityController.create),
		},
		{
			method: 'put',
			controller: 'ActivityController',
			path: this._concatSegment('update'),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment('update')}`,
			__handler: (router: Router): ReturnType<Router['put']> =>
				router.put(this._concatSegment('update'), this._activityController.update),
		},
		{
			method: 'put',
			controller: 'ActivityController',
			path: this._concatSegment(['delete', 'soft', ':id']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['delete', 'soft', ':id'])}`,
			__handler: (router: Router): ReturnType<Router['put']> =>
				router.put(this._concatSegment(['delete', 'soft', ':id']), this._activityController.softDelete),
		},
		{
			method: 'put',
			controller: 'ActivityController',
			path: this._concatSegment(['restore', ':id']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['restore', ':id'])}`,
			__handler: (router: Router): ReturnType<Router['put']> =>
				router.put(this._concatSegment(['restore', ':id']), this._activityController.restore),
		},
		{
			method: 'delete',
			controller: 'ActivityController',
			path: this._concatSegment(['delete', 'hard', ':id']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['delete', 'hard', ':id'])}`,
			__handler: (router: Router): ReturnType<Router['delete']> =>
				router.delete(this._concatSegment(['delete', 'hard', ':id']), this._activityController.hardDelete),
		},
	];

	public constructor({ controller }: TRouteConstructorArgs<TActivityController>) {
		this._activityController = controller;

		const r = Router();
		this.router = this._register(r);
	}

	private _concatSegment(segment: string | string[]): string {
		return concatSegmentHelper(this.path, segment);
	}

	private _register(router: Router): Router {
		/**
		 * TODO: Add authentication middleware.
		 */
		this.meta.forEach((meta) => {
			meta.__handler(router);
		});

		return router;
	}
}
