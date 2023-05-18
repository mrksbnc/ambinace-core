import { Router } from 'express';
import AppConfig from '@/config/appConfig';
import { concatSegmentHelper } from './routeHelper';
import UserController from '../controllers/userController';
import type { TUserController } from '../controllers/userController.d';
import type { TRoute, TRouteConstructorArgs, TRouteMeta } from './route.d';
import RouteMeta from './routeMeta';

let sharedInstance: UserRoute | null = null;

export default class UserRoute implements TRoute {
	private readonly _userController: TUserController;

	private readonly _meta: TRouteMeta[] = [
		new RouteMeta({
			method: 'get',
			controller: 'userController',
			path: this._concatSegment(['get', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['get']> =>
				router.get(path, this._userController.get),
		}),
		new RouteMeta({
			method: 'put',
			controller: 'userController',
			path: this._concatSegment(['get', 'many']),
			__handler: (router: Router, path: string): ReturnType<Router['put']> =>
				router.put(path, this._userController.getMany),
		}),
		new RouteMeta({
			method: 'put',
			controller: 'userController',
			path: this._concatSegment(['update', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['put']> =>
				router.put(path, this._userController.update),
		}),
		new RouteMeta({
			method: 'put',
			controller: 'userController',
			path: this._concatSegment(['delete', 'soft', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['put']> =>
				router.put(path, this._userController.softDelete),
		}),
		new RouteMeta({
			method: 'put',
			controller: 'userController',
			path: this._concatSegment(['restore', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['put']> =>
				router.put(path, this._userController.restore),
		}),
		new RouteMeta({
			method: 'delete',
			controller: 'userController',
			path: this._concatSegment(['delete', 'hard', ':id']),
			__handler: (router: Router, path: string): ReturnType<Router['delete']> =>
				router.delete(path, this._userController.hardDelete),
		}),
	];

	public static get sharedInstance(): UserRoute {
		if (sharedInstance === null) {
			sharedInstance = new UserRoute({
				controller: UserController.sharedInstance,
			});
		}
		return sharedInstance;
	}

	public readonly path = '/user';
	public readonly router: Router;
	public metaLogs: string[] = [];

	public constructor({ controller }: TRouteConstructorArgs<TUserController>) {
		this._userController = controller;

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
