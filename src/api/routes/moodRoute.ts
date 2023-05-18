import { Router } from 'express';
import AppConfig from '@/config/appConfig';
import { concatSegmentHelper } from './routeHelper';
import MoodController from '../controllers/moodController';
import type { TMoodController } from '../controllers/moodController.d';
import type { TRoute, TRouteConstructorArgs, TRouteMetaData } from './route.d';

let sharedInstance: MoodRoute | null = null;

export default class MoodRoute implements TRoute {
	private readonly _moodController: TMoodController;

	static get sharedInstance(): MoodRoute {
		if (sharedInstance === null) {
			sharedInstance = new MoodRoute({
				controller: MoodController.sharedInstance,
			});
		}
		return sharedInstance;
	}

	public readonly path = '/mood';
	public readonly router: Router;
	public readonly meta: TRouteMetaData[] = [
		{
			method: 'get',
			controller: 'MoodController',
			path: this._concatSegment(['get', ':id']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['get', ':id'])}`,
			__handler: (router: Router): ReturnType<Router['get']> =>
				router.get(this._concatSegment(['get', ':id']), this._moodController.get),
		},
		{
			method: 'put',
			controller: 'MoodController',
			path: this._concatSegment(['get', 'many', ':userId']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['get', 'many', ':userId'])}`,
			__handler: (router: Router): ReturnType<Router['put']> =>
				router.put(this._concatSegment(['get', 'many', ':userId']), this._moodController.getByUserId),
		},
		{
			method: 'put',
			controller: 'MoodController',
			path: this._concatSegment(['get', 'many', 'default', ':userId']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['get', 'many', 'default', ':userId'])}`,
			__handler: (router: Router): ReturnType<Router['put']> =>
				router.put(
					this._concatSegment(['get', 'many', 'default', ':userId']),
					this._moodController.getDefaultAndUserCreatedMoods,
				),
		},
		{
			method: 'put',
			controller: 'MoodController',
			path: this._concatSegment('update'),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment('update')}`,
			__handler: (router: Router): ReturnType<Router['put']> =>
				router.put(this._concatSegment('update'), this._moodController.update),
		},
		{
			method: 'put',
			controller: 'MoodController',
			path: this._concatSegment('create'),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment('create')}`,
			__handler: (router: Router): ReturnType<Router['put']> =>
				router.put(this._concatSegment('create'), this._moodController.create),
		},
		{
			method: 'put',
			controller: 'MoodController',
			path: this._concatSegment(['delete', 'soft', ':id']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['delete', 'soft', ':id'])}`,
			__handler: (router: Router): ReturnType<Router['put']> =>
				router.put(this._concatSegment(['delete', 'soft', ':id']), this._moodController.softDelete),
		},
		{
			method: 'put',
			controller: 'MoodController',
			path: this._concatSegment(['restore', ':id']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['restore', ':id'])}`,
			__handler: (router: Router): ReturnType<Router['put']> =>
				router.put(this._concatSegment(['restore', ':id']), this._moodController.restore),
		},
		{
			method: 'put',
			controller: 'MoodController',
			path: this._concatSegment(['delete', 'hard', ':id']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['delete', 'hard', ':id'])}`,
			__handler: (router: Router): ReturnType<Router['put']> =>
				router.put(this._concatSegment(['delete', 'hard', ':id']), this._moodController.hardDelete),
		},
	];

	public constructor({ controller }: TRouteConstructorArgs<TMoodController>) {
		this._moodController = controller;

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
