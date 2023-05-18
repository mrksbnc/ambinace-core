import { Router } from 'express';
import AppConfig from '@/config/appConfig';
import { concatSegmentHelper } from './routeHelper';
import UserController from '../controllers/userController';
import type { TUserController } from '../controllers/userController.d';
import type { TRoute, TRouteConstructorArgs, TRouteMetaData } from './route.d';

let sharedInstance: UserRoute | null = null;

export default class UserRoute implements TRoute {
	private readonly _userController: TUserController;

	static get sharedInstance(): UserRoute {
		if (sharedInstance === null) {
			sharedInstance = new UserRoute({
				controller: UserController.sharedInstance,
			});
		}
		return sharedInstance;
	}

	public readonly path = '/user';
	public readonly router: Router;
	public readonly meta: TRouteMetaData[] = [
		{
			method: 'get',
			controller: 'UserController',
			path: this._concatSegment(['get', ':id']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['get', ':id'])}`,
			__handler: (router: Router): ReturnType<Router['get']> =>
				router.get(this._concatSegment(['get', ':id']), this._userController.get),
		},
		{
			method: 'put',
			controller: 'UserController',
			path: this._concatSegment(['get', 'many']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['get', 'many'])}`,
			__handler: (router: Router): ReturnType<Router['put']> =>
				router.put(this._concatSegment(['get', 'many']), this._userController.getMany),
		},
		{
			method: 'put',
			controller: 'UserController',
			path: this._concatSegment(['update', ':id']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['update', ':id'])}`,
			__handler: (router: Router): ReturnType<Router['put']> =>
				router.put(this._concatSegment(['update', ':id']), this._userController.update),
		},
		{
			method: 'put',
			controller: 'UserController',
			path: this._concatSegment(['delete', 'soft', ':id']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['delete', 'soft', ':id'])}`,
			__handler: (router: Router): ReturnType<Router['put']> =>
				router.put(this._concatSegment(['delete', 'soft', ':id']), this._userController.softDelete),
		},
		{
			method: 'put',
			controller: 'UserController',
			path: this._concatSegment(['restore', ':id']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['restore', ':id'])}`,
			__handler: (router: Router): ReturnType<Router['put']> =>
				router.put(this._concatSegment(['restore', ':id']), this._userController.restore),
		},
		{
			method: 'delete',
			controller: 'UserController',
			path: this._concatSegment(['delete', 'hard', ':id']),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['delete', 'hard', ':id'])}`,
			__handler: (router: Router): ReturnType<Router['delete']> =>
				router.delete(this._concatSegment(['delete', 'hard', ':id']), this._userController.hardDelete),
		},
	];

	public constructor({ controller }: TRouteConstructorArgs<TUserController>) {
		this._userController = controller;

		const r = Router();
		this.router = this._register(r);
	}

	private _concatSegment(segment: string | string[]): string {
		return concatSegmentHelper(this.path, segment);
	}

	private _register(router: Router): Router {
		this.meta.forEach((meta: TRouteMetaData) => {
			meta.__handler(router);
		});

		return router;
	}
}
