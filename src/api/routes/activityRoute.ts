import { Router } from 'express';
import RouteMeta from './routeMeta';
import { concatSegmentHelper } from './routeHelper';
import ActivityController from '../controllers/activityController';
import type { TRoute, TRouteConstructorArgs, TRouteMeta } from './route.d';
import type { TActivityController } from '../controllers/activityController.d';

let sharedInstance: ActivityRoute | null = null;

export default class ActivityRoute implements TRoute {
	public metaLogs: string[] = [];
	public readonly router: Router;
	public readonly path = '/activity';

	private readonly _activityController: TActivityController;

	private readonly _meta: TRouteMeta[] = [
		new RouteMeta({
			method: 'get',
			controller: 'activityController',
			path: this._concatSegment(['get', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['get']> =>
				router.get(path, this._activityController.get),
		}),
		new RouteMeta({
			method: 'get',
			controller: 'activityController',
			path: this._concatSegment(['get', 'many', 'default', ':userId']),
			__handler: (router: Router, path: string): ReturnType<Router['get']> =>
				router.get(path, this._activityController.getDefaultsWithUser),
		}),
		new RouteMeta({
			method: 'get',
			controller: 'activityController',
			path: this._concatSegment(['get', 'many', ':userId']),
			__handler: (router: Router, path: string): ReturnType<Router['get']> =>
				router.get(path, this._activityController.getManyByUserId),
		}),
		new RouteMeta({
			method: 'put',
			controller: 'activityController',
			path: this._concatSegment(['get', 'many']),
			__handler: (router: Router, path: string): ReturnType<Router['put']> =>
				router.put(path, this._activityController.getManyByIds),
		}),
		new RouteMeta({
			method: 'post',
			controller: 'activityController',
			path: this._concatSegment('create'),
			__handler: (router: Router, path: string): ReturnType<Router['post']> =>
				router.post(path, this._activityController.create),
		}),
		new RouteMeta({
			method: 'put',
			controller: 'activityController',
			path: this._concatSegment('update'),
			__handler: (router: Router, path: string): ReturnType<Router['put']> =>
				router.put(path, this._activityController.update),
		}),
		new RouteMeta({
			method: 'put',
			controller: 'activityController',
			path: this._concatSegment(['delete', 'soft', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['put']> =>
				router.put(path, this._activityController.softDelete),
		}),
		new RouteMeta({
			method: 'put',
			controller: 'activityController',
			path: this._concatSegment(['restore', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['put']> =>
				router.put(path, this._activityController.restore),
		}),
		new RouteMeta({
			method: 'delete',
			controller: 'activityController',
			path: this._concatSegment(['delete', 'hard', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['delete']> =>
				router.delete(path, this._activityController.hardDelete),
		}),
	];

	public static get sharedInstance(): ActivityRoute {
		if (sharedInstance === null) {
			sharedInstance = new ActivityRoute({
				controller: ActivityController.sharedInstance,
			});
		}
		return sharedInstance;
	}

	public constructor({ controller }: TRouteConstructorArgs<TActivityController>) {
		this._activityController = controller;

		const r = Router();
		this.router = this._register(r);
	}

	private _concatSegment(segment: string | string[]): string {
		return concatSegmentHelper(this.path, segment);
	}

	private _register(router: Router): Router {
		this._meta.forEach((meta: TRouteMeta, index: number) => {
			meta.__handler(router, meta.path);
			this.metaLogs.push(
				`__register:  ${index + 1} | ${meta.controller} | ${meta.method.toUpperCase()}  ${meta.fullPath}`,
			);
		});

		return router;
	}
}
