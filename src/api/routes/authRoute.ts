import { Router } from 'express';
import RouteMeta from './routeMeta';
import { concatSegmentHelper } from './routeHelper';
import AuthController from '../controllers/authController';
import type { TAuthController } from '../controllers/authController.d';
import type { TRoute, TRouteConstructorArgs, TRouteMeta } from './route.d';

let sharedInstance: AuthRoute | null = null;

export default class AuthRoute implements TRoute {
	public readonly path = '/auth';
	public readonly router: Router;
	public metaLogs: string[] = [];

	private readonly _authController: TAuthController;

	private readonly _meta: TRouteMeta[] = [
		new RouteMeta({
			method: 'post',
			controller: 'authController',
			path: this._concatSegment('login'),
			__handler: (router: Router, path: string): ReturnType<Router['post']> =>
				router.post(path, this._authController.login),
		}),
		new RouteMeta({
			method: 'post',
			controller: 'authController',
			path: this._concatSegment('register'),
			__handler: (router: Router, path: string): ReturnType<Router['post']> =>
				router.post(path, this._authController.register),
		}),
	];

	public static get sharedInstance(): AuthRoute {
		if (sharedInstance === null) {
			sharedInstance = new AuthRoute({
				controller: AuthController.sharedInstance,
			});
		}
		return sharedInstance;
	}

	constructor({ controller }: TRouteConstructorArgs<TAuthController>) {
		this._authController = controller;

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
