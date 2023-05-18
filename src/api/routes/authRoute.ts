import { Router } from 'express';
import AppConfig from '@/config/appConfig';
import { concatSegmentHelper } from './routeHelper';
import AuthController from '../controllers/authController';
import type { TAuthController } from '../controllers/authController.d';
import type { TRoute, TRouteConstructorArgs, TRouteMetaData } from './route.d';

let sharedInstance: AuthRoute | null = null;

export default class AuthRoute implements TRoute {
	private readonly _authController: TAuthController;

	static get sharedInstance(): AuthRoute {
		if (sharedInstance === null) {
			sharedInstance = new AuthRoute({
				controller: AuthController.sharedInstance,
			});
		}
		return sharedInstance;
	}

	public readonly path = '/auth';
	public readonly router: Router;
	public readonly meta: TRouteMetaData[] = [
		{
			method: 'post',
			controller: 'AuthController',
			path: this._concatSegment('login'),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['login'])}`,
			__handler: (router: Router): ReturnType<Router['post']> =>
				router.post(this._concatSegment('login'), this._authController.login),
		},
		{
			method: 'post',
			controller: 'AuthController',
			path: this._concatSegment('register'),
			fullPath: `${AppConfig.sharedInstance.api.basePath}${this._concatSegment(['register'])}`,
			__handler: (router: Router): ReturnType<Router['post']> =>
				router.post(this._concatSegment('register'), this._authController.register),
		},
	];

	public constructor({ controller }: TRouteConstructorArgs<TAuthController>) {
		this._authController = controller;

		const r = Router();
		this.router = this._register(r);
	}

	private _concatSegment(segment: string | string[]): string {
		return concatSegmentHelper(this.path, segment);
	}

	private _register(router: Router): Router {
		this.meta.forEach((meta) => {
			meta.__handler(router);
		});

		return router;
	}
}
