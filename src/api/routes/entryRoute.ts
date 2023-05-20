import { Router } from 'express';
import { concatSegmentHelper } from './routeHelper';
import type { TRoute, TRouteConstructorArgs, TRouteMeta } from './route';
import type { TEntryController } from '../controllers/entryController.d';
import EntryController from '../controllers/entryController';
import RouteMeta from './routeMeta';

let sharedInstance: EntryRoute | null = null;

export default class EntryRoute implements TRoute {
	public readonly path = '/entry';
	public readonly router: Router;
	public metaLogs: string[] = [];

	private readonly _entryController: TEntryController;

	private readonly _meta: TRouteMeta[] = [
		new RouteMeta({
			method: 'get',
			controller: 'entryController',
			path: this._concatSegment(['get', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['get']> =>
				router.get(path, this._entryController.get),
		}),
		new RouteMeta({
			method: 'get',
			controller: 'entryController',
			path: this._concatSegment(['get', 'user', ':userId']),
			__handler: (router: Router, path: string): ReturnType<Router['get']> =>
				router.get(path, this._entryController.getByUserId),
		}),
		new RouteMeta({
			method: 'post',
			controller: 'entryController',
			path: this._concatSegment(['get', 'user', 'date']),
			__handler: (router: Router, path: string): ReturnType<Router['post']> =>
				router.post(path, this._entryController.getByUserIdAndDate),
		}),
		new RouteMeta({
			method: 'post',
			controller: 'entryController',
			path: this._concatSegment(['get', 'user', 'date', 'range']),
			__handler: (router: Router, path: string): ReturnType<Router['post']> =>
				router.post(path, this._entryController.getByUserIdAndDateRange),
		}),
		new RouteMeta({
			method: 'post',
			controller: 'entryController',
			path: this._concatSegment(['get', 'user', 'mood']),
			__handler: (router: Router, path: string): ReturnType<Router['post']> =>
				router.post(path, this._entryController.getByUserIdAndMood),
		}),
		new RouteMeta({
			method: 'get',
			controller: 'entryController',
			path: this._concatSegment(['get', 'user', 'active']),
			__handler: (router: Router, path: string): ReturnType<Router['get']> =>
				router.get(path, this._entryController.getActiveByUserId),
		}),
		new RouteMeta({
			method: 'get',
			controller: 'entryController',
			path: this._concatSegment(['get', 'user', 'inactive']),
			__handler: (router: Router, path: string): ReturnType<Router['get']> =>
				router.get(path, this._entryController.getInactiveByUserId),
		}),
		new RouteMeta({
			method: 'post',
			controller: 'entryController',
			path: this._concatSegment(['create']),
			__handler: (router: Router, path: string): ReturnType<Router['post']> =>
				router.post(path, this._entryController.create),
		}),
		new RouteMeta({
			method: 'put',
			controller: 'entryController',
			path: this._concatSegment(['update']),
			__handler: (router: Router, path: string): ReturnType<Router['put']> =>
				router.put(path, this._entryController.update),
		}),
		new RouteMeta({
			method: 'put',
			controller: 'entryController',
			path: this._concatSegment(['delete', 'soft', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['put']> =>
				router.put(path, this._entryController.softDelete),
		}),
		new RouteMeta({
			method: 'put',
			controller: 'entryController',
			path: this._concatSegment(['restore', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['put']> =>
				router.put(path, this._entryController.restore),
		}),
		new RouteMeta({
			method: 'delete',
			controller: 'entryController',
			path: this._concatSegment(['delete', 'hard', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['delete']> =>
				router.delete(path, this._entryController.hardDelete),
		}),
	];

	public static get sharedInstance(): EntryRoute {
		if (sharedInstance === null) {
			sharedInstance = new EntryRoute({
				controller: EntryController.sharedInstance,
			});
		}
		return sharedInstance;
	}

	public constructor({ controller }: TRouteConstructorArgs<TEntryController>) {
		this._entryController = controller;

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
