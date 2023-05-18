import { Router } from 'express';
import RouteMeta from './routeMeta';
import { concatSegmentHelper } from './routeHelper';
import MoodController from '../controllers/moodController';
import type { TMoodController } from '../controllers/moodController.d';
import type { TRoute, TRouteConstructorArgs, TRouteMeta } from './route.d';

let sharedInstance: MoodRoute | null = null;

export default class MoodRoute implements TRoute {
	public readonly path = '/mood';
	public readonly router: Router;
	public metaLogs: string[] = [];

	private readonly _moodController: TMoodController;

	private readonly _meta: TRouteMeta[] = [
		new RouteMeta({
			method: 'get',
			controller: 'moodController',
			path: this._concatSegment(['get', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['get']> =>
				router.get(path, this._moodController.get),
		}),
		new RouteMeta({
			method: 'get',
			controller: 'moodController',
			path: this._concatSegment(['get', 'many', ':userId']),
			__handler: (router: Router, path: string): ReturnType<Router['get']> =>
				router.get(path, this._moodController.getByUserId),
		}),
		new RouteMeta({
			method: 'get',
			controller: 'moodController',
			path: this._concatSegment(['get', 'many', 'default', ':userId']),
			__handler: (router: Router, path: string): ReturnType<Router['get']> =>
				router.get(path, this._moodController.getDefaultAndUserCreatedMoods),
		}),
		new RouteMeta({
			method: 'post',
			controller: 'moodController',
			path: this._concatSegment('create'),
			__handler: (router: Router, path: string): ReturnType<Router['post']> =>
				router.post(path, this._moodController.create),
		}),
		new RouteMeta({
			method: 'put',
			controller: 'moodController',
			path: this._concatSegment('update'),
			__handler: (router: Router, path: string): ReturnType<Router['put']> =>
				router.put(path, this._moodController.update),
		}),
		new RouteMeta({
			method: 'put',
			controller: 'moodController',
			path: this._concatSegment(['delete', 'soft', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['put']> =>
				router.put(path, this._moodController.softDelete),
		}),
		new RouteMeta({
			method: 'put',
			controller: 'moodController',
			path: this._concatSegment(['restore', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['put']> =>
				router.put(path, this._moodController.restore),
		}),
		new RouteMeta({
			method: 'delete',
			controller: 'moodController',
			path: this._concatSegment(['delete', 'hard', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['delete']> =>
				router.delete(path, this._moodController.hardDelete),
		}),
	];

	public static get sharedInstance(): MoodRoute {
		if (sharedInstance === null) {
			sharedInstance = new MoodRoute({
				controller: MoodController.sharedInstance,
			});
		}
		return sharedInstance;
	}

	public constructor({ controller }: TRouteConstructorArgs<TMoodController>) {
		this._moodController = controller;

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
				` __register:  ${index + 1} | ${meta.controller} | ${meta.method.toUpperCase()}  ${meta.fullPath}`,
			);
		});

		return router;
	}
}
